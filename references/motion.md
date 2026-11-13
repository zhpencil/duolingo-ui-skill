# Duolingo UI — 动效与交互

Figma 原稿只有静态画板，没有动效标注。下面的时长和曲线来自 Duolingo 客户端一贯的交互节奏，并在 `duolingo.css` / `duolingo.js` 里落成了可运行的参数。**它们不是从某个官方设计规范里抄出来的数字**，而是“看起来、按起来像 Duolingo”的一组稳定值；如果你的产品有更严格的性能预算，可以整体等比例缩短，但不要改变下面三条原则。

## 1. 三条原则

1. **按下是瞬时的，不是渐变的。** 手指按下去的同一帧，按钮就下沉、颜色就变化。唯一有过渡的是 60ms 的位移，用来避免硬跳；不要做 150ms 的淡入高亮，也不要 ripple。
2. **普通动作短，奖励动作才可以有精神。** 按钮、词卡、课程行 60ms；弹层 280ms；只有答对、升级、领取奖励可以用 420ms 的过冲。
3. **空间连续。** 底部弹层从底部升起，对话框从 0.92 放大，Toast 从下方 12px 浮上来。元素不要从随机方向飞入，也不要整页淡入淡出。

## 2. 时长与曲线总表

| 动作 | 时长 | 曲线 | 属性 |
|---|---|---|---|
| 按钮 / 词卡 / 课程行按下 | 60ms | `ease` | `transform` + `box-shadow` |
| 按钮松开 | 60ms | `ease` | 同上 |
| 进度条填充 | 400ms | `cubic-bezier(.2,.9,.3,1)` | `width` |
| 开关轨道 | 140ms | `linear` | `background` |
| 开关滑块 | 140ms | `cubic-bezier(.2,.9,.3,1)` | `transform` |
| 遮罩淡入 / 淡出 | 200ms | `linear` | `opacity` |
| 底部弹层上滑 | 280ms | `cubic-bezier(.2,.9,.3,1)` | `transform` |
| 底部弹层下滑 | 280ms | 同上 | `transform` |
| 对话框淡入 | 160ms | `linear` | `opacity` |
| 对话框缩放 | 160ms | `cubic-bezier(.2,.9,.3,1)` | `transform: .92 → 1` |
| 结果面板升起 | 280ms | `cubic-bezier(.2,.9,.3,1)` | `translateY(24px) → 0` + 淡入 |
| Toast 进入 | 180ms | `ease` / `ease-out` | `opacity` + `translateY(12px)` |
| Toast 退出 | 180ms | 同上 | 反向 |
| 上屏词弹入 | 320ms | `cubic-bezier(.2,.9,.3,1)` | `scale .6 → 1.06 → 1` + 淡入 |
| 庆祝 burst | 420ms | `cubic-bezier(.2,.9,.3,1)` | `scale .86 → 1.05 → 1` |
| 节点按下 | 无过渡（或 60ms） | — | `translateY(4px)` |

公共变量：

```css
--duo-ease: cubic-bezier(0.2, 0.9, 0.3, 1);
--duo-press: 60ms;
```

`cubic-bezier(.2,.9,.3,1)` 的特征是**起步快、尾巴慢**：前 30% 走完 60% 的距离，最后 15% 慢慢贴合。它适合“从屏幕外进来”和“内容展开”，不适合“离开”；离开时可以直接用同一个曲线的反向，或者用 200ms 线性，不要用弹簧。

## 3. 按压

### 3.1 按钮

```css
.duo-btn {
  box-shadow: 0 5px 0 var(--duo-btn-edge);
  transition: transform 60ms ease, box-shadow 60ms ease;
}
.duo-btn:active,
.duo-btn.is-pressed {
  transform: translateY(5px);
  box-shadow: 0 0 0 var(--duo-btn-edge);
}
```

- 面高 48、底边 5，所以向下 5px 正好“坐进”底边，外框高度不变。小按钮 3px，大按钮 5px。
- 松手时反向 60ms 回弹，**不要加 overshoot**。普通按钮不弹。
- 键盘 Space / Enter 也触发 `.is-pressed`（JS 的 `addPressFeedback`），松手 / 失焦时移除。
- hover 只有 `filter: brightness(1.03)`，没有位移。触屏设备上 hover 不会触发，所以不要依赖它传达状态。

### 3.2 词卡、课程行、节点

- 词卡：`translateY(2px)` + 阴影归零，60ms。
- 课程行 / 选择行：`translateY(3px)` + 阴影归零，60ms。
- 路径节点：面与底边各下移 4px（`__face` / `__edge` 同步），60ms；底边不消失，只是被面盖住。
- 导航按钮：只下移 1px，不加阴影；它的反馈很轻，因为它在底部长期存在。

### 3.3 禁用

禁用时 `pointer-events: none`，所以不会有按下态。不要给禁用按钮保留 hover。

## 4. 底部弹层

```
打开：
  0ms     遮罩 opacity 0 → 1（200ms linear）
  0ms     sheet translateY(102%) → 0（280ms ease-out）
  60ms    焦点进入第一个可聚焦元素
关闭：
  0ms     sheet → 102%（280ms）
  0ms     遮罩 → 0（200ms）
  280ms   aria-hidden="true"，焦点回到触发按钮
```

