# Tasks

- [x] Task 1: 移除像素跑酷并改造为平滑发光渐变实线（src/pages/WelcomePage.tsx）
  - [x] SubTask 1.1: 删除 11 段红绿交替像素虚线 `<line>`（`strokeDasharray="10 4"` / `brickRed` / `pipeGreen`）与 12 个金色小鸟（`<rect>` 拼块 / `birdFill` / `birdStroke`）
  - [x] SubTask 1.2: `colors` 常量整理——移除 `brickRed`/`pipeGreen`/`birdFill`/`birdStroke`；新增 `lineGradStart`/`lineGradEnd`/`lineGlow`/`cursorFill`/`cursorGlow`（深色 `#6BC5E8`/`#7B4B9E`，浅色加深版 `#2B7FA8`/`#5B2E7D`）
  - [x] SubTask 1.3: `<defs>` 内新增 `<linearGradient id="glowLineGrad">`（两档 stop），背景改为**单条** `<path>`：`fill="none"`、`stroke="url(#glowLineGrad)"`、`strokeWidth≈3`、`round` 端点与连接，并叠加 `drop-shadow` 发光；保留 4 条网格线不动
- [x] Task 2: 三角形光标 + 跳跃/旋转动画
  - [x] SubTask 2.1: 节点覆盖层（`absolute inset-0 pointer-events-none`）12 个节点按 `x/1280`、`y/720` 百分比定位不变
  - [x] SubTask 2.2: 每个节点渲染内联等边三角形 `<polygon>`（`viewBox="0 0 16 16"`），填充冰蓝 + `drop-shadow` 发光
  - [x] SubTask 2.3: 新增 `@keyframes cursor-jump`（出现 → 上抛抛物线 → 落回 → 淡出），内含 `rotate` 由 `0deg` 递增到 `120deg`（顺时针）；跳跃段占循环 0%~30%，循环 5s（单次跳跃约 1.5s），`animation-delay: i * 0.25s`，`animation-fill-mode: both`；上升段用减速缓动、下降段用加速缓动以保证抛物线平滑
  - [x] SubTask 2.4: 删除旧 `@keyframes pixel-jump`
- [x] Task 3: tsc + 浏览器验证
  - [x] SubTask 3.1: `npx tsc --noEmit` 退出码 0
  - [x] SubTask 3.2: 浏览器（深色）——1 条 `<path>` 且 `stroke` 为 `url(#glowLineGrad)`、无 `stroke-dasharray`；12 个等边 `<polygon>`；无 `#FFD700`/`<rect>` 小鸟残留；`animation-duration=5s`、延迟序列 `0s/0.25s/…/2.75s`、关键帧含 `rotate(120deg)`；无 console error
  - [x] SubTask 3.3: 浏览器（浅色）——折线与三角形改用加深配色，在浅底上清晰；双主题截图
- [x] Task 4: 提升背景容器透明度以让外发光可读
  - [x] SubTask 4.1: 背景 SVG 容器 `opacity-[0.55]` → `opacity-[0.9]`（依 spec Open Question 预案；网格线自带 opacity 属性不受影响）
  - [x] SubTask 4.2: 复验——`bgOpacity=0.9`，深色下线条亮度提升、发光可见；浅色下仍清晰

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 1, Task 2
- Task 4 depends on Task 3（验证发现发光偏暗后才执行）
