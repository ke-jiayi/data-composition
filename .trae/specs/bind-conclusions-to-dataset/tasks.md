# Tasks

## Task 1: 新增城市2 结论映射并修改加载回退
- **Status**: `completed`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - SubTask 1.1: CITY2_CONCLUSIONS 3 条 —— 完成（L110-115，全角引号“V型”）
  - SubTask 1.2: CONCLUSIONS_MAP + resolveConclusions —— 完成（L117-129）
  - SubTask 1.3: 加载回退改 resolveConclusions(datasetData.name)，useState 初值未动 —— 完成（L168）
  - SubTask 1.4: tsc —— TSC_EXIT_0
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-4
- **Test Requirements**:
  - `rule` TR-1.1: 关键数字 106.7/117.8/11.1、97.4、100.4/97.6/101.0 全部存在 —— PASS（L112-114）
  - `rule` TR-1.2: 回退链 已保存 → resolveConclusions(name)；硬编码 DEFAULT_CONCLUSIONS 仅 useState 初值与 resolver 兜底 —— PASS
  - `rule` TR-1.3: tsc 0 —— PASS
- **Completion Evidence**: tsc 退出码 0；编辑/保存/增删函数（handleSaveConclusion/handleDeleteConclusion/handleAddConclusion）与 conclusion Tab JSX 未触碰。

## Task 2: 浏览器验证城市2 与农村1
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 城市2/农村1 各 3 条结论互斥验证
- **Acceptance Criteria Addressed**: AC-1, AC-2
- **Test Requirements**:
  - `rule` TR-2.1: 城市2 条数=3；含 117.8+106.7+11.1、97.4+交通通信、100.4/97.6/101.0+V型；不含"30%"/衣着类 —— PASS
  - `rule` TR-2.2: 农村1 含食品烟酒 30%、衣着 1.8%、居住稳定；不含 117.8/97.4/100.4 —— PASS
  - `rubric` TR-2.3: 视觉/功能一致性 —— 5/5：UI 零改动，仅默认数据不同；阈值 ≥4 通过
- **Completion Evidence**: 两页面无 console error；结论条目数量与互斥性均符合预期。城市1 数据集记录此前已被测试删除，其分支与农村1 同为 DEFAULT_CONCLUSIONS 兜底路径（静态核对 L123-129）。

# Task Dependencies
- Task 2 depends on Task 1