- sheet 最大高 88vh（手机内 82%），顶部圆角 20，grabber 44×5。
- 只允许一个 sheet；打开第二个时，第一个保留在栈里，关闭后焦点按栈恢复。
- 点遮罩、点 `data-duo-close`、按 Esc 都关闭。Esc 只关最上层。
- 当前实现**没有拖拽关闭**。要加的话：在 `__handle` 上监听 pointerdown/move/up，向下超过 80px 或速度 > 0.5px/ms 时关闭，回弹 200ms；不要给内容区加拖拽，否则和滚动冲突。

## 5. 对话框

- 遮罩 160ms 淡入，对话框从 0.92 → 1，160ms。比 sheet 快，因为它的位移距离短。
- 关闭时 160ms 反向，不等待遮罩完全消失再移除焦点。
- 对话框宽 368，最大不超过 `calc(100vw - 48px)`；按钮在底部并排，主行动在右。
- 打开时焦点进入第一个按钮；Tab 在对话框内循环；Esc 关闭。关闭后焦点回到打开它的元素。

## 6. Toast

- 进入：`opacity 0 → 1`，`translateY(12px) → 0`，180ms；退出反向 180ms，然后从 DOM 移除。
- 默认 2400ms 后自动关闭；点击立即关闭；多条纵向堆叠，gap 8。
- 容器固定 `role="status"` + `aria-live="polite"`；手机内用 `--duo-toast-bottom` 抬高，避免压住底部按钮。
- 不要用它承载“答对了”这种需要用户确认的反馈；那种用 `.duo-result`。

## 7. 答题编排

一次“答对”的完整节奏，按时间顺序：

| 时间 | 发生什么 |
|---|---|
| 0ms | 上屏词落位（`.duo-pop` 320ms），CHECK 变绿 |
| 0ms | CHECK 按下 60ms |
| 60ms | 判定正确，词锁定 |
| 60ms | `.duo-result` 从底部升起 280ms，页面内容上移 |
| 60ms | 顶部进度条前进 400ms |
| 340ms | 结果面板完全就位，CONTINUE 可获得焦点 |
| 340ms | XP / 连胜数字可以 `.duo-burst` 420ms |

错误时：结果面板换成 `--error`，标题 “Not quite”，保留用户的答案并显示正确答案；**不要抖动输入框**，也不要播放刺耳音效。Duolingo 的错误反馈是平静的、信息性的。

## 8. 进度与圆环

- 进度条宽度 400ms ease-out，最小 5px，所以 0% 也有一条小绿点。
- 圆环目前是即时更新（conic-gradient 不可过渡）。需要动画时用 JS 的 `requestAnimationFrame` 逐帧设置 `--duo-ring-value`，或者在支持 `@property` 的浏览器里注册 `<angle>` 自定义属性；不要用 SVG `stroke-dashoffset` 重画一套。
- 迷你进度（任务卡）不设置过渡；它通常在页面加载时就是最终值。

## 9. 奖励动效

- `.duo-burst`：420ms，0.86 → 1.05 → 1。用于经验值、宝石、连胜数字、宝箱开启。
- `.duo-pop`：320ms，0.6 → 1.06 → 1 + 淡入。用于上屏词、弹出的徽章、第一次出现的当前节点。
- 同一元素不要同时加两个类；如果需要“先弹入再庆祝”，用 `animationend` 串起来。
- 连胜火焰可以做一个 2.4s 的轻微 scale / opacity 呼吸，但**不要**做持续旋转或闪烁；它是长期存在的元素，不是 loading。

## 10. 减少动态

```css
@media (prefers-reduced-motion: reduce) {
  .duo-page *, .duo-phone *,
  .duo-page *::before, .duo-phone *::before,
  .duo-page *::after, .duo-phone *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

这会把按压、弹层、Toast 全部变成瞬时。功能不丢，只是没有位移。不要用 JS 再写一套“如果 reduced motion 就跳过”的逻辑，CSS 已经覆盖；JS 只负责状态。

## 11. 性能与实现约束

- 只动 `transform` 和 `opacity` 的地方不会触发布局；进度条的 `width` 会，但它只有一条，400ms 一次，可以接受。不要在循环里改 `width`。
- 阴影使用实心 `box-shadow`，比模糊阴影便宜；sheet 的 `0 -8px 24px` 是唯一较贵的一层，只在一个元素上。
- 不要给 `filter: brightness()` 加过渡；hover 是瞬时改亮度。
- 手机框内所有浮层都是 `position: absolute`，`transform` 不会影响外部布局。
- 动画期间不要切换 `display`；用 `is-open` 类 + `transform`，关闭后由 JS 设置 `aria-hidden`。sheet 始终在 DOM 里，不销毁。

## 12. 不要做

- 不要 Material ripple、iOS 弹性滚动回弹、整页 3D 翻转。
- 不要给普通按钮加弹簧过冲；只有奖励可以。
- 不要用长于 300ms 的普通转场；超过 300ms 的只允许庆祝。
- 不要让遮罩使用 `backdrop-filter: blur()`；原稿是纯 50% 黑。
- 不要用 `ease-in-out` 做所有事情；Duolingo 的进入是快出慢收，离开是直接。
- 不要用动画掩盖内容加载；骨架屏只做静态灰块，不加 shimmer 扫光。
