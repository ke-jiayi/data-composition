# 城乡对比页下拉切换重构 Spec

## Why
当前 `/comparison` 页面的对比维度是写死的单一组合（`城市1 vs 农村1`），切换按钮只是占位。需要把它升级为可由下拉框切换的多组对比数据展示，为后续补充更多城市/农村对比组预留扩展能力。

## What Changes
- 顶部区域重构为三段式布局：左侧「返回首页」按钮、中间居中的当前对比标题、右侧深色风格 `<select>` 下拉框。
- 组件内新增 `COMPARISON_DATA` 映射字典（`city1`、`city2`），用 `useState` 管理当前选中组（默认 `city1`）。
- 主体双栏卡片、图片、说明文字与底部「核心数据洞察」全部改为按当前选中项动态渲染。
- 切换下拉时给内容区域加淡入过渡，使标题、图片、说明、结论平滑切换。
- 图片加载失败兜底与切换后错误状态重置。

## Impact
- 受影响能力：城乡对比分析大屏的展示与交互
- 受影响代码：`src/pages/ComparisonPage.tsx`
- 图片资源：`/images/城乡1_对比图.png`、`/images/城乡1_WorkBuddy对比图.png` 仍缺失；`/images/城乡2_对比图.png`、`/images/城乡2_WorkBuddy对比图.png` 为预留路径（同样缺失，走兜底提示）

## ADDED Requirements

### Requirement: 顶部三段式布局
系统 SHALL 在页面顶部提供左侧返回首页按钮、中间居中的对比标题、右侧对比组下拉框。

#### Scenario: 布局呈现
- **WHEN** 用户打开 `/comparison`
- **THEN** 左侧显示「← 返回首页」按钮；中间居中显示当前对比标题；右侧显示下拉选择框

#### Scenario: 返回首页
- **WHEN** 用户点击「返回首页」
- **THEN** 路由跳转到 `/home`

#### Scenario: 下拉框样式
- **WHEN** 页面渲染
- **THEN** 下拉框为深色背景、浅色文字、圆角边框，与页面深色科技风一致

### Requirement: 对比组数据映射与状态
系统 SHALL 内置 `COMPARISON_DATA` 字典，包含 `city1` 与 `city2` 两个键，每个键包含 `title`、`leftImage`、`leftDesc`、`rightImage`、`rightDesc`、`insights` 字段；并以下拉框选项「城市1 vs 农村1」「城市2 vs 农村2」对应切换。

#### Scenario: 默认选中第一组
- **WHEN** 页面首次加载
- **THEN** 默认展示 `city1`（城市1 vs 农村1）的数据

#### Scenario: 切换对比组
- **WHEN** 用户在下拉框选择「城市2 vs 农村2」
- **THEN** 中间标题变为「城市2 vs 农村2」
- **THEN** 左右两张图片分别切换为对应 `leftImage` / `rightImage`
- **THEN** 两段说明文字分别切换为对应 `leftDesc` / `rightDesc`
- **THEN** 底部结论列表切换为对应 `insights`（预留占位文案）

#### Scenario: 切换过渡
- **WHEN** 用户切换对比组
- **THEN** 标题、卡片与结论区域以淡入过渡呈现，不出现闪烁

### Requirement: 主体图表与结论动态渲染
系统 SHALL 使用左右双栏 Grid 渲染「各分类指数对比」「总指数趋势对比」卡片，并按当前选中组渲染图片与配文；底部「核心数据洞察」按当前 `insights` 渲染列表。

#### Scenario: 图片与配文
- **WHEN** 当前选中 `city1`
- **THEN** 左栏图片为 `/images/城乡1_对比图.png`，配文为「交通通信类城乡均破105，食品类均低于100，体现宏观通胀共性。」
- **THEN** 右栏图片为 `/images/城乡1_WorkBuddy对比图.png`，配文为「1-5月城乡总指数走势高度一致，农村总指数略微低于城市。」

#### Scenario: 图片缺失兜底
- **WHEN** 某张图片加载失败
- **THEN** 对应卡片显示「暂无图表」提示，不出现破图；切换到另一组后错误状态重置并重新尝试加载

#### Scenario: 结论列表
- **WHEN** 当前选中 `city1`
- **THEN** 底部依次显示原有三条结论（交通通信类涨幅领跑 / 食品烟酒类城乡倒挂 / 其他服务类差异显著）

## MODIFIED Requirements
### Requirement: 对比分析页面顶部切换按钮
原「一排切换按钮（城市1 vs 农村1 高亮）」替换为右侧下拉选择框，功能等价且可扩展。

## REMOVED Requirements
无
