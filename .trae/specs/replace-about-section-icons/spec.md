# 关于页两个区块图标替换 Spec

## Why
「关于」页的两个区块标题使用 Emoji（🌐 / 📮）作为图标，跨平台渲染不一致，且与站点其它页面的 SVG 图标风格不统一。

## What Changes
- `src/pages/AboutPage.tsx` 中「这个网站是做什么的？」标题前的 `🌐` 替换为饼图内联 SVG。
- 「联系方式」标题前的 Emoji 替换为聊天笑脸内联 SVG。**注意**：源码里「联系方式」前实际是 `📮`（不是用户描述的 `📱`），按实际字符替换。
- 两个 SVG 均带 `w-6 h-6 flex-shrink-0 inline-block mr-2`、`fill="currentColor"`、`text-[#00B4D8] dark:text-[#6BC5E8]`，白天科技蓝、黑夜亮冰蓝。
- 标题文字、区块布局与其余内容不变。

## Impact
- Affected specs: 关于页标题图标
- Affected code: `src/pages/AboutPage.tsx`

## ADDED Requirements
### Requirement: 网站介绍标题图标
系统 SHALL 在「这个网站是做什么的？」标题文字前展示饼图 SVG。

#### Scenario: 渲染
- **WHEN** 打开「关于」页
- **THEN** 标题前显示 `w-6 h-6` 的饼图图标，路径为 `M11 2.04938V12H20.9506...22.9506 14H13Z`，与标题文字同行且有 `mr-2` 间距

### Requirement: 联系方式标题图标
系统 SHALL 在「联系方式」标题文字前展示聊天笑脸 SVG（含右上角闪光装饰路径）。

#### Scenario: 渲染
- **WHEN** 打开「关于」页
- **THEN** 标题前显示笑脸图标（两条 path：笑脸与四角星），同样为 `w-6 h-6`、`mr-2`

### Requirement: 颜色与主题
#### Scenario: 亮/暗主题
- **WHEN** 切换主题
- **THEN** 两个图标分别为 `#00B4D8`（亮色）与 `#6BC5E8`（暗色），并带 `flex-shrink-0` 防止被标题文字挤压

## MODIFIED Requirements
### Requirement: 关于页标题渲染
标题文字「这个网站是做什么的？」与「联系方式」保持不变，仅图标由 Emoji 变为内联 SVG。

## Non-Goals
- 不修改关于页其它文案、区块样式、外部链接与联系方式内容。
- 不替换源码中其它 Emoji（如正文里可能存在的装饰符号）。
- 不引入依赖，不改 `index.html` / `package.json`。
- 不执行任何 git commit / push（用户要求在本地预览确认）。
