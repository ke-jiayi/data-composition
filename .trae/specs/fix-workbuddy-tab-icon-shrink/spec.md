# WorkBuddy Tab 图标挤压修复 Spec

## Why
「WorkBuddy 分析」Tab 内的 SVG 处在 `flex` 布局中，默认 `flex-shrink: 1` 会被兄弟文字挤压，显示成细长变形；同时上一版机器人路径视觉比例偏窄。

## What Changes
- 在 `src/components/TabNavigation.tsx` 的 `smart` Tab 图标 SVG 上新增 `flex-shrink-0`，阻止 flex 收缩。
- 保留并强化固定尺寸 `w-5 h-5`（20×20），不再随文字或可用空间缩放。
- 用用户给定的圆角机器人 `path` 替换原有路径，保持 `viewBox="0 0 24 24"`、`fill="currentColor"`。
- 颜色仍为 `text-[#00B4D8] dark:text-[#6BC5E8]`（白天深青、黑夜亮冰蓝），保留 `mr-1`、`inline-block`。

## Impact
- Affected specs: 详情页 Tab 导航（WorkBuddy 分析图标）
- Affected code: `src/components/TabNavigation.tsx`

## ADDED Requirements
### Requirement: 图标不被挤压
系统 SHALL 保证 WorkBuddy Tab 的 SVG 在任何 Tab 文案长度或容器宽度下都保持 20×20 的正圆角比例。

#### Scenario: 窄屏 / 文字较长
- **WHEN** Tab 栏空间不足或相邻文字较长
- **THEN** SVG 仍为 `w-5 h-5` 的正方形，不出现细长变形；Tab 栏可横向滚动（原 `overflow-x-auto` 行为不变）

#### Scenario: 主题与对齐
- **WHEN** 切换亮/暗主题
- **THEN** 图标分别显示 `#00B4D8` / `#6BC5E8`，与「WorkBuddy 分析」文字垂直居中，间距 `mr-1` 生效

#### Scenario: 新路径渲染
- **WHEN** 页面加载 Tab 栏
- **THEN** 图标使用新圆角机器人路径（`M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a5 5 0 0 1 5 5v1h1...`），不再是上一版窄机器人路径

## MODIFIED Requirements
### Requirement: WorkBuddy Tab 图标
上一版图标（`M11 2V4H8C6.89543...`）被替换为新路径；其余属性（`mr-1`、颜色类、`fill="currentColor"`）保持不变。

## Non-Goals
- 不修改其他四个 Tab 的图标与配置。
- 不修改 Tab 栏 `gap-2`、`overflow-x-auto`、激活态配色、点击与 URL 同步逻辑。
- 不新增依赖，不修改 `ProjectDetailPage.tsx`。
- 不执行任何 git commit / push（用户要求在本地预览确认）。
