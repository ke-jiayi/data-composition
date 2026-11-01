# 项目详情页 Tab 顺序调整 Spec

## Why
项目详情页顶部的 Tab 导航当前顺序为「数据表格 → 数据清洗 → 分析结论 → WorkBuddy 分析 → 可视化分析」，与分析流程的实际阅读顺序不符，且「可视化分析」排在最后不易被发现。需要重新排列为符合「先看数据、再清洗、再可视化、再结论、最后 WorkBuddy」的叙事顺序。

## What Changes
- 重新排序 `TabNavigation` 组件中配置 Tab 的 `tabs` 数组。
- 新顺序：数据表格 → 数据清洗 → 可视化分析 → 分析结论 → WorkBuddy 分析。
- 仅调整展示顺序，不改动任何 Tab 的 key、label、icon、URL 参数，也不改动内容渲染逻辑。

## Impact
- 受影响能力：项目详情页 Tab 导航顺序
- 受影响代码：[TabNavigation.tsx](file:///d:/my_project/data-composition/src/components/TabNavigation.tsx) 中的 `tabs` 数组

## MODIFIED Requirements
### Requirement: 项目详情页 Tab 导航顺序
系统 SHALL 按以下顺序展示项目详情页顶部 Tab：
1. 数据表格（key: `table`）
2. 数据清洗（key: `clean`）
3. 可视化分析（key: `chart`）
4. 分析结论（key: `conclusion`）
5. WorkBuddy 分析（key: `smart`）

#### Scenario: 点击任一 Tab 后内容正确对应
- **WHEN** 用户点击某个 Tab（或直接访问带 `?tab=<key>` 的详情页）
- **THEN** 该 Tab 高亮显示，且下方渲染的内容与其 key 对应的内容一致
  - `table` → 原始数据表格
  - `clean` → 数据清洗记录 + 清洗/可视化代码
  - `chart` → 可视化图表（按数据集绑定）
  - `conclusion` → 分析结论列表
  - `smart` → WorkBuddy 图表与代码

#### Scenario: 默认 Tab 不变
- **WHEN** 用户未指定 `tab` 参数打开详情页
- **THEN** 默认仍选中「数据表格」
