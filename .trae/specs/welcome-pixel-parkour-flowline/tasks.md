# Tasks

- [x] Task 1: 移除旧流光逻辑并改造为像素跑道（src/pages/WelcomePage.tsx）
  - [x] SubTask 1.1: 删除 `lineGrad` 渐变、`softGlow`/`flowGlow` 滤镜、`mainPath` 渐变折线、6 个 🐱 `<text>`、`<animateMotion>` 移动光点
  - [x] SubTask 1.2: `colors` 常量整理——移除已废弃键（`gradStart`/`gradEnd`/`dotFill`/`dotOpacity`/`softGlowBlur`/`flowGlowBlur`/`pathStrokeWidth`），新增 `brickRed`/`pipeGreen`/`birdFill`/`birdStroke`，深浅色分别取值
  - [x] SubTask 1.3: 按 `linePoints` 相邻节点生成 11 段 `<line>`，`strokeWidth=4`、`strokeDasharray="10 4"`、`strokeLinecap="butt"`、`strokeLinejoin="miter"`，红绿交替
- [x] Task 2: 小鸟节点 + 跳跃动画
  - [x] SubTask 2.1: 新增绝对定位小鸟层（`absolute inset-0 pointer-events-none`），12 个节点按 `x/1280`、`y/720` 百分比定位（与 `preserveAspectRatio="none"` 的 SVG 精确对齐）
  - [x] SubTask 2.2: 每个节点渲染内联 SVG 像素小鸟（`<rect>` 拼块，金色填充 + 深色描边）
  - [x] SubTask 2.3: 新增 `@keyframes pixel-jump`（出现 → 上抛 → 落回 → 淡出），单次 0.8s；总循环 2.6s，`animation-delay: i*0.12s`，`animation-fill-mode: both`
- [x] Task 3: tsc + 浏览器验证
  - [x] SubTask 3.1: `npx tsc --noEmit` 退出码 0
  - [x] SubTask 3.2: 浏览器（深色）——11 段线 `stroke-dasharray="10 4"`、红绿交替、首末点 0→1280 铺满；12 个内联小鸟 SVG；无 echarts/CDN 请求；无 console error
  - [x] SubTask 3.3: 浏览器（浅色）——红绿加深、小鸟仍清晰；截图对比双主题

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 1, Task 2

---

# 追加任务（2026-10-17）：放慢跑酷动画节奏

- [x] Task 4: 放慢小鸟跳跃节奏（src/pages/WelcomePage.tsx，仅改速度）
  - [x] SubTask 4.1: `<span>` 的 `animation` 时长 `2.6s` → `6.4s`（单次跳跃约 0.8s → 约 2s；关键帧百分比不动）
  - [x] SubTask 4.2: 节点延迟间隔 `i * 0.12s` → `i * 0.3s`
  - [x] SubTask 4.3: 确认未改动 `@keyframes pixel-jump` 关键帧、颜色常量、SVG/小鸟结构、`welcome-draw` 动画
- [x] Task 5: 验证（tsc + 浏览器）
  - [x] SubTask 5.1: `npx tsc --noEmit` 退出码 0
  - [x] SubTask 5.2: 浏览器 DOM 断言 `animation-duration=6.4s`、延迟序列 `0s/0.3s/…/3.3s`、12 个小鸟仍在、无 console error
  - [x] SubTask 5.3: 深/浅色截图确认视觉零变化

# Task Dependencies（追加）
- Task 4 独立于已完成任务，仅改两处数值
- Task 5 depends on Task 4
