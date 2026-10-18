# 封面页背景「科技数据流」重构 Spec

## Why
当前封面页是“单主角三角沿折线跑酷 + 波峰跳跃换角”（见 [animate-single-hero-cursor](../animate-single-hero-cursor/spec.md)）。用户希望彻底重构为“科技数据流”风格：折线像数据加载一样被逐段点亮，主角三角带流星拖尾，到达顶点时爆闪（粒子散开/聚合），全程匀速。

## What Changes
- 背景折线改为**双层 `<path>`**：底层半透明暗灰细线（2px，未激活轨道）；顶层 4px 冰蓝→暗紫渐变亮线，利用 `pathLength="100"` + `stroke-dasharray:100` + `stroke-dashoffset: 100→0` 的 CSS 动画从左到右匀速“点亮”。
- 主角光标改为**亮青白色三角形 + 3 个拖尾三角**（尺寸/透明度递减，相位延迟 0.18s 依次跟随），模拟流星拖尾。
- 动画拆为两层：外层 `@keyframes cursor-move`（仅 left/top 位置，12 个按累计弧长分布的关键帧，全程 linear 匀速）；内层 `@keyframes cursor-burst`（仅在 5 个波峰进度处 scale 1→1.7→1 + blur 0→1.6px→0 的爆闪，约 ±1.3% 进度内完成）。
- **移除**上一版的波峰抬升（top -3%）、rotate 换角、波峰外 opacity 0.3 淡出；主角全程 opacity 1。
- 三个动画 `line-grow` / `cursor-move` / `cursor-burst` **时长严格一致（9s）**、同为 `linear infinite`、主三角与亮线 delay 0 同步出发；拖尾 delay 0.18s / 0.36s / 0.54s + `animation-fill-mode: both`。
- 浅色模式：轨道线/三角配色加深以保证对比度。
- 不改 welcome 文字、Enter 提示、页脚、网格线、路由、ThemeToggle、index.html；仅改 `src/pages/WelcomePage.tsx`。

## Impact
- Affected specs: animate-single-hero-cursor（整体被本 spec 取代）
- Affected code: 仅 `src/pages/WelcomePage.tsx`

## ADDED Requirements

### Requirement: 路径点亮（双层轨道）
The welcome page background SHALL render two stacked SVG `<path>` elements along the same polyline: a faint bottom track and a glowing top line that "grows" from left to right in sync with the hero cursor.

#### Scenario: 页面加载
- **WHEN** 用户打开 WelcomePage
- **THEN**: 背景有两条叠加折线：底层为半透明暗灰细线（2px），始终可见；顶层为 4px 冰蓝→暗紫渐变亮线，通过 `stroke-dashoffset` 动画从左到右匀速亮起，走过的地方常亮、未走到的地方透明，整段走完立即重置并重复

### Requirement: 流星拖尾主角
The hero cursor SHALL be a bright cyan-white triangle with three trailing triangles of decreasing size and opacity, following the same path with uniform speed.

#### Scenario: 匀速前进
- **WHEN** 动画运行时
- **THEN**: 最前端为 24px 主三角（opacity 1，亮青白色 + 强烈 drop-shadow 发光）；其后 3 个拖尾三角分别为 18px/13px/9px，opacity 0.50/0.28/0.14，动画延迟 0.18s/0.36s/0.54s 依次跟随，形成 Star-trail 效果；所有 4 个三角全程保持 opacity 不淡出

### Requirement: 波峰爆闪
At each polyline peak (vertex 2/4/6/8/10), the hero cursor + trailing triangles SHALL perform a brief burst (scale up + slight blur) without parabolic jump or rotation.

#### Scenario: 到达波峰顶点
- **WHEN** 三角形移动到折线的上凸顶点
- **THEN**: 外层位置仍紧贴折线（无抬升），内层在约 ±1.3% 进度内完成 `scale(1)→scale(1.7)→scale(1)` 并叠加 `filter: blur(0)→blur(1.6px)→blur(0)`，模拟粒子爆闪/散开，随后恢复原状继续匀速前进

## MODIFIED Requirements

