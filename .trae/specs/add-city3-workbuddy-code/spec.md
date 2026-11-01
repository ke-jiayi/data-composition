# 城市3 WorkBuddy 代码映射 Spec

## Why
`WORKBUDDY_CODE_MAP` 目前只有城市1、城市2，打开城市3 详情页的「WorkBuddy 分析」Tab 时会回退显示城市1 的脚本。需要补上城市3 对应的 WorkBuddy 脚本。

## What Changes
- 新增常量 `CITY3_WORKBUDDY_CODE`，用模板字符串原样保存用户提供的城市3 WorkBuddy Python 脚本（保留全部换行、缩进与空行，不做字符改动）。
  - 脚本中 `f"{d[:4]}\n{d[5:]}月"` 的 `\n` 属 Python 字面量，模板字符串内须写作 `\\n`，以保证代码框显示的是 `\n` 两个字符而非真实换行。
- 在 `WORKBUDDY_CODE_MAP` 中新增 `'城市3': CITY3_WORKBUDDY_CODE`；城市1/城市2 条目不变。
- 无需改动渲染逻辑：`workbuddyCode` 已由 `resolveWorkbuddyCode(dataset?.name) || WORKBUDDY_CODE` 动态解析。

## Impact
- Affected specs: 项目详情页「WorkBuddy 分析」Tab 的代码展示
- Affected code: `src/pages/ProjectDetailPage.tsx`（新增 `CITY3_WORKBUDDY_CODE` 常量与 `WORKBUDDY_CODE_MAP` 条目）

## ADDED Requirements
### Requirement: 城市3 WorkBuddy 代码展示
系统 SHALL 在数据集名称为「城市3」时，于「WorkBuddy 分析」Tab 的只读代码块展示城市3 的 WorkBuddy 脚本。

#### Scenario: 城市3 查看 WorkBuddy 分析
- **WHEN** 打开名称为「城市3」的数据集详情页并切换到「WorkBuddy 分析」Tab
- **THEN** 代码块内容为城市3 脚本：首行 `import pandas as pd`，含 `城市3.xlsx`、`城市3_长格式.xlsx`、`城市3_WorkBuddy图.png`、`ax.set_ylim(94, 111.5)`，末行 `print(long.groupby("分类")["指数"].agg(["min", "max", "first", "last"]).round(2))`
- **THEN** 代码块样式、标题「WorkBuddy 生成的数据处理与可视化代码」与 `max-h-[400px]` 滚动行为保持不变
- **THEN** 「图表展示区」仍按动态路径请求 `/images/城市3_WorkBuddy图.png`；若该文件不存在则显示「暂无 WorkBuddy 图表」提示（本轮不新增图片资源）

#### Scenario: 城市1 / 城市2 不受影响
- **WHEN** 打开名称为「城市1」或「城市2」的数据集详情页并进入「WorkBuddy 分析」Tab
- **THEN** 代码块仍分别为各自原有脚本，与改动前一致

#### Scenario: 名称包含匹配
- **WHEN** 数据集名称未精确命中键名但包含「城市3」
- **THEN** `resolveWorkbuddyCode` 的包含兜底仍解析到 `CITY3_WORKBUDDY_CODE`

## MODIFIED Requirements
### Requirement: WORKBUDDY_CODE_MAP 条目
`WORKBUDDY_CODE_MAP` 由两个键扩展为三个键：`城市1 → WORKBUDDY_CODE`、`城市2 → CITY2_WORKBUDDY_CODE`、`城市3 → CITY3_WORKBUDDY_CODE`；解析逻辑与未命中回退保持不变。

## Non-Goals
- 不修改「数据清洗」Tab 的 `CODE_MAP`（城市3 清洗代码已在前一轮加入）。
- 不新增 `城市3_WorkBuddy图.png` 图片资源，不修改图片动态拼接逻辑。
- 不修改 Tab 顺序、样式、其他数据集脚本。
- 不执行任何 git commit / push。
