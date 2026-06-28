# 顶部导航结构重构 - 实现计划

## [ ] Task 1: 创建顶部导航组件 Header.tsx
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 创建 Header 组件，包含纸飞机图标和网站标题
  - 右侧显示三个导航链接：首页、项目、关于
  - 响应式设计，移动端显示汉堡菜单
- **Acceptance Criteria Addressed**: [AC-1, AC-2]
- **Test Requirements**:
  - `human-judgment` TR-1.1: 导航栏显示正确
  - `human-judgment` TR-1.2: 导航链接跳转正确
- **Notes**: 使用 Tailwind CSS 样式

## [ ] Task 2: 修改 Layout.tsx 使用顶部导航
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 修改 Layout 组件，移除侧边栏（Sidebar）
  - 添加顶部导航栏（Header）
  - 调整主内容区域样式（移除 md:pl-[280px]）
- **Acceptance Criteria Addressed**: [AC-1]
- **Test Requirements**:
  - `human-judgment` TR-2.1: 布局正确显示顶部导航
- **Notes**: 保持响应式设计

## [ ] Task 3: 创建 ProjectListPage 页面
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 创建 ProjectListPage，显示所有数据集卡片列表
  - 复用 HomePage 的数据集列表展示逻辑
  - 使用 Layout 组件
- **Acceptance Criteria Addressed**: [AC-3]
- **Test Requirements**:
  - `human-judgment` TR-3.1: 数据集列表正确显示
- **Notes**: 参考 HomePage 的实现

## [ ] Task 4: 创建 AboutPage 页面
- **Priority**: medium
- **Depends On**: None
- **Description**: 
  - 创建 AboutPage，显示关于网站的信息
  - 使用 Layout 组件
- **Acceptance Criteria Addressed**: [AC-4]
- **Test Requirements**:
  - `human-judgment` TR-4.1: 关于页面正确显示
- **Notes**: 内容简洁，使用 Tailwind CSS

## [ ] Task 5: 修改 App.tsx 添加路由
- **Priority**: high
- **Depends On**: Task 3, Task 4
- **Description**: 
  - 添加 /projects 路由，指向 ProjectListPage
  - 添加 /about 路由，指向 AboutPage
- **Acceptance Criteria Addressed**: [AC-2, AC-3, AC-4]
- **Test Requirements**:
  - `human-judgment` TR-5.1: 路由正确配置
- **Notes**: 确保路由顺序正确

## [ ] Task 6: 验证 TypeScript 编译并提交推送
- **Priority**: high
- **Depends On**: Task 5
- **Description**: 
  - 运行 TypeScript 类型检查确保无错误
  - 提交并推送代码到 GitHub
- **Acceptance Criteria Addressed**: [AC-5]
- **Test Requirements**:
  - `programmatic` TR-6.1: npx tsc --noEmit 返回码为 0
  - `programmatic` TR-6.2: git push 成功完成
- **Notes**: 完成后自动触发 Cloudflare Pages 部署

# Task Dependencies
- Task 2 depends on Task 1
- Task 5 depends on Task 3, Task 4
- Task 6 depends on Task 5
