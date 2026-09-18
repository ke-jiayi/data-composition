# Tasks

## Task 1: chart Tab 移除代码块；clean Tab 代码卡片折叠化并按数据集映射
- **Status**: `completed`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - SubTask 1.1: chart Tab 删除可折叠代码块，命中分支只保留图表卡片；空状态不动 —— 完成（L528-547）
  - SubTask 1.2: showChartCode → showCleanCode，reset effect 同步 —— 完成（L125、L158-161）
  - SubTask 1.3: code useState 初值改 ''；加载回退改 datasetData.code || resolveChartMeta(datasetData.name)?.code || '' —— 完成（L120、L146）
  - SubTask 1.4: clean Tab 代码卡片 chartMeta 条件渲染；折叠头（无 emoji 标题+▶/▼）；body 仅展开时渲染；保存按钮保留 —— 完成（L400-431）
  - SubTask 1.5: tsc 验证 —— TSC_EXIT_0
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Test Requirements**:
  - `rule` TR-1.1: chart Tab 无代码块引用 —— PASS（grep 标题仅 L409 clean Tab）
  - `rule` TR-1.2: showChartCode 全文件 0 处 —— PASS（grep 仅 showCleanCode 5 处：L125/405/408/419 + reset effect L160）
  - `rule` TR-1.3: setCode 回退映射、useState 空串 —— PASS（L146、L120）
  - `rule` TR-1.4: chartMeta 条件包裹 + 标题无 emoji —— PASS（L400、L409）
  - `rule` TR-1.5: tsc 0 —— PASS
- **Completion Evidence**: tsc 退出码 0；浏览器四场景实测全部 PASS（见 Task 2）；handleSaveCode、DataCleaning、其他 Tab JSX 未改。

## Task 2: 浏览器验证四个场景
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 城市2 clean 折叠/映射、城市2 chart 纯图表、农村1 clean 无代码卡片、农村1 chart 空状态
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-4, AC-5
- **Test Requirements**:
  - `rule` TR-2.1: 城市2 clean 初始 textarea=0/标题"▶数据清洗与可视化代码"无 emoji/保存按钮在；展开 textarea=1 且 hasCity2=true、hasCity1=false、▼；再收起 ▶ —— PASS
  - `rule` TR-2.2: 城市2 chart 无代码按钮、pre=0、img=1 src=/images/城市2_柱状图.png —— PASS
  - `rule` TR-2.3: 农村1 clean 代码标题=null、保存按钮=false、textarea=0 —— PASS
  - `rule` TR-2.4: 折叠展开/收起切换 —— PASS
  - `rubric` TR-2.5: 视觉一致性 —— 5/5：折叠头/卡片沿用 bg-[#26262C] border text 样式，保存按钮原样保留；阈值 ≥4 通过
- **Completion Evidence**: 无 console error；农村1 chart 空状态文案仍在。保存按钮写库测试未执行（避免污染 IndexedDB），handleSaveCode 代码路径未改动，静态可确认。

# Task Dependencies
- Task 2 depends on Task 1
