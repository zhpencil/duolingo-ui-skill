---
name: duolingo-ui
description: 用 Duolingo（多邻国）的 UI 语言做网页 / App 原型：48px 厚面 + 5px 实心底边的 3D 按钮、2px 描边、圆润的 Nunito 风格字体、高饱和绿 / 蓝 / 红 / 黄 / 紫、游戏化学习路径、连胜 / 宝石 / 红心 / 宝箱、任务与排行榜、单词卡答题、94px 无标签底部导航。当用户提到 Duolingo、多邻国、"像多邻国那样"、绿色猫头鹰、语言学习 App、游戏化学习界面、streak、gem、word bank、lesson path、leaderboard，或要求把网页 / 组件 / App 原型做成这种风格时使用。适用于 HTML / CSS / Tailwind / React / Vue 原型。内含从三个 Figma 社区文件提取的完整 token、组件规格、58 个图标、16 个界面的布局规范和可直接运行的交互演示。
---

# Duolingo UI 风格

这是一套让 AI 编程助手直接写出 **Duolingo 风格**界面的 skill。它不复制 Duolingo 的产品，而是把它的**视觉语法**拆成可组装的 token、组件和布局：厚实的 3D 控件、2px 描边、圆润字体、高饱和色、游戏化信息密度。

来源：

