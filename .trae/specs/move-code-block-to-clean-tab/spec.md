# 移动代码块至数据清洗 Tab 并按数据集映射 Spec

## Why
当前城市2 的代码块位于"可视化分析"Tab，而"数据清洗"Tab 内的可编辑代码块默认显示城市1 代码（PYTHON_CODE），位置与内容均不符合预期。需要：可视化分析 Tab 只保留图表；代码块统一放在数据清洗 Tab，保留可编辑与保存能力，外层增加折叠（默认收起），内容按当前数据集映射（城市1/城市2），无映射的数据集不显示代码块。

## Problem
- [ProjectDetailPage.tsx](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx) chart Tab（L517-555）命中映射时除图表卡片外还渲染了一个静态可折叠代码块（上一轮加入），需移除。
- clean Tab（L390-422）的代码卡片是常显的可编辑 textarea + "保存修改"按钮，`code` 初始值固定回退 `PYTHON_CODE`（L146 `datasetData.code || PYTHON_CODE`），城市2 数据集也会看到城市1 代码；且无折叠。

## Users / Goals
- 可视化分析 Tab：任何数据集只看到图表（命中）或空状态（未命中），不含代码块。
- 数据清洗 Tab：DataCleaning 组件保持不变；其下代码卡片默认收起，点击展开后可编辑、可保存；默认内容按数据集映射（城市1→PYTHON_CODE，城市2→CITY2_CODE）；无映射数据集（如农村1）不显示代码卡片。

## Non-Goals
- 不改 DataCleaning 组件、其他 Tab（table/conclusion/smart）、保存到 IndexedDB 的既有逻辑。
- 不改 CHART_MAP 映射数据本身（image/code/title 三条字段保持不变，复用 chartMeta.code）。
- 不改图片资源、Header、其他页面。

## Functional Requirements
- **FR-1（chart Tab）**: 删除 chart Tab 内的可折叠代码块 JSX（含按钮与 `<pre>`）；命中映射时只渲染图表卡片，未命中仍渲染"暂无可视化图表，请先上传并分析数据"。
- **FR-2（clean Tab 折叠）**: clean Tab 的代码卡片外层增加折叠开关：标题行展示标题"数据清洗与可视化代码"（无 emoji）与 ▶/▼ 指示；点击标题切换展开/收起；默认收起；卡片 body（textarea 区域）仅展开时渲染或显示。"保存修改"按钮保留在标题行，收起/展开状态下均可点击。
- **FR-3（按数据集映射默认内容）**: 加载数据集时 `code` 回退值由固定 `PYTHON_CODE` 改为 `datasetData.code || chartMeta?.code || ''`（已保存的自定义代码优先，其次映射代码）。`useState` 初值同步由 PYTHON_CODE 改为空串。
- **FR-4（无映射隐藏代码卡片）**: clean Tab 中仅当 `chartMeta` 存在时渲染代码卡片；无映射（农村1 等）只显示 DataCleaning 组件，不显示代码卡片。
- **FR-5（状态重命名与重置）**: 将 `showChartCode` 状态重命名为 `showCleanCode`，默认 false；保留 `[id]` effect 在切换数据集时重置为收起。chart Tab 不再引用该状态。
- **FR-6**: 标题文案严格为"数据清洗与可视化代码"（移除现有 📊 emoji 前缀，与用户指定一致）。

## Non-Functional Requirements
- **NFR-1**: `npx tsc --noEmit` 退出码 0。
- **NFR-2**: 仅修改 `src/pages/ProjectDetailPage.tsx` 一个文件。

## Acceptance Criteria

### AC-1: 可视化分析 Tab 不再含代码块
- **Type**: `rule`
- **Given**: 城市1 或城市2 数据集
- **When**: 进入"可视化分析"Tab
- **Then**: 只渲染图表卡片（标题/图片/数据来源），DOM 中不存在含"数据清洗与可视化代码"的按钮，也不存在 `<pre>` 代码块
- **Evidence**: 代码检查 + 浏览器 DOM 断言

### AC-2: 数据清洗 Tab 代码块默认收起、可展开
- **Type**: `rule`
- **Given**: 城市1/城市2 数据集
- **When**: 进入"数据清洗"Tab
- **Then**: 代码卡片默认收起（textarea 不可见），标题为"数据清洗与可视化代码"带 ▶；点击标题后 textarea 出现（▼），再点击收起
- **Evidence**: 浏览器交互验证

### AC-3: 默认代码按数据集映射，可编辑可保存
- **Type**: `rule`
- **Given**: 数据集中无已保存自定义代码
- **When**: 城市1 展开代码块 → textarea 内容为 PYTHON_CODE（含"城市1.xlsx"）；城市2 展开 → 内容为 CITY2_CODE（含"城市2.xlsx"）
- **Then**: 内容可编辑，"保存修改"按钮点击后走既有 saveCode 流程并显示"✓ 已保存"；刷新后已保存内容优先显示
- **Evidence**: 代码检查 + 浏览器断言

### AC-4: 无映射数据集不显示代码卡片
- **Type**: `rule`
- **Given**: 农村1 等无映射数据集
- **When**: 进入"数据清洗"Tab
- **Then**: 显示 DataCleaning 组件，但不含"数据清洗与可视化代码"卡片、无保存按钮
- **Evidence**: 浏览器 DOM 断言

### AC-5: 切换数据集重置折叠
- **Type**: `rule`
- **When**: 在城市2 展开代码块后导航到城市1
- **Then**: 代码块恢复收起状态
- **Evidence**: 代码检查（[id] effect）+ 浏览器验证

### AC-6: 其他功能与编译不受影响
- **Type**: `rule`
- **When**: tsc 编译；检查 chart 空状态、DataCleaning、其他 Tab
- **Then**: tsc 退出码 0；图表空状态、DataCleaning 数据清洗、其他 Tab 渲染与逻辑不变
- **Evidence**: tsc 输出 + diff 复核

## Open Questions
- 无（形态=可编辑+保存外加折叠；范围=按数据集映射；标题无 emoji，均已与用户确认）。
