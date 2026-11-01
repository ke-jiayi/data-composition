# 城市2 WorkBuddy 代码映射 Spec

## Why
「WorkBuddy 分析」Tab 的代码块目前硬编码为城市1 的脚本（`WORKBUDDY_CODE`），打开城市2 详情页时会显示错误的代码。需要按数据集名称提供对应的 WorkBuddy 脚本，并先补上城市2 的版本。

## What Changes
- 新增常量 `CITY2_WORKBUDDY_CODE`，原样保存用户提供的城市2 Python 脚本（模板字符串包裹，保留所有换行与缩进，不做任何字符改动）。
- 新增 `WORKBUDDY_CODE_MAP`（`城市1 → 现有 WORKBUDDY_CODE`、`城市2 → CITY2_WORKBUDDY_CODE`）与 `resolveWorkbuddyCode(name?)`（精确匹配 + 名称包含兜底，规则与 `resolveDefaultCode` 一致）。
- 「WorkBuddy 分析」Tab 的只读代码块由固定 `WORKBUDDY_CODE` 改为按当前数据集解析出的 `workbuddyCode`；未命中映射的数据集回退到现有 `WORKBUDDY_CODE`（保持改动前行为）。
- 注意：**不**把该脚本写入现有 `CODE_MAP`，因为 `CODE_MAP` 只服务于「数据清洗」Tab 的代码回退，写入会覆盖城市2 的清洗代码（`CITY2_CODE`）。

## Impact
- Affected specs: 项目详情页「WorkBuddy 分析」Tab 的代码展示
- Affected code: `src/pages/ProjectDetailPage.tsx`（新增常量与映射、解析函数，改造 WorkBuddy 代码块渲染）
- 图片无需改动：城市2 的 `public/images/城市2_WorkBuddy图.png` 已存在，且上一轮已改为动态拼接路径

## ADDED Requirements
### Requirement: 按数据集名称展示 WorkBuddy 代码
系统 SHALL 在「WorkBuddy 分析」Tab 展示与当前数据集匹配的 WorkBuddy Python 脚本。

#### Scenario: 城市2 查看 WorkBuddy 分析
- **WHEN** 打开名称为「城市2」的数据集详情页并切换到「WorkBuddy 分析」Tab
- **THEN** 「图表展示区」动态加载 `/images/城市2_WorkBuddy图.png`
- **THEN** 「WorkBuddy 生成的数据处理与可视化代码」代码块展示城市2 脚本：首行 `import pandas as pd`，含 `城市2.xlsx` / `城市2_长格式.xlsx` / `城市2_WorkBuddy图.png`，末行 `print(long.groupby("分类")["指数"].agg(["min", "max", "first", "last"]).round(2))`

#### Scenario: 城市1 行为不变
- **WHEN** 打开名称为「城市1」的数据集详情页并切换到「WorkBuddy 分析」Tab
- **THEN** 代码块仍为原有城市1 脚本（内容与改动前逐字一致）

#### Scenario: 其他数据集回退
- **WHEN** 数据集名称未命中 `WORKBUDDY_CODE_MAP`（如农村1）
- **THEN** 代码块回退展示现有 `WORKBUDDY_CODE`，与改动前一致

## MODIFIED Requirements
### Requirement: WorkBuddy 代码块内容来源
`smart` Tab 的 `<pre>` 由直接渲染常量改为渲染 `resolveWorkbuddyCode(dataset.name) || WORKBUDDY_CODE`；代码块样式（`bg-[#1E1E24]`、等宽字体、`max-h-[400px]`、`overflow-y-auto`）与标题「WorkBuddy 生成的数据处理与可视化代码」保持不变。

## REMOVED Requirements
### Requirement: WorkBuddy 代码固定为城市1
**Reason**: 该脚本仅适用于城市1，城市2 展示了不匹配的代码。
**Migration**: 改为按数据集名称查 `WORKBUDDY_CODE_MAP`；未命中时仍回退 `WORKBUDDY_CODE`。

## Non-Goals
- 不修改「数据清洗」Tab 的 `CODE_MAP`（城市1 `PYTHON_CODE`、城市2 `CITY2_CODE` 保持原样）。
- 不修改图片动态拼接逻辑、Tab 顺序、Tab 导航。
- 不新增 WorkBuddy 脚本运行、编辑、复制能力；代码块仍只读。
- 不执行任何 git commit / push。
