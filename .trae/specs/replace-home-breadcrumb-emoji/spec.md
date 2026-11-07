# 首页面包屑图标替换 Spec

## Why
首页面包屑的「首页」入口使用 Emoji（🏠）作为图标，在不同系统/字体下渲染不一致；且项目未引入 Remix Icon（node_modules 与 index.html 中均无），直接写 `<i className="ri-home-gear-fill">` 不会显示任何图形。

## What Changes
- 在 `src/pages/HomePage.tsx` 的面包屑「首页」按钮中，用内联 SVG 房子图标替换 `🏠` Emoji。
- 图标采用 `fill="currentColor"` + Tailwind 颜色类 `text-[#00B4D8] dark:text-[#6BC5E8]`：白天深蓝、黑天亮青。
- 图标尺寸与文字协调：`h-4 w-4`（16px，匹配按钮的 `text-sm`），`mr-2` 提供与「首页」文字的间距。
- 不引入 remixicon 依赖、不改 `index.html`、不改 `package.json`（用户明确选择内联 SVG 方案）。

## Impact
- Affected specs: 首页面包屑导航
- Affected code: `src/pages/HomePage.tsx`

## ADDED Requirements
### Requirement: 面包屑首页图标
系统 SHALL 在首页面包屑「首页」按钮文字前展示一个矢量房子图标，并随主题切换颜色。

#### Scenario: 亮色模式
- **WHEN** 页面处于亮色主题（html 带 `light`、无 `dark`）
- **THEN** 「首页」前显示深蓝色 `#00B4D8` 的房子图标，与文字有 `mr-2` 间距，垂直居中且不撑高按钮

#### Scenario: 暗色模式
- **WHEN** 页面处于暗色主题（html 带 `dark`）
- **THEN** 同一图标显示为亮青色 `#6BC5E8`

#### Scenario: 功能不变
- **WHEN** 点击该「首页」按钮
- **THEN** 仍执行原有的 `setCurrentFolderId(null); setSearchQuery('')`，面包屑路径与文件夹层级行为完全不变

## MODIFIED Requirements
### Requirement: 面包屑渲染
面包屑仍显示「首页」文字；文件夹层级部分（`📁 {folderName}`）保持原样，不在本次修改范围内。

## Non-Goals
- 不替换文件夹层级的 `📁` Emoji。
- 不引入 Remix Icon 字体/CSS/依赖。
- 不修改面包屑布局结构、按钮 hover 颜色、点击逻辑。
- 不执行任何 git commit / push（用户要求在本地预览确认）。
