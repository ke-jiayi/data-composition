# Tasks

- [x] Task 1: 面包屑新增「返回首页」按钮
  - [x] SubTask 1.1: 新增按钮，仅在 `currentFolderId !== null` 时渲染，容器用 `ml-auto` 靠右
  - [x] SubTask 1.2: 按钮带 `ri-arrow-go-back-line` 图标，样式显眼且与现有紫色/青色科技风一致
  - [x] SubTask 1.3: 点击执行 `setCurrentFolderId(null)` 与 `setSearchQuery('')`

- [x] Task 2: 数据集卡片支持拖拽
  - [x] SubTask 2.1: 新增 `dragOverFolderId` 状态
  - [x] SubTask 2.2: 数据集卡片 `<Link>` 添加 `draggable` 与 `onDragStart`，写入 `e.dataTransfer.setData('text/plain', dataset.id)`
  - [x] SubTask 2.3: 保留原有点击跳转与按钮交互

- [x] Task 3: 文件夹卡片接收拖拽
  - [x] SubTask 3.1: 文件夹卡片添加 `onDragOver`（`e.preventDefault()`）、`onDragLeave`、`onDrop`
  - [x] SubTask 3.2: `onDrop` 读取数据集 ID 并调用 `handleMoveToFolder(id, folder.id)`
  - [x] SubTask 3.3: 悬停时根据 `dragOverFolderId` 添加青色边框/背景高亮，离开或 drop 后清除

- [x] Task 4: 验证（不 push）
  - [x] SubTask 4.1: 运行 `npm run lint` 与 `npm run build`
  - [x] SubTask 4.2: 浏览器验证：进入文件夹出现返回按钮并可返回根目录；拖拽数据集到文件夹后计数变化、卡片从根目录消失

# Task Dependencies
- Task 2 与 Task 3 需配合完成（同一文件，可顺序执行）
- Task 4 依赖 Task 1-3
