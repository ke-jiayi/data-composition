# 项目详情页返回首页霓虹高光样式 - Spec

## Why
项目详情页（ProjectDetailPage）左上角「返回首页」按钮当前为灰色 `text-gray-500`、14px、无发光，视觉上不够醒目，与整体赛博朋克霓虹风格不协调。需要改为暗紫色霓虹高光并放大字体，使其更突出。

## What Changes
- ProjectDetailPage.tsx 正常态「返回首页」按钮文字色改为暗紫 `#7B4B9E`
- 添加霓虹高光 `text-shadow`（`0 0 8px #7B4B9E, 0 0 20px rgba(123, 75, 158, 0.3)`）
- 字号从 `text-sm`（14px）增大 5px 至 `text-[19px]`
- 移除原 `text-gray-500 hover:text-gray-700`（由 inline style 统一控制颜色与发光）
- 保持 SVG 箭头图标、`to="/home"` 跳转、`inline-flex items-center transition-colors` 不变
- 错误态「返回首页」按钮（实色蓝底白字）不修改

## Impact
- Affected specs: `fix-detail-back-home-route`（同按钮的路由已修复，本次仅改样式）
- Affected code: `src/pages/ProjectDetailPage.tsx`

## ADDED Requirements

### Requirement: 返回首页按钮霓虹高光样式
系统 SHALL 为项目详情页正常态「返回首页」按钮应用暗紫色霓虹高光样式并放大字体。

#### Scenario: 返回首页按钮显示霓虹高光
- **WHEN** 用户进入项目详情页（`/project/:id`）
- **THEN** 左上角「返回首页」文字为暗紫 `#7B4B9E`，带霓虹发光阴影
- **AND** 字号为 19px（原 14px + 5px）
- **AND** SVG 箭头图标与跳转目标 `/home` 保持不变

## MODIFIED Requirements

### Requirement: ProjectDetailPage 返回首页按钮样式
ProjectDetailPage.tsx 中正常态「返回首页」`<Link>` 的 className 由 `inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors` 修改为 `inline-flex items-center text-[19px] transition-colors`，并添加 inline `style={{ color: '#7B4B9E', textShadow: '0 0 8px #7B4B9E, 0 0 20px rgba(123, 75, 158, 0.3)' }}`。SVG 图标与 `to="/home"` 不变。

## REMOVED Requirements
无