- [DuoLingo Design System (Community)](https://www.figma.com/community/file/1460744749282136015/duolingo-design-system)，作者 John Welch，file key `Y9HNcdPRyk3mrVUAzHgldI`。组件、变体、颜色和字号的主来源。画板是 430×932 的手机屏。
- [Duolingo FREE UI Kit - By Marvilo](https://www.figma.com/community/file/1377326303556981356/duolingo-free-ui-kit-by-marvilo)，file key `woBGZQ1U4cS2myXqPfmrzw`。补充了排行榜、商店、徽章、资料页和 Web 版资料页的布局。
- [Duolingo - Unofficial Design Language](https://www.figma.com/community/file/1439600081437366863/duolingo-unofficial-design-language)，file key `tUtC9p62GJq20mE82XXdz3`。补充了样式指南与 Web 字体 `Instrument Sans` 的用法。
- `references/screenshots/flows/01.png`–`16.png` 是三个文件里 16 个完整流程界面的 1:1 导出，作为视觉对照。
- 三个文件均为 **CC BY 4.0**；本仓库代码为 MIT。Duolingo 名称、猫头鹰形象和相关商标归 Duolingo, Inc. 所有，本项目是**非官方**的粉丝整理，与 Duolingo 无隶属或背书关系。详见 `LICENSE`。

> 字体说明：原稿用的是 **DIN 2014 Rounded VF**，这是商业字体。本 skill 用 **Nunito**（SIL OFL，`assets/fonts/nunito-latin.woff2`，可变字重 200–900）作为替代，字体栈里也保留了 `DIN Next Rounded`、`din-round` 和 `Duo Rounded`。Nunito 的字面比 DIN 2014 Rounded 略窄、略高，所以**文字宽度和换行不会与 Figma 像素级一致**；控件尺寸、颜色和间距是一致的。不要把商业 DIN 字体打包进你的仓库。

## 文件

| 文件 | 用途 |
|---|---|
| `assets/duolingo.css` | 全部 token（`--duo-*` CSS 变量）+ 全部组件类（`.duo-*`）。做网页时优先直接引用这一份 |
| `assets/duolingo.js` | 无依赖的行为层：单词卡池 → 答题行、底部弹层 / 对话框、Toast、进度条 / 圆环、开关、勾选、滑块、键盘按压态 |
| `assets/tokens.json` | W3C DTCG 格式的 token，保留 Figma 的命名 |
| `assets/tailwind.preset.js` | Tailwind preset，全部挂在 `duo` 命名空间下（`bg-duo-feather-500`、`rounded-duo-lg`、`shadow-duo-btn-green`） |
| `assets/demo.html` | 完整展示页：色板、字号、按钮、进度、图标、组件墙，以及 4 台可交互手机（学习路径、课程、单词答题、个人资料）。拿不准 HTML 结构时照抄这里 |
| `assets/icons-sprite.svg` | 58 个 `<symbol>`，`di-*`。内联到 `<body>` 开头后用 `<svg class="duo-icon"><use href="#di-heart"/></svg>` |
| `assets/icons/*.svg` | 55 个独立单文件图标（58 个 sprite symbol 中另外 3 个多色底栏图标只存在于 sprite） |
| `assets/fonts/nunito-latin.woff2` | 变量字体替身，`@font-face` 已是 `Duo Rounded`，200–900 |
| `assets/brand/*.svg` | 说明页备用的字标与 UNOFFICIAL 徽标（cover 标题用 HTML 文字，方便随字体变化）。只用于说明页，不要用在产品里 |
| `references/tokens.md` | 颜色 / 字体 / 圆角 / 描边 / 实心底边 / 尺寸 / 间距 / 动效全表，每条注明用途 |
| `references/components.md` | 每个组件的 HTML 结构、精确尺寸、全部状态、交互、可访问性和常见错误 |
| `references/layouts.md` | 16 个 Figma 流程界面 + 4 个 demo 手机的逐屏拆解：线框、间距、用了哪些类、怎么组装 |
| `references/motion.md` | 按压、弹层、对话框、Toast、进度、庆祝动效的时长、曲线和编排 |
| `references/inventory.md` | Figma 文件 / 页面 / 节点 → 组件 → CSS 类 → 截图 → 素材的对照表 |
| `tools/render.py` | 用 Playwright + Edge 截图的校验脚本（Windows 默认路径） |
| `tools/figma_dump.py` | 把 Figma MCP 的 `get_file` 输出压成「节点 → 尺寸 → 填充 → 文字」清单 |

## 工作流程

1. **先看 `assets/demo.html`** 里对应组件的写法，再查 `references/components.md` 的尺寸表。如果只想要静态外观，不需要引入 JS。
2. **把 `assets/duolingo.css` 复制进项目**。Tailwind 项目把 `tailwind.preset.js` 加进 `presets`；CSS-in-JS 项目直接读 `tokens.json`。不要凭感觉调色，所有绿 / 蓝 / 紫都有固定的“面 + 底边”配对。
3. 根元素加 `class="duo-page"`。要展示成手机时用 `.duo-phone`（430×932，40px 圆角）包住 `.duo-screen`，底部补 `.duo-home-indicator`。**所有尺寸都是 px**，不要用 `vw` 缩放按钮和字。
4. 把 `icons-sprite.svg` 的 `<svg>` 根节点内联到 `<body>` 开头。它的隐藏方式是 `position:absolute;width:0;height:0;overflow:hidden`，**不要改成 `display:none`**，也不要删掉每个 `<symbol>` 上的 `fill="none"`，否则描边图标内部会被填成黑色。
5. **需要交互时再引入 `assets/duolingo.js`**。它用事件委托，动态插入的元素也能用。常用钩子：
   - `data-duo-open="sheet-id"` / `data-duo-close` 开关底部弹层或对话框；`.duo-sheet` 会自动获得同级 `.duo-scrim`，点遮罩关闭，Esc 关闭，焦点被限制在层内。
   - `data-duo-toast="已保存"`，可加 `data-duo-toast-type="success|error"`、`data-duo-toast-icon="check"`、`data-duo-toast-duration="2400"`、`data-duo-toast-host="phone-id"`（触发按钮在手机外时，把 Toast 送进指定手机）。
   - `[data-duo-exercise]` 包住题目，单词按钮放在 `[data-duo-bank]` 里，答题行加 `[data-duo-answer]`。点词上屏、点已上屏的词退回；监听 `duo:place` / `duo:remove` 来启用 CHECK。
   - `data-duo-progress="45"`、`data-duo-ring="64"` 设置初值；之后用 `Duo.progress(el, 72)` / `Duo.ring(el, 64)` 更新。
   - `.duo-switch` 自动切换 `aria-checked` 并发 `duo:switch`；`[data-duo-check]` 切换 `.duo-check--empty`；`input.duo-slider[type=range]` 自动画进度。
   - `Duo.toast(text, { type, icon, duration, host })`；`Duo.open(elOrId)`、`Duo.close()`、`Duo.closeAll()`；`Duo.answer(bankEl)` 返回当前答题行里的单词数组；`Duo.resetAnswer(bankEl)` 清空。
6. 用户要 React / Vue 组件时，按 `.duo-*` 的结构封装，把 `pressed`、`disabled`、`selected`、`aria-current` 四种状态做齐。**不要**用 UI 框架自带的 Button / Card 覆写样式，Duolingo 的厚度来自结构本身。
7. 做完后按下面的「自检清单」逐项量一遍；能截图就和 `references/screenshots/flows/` 对应页并排比较。`tools/render.py` 可以直接截：

   ```bash
   python tools/render.py http://127.0.0.1:8765/assets/demo.html out.png --full
   python tools/render.py http://127.0.0.1:8765/assets/demo.html phone.png --selector ".duo-phone"
   ```

## 美学要点（为什么一眼像 Duolingo）

1. **控件是“厚块”，不是浮起来的卡片。** 主按钮 48px 面 + **5px 实心底边**（不是模糊投影），按下时整体下沉 5px、底边归零，60ms 完成。小按钮 38px 面 + 3px 底边；大按钮 52px 面 + 5px 底边。没有渐变、没有 ripple、没有 hover 放大。
2. **2px 描边是基本笔画。** 卡片、单词卡、输入框、底部导航的选中块、进度条外框都用 2px `#e5e5e5`。不要用 1px 发丝线做主轮廓；只有底部导航顶边和少数分隔线是 1px。
3. **字体圆、重、紧。** 标题 26/800，`letter-spacing: -0.52px`；按钮 16/800 大写，`+0.8px`；20px 正文反而要 `+0.6px`。大字号收紧、小字号放松，是 Duolingo 字排的核心节奏。不要把全部文字都设成 700 或 800。
4. **颜色饱和但用途严格。** 绿 `#58cc02` 只表示“正确 / 主行动 / 学习进度”；蓝 `#1cb0f6` 表示“可点的信息 / 选中”；红 `#ff4b4b` 只给红心、错误、危险；金黄 `#ffc800` 给 XP、连胜里程碑、宝箱；橙 `#ff9600` 给火焰和已完成勾；紫 `#ce82ff` 是学习路径的章节色；粉 `#d84f9e` 是月度挑战；薄荷 `#5aeab1` 是个人资料头部。一屏只允许一个主行动色。
5. **游戏化数字住在顶栏。** 连胜火焰、宝石、红心、能量，计数 17/800，图标 28×26。不要把小图标塞进灰色胶囊里；数字和图标直接排在白底上。
6. **学习路径是一条蜿蜒的珠子项链。** 节点 76×70，紫色面 + 7px 深紫底边；当前节点外面套 7px 白环和 11px 淡紫环；已完成是金色，未解锁是灰色，宝箱换成箱子图标。每行用 `--duo-path-x` 左右错开，行距 18px，左右内边距 24px。
7. **章节头是紫色实心条。** 75px 高、16px 圆角、4px 深紫底边；左边 eyebrow 15/800 淡紫大写，右边标题 21/800 白色；最右是 54px 宽的按钮列，用 2px 深紫竖线隔开。
8. **答题界面是“上面说话、下面拼词”。** 大标题 26/800；左边 122×118 的圆角薄荷/灰色吉祥物块，右边白底 2px 描边的气泡（16px 圆角，尖角在左）；答题行 56px 高、2px 底边；词卡 46px 高、20px 常规字、2px 描边 + 2px 底边；底部 CHECK 通栏 48px + 5px 底边。答对后的反馈是**从底部升起的整宽绿色面板**，不是悬浮 Toast。
9. **个人资料用一块薄荷色。** 278px 高的薄荷头部，164px 白底头像压住下边缘 14px，头像外有一圈 6px 半透明白。名字 26/800，数据三栏用 2px 竖线分隔，左侧第一栏左对齐、右侧最后一栏右对齐。
10. **卡片圆角 13–16px，投影是 0 2px 0 的“纸边”。** 只有底部弹层用真正的模糊阴影（`0 -8px 24px rgba(0,0,0,.2)`），Toast 用一层很轻的 `0 6px 18px rgba(0,0,0,.18)`。其余全部是实心偏移。
11. **完成任务和特殊任务用斜条纹。** `repeating-linear-gradient(115deg, transparent 0 18px, tint 18px 36px)`；已完成是淡蓝 + 蓝边，特殊任务是淡粉 + 粉边。不要用纯色块表示完成。
12. **底部导航 94px，没有文字标签。** 5 个 40×40 的点击区，32px 图标；当前项不是换色，而是套一个 40×40 的淡蓝圆角块 + 2px 淡蓝描边。图标之间用 `space-between` 铺满，底部留 30px 给 home indicator。
13. **进度条 19px 高，带一道 5px 高光。** 高光在填充内部，左右各缩进 8px、距顶 4px，颜色是同色系更亮的一档。不要做整条渐变，也不要给轨道加内阴影。
14. **图标是厚描边 + 平涂。** 通用 UI 图标 2px 圆头描边，24px；导航 32px；路径节点 42×38；计数器 28×26；国旗 29×22（保持 3:2 左右的横向比例，不要压成方形）。图标要么是单色 `currentColor`，要么是 Figma 那套多色平涂，不要加投影和渐变。
15. **内容左右留白 16px，卡片之间 12px。** 学习路径 24px；词池 24px 上下；底部行动区 12px 上 / 16px 下。段落最大宽度约 340px，超过就换行，不要拉满 430px。
16. **文字色永远不是纯黑。** 正文 `#4b4b4b`，次要 `#777`，三级 `#afafaf`，描边 `#e5e5e5`。纯黑只出现在 home indicator 和遮罩里。
17. **层级标题 21–26px，按钮和课程名 20px，正文 18–20px，meta 16px。** 14px 只用于网页版列表副标题和徽章，12px 只用于微型标签。移动端正文不要小于 16px。
18. **动效短、直、带一点弹性。** 按压 60ms；弹层 280ms `cubic-bezier(.2,.9,.3,1)`；遮罩 200ms 线性；答对庆祝 420ms 从 0.86→1.05→1；Toast 180ms 上浮。普通按钮不加弹簧，只有奖励和当前节点可以有精神。
19. **信息密度高，但分组清楚。** 一屏可以同时有顶栏计数、章节头、路径、宝箱、底部导航；靠 12–18px 的间距和 2px 描边分组，不靠大面积留白。
20. **永远保持“可点的地方看起来能按”。** 所有按钮、词卡、课程行、路径节点都有按下位移；禁用是灰面 + 灰边 + 灰字且没有底边，不是简单的 `opacity: .4`。

## 核心 token 速查

```
屏幕          430 × 932，圆角 40，home indicator 148×5
顶栏          54 高，左右 16；计数 17/800，图标 28×26
底部导航      94 高（上 14 / 左右 16 / 下 30），点击区 40，图标 32
主按钮        48 面 + 5 实心底边，圆角 13，16/800，大写，+0.8
小按钮        38 面 + 3 底边，圆角 10，14/800
大按钮        52 面 + 5 底边，圆角 16，17/800
进度条        19 高，填充最小 5px，高光 5px（左右缩进 8 / 距顶 4）
路径节点      76 × 70，底边 7，图标 42×38，行距 18
章节头        75 高，圆角 13，底边 4，按钮列 54 宽
词卡          46 高，圆角 13，2px 描边 + 2px 底边，20/400，+0.6
答题行        56 高，2px 底边
个人资料头    278 高（薄荷），头像 164，压边 -14
卡片          2px 描边，圆角 13–16，纸边 0 2px 0 或 0 3px 0
统计块        68 高，圆角 14，图标 22×24，值 16/800，标签 16/400 #afafaf
任务行        内边距 16/18，标题 21/800，图标 38×40，行间 2px
排行榜行      62 高，排名 17/800，名字 18/800，XP 16/800 #afafaf
商店格        2 列，gap 12，圆角 13，商品图 62×66
弹层          顶部圆角 20，280ms，grabber 44×5，最大 88vh（手机内 82%）
对话框        宽 368，圆角 16，标题 22/800，正文 18 #777，按钮 gap 10
Toast         深灰 #4b4b4b / 成功淡绿 / 错误淡红，2.4s 自动消失
颜色          绿 #58cc02（边 #478700） 蓝 #1cb0f6（边 #1899d6）
              红 #ff4b4b（边 #e53b3b） 金 #ffc800（边 #e6a000）
              橙 #ff9600  紫 #ce82ff（边 #a568cc） 粉 #d84f9e  薄荷 #5aeab1
文字          #4b4b4b / #777777 / #afafaf；线 #e5e5e5；页面 #f7f7f7
字体          26/800 -0.52 · 22/800 -0.44 · 21/800 -0.105 · 20/400 +0.6
              18/700 · 16/400 -0.16 · 14/400 · 12/400
动效          按压 60ms · 遮罩 200ms · 弹层 280ms · 庆祝 420ms · 弹入 320ms
曲线          cubic-bezier(0.2, 0.9, 0.3, 1)
```

## 组件清单（Figma → CSS 类）

- **手机外框**：`.duo-phone`（430×932 / 40 圆角）→ `.duo-screen`（滚动区）→ `.duo-home-indicator`
- **顶栏 / 计数**：`.duo-appbar`、`__side`、`__title`；`.duo-counter`；课程顶栏用 `.duo-lessonbar` + `__close`
- **按钮**：`.duo-btn`，色调 `--green` / `--purple` / `--red` / `--gold` / `--secondary` / `--ghost`；尺寸 `--sm` / `--lg` / `--icon` / `--block` / `--title`；图标按钮 `.duo-iconbtn`，盒装版 `--boxed`
- **进度**：`.duo-progress`（`--duo-progress-value`），色调 `--gold` / `--blue` / `--purple`，填充 `__fill`，标签 `__label`；圆环 `.duo-ring`（`--duo-ring-value`）
- **章节头**：`.duo-section-header`、`__body`、`__eyebrow`、`__title`、`__action`
- **学习路径**：`.duo-path`、`.duo-path__row`（`--duo-path-x`）、`.duo-node`（`--gold` / `--locked` / `--current` / `--chest` / `--pressed`）、`__edge`、`__face`、`.duo-path__stars`、`.duo-start`
- **答题**：`.duo-screen-title`、`.duo-question`、`.duo-mascot`、`.duo-bubble`（`--top`）、`__audio`、`__hint`、`.duo-answer-area`、`.duo-answer-line`、`.duo-word-bank`、`.duo-word`（`--placed` / `--used`）、`.duo-actions`（`--tinted` / `--flush`）
- **答题结果**：`.duo-result`（`--error`）、`__head`、`__title`、`__spacer`、`__tools`
- **连胜**：`.duo-streak-hero`、`__flame`、`__number`、`__label`；`.duo-streak-card`、`__days`、`__note`；`.duo-day`（`--empty`）；`.duo-check`（`--empty` / `--iced`）
- **卡片 / 数据**：`.duo-card`、`.duo-stat-grid`、`.duo-stat`、`__icon`、`__text`、`__value`、`__label`；任务 `.duo-task-list`、`.duo-task`（`--done` / `--special`）、`__icon` / `__body` / `__title` / `__reward` / `__meta`；`.duo-quest-title`；`.duo-mini-progress`
- **底部导航**：`.duo-bottom-nav`、`.duo-nav-btn`（`aria-current="page"`）、`__badge`（`data-badge`）
- **个人资料**：`.duo-profile-hero`、`__gear`、`.duo-avatar`（`--sm` / `--md`）、`.duo-profile`、`__name` / `__meta` / `__stats` / `__stat` / `__actions`；好友 `.duo-friends`、`__title` / `__row`、`.duo-friend`（`--add`）、`__badge`
- **列表 / 课程**：`.duo-list`、`.duo-list__heading`、`.duo-course`（`aria-selected`）、`__flag`、`__meta`；`.duo-list-card`、`.duo-row`、`__title`、`__detail`；`.duo-sheet-head`、`__close`、`__title`
- **选择 / 熟练度**：`.duo-choice`（`aria-pressed` / `aria-selected`）、`.duo-prof`（`i.is-on`）
- **排行榜**：`.duo-board`、`__zone`（`--demote`）、`.duo-board-row`（`--me` / `--up` / `--down`）、`__rank` / `__name` / `__xp`
- **商店 / 徽章**：`.duo-shop`、`.duo-shop-item`、`__art` / `__name`、`.duo-price`、`.duo-badge`（`--locked`）、`__disc`
- **浮层**：`.duo-scrim`、`.duo-sheet`、`__handle` / `__body` + `.duo-sheet-head`；`.duo-dialog-scrim`、`.duo-dialog`、`__title` / `__body` / `__actions`；`.duo-toast-host`、`.duo-toast`（`--success` / `--error`）
- **派生控件**（原稿没画，用同一套 token 推导）：`.duo-switch`、`.duo-input`、`.duo-slider`、`.duo-empty`
- **展示辅助**（只用于 demo / 规范页）：`.duo-kit`、`.duo-kit__board`、`.duo-kit__phones`、`.duo-swatch` 等。**不要**把这些带进产品页面

## 16 个流程界面

完整拆解见 `references/layouts.md`。先记住地图：

1. **锁屏 / 通知**（01）：状态栏 + 大时间，用来做启动前的营销屏。
2. **学习路径**（02）：顶栏计数 + 紫色章节头 + 蜿蜒节点 + 底部导航。默认首页。
3. **路径 + START 气泡**（03）：当前节点被白环强调，上方浮出 START 气泡，路径其余部分压暗。
4. **答题**（04）：顶部课程进度 + 关闭 + 红心；大标题、吉祥物气泡、三条答题线、词池、禁用 CHECK。
5. **答题 · 已拼好**（05）：词池出现空槽，答题行是蓝色文字；底部升起绿色「Nice!」结果面板 + CONTINUE。
6. **课程完成**（06）：两个角色 + 「Lesson complete!」+ 三个奖励胶囊（XP / 正确率 / 速度）。
7. **连胜**（07）：124×150 火焰 + 96px 数字 + 一周圆点 + CLAIM XP。
8. **任务完成**（08）：金色标题、三行任务、粉色月度挑战卡、I'M COMMITTED。
9. **课程选择器**（09）：九宫格国旗卡 + 添加按钮 + New Courses（Music / Math / Course），路径在遮罩后面。
10. **自己的资料**（10）：薄荷头部、大头像、三栏统计、Invite、Overview 2×2、Friend Streaks。
11. **课程列表**（11）：New Courses + Language Courses，CHECK 禁用。
12. **课程列表 · 已选**（12）：选中行变淡蓝 + 蓝边 + 蓝色文字，CHECK 变绿。
13. **熟练度问卷**（13）：五档，左侧是 4 根柱子的图标，单选行。
14. **起点选择**（14）：两张带图标和说明的选项卡，单选。
15. **引导语**（15）：吉祥物 + 对话气泡 + 绿色 CONTINUE。
16. **路径 + 底部菜单**（16）：Feed / Profile 两项的底部菜单，50% 黑遮罩。

## Figma 原稿里的坑（已在 skill 里纠正）

- **字体不是 Nunito。** Figma 用 DIN 2014 Rounded VF（商业授权）。Nunito 只是替代，字宽和 x-height 不同；不要把替代字体的换行当成设计规格。
- **描边图标被填黑。** Figma 导出的 SVG 子路径依赖根节点的 `fill="none"`；序列化丢了根属性后，书、锁、齿轮、奖杯等描边图标内部会变成黑色实心。sprite 里每个 `<symbol>` 都补了 `fill="none"`，**不要删**。
- **进度条高光不是整条。** 它在填充内部左右各缩进 8px、距顶 4px、5px 高。拉满时也要保留缩进，否则会顶到圆角外。
- **章节头右侧的按钮列是 54px，分隔线是 2px 深紫。** 不是 1px 半透明线；点按时整列变深紫。
- **禁用按钮不是 `opacity: .4`。** Duolingo 的禁用是：面 `#e5e5e5`、底边 `#e5e5e5`、文字 `#afafaf`、没有阴影。这样它在白底上仍然是“一块”，不会显得脏。
- **单词上屏后不是灰色 chip。** 词池里的原词变成不可见的占位（保留布局），答题行里是**蓝色 20px 粗体文字**，再点一下退回词池。
- **底部导航的选中态是“块”，不是“变色”。** 40×40 的 `#ddf4ff` 圆角块 + 2px `#63c9f9` 内描边，图标尺寸从 32 收到 30。
- **头像不是叠在圆角卡片上。** 资料头是硬切的极简矩形，头像圆环压住下边缘 14px，页面其余部分是白底。
- **计数图标不要强制正方形。** 火焰 28×26，国旗 29×22；用 `width` / `height` 两轴分别写，否则比例会变形。
- **“答对”反馈有两种。** 课程里是**整宽结果面板**（`.duo-result`，从底部升起，淡绿底）；普通操作才是 Toast。不要把课程反馈做成右上角小提示。
- **三个文件会互相矛盾。** 颜色、圆角、按钮以 File 1 为准；排行榜 / 商店 / 徽章 / 资料页的扩展布局以 File 2 为准；Web 字体与展示页排版以 File 3 为准。遇到冲突时按这个优先级。
- **Figma 画板没有 iOS 状态栏。** 我们的 `.duo-phone` 从 54px 顶栏直接开始。放进真机演示时，要么在上方加 44–54px 的状态栏安全区，要么把整台手机往下移，不要把顶栏压到灵动岛下面。

## 不要做

- 不要给按钮加渐变、内阴影、毛玻璃或 Material ripple。Duolingo 的“立体”只来自**实心底边**和**按下位移**。
- 不要把主按钮做成胶囊。圆角是 13px（小按钮 10、大按钮 16），只有进度条、开关、徽章、头像用 full pill。
- 不要用 1px 细边做主轮廓，也不要用纯黑文字、灰色渐变背景或大面积投影。
- 不要在同一个行动区放两个高饱和主按钮；一屏一个绿色主行动。
- 不要把 14px 当成移动端正文。Duolingo 的正文是 16–20px，14px 只属于 Web 列表的副标题。
- 不要用 emoji 代替图标；用 `di-*` sprite 或同风格的 2px 圆头描边图标。
- 不要凭空发明暗色模式。三个原稿都没有暗色版；如果产品必须暗色，明确标注为推导，并保持同样的 2px 描边和实心底边逻辑。
- 不要按视口缩放按钮、字和路径节点。它们是固定的物理尺寸。
- 不要复制 Duolingo 的猫头鹰插画、官方字标或角色来做产品 Logo；`assets/brand` 只用于说明页。也不要暗示与 Duolingo 有合作。
- 不要把 `.duo-kit__*` 展示类带进产品；它们只负责把规范页排得好看。

## 自检清单

- [ ] 主按钮 48px 面 + 5px 实心底边，按下整体下沉 5px，60ms；没有渐变和 ripple
- [ ] 所有主要轮廓是 2px `#e5e5e5`；没有纯黑文字和 1px 主描边
- [ ] 按钮文字 16/800 大写、`+0.8` 字距；标题 26/800、`-0.52` 字距
- [ ] 一屏只有一个绿色主行动；红只用于错误 / 红心 / 危险；紫只用于路径和章节头
- [ ] 学习路径节点 76×70、底边 7；当前节点有 7px 白环 + 11px 淡紫环
- [ ] 进度条 19px，高光 5px 且左右缩进 8px；填充最小 5px
- [ ] 底部导航 94px、40px 点击区、32px 图标，选中是淡蓝块而不是换色
- [ ] 个人资料头 278px 薄荷，头像 164 且压边 -14px
- [ ] 课程行 / 选择行 62–66px，圆角 13，2px 描边，选中变淡蓝 + 蓝边
- [ ] 卡片之间 12px，内容左右 16px，路径行距 18px
- [ ] 答题反馈是整宽绿色面板；Toast 只用于轻提示，2.4s 消失
- [ ] 词卡上屏后原词保留空槽，答题行显示蓝色文字；CHECK 随词数启用
- [ ] 浮层在 `.duo-phone` 内被裁切；Esc 可关，焦点不逃出；`aria-hidden` 正确
- [ ] 移动端正文 ≥16px；没有 emoji 图标；图标比例没有变形
- [ ] 引入 JS 后，开关、勾选、进度、弹层、Toast、单词池都能实际操作
- [ ] 和 `references/screenshots/flows/` 里对应页并排看过，或至少和 `assets/demo.html` 对过

## 适配说明

- **移动端**：内容区 `max-width: 430px` 居中；`min-height: 100dvh`；底部行动区用 `padding-bottom: max(16px, env(safe-area-inset-bottom))`。`.duo-phone` 只是演示外框，真实页面用 `.duo-page` + `.duo-screen` 即可。
- **桌面网页**：组件保持原尺寸，不要随视口放大。用 12–16px 的卡片间距把内容铺成 1–2 列；单列内容最大宽度 430px，旁边可以放说明。
- **Tailwind**：preset 已经把所有值放进 `duo` 命名空间。颜色名与 CSS 变量一致（`bg-duo-feather-500`），阴影名是语义化的 `shadow-duo-btn-green`。组件类仍然来自 `duolingo.css`，两者可以混用。
- **React / Vue**：把 `.duo-btn`、`.duo-word`、`.duo-course` 等封装成组件，但保留原类名和多层结构（`__face` / `__edge` 只用于路径节点）。状态通过 `aria-*` 和 `is-*` 类表达，便于 CSS 直接接管。
- **可访问性**：点击区最小 40×40；焦点环是 3px `#1cb0f6`、外扩 3px；浮层有 `role="dialog"` 语义时请自行补 `aria-labelledby`；Toast host 已经带 `role="status"` 和 `aria-live="polite"`；`prefers-reduced-motion` 会把所有动画压到 0.01ms。
- **不要移植的部分**：iOS 锁屏、Figma 展示板底色、`duo-kit` 展示类、品牌字标。它们属于展示层，不是产品 UI。
