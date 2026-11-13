# Duolingo UI — 组件规格

这份文档按“结构 → 尺寸 → 状态 → 用法 → 坑”的顺序讲每个组件。HTML 都可以直接复制。所有类名以 `.duo-` 开头，所有变量以 `--duo-` 开头；不要改前缀，否则和展示页、JS 事件委托都对不上。

## 0. 先搭一个屏幕

```html
<div class="duo-page">
  <div class="duo-phone">
    <header class="duo-appbar">…</header>
    <main class="duo-screen">
      <!-- 页面内容 -->
    </main>
    <nav class="duo-bottom-nav">…</nav>
    <div class="duo-home-indicator"></div>
  </div>
</div>
```

- `.duo-page` 负责字体、颜色、`box-sizing`、选中色；单独做全屏网页时只加它。
- `.duo-phone` 是 430×932、40px 圆角、`overflow: hidden` 的演示外框；生产页面可以不用它，但用了它，浮层就会被正确裁切在手机里。
- `.duo-screen` 是唯一滚动区：`flex: 1; overflow-y: auto; overscroll-behavior: contain`，滚动条隐藏。**不要**让整个 `.duo-phone` 滚动，否则顶栏和底栏会跟着走。
- `.duo-home-indicator` 固定 34px 高，中间一条 148×5 的黑条。真机上如果已有系统手势条，就不要重复加。

## 1. 顶栏与计数

### 1.1 普通顶栏

```html
<header class="duo-appbar">
  <div class="duo-appbar__side">
    <svg class="duo-icon"><use href="#di-flag-us"></use></svg>
  </div>
  <div class="duo-counter">
    <svg class="duo-icon"><use href="#di-streak"></use></svg>14
  </div>
  <div class="duo-counter">
    <svg class="duo-icon"><use href="#di-gem"></use></svg>12
  </div>
  <div class="duo-counter">
    <svg class="duo-icon"><use href="#di-heart"></use></svg>5
  </div>
</header>
```

- 高度 54px，左右 16px，`justify-content: space-between`，gap 12。
- `.duo-appbar__title` 是居中标题，20/800、`-0.2px`，`flex: 1`；两侧用 `__side` 放返回或图标。
- `.duo-counter` 是 17/800、`-0.32px`，图标固定 `28×26`。数字和图标之间 5px。**不要**给计数加背景胶囊；它直接站在白底上。
- 顶栏没有下边框。需要分组时用下面的章节头或 1px 分隔线，不要给 app bar 加阴影。

### 1.2 课程顶栏

```html
<div class="duo-lessonbar">
  <button class="duo-lessonbar__close" aria-label="Close lesson">
    <svg class="duo-icon"><use href="#di-close"></use></svg>
  </button>
  <div class="duo-progress duo-progress--gold" style="--duo-progress-value:45">
    <div class="duo-progress__fill"></div>
  </div>
  <span class="duo-counter">
    <svg class="duo-icon"><use href="#di-heart"></use></svg>5
  </span>
</div>
```

- 最小 54px，padding 8 16，gap 16。关闭键 32×32，颜色 `hare`，按下给 `polar` 背景。
- 进度条 `flex: 1`，课程里默认用金色（`--duo-progress--gold`），普通任务可用绿色。
- 红心计数永远是最后一个，图标 28×26。
- 关闭键只是视觉按钮；真正退出前应弹确认对话框（见 17.3），不要直接跳走。

## 2. 按钮

### 2.1 基础结构

```html
<button class="duo-btn duo-btn--green duo-btn--block">
  Check
</button>

<button class="duo-btn duo-btn--secondary">
  <svg class="duo-icon"><use href="#di-invite"></use></svg>Invite
</button>
```

| 类 | 面高 | 底边 | 圆角 | 字号 | 用途 |
|---|---|---|---|---|---|
| `.duo-btn` | 48 | 5px `#1899d6` | 13 | 16/800 大写 +0.8 | 默认蓝色主行动 |
| `--green` | 48 | 5px `#478700` | 13 | 同上 | 正确 / 继续 / 学习 |
| `--purple` | 48 | 5px `#a568cc` | 13 | 同上 | 路径相关 |
| `--red` | 48 | 5px `#e53b3b` | 13 | 同上 | 危险 / 退出 |
| `--gold` | 48 | 5px `#e6a000` | 13 | 同上，深色字 | 奖励 / 领取 |
| `--secondary` | 48 | 5px `#e5e5e5` + 2px 边 | 13 | 同上，蓝字 | 次级行动 |
| `--ghost` | 48 | 无 | 13 | 16/800 不大写 | 纯文字按钮 |
| `--sm` | 38 | 3px | 10 | 14/800 | 卡片内小按钮 |
| `--lg` | 52 | 5px | 16 | 17/800 | 引导页主按钮 |
| `--icon` | 48 | 5px | 13 | — | 正方形图标按钮，宽 48 |
| `--title` | 48 | 5px | 13 | 16/800 不大写 | 需要保留句子大小写时 |
| `--block` | 48 | 5px | 13 | — | 通栏，`width: 100%` |

