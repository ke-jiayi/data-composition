# 详情页可视化分析功能 - 实施计划

## [ ] Task 1: 修复 ChartPanel 类型导入和添加聚合方式功能
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 修复 ChartPanel.tsx 中 DataRow 导入路径（从 `../../types` 改为 `../../utils/db`）
  - 添加聚合方式选择（求和、平均值、计数）到配置面板
  - 实现聚合逻辑（求和、平均值、计数）
  - 移除"生成图表"按钮，改为配置变化时自动渲染
  - 添加点击事件处理，点击后显示对应数据明细
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-4, AC-6, AC-7
- **Test Requirements**:
  - `programmatic` TR-1.1: ChartPanel 包含聚合方式选择下拉菜单
  - `programmatic` TR-1.2: 图表在配置变化时自动更新
  - `human-judgement` TR-1.3: 点击图表元素后显示数据明细

## [ ] Task 2: 更新 TabNavigation 添加可视化分析 Tab
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 在 TabType 中添加 'chart' 类型
  - 在 tabs 数组中添加"可视化分析"Tab 项
  - 更新 useTabState 的默认值和验证逻辑
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `programmatic` TR-2.1: TabType 包含 'chart'
  - `programmatic` TR-2.2: tabs 数组包含可视化分析项

## [ ] Task 3: 更新 ProjectDetailPage 添加图表 Tab 内容
- **Priority**: high
- **Depends On**: Task 1, Task 2
- **Description**: 
  - 更新 TabType 包含 'chart'
  - 导入 ChartPanel 组件
  - 添加图表 Tab 的内容渲染块
  - 使用 cleanedData 作为数据源，为空时使用 rawData
  - 传递 dataset.columns 作为 fields
  - 限制图表高度为 280px
- **Acceptance Criteria Addressed**: AC-1, AC-5, AC-9
- **Test Requirements**:
  - `programmatic` TR-3.1: activeTab === 'chart' 时渲染 ChartPanel
  - `programmatic` TR-3.2: 传递正确的数据源和字段
  - `human-judgement` TR-3.3: 图表高度不超过 280px

## [ ] Task 4: 空数据状态处理
- **Priority**: medium
- **Depends On**: Task 3
- **Description**: 
  - 在 ChartPanel 中处理空数据状态
  - 显示"请先导入数据"提示
- **Acceptance Criteria Addressed**: AC-9
- **Test Requirements**:
  - `human-judgement` TR-4.1: 空数据时显示提示信息

## [ ] Task 5: TypeScript 编译验证
- **Priority**: high
- **Depends On**: Tasks 1-4
- **Description**: 
  - 运行 `npx tsc --noEmit` 检查 TypeScript 编译
- **Acceptance Criteria Addressed**: AC-10
- **Test Requirements**:
  - `programmatic` TR-5.1: `npx tsc --noEmit` 退出码为 0

## [ ] Task 6: 浏览器验证
- **Priority**: high
- **Depends On**: Task 5
- **Description**: 
  - 在浏览器中测试可视化分析功能
  - 验证所有功能正常工作
- **Acceptance Criteria Addressed**: 所有
- **Test Requirements**:
  - `human-judgement` TR-6.1: 可视化分析 Tab 可访问
  - `human-judgement` TR-6.2: 图表配置完整可用
  - `human-judgement` TR-6.3: 图表正确渲染
  - `human-judgement` TR-6.4: 交互功能正常

## [ ] Task 7: 提交并推送代码
- **Priority**: high
- **Depends On**: Task 6
- **Description**: 
  - 使用 git 提交修改
  - 推送到 GitHub 远程仓库
- **Acceptance Criteria Addressed**: 所有
- **Test Requirements**:
  - `programmatic` TR-7.1: git commit 成功
  - `programmatic` TR-7.2: git push 成功
