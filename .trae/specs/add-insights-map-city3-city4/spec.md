# 城市3/城市4 分析结论映射 Spec

## Why
「分析结论」Tab 目前只有城市1 默认结论与城市2 专属结论，城市3/城市4 缺少配置；且未命中映射的数据集会错误地回退到城市1 默认结论（如农村1）。需要补齐城市3/城市4 结论，并把兜底改为「暂无分析结论」。

## What Changes
- 新增 `CITY3_CONCLUSIONS` 与 `CITY4_CONCLUSIONS` 常量，内容按用户给出的三条结论逐字保存（含「总指数保持温和：」「服务消费韧性凸显：」等标题前缀）。
- 扩展 `CONCLUSIONS_MAP`：新增 `'城市3'`、`'城市4'`，并显式登记 `'城市1': DEFAULT_CONCLUSIONS` 以保持城市1 现有行为。
- 修改 `resolveConclusions(name?)`：精确匹配 → 名称包含兜底；均未命中时返回空数组 `[]`，**不再回退** `DEFAULT_CONCLUSIONS`。
- 「分析结论」Tab 增加空态：当 `conclusions` 为空时展示一句「暂无分析结论」，`+ 添加新结论` 按钮保留。
- 已保存到 IndexedDB 的 `dataset.conclusions` 仍优先展示（加载逻辑不变）。

## Impact
- Affected specs: 项目详情页「分析结论」Tab 的默认结论与兜底行为
- Affected code: `src/pages/ProjectDetailPage.tsx`（新增结论常量、扩展 `CONCLUSIONS_MAP`、改写 `resolveConclusions`、结论 Tab 空态）

## ADDED Requirements
### Requirement: 城市3 / 城市4 分析结论
系统 SHALL 在城市3、城市4 数据集下展示各自配置的三条分析结论。

#### Scenario: 城市3 查看分析结论
- **WHEN** 打开名称为「城市3」的数据集并切换到「分析结论」Tab（且未保存过自定义结论）
- **THEN** 依次展示：
  1. `总指数保持温和：城市3总体CPI在2025年期间保持平稳，处于温和区间，未出现大幅波动。`
  2. `食品烟酒类为核心变量：食品烟酒类价格年内波动最为明显，是拉动总指数起伏的最主要因素。`
  3. `居住类价格底盘稳固：居住类价格全年维持在100左右，对整体物价稳定起到了压舱石的作用。`

#### Scenario: 城市4 查看分析结论
- **WHEN** 打开名称为「城市4」的数据集并切换到「分析结论」Tab（且未保存过自定义结论）
- **THEN** 依次展示：
  1. `服务消费韧性凸显：教育文化娱乐、医疗保健等升级类消费价格呈现稳步微涨，反映出服务消费需求具有较强韧性。`
  2. `交通通信类持续承压：受大宗商品价格及行业竞争影响，交通通信类价格持续低于荣枯线（100），是拖累总指数的因素。`
  3. `衣着与生活用品走势分化：衣着类价格温和上涨，而生活用品及服务类价格出现阶段性下行，反映居民日常消费结构的变化。`

### Requirement: 未配置数据集显示空态
系统 SHALL 对未在 `CONCLUSIONS_MAP` 中配置结论的数据集展示「暂无分析结论」，不得回退到城市1/城市2 默认结论。

#### Scenario: 农村1 查看分析结论
- **WHEN** 打开名称为「农村1」的数据集（且未保存过自定义结论）并切换到「分析结论」Tab
- **THEN** 结论列表区域仅显示「暂无分析结论」
- **THEN** 不出现城市1 的三条默认结论，也不出现城市2 的结论

#### Scenario: 名称包含匹配
- **WHEN** 数据集名称未精确命中键名但包含「城市3」或「城市4」
- **THEN** 名称包含兜底仍解析到对应的结论数组

## MODIFIED Requirements
### Requirement: 结论解析兜底
`resolveConclusions` 由「未命中返回 `DEFAULT_CONCLUSIONS`」改为「未命中返回 `[]`」；`CONCLUSIONS_MAP` 显式包含城市1-4 四项，城市1 值仍为 `DEFAULT_CONCLUSIONS`。

#### Scenario: 城市1 / 城市2 行为不变
- **WHEN** 打开城市1 或城市2 的详情页
- **THEN** 结论内容与改动前完全一致

## REMOVED Requirements
### Requirement: 未命中回退城市1 默认结论
**Reason**: 会让农村1 等未配置数据集显示与自身无关的城市1 结论。
**Migration**: 未命中时返回空数组，由空态文案「暂无分析结论」承接。

## Non-Goals
- 不修改结论的编辑、保存、删除、添加交互与接口。
- 不修改其他 Tab、图片路径、代码映射、Tab 顺序。
- 不执行任何 git commit / push。
