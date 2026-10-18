# 封面页流光改造为「冰蓝渐变实线 + 旋转三角光标」Spec

## Why
用户对上一版「像素跑酷」流光（红绿交替虚线 + 金色小鸟）不再满意，要求**彻底替换**为更平滑、更有科技感的形态：一条带外发光的冰蓝→暗紫渐变实线，节点图标改为会随跳跃旋转的等边三角形（数据光标）。

## What Changes
- **移除**像素跑酷元素：
  - 删掉 11 段红绿交替的像素虚线 `<line>`（`strokeDasharray="10 4"`、砖块红 `#C84C0C` / 管道绿 `#3FA34D`）。
  - 删掉 12 个金色像素小鸟（`<rect>` 拼块、`#FFD700` 填充 + 深色描边）。
  - 删掉 `@keyframes pixel-jump`，以及 `colors` 中的 `brickRed` / `pipeGreen` / `birdFill` / `birdStroke`。
- **新增平滑发光实线**：用**一条** `<path>` 沿原有 12 个节点绘制（`fill="none"`、`strokeWidth≈3`、`strokeLinecap="round"`、`strokeLinejoin="round"`），描边取 `<linearGradient>` 渐变（冰蓝 `#6BC5E8` → 暗紫 `#7B4B9E`），并用 CSS `drop-shadow` 叠加两档发光（外发光）营造流光质感。
- **新增三角形数据光标**：12 个节点各放一个**内联 SVG 等边三角形** `<polygon>`（`viewBox="0 0 16 16"`），填充冰蓝 `#6BC5E8`，并带轻微发光（CSS `drop-shadow`）。
- **新增跳跃 + 旋转动画**：`@keyframes` 取代原 `pixel-jump`，保留"出现 → 上抛抛物线 → 落回 → 淡出"的跳跃，并在跃起过程中叠加 `rotate`——每次跳跃**顺时针旋转 120°**（"换角"视觉）。单次跳跃约 **1.5s**，整体循环 **5s**，节点间隔 `animationDelay: i * 0.25s` 依次错开。
- **主题适配**：深色用 `#6BC5E8` / `#7B4B9E`；浅色（背景 `#F0F4F8`）下冰蓝对比过低，故浅色改用同色系加深版（约 `#2B7FA8` / `#5B2E7D`），三角形同步加深，保证清晰可见。
- **不修改**：装饰性水平网格线、`welcome` 文字描边动画、Enter 提示、`© 2026` 页脚、路由、`ThemeToggle`、`index.html`；不新增任何依赖。

## Impact
- Affected code: 仅 [WelcomePage.tsx](../../../src/pages/WelcomePage.tsx)（`colors` 常量、`<style>` 关键帧、背景 `<svg>`、节点覆盖层）
- 依赖：无新增（仍为纯内联 SVG + CSS 动画，不引入 echarts / remixicon）
- **BREAKING**（视觉）：上一版「像素砖块跑道 + 金色小鸟」的形态被完全取代；红色/绿色像素配色与小龟图标不再存在

## ADDED Requirements

### Requirement: 平滑发光渐变实线
The welcome background SHALL render a single smooth solid polyline with an outer glow, stroked by an ice-blue → dark-purple linear gradient.

#### Scenario: 打开封面页
- **WHEN** 用户打开 WelcomePage
- **THEN**: 背景只有一条实线折线，无任何虚线/像素断点；线条自左缘 x=0 延伸至右缘 x=1280；描边为渐变（深色 `#6BC5E8` → `#7B4B9E`）；线条带可见的外发光

### Requirement: 等边三角形数据光标
Each node SHALL be marked by an inline SVG equilateral triangle (data cursor), replacing the previous bird icon.

#### Scenario: 节点图标
- **WHEN** 观察任一节点
- **THEN**: 节点处为**内联 SVG 等边三角形**（`<polygon>` 三边等长），填充冰蓝 `#6BC5E8`，带轻微发光；页面上不存在金色小鸟残留

### Requirement: 跳跃叠加 120° 顺时针旋转
The node animation SHALL keep the parabolic jump and additionally rotate the triangle 120° clockwise during each jump.

#### Scenario: 观察单个节点
- **WHEN** 观察某个节点的完整动画
- **THEN**: 三角形从节点处起跳、上抛到最高点再落回（抛物线），下落定位与起跳位置一致；整个跳跃过程中顺时针旋转 120° 后落地（"换角"效果）；随后淡出并在下一轮循环前隐藏

