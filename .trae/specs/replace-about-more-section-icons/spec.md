# 关于页剩余两个区块图标替换 Spec

## Why
「技术栈」与「后续计划」标题仍使用 Emoji（🔧 / 🚀），与已替换完成的前两个区块（饼图、笑脸 SVG）风格不统一，且 Emoji 跨平台渲染不一致。

## What Changes
- `src/pages/AboutPage.tsx` 中「技术栈」标题前的 `🔧` 替换为齿轮内联 SVG（单条 path）。
- 「后续计划」标题前的 `🚀` 替换为带星星的羽毛笔内联 SVG（两条 path：笔 + 四角星）。
- 两个 SVG 均使用 `w-6 h-6 flex-shrink-0 inline-block mr-2 text-[#00B4D8] dark:text-[#6BC5E8]`、`fill="currentColor"`、`viewBox="0 0 24 24"`，白天科技蓝、黑夜亮冰蓝，无红色。
- 保留两个 h2 各自原有的 `mb-4`（技术栈）与 `mb-3`（后续计划），标题文字与后续技术栈标签、计划列表内容均不变。

## Impact
- Affected specs: 关于页标题图标（后两个区块）
- Affected code: `src/pages/AboutPage.tsx`

## ADDED Requirements
### Requirement: 技术栈标题图标
系统 SHALL 在「技术栈」标题前展示齿轮 SVG。

#### Scenario: 渲染
- **WHEN** 打开「关于」页并滚动到技术栈区块
- **THEN** 标题前显示 `w-6 h-6` 齿轮图标（路径 `M8.686 4.696...12 15Z`），与标题同行、`mr-2` 间距

### Requirement: 后续计划标题图标
系统 SHALL 在「后续计划」标题前展示羽毛笔 + 星形 SVG。

#### Scenario: 渲染
- **WHEN** 打开「关于」页并滚动到后续计划区块
- **THEN** 标题前显示两条 path 组成的图标（笔与四角星 `M20 1L21 3L23 4L21 5L20 7L19 5L17 4L19 3L20 1Z`），尺寸与间距同上

### Requirement: 颜色与主题
#### Scenario: 亮/暗主题
- **WHEN** 切换主题
- **THEN** 图标分别为 `#00B4D8`（亮色）与 `#6BC5E8`（暗色），并因 `flex-shrink-0` 不被标题文字挤压

## MODIFIED Requirements
### Requirement: 关于页标题样式
两个 h2 的 className 保持原值（技术栈 `... mb-4`、后续计划 `... mb-3`），仅图标由 Emoji 改为内联 SVG。

## Non-Goals
- 不修改技术栈标签列表、后续计划列表、链接与其它文案。
- 不改动已替换完成的饼图、笑脸图标。
- 不引入依赖，不改 `index.html` / `package.json`。
- 不执行任何 git commit / push（用户要求在本地预览确认）。
