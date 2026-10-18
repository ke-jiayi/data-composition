# 封面页小猫流光折线（SVG 方案）Spec

## Why
用户希望封面页背景流光换成"折线图"风格：线条左右铺满、无轴、数据点变成小猫图标、动画放慢并带发光、线条走冰蓝→暗紫渐变。但 WelcomePage.tsx 当前**没有 ECharts**——背景流光早已是纯内联 SVG（`<path>` + `<linearGradient>` + `<filter>` + 静态 `<circle>` + `<animateMotion>`），且这是 [svg-text-replace-echarts](../svg-text-replace-echarts/spec.md) 记录过的刻意决定。经与用户确认：**保留 SVG 实现**，把 5 条视觉要求等价落到 SVG 上（不重新引入 ECharts 实例）。

## What Changes
- 渐变方向调整为暗色模式下的「冰蓝 → 暗紫」：`gradStart` 暗色 `#6BC5E8`、`gradEnd` 暗色 `#7B4B9E`；**浅色模式沿用现有配色**（`#00D4FF` → `#60A5FA`）不变。
- 6 个静态数据点由 `<circle>` 改为小猫图标：用内联 SVG `<text>` 渲染 🐱（等价于用户给的 `image://<svg><text>🐱</text></svg>`，无需 data URI）。
- 移动流光（`<animateMotion>`）时长 6s → 8s。
- 增强发光：为线条与移动点提供更强的 `feGaussianBlur`（SVG 没有 `shadowBlur`，等价物即 `filter` 高斯模糊 stdDeviation）。
- 确认线条左右铺满：`<svg>` 保持 `absolute inset-0 w-full h-full` + `preserveAspectRatio="none"`，路径首点 x=0、末点 x=1280，已将 x 轴方向铺满视口。

## Impact
- Affected code: 仅 `src/pages/WelcomePage.tsx`（colors 常量 L24-31、背景 `<svg>` L89-139）

## MODIFIED Requirements

### Requirement: 封面页背景流光
The welcome page background flowline SHALL render a full-bleed glowing polyline with cat-icon data points, 8s motion animation, and a theme-adaptive ice-blue→dark-purple gradient, with no axes.

#### Scenario: 打开封面页
- **WHEN** 用户打开 WelcomePage
- **THEN**: 折线自左边缘 x=0 延伸至右边缘 x=1280（无左右留白）；无 X/Y 轴；6 个数据点显示为 🐱 图标；移动流光动画时长 8s；线条带发光且为冰蓝→暗紫渐变（暗色模式）；浅色模式沿用原配色

#### Scenario: 明暗主题切换
- **WHEN** 切换主题
- **THEN**: 暗色使用 `#6BC5E8 → #7B4B9E`；浅色使用 `#00D4FF → #60A5FA`；其余元素（welcome 文字、Enter 提示）正常

## Non-Goals
- **不重新引入 ECharts**：不加 `echarts` import / canvas 容器 / init-setOption-resize-dispose 生命周期。
- 不使用户给的 `image://data:image/svg+xml;utf8,...` data URI（emoji 嵌 data URI 有编码风险），改用原生 `<text>` 渲染 emoji。
- 保留现有装饰性水平网格线（暗色 opacity 0.08、浅色隐藏）不变——「去掉网格留白」按 ECharts `grid` padding 语义理解为**折线左右铺满**，非删除网格线。
- 不改 `welcome` 文字描边动画、Enter 提示、路由、其他页面。
- 不新增依赖。

## Acceptance Criteria

### AC-1: 线条左右铺满
- **Type**: `rule`
- **When**: 打开封面页
- **THEN**: 路径首点 x=0、末点 x=1280；`<svg>` 为 `absolute inset-0 w-full h-full` 且 `preserveAspectRatio="none"`；渲染后线条自视口左缘延伸至右缘，无左右留白
- **Evidence**: 代码审查 + 浏览器

### AC-2: 无坐标轴
- **Type**: `rule`
- **When**: 审查背景 `<svg>`
- **THEN**: 无 X/Y 轴、刻度、轴标签元素；纯作背景且不拦截点击（`pointer-events-none` 保留）
- **Evidence**: 代码审查

### AC-3: 数据点为小猫图标
- **Type**: `rule`
- **When**: 打开封面页
- **THEN**: 6 个静态标记渲染为 🐱 `<text>`（沿用 linePoints 索引 [0,2,4,6,8,11]），不再渲染数据点 `<circle>`
- **Evidence**: 代码审查 + 浏览器

### AC-4: 动画 8s 且带发光
- **Type**: `rule`
- **When**: 打开封面页
- **THEN**: 移动流光 `<animateMotion>` dur="8s"；线条与移动点均应用发光 filter（`feGaussianBlur` stdDeviation 较原值增大）
- **Evidence**: 代码审查 + 浏览器

### AC-5: 渐变冰蓝→暗紫且主题自适应
- **Type**: `rule`
- **When**: 分别在暗色 / 浅色模式下查看
- **THEN**: 暗色 `linearGradient` 为 `#6BC5E8`(offset 0%) → `#7B4B9E`(offset 100%)；浅色为 `#00D4FF` → `#60A5FA`
- **Evidence**: 浏览器 DOM 读取 stop-color

### AC-6: 编译与运行无回归
- **Type**: `rule`
- **When**: `npx tsc --noEmit` 与打开页面
- **THEN**: tsc 退出码 0；无 console error；welcome 文字与 Enter 提示正常显示
- **Evidence**: tsc 输出 + 浏览器 console

## Open Questions
- 背景 SVG 使用 `preserveAspectRatio="none"`，emoji 图标在极端宽高比（如手机竖屏）下会被拉伸变形。本次按最小改动保留该设置，仅在桌面端验证视觉；若后续需要，可单独为标记层改用独立 SVG。