按钮的图标 22×22，与文字 gap 8。所有按钮 `user-select: none; touch-action: manipulation`。

### 2.2 状态

- **默认**：`box-shadow: 0 5px 0 var(--duo-btn-edge)`。
- **hover**：只是 `filter: brightness(1.03)`，不要放大、不要加阴影。
- **按下 / `.is-pressed`**：`translateY(5px)` + 阴影收为 `0 0 0`，60ms。小按钮 3px。键盘 Space / Enter 也会触发 `.is-pressed`，由 JS 加上。
- **禁用**：面 `#e5e5e5`、底边 `#e5e5e5`、文字 `#afafaf`、无阴影、`pointer-events: none`。次按钮禁用时保留白面和 2px 边，文字退到 `#e5e5e5`。**不要**用 `opacity`。
- **焦点**：3px `#1cb0f6` 外环，offset 3。

### 2.3 尺寸与布局

- 一个行动区通常只有一个通栏主按钮；两个并排时用 `display: flex; gap: 12px`，各自 `flex: 1`。
- 主按钮文字用祈使句、全大写：`CHECK`、`CONTINUE`、`CLAIM XP`、`I'M COMMITTED`。中文界面就不要强行大写，保留 16/800 即可。
- 按钮内边距 0 16，文字不会换行（`white-space: nowrap`）。超长文案要缩短，不要缩小字号。
- `.duo-actions` 是底部行动区：`padding: 12px 16px 16px`，白底，`margin-top: auto` 把它推到底。`--tinted` 改成淡绿底（结果面板里用），`--flush` 去掉上内边距。

## 3. 进度

### 3.1 进度条

```html
<div class="duo-progress" style="--duo-progress-value:72" role="progressbar"
     aria-valuemin="0" aria-valuemax="100" aria-valuenow="72">
  <div class="duo-progress__fill"></div>
</div>
```

- 19px 高，圆角 64，轨道 `#e5e5e5`，填充 `width: max(5px, value%)`。
- 填充里的高光：距顶 4px、左右各 8px、高 5px、圆角 6，颜色是同族更亮一档（绿 `#79d634`、金 `#fbe56d`、蓝 `#6fc7f8`、紫 `#daa0ff`）。
- 色调：默认绿，`--gold` / `--blue` / `--purple`。
- 可选标签 `.duo-progress__label`：13/800 白字、深色 1px 柔影，居中。**低于 50% 时不要把数字放条内**，放在条上方；只有接近满格才放条内。加了 `data-duo-progress-label` 时，`Duo.progress` 会自动更新百分比文案。
- 更新：`Duo.progress(el, 72)` 会设置变量、切换 `is-complete`（≥100）并更新 `aria-valuenow`。CSS 过渡 400ms。

### 3.2 圆环

```html
<div class="duo-ring" style="--duo-ring-value:64;--duo-ring-size:84px">
  <svg class="duo-icon" style="width:34px;height:34px"><use href="#di-star"></use></svg>
</div>
```

- 默认 84×84、环宽 6，紫色；用 conic-gradient + radial mask 画，中心可以放图标或数字。
- `--duo-ring-size`、`--duo-ring-width`、`--duo-ring-color` 可覆盖。
- `Duo.ring(el, 64)` 更新。圆环没有内建文字，中心内容自己放。

## 4. 章节头

```html
<header class="duo-section-header">
  <div class="duo-section-header__body">
    <div class="duo-section-header__eyebrow">Section 2, Unit 10</div>
    <div class="duo-section-header__title">Say where people are from</div>
  </div>
  <button class="duo-section-header__action" aria-label="Unit guide">
    <svg class="duo-icon"><use href="#di-list"></use></svg>
  </button>
</header>
```

- 最小 75px，左右 margin 16，圆角 13，紫色 `#ce82ff` + `0 4px 0 #a568cc`。
- 左内边距 16 / 上下 11–12；eyebrow 15/800 大写 +0.2，颜色 `#edd1ff`；标题 21/800 白。
- 右侧 54px 宽的按钮列，`border-left: 2px solid #a568cc`；按下整列变 `#a568cc`。
- 章节头下面是路径，不额外加间距；路径自己有 22px 上内边距。
- 不要把它做成白色卡片；紫色实心是路径页的识别点。

## 5. 学习路径

### 5.1 节点结构

