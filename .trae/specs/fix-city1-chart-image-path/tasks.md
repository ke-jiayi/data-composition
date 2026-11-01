# Tasks

- [x] Task 1: 修正城市1 图片路径
  - [x] SubTask 1.1: 在 `src/pages/ProjectDetailPage.tsx` 的 `CHART_MAP['城市1']` 中把 `image` 由 `'/images/城市价格指数趋势图.png'` 改为 `'/images/城市1_手工图.png'`
  - [x] SubTask 1.2: 全局搜索确认 `src` 下不再存在 `城市价格指数趋势图` 引用，且其他图片路径 `/images/城市2_柱状图.png`、`/images/城市1_WorkBuddy图.png` 不变

- [x] Task 2: 补齐图片资源
  - [x] SubTask 2.1: 将 `public/images/城市1_手工图.png.png` 复制为 `public/images/城市1_手工图.png`（保留原文件，不删除、不改名）
  - [x] SubTask 2.2: 确认目录中存在 `城市1_手工图.png`、`城市2_柱状图.png`、`城市1_WorkBuddy图.png`

- [x] Task 3: 验证（tsc + HTTP + 浏览器）
  - [x] SubTask 3.1: `npx tsc --noEmit` 退出码 0
  - [x] SubTask 3.2: `http://localhost:5173/images/城市1_手工图.png` 返回 200 且 Content-Type 为 image/png
  - [x] SubTask 3.3: 浏览器——城市1 的「可视化分析」Tab 中 `img[src="/images/城市1_手工图.png"]` 的 `naturalWidth > 0`、`complete = true`，图片正常显示，console 无 error（沙箱 IndexedDB 无城市1 数据集，改为直接加载该图片 URL 验证：3120×1638、complete=true）
  - [x] SubTask 3.4: 浏览器——城市2 图表、WorkBuddy Tab、其他 Tab 均正常（城市2 柱状图 1786×884、WorkBuddy 图 1852×935，均 complete=true，0 error）

# Task Dependencies
- Task 2 与 Task 1 可并行（不同文件）
- Task 3 depends on Task 1, Task 2
