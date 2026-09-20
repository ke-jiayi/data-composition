# Tasks

## Task 1: 收窄主内容容器 + 放大正文字号
- **Status**: `completed`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - SubTask 1.1: ProjectDetailPage 三处 max-w-7xl → max-w-4xl —— 完成
  - SubTask 1.2: ProjectDetailPage text-sm→text-base、text-xs→text-sm（无 text-base 原项）；间距不动 —— 完成
  - SubTask 1.3: TabNavigation tab text-sm→text-base —— 完成
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-5
- **Test Requirements**:
  - `rule` TR-1.1: 无 max-w-7xl 残留，三处 max-w-4xl —— PASS（grep 0 处 max-w-7xl）
  - `rule` TR-1.2: 无 text-xs 残留（body）—— PASS（grep ProjectDetailPage text-xs=0）
  - `rule` TR-1.3: tsc 0 —— PASS
- **Completion Evidence**: tsc 退出码 0。

## Task 2: 放大 DataTable/DataCleaning/SmartAnalysis 字号
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - SubTask 2.1: DataTable 表头 text-xs→text-sm、单元格/搜索/空态 text-sm→text-base；overflow-x-auto 与 px-4 py-3 保留 —— 完成
  - SubTask 2.2: DataCleaning text-sm→text-base、text-xs→text-sm —— 完成
  - SubTask 2.3: SmartAnalysis text-base→text-lg、text-sm→text-base —— 完成
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-5
- **Test Requirements**:
  - `rule` TR-2.1: DataTable 表头 text-sm、单元格 text-base、overflow-x-auto 保留、px-4 py-3 不变 —— PASS
  - `rule` TR-2.2: DataCleaning 无 text-sm 残留 —— PASS（grep）
  - `rule` TR-2.3: SmartAnalysis text-base→text-lg、text-sm→text-base —— PASS
  - `rule` TR-2.4: tsc 0 —— PASS
- **Completion Evidence**: tsc 退出码 0；间距类名（px-4 py-3、p-2 md:p-3、gap-2 md:gap-3）未触碰。

## Task 3: 浏览器验证宽度/字号/响应式
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 2
- **Description**: 城市2 详情页实测容器、字号、overflow、padding
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-4
- **Test Requirements**:
  - `rule` TR-3.1: 主容器 maxWidth=896px，居中 —— PASS
  - `rule` TR-3.2: tab=16px、th=14px、td=16px、信息值=16px —— PASS
  - `rule` TR-3.3: 375px noOverflow —— 浏览器工具不支持视口调整未能实测；结构保障（max-w-4xl mx-auto + DataTable overflow-x-auto + flex-wrap 标签）已通过代码检查确认，不阻塞
  - `rubric` TR-3.4: 视觉舒适度 —— 5/5：896px 行宽适中，字号清晰，表格 padding 12px 16px 不拥挤；阈值 ≥4 通过
- **Completion Evidence**: 浏览器 DOM 实测 4 项全 PASS；375px 项靠结构静态保障。

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 2
