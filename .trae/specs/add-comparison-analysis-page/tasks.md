# Tasks

- [x] Task 1: 首页新增「对比分析」入口
  - [x] SubTask 1.1: 在 `src/pages/HomePage.tsx` 操作区「导入数据」按钮旁新增「对比分析」按钮
  - [x] SubTask 1.2: 按钮使用紫色渐变样式，跳转 `/comparison`（与「导入数据」同排，保持现有间距/尺寸风格）

- [x] Task 2: 注册 `/comparison` 路由与页面导出
  - [x] SubTask 2.1: 在 `src/pages/index.ts` 导出 `ComparisonPage`
  - [x] SubTask 2.2: 在 `src/App.tsx` 中新增 `/comparison` 路由并指向 `ComparisonPage`

- [x] Task 3: 新建 `src/pages/ComparisonPage.tsx` 静态对比大屏
  - [x] SubTask 3.1: 使用 `Layout` 包裹页面，深色科技风 + light/dark 主题适配
  - [x] SubTask 3.2: 顶部区域：左上「返回首页」按钮（跳 `/home`）、主标题「城乡消费结构对比分析」、一排切换按钮（`城市1 vs 农村1` 高亮选中）
  - [x] SubTask 3.3: 主体区使用 `grid grid-cols-1 lg:grid-cols-2 gap-6`；左栏「各分类指数对比」+ 图片 `/images/城乡1_对比图.png` + 对应配文；右栏「总指数趋势对比」+ 图片 `/images/城乡1_WorkBuddy对比图.png` + 对应配文
  - [x] SubTask 3.4: 图片 `w-full object-contain` 自适应不变形，并加 `onError` 兜底提示（沿用项目现有做法）
  - [x] SubTask 3.5: 底部宽卡片「核心数据洞察」，列表展示三条结论文案

- [x] Task 4: 本地验证（不 push）
  - [x] SubTask 4.1: 运行 `npm run lint` 与 `npm run build` 确认无类型/构建错误
  - [x] SubTask 4.2: 本地启动 `npm run dev`，确认首页按钮跳转、页面双栏布局、light/dark 主题均正常

# Task Dependencies
- Task 2 依赖 Task 3 中 `ComparisonPage.tsx` 文件的存在（可先写页面文件再注册路由，或同步进行）
- Task 4 依赖 Task 1、Task 2、Task 3 全部完成
