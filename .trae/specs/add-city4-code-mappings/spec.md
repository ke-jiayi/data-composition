# 城市4 代码映射 Spec

## Why
`CODE_MAP`（数据清洗）与 `WORKBUDDY_CODE_MAP`（WorkBuddy 分析）目前只有城市1、城市2、城市3。打开城市4 详情页时缺少对应脚本，需要补齐两组代码映射。

## What Changes
- 新增常量 `CITY4_CODE`，用模板字符串原样保存城市4 手工清洗脚本；在 `CODE_MAP` 新增 `'城市4': CITY4_CODE`。
- 新增常量 `CITY4_WORKBUDDY_CODE`，用模板字符串原样保存城市4 WorkBuddy 脚本；在 `WORKBUDDY_CODE_MAP` 新增 `'城市4': CITY4_WORKBUDDY_CODE`。
- 现有 `CODE_MAP`（城市1/2/3）与 `WORKBUDDY_CODE_MAP`（城市1/2/3）条目保持不变，解析逻辑（精确匹配 + 名称包含兜底）复用，无需改动。
- 图片部分不改代码：路径已按 `dataset.name` 动态拼接（`/images/城市4_手工图.png`、`/images/城市4_WorkBuddy图.png`）。

## Impact
- Affected specs: 项目详情页「数据清洗」Tab 代码回退、「WorkBuddy 分析」Tab 代码展示
- Affected code: `src/pages/ProjectDetailPage.tsx`（新增两个常量与两处映射条目）

## ADDED Requirements
### Requirement: 城市4 手工清洗代码回退
系统 SHALL 在城市4 数据集未保存自定义代码时，于「数据清洗」Tab 预填城市4 手工清洗脚本。

#### Scenario: 城市4 查看数据清洗
- **WHEN** 打开名称为「城市4」的数据集并切换到「数据清洗」Tab
- **THEN** 代码卡片正常渲染，输入框内容为城市4 清洗脚本：首行 `import pandas as pd`，含 `# 读取城市4`、`城市4.xlsx`、`城市4_手工图.png`，末行 `plt.show()`

### Requirement: 城市4 WorkBuddy 代码展示
系统 SHALL 在城市4 数据集下于「WorkBuddy 分析」Tab 展示城市4 的 WorkBuddy 脚本。

#### Scenario: 城市4 查看 WorkBuddy 分析
- **WHEN** 打开名称为「城市4」的数据集并切换到「WorkBuddy 分析」Tab
- **THEN** 代码块内容为城市4 WorkBuddy 脚本：首行 `import pandas as pd`，含 `TwoSlopeNorm`、`城市4.xlsx`、`城市4_长格式.xlsx`、`城市4_WorkBuddy图.png`，末行 `plt.close(fig)`
- **THEN** 代码块样式、标题与滚动行为保持不变
- **THEN** 「图表展示区」按动态路径请求 `/images/城市4_WorkBuddy图.png`；文件不存在时显示「暂无 WorkBuddy 图表」（本轮不新增图片资源）

#### Scenario: 既有数据集不受影响
- **WHEN** 打开城市1/城市2/城市3 的详情页
- **THEN** 两个 Tab 的代码内容与改动前完全一致

#### Scenario: 名称包含匹配
- **WHEN** 数据集名称未精确命中键名但包含「城市4」
- **THEN** `resolveDefaultCode` 与 `resolveWorkbuddyCode` 的包含兜底仍能解析到城市4 的对应脚本

## MODIFIED Requirements
### Requirement: 两张代码映射表条目
- `CODE_MAP`：城市1 → `PYTHON_CODE`、城市2 → `CITY2_CODE`、城市3 → `CITY3_CODE`、城市4 → `CITY4_CODE`。
- `WORKBUDDY_CODE_MAP`：城市1 → `WORKBUDDY_CODE`、城市2 → `CITY2_WORKBUDDY_CODE`、城市3 → `CITY3_WORKBUDDY_CODE`、城市4 → `CITY4_WORKBUDDY_CODE`。
- 解析函数与组件渲染逻辑不变。

## Non-Goals
- 不新增 `城市4_手工图.png` / `城市4_WorkBuddy图.png` 图片资源，不修改图片动态拼接与失败回退逻辑。
- 不修改 Tab 顺序、样式、其他数据集脚本与清洗步骤映射。
- 不执行任何 git commit / push。
