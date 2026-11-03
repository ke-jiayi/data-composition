# 移除 WorkBuddy 代码兜底 Spec

## Why
「WorkBuddy 分析」Tab 在数据集名称未命中 `WORKBUDDY_CODE_MAP` 时会兜底显示城市1 的 WorkBuddy 脚本（`resolveWorkbuddyCode(dataset?.name) || WORKBUDDY_CODE`），导致农村1 等未配置数据集出现串台内容。

## What Changes
- 移除 `workbuddyCode` 计算中的 `|| WORKBUDDY_CODE` 兜底，改为严格使用 `resolveWorkbuddyCode(dataset?.name)` 的结果。
- 「WorkBuddy 分析」Tab 的代码卡片改为按 `workbuddyCode` 是否为空条件渲染：为空时整块隐藏，不再渲染空 `<pre>`。
- 图表区逻辑不变：仍按 `/images/${datasetName}_WorkBuddy图.png` 动态加载，失败显示「暂无 WorkBuddy 图表」。
- 城市1-4 的映射条目与对应常量不变，保持正常显示。

## Impact
- Affected specs: 项目详情页「WorkBuddy 分析」Tab 的代码来源与兜底
- Affected code: `src/pages/ProjectDetailPage.tsx`（`workbuddyCode` 计算、「WorkBuddy 分析」Tab 代码卡片渲染条件）

## ADDED Requirements
### Requirement: WorkBuddy 代码严格按数据集名称匹配
系统 SHALL 仅在 `WORKBUDDY_CODE_MAP` 命中当前数据集名称时展示 WorkBuddy 代码，未命中时不得展示任何其他数据集的代码。

#### Scenario: 未配置数据集
- **WHEN** 打开名称为「农村1」的数据集并切换到「WorkBuddy 分析」Tab
- **THEN** 不展示代码卡片，页面仅保留图表展示区
- **THEN** 不出现城市1/城市2/城市3/城市4 的任何 WorkBuddy 脚本
- **THEN** 若 `/images/农村1_WorkBuddy图.png` 不存在，图表区显示「暂无 WorkBuddy 图表」

#### Scenario: 已配置数据集
- **WHEN** 打开城市1、城市2、城市3 或城市4 的详情页并切换到「WorkBuddy 分析」Tab
- **THEN** 代码卡片正常展示，内容分别为各自 `WORKBUDDY_CODE_MAP` 中的脚本
- **THEN** 图表区仍按动态路径加载，行为与改动前一致

#### Scenario: 名称包含匹配
- **WHEN** 数据集名称未精确命中键名但包含「城市2」等已配置键
- **THEN** `resolveWorkbuddyCode` 的名称包含兜底仍解析到对应脚本（该兜底不同于移除的城市1 硬兜底）

## MODIFIED Requirements
### Requirement: workbuddyCode 计算
`const workbuddyCode = resolveWorkbuddyCode(dataset?.name) || WORKBUDDY_CODE;` 改为 `const workbuddyCode = resolveWorkbuddyCode(dataset?.name);`。

### Requirement: 代码卡片渲染
代码卡片由无条件渲染改为 `workbuddyCode && (...)` 条件渲染；图表展示区不受影响。

## Non-Goals
- 不修改 `resolveWorkbuddyCode` 内部的精确匹配 + 名称包含逻辑。
- 不修改 `WORKBUDDY_CODE_MAP` 条目、各城市脚本常量、图片路径拼接与图片失败提示。
- 不新增图片或代码资源。
- 不修改其他 Tab、Tab 顺序、样式。
- 不执行任何 git commit / push。
