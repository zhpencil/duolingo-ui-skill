# Duolingo UI — 素材与节点清单

这份清单回答“这个类/图标/截图是从哪个 Figma 文件、哪个节点来的；哪些原稿内容没有覆盖”。节点 ID 保留 Figma 原始格式，方便你回原文件核对。

## 1. 三个源文件

| # | 文件 | File key | 作者 | 页面 | 在本 skill 里的角色 |
|---|---|---|---|---|---|
| 1 | DuoLingo Design System (Community) | `Y9HNcdPRyk3mrVUAzHgldI` | John Welch | Cover `24:482`、Components `0:1`、Existing Flows `11:4093`、Design Challenge `11:4094` | 主来源：颜色、字号、按钮、路径、答题、资料、课程列表、16 个流程截图 |
| 2 | Duolingo FREE UI Kit - By Marvilo (Community) | `woBGZQ1U4cS2myXqPfmrzw` | Marvilo | Welcome `0:1`、Screens `1:4`、Components `8:2800` | 扩展布局：排行榜、商店、徽章、好友、Web 资料页 |
| 3 | Duolingo - Unofficial Design Language (Community) | `tUtC9p62GJq20mE82XXdz3` | — | Cover `102:2`、Design Templates `130:1942`、Style Guidelines `130:1943`、Components `130:1944`、About us `130:1945` | Web 字体与展示页排版；列表 / 按钮 / 底栏 / 顶栏的交叉核对 |

三个文件都标 **CC BY 4.0**。截图是 Figma 导出的 render，不是真机截屏；因此“像素级一致”只对控件尺寸和颜色成立，文字宽度受替代字体影响。

## 2. File 1 组件集 → CSS 类

| 节点 | 组件集 | 变体（节选） | CSS / 素材 |
|---|---|---|---|
| `10:1046` | Header | `Padding=False` | `.duo-appbar`、`.duo-appbar__side`、`.duo-appbar__title` |
| `10:1067` | Question Word | `New=False/True` | `.duo-word`、`.duo-word--placed`、`.duo-answer-line` |
| `11:1416` | Question | `Type=Translate the Sentence, Answered=True/False` | `.duo-question`、`.duo-bubble`、`.duo-mascot`、`.duo-answer-area` |
| `11:2010` | Progress Ring | `Progress=0/5 … 4/5` | `.duo-ring`（`--duo-ring-value`） |
| `11:2592` | Component 1 | `Frame 79–82` | 未单独建类；属于文件内的杂项框，未用于产品组件 |
| `11:3785` | Proficiency Bar | `Property 1=0/1/2/3/4` | `.duo-prof`（4 根柱，`i.is-on`） |
| `11:4856` | Record Audio | `Selected=True/False` | **未覆盖**：口语录音按钮（见第 9 节） |
| `8:1085` | Button | `Primary/Secondary` × `Active=True/False` × `Icon=True/False` | `.duo-btn`、`--secondary`、`--icon`、`:disabled` |
| `8:1124` | Progress Bar | — | `.duo-progress`、`__fill`、`__label` |
| `8:1299` | Bottom Nav Button | — | `.duo-nav-btn`、`__badge` |
| `8:1642` | Chests | 关闭 / 打开 | `di-chest`、`di-chest-closed`、`di-chest-open`；`.duo-node--chest` |
| `8:1717` | Volume | — | `di-volume`、`.duo-bubble__audio` |
| `8:1775` | Context Bar | `State=Headline` | `.duo-section-header`（章节头） |
| `8:2043` | Bottom Nav | `Success With Translation` | `.duo-bottom-nav` |
| `8:2074` | Check | — | `.duo-check`、`di-check-thin` |
| `8:2482` | Tasks | — | `.duo-task`、`--done`、`--special`、`.duo-task-list` |
| `8:3050` | Day Tracker | — | `.duo-day`、`.duo-streak-card__days` |
| `8:493` | Flag | `Language=Spanish/French/German/…`、`Music`、`Math`、`New` | `.duo-course__flag`、`di-flag-*` |
| `8:552` | Icons | `Icon=*`、`Size=Small/Medium` | `di-*` sprite（见第 3 节） |
| `8:790` | Selected Language | — | `.duo-course[aria-selected="true"]` |
| `9:1764` | Word | — | `.duo-word` |
| `9:725` | Level | `Property 1=Selected` | `.duo-node`、`--current` |
| `9:802` | Level Icon | — | 节点里的 `di-star` / `di-weights` / `di-volume` 等 |
| `11:1934` | Section Header | — | `.duo-section-header` |
| `11:2224` | Start Tootltip（原稿拼写如此） | — | `.duo-start` |
| `11:2558` | Friend Streaks | — | `.duo-friends`、`.duo-friend`、`--add` |
| `11:4092` | Phone | — | `.duo-phone`、`.duo-screen`、`.duo-home-indicator` |

> 原稿里 `Start Tootltip` 是拼写错误，我们按功能命名为 `.duo-start`，没有沿用错字。

## 3. 图标清单（58 个）

