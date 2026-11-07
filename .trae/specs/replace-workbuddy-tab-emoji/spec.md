# WorkBuddy Tab 图标替换 Spec

## Why
详情页 Tab 导航中「WorkBuddy 分析」使用 Emoji（🤖），跨系统渲染不一致，且与其他 Tab 的 SVG 图标风格不统一。实际承载该图标的是 `src/components/TabNavigation.tsx` 的 `tabs` 配置，而非 `ProjectDetailPage.tsx` 本身。

## What Changes
- 在 `src/components/TabNavigation.tsx` 的 `tabs` 数组中，把 `smart`（WorkBuddy 分析）项的 `icon` 从 `<span className="text-lg leading-5">🤖</span>` 替换为题目给定的内联 SVG 机器人图标。
- SVG 增加 `fill="currentColor"`，并设置 Tailwind 颜色类 `text-[#00B4D8] dark:text-[#6BC5E8]`：白天深青、黑夜亮冰蓝。
- SVG 尺寸类为 `w-5 h-5 inline-block mr-1`，与相邻 Tab 的 `w-5 h-5` 图标尺寸一致。
- 其余 Tab（数据表格、数据清洗、可视化分析、分析结论）的图标、Tab 顺序、点击逻辑、配色均不变。

## Impact
- Affected specs: 详情页 Tab 导航
- Affected code: `src/components/TabNavigation.tsx`

## ADDED Requirements
### Requirement: WorkBuddy Tab 图标
系统 SHALL 在「WorkBuddy 分析」Tab 标签前展示内联 SVG 机器人图标，并随主题变色。

#### Scenario: 亮色模式
- **WHEN** 页面处于亮色主题（html 带 `light`、无 `dark`）
- **THEN** 图标显示为深青色 `#00B4D8`，尺寸 `20×20`（`w-5 h-5`），与「WorkBuddy 分析」文字基线对齐，右侧有 `mr-1` 间距

#### Scenario: 暗色模式
- **WHEN** 页面处于暗色主题（html 带 `dark`）
- **THEN** 同一图标显示为亮冰蓝色 `#6BC5E8`

#### Scenario: 交互不变
- **WHEN** 点击「WorkBuddy 分析」Tab
- **THEN** 仍触发原有的 `onTabChange('smart')` 并把 `tab=smart` 同步到 URL 查询参数；激活态边框与文字颜色逻辑保持不变
- **THEN** 注释中明确不使用红色系配色

## MODIFIED Requirements
### Requirement: Tab 图标风格
「WorkBuddy 分析」不再是 Emoji，而是与其他四个 Tab 同尺寸的 SVG 图标（`w-5 h-5`），保持导航栏视觉一致。

## Non-Goals
- 不替换其他 Tab 的图标。
- 不修改 `ProjectDetailPage.tsx`（其中的 WorkBuddy 内容区块不含该 Emoji）。
- 不调整 Tab 栏的 `gap-2`、间距体系、边框或激活配色。
- 不引入 Remix Icon 或任何新依赖。
- 不执行任何 git commit / push（用户要求在本地预览确认）。
