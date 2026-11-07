# 农村5 映射补齐 Spec

## Why
农村5 尚无手工清洗代码、WorkBuddy 代码与分析结论，三个 Tab 均无专属内容；它是本轮数据集补齐的最后一个，补齐后城市1-5、农村1-5 全部具备专属内容。

## What Changes
- `CODE_MAP` 新增 `'农村5'` → 新常量 `RURAL5_CODE`（多分类折线图脚本，输出 `农村5_手工图.png`）。
- `WORKBUDDY_CODE_MAP` 新增 `'农村5'` → 新常量 `RURAL5_WORKBUDDY_CODE`（分类 × 月份热力图脚本，输出 `农村5_长格式.xlsx` 与 `农村5_WorkBuddy图.png`）。
- `CONCLUSIONS_MAP` 新增 `'农村5'` → 新常量 `RURAL5_CONCLUSIONS`（三条结论逐字保存）。
- 图片仍走现有动态路径 `/images/${datasetName}_手工图.png` 与 `/images/${datasetName}_WorkBuddy图.png`，不新增图片代码（两张图已存在于 `public/images`）。
- **注意**：WorkBuddy 脚本中的 Python 换行转义 `f"{m[:4]}\n{m[5:]}月"` 在 TS 模板字符串中必须写成 `\\n`，否则会被 JS 解析成真实换行、破坏代码显示。

## Impact
- Affected specs: 农村5「数据清洗」「WorkBuddy 分析」「分析结论」
- Affected code: `src/pages/ProjectDetailPage.tsx`

## ADDED Requirements
### Requirement: 农村5 手工清洗代码
系统 SHALL 在农村5 的「数据清洗」Tab 预填多分类折线图脚本。

#### Scenario: 打开农村5 数据清洗
- **WHEN** 打开名称为「农村5」的数据集并切换到「数据清洗」Tab
- **THEN** 代码卡片展示 `RURAL5_CODE` 全文，关键标记包括 `df_long['月份_时间'] = pd.to_datetime(df_long['月份'], format='%Y年%m月')`、`df_long['简称'] = df_long['指标'].str.extract(r'^(.*?)类')`、`colors = ['#5EE7FF', '#A78BFA', '#F472B6', '#34D399', '#FBBF24', '#F87171']`、`ax.set_title('农村5农副产品消费价格指数趋势', ...)`、`plt.savefig('农村5_手工图.png', ...)`、`print("农村5手工图已保存")`
- **THEN** 城市1-5 与农村1-4 的清洗代码不受影响

### Requirement: 农村5 WorkBuddy 代码
系统 SHALL 在农村5 的「WorkBuddy 分析」Tab 展示分类 × 月份热力图脚本。

#### Scenario: 打开农村5 WorkBuddy 分析
- **WHEN** 打开农村5 并切换到「WorkBuddy 分析」Tab
- **THEN** 代码卡片展示 `RURAL5_WORKBUDDY_CODE` 全文，关键标记包括 `SRC, LONG, FIG = "农村5.xlsx", "农村5_长格式.xlsx", "农村5_WorkBuddy图.png"`、`from matplotlib.patches import Rectangle`、`cmap = LinearSegmentedColormap.from_list("heat", [...]`、`norm = Normalize(vmin=84.5, vmax=119)`、`rel_lum = lambda c: ...`、`ax.add_patch(Rectangle((j + 0.035, i + 0.045), 0.93, 0.91, ...))`、`cb.ax.axhline(100, ...)`、`fig.savefig(FIG, facecolor=BG, bbox_inches="tight")`
- **THEN** 第 20 行左右的刻度标签代码显示为 `f"{m[:4]}\n{m[5:]}月"`（字面反斜杠 + n，不是真实换行）
- **THEN** 图表区按 `/images/农村5_WorkBuddy图.png` 动态加载，缺失时显示「暂无 WorkBuddy 图表」

### Requirement: 农村5 分析结论
系统 SHALL 在农村5 未保存自定义结论时展示三条默认结论。

#### Scenario: 打开农村5 分析结论
- **WHEN** 打开农村5 并切换到「分析结论」Tab（未保存过自定义结论）
- **THEN** 依次展示：
  1. `鲜菜类呈现过山车行情：鲜菜价格从最低的84.9暴涨至118.8，随后又快速回落，是农村5波动最剧烈的品类，受季节和气候影响显著。`
  2. `畜肉类长期处于低位：畜肉类价格全年大部分时间低于95，甚至在89左右徘徊，持续拖累食品类总指数。`
  3. `蛋类价格触底反弹：蛋类从年初的86.0一路飙升，至最后一个月达到107.7，涨幅惊人，反映出市场供需关系的剧烈变化。`

## MODIFIED Requirements
### Requirement: 映射条目范围
三个映射在城市1-5、农村1-4 基础上新增 `农村5`；解析与兜底逻辑（精确匹配 → 名称包含兜底；WorkBuddy 未命中隐藏代码框、结论未命中空数组）保持不变。

## Non-Goals
- 不修改城市1-5、农村1-4 的脚本、结论与映射条目。
- 不修改解析函数、图片路径、空态文案、Tab 结构与样式。
- 不新增图片或数据文件。
- 不修改 `CLEANING_STEPS_MAP` 等其他映射。
- 不执行任何 git commit / push（用户要求在本地预览确认后再说）。
