# 农村3 映射补齐 Spec

## Why
农村3 尚无手工清洗代码、WorkBuddy 代码与分析结论，三个 Tab 均无专属内容，与已完成的城市1-5、农村1-2 体验不一致。

## What Changes
- `CODE_MAP` 新增 `'农村3'` → 新常量 `RURAL3_CODE`（食品烟酒类面积折线图脚本，输出 `农村3_手工图.png`）。
- `WORKBUDDY_CODE_MAP` 新增 `'农村3'` → 新常量 `RURAL3_WORKBUDDY_CODE`（分类偏离度横向条形图脚本，输出 `农村3_长格式.xlsx` 与 `农村3_WorkBuddy图.png`）。
- `CONCLUSIONS_MAP` 新增 `'农村3'` → 新常量 `RURAL3_CONCLUSIONS`（三条结论逐字保存）。
- 图片仍走现有动态路径 `/images/${datasetName}_手工图.png` 与 `/images/${datasetName}_WorkBuddy图.png`，不新增图片代码、不新增图片文件。

## Impact
- Affected specs: 农村3「数据清洗」「WorkBuddy 分析」「分析结论」
- Affected code: `src/pages/ProjectDetailPage.tsx`

## ADDED Requirements
### Requirement: 农村3 手工清洗代码
系统 SHALL 在农村3 的「数据清洗」Tab 预填面积折线图脚本。

#### Scenario: 打开农村3 数据清洗
- **WHEN** 打开名称为「农村3」的数据集并切换到「数据清洗」Tab
- **THEN** 代码卡片展示 `RURAL3_CODE` 全文，关键标记包括 `# 1. 读取并清洗`、`df_long['月份_时间'] = pd.to_datetime(...)`、`def get_simple_name(name):`、`df_target.pivot(index='月份', columns='简称', values='指数')`、`ax.fill_between(pivot_df.index, 100, pivot_df['食品烟酒类'], ...)`、`plt.savefig('农村3_手工图.png', ...)`、`print("农村3手工面积图已保存！")`
- **THEN** 城市1-5 与农村1-2 的清洗代码不受影响

### Requirement: 农村3 WorkBuddy 代码
系统 SHALL 在农村3 的「WorkBuddy 分析」Tab 展示偏离度条形图脚本。

#### Scenario: 打开农村3 WorkBuddy 分析
- **WHEN** 打开农村3 并切换到「WorkBuddy 分析」Tab
- **THEN** 代码卡片展示 `RURAL3_WORKBUDDY_CODE` 全文，关键标记包括 `SRC, LONG, FIG = "农村3.xlsx", "农村3_长格式.xlsx", "农村3_WorkBuddy图.png"`、`LinearSegmentedColormap.from_list("pos", ...)`、`snap = long[long["月份"] == last].set_index("分类")["指数"]`、`ax.barh(dev.index, dev.values, ...)`、`f"{last[:4]}年{int(last[5:])}月农村居民消费分类价格指数偏离度"`
- **THEN** 图表区按 `/images/农村3_WorkBuddy图.png` 动态加载，缺失时显示「暂无 WorkBuddy 图表」

### Requirement: 农村3 分析结论
系统 SHALL 在农村3 未保存自定义结论时展示三条默认结论。

#### Scenario: 打开农村3 分析结论
- **WHEN** 打开农村3 并切换到「分析结论」Tab（未保存过自定义结论）
- **THEN** 依次展示：
  1. `食品价格大幅回落：农村3食品烟酒类价格从年中高点（113.5）一路下跌至年底的101.0，是拖累总指数下行的绝对主力。`
  2. `交通通信持续通缩：该类价格全年维持在95-97区间，处于明显低位，反映出农村地区交通通信成本面临持续的下行压力。`
  3. `医疗保健类韧性微涨：在多数品类回落或持平的情况下，医疗保健类逆势维持在102左右，体现了刚需消费的价格刚性。`

## MODIFIED Requirements
### Requirement: 映射条目范围
三个映射在城市1-5、农村1-2 基础上新增 `农村3`；解析与兜底逻辑（精确匹配 → 名称包含兜底；WorkBuddy 未命中隐藏代码框、结论未命中空数组）保持不变。

## Non-Goals
- 不修改城市1-5、农村1-2 的脚本、结论与映射条目。
- 不修改解析函数、图片路径、空态文案、Tab 结构与样式。
- 不新增图片或数据文件。
- 不修改 `CLEANING_STEPS_MAP` 等其他映射。
- 不执行任何 git commit / push（用户要求在本地预览确认后再说）。
