# 数据集卡片点击跳转功能 - 实现计划

## [ ] Task 1: 修复路由路径
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 修改 HomePage.tsx 中 `<Link>` 组件的 `to` 属性
  - 将 `/dataset/${dataset.id}` 改为 `/project/${dataset.id}`
- **Acceptance Criteria Addressed**: [AC-1]
- **Test Requirements**:
  - `human-judgment` TR-1.1: 点击卡片跳转到正确路径
- **Notes**: 确保路径与 App.tsx 中的路由配置一致

## [ ] Task 2: 添加悬停视觉反馈
- **Priority**: medium
- **Depends On**: Task 1
- **Description**: 
  - 添加 hover 状态样式（阴影加深）
  - 确保光标为 pointer
  - 使用 Tailwind CSS 实现过渡效果
- **Acceptance Criteria Addressed**: [AC-2]
- **Test Requirements**:
  - `human-judgment` TR-2.1: 悬停时有明显视觉反馈
- **Notes**: 现有代码已有 hover:shadow-md，确保效果明显

## [ ] Task 3: 验证新导入卡片支持跳转
- **Priority**: medium
- **Depends On**: Task 2
- **Description**: 
  - 确保导入新数据后，新卡片使用相同的 `<Link>` 组件
  - 验证新卡片同样支持点击跳转
- **Acceptance Criteria Addressed**: [AC-3]
- **Test Requirements**:
  - `human-judgment` TR-3.1: 新导入的卡片支持点击跳转
- **Notes**: 新卡片使用 filteredDatasets.map 渲染，与现有卡片逻辑一致

## [ ] Task 4: 验证 TypeScript 编译并提交推送
- **Priority**: high
- **Depends On**: Task 3
- **Description**: 
  - 运行 TypeScript 类型检查确保无错误
  - 提交并推送代码到 GitHub
- **Acceptance Criteria Addressed**: [AC-4]
- **Test Requirements**:
  - `programmatic` TR-4.1: npx tsc --noEmit 返回码为 0
  - `programmatic` TR-4.2: git push 成功完成
- **Notes**: 完成后自动触发 Cloudflare Pages 部署

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 2
- Task 4 depends on Task 3