#### Scenario: 节奏舒缓
- **WHEN** 观察整体节奏
- **THEN**: 单次跳跃约 1.5s；节点间 `animation-delay` 依次递增 0.25s，12 个节点自左向右依次跳出；整体循环 5s

### Requirement: 明暗主题均清晰可见
- **WHEN** 分别在深色与浅色模式查看
- **THEN**: 折线与三角形在两种背景下均清晰可辨；浅色模式使用加深后的同色系配色（约 `#2B7FA8` / `#5B2E7D`）

## MODIFIED Requirements

### Requirement: 封面页背景跑道
（原「像素砖块跑道」）The background track SHALL be a single gradient smooth line with glow instead of dashed pixel brick segments. 仍然贯穿左右、仍沿原 12 个节点折线走向，但不再是 `10 4` 断续像素段、不再红绿交替。

## REMOVED Requirements

### Requirement: 像素砖块跑道与金色小鸟
**Reason**: 用户要求彻底更换为平滑发光实线 + 旋转三角光标。
**Migration**: 同一处背景 SVG 与节点覆盖层被就地重写；`colors` 中 `brickRed`/`pipeGreen`/`birdFill`/`birdStroke` 与 `@keyframes pixel-jump` 一并移除。

## Acceptance Criteria

### AC-1: 像素虚线已移除且为单条渐变实线
- **Type**: `rule`
- **When**: 审查 WelcomePage.tsx 与浏览器 DOM
- **THEN**: 背景 SVG 中不存在跑道的 `stroke-dasharray="10 4"` 分段 `<line>`；只有 1 条 `<path>`，`stroke="url(#glowLineGrad)"`、`strokeDasharray` 为空、`strokeLinecap/Linejoin="round"`；路径首点 x=0、末点 x=1280
- **Evidence**: 代码审查 + 浏览器 DOM 断言

### AC-2: 渐变与发光
- **Type**: `rule`
- **When**: 打开封面页
- **THEN**: `<linearGradient>` 两档 stop 为冰蓝→暗紫（深色 `#6BC5E8`→`#7B4B9E`）；折线带 CSS `drop-shadow` 发光
- **Evidence**: 代码审查 + 截图

### AC-3: 三角形光标
- **Type**: `rule`
- **When**: 打开封面页
- **THEN**: 12 个节点各为内联 `<svg>` 内的等边 `<polygon>`，填充为冰蓝（深色 `#6BC5E8`）；无金色 `#FFD700` 残留、无 `<rect>` 拼块小鸟
- **Evidence**: 浏览器 DOM 断言 + 代码审查

### AC-4: 跳跃 + 120° 旋转 + 舒缓节奏
- **Type**: `rule`
- **When**: 观察与审查
- **THEN**: 动画名统一；单次跳跃约 1.5s（跳跃段占循环 0%~30%，循环 5s）；关键帧内含 `rotate` 且由 `0deg` 递增到 `120deg`；`animation-delay` 依次为 `0s/0.25s/0.5s … 2.75s`
- **Evidence**: 浏览器 DOM 断言 + 代码审查

### AC-5: 浅色模式清晰
- **Type**: `rule`
- **When**: 切换到浅色模式
- **THEN**: 折线与三角形改用加深配色（约 `#2B7FA8`/`#5B2E7D`），在 `#F0F4F8` 背景上清晰可辨
- **Evidence**: 浏览器浅色截图

### AC-6: 无回归
- **Type**: `rule`
- **When**: `npx tsc --noEmit` 与打开页面
- **THEN**: tsc 退出码 0；无 console error；`welcome` 文字动画、Enter 提示、页脚、主题切换正常
- **Evidence**: tsc 输出 + 浏览器 console

## Non-Goals
- 不改装饰性水平网格线（暗色 opacity 0.08、浅色隐藏）。
- 不改 `welcome` 文字描边动画（`welcome-draw 3s`）、Enter 提示、`© 2026` 页脚、路由、`ThemeToggle`。
- 不新增依赖、不改 `index.html`。
- 不逐帧平滑走完全程，仍采用"节点闪现跳跃"表现（用户已认可）。

## Open Questions
- 背景 SVG 容器原有的 `opacity-[0.55]` 会削弱外发光。若调整后发光不够明显，需把容器透明度适当提高（如 `0.9`）——优先在不改动容器透明度的前提下用叠加两档 `drop-shadow` 增强发光。
