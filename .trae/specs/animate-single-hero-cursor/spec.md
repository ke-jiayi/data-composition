# 封面页背景改为「唯一主角光标沿折线跑酷」Spec

## Why
上一版在折线的 12 个节点上都放了三角形光标，导致**满屏都是三角形、视觉很乱**。用户希望只保留**唯一一个"主角"三角形**，让它沿折线自左向右移动，并在波峰处"跃起换角"、在平缓/下降段缩成小光点融入流光——像跑酷游戏一样有起伏感。

## What Changes
- **移除**节点覆盖层里 12 个固定三角形：删掉 `linePoints.map(...)` 渲染 12 个 `<span>`+`<polygon>` 的那一层，页面上只留**唯一一个**三角形元素。
- **新增单主角沿折线移动**：唯一三角形从折线最左端（x=0）出发，按折线走向移动到最右端（x=1280），循环往复。
- **新增"波峰生长 / 平缓缩小"状态切换**（同一元素的 `opacity` / `scale` / 抬升 / `rotate` 关键帧）：
  - **波峰（上凸顶点，节点索引 2/4/6/8/10）**：不透明度 → 1、放大（`scale≈1.15`）、整体抬升到**线条上方**、并顺时针旋转累计 +120°（换角）。
  - **平缓 / 下降段（其余节点）**：缩成小光点（`scale≈0.34`、`opacity≈0.3`）贴着线条滑行。
- **保留线条**：发光蓝紫渐变的单条实线不变（`#6BC5E8 → #7B4B9E` + `drop-shadow`），线宽由 3 调到 **4**（贴合用户「4px 左右」的描述）。
- **节奏与缓动**：沿折线按**累计弧长**分配时间，使小光点滑行阶段基本匀速；进入波峰段用减速缓动（`ease-out`）、离开波峰段用加速缓动（`ease-in`），形成"顶点停留"的抛物线感；整体循环 9s。
- **不修改**：4 条装饰网格线、`welcome` 文字描边动画、Enter 提示、页脚、路由、`ThemeToggle`、`index.html`；不新增依赖。

## Impact
- Affected code: 仅 [WelcomePage.tsx](../../../src/pages/WelcomePage.tsx)（`colors`、`<style>` 关键帧、背景 `<path>` 线宽、节点覆盖层 → 单元素）
- 依赖：无新增
- **BREAKING**（视觉）：12 个固定三角形光标消失，改为唯一移动光标

## ADDED Requirements

### Requirement: 唯一主角三角形
The page SHALL render exactly one triangle cursor element; previously per-node triangles SHALL be removed.

#### Scenario: 打开封面页
- **WHEN** 用户打开 WelcomePage
- **THEN**: 页面内 `<polygon>` 总数为 1；不存在 12 个固定在节点上的三角形图标

### Requirement: 沿折线自左向右跑酷
The single triangle SHALL travel along the same polyline as the background line, from the left edge to the right edge, then loop.

#### Scenario: 行进轨迹
- **WHEN** 观察任意时刻
- **THEN**: 三角形位置始终落在背景折线上（跟随折线走向，不偏离）；整体自左向右推进，到达最右端后从最左端重新开始

### Requirement: 波峰生长、平缓缩小的状态切换
The triangle SHALL enlarge + jump above the line + rotate at peaks, and shrink into a small glow dot on gentle/descending phases.

#### Scenario: 经过波峰
- **WHEN** 三角形到达上凸顶点（节点 2/4/6/8/10）
- **THEN**: 不透明度变为 1、明显放大、位置抬升到线条上方，并顺时针旋转 120°（换角）后落下

#### Scenario: 平缓 / 下降段
- **WHEN** 三角形处于下降或平缓段
- **THEN**: 缩小为小光点（`scale≈0.34`、`opacity≈0.3`）并贴着线条滑行，感觉像融进了流光

### Requirement: 循环无缝
- **WHEN** 一个循环结束回到起点
- **THEN**: 三角形朝向与起点一致（等边三角形 120° 对称，累计旋转 600° ≡ 0°，不会出现朝向突跳）

## MODIFIED Requirements

### Requirement: 封面页背景跑道
（承前）折线仍为单条冰蓝→暗紫渐变实线 + 外发光，线宽改为 4；无虚线、无像素段。

## REMOVED Requirements

### Requirement: 12 个固定节点三角光标
**Reason**: 满屏三角造成视觉混乱；用户只想要一个主角。
**Migration**: 节点覆盖层被改写为**单个**三角形元素，由 `@keyframes` 的 `left`/`top` 关键帧驱动其沿折线移动。

## Acceptance Criteria

### AC-1: 只剩一个三角形
- **Type**: `rule`
- **When**: 打开封面页 / 审查代码
- **THEN**: 页面 `<polygon>` 数量为 1；代码中不再有 `linePoints.map` 渲染 12 个光标的覆盖层
- **Evidence**: 浏览器 DOM 断言 + 代码审查

### AC-2: 轨迹贴合折线
- **Type**: `rule`
- **When**: 在若干时刻采样三角形位置
- **THEN**: 位置落在折线各段上（由与 SVG 相同的线性映射 `x/1280`、`y/720` 保证），不偏离线条
- **Evidence**: 浏览器 DOM 断言（读取 `left`/`top` 计算值）

### AC-3: 波峰 / 平缓状态切换
- **Type**: `rule`
- **When**: 审查关键帧
- **THEN**: 波峰节点（2/4/6/8/10）关键帧为 `opacity:1`、`scale≈1.15`、`top` 比该节点低（视觉上抬升）、`rotate` 累计 +120°；其余节点为 `opacity≈0.3`、`scale≈0.34`、`rotate` 保持不变
- **Evidence**: 代码审查 + 浏览器断言关键帧文本

### AC-4: 缓动与节奏
- **Type**: `rule`
- **When**: 审查关键帧
- **THEN**: 波峰前的段落使用减速缓动、波峰后的段落使用加速缓动、其余段落线性；`animation-duration` 为 9s 且 `infinite`
- **Evidence**: 代码审查 + 浏览器断言

### AC-5: 折线形态保持
- **Type**: `rule`
- **When**: 打开封面页
- **THEN**: 背景仍为 1 条 `<path>`，`stroke="url(#glowLineGrad)"`、`stroke-width=4`、带 `drop-shadow`；4 条装饰网格线仍在
- **Evidence**: 浏览器 DOM 断言

### AC-6: 明暗与无回归
- **Type**: `rule`
- **When**: 双主题切换 + `npx tsc --noEmit`
- **THEN**: 浅色模式下线条与三角形使用加深配色且清晰；tsc 退出码 0；无 console error；`welcome` 文字、Enter 提示、页脚、主题切换正常
- **Evidence**: tsc 输出 + 浏览器 console + 双主题截图

## Non-Goals
- **不使用 CSS `offset-path: path(...)`**：背景 SVG 使用 `preserveAspectRatio="none"`，会被非等比拉伸到视口尺寸；`offset-path` 的 `path()` 坐标基于元素自身包含块的 CSS 像素，仅在视口恰为 1280×720 时才与渲染后的折线重合，其它尺寸会明显偏离。改用与 SVG 完全一致的百分比映射（`x/1280`、`y/720`）写 `left`/`top` 关键帧，可在任意分辨率精确贴合折线。
- 不改网格线、`welcome` 文字动画、Enter 提示、页脚、路由、`ThemeToggle`、`index.html`。
- 不新增依赖。
