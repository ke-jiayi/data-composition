# 城市5 映射补齐 Spec

## Why
城市5 尚缺手工清洗代码、WorkBuddy 代码与分析结论，详情页对应 Tab 无内容或走空态。

## What Changes
- `CODE_MAP` 新增 `'城市5'`，绑定新增常量 `CITY5_CODE`（用户给定脚本逐字保存，输出 `城市5_手工图.png`）。
- `WORKBUDDY_CODE_MAP` 新增 `'城市5'`，绑定新增常量 `CITY5_WORKBUDDY_CODE`（用户给定脚本逐字保存，输出 `城市5_WorkBuddy图.png`）。
- `CONCLUSIONS_MAP` 新增 `'城市5'`，绑定新增常量 `CITY5_CONCLUSIONS`（三条结论逐字保存）。
- 图片仍走既有动态路径，无需改动。

## Impact
- Affected specs: 「数据清洗」「WorkBuddy 分析」「分析结论」三个 Tab 的数据映射
- Affected code: `src/pages/ProjectDetailPage.tsx`

## ADDED Requirements
### Requirement: 城市5 手工清洗代码
系统 SHALL 在城市5 的「数据清洗」Tab 预填其专属 Python 脚本。

#### Scenario: 打开城市5 数据清洗
- **WHEN** 打开名称为「城市5」的数据集并切换到「数据清洗」Tab
- **THEN** 代码卡片展示 `CITY5_CODE` 内容（含 `#读取城市5`、`城市5居民消费价格指数趋势`、`城市5_手工图.png`、`print("城市5手工图已保存！")`）
- **THEN** 城市1-4 的清洗代码不受影响

### Requirement: 城市5 WorkBuddy 代码
系统 SHALL 在城市5 的「WorkBuddy 分析」Tab 展示其专属脚本；未配置数据集仍不展示代码（沿用已移除兜底的行为）。

#### Scenario: 打开城市5 WorkBuddy 分析
- **WHEN** 打开城市5 并切换到「WorkBuddy 分析」Tab
- **THEN** 代码卡片展示 `CITY5_WORKBUDDY_CODE`（含 `LinearSegmentedColormap`、`Normalize`、区间条形图逻辑、`城市5_WorkBuddy图.png`）
- **THEN** 图表区按 `/images/城市5_WorkBuddy图.png` 动态加载

### Requirement: 城市5 分析结论
系统 SHALL 在城市5 未保存自定义结论时展示三条默认结论。

#### Scenario: 打开城市5 分析结论
- **WHEN** 打开城市5 并切换到「分析结论」Tab（未保存过自定义结论）
- **THEN** 依次展示：
  1. `总指数保持平稳：城市5总体CPI在年内保持在温和区间，物价总水平运行平稳。`
  2. `食品价格季节性波动：食品烟酒类价格呈现明显的季节起伏，是短期拉动或拖累指数的主要变量。`
  3. `居住类支撑作用明显：居住类价格长期贴近100线，对整体物价的稳定起到了较好的压舱石作用。`

## MODIFIED Requirements
### Requirement: 映射条目范围
`CODE_MAP`、`WORKBUDDY_CODE_MAP`、`CONCLUSIONS_MAP` 由城市1-4 扩展为城市1-5；解析逻辑（精确匹配 + 名称包含兜底、未命中空值）保持不变。

## Non-Goals
- 不新增或修改图片文件、图片路径拼接、空态文案。
- 不修改城市1-4 的脚本与结论、Tab 顺序、样式。
- 不执行任何 git commit / push。