```html
<div class="duo-path">
  <div class="duo-path__row" style="--duo-path-x:74px">
    <button class="duo-node duo-node--current" aria-label="Start lesson">
      <span class="duo-node__edge"></span>
      <span class="duo-node__face">
        <svg class="duo-icon"><use href="#di-star"></use></svg>
      </span>
    </button>
    <div class="duo-path__stars">
      <svg class="duo-icon is-on"><use href="#di-star"></use></svg>
      <svg class="duo-icon is-on"><use href="#di-star"></use></svg>
      <svg class="duo-icon"><use href="#di-star"></use></svg>
    </div>
  </div>
  <!-- 下一行用 --duo-path-x:-38px 等错开 -->
</div>
```

解剖：

- 外层按钮 76×70；`__edge` 从 top 7 到底，深紫；`__face` 从 top 0 到 bottom 7，紫色，`inset 0 2px 0 rgba(255,255,255,.22)` 高光。两个都是 50% 圆角，所以视觉上是一个有 7px 厚边的圆饼。
- 图标 42×38 白色；按下时面与边一起 `translateY(4px)`。
- 行间距 18px，路径左右 24px，上 22 / 下 30。`--duo-path-x` 控制这一行整体的水平偏移（示例 74px / -38px）。不要用 margin 单独推节点，否则星星会错位。

状态：

| 类 | 面 | 边 | 图标 | 说明 |
|---|---|---|---|---|
| 默认 | `#ce82ff` | `#a568cc` | 白 | 已完成 / 可进入 |
| `--current` | 紫 | 紫 | 白 | 加 `0 0 0 7px #fff, 0 0 0 11px #edd1ff` 双层环 |
| `--gold` | `#ffc800` | `#e6a000` | `#cd7900` | 里程碑 / 单元末 |
| `--locked` | `#e5e5e5` | `#d2d2d2` | `#afafaf` 75% | 未解锁，`cursor: default` |
| `--chest` | 紫 | 紫 | 箱子 40×38 | 宝箱节点，图标换 `di-chest` / `di-chest-closed` |
| `--pressed` | — | — | — | 静态展示按下态时用 |

- 星星 14×14，间距 6，高 14；点亮用 `is-on`（金色），未点亮是 `swan`。一般只给当前节点画星，不是每个节点都有。
- 当前节点上方可以浮出 START 气泡：

```html
<button class="duo-start">Start</button>
```

9×18 内边距、白底、2px 边、12 圆角、`0 4px 0` 纸边、紫色 16/800 大写；底部有一个 14×14 的旋转方块做尖角。按下下沉 4px。气泡和节点之间留 8px。

### 5.2 路径节奏

- 一屏通常能看到 5–7 个节点；每 3–4 个节点换一次左右偏移，形成 S 形。
- 不要把节点排成严格网格，也不要用一条连续的 SVG 线把它们连起来；Duolingo 的路径是**珠子**，不是铁轨。
- 背景可以有淡淡的角色或装饰，但要压到 20% 以下，不要抢节点。

## 6. 答题界面

### 6.1 标题与题目

```html
<h1 class="duo-screen-title">Translate this sentence</h1>

<div class="duo-question">
  <div class="duo-mascot">
    <svg class="duo-icon"><use href="#di-face"></use></svg>
  </div>
  <div class="duo-bubble">
    <button class="duo-bubble__audio" aria-label="Play audio">
      <svg class="duo-icon"><use href="#di-volume"></use></svg>
    </button>
    <b>Amanda y yo</b>
    <div class="duo-bubble__hint">hablamos con la maestra.</div>
  </div>
</div>
```

- `.duo-screen-title`：26/800、-0.52、margin 2 16 12。
- `.duo-question`：flex，gap 4，padding 6 16 12。左侧吉祥物 122×118、圆角 28、`polar` 底；图标 74×74、`hare` 色。
- `.duo-bubble`：白底、2px `swan`、圆角 16、最小 84 高、padding 12 16、20/400 +0.6、行高 1.3。尖角是 15×15 的旋转方块，左边 2px 边框，位置 left -9 / top 24。`--top` 把尖角改到底部，用于“角色在题目下方”的布局。
- 气泡里的音频按钮是蓝色 26×22，图标和文字 gap 10；提示行 18px `wolf`。
- 吉祥物可以换成角色插画，但保持 122×118 的圆角块，不要直接贴一张透明 PNG 在白底上。

### 6.2 答题行与词池

```html
<div class="duo-answer-area">
  <div class="duo-answer-line" data-duo-answer></div>
  <div class="duo-answer-line" aria-hidden="true"></div>
  <div class="duo-answer-line" aria-hidden="true"></div>
</div>

<div class="duo-word-bank" data-duo-bank>
  <button class="duo-word" data-word="We">We</button>
  <button class="duo-word" data-word="are">are</button>
  <button class="duo-word" data-word="always">always</button>
</div>
```