### Requirement: 背景折线（发光渐变→双层点亮）
- 底层：新增同 `d` 的 `<path>`，stroke 为半透明暗灰细线（dark `rgba(100,116,139,0.30)` / light `rgba(71,85,105,0.25)`），`strokeWidth={2}`，`strokeLinecap/Linejoin="round"`
- 顶层：原渐变亮线增加 `pathLength="100"`，`strokeDasharray: '100'`，`animation: line-grow 9s linear infinite`（keyframes 内 `stroke-dashoffset: 100 → 0`）
- 线宽保持 4px；`drop-shadow` 发光保留；4 条装饰网格线不变

## REMOVED Requirements

### Requirement: 波峰跳跃与换角（抛物线 + rotate）
**Reason**: 用户明确“不需要物理抛物线的跳跃”，改用爆闪；同时取消 rotate 换角，减少视觉噪音。
**Migration**: 删除旧 `@keyframes cursor-run`、单三角光标覆盖层、以及 `top` 抬升和 `rotate` 逻辑。

## Non-Goals
- 不使用 `offset-path`/`offset-distance`：背景 SVG 为 `preserveAspectRatio="none"` 非等比拉伸，`offset-path` 基于 CSS 像素坐标，仅在视口恰好 1280×720 时与折线对齐；继续采用与 SVG 完全一致的百分比 `left`/`top` 关键帧（`x/1280`、`y/720`），任意分辨率都贴合。匀速由“按累计弧长分配关键帧进度 + 全程 `animation-timing-function: linear`”保证。
- 不引入新依赖、不改 `index.html`。
- 拖尾无独立物理，仅为主角动画的相位延迟副本。

## Acceptance Criteria

### AC-1: 双层路径与点亮动画
- **Type**: `rule`
- **When**: 打开封面页
- **THEN**: 背景 SVG 内有两条同 d 的 `<path>`：底层 2px 半透明暗灰细线；顶层 4px 渐变亮线，`pathLength="100"`、`stroke-dasharray:100`、`stroke-dashoffset` 动画 100→0，亮起部分与主三角同步
- **Evidence**: 代码审查 + 浏览器 DOM 断言

### AC-2: 时长严格一致与同步
- **Type**: `rule`
- **When**: 审查代码 / 浏览器取样式
- **THEN**: `line-grow`、`cursor-move`、`cursor-burst` 的 `animation-duration` 均为 `9s`、`animation-timing-function` 均为 `linear`；主三角与亮线 delay 0，同步出发；拖尾 delay 分别为 `0.18s/0.36s/0.54s`
- **Evidence**: 代码审查 + DOM computed style

### AC-3: 唯一主角 + 3 拖尾
- **Type**: `rule`
- **When**: 打开封面页
- **THEN**: 页面共有 4 个 `<polygon>` 三角形（1 主 + 3 拖尾）；主三角 24px、opacity 1；拖尾分别为 18px/13px/9px、opacity 0.50/0.28/0.14；4 个三角始终在折线上可见
- **Evidence**: 浏览器 DOM 断言 + 截图

### AC-4: 波峰爆闪
- **Type**: `rule`
- **When**: 观察动画在波峰顶点
- **THEN**: 到达节点 2/4/6/8/10 时，三角形短暂放大（scale 峰值约 1.7）并带 `blur(1.6px)`，约 0.1s 后恢复原状；无 top 抬升、无 rotate、无抛物线跳跃
- **Evidence**: 浏览器 DOM computed style 采样 + 人眼观察

### AC-5: 全程匀速 linear
- **Type**: `rule`
- **When**: 审查关键帧与样式
- **THEN**: `cursor-move` 关键帧之间全为 `linear`（无 ease-in/ease-out）；节点时间进度按累计弧长分配；无速度突变
- **Evidence**: 代码审查 + 关键帧文本

### AC-6: 主题适配与无回归
- **Type**: `rule`
- **When**: 深色/浅色双主题 + `npx tsc --noEmit`
- **THEN**: 浅色模式轨道线/三角配色加深且清晰；tsc 退出码 0；无 console error；welcome 文字、Enter 提示、页脚、网格线、ThemeToggle 均正常
- **Evidence**: tsc 输出 + 浏览器 console + 双主题截图

---

## 追加需求（2026-10-18）：彗星拖尾增强 + 顶点星芒 + 雷达波纹

