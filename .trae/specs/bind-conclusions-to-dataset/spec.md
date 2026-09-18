# 分析结论按数据集绑定 Spec

## Why
"分析结论"Tab 当前对所有数据集都回退显示同一份默认结论（DEFAULT_CONCLUSIONS，城市1 的结论）。城市2 数据集需要展示与其数据对应的 3 条专属结论；城市1 保持原结论不变。

## Problem
- [ProjectDetailPage.tsx](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx) L147：加载数据集时 `setConclusions(有已保存结论 ? 已保存 : DEFAULT_CONCLUSIONS)`，回退值与数据集名称无关，城市2 也会看到城市1 的结论。

## Users / Goals
- 打开城市2 → 分析结论 Tab 显示用户指定的 3 条城市2 结论（其他用品及服务/交通通信/食品烟酒 V 型）。
- 打开城市1 → 仍显示原 DEFAULT_CONCLUSIONS 3 条。
- 其他无映射数据集（如农村1）→ 行为不变，显示 DEFAULT_CONCLUSIONS。
- 已在页面编辑并保存过自定义结论的数据集 → 仍优先显示已保存内容（保持现有编辑/保存能力不回退）。

## Non-Goals
- 不改结论 Tab 的 UI、编辑、增删、保存（updateDataset.conclusions）逻辑。
- 不改其他 Tab、CHART_MAP、图片/代码映射。
- 不做 IndexedDB schema 变更。

## Functional Requirements
- **FR-1**: 新增 `CITY2_CONCLUSIONS` 常量，内容为用户指定的 3 条结论（逐字）：
  1. 其他用品及服务类价格涨幅显著，从2025年4月的106.7升至12月的117.8，累计上涨11.1个百分点，是拉动总指数上行的主要因素。
  2. 交通通信类价格持续低迷，全年各月均低于100，12月为97.4，反映该领域价格下行压力较大，与城市1的交通通信表现形成对比。
  3. 食品烟酒类价格波动较大，5月为100.4，9月降至97.6，12月回升至101.0，呈现"V型"走势，需关注其波动对总指数的影响。
- **FR-2**: 新增 `CONCLUSIONS_MAP: Record<string, string[]>`（key `城市2` → CITY2_CONCLUSIONS）与 `resolveConclusions(name?: string): string[]`：trim 精确匹配 → 名称包含兜底 → 未命中返回 DEFAULT_CONCLUSIONS（与 resolveChartMeta 相同的匹配策略）。
- **FR-3**: 加载 effect 中回退链改为 `datasetData.conclusions && length>0 ? datasetData.conclusions : resolveConclusions(datasetData.name)`。
- **FR-4**: `conclusions` 的 useState 初值保持 DEFAULT_CONCLUSIONS 不变（页面在 dataset 加载完成前有提前返回，初值不会被真实渲染）。

## Non-Functional Requirements
- **NFR-1**: `npx tsc --noEmit` 退出码 0。
- **NFR-2**: 仅修改 `src/pages/ProjectDetailPage.tsx` 一个文件。

## Acceptance Criteria

### AC-1: 城市2 显示专属 3 条结论
- **Type**: `rule`
- **Given**: 城市2 数据集无已保存自定义结论
- **When**: 进入"分析结论"Tab
- **Then**: 恰好显示 3 条结论，文本与 FR-1 逐字一致（含 106.7/117.8/11.1、97.4、100.4/97.6/101.0、"V型"等关键内容），不出现城市1 原结论（如"占 CPI 权重的 30%"）
- **Evidence**: 代码检查 + 浏览器 DOM 断言

### AC-2: 城市1 与无映射数据集结论不变
- **Type**: `rule`
- **Given**: 城市1 或农村1（无已保存自定义结论）
- **When**: 进入"分析结论"Tab
- **Then**: 显示 DEFAULT_CONCLUSIONS 原 3 条（食品烟酒/衣着/居住）
- **Evidence**: 代码检查 + 浏览器 DOM 断言（农村1）

### AC-3: 已保存自定义结论优先
- **Type**: `rule`
- **Given**: 数据集 IndexedDB 中存在非空 conclusions
- **When**: 加载详情页
- **Then**: 显示已保存结论而非映射默认值（保持现有行为）
- **Evidence**: 代码检查（回退链顺序）

### AC-4: 编辑/保存/增删功能与编译不受影响
- **Type**: `rule`
- **When**: tsc 编译；复核 conclusion Tab JSX 与 handleSaveConclusion/handleDeleteConclusion/handleAddConclusion
- **Then**: tsc 退出码 0；上述函数与 UI 未改动
- **Evidence**: tsc 输出 + diff 复核

## Open Questions
- 无。
