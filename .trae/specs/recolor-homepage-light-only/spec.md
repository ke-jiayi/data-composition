# HomePage 白天模式青绿蓝配色 Spec

## Why
首页白天模式下仍使用深色模式的霓虹紫青色，在白底上刺眼、曝光。用户要求 HomePage 白天模式使用青绿+蓝系配色（#00B4D8 主色），去除霓虹色，其他页面不变。

## What Changes
- 在 `src/index.css` 末尾新增 `html.light #datasets` 作用域的白天模式覆盖规则
- 覆盖 HomePage 内所有元素的配色：背景、文字、边框、按钮、卡片、搜索框等
- 使用 `#datasets` section ID 限定作用域，确保只影响 HomePage，不影响 WelcomePage / ProjectDetailPage
- 黑夜模式完全不受影响

## Impact
- Affected code: `src/index.css`（新增 HomePage 白天模式覆盖区块）
- 不变：WelcomePage、ProjectDetailPage、Layout、深色模式

## ADDED Requirements
### Requirement: HomePage 白天模式配色
白天模式下 HomePage SHALL 使用青绿+蓝系配色，去除霓虹紫青色。

#### Scenario: 背景与卡片
- **WHEN** 白天模式访问 HomePage
- **THEN** 主内容卡片背景 #FFFFFF，边框 #DCE8F2，极浅阴影；统计卡片/数据集卡片同理

#### Scenario: 文字色阶
- **WHEN** 白天模式
- **THEN** 主标题 #1A2A3A，正文 #2D3F4F，辅助文字 #6B8CAE

#### Scenario: 强调色
- **WHEN** 白天模式
- **THEN** 导入按钮背景 #00B4D8 文字白色；统计数字 #00B4D8；链接/图标 #48CAE4；标签 #52B788

#### Scenario: 搜索框
- **WHEN** 白天模式
- **THEN** 背景 #FFFFFF，文字 #1A2A3A，边框 #DCE8F2，聚焦边框 #00B4D8

#### Scenario: 数据集卡片悬停
- **WHEN** 白天模式 hover 数据集卡片
- **THEN** 轻微上浮 + 边框变为 #00B4D8

#### Scenario: 其他页面不变
- **WHEN** 白天模式访问 WelcomePage 或 ProjectDetailPage
- **THEN** 配色保持现有冷灰调，不受 HomePage 覆盖影响

#### Scenario: 深色模式不变
- **WHEN** 黑夜模式
- **THEN** HomePage 保持现有霓虹紫青配色