### Why
数据流基础版效果已获得用户认可，现要求在**保持蓝紫渐变亮线与亮青色主角三角、全程匀速不变**的前提下，增加彗星尾迹、顶点十字星芒、顶点雷达波纹三种特效，把视觉冲击力拉满。

### What Changes
- **彗星拖尾增强**：3 个拖尾三角的 opacity 由 0.50/0.28/0.14 提升为 **0.6/0.4/0.2**（用户指定）；并新增**青色尾迹线**——背景 SVG 内第三条 `<path>`（同 d），`pathLength="100"`、`strokeDasharray: '6 200'`（单短划，间隙 200>100 保证全程最多一段可见、循环无环绕伪影）、`@keyframes line-tail` 使 `stroke-dashoffset: 6 → -94`（9s linear infinite，delay 0），形成约 6% 弧长（≈120px）的亮青尾迹，始终贴在主角身后并顺折线方向流动。
- **顶点十字星芒**：顶点集合定义为折线的**全部极值点**（上凸波峰 2/4/6/8/10 + 下凹波谷 3/5/7/9，共 9 个；端点 0/11 与非转向节点 1 除外）。每个顶点预埋一个十字星 SVG（48×48，两条相交 1.5px 高亮细线 + 发光），默认 `opacity:0`。动画 `@keyframes star-flash`（9s linear infinite，delay = 该顶点的过点时刻 `trackCumulative[i]/trackTotal × 9s`）：`0% opacity 0 scale 0.5 rotate 0°` → `1.2% opacity 1 scale 1.4 rotate 20°` → `2.8% opacity 0.9 scale 2 rotate 45°` → `5% opacity 0 scale 2.3 rotate 70°` → `100%` 保持隐藏。爆发时长 ≈0.45s，带轻微旋转，模拟镜头光晕。
- **顶点雷达波纹**：同一批顶点各预埋一个圆环 SVG（120×120，圆 r=50、极细青色 stroke、fill none），默认 scale 0 不可见。动画 `@keyframes ripple-flash`（同 9s、同 delay）：`0% opacity 1 scale 0` → `6.5% opacity 0 scale 1` → `100%` 保持隐藏，即半径 0→50px、透明度 1→0，约 0.59s 扩散完毕。
- **同步保证**：星芒、波纹、主角爆闪、尾迹全部由同一 `trackCumulative / trackTotal` 与同一周期 9s 推导，delay 精确到毫秒级一致。
- **不变项**：`glowLineGrad` 渐变、亮线 4px + drop-shadow、底层轨道、主角/拖尾三角的颜色与尺寸、`cursor-move` / `cursor-burst` / `line-grow` 关键帧、welcome 文字、Enter 提示、页脚、网格线、ThemeToggle、index.html。
- 浅色模式：尾迹/星芒/波纹使用加深的青色（`#0891B2` / `#0B7285` 系）保证对比度。

### ADDED Requirements（追加）

#### Requirement: 彗星尾迹线
The background SHALL render a ~120px glowing cyan tail segment that follows immediately behind the hero triangle along the polyline.

##### Scenario: 主角前进
- **WHEN** 主角三角沿折线匀速移动
- **THEN**: 其身后始终跟随一段约 6% 弧长（≈120px）的亮青色尾迹，方向顺折线，随主角循环重置；循环边界不出现路径远端的残段闪烁

#### Requirement: 顶点十字星芒
Each polyline extremum vertex (peaks and valleys, 9 total) SHALL flash a star-cross glare exactly when the hero triangle passes through it.

##### Scenario: 主角经过顶点
- **WHEN** 主角三角到达任一波峰/波谷顶点
- **THEN**: 该顶点的预埋十字星在约 0.45s 内 opacity 0→1→0、scale 0.5→2、rotate 0°→70°，随后隐藏至下一周期；未经过时恒不可见

#### Requirement: 顶点雷达波纹
Each extremum vertex SHALL emit one expanding ring at the same moment the star flash fires.

##### Scenario: 主角经过顶点
- **WHEN** 星芒触发的同一时刻
- **THEN**: 以该顶点为圆心，圆环半径 0→50px 扩散，同时 opacity 1→0，约 0.59s 完成，随后隐藏至下一周期；与星芒严格同帧触发