- 答题区 padding 4 16 0；每行最小 56px、2px 下边线、词之间 gap 4。只给第一行加 `data-duo-answer`，其余行是纯装饰，`aria-hidden="true"`。
- 词池 `padding 24 16`、`min-height 190px`、`justify-content: center`、行距 10 / 列距 8。
- 词卡 46px 高、padding 0 13、2px 边、13 圆角、`0 2px 0` 底边、20/400 +0.6；按下下沉 2px。
- **上屏**（`.duo-word--placed`）：40px 高、无底无边、蓝色 `#1cb0f6`、700 字重、padding 0 2。它是答题行里的 `<button>`，点一下退回词池。
- **已用**（`.duo-word--used`）：`opacity: 0; pointer-events: none`。原词保留在词池里占位，避免剩下的词重排。不要移除 DOM，也不要把背景涂灰。
- `data-word` 是回退时的匹配键；没有它就用文字内容。带标点或重复词时一定要写 `data-word`。

### 6.3 行为层状态机

1. 点击词池里的 `.duo-word` → `placeWord()`：在答题行末尾插入一个 `.duo-word--placed.duo-pop`，给原词加 `--used`、`aria-hidden`、`tabIndex=-1`，然后派发 `duo:place`。
2. 点击答题行里的已上屏词 → `removeWord()`：删掉按钮、恢复原词、派发 `duo:remove`。
3. 监听事件更新 CHECK 的 disabled：

```js
var exercise = document.querySelector('[data-duo-exercise]');
var bank = exercise.querySelector('[data-duo-bank]');
var check = document.getElementById('lesson-check');
exercise.addEventListener('duo:place', sync);
exercise.addEventListener('duo:remove', sync);
function sync() { check.disabled = Duo.answer(bank).length === 0; }
```

4. CHECK 点击后比较 `Duo.answer(bank)` 和目标句子；正确显示 `.duo-result`，错误显示 `.duo-result--error`。`Duo.resetAnswer(bank)` 清空重来。

`[data-duo-exercise]` 是可选的作用域：没有它时 `bankScope()` 退到词池的父节点，仍然能找到答题行；同一页有多个练习时**必须**加，否则会串行。

### 6.4 底部行动区

```html
<div class="duo-actions">
  <button class="duo-btn duo-btn--green duo-btn--block" id="lesson-check" disabled>
    Check
  </button>
</div>
```

- `.duo-actions` 自带 `margin-top: auto`，所以在 flex 列的 `.duo-screen` 里会贴底。
- 词池和行动区之间不要留巨大的空白：给词池 `margin-top: auto`、行动区 `margin-top: 0`，让词池吸底。这是 demo 里的做法。
- 禁用 CHECK 是灰面灰字；一旦上屏一个词就变绿。

## 7. 答题结果面板

```html
<div class="duo-result">
  <div class="duo-result__head">
    <span class="duo-result__title">Nice!</span>
    <span class="duo-result__spacer"></span>
    <div class="duo-result__tools">
      <button class="duo-iconbtn" aria-label="Share"><svg class="duo-icon"><use href="#di-share"></use></svg></button>
    </div>
  </div>
  <button class="duo-btn duo-btn--green duo-btn--block">Continue</button>
</div>
```

- 整宽、淡绿 `#d6ffb8`、padding 14 16 16；标题 24/800 `#58a700`；工具按钮 34×34、同色。
- 错误版 `--error`：底 `#ffdfe0`、标题 `#d33131`；按钮仍然是绿色（继续），不是红色。
- 面板里的按钮强制绿色（`.duo-result .duo-btn`），不要放蓝色。
- 它**不是 Toast**：在课程里从底部升起、占满宽度、把页面内容顶上去。Toast 只用于“设置已保存”这类轻提示。

## 8. 连胜组件

### 8.1 勾选圆与星期

```html
<span class="duo-check"><svg class="duo-icon"><use href="#di-check-thin"></use></svg></span>

<div class="duo-day">
  <span class="duo-check"><svg class="duo-icon"><use href="#di-check-thin"></use></svg></span>
  M
</div>
```

- 圆 30×30，橙色 `#ff9600`，白勾 16×14。`--empty` 是灰底无勾；`--iced` 是淡蓝底 + `inset 0 0 0 4px #1cb0f6`，表示“连胜冻结”。
- `.duo-day` 是纵向 flex，gap 9，字母 16/800 -0.32，橙色；`--empty` 灰色。
- 七个一组，`space-between`；不要给它们加背景。

### 8.2 连胜卡与英雄区

```html
<div class="duo-streak-card">
  <div class="duo-streak-card__days">…7 个 .duo-day…</div>
  <div class="duo-streak-card__note">Practice each day so your streak won't reset</div>
</div>

<div class="duo-streak-hero">
  <svg class="duo-streak-hero__flame"><use href="#di-streak-large"></use></svg>
  <div class="duo-streak-hero__number">12</div>
  <div class="duo-streak-hero__label">day streak</div>
</div>
```

- 卡片 2px 边、16 圆角、白底；日期区 padding 12 16 10；底注 18/400 `wolf`，上方 2px 分隔线。
- 英雄区：padding 48 16 24，火焰 124×150，数字 96/800 -2 橙色，标签 26/800 橙色。数字和标签之间 4px。

