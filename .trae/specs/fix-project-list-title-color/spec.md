# ProjectListPage "项目列表"标题深色模式配色 Spec

## Why
ProjectListPage 的"项目列表"标题使用 `text-gray-900`（接近黑色），在深色背景 `#0a0e1a` 上几乎不可见。用户要求改为与 HomePage"数据作品集"标题一致的青色发光效果。

## What Changes
- 修改 `src/pages/ProjectListPage.tsx` L39 的 `<h1>` className：`text-gray-900` → `text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]`
- 与 HomePage"数据作品集"标题（L159）完全一致的颜色和发光效果

## Impact
- Affected code: `src/pages/ProjectListPage.tsx`（仅 L39 一行 className）
- 不变：页面其他元素、功能、布局、其他页面

## MODIFIED Requirements
### Requirement: ProjectListPage"项目列表"标题配色
"项目列表"标题 SHALL 使用青色 `text-cyan-300` + drop-shadow 发光，与 HomePage"数据作品集"标题一致。

#### Scenario: 深色模式可读
- **WHEN** 深色模式访问 /projects
- **THEN** "项目列表"标题显示为青色发光文字，清晰可读

#### Scenario: 其他不变
- **WHEN** 修改后
- **THEN** 页面其他元素（副标题、卡片、按钮等）保持不变
