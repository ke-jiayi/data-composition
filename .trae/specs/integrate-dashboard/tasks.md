# Tasks

- [x] Task 1: 创建 DashboardPage 组件
  - [ ] SubTask 1.1: 创建 src/pages/DashboardPage.tsx，使用 Layout 包裹，内部用 iframe 嵌入 /dashboard.html
  - [ ] SubTask 1.2: 在 src/pages/index.ts 中导出 DashboardPage
  - [ ] SubTask 1.3: 在 src/App.tsx 中添加 /dashboard 路由

- [x] Task 2: 在 HomePage 添加数据大屏入口卡片
  - [ ] SubTask 2.1: 在 HomePage 数据集列表区域上方添加"📊 数据大屏"卡片，使用 Link 跳转到 /dashboard
  - [ ] SubTask 2.2: 卡片样式与首页风格一致（渐变、hover 效果）

- [x] Task 3: 验证与部署
  - [ ] SubTask 3.1: 运行 npx tsc --noEmit 确认编译通过
  - [ ] SubTask 3.2: git commit 并 push

# Task Dependencies
- Task 2 依赖 Task 1（需要路由存在才能跳转）
- Task 3 依赖 Task 1 和 Task 2