### Acceptance Criteria（追加）

#### AC-7: 彗星尾迹线跟随且无环绕伪影
- **Type**: `rule`
- **When**: 打开封面页
- **THEN**: 背景 SVG 内有第 3 条 `<path>`：`pathLength="100"`、`stroke-dasharray: 6 200`、`line-tail 9s linear infinite`（dashoffset 6→-94）；尾迹亮段末端与主三角位置重合；循环重置瞬间路径远端无残段
- **Evidence**: 代码审查 + 浏览器 DOM 断言 + 采样比对

#### AC-8: 9 个顶点各有星芒与波纹且延迟精确
- **Type**: `rule`
- **When**: 打开封面页
- **THEN**: 页面上有 9 组十字星 + 9 组圆环预埋元素；第 i 组（顶点索引 k∈{2..10}）两个动画的 `animation-delay` 均 = `trackCumulative[k]/trackTotal × 9s`（1.51s/2.08s/3.46s/4.17s/5.34s/6.12s/7.22s/7.99s/8.60s）；动画周期均为 9s
- **Evidence**: 浏览器 DOM 断言

#### AC-9: 爆发动画内容正确
- **Type**: `rule`
- **When**: 审查关键帧文本
- **THEN**: `star-flash` 含 opacity 0→1→0、scale(0.5)→scale(2)、rotate(0deg)→rotate(70deg)，且 5% 后 opacity 恒 0；`ripple-flash` 含 scale(0)→scale(1)、opacity 1→0，6.5% 后恒隐藏
- **Evidence**: 浏览器提取 style 文本

#### AC-10: 既有视觉零回归
- **Type**: `rule`
- **When**: 双主题打开页面 + `npx tsc --noEmit`
- **THEN**: 渐变亮线、底层轨道、主角与拖尾三角颜色/尺寸、`cursor-move`/`cursor-burst`/`line-grow` 均与追加前一致；拖尾三角 opacity 为 0.6/0.4/0.2；tsc 退出码 0；无 console error；双主题截图清晰
- **Evidence**: tsc 输出 + DOM 断言 + 截图

---

## 追加需求（2026-10-18 第二次）：移除生硬几何图形，回归纯粹流畅

### Why
用户反馈十字星芒和雷达波纹过于生硬，像报错图标，破坏整体美感。要求做减法：彻底删除这些几何图形，回归"干净、流畅、未来感"的纯粹视觉体验。

### What Changes
- **REMOVED 顶点十字星芒**：删除 `@keyframes star-flash`、`starStroke` 颜色键、9 组十字星预埋元素及其渲染代码
- **REMOVED 顶点雷达波纹**：删除 `@keyframes ripple-flash`、`rippleStroke` 颜色键、9 组圆环预埋元素及其渲染代码
- **MODIFIED 波峰特效**：将 `cursor-burst` 从 `scale + blur` 爆闪改为**仅增强 `drop-shadow` 发光**——到达波峰时发光半径短暂扩大（约 1.5 倍），随后恢复，无缩放、无模糊、无额外图形
- **RETAINED 彗星拖尾**：保留 `line-tail` 尾迹线（约 120px 亮青短划，紧贴折线方向流动）+ 3 个渐隐拖尾三角（opacity 0.6/0.4/0.2，delay 0.18s/0.36s/0.54s）
- **RETAINED 路径点亮**：保留双层轨道（底层暗灰细线 + 顶层渐变亮线 `line-grow` 动画）
- **RETAINED 主角三角**：保留 24px 亮青白三角 + 全程 `cursor-move` 匀速移动（9s linear）
- **目标效果**：干净、流畅、未来感，无任何抢戏的多余图形

### REMOVED Requirements（第二次追加）

#### Requirement: 顶点十字星芒
**Reason**: 用户明确反馈十字星过于生硬，像报错图标，破坏"干净流畅"的整体氛围。
**Migration**: 删除 `@keyframes star-flash`、`colors.starStroke`、以及 `vertexIndexes.map` 中渲染十字星的所有代码。

#### Requirement: 顶点雷达波纹
**Reason**: 用户明确反馈雷达波纹过于生硬，像报错图标，破坏"干净流畅"的整体氛围。
**Migration**: 删除 `@keyframes ripple-flash`、`colors.rippleStroke`、以及 `vertexIndexes.map` 中渲染圆环的所有代码。

