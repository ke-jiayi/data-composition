# 城乡对比数据扩展（城市3-5）Spec

## Why
城乡对比页目前只提供 `city1`、`city2` 两组数据，其中 `city2` 还是占位内容。需要补充城市3/4/5 三组真实描述与结论，让下拉框具备 5 组可切换的对比视图。

## What Changes
- `ComparisonPage.tsx` 的 `COMPARISON_DATA` 新增 `city3`、`city4`、`city5` 三项，字段结构与现有项一致（`title`/`leftImage`/`leftDesc`/`rightImage`/`rightDesc`/`insights`）。
- `ComparisonKey` 类型从 `'city1' | 'city2'` 扩展为 5 个键。
- 下拉框新增 3 个 `<option>`，顺序为 city1 → city5。
- 城市3-5 的 6 张图片路径为预留（文件暂不存在），沿用现有「暂无图表」兜底。

## Impact
- 受影响能力：城乡对比分析大屏的数据与下拉切换
- 受影响代码：`src/pages/ComparisonPage.tsx`

## ADDED Requirements

### Requirement: 新增城市3-5 对比数据
系统 SHALL 在 `COMPARISON_DATA` 中提供 `city3`、`city4`、`city5` 三组数据，图片路径为 `/images/城乡{3,4,5}_对比图.png` 与 `/images/城乡{3,4,5}_WorkBuddy对比图.png`，描述与三条结论严格使用用户提供文案。

#### Scenario: 城市3 数据
- **WHEN** 用户选择「城市3 vs 农村3」
- **THEN** 标题为「城市3 vs 农村3」，左图 `/images/城乡3_对比图.png`、左配文「城乡食品烟酒类均呈现明显的年中冲高回落趋势，波动剧烈。」
- **THEN** 右图 `/images/城乡3_WorkBuddy对比图.png`、右配文「总指数走势高度一致，下半年均趋于平稳。」
- **THEN** 结论依次为「食品价格大幅回落…」「交通通信持续通缩…」「医疗保健类韧性微涨…」三条

#### Scenario: 城市4 数据
- **WHEN** 用户选择「城市4 vs 农村4」
- **THEN** 标题为「城市4 vs 农村4」，左图 `/images/城乡4_对比图.png`、左配文「烟酒及用品类领涨，交通和通讯类出现下跌，城乡表现高度同频。」
- **THEN** 右图 `/images/城乡4_WorkBuddy对比图.png`、右配文「单月数据对比，城乡消费结构差异在特定年份的缩影。」
- **THEN** 结论依次为「烟酒及用品类领涨…」「交通和通讯类出现下跌…」「居住类略微承压…」三条

#### Scenario: 城市5 数据
- **WHEN** 用户选择「城市5 vs 农村5」
- **THEN** 标题为「城市5 vs 农村5」，左图 `/images/城乡5_对比图.png`、左配文「农副产品波动剧烈，鲜菜类呈现过山车行情，畜肉类长期低迷。」
- **THEN** 右图 `/images/城乡5_WorkBuddy对比图.png`、右配文「多品类农产品价格趋势对比，反映气候与供需的复杂影响。」
- **THEN** 结论依次为「鲜菜类呈现过山车行情…」「畜肉类长期处于低位…」「蛋类价格触底反弹…」三条

### Requirement: 下拉框展示 5 个选项
系统 SHALL 在下拉框中按 city1-city5 顺序渲染 5 个选项。

#### Scenario: 选项完整
- **WHEN** 用户展开下拉框
- **THEN** 依次显示「城市1 vs 农村1」「城市2 vs 农村2」「城市3 vs 农村3」「城市4 vs 农村4」「城市5 vs 农村5」
- **THEN** 选择任一选项后标题、图片、配文与结论同步切换
- **THEN** 切换时沿用淡入过渡与图片错误状态重置逻辑

## MODIFIED Requirements
### Requirement: 对比组数据映射与状态
原仅包含 `city1`、`city2` 的映射与 `'city1' | 'city2'` 类型扩展为包含 `city1`~`city5` 共 5 组。

## REMOVED Requirements
无
