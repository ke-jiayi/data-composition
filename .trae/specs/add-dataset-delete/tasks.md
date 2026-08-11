# Tasks

- [x] Task 1: 在 HomePage 添加删除功能
  - [ ] SubTask 1.1: 添加 deleteDataset 到 useDB 解构
  - [ ] SubTask 1.2: 添加删除确认状态管理（deleteTarget dataset + confirm dialog）
  - [ ] SubTask 1.3: 在每个数据集卡片右上角添加删除按钮（垃圾桶 SVG 图标），阻止 Link 默认跳转（e.preventDefault + e.stopPropagation）
  - [ ] SubTask 1.4: 添加确认对话框 UI（模态框，显示数据集名称，确认/取消按钮）
  - [ ] SubTask 1.5: 实现 handleDelete 函数：调用 deleteDataset，成功后 loadDatasets 刷新列表
  - [ ] SubTask 1.6: 运行 npx tsc --noEmit 验证编译，git commit 并 push

# Task Dependencies
- None（单一任务）
