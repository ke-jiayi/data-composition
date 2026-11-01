# 城市3 手工清洗代码映射 Spec

## Why
「数据清洗」Tab 的默认代码回退依赖 `CODE_MAP`，目前只有城市1、城市2。打开城市3 详情页时没有对应手工清洗脚本，需要补上城市3 的版本。

## What Changes
- 新增常量 `CITY3_CODE`，用模板字符串原样保存用户提供的城市3 手工清洗 Python 脚本（保留全部换行、缩进与空行，不做字符改动）。
- 在现有 `CODE_MAP` 中新增 `'城市3': CITY3_CODE`（`CODE_MAP` 仍只服务于「数据清洗」Tab 的代码回退，城市1/城市2 现有条目不变）。
- 无需改动渲染逻辑：`hasCleanCode` 与 `setCode(datasetData.code || resolveDefaultCode(...))` 已按名称动态解析，新增映射即可生效。

## Impact
- Affected specs: 项目详情页「数据清洗」Tab 的代码回退
- Affected code: `src/pages/ProjectDetailPage.tsx`（新增 `CITY3_CODE` 常量与 `CODE_MAP` 条目）

## ADDED Requirements
### Requirement: 城市3 清洗代码回退
系统 SHALL 在数据集名称为「城市3」且未保存过自定义代码时，于「数据清洗」Tab 的代码输入框中预填城市3 的默认 Python 脚本。

#### Scenario: 城市3 查看数据清洗
- **WHEN** 打开名称为「城市3」的数据集详情页并切换到「数据清洗」Tab
- **THEN** 「数据清洗与可视化代码」卡片正常渲染
- **THEN** 代码输入框内容为城市3 脚本：首行 `import pandas as pd`，含 `城市3.xlsx`、`城市3_手工图.png`，末行 `plt.show()`
- **THEN** 「保存修改」按钮与保存逻辑保持原有行为

#### Scenario: 城市1 / 城市2 不受影响
- **WHEN** 打开名称为「城市1」或「城市2」的数据集详情页
- **THEN** 其清洗代码回退仍分别为 `PYTHON_CODE` / `CITY2_CODE`，与改动前一致

#### Scenario: 名称包含匹配
- **WHEN** 数据集名称以「城市3」开头或包含「城市3」（未精确命中键名）
- **THEN** `resolveDefaultCode` 的名称包含兜底仍能解析到 `CITY3_CODE`

## MODIFIED Requirements
### Requirement: CODE_MAP 条目
`CODE_MAP` 由两个键扩展为三个键：`城市1 → PYTHON_CODE`、`城市2 → CITY2_CODE`、`城市3 → CITY3_CODE`；`resolveDefaultCode` 的匹配逻辑保持不变。

## Non-Goals
- 不修改「WorkBuddy 分析」Tab 的 `WORKBUDDY_CODE_MAP`。
- 不新增城市3 的 WorkBuddy 代码、分析结论、清洗步骤或图片资源。
- 不修改 Tab 顺序、图片动态拼接逻辑、代码卡片样式。
- 不执行任何 git commit / push。
