# 农村1 映射补齐 Spec

## Why
农村1 目前三个 Tab 均无专属内容：分析结论走「暂无分析结论」空态，WorkBuddy 代码框被隐藏，清洗 Tab 无预填脚本。

## What Changes
- `CODE_MAP` 新增 `'农村1'` → 新增常量 `RURAL1_CODE`（逐字保存，输出 `农村1_手工图.png`）。
- `WORKBUDDY_CODE_MAP` 新增 `'农村1'` → 新增常量 `RURAL1_WORKBUDDY_CODE`（逐字保存，输出 `农村1_WorkBuddy图.png`，热力图实现）。
- `CONCLUSIONS_MAP` 新增 `'农村1'` → 新增常量 `RURAL1_CONCLUSIONS`（三条结论逐字保存）。
- 图片继续走既有动态路径 `/images/${dataset.name}_手工图.png` 与 `_WorkBuddy图.png`。

## Impact
- Affected specs: 农村1「数据清洗」「WorkBuddy 分析」「分析结论」三个 Tab
- Affected code: `src/pages/ProjectDetailPage.tsx`

## ADDED Requirements
### Requirement: 农村1 手工清洗代码
系统 SHALL 在农村1 的「数据清洗」Tab 预填其脚本，含 `pd.to_datetime(..., format='%Y年%m月')` 时间修复逻辑与 `plt.xticks(rotation=45)`。

#### Scenario: 打开农村1 数据清洗
- **WHEN** 打开名称为「农村1」的数据集并切换到「数据清洗」Tab
- **THEN** 代码卡片展示 `RURAL1_CODE` 全文（含 `# 1. 读取农村1`、`# 2. 修复日期排序（重点！）`、`# 3. 画图`、`# 4. 保存`、`print("农村1手工图已保存！")`）
- **THEN** 城市1-5 的清洗代码不受影响

### Requirement: 农村1 WorkBuddy 代码
系统 SHALL 在农村1 的「WorkBuddy 分析」Tab 展示热力图脚本（此前未配置时该代码框为隐藏状态）。

#### Scenario: 打开农村1 WorkBuddy 分析
- **WHEN** 打开农村1 并切换到「WorkBuddy 分析」Tab
- **THEN** 代码卡片展示 `RURAL1_WORKBUDDY_CODE`（含 `LinearSegmentedColormap`、`Rectangle`、`Normalize(vmin=95, vmax=115.5)`、`ScalarMappable`、标题 `2026年1-5月农村居民消费价格分类指数`）
- **THEN** 图表区按 `/images/农村1_WorkBuddy图.png` 动态加载，缺失时显示「暂无 WorkBuddy 图表」

### Requirement: 农村1 分析结论
系统 SHALL 在农村1 未保存自定义结论时展示三条默认结论，替代原「暂无分析结论」空态。

#### Scenario: 打开农村1 分析结论
- **WHEN** 打开农村1 并切换到「分析结论」Tab（未保存过自定义结论）
- **THEN** 依次展示：
  1. `交通通信类涨幅居前：农村1的交通通信类价格从年初的96.8一路攀升至5月的105.4，上行趋势显著，是拉动总指数的主要因素。`
  2. `食品烟酒类整体走势偏弱：食品烟酒及在外餐饮类多数月份处于100荣枯线以下（最低98.8），反映出基础食品消费价格面临一定的下行压力。`
  3. `其他用品及服务类维持高位：该类价格指数全年维持在109以上，显著高于其他分类，体现出农村居民在特定服务领域的较高成本。`

## MODIFIED Requirements
### Requirement: 映射条目范围
`CODE_MAP`、`WORKBUDDY_CODE_MAP`、`CONCLUSIONS_MAP` 在城市1-5 基础上新增 `农村1`；解析逻辑（精确匹配 + 名称包含兜底、WorkBuddy 未命中隐藏代码框、结论未命中空数组）保持不变。

## Non-Goals
- 不修改城市1-5 的脚本、结论与映射条目。
- 不修改解析函数、图片路径、空态文案、Tab 结构与样式。
- 不新增图片文件。
- 不执行任何 git commit / push。