### 3.1 游戏化与导航

| id | 用途 | 来源 |
|---|---|---|
| `di-streak` | 连胜火焰（小） | File 1 Icons `8:552` |
| `di-streak-large` | 连胜英雄区火焰 | File 1 / File 2 |
| `di-gem` | 宝石 | File 1 Icons |
| `di-heart` | 红心 | File 1 Icons |
| `di-lightning` | 能量 | File 1 Icons |
| `di-chest` / `di-chest-closed` / `di-chest-open` | 宝箱三态 | File 1 Chests `8:1642` |
| `di-trophy` | 排行榜 / 成就 | File 1 / File 2 |
| `di-monthly-challenge` | 月度挑战 | File 1 Icons |
| `di-target` | 目标 / 找等级 | File 1 Icons |
| `di-timer` | 计时任务 | File 1 Icons |
| `di-medal` | 徽章 | File 2 |
| `di-star` | 路径节点 / 星级 | File 1 Level Icon |
| `di-weights` | 练习 | File 1 |
| `di-nav-house` / `di-nav-weights` / `di-nav-trophy` | 底栏专用多色图标 | File 1 Bottom Nav |

### 3.2 课程与旗帜

`di-flag`、`di-flag-us`、`di-flag-gb`、`di-flag-es`、`di-flag-fr`、`di-flag-de`、`di-flag-it`、`di-flag-pt`、`di-flag-ru`、`di-flag-jp`、`di-flag-kr`、`di-flag-cn`、`di-flag-new`、`di-flag-music`。

- 尺寸 29×22，保持横向比例。
- `di-flag-new` 是虚线加号占位，`di-flag-music` 是音符，`di-flag` 是通用旗。
- 国旗只用于“课程语言”，不要拿来做国家/政治表达。

### 3.3 UI 图标

`di-back`、`di-close`、`di-check`、`di-check-thin`、`di-chevron-right`、`di-plus`、`di-more`、`di-dots`、`di-search`、`di-gear`、`di-bell`、`di-trash`、`di-share`、`di-invite`、`di-add-profile`、`di-book`、`di-list`、`di-lock`、`di-info`、`di-clock`、`di-play`、`di-volume`、`di-microphone`、`di-face`、`di-duo-pro`、`di-house`。

- 这些是 2px 圆头描边 + `currentColor`，在 sprite 里是单色。
- 统一 24×24；导航 32；路径 42×38；计数器 28×26。用 `.duo-icon--xs/sm/lg/xl` 调整。

### 3.4 原始文件

- `assets/icons-sprite.svg`：58 个 `<symbol>`，每个都带 `fill="none"`，内部 id 已加前缀。
- `assets/icons/*.svg`：58 个单文件，保留 Figma 的原始填充和渐变。
- 单文件里有些图标是多色平涂（宝石、火焰、宝箱、旗帜）；sprite 里保留原始填色，不强行 `currentColor`。

## 4. 16 个流程截图

| 截图 | 界面 | 对应布局章节 |
|---|---|---|
| `flows/01.png` | 锁屏 / 营销屏 | `layouts.md` 01 |
| `flows/02.png` | 学习路径（首页） | 02 |
| `flows/03.png` | 路径 + 单元卡 | 03 |
| `flows/04.png` | 答题（初始） | 04 |
| `flows/05.png` | 答题（已拼好 + 结果） | 05 |
| `flows/06.png` | 课程完成 | 06 |
| `flows/07.png` | 连胜 | 07 |
| `flows/08.png` | 任务完成 | 08 |
| `flows/09.png` | 课程选择器 | 09 |
| `flows/10.png` | 个人资料（自己） | 10 |
| `flows/11.png` | 课程列表（未选） | 11 |
| `flows/12.png` | 课程列表（已选） | 12 |
| `flows/13.png` | 熟练度问卷 | 13 |
| `flows/14.png` | 起点选择 | 14 |
| `flows/15.png` | 引导语 | 15 |
| `flows/16.png` | 路径 + 底部菜单 | 16 |

另有整板截图 `_flows-overview.png`、`_flows-board.png`、`_challenge-overview.png`、`_challenge-board.png`、`_kit2-overview.png`、`_kit2-screens.png`，用于快速浏览，不逐页引用。

## 5. File 2 的扩展布局

`_kit2-screens.png` 是 File 2 的整板索引，包含：

| 分区 | 内容 | 本 skill 的落点 |
|---|---|---|
| Fully Editable Screens | 所有成品屏的缩略索引 | 用来确认组件密度与屏幕数量 |
| Screenshots as an example | 成品展示示例 | 未直接使用 |
| Onboarding | 引导、目标选择、熟练度 | `layouts.md` 13–15 |
| Homescreen | 首页路径、单元卡、宝箱 | 02–03 |
| Lessons | 答题、结果、完成、连胜 | 04–07 |
| Streak | 连胜页、周 tracker、冻结 | 07、`.duo-check--iced` |
| Shop | 深色促销大卡、商品格 | **改造**为白卡 2 列（`.duo-shop`），保留结构不保留深色板 |
| Profile | 头像、统计、课程、好友、徽章 | 10、`.duo-badge`、`.duo-friends` |
| Leaderboards | 晋级 / 降级区、榜单行 | `.duo-board`、`.duo-board-row` |
| Quests & Badges | 金色任务页、徽章墙 | 08、`.duo-badge` |
| Create your profile & web | 资料编辑、Web 资料页 | `layouts.md` 的 Web 资料页说明；未单独做桌面页 |

