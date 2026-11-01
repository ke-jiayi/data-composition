# 数据清洗 Tab 重构为「清洗记录」Spec

## Why
当前"数据清洗"Tab 是一个可操作工具：顶部有「去重」按钮、每列一带的「填充空值/删除列」操作、以及清洗日志与清洗前后对比。用户希望它不再像工具，而是一份专业的数据清洗记录——只展示清洗步骤说明与清洗+可视化代码。

## What Changes
- **REMOVED**：从 `clean` Tab 移除 `<DataCleaning>` 组件，即彻底删除顶部「去重」按钮、列操作区（填充空值/删除列）、清洗前后对比、清洗日志列表及两个弹窗。
- **REMOVED**：`DataCleaning` 组件失去唯一引用后整体删除文件 `src/components/DataCleaning.tsx`，并移除 `ProjectDetailPage.tsx` 的 import。
- **REMOVED**：随之失效的 `cleanedData` 状态、`handleCleanedDataChange` 回调、`useDB()` 中的 `saveData` 解构（`noUnusedLocals` 下必须清理，否则 tsc 失败）。
- **ADDED**：「数据清洗记录」卡片置于代码框上方——标题 + 一句说明 + 编号文字列表（如 `01 去除全空行列`），步骤内容按数据集名称映射（城市1/城市2），无映射数据集回退为一组通用步骤。
- **MODIFIED**：智能分析 Tab 的数据源由 `cleanedData` 改为 `rawData`（清洗后的数据概念随工具一并移除）。
- **RETAINED**：「数据清洗与可视化代码」代码框完全保持原样（标题、「保存修改」按钮、可编辑 textarea、高度自适应 `fitCode`），仅在 `chartMeta` 存在时渲染（沿用既有逻辑）。

## Impact
- Affected specs: move-code-block-to-clean-tab（代码框位置与按数据集映射逻辑保持）、always-show-clean-code / unclip-clean-code-editor（代码框可编辑与高度自适应保持）
- Affected code: `src/pages/ProjectDetailPage.tsx`；删除 `src/components/DataCleaning.tsx`

## ADDED Requirements

### Requirement: 数据清洗步骤列表
The clean tab SHALL display a professional, numbered text list of cleaning steps above the code block.

#### Scenario: 进入数据清洗 Tab
- **WHEN** 用户打开某个数据集的「数据清洗」Tab
- **THEN**: 代码框上方出现「数据清洗记录」卡片，内含一句说明与编号步骤列表（每步为一行的纯文字，如 `01 读取原始宽表` / `02 去除全空行列` / `03 宽表转长表`），视觉上像一份记录而非操作面板

#### Scenario: 按数据集内容映射步骤
- **WHEN** 数据集为「城市1」或「城市2」
- **THEN**: 步骤列表与对应数据集的清洗代码一致（城市1 含读取宽表、去除全空行列、宽表转置为长表；城市2 含去除全空行列、宽表转长表、过滤汇总行、筛选目标月份、简化指标名称）

#### Scenario: 无映射数据集
- **WHEN** 数据集名称未命中映射（如「农村1」）
- **THEN**: 仍显示一组通用清洗步骤（读取原始数据、去除空值、宽表转长表、统一字段命名），不出现空白页面

### Requirement: 仅保留代码框
The clean tab SHALL contain only the cleaning-record steps and the "数据清洗与可视化代码" block with its save button.

#### Scenario: 页面结构检查
- **WHEN** 用户查看数据清洗 Tab
- **THEN**: 页面不存在「去重」按钮、不存在任何列级填充/删除操作、不存在清洗日志与清洗前后对比区域；只存在步骤列表与代码框（含「保存修改」按钮）

## MODIFIED Requirements

### Requirement: 智能分析数据源
`SmartAnalysis` SHALL receive `rawData` instead of the removed `cleanedData` state.

#### Scenario: 打开智能分析 Tab
- **WHEN** 用户进入「智能分析」Tab
- **THEN**: 分析使用原始数据数组渲染，行为与原先在未清洗状态下一致

## REMOVED Requirements

### Requirement: 数据清洗操作工具
**Reason**: 用户要求该 Tab 不再具备操作能力，而是呈现为数据清洗记录。
**Migration**: 移除 `clean` Tab 中的 `<DataCleaning>`、其 import；删除 `src/components/DataCleaning.tsx`；清理 `cleanedData`、`handleCleanedDataChange`、`saveData`。

## Non-Goals
- 不修改代码框的标题、保存逻辑（`updateDataset`）与 textarea 自适应逻辑。
- 不修改数据表格、分析结论、智能分析、可视化分析 Tab 的其余行为。
- 不修改 `CHART_MAP` / 结论映射 / 图片资源 / Header / 其他页面。
- 不新增依赖，不引入新的存储字段（步骤列表为只读展示，不持久化）。

## Acceptance Criteria

### AC-1: 操作工具元素彻底移除
- **Type**: `rule`
- **When**: 审查 `clean` Tab 源码与 DOM
- **THEN**: DOM 中不存在文案为「去重」的按钮、不存在「列操作：」区块、不存在「清洗日志」区块、不存在「清洗前/清洗后」对比；`ProjectDetailPage.tsx` 不再 import `DataCleaning`；仓库内不存在 `src/components/DataCleaning.tsx`
- **Evidence**: 代码审查 + 浏览器 DOM 断言

### AC-2: 仅保留代码框与保存按钮
- **Type**: `rule`
- **When**: 命中映射的数据集（城市1/城市2）进入 clean Tab
- **THEN**: 页面存在标题为「数据清洗与可视化代码」的卡片与「保存修改」按钮，代码框可编辑且高度随内容自适应；不存在其他操作按钮
- **Evidence**: 浏览器 DOM 断言 + 交互验证

### AC-3: 步骤列表位于代码框上方
- **Type**: `rule`
- **When**: 打开 clean Tab
- **THEN**: 「数据清洗记录」卡片渲染在代码卡片之前（DOM 顺序在前），步骤以编号列表形式逐行展示；城市1/城市2 各自步骤与代码内容对应，无映射数据集显示通用步骤
- **Evidence**: 浏览器 DOM 断言

### AC-4: 零回归与编译通过
- **Type**: `rule`
- **When**: `npx tsc --noEmit` + 双主题浏览
- **THEN**: tsc 退出码 0（`noUnusedLocals` 无未使用变量）；无 console error；数据表格/分析结论/智能分析/可视化分析 Tab 表现不变；代码保存后刷新仍生效
- **Evidence**: tsc 输出 + 浏览器 console + 交互验证