## 9. 卡片、统计、任务

### 9.1 卡片与统计块

```html
<div class="duo-card">…</div>

<div class="duo-stat-grid">
  <div class="duo-stat">
    <svg class="duo-stat__icon duo-icon"><use href="#di-streak"></use></svg>
    <div class="duo-stat__text">
      <span class="duo-stat__value">12</span>
      <span class="duo-stat__label">Day streak</span>
    </div>
  </div>
</div>
```

- 卡片：白底、2px 边、16 圆角、无内边距（由内容决定）。
- 统计块：最小 68 高、padding 10 14、2px 边、14 圆角、图标 22×24、文字 gap 2；值 16/800 -0.32，标签 16/400 `hare`。
- 栅格：2 列，gap 12。桌面可以 4 列，但保持 12px gap。

### 9.2 任务 / 任务列表

```html
<div class="duo-task-list">
  <div class="duo-task">
    <div class="duo-task__icon"><svg class="duo-icon"><use href="#di-streak"></use></svg></div>
    <div class="duo-task__body">
      <div class="duo-task__title">Extend your streak</div>
      <div class="duo-task__meta">
        <svg class="duo-icon"><use href="#di-timer"></use></svg>1 / 3
      </div>
    </div>
    <div class="duo-task__reward"><svg class="duo-icon"><use href="#di-chest"></use></svg></div>
  </div>
</div>
```

- 列表 2px 边、12 圆角、白底、`overflow: hidden`；任务行 padding 16 18、gap 16，行间 2px 线。
- 图标列 44 宽，图标 38×40；奖励列 42 宽，图标 38×36。
- 标题 21/800 -0.105；meta 16/800 `hare`，图标 14×14。
- **完成** `--done`：2px 蓝边、10 圆角、淡蓝底 + 115° / 18px 斜条纹（`#f8fcff`），标题蓝。
- **特殊** `--special`：2px 粉边、10 圆角、淡粉底 + 同角度的 `#fff2f9` 条纹，标题粉。
- 任务列表外面不要再用 `.duo-card` 包一层，会变成双层边。

### 9.3 任务完成页

```html
<div class="duo-quest-title">1 Quest complete!</div>
```

24/800 -0.3、金色 `#ffc800`、居中、padding 8 16 18。下面是三条 `.duo-task` 和一张粉色月度挑战卡。主按钮用 `--block` + 默认蓝（`I'M COMMITTED`），不要用绿色，因为这一屏的奖励色是金和粉。

### 9.4 迷你进度

```html
<div class="duo-mini-progress" style="--duo-progress-value:40">
  <span></span>
  <div class="duo-mini-progress__label">1 / 3</div>
</div>
```

16px 高、轨道 `swan`、填充金色、最小 6px；高光 4px、缩进 5 / 距顶 3；标签 12/800 白字 + 轻影，或 `--ink` 深灰。任务行里默认金色。

## 10. 底部导航

```html
<nav class="duo-bottom-nav" aria-label="Main">
  <button class="duo-nav-btn" aria-current="page" aria-label="Learn">
    <svg class="duo-icon"><use href="#di-nav-house"></use></svg>
  </button>
  <button class="duo-nav-btn" aria-label="Practice">
    <svg class="duo-icon"><use href="#di-nav-weights"></use></svg>
  </button>
  <button class="duo-nav-btn" aria-label="Leaderboard">
    <svg class="duo-icon"><use href="#di-nav-trophy"></use></svg>
  </button>
  <button class="duo-nav-btn duo-nav-btn__badge" data-badge="2" aria-label="Quests">
    <svg class="duo-icon"><use href="#di-monthly-challenge"></use></svg>
  </button>
  <button class="duo-nav-btn" aria-label="Profile">
    <span class="duo-avatar duo-avatar--sm">JW</span>
  </button>
</nav>
```

- 94px 高（上 14 / 左右 16 / 下 30），白底，1px 顶边，5 个 40×40 点击区，`space-between`。
- 图标 32×32；选中时块变 `#ddf4ff` + `inset 0 0 0 2px #63c9f9`，图标收到 30。
- 徽标 `data-badge` 生成 17px 红点，右上角偏移 top -2 / right -4，11/800。
- 只放图标，不放文字。个人资料用 40px 头像（`--sm`）。
- 不要在导航下面再加一条安全区；home indicator 已经由 `.duo-home-indicator` 负责。

## 11. 个人资料

### 11.1 头部

```html
<div class="duo-profile-hero">
  <button class="duo-iconbtn duo-profile-hero__gear" aria-label="Settings">
    <svg class="duo-icon"><use href="#di-gear"></use></svg>
  </button>
  <div class="duo-avatar">JW</div>
</div>
```