### MODIFIED Requirements（第二次追加）

#### Requirement: 波峰发光增强（替代爆闪）
At each polyline peak (vertex 2/4/6/8/10), the hero cursor SHALL briefly intensify its glow (drop-shadow radius ~1.5x) without scale change, blur, or any additional geometric shapes.

##### Scenario: 到达波峰顶点
- **WHEN** 三角形移动到折线的上凸顶点（节点 2/4/6/8/10）
- **THEN**: 外层位置仍紧贴折线（无抬升），内层在约 ±1.3% 进度内完成 `drop-shadow` 发光半径从正常值短暂增强到约 1.5 倍再恢复（模拟能量聚集/释放），无 scale 变化、无 blur、无额外图形，随后恢复原状继续匀速前进

### Acceptance Criteria（第二次追加）

#### AC-11: 十字星芒与雷达波纹已彻底移除
- **Type**: `rule`
- **When**: 审查 WelcomePage.tsx 代码 + 浏览器 DOM 断言
- **THEN**: 代码中不含 `star-flash` / `ripple-flash` keyframes；不含 `starStroke` / `rippleStroke` 颜色键；不含 `vertexIndexes` 数组及其 map 渲染；页面上无十字星 `<svg>`、无圆环 `<circle>`；无相关 console error
- **Evidence**: 代码审查 + 浏览器 DOM 断言

#### AC-12: 波峰仅发光增强，无缩放/模糊/额外图形
- **Type**: `rule`
- **When**: 观察动画在波峰顶点
- **THEN**: 到达节点 2/4/6/8/10 时，三角形仅 `drop-shadow` 发光半径短暂增强（约 1.5 倍），无 `scale` 变化、无 `blur`、无旋转、无抛物线跳跃、无额外几何图形；发光增强在约 ±1.3% 进度内完成
- **Evidence**: 浏览器 computed style 采样 + 关键帧文本断言

#### AC-13: 彗星拖尾保留且平滑紧贴
- **Type**: `rule`
- **When**: 打开封面页
- **THEN**: 背景 SVG 内仍有第 3 条尾迹 `<path>`（`pathLength="100"`、`stroke-dasharray: 6 200`、`line-tail 9s linear infinite`）；3 个拖尾三角 opacity 0.6/0.4/0.2、delay 0.18s/0.36s/0.54s 保持不变；尾迹始终紧贴主角身后、顺折线方向流动；循环边界无远端残段
- **Evidence**: 代码审查 + 浏览器 DOM 断言

#### AC-14: 干净流畅未来感，零回归
- **Type**: `rule`
- **When**: 双主题打开页面 + `npx tsc --noEmit`
- **THEN**: 渐变亮线、底层轨道、主角与拖尾三角颜色/尺寸、`cursor-move`/`line-grow` 关键帧均未改动；tsc 退出码 0；无 console error；页面无十字星、无圆环等多余图形；双主题视觉清晰
- **Evidence**: tsc 输出 + DOM 断言 + 截图

---

## 追加需求（2026-10-18 第三次）：浅色模式配色优化 + 主题切换平滑过渡

### Why
浅色模式下背景折线、拖尾与三角沿用深青/暗紫色系（`#2B7FA8` / `#5B2E7D` / `#0B7285` / `#0891B2`），在浅背景上发黑、观感如铁丝。需改为亮青/天蓝系并与 welcome 文字天蓝色（`#0EA5E9`）呼应，同时让主题切换时颜色平滑过渡。

