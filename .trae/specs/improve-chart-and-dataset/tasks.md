# 图表区域优化与多数据集管理 - The Implementation Plan (Decomposed and Prioritized Task List)

## [ ] Task 1: 优化 ChartPanel 组件 - 添加折叠/展开功能
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 在 ChartPanel 中添加 isCollapsed state，默认 false
  - 在配置区域右上角添加折叠/展开切换按钮
  - 折叠时只显示配置区域，隐藏图表展示区域
  - 展开时显示完整的配置和图表区域
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `human-judgement` TR-1.1: 点击折叠按钮后图表区域隐藏
  - `human-judgement` TR-1.2: 点击展开按钮后图表区域显示
- **Notes**: 使用旋转图标指示当前状态

## [ ] Task 2: 优化 ChartPanel 组件 - 空数据时隐藏图表区域
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 当 data.length === 0 时，图表展示区域显示简洁提示，高度自适应
  - 当 data.length > 0 但未生成图表时，保持简洁提示
  - 移除固定高度，改为自适应内容
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `human-judgement` TR-2.1: 空数据时图表区域不占据大片空白
  - `human-judgement` TR-2.2: 有数据但未生成图表时显示简洁提示
- **Notes**: 图表展示区域使用 min-height 而不是固定 height

## [ ] Task 3: 修改 HomePage 的 handleFileChange - 导入数据保存到数据库
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 在 handleFileChange 中，解析成功后调用 useDB 的 createDataset 和 saveData
  - 创建新的 Dataset 对象，包含文件名、类型、列名、行数等信息
  - 保存数据行到数据库
  - 导入成功后调用 loadDatasets 刷新数据集列表
- **Acceptance Criteria Addressed**: AC-3, AC-4
- **Test Requirements**:
  - `programmatic` TR-3.1: 导入成功后调用 createDataset 和 saveData
  - `programmatic` TR-3.2: 导入成功后数据集列表刷新
  - `human-judgement` TR-3.3: 新数据集出现在首页列表中
- **Notes**: 需要导入 createDataset 和 saveData 函数

## [x] Task 4: 更新 tasks.md 和 checklist.md 状态
- **Priority**: medium
- **Depends On**: Task 1, 2, 3
- **Description**: 
  - 更新 tasks.md 中已完成任务的状态
  - 更新 checklist.md 中已完成检查点的状态
- **Acceptance Criteria Addressed**: 所有
- **Test Requirements**:
  - `programmatic` TR-4.1: 所有任务标记为完成
  - `programmatic` TR-4.2: 所有检查点标记为完成

# Task Dependencies
- Task 2 depends on Task 1
- Task 4 depends on Task 1, 2, 3