- 278px 高，薄荷 `#5aeab1`，底部对齐，`overflow: hidden`。齿轮在 top 16 / right 16，`eel` 85%。
- 头像 164×164，白底，6px `rgba(255,255,255,.55)` 边，蓝色字母 56/800 -2，`margin-bottom: -14px` 压住下边缘。
- 头像可以是 `<img>`，但保持圆形裁切和 164 尺寸；不要加投影。

### 11.2 资料主体

```html
<div class="duo-profile">
  <div class="duo-profile__name">John Welch</div>
  <div class="duo-profile__meta">@johntheside · Joined December 2020</div>
  <div class="duo-profile__stats">
    <div class="duo-profile__stat"><b>14</b><span>Courses</span></div>
    <div class="duo-profile__stat"><b>11</b><span>Following</span></div>
    <div class="duo-profile__stat"><b>9</b><span>Followers</span></div>
  </div>
  <div class="duo-profile__actions">
    <button class="duo-btn duo-btn--secondary">
      <svg class="duo-icon"><use href="#di-invite"></use></svg>Invite
    </button>
    <button class="duo-btn duo-btn--secondary duo-btn--icon" aria-label="Share profile">
      <svg class="duo-icon"><use href="#di-share"></use></svg>
    </button>
  </div>
</div>
```

- padding 14 16 24；名字 26/800 -0.5；meta 17 `wolf` -0.2。
- 统计三栏：上下 margin 16，竖线 2px；首栏左对齐、末栏右对齐、中间居中；数字 22/800，标签 16 `wolf`。
- 操作区 gap 12，按钮 `flex: 1`；次按钮在资料页的纸边是 4px（覆盖默认 5px）。
- 下面是 Overview 的 2×2 `.duo-stat-grid` 和 Friend Streaks 卡。

### 11.3 好友

```html
<div class="duo-friends">
  <div class="duo-friends__title">Friend Streaks</div>
  <div class="duo-friends__row">
    <div class="duo-friend">MK</div>
    <button class="duo-friend duo-friend--add" aria-label="Add friend">
      <svg class="duo-icon"><use href="#di-plus"></use></svg>
    </button>
  </div>
</div>
```

- 卡内 padding 14 16 18，标题 21/800；好友圆 50×50，gap 34，`polar` 底。
- 加好友是 2px 虚线 `hare`；右下角 18px 紫色徽章（2px 白边，10px 图标）。

## 12. 列表与课程

```html
<h2 class="duo-list__heading">New Courses</h2>
<div class="duo-list">
  <button class="duo-course" aria-selected="false">
    <span class="duo-course__flag"><svg class="duo-icon"><use href="#di-flag-us"></use></svg></span>
    Spanish
    <span class="duo-course__meta">15</span>
  </button>
</div>
```

- `.duo-list`：纵向 gap 12，左右 16；标题 22/800 -0.44，margin 18 16 4。
- 课程行最小 62 高、padding 10 16、gap 14、2px 边、13 圆角、`0 3px 0` 纸边、20/800 -0.2。
- 国旗 29×22，`flex: none`；右侧 meta 16/800 `hare`，`margin-left: auto`。
- 选中 `aria-selected="true"`：文字蓝、边蓝、底 `#ddf4ff`、纸边 `#63c9f9`。
- 设置行 `.duo-row`：最小 62，padding 10 14，gap 14，底部 2px 线（最后一行去掉）；标题 18/700，detail 16/700 `hare`。放进 `.duo-list-card`（2px 边、13 圆角、`overflow:hidden`）。
- `.duo-sheet-head`：56 高、居中标题 20/800、2px 底线、关闭键绝对定位 left 12。用于课程弹层顶部。

## 13. 选择行与熟练度

```html
<button class="duo-choice" aria-pressed="true">
  <span class="duo-prof"><i class="is-on"></i><i class="is-on"></i><i></i><i></i></span>
  I'm new to French
</button>
```

- 最小 66 高、padding 12 18、gap 14、2px 边、13 圆角、`0 3px 0` 纸边、20/800。
- 选中：蓝边、淡蓝底、蓝字、纸边 `#63c9f9`。
- `.duo-prof` 30×22，4 根 6px 宽柱，高 10 / 13 / 18 / 22，gap 2，未点亮 `#d1ebf7`，点亮 `#1899d6`。柱底对齐。
- 单选组要自己维护 `aria-pressed` / `aria-selected` 互斥；JS 只负责按压手感，不负责单选逻辑。
- 两行选项（带说明）用 `.duo-choice` 里包一层文本 div，或直接用 `.duo-row` 的样式；不要缩小字号。

## 14. 排行榜

