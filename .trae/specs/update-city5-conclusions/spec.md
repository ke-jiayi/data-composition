# 更新城市5 分析结论 Spec

## Why
城市5 现有默认结论为通用描述，需替换为基于真实数据特征的三条结论（鲜菜、畜肉类、粮食类）。

## What Changes
- 替换 `CITY5_CONCLUSIONS` 的三条文案为新的数据化结论。
- `CONCLUSIONS_MAP['城市5']` 按键不变，仅内容随常量更新。
- 其他城市结论、解析逻辑、空态文案均不变。

## Impact
- Affected specs: 城市5「分析结论」Tab 默认内容
- Affected code: `src/pages/ProjectDetailPage.tsx`（`CITY5_CONCLUSIONS`）

## ADDED Requirements
### Requirement: 城市5 分析结论内容
系统 SHALL 在城市5 未保存自定义结论时展示以下三条结论：
1. `鲜菜价格波动剧烈：鲜菜类价格年内最高达118.1，最低仅84.8，是影响城市5食品类价格指数起伏的最大不稳定因素。`
2. `畜肉类拖累食品指数：畜肉类价格长期处于低位（2026年5月仅为93.1），多个月份低于荣枯线，是拖累总指数下行的主要因素。`
3. `粮食类价格底盘极稳：粮食类价格全年在98.5-99.8的极窄区间内运行，展现出极强的刚性需求与稳定性。`

#### Scenario: 打开城市5 分析结论
- **WHEN** 打开名称为「城市5」的数据集并切换到「分析结论」Tab（未保存过自定义结论）
- **THEN** 依次展示上述三条文案，逐字一致（含全角括号与连接符 `-` 写法）
- **THEN** 不出现旧的「总指数保持平稳」等通用结论

#### Scenario: 已保存自定义结论
- **WHEN** 该数据集在 IndexedDB 中已有 `conclusions`
- **THEN** 仍优先展示已保存内容，不被默认值覆盖

## MODIFIED Requirements
### Requirement: CITY5_CONCLUSIONS
由三条通用结论替换为上述三条数据化结论，数组长度仍为 3。

## Non-Goals
- 不修改城市1-4 的结论常量与映射。
- 不修改 `resolveConclusions`、空态文案、编辑/添加交互。
- 不执行任何 git commit / push。
