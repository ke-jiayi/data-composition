# 网站优化修改计划

## 问题分析

### 问题 1：图表占用空间过大
- **现状**：`ChartPanel.tsx` 默认高度 400px，配置区域和图表区域都有较大的 padding
- **影响页面**：项目详情页的图表 Tab
- **文件**：`src/components/charts/ChartPanel.tsx`、`src/pages/ProjectDetailPage.tsx`

### 问题 2：导入数据按钮点击无反应
- **现状调查**：
  - 首页（HomePage）的两个导入按钮（右上角和空状态下方）已正确绑定 `onImportClick`，理论上应该能工作
  - 项目详情页（ProjectDetailPage）没有导入按钮
  - 导入模态框（ImportModal）只在 App 层级由首页控制，其他页面无法触发
- **可能原因**：
  1. 用户可能在项目详情页找不到可用的导入按钮
  2. 全局缺少统一的导入入口
- **文件**：`src/App.tsx`、`src/pages/ProjectDetailPage.tsx`、`src/components/Layout.tsx`

## 修改方案

### 修改 1：优化图表尺寸和布局
**目标**：让图表更紧凑，减少不必要的空白

涉及文件：
- `src/components/charts/ChartPanel.tsx`
  - 默认高度从 400px 调整为 300px
  - 减少配置区域的 padding（p-4 → p-3）
  - 减少图表区域的 padding（p-4 → p-3）
  - 优化 grid 布局，减少配置项的垂直间距
  - 提示信息区域更紧凑

- `src/pages/ProjectDetailPage.tsx`
  - 图表 Tab 中集成实际的 ChartPanel 组件（当前只有占位符）
  - 图表卡片 padding 从 p-6 调整为 p-4
  - 图表卡片之间的间距从 space-y-6 调整为 space-y-4

### 修改 2：修复并完善导入数据功能
**目标**：确保导入数据按钮在所有相关页面都能正常工作

涉及文件：
- `src/App.tsx`
  - 将导入模态框的控制函数通过 Context 或 props 传递给需要的页面
  - 确保项目详情页也能打开导入模态框

- `src/pages/ProjectDetailPage.tsx`
  - 在项目标题区域右上角添加"导入数据"按钮
  - 绑定打开导入模态框的功能

- `src/components/Layout.tsx`（可选增强）
  - 在顶部添加全局导入按钮，确保任何页面都能导入数据

### 修改 3：项目详情页图表 Tab 功能完善
**目标**：让图表 Tab 真正可用，而不只是占位符

涉及文件：
- `src/pages/ProjectDetailPage.tsx`
  - 使用 `ChartPanel` 组件替换当前的占位符
  - 传入正确的数据和字段
  - 添加"新建图表"按钮

## 风险与注意事项

1. **兼容性**：修改图表高度可能影响小屏设备的显示效果，需确保响应式布局正常
2. **功能完整性**：项目详情页添加导入按钮后，需要确保导入成功后能正确刷新当前项目数据
3. **状态管理**：导入模态框的全局控制需要确保状态一致性

## 修改步骤

1. 修改 `ChartPanel.tsx`，优化图表尺寸和布局
2. 修改 `App.tsx`，提供全局导入模态框控制
3. 修改 `ProjectDetailPage.tsx`，添加导入按钮并完善图表 Tab
4. 验证功能：启动开发服务器测试导入按钮和图表显示
