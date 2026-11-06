# 农村2 映射补齐 Spec

## Why
农村2 尚无清洗代码、WorkBuddy 代码与分析结论，三个 Tab 均无专属内容。

## What Changes
- `CODE_MAP` 新增 `'农村2'` → 新常量 `RURAL2_CODE`（玫瑰图脚本，输出 `农村2_手工图.png`）。
- `WORKBUDDY_CODE_MAP` 新增 `'农村2'` → 新常量 `RURAL2_WORKBUDDY_CODE`（内容与 `RURAL2_CODE` 完全相同，用户明确给了同一脚本）。
- `CONCLUSIONS_MAP` 新增 `'农村2'` → 新常量 `RURAL2_CONCLUSIONS`（三条结论逐字保存）。
- 图片仍走 `/images/${dataset.name}_手工图.png` 与 `_WorkBuddy图.png` 动态路径。

## Impact
- Affected specs: 农村2「数据清洗」「WorkBuddy 分析」「分析结论」
- Affected code: `src/pages/ProjectDetailPage.tsx`

## ADDED Requirements
### Requirement: 农村2 手工清洗代码
系统 SHALL 在农村2 的「数据清洗」Tab 预填玫瑰图脚本。

#### Scenario: 打开农村2 数据清洗
- **WHEN** 打开名称为「农村2」的数据集并切换到「数据清洗」Tab
- **THEN** 代码卡片展示 `RURAL2_CODE` 全文（含 `import numpy as np`、`projection: 'polar'`、`plt.cm.cool`、`农村2_手工图.png`、`print("农村2手工玫瑰图已保存！")`）
- **THEN** 农村1 与城市1-5 的清洗代码不受影响

### Requirement: 农村2 WorkBuddy 代码
系统 SHALL 在农村2 的「WorkBuddy 分析」Tab 展示同一玫瑰图脚本。

#### Scenario: 打开农村2 WorkBuddy 分析
- **WHEN** 打开农村2 并切换到「WorkBuddy 分析」Tab
- **THEN** 代码卡片展示 `RURAL2_WORKBUDDY_CODE`，内容与 `RURAL2_CODE` 逐字相同
- **THEN** 图表区按 `/images/农村2_WorkBuddy图.png` 动态加载，缺失时显示「暂无 WorkBuddy 图表」

### Requirement: 农村2 分析结论
系统 SHALL 在农村2 未保存自定义结论时展示三条默认结论。

#### Scenario: 打开农村2 分析结论
- **WHEN** 打开农村2 并切换到「分析结论」Tab（未保存过自定义结论）
- **THEN** 依次展示：
  1. `食品价格先抑后扬：农村2食品烟酒类价格在8月触底（96.9）后快速回升，至12月已重回100以上，反弹趋势明显。`
  2. `其他服务成本持续推高：其他用品及服务类价格从年初的106.1一路攀升至115.4，涨幅居所有分类之首，是拉动总指数的核心动力。`
  3. `交通通信类处于低位：全年大部分时间在96-98区间徘徊，反映出农村交通通信消费价格整体偏弱。`

## MODIFIED Requirements
### Requirement: 映射条目范围
三个映射在城市1-5、农村1 基础上新增 `农村2`；解析与兜底逻辑（WorkBuddy 未命中隐藏代码框、结论未命中空数组）保持不变。

## Non-Goals
- 不修改城市1-5、农村1 的脚本、结论与映射条目。
- 不修改解析函数、图片路径、空态文案、Tab 结构与样式。
- 不新增图片文件。
- 不执行任何 git commit / push（用户未要求）。
