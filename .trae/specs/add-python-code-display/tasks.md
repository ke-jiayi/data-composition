# 数据清洗Tab添加代码展示功能 - 实施计划

## [ ] Task 1: 添加代码块状态和 Python 代码内容
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 在 ProjectDetailPage 组件中添加 `codeExpanded` 状态控制代码块展开
  - 定义 Python 代码常量字符串，包含完整的数据清洗与可视化流程
- **Acceptance Criteria Addressed**: AC-1, AC-2
- **Test Requirements**:
  - `programmatic` TR-1.1: 存在 codeExpanded 状态
  - `programmatic` TR-1.2: 存在 Python 代码常量

## [ ] Task 2: 在数据清洗Tab中添加可折叠代码块
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 在 `activeTab === 'clean'` 的代码块中添加可折叠区域
  - 标题："📊 数据清洗与可视化代码"
  - 默认收起状态，点击展开
  - 代码使用 `<pre>` 和 `<code>` 包裹，配深色背景和等宽字体
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3
- **Test Requirements**:
  - `human-judgement` TR-2.1: 代码块可正常展开/收起
  - `human-judgement` TR-2.2: 代码显示样式美观

## [ ] Task 3: TypeScript 编译验证
- **Priority**: high
- **Depends On**: Task 2
- **Description**: 
  - 运行 `npx tsc --noEmit` 检查 TypeScript 编译
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `programmatic` TR-3.1: `npx tsc --noEmit` 退出码为 0

## [ ] Task 4: 提交并推送代码
- **Priority**: high
- **Depends On**: Task 3
- **Description**: 
  - 使用 git 提交修改
  - 推送到 GitHub
- **Acceptance Criteria Addressed**: 所有
- **Test Requirements**:
  - `programmatic` TR-4.1: git commit 成功
  - `programmatic` TR-4.2: git push 成功
