# 农村4 映射补齐 Spec

## Why
农村4 尚无手工清洗代码、WorkBuddy 代码与分析结论，三个 Tab 均无专属内容，与已完成的城市1-5、农村1-3 体验不一致。

## What Changes
- `CODE_MAP` 新增 `'农村4'` → 新常量 `RURAL4_CODE`（横向条形图脚本，输出 `农村4_手工图.png`）。
- `WORKBUDDY_CODE_MAP` 新增 `'农村4'` → 新常量 `RURAL4_WORKBUDDY_CODE`（指数散点/哑铃图脚本，输出 `农村4_长格式.xlsx` 与 `农村4_WorkBuddy图.png`）。
- `CONCLUSIONS_MAP` 新增 `'农村4'` → 新常量 `RURAL4_CONCLUSIONS`（三条结论逐字保存）。
- 图片仍走现有动态路径 `/images/${datasetName}_手工图.png` 与 `/images/${datasetName}_WorkBuddy图.png`，不新增图片代码、不新增图片文件（两张图已存在于 `public/images`）。

## Impact
- Affected specs: 农村4「数据清洗」「WorkBuddy 分析」「分析结论」
- Affected code: `src/pages/ProjectDetailPage.tsx`

## ADDED Requirements
### Requirement: 农村4 手工清洗代码
系统 SHALL 在农村4 的「数据清洗」Tab 预填横向条形图脚本。

#### Scenario: 打开农村4 数据清洗
- **WHEN** 打开名称为「农村4」的数据集并切换到「数据清洗」Tab
- **THEN** 代码卡片展示 `RURAL4_CODE` 全文，关键标记包括 `# 1. 读取并清洗（由于是单月数据，结构比较简单）`、`df.columns = ['指标', '指数']`、`df['简称'] = df['指标'].str.extract(r'^(.*?)类')`、`# 2. 画横向条形图`、`ax.axvline(100, color='#64748B', lw=1.5, ls='--')`、`ax.set_title('农村4消费价格指数对比（2015年12月）', ...)`、`plt.savefig('农村4_手工图.png', ...)`、`print("农村4手工图已保存")`
- **THEN** 城市1-5 与农村1-3 的清洗代码不受影响

### Requirement: 农村4 WorkBuddy 代码
系统 SHALL 在农村4 的「WorkBuddy 分析」Tab 展示分类指数散点图脚本。

#### Scenario: 打开农村4 WorkBuddy 分析
- **WHEN** 打开农村4 并切换到「WorkBuddy 分析」Tab
- **THEN** 代码卡片展示 `RURAL4_WORKBUDDY_CODE` 全文，关键标记包括 `SRC, LONG, FIG = "农村4.xlsx", "农村4_长格式.xlsx", "农村4_WorkBuddy图.png"`、`ser = long.set_index("分类")["指数"].drop("农村总体", errors="ignore").sort_values()`、`up = int((ser > 100).sum())`、`ax.scatter(v, i, s=260, ...)`、`ax.set_title("2015年12月农村居民消费分类价格指数", ...)`、`fig.savefig(FIG, facecolor=BG, bbox_inches="tight")`
- **THEN** 图表区按 `/images/农村4_WorkBuddy图.png` 动态加载，缺失时显示「暂无 WorkBuddy 图表」

### Requirement: 农村4 分析结论
系统 SHALL 在农村4 未保存自定义结论时展示三条默认结论。

#### Scenario: 打开农村4 分析结论
- **WHEN** 打开农村4 并切换到「分析结论」Tab（未保存过自定义结论）
- **THEN** 依次展示：
  1. `烟酒及用品类领涨：该类价格指数达到104.2，居各类之首，显示出较强的价格上行压力。`
  2. `交通和通讯类出现下跌：该类指数为98.5，是唯一明显低于100荣枯线的类别，反映出当时交通通讯成本的下降。`
  3. `居住类略微承压：居住类指数为99.5，略低于100，显示农村居住相关消费价格处于平稳偏弱的态势。`

## MODIFIED Requirements
### Requirement: 映射条目范围
三个映射在城市1-5、农村1-3 基础上新增 `农村4`；解析与兜底逻辑（精确匹配 → 名称包含兜底；WorkBuddy 未命中隐藏代码框、结论未命中空数组）保持不变。

## Non-Goals
- 不修改城市1-5、农村1-3 的脚本、结论与映射条目。
- 不修改解析函数、图片路径、空态文案、Tab 结构与样式。
- 不新增图片或数据文件。
- 不修改 `CLEANING_STEPS_MAP` 等其他映射。
- 不执行任何 git commit / push（用户要求在本地预览确认后再说）。
