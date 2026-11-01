# Tasks

- [x] Task 1: 调整项目详情页 Tab 顺序
  - [x] SubTask 1.1: 在 `src/components/TabNavigation.tsx` 的 `tabs` 数组中，将 `chart`（可视化分析）项移动到 `conclusion`（分析结论）之前，保持 `smart`（WorkBuddy 分析）在末尾
  - [x] SubTask 1.2: 确认 tab 的 key / label / icon 未发生任何内容变更，仅调整数组顺序
  - [x] SubTask 1.3: 核对 `ProjectDetailPage.tsx` 中基于 `activeTab` 的内容渲染无需改动（各 Tab 内容仍按 key 正确对应）

- [x] Task 2: 验证
  - [x] SubTask 2.1: 运行类型检查/构建（如 `npm run build` 或 `npx tsc --noEmit`）确认无报错
  - [x] SubTask 2.2: 手动确认新顺序为：数据表格 → 数据清洗 → 可视化分析 → 分析结论 → WorkBuddy 分析
  - [x] SubTask 2.3: 逐个点击 5 个 Tab，确认下方内容与 Tab 正确对应

# Task Dependencies
- Task 2 依赖 Task 1