```html
<div class="duo-board">
  <div class="duo-board__zone">
    <svg class="duo-icon"><use href="#di-star"></use></svg>Promotion zone
  </div>
  <div class="duo-board-row duo-board-row--up">
    <span class="duo-board-row__rank">1</span>
    <div class="duo-avatar duo-avatar--sm">AK</div>
    <span class="duo-board-row__name">Alex</span>
    <span class="duo-board-row__xp">1 240 XP</span>
  </div>
  <div class="duo-board-row duo-board-row--me">…</div>
  <div class="duo-board__zone duo-board__zone--demote">Demotion zone</div>
</div>
```

- 行最小 62、padding 8 14、gap 12、2px 底线（末行去掉）；排名 28 宽 / 17/800 / `hare`；名字 18/800；XP 16/800 `hare`。
- 自己的行 `--me` 淡蓝底；晋级 `--up` 排名绿；降级 `--down` 排名红。
- 分区条 7 16、14/800 大写 +0.6、淡绿底 + `#58a700` 字，底边 `#d1ebf7`；降级区淡红底 + `#d33131`。
- 行头像用 `.duo-avatar--sm`（40）或 `--md`（64）；不要用 50 的好友圆。

## 15. 商店与徽章

```html
<div class="duo-shop">
  <div class="duo-shop-item">
    <div class="duo-shop-item__art"><svg class="duo-icon"><use href="#di-streak"></use></svg></div>
    <div class="duo-shop-item__name">Streak Freeze</div>
    <div class="duo-price">
      <svg class="duo-icon"><use href="#di-gem"></use></svg>200
    </div>
  </div>
</div>

<div class="duo-badge">
  <div class="duo-badge__disc"><svg class="duo-icon"><use href="#di-trophy"></use></svg></div>
  Wildfire
</div>
```

- 商店 2 列，gap 12；商品格 2px 边、13 圆角、padding 16 14、gap 10、居中；商品图区 84 高，图标 62×66；名称 18/800；价格 16/800 蓝，宝石 18×18。
- 徽章 82 宽、纵向 gap 6、14/800 `wolf`；圆盘 72×72，径向金 `#ffe98a → #ffc800 → #e6a000`，内侧 `inset 0 -4px 0 rgba(0,0,0,.12)`；图标 38×38 深金。
- 锁定 `--locked`：圆盘变 `swan`、图标 `hare`、无内阴影。
- 不要把商品格做成通栏大卡；两列是商店的识别点。

## 16. 浮层

### 16.1 底部弹层

```html
<button data-duo-open="feed-sheet">Open</button>

<div class="duo-sheet" id="feed-sheet" aria-hidden="true">
  <div class="duo-sheet__handle"></div>
  <div class="duo-sheet__body">
    <div class="duo-sheet-head">
      <button class="duo-sheet-head__close" data-duo-close aria-label="Close">
        <svg class="duo-icon"><use href="#di-close"></use></svg>
      </button>
      <div class="duo-sheet-head__title">Feed</div>
    </div>
    …
  </div>
</div>
```

- `fixed` / 手机内 `absolute`，底部 0，左右 0，最大高 88vh（手机内 82%），顶部圆角 20，`0 -8px 24px rgba(0,0,0,.2)`，`transform: translateY(102%)` → `0`，280ms `cubic-bezier(.2,.9,.3,1)`。
- grabber 44×5，`margin: 10px auto 2px`；内容区自己滚动。
- JS 会自动在 sheet 前面插入 `.duo-scrim`（如果前面没有现成的）；点遮罩、点 `data-duo-close`、Esc 都会关闭。关闭时 `aria-hidden="true"` 恢复，焦点回到打开它的按钮。
- 同一时间只应有一个 sheet；打开新的会叠加 stack，`close()` 后焦点按栈恢复。

### 16.2 对话框

```html
<div class="duo-dialog-scrim" id="quit-dialog" aria-hidden="true">
  <div class="duo-dialog" role="dialog" aria-modal="true" aria-labelledby="quit-title">
    <h2 class="duo-dialog__title" id="quit-title">Wait, don't go!</h2>
    <p class="duo-dialog__body">You'll lose your progress if you quit now.</p>
    <div class="duo-dialog__actions">
      <button class="duo-btn duo-btn--secondary" data-duo-close>Keep learning</button>
      <button class="duo-btn duo-btn--red" data-duo-close>Quit</button>
    </div>
  </div>
</div>
```

- 遮罩 50% 黑、居中、padding 24、160ms 淡入；对话框 368 宽、16 圆角、`scale(.92)` → 1。
- 标题 padding 20 24 4、22/800 -0.44、居中；正文 8 24 22、18/400 `wolf`、1.4、居中；按钮组 gap 10、padding 0 20 20，每个 `flex: 1`。
- 主行动在右；危险动作用 `--red`。按钮可能因为文案较长而换行，给 `min-height` 而不是固定 `height`。
- 打开方式：`data-duo-open="quit-dialog"`（传遮罩的 id）。JS 打开遮罩，焦点进入第一个可聚焦元素。

### 16.3 Toast

