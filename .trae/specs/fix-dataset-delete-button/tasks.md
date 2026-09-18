# Tasks

- [x] Task 1: 修复数据集删除弹窗的事件处理，使其与文件夹删除弹窗一致
  - [x] SubTask 1.1: 在数据集删除弹窗遮罩层（L615 `<div className="fixed inset-0 z-50...">`）增加 `onClick={() => setDeleteTarget(null)}`
  - [x] SubTask 1.2: 在数据集删除弹窗内部卡片（L616 `<div className="bg-[#0f1424]...">`）增加 `onClick={(e) => e.stopPropagation()}`
  - [x] SubTask 1.3: 运行 `npx tsc --noEmit` 验证编译通过

# Task Dependencies
- 无（单一任务，仅改 HomePage.tsx 两处 className）

# Notes
- `handleDelete`（L111-120）和 `deleteDataset`（db.ts L172-207）代码路径已通过浏览器 JS `.click()` 实测验证为正确，无需修改
- 修复仅涉及 HomePage.tsx 数据集删除弹窗的 JSX 属性（2 处）
- 不 push，待用户本地预览确认
