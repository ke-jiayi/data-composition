# Tasks

- [x] Task 1: 移除 12 个固定三角形，只留唯一主角（src/pages/WelcomePage.tsx）
  - [x] SubTask 1.1: 删除现有的节点覆盖层——即 `{linePoints.map((p, i) => (<span …><svg …><polygon …/></svg></span>))}` 这整段（12 个三角形）
  - [x] SubTask 1.2: 新增**单个** `<span>` 作为唯一光标（`className="absolute"`，内含与原先相同的等边三角形 `<polygon points="8,1.2 14.8,12.9 1.2,12.9" fill={colors.cursorFill}` 与 `filter: colors.cursorGlow` 的小 `<svg width="24" height="24" viewBox="0 0 16 16">`），并给它 `animation: 'cursor-run 9s linear infinite'`
  - [x] SubTask 1.3: 该 span 的 inline style 只放兜底 `left: '0%'`、`top: '88.89%'`（真实位置由关键帧驱动）；不要再用 `linePoints.map` 渲染多个光标
- [x] Task 2: 程序化生成 `cursor-run` 关键帧 + 折线加粗到 4
  - [x] SubTask 2.1: 在组件内先算出每个节点的**行程百分比**（按累计弧长分配时间）：对 `linePoints` 相邻点求 `Math.hypot(dx, dy)` 得 11 段长度，累加得总长，节点 i 的行程百分比 = `cum[i] / total * 100`
  - [x] SubTask 2.2: 定义波峰集合 = 节点索引 `{2, 4, 6, 8, 10}`（即 y 值局部最小的上凸顶点）；`rotate` 累计值 = `120 * (索引 ≤ i 的波峰个数)`
  - [x] SubTask 2.3: 生成 `@keyframes cursor-run` 的 12 个关键帧（百分比 = 上述行程百分比），每个关键帧内容：
    - `left: ${(p.x / 1280) * 100}%`
    - `top: ${(p.y / 720) * 100 - (是波峰 ? 3 : 0)}%`（波峰处抬升 3%，形成"跃起停在线上方"的弧顶）
    - `opacity`：波峰 `1`，非波峰 `0.3`
    - `transform: translate(-50%, -50%) rotate(${rotate}deg) scale(${是波峰 ? 1.15 : 0.34})`
    - `animation-timing-function`：**下一个节点是波峰** → `ease-out`（减速进顶点）；**当前节点是波峰** → `ease-in`（加速离开顶点）；其它 → `linear`
    - 关键帧文本需作为字符串拼进现有的 `<style>{`…`}</style>` 模板（可与现有 `welcome-draw`/`neon-flicker`/`cursor-jump` 共存；`cursor-jump` 若已不再使用请删除）
  - [x] SubTask 2.4: 背景折线 `<path>` 的 `strokeWidth` 由 `3` 改为 `4`；其余（`fill="none"`、`stroke="url(#glowLineGrad)"`、round 端点/连接、`drop-shadow` 发光、4 条网格线、容器 `opacity-[0.9]`）保持不变
- [x] Task 3: tsc + 浏览器验证
  - [x] SubTask 3.1: `npx tsc --noEmit` 退出码 0
  - [x] SubTask 3.2: 浏览器（深色）——`polygonCount=1`；`<path>` 数量 1、`stroke-width=4`、`stroke=url(#glowLineGrad)`、带 `drop-shadow`；网格线 4 条；关键帧文本含 `cursor-run`、`120deg`、`ease-out`/`ease-in`；`animation-duration=9s`；无 console error
  - [x] SubTask 3.3: 浏览器——在不同时刻采样该唯一 span 的 `left`/`top` 计算值（若有 offsetPath 相关属性为空），确认其位置落在折线上、且在波峰节点附近 `opacity` 接近 1、`transform` 里 scale 接近 1.15
  - [x] SubTask 3.4: 浏览器（浅色）——线条与三角形为加深配色且清晰；双主题截图

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 1, Task 2
