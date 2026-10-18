# 封面页像素跑酷流光 Spec

## Why
封面页背景流光要从"霓虹渐变流光"改为"像素游戏跑酷"风格：像素砖块跑道 + 小鸟节点依次跳跃。该页面**本来就没有 ECharts**（背景流光一直是内联 SVG，见 [svg-text-replace-echarts](../svg-text-replace-echarts/spec.md) 与上一版 [welcome-cat-flowline-svg](../welcome-cat-flowline-svg/spec.md)），因此本次是**替换现有 SVG 流光逻辑**，全部用 SVG + CSS 动画实现，不引入任何新依赖。

## What Changes
- 移除现有流光元素：`lineGrad` 渐变、`softGlow` / `flowGlow` 滤镜、`mainPath` 渐变折线、6 个 🐱 `<text>` 数据点、`<animateMotion>` 移动光点。
- 新增像素砖块跑道：按 `linePoints` 相邻节点拆成 11 段，每段 `<line>` 独立绘制，`strokeWidth=4`、`strokeDasharray="10 4"`（砖块拼接感）、`strokeLinecap="butt"`、`strokeLinejoin="miter"`；**颜色红绿交替**（砖块红 `#C84C0C` / 管道绿 `#3FA34D`）。
- 新增小鸟节点层：12 个节点各放一个**内联 SVG 像素小鸟**（金色 `#FFD700` + 深色描边），绝对定位在节点坐标对应的百分比位置。
- 新增跳跃动画：CSS `@keyframes` 实现"出现 → 上抛抛物线 → 落回 → 淡出"，单次跳跃 0.8s；总循环 2.6s，节点间用 `animation-delay: i*0.12s` 依次错开，形成从左到右跑酷。
- 主题适配：深色用 `#C84C0C / #3FA34D`，浅色用更深的 `#B03E06 / #2E7D32`；小鸟恒为金 `#FFD700` + 深色描边，保证浅底 `#F0F4F8` 上有足够对比度。
- **不修改** `index.html`（不使用 Remix Icon CDN）。装饰性水平网格线、`welcome` 文字描边动画、Enter 提示、路由、ThemeToggle 均不动。

## Impact
- Affected code: 仅 `src/pages/WelcomePage.tsx`（`colors` 常量、背景 `<svg>`、新增小鸟动画层）
- 依赖：无新增（不引入 echarts，不引入 remixicon 字体）

## MODIFIED Requirements

### Requirement: 封面页背景像素跑道
The welcome page background SHALL render a full-bleed pixel-art brick track with jumping bird nodes, animated entirely with inline SVG + CSS, with no external network dependency.

#### Scenario: 打开封面页
- **WHEN** 用户打开 WelcomePage
- **THEN**: 折线自左边缘 x=0 延伸至右边缘 x=1280；线条 4px 粗、呈 `10 4` 砖块断续感并红绿交替；12 个节点各有一个金色像素小鸟，按从左到右顺序依次弹跳（每次 0.8s）后淡出并循环

#### Scenario: 明暗主题切换
- **WHEN** 切换主题（深色背景 `#1A1A1E` 系 / 浅色背景 `#F0F4F8` 系）
- **THEN**: 深色用 `#C84C0C`/`#3FA34D`，浅色用 `#B03E06`/`#2E7D32`；小鸟在两种背景下均清晰可辨

## ADDED Requirements

### Requirement: 内联 SVG 小鸟图标
The bird icon SHALL be drawn as inline SVG (pixel-art style), not a font icon or external CDN resource.

#### Scenario: 离线/无外网环境
- **WHEN** 在无外网的环境下打开封面页
- **THEN**: 小鸟图标正常显示（不依赖任何外部字体或 CDN）；不产生失败的网络请求

## Non-Goals
- 不使用 Remix Icon CDN / 字体图标（经评估：woff2 在浏览器验证中拉取失败，且字体缺失时图标会渲染为空白）。改用内联 SVG 像素小鸟，零网络依赖。
- 不逐帧平滑走完全程——按用户确认接受"闪现跳跃"表现。
- 不修改装饰性水平网格线（暗色 opacity 0.08、浅色隐藏）。
- 不改 `welcome` 文字描边动画、Enter 提示、`© 2026` 页脚、路由、`ThemeToggle`。
- 不新增依赖、不改 `index.html`。

## Acceptance Criteria