### What Changes
- **浅色折线渐变**：`lineGradStart`/`lineGradEnd` 由 `#2B7FA8`/`#5B2E7D` 改为 **`#00B4D8`（亮青）→ `#3B82F6`（天蓝）**，与 welcome 文字 `#0EA5E9` 同色系呼应
- **浅色底层轨迹线**：`trackStroke` 由 `rgba(71,85,105,0.25)` 改为 **`#E2E8F0`**（极浅灰、不透明）
- **浅色主角/拖尾三角**：`heroFill` 由 `#0B7285` 改为 **`#00B4D8`**；发光 `heroGlow`/`heroGlowBurst` 改为 `rgba(0,180,216,...)` 亮青系（发光半径与深色一致：4/10px 与 7/16px）
- **浅色彗星尾迹**：`tailStroke` 由 `#0891B2` 改为 **`#00B4D8`**；`tailGlow` 改为 `drop-shadow(0 0 4px rgba(0,180,216,0.6))`
- **浅色亮线发光**：`lineGlow` 由 `rgba(43,127,168,0.35)` 改为 `rgba(0,180,216,0.40)`
- **深色模式全部颜色保持不变**
- **主题切换平滑过渡**：背景 SVG 的轨迹/亮线/尾迹、渐变 stop、网格线、主角与拖尾三角的 `stroke`/`fill`/`stop-color`/`filter`/`opacity` 增加 `transition: ... 0.4s ease`；为此将相关 SVG 的 `stroke`/`fill`/`stopColor` 从属性形式改为 style（CSS 属性）形式，使其可被 transition 过渡
- **不变项**：动画（`line-grow`/`cursor-move`/`cursor-burst`/`line-tail`/`welcome-draw`/`neon-flicker`）、结构、尺寸、welcome 文字、Enter 提示、页脚、ThemeToggle、路由、index.html

### MODIFIED Requirements（第三次追加）

#### Requirement: 浅色模式背景流光配色（亮青/天蓝系）
In light theme, the polyline gradient, hero triangle, trailing triangles and comet tail SHALL use a bright-cyan-to-sky palette (`#00B4D8` → `#3B82F6`) that echoes the welcome text sky-blue (`#0EA5E9`); the inactive track SHALL be a very light gray (`#E2E8F0`).

##### Scenario: 切换到浅色模式
- **WHEN** 用户切换到浅色主题
- **THEN**: 渐变亮线为亮青→天蓝（`#00B4D8`→`#3B82F6`）；底层轨迹线为极浅灰 `#E2E8F0`；主角与拖尾三角填充亮青 `#00B4D8`；彗星尾迹亮青 `#00B4D8`；所有发光为亮青系 `rgba(0,180,216,...)`；视觉明亮通透、不发黑

#### Requirement: 主题切换颜色平滑过渡
Color changes on theme toggle SHALL animate smoothly via CSS transitions (~0.4s ease) instead of switching instantly.

##### Scenario: 点击主题切换
- **WHEN** 用户点击 ThemeToggle 切换主题
- **THEN**: 折线渐变、轨迹线、尾迹、三角填充与发光颜色在约 0.4s 内平滑过渡，无生硬跳变

### Acceptance Criteria（第三次追加）

#### AC-15: 浅色配色值正确
- **Type**: `rule`
- **When**: 浅色主题下浏览器 DOM 断言
- **THEN**: 渐变 stop 为 `#00B4D8`/`#3B82F6`；轨迹 stroke 为 `#E2E8F0`；尾迹 stroke 为 `#00B4D8`；三角 fill 为 `#00B4D8`；发光均为 `rgba(0,180,216,...)` 亮青系
- **Evidence**: 浏览器 DOM 断言

#### AC-16: 深色模式零变化
- **Type**: `rule`
- **When**: 深色主题下浏览器 DOM 断言
- **THEN**: 所有颜色键与追加前完全一致（`#6BC5E8`/`#7B4B9E`/`rgba(100,116,139,0.30)`/`#E8FDFF`/`#5FFBF1` 等）
- **Evidence**: 浏览器 DOM 断言

#### AC-17: 过渡生效
- **Type**: `rule`
- **When**: 审查相关元素 computed style 并切换主题
- **THEN**: 轨迹/亮线/尾迹 path、渐变 stop、三角 polygon 的 computed style 含 `transition`（`stroke`/`fill`/`stop-color`/`filter`，约 0.4s ease）；切换主题时颜色平滑变化、无跳变
- **Evidence**: 浏览器 DOM 断言 + 人眼观察

#### AC-18: 零回归
- **Type**: `rule`
- **When**: 双主题 + `npx tsc --noEmit`
- **THEN**: tsc 退出码 0；双主题无 console error；所有动画行为不变；仅修改 WelcomePage.tsx；未 push
- **Evidence**: tsc 输出 + 浏览器 console
