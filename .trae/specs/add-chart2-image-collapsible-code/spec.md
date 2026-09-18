# Add Chart2 Image And Collapsible Code Spec

## Why
项目详情页"可视化分析"Tab 当前只有一张趋势图（城市1），需要增加城市2 的柱状图图片和对应的 Python 代码展示，使可视化分析内容更完整。

## What Changes
- 在现有趋势图卡片下方增加第二张图片卡片（城市2_柱状图.png），样式与现有图片卡片一致
- 在第二张图片下方增加可折叠代码块，标题"📊 数据清洗与可视化代码"，默认收起，点击展开
- 新增一个 `useState` 控制代码块展开/收起状态
- 新增一个常量 `CITY2_CODE` 存放用户提供的 Python 代码

## Impact
- Affected specs: `visualization-analysis-tab`（原始可视化 Tab spec）
- Affected code: `src/pages/ProjectDetailPage.tsx`（chart Tab 区域 L446-458）

## ADDED Requirements
### Requirement: 第二张图片卡片
系统 SHALL 在"可视化分析"Tab 的现有趋势图卡片下方，增加一张城市2 柱状图图片卡片，图片居中、宽度占满容器、最大高度 500px，样式与现有趋势图卡片一致（bg-[#26262C] rounded-lg border p-2）。

#### Scenario: 展示第二张图片
- **WHEN** 用户进入项目详情页"可视化分析"Tab
- **THEN** 在趋势图下方看到标题"2025年12月城市居民消费价格指数（分指标）"的柱状图，图片居中、宽度占满、max-h 500px，下方有"数据来源：国家统计局 | 使用 Python Matplotlib 生成"说明

### Requirement: 可折叠代码块
系统 SHALL 在第二张图片下方提供一个可折叠代码块，标题"📊 数据清洗与可视化代码"，默认收起，点击标题切换展开/收起，展开后显示用户提供的完整 Python 代码。

#### Scenario: 默认收起
- **WHEN** 用户进入可视化分析 Tab
- **THEN** 代码块默认收起，仅显示标题栏

#### Scenario: 点击展开
- **WHEN** 用户点击代码块标题
- **THEN** 代码块展开，显示完整 Python 代码，代码区域有深色背景和等宽字体

## MODIFIED Requirements
无。

## REMOVED Requirements
无。
