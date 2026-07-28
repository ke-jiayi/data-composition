# 可视化大屏展示功能 - 实施计划

## [ ] Task 1: 修改 ProjectDetailPage.tsx 添加图片展示
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 在 `activeTab === 'chart'` 的代码块中，添加图片展示区域
  - 图片上方显示标题"城市居民消费价格指数趋势图"
  - 图片使用 `/images/城市价格指数趋势图.png.png` 路径（文件名有双扩展名）
  - 图片下方显示说明"数据来源：国家统计局 | 使用 Python Matplotlib 生成"
  - 样式：居中显示，宽度占满容器，最大高度 500px
- **Acceptance Criteria Addressed**: AC-1, AC-2
- **Test Requirements**:
  - `programmatic` TR-1.1: 图片元素存在且路径正确
  - `human-judgement` TR-1.2: 图片居中显示，大小合适

## [ ] Task 2: TypeScript 编译验证
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 运行 `npx tsc --noEmit` 检查 TypeScript 编译
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `programmatic` TR-2.1: `npx tsc --noEmit` 退出码为 0

## [ ] Task 3: 提交并推送代码
- **Priority**: high
- **Depends On**: Task 2
- **Description**: 
  - 使用 git 提交修改
  - 推送到 GitHub
- **Acceptance Criteria Addressed**: 所有
- **Test Requirements**:
  - `programmatic` TR-3.1: git commit 成功
  - `programmatic` TR-3.2: git push 成功