### AC-1: 像素砖块折线贯穿左右
- **Type**: `rule`
- **When**: 打开封面页
- **THEN**: 折线由 11 段组成，每段 `stroke-width="4"`、`stroke-dasharray="10 4"`；颜色红绿交替；路径首点 x=0、末点 x=1280，渲染后自视口左缘贯通至右缘
- **Evidence**: 代码审查 + 浏览器 DOM 断言

### AC-2: 旧流光逻辑已移除
- **Type**: `rule`
- **When**: 审查 WelcomePage.tsx
- **THEN**: 不含 `echarts` import；不含 `lineGrad` / `softGlow` / `flowGlow` / `animateMotion` / 🐱 `<text>` / 渐变 `mainPath`
- **Evidence**: 代码审查

### AC-3: 小鸟节点为内联 SVG 且零外部依赖
- **Type**: `rule`
- **When**: 打开封面页
- **THEN**: 12 个节点各有一个内联 `<svg>` 小鸟（金色填充 + 深色描边）；页面无指向 cdn.jsdelivr.net 等外部的字体/图标请求
- **Evidence**: 浏览器 DOM 断言 + 网络请求检查

### AC-4: 跳跃动画节奏
- **Type**: `rule`
- **When**: 打开封面页观察
- **THEN**: 单次跳跃时长 0.8s；节点间 `animation-delay` 依次递增形成从左到右顺序；动画含上抛、落回与淡出，且循环播放
- **Evidence**: 浏览器 DOM 断言 + 截图/人判断

### AC-5: 明暗主题下均清晰可见
- **Type**: `rule`
- **When**: 分别在深色与浅色模式下查看
- **THEN**: 砖块与小鸟在两种背景上均清晰可辨（浅色用加深的红绿 + 小鸟深色描边保障对比度）
- **Evidence**: 浏览器双主题截图

### AC-6: 无回归
- **Type**: `rule`
- **When**: `npx tsc --noEmit` 与打开页面
- **THEN**: tsc 退出码 0；无 console error；`welcome` 文字、Enter 提示、页脚、主题切换正常
- **Evidence**: tsc 输出 + 浏览器 console

## Open Questions
- 小鸟图形采用"像素风拼块"而非复刻 Twitter/Remix Icon 的鸟形轮廓（避免直接复刻商标图形，且更契合像素游戏主题）。若需要写实小鸟轮廓，可后续替换为单条 `<path>`。

---

## 追加需求（2026-10-17）：放慢跑酷动画节奏

### Why
用户预览后反馈：背景折线的小鸟跳跃动画**速度太快**，希望整体节奏更舒缓。

### What Changes
- 仅调整**速度相关的两个数值**，配色、形状、SVG 结构与元素数量全部不变：
  - 小鸟 `animation` 总时长 `2.6s` → **`6.4s`**（`pixel-jump` 关键帧百分比结构不变，跳跃段占比 0%~31% 不变，故单次跳跃由约 0.8s 拉长为**约 2s**）。
  - 节点间隔 `animationDelay: i * 0.12s` → **`i * 0.3s`**（最后一个节点延迟 3.3s，仍小于 6.4s 循环周期）。
- **不改** `@keyframes pixel-jump` 的关键帧百分比与位移/透明度取值。
- **不改** `welcome` 文字的 `welcome-draw 3s` 描边动画（经用户确认保持不变）。
- 背景折线的 11 段为静态虚线段，**本身没有绘制动画**，故"线条绘制速度"无对应对象。

### MODIFIED Requirements

#### Requirement: 跳跃动画节奏
The bird jump animation SHALL run at a relaxed pace, with a single jump lasting about 2 seconds and nodes appearing at a widened interval.

##### Scenario: 打开封面页观察节奏
- **WHEN** 用户打开封面页
- **THEN**: 单个小鸟从出现到淡出约 2s；相邻节点出现间隔 0.3s，12 个节点在约 3.3s 内依次自左向右跳出；整体循环 6.4s

##### Scenario: 视觉不变
- **WHEN** 对比调整前后
- **THEN**: 红绿交替砖块折线、金色像素小鸟的形状/颜色/数量/位置完全一致，仅节奏变慢

### Acceptance Criteria（追加）

#### AC-7: 放慢后节奏正确且视觉零变化
- **Type**: `rule`
- **When**: 打开封面页并审查代码
- **THEN**: `<span>` 的 `animation-duration` 为 `6.4s`、`animation-delay` 依次为 `0s / 0.3s / 0.6s … 3.3s`；`@keyframes pixel-jump` 关键帧与颜色常量、元素结构均未改动；单次跳跃约 2s
- **Evidence**: 代码审查 + 浏览器 DOM 断言 + 双主题截图