## 6. File 3 的组件与页面

| 节点 | 名称 | 用途 |
|---|---|---|
| `102:2` | Cover | 封面排版参考 |
| `130:1942` | Design Templates | 展示页模板；未直接移植 |
| `130:1943` | Style Guidelines | Web 字体 `Instrument Sans` 的来源 |
| `130:2931` | List items | 列表行的间距 / 分隔线交叉核对 |
| `130:2981` | Bottom nav bar | 底栏高度与图标尺寸交叉核对 |
| `130:3236` | Button layout | 按钮布局交叉核对 |
| `130:3370` | Top Nav bar (progress) | 顶部进度栏交叉核对 |

File 3 的 Components 页 `130:1944` 以 Web 组件为主；本 skill 的移动端组件仍以 File 1 为准，只借用了它的 Web 字体和展示页排版。

## 7. 代码资产映射

| 文件 | 内容 | 有没有依赖 |
|---|---|---|
| `assets/duolingo.css` | 1816 行；token、基础、按钮、进度、路径、答题、结果、资料、列表、排行榜、商店、浮层、表单、动效、展示 | 无 |
| `assets/duolingo.js` | 行为层：单词池、浮层、Toast、进度、开关、勾选、滑块、键盘按压 | 无 |
| `assets/tokens.json` | W3C DTCG；颜色、字体、字号、字距、尺寸、圆角、阴影、间距、动效 | 无 |
| `assets/tailwind.preset.js` | Tailwind v3 preset，`duo` 命名空间 | Tailwind |
| `assets/icons-sprite.svg` | 58 个 symbol | 无 |
| `assets/icons/*.svg` | 58 个单文件 | 无 |
| `assets/fonts/nunito-latin.woff2` | Nunito 变量字体，200–900，OFL | 无 |
| `assets/demo.html` | 展示页 + 4 台可交互手机 | 仅 CSS / JS / sprite |
| `assets/brand/*.svg` | 字标与 UNOFFICIAL 徽标 | 仅展示 |

`demo.html` 内联了 sprite，所以可以直接 `file://` 打开；独立使用时把 `icons-sprite.svg` 的根 `<svg>` 内联到 `<body>` 开头。

## 8. 截图与 demo 的对应

| demo 手机 | 对应 Figma 页 | 对应截图 |
|---|---|---|
| Learn · unit path | Existing Flows 首页 | 02 / 03 |
| Lesson · word bank | Existing Flows 答题 | 04 / 05 |
| Profile · mint hero | Existing Flows 资料 / File 2 Profile | 10 |
| Courses + overlays | Existing Flows 课程列表 / 菜单 | 11 / 12 / 16 |

## 9. 没有覆盖的部分

诚实列出来，避免你误以为“全套都有”：

- **Record Audio `11:4856`**：口语题的长按 / 波形 / 评分状态没有做。要做的话，用 `.duo-btn--icon` + 录制中的红色脉冲 + 波形条；原稿只有静态选中态。
- **Level Icon 的其余变体**：文件里有 9:797、9:801、9:799、9:798、9:800、9:796、9:881、9:889、9:897、9:900、9:909、9:913 等关卡图标，本 skill 只保留了路径里最常用的星星、哑铃、耳机、宝箱；其余没有逐个导出。
- **Math 旗帜的单独变体**：只保留了 `di-flag-music` 和通用 `di-flag-new`，没有把数学符号做成独立图标。
- **深色商店促销卡**：File 2 的深蓝大卡没有复刻；按 File 1 的浅色体系重做。
- **Web 资料页 / 仪表盘**：只写了布局原则，没有做桌面成品页。
- **Rive / Lottie 角色动画、音效**：角色插画和音效不在本仓库内；`.duo-mascot` 是占位块。
- **暗色模式**：三个文件都没有，未推导。

## 10. 许可与归属

- **代码**（`.css`、`.js`、`tools/*.py`、本仓库的 HTML 结构）：MIT，见 `LICENSE`。
- **设计值、图标 SVG、截图**：来自三个 CC BY 4.0 的 Figma 社区文件，保留署名；修改包括：SVG id 加前缀、去掉画板背景、sprite 补 `fill="none"`、部分颜色按 File 1 统一。
- **Nunito**：SIL Open Font License 1.1；不是 DIN 2014 Rounded 的替代授权，只是视觉近似。
- **Duolingo**：名称、猫头鹰角色、商标归 Duolingo, Inc.；本项目是非官方粉丝整理，不隶属、未获背书。不要用本仓库的素材去冒充官方产品。
