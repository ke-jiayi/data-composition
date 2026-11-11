# Tasks

- [x] Task 1: 统一首页三个操作按钮尺寸
  - [x] SubTask 1.1: 为「对比分析」Link、「导 入 数 据」按钮、「+ 新建文件夹」按钮统一添加固定宽高（`w-32 h-10`）与 `inline-flex items-center justify-center`，统一 `px-4 py-2 text-sm font-medium whitespace-nowrap`
  - [x] SubTask 1.2: 保留各自原有配色、hover、disabled 与 onClick/to 逻辑不变

- [x] Task 2: 删除文件夹弹窗按钮换位
  - [x] SubTask 2.1: 在 `{deletingFolder && ...}` 弹窗底部，将「确认删除」（红色）按钮块移到「取消」（深色）按钮块之前
  - [x] SubTask 2.2: 确认 `handleConfirmDeleteFolder`、`setDeletingFolder(null)`、红色/深色类名与 `justify-end gap-3` 不变

- [x] Task 3: 验证（不 push）
  - [x] SubTask 3.1: 运行 `npm run lint` 与 `npm run build`
  - [x] SubTask 3.2: 本地页面确认三个按钮等宽等高、删除文件夹弹窗按钮顺序正确且功能正常

# Task Dependencies
- Task 1 与 Task 2 均在同一文件的不同区域，可顺序执行
- Task 3 依赖 Task 1、Task 2 完成