```js
Duo.toast('Nice! That is correct.', { type: 'success', icon: 'check' });
Duo.toast('Saved', { duration: 1800 });
```

- 默认深灰 `#4b4b4b` 白字；`type: "success"` 淡绿 + `#58a700`；`type: "error"` 淡红 + `#d33131`。
- padding 12 18、13 圆角、16/800、max-width 398、图标 22×22、gap 10、`0 6px 18px rgba(0,0,0,.18)`。
- 默认 2400ms；点一下立即关闭；容器是 `role="status"` + `aria-live="polite"`。
- `host` 传元素或 id 时，会在最近的 `.duo-phone` 里创建 `.duo-toast-host`；否则挂在 `body`。手机内默认 bottom 24，可以用 `--duo-toast-bottom` 抬到行动区上方（demo 的答题手机 112px，浮层实验室 104px）。触发按钮在手机外时，加 `data-duo-toast-host="phone-id"` 把 Toast 送进那台手机。
- 一次可以叠多条，纵向 gap 8。不要用它承载课程答对反馈。

## 17. 派生控件

这些在三个 Figma 文件里没有画，是按同一套 token 推的；用的时候要说明它们是推导件。

### 17.1 开关

```html
<button class="duo-switch" role="switch" aria-checked="true" aria-label="Sound effects"></button>
```

52×30，轨道 `swan` → 绿；滑块 24，top/left 3，开启位移 22，140ms。JS 自动切换 `aria-checked` 并派发 `duo:switch`。不要做成 iOS 的细长胶囊。

### 17.2 输入框

```html
<input class="duo-input" placeholder="Type your answer">
```

48 高、2px 边、12 圆角、18px；聚焦时蓝边 + `0 0 0 3px #ddf4ff`。占位符 `hare`。不要用下划线输入框。

### 17.3 滑块

```html
<input class="duo-slider" type="range" min="0" max="100" value="50">
```

16 高轨道，左侧绿色进度由 `--duo-slider-value` 控制；滑块 28，白底、3px 绿边、`0 2px 0 rgba(0,0,0,.12)`。JS 在 `input` 时重画。不要加刻度。

### 17.4 空状态

```html
<div class="duo-empty">
  <svg class="duo-icon"><use href="#di-chest"></use></svg>
  <div class="duo-empty__title">Nothing here yet</div>
  <div class="duo-empty__desc">Complete a lesson to fill this shelf.</div>
</div>
```

padding 56 24，图标 84×84 `swan`，标题 22/800，说明 16 `hare`、最大 300 宽、1.4 行高。

## 18. 动效类

- `.duo-burst`：420ms，0.86 → 1.05 → 1，用于庆祝数字、奖励。
- `.duo-pop`：320ms，0.6 → 1.06 → 1 + 淡入，用于上屏词、弹出的徽章。
- 两者都带 `both` 填充；不要给同一个元素同时加。
- `prefers-reduced-motion: reduce` 会把 `.duo-page` / `.duo-phone` 内所有动画和过渡压到 0.01ms，不需要你手动判断。

## 19. 展示辅助（不要进产品）

`.duo-kit`、`.duo-kit__inner`、`__header`、`__title`、`__sub`、`__section`、`__grid`、`__board`、`__label`、`__row`、`__stack`、`__swatches`、`__phones`、`__phone-wrap`、`__caption`，以及 `.duo-swatch`。它们只服务 `demo.html` 和规范页：灰底、白板、标签、手机排列。产品页面用了会带进 `#f7f7f7` 的整页背景和 40px 外边距。

## 20. 可访问性与键盘

- 点击区最小 40×40；图标按钮 32×32 时用 padding 或伪元素把可点区域补到 40。
- 所有图标按钮必须有 `aria-label`；纯装饰图标加 `aria-hidden="true"`（`.duo-icon` 默认 `pointer-events: none`，但不自动隐藏语义，建议在 `<svg>` 上补）。
- 按钮禁用用原生 `disabled`，不要只加类；次按钮可以用 `aria-disabled="true"`。
- 选中状态用 `aria-selected` / `aria-pressed` / `aria-current="page"`，CSS 已经接好。
- 浮层：`role="dialog"`（对话框）或 `role="dialog"` + `aria-modal="true"`（sheet），标题用 `aria-labelledby` 指向 `__title` 的 id。
- Esc 关闭、Tab 循环、关闭后焦点归还，`duolingo.js` 已经实现；自己写 React 浮层时不要把这三件事漏掉。
- 进度条加 `role="progressbar"` + `aria-valuemin/max/now`；`Duo.progress` 会更新 `aria-valuenow`。
- 颜色不是唯一信号：正确 / 错误除了绿红，还要有勾 / 叉图标和文字。
- 字号缩放到 200% 时，按钮文字不应被裁切；给按钮 `min-height` 而不是 `height`（默认 48 可以保留，但大段文案按钮要允许长高）。
