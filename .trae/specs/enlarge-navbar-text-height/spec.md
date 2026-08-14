# 导航栏文字与高度放大 - Spec

## Why
当前顶部 Header 高度为 64px（h-16），时间字号为 `text-sm`（14px），侧边栏导航链接（首页/项目/关于）字号也为 `text-sm`（14px），整体偏小、不够醒目。需要放大文字与高度，提升可读性与视觉层次。

## What Changes
- 顶部 Header 高度从 `h-16`（64px）增加至 `h-18`（72px）
- 顶部 Header 右侧时间字号从 `text-sm`（14px）增大至 `text-base`（16px）
- 侧边栏导航链接（首页/项目/关于）字号从 `text-sm`（14px）增大至 `text-base`（16px）
- 侧边栏顶部偏移从 `top-16` 同步调整为 `top-18`，以匹配新的 Header 高度
- 主内容区顶部内边距从 `pt-20` 调整为 `pt-24`，避免内容被加高的 Header 遮挡
- 保持 Header 内容垂直居中（`flex items-center h-full`）与固定定位（`fixed top-0`）
- 保持左右内边距不变（`px-4 sm:px-6 lg:px-8`）

## Impact
- Affected specs: 无直接相关 spec
- Affected code:
  - `src/components/Header.tsx`：调整 header 高度与时间字号
  - `src/components/Layout.tsx`：调整侧边栏 nav 链接字号、侧边栏 top 偏移、主内容 pt

## ADDED Requirements

### Requirement: 导航栏高度与文字放大
系统 SHALL 将顶部 Header 高度增加至 72px，并将时间与侧边栏导航链接字号增大至 16px，同时保持垂直居中与固定定位。

#### Scenario: 顶部 Header 显示加高放大
- **WHEN** 用户访问任意页面
- **THEN** 顶部 Header 高度为 72px，右侧时间字号为 16px，内容垂直居中
- **AND** Header 保持 `fixed top-0` 固定定位

#### Scenario: 侧边栏导航链接放大
- **WHEN** 用户点击「导航」按钮展开侧边栏
- **THEN** 首页/项目/关于链接字号为 16px
- **AND** 侧边栏顶部紧贴 Header 底部（无间隙、无重叠）

#### Scenario: 主内容不被遮挡
- **WHEN** 页面加载完成
- **THEN** 主内容区顶部内边距足够大，不被加高的 Header 遮挡

## MODIFIED Requirements

### Requirement: Header 布局
顶部 Header 高度从 `h-16`（64px）修改为 `h-18`（72px）；时间 `span` 的 className 由 `text-sm font-mono tabular-nums` 修改为 `text-base font-mono tabular-nums`。其余样式（背景、模糊、边框、阴影、左右内边距、固定定位）保持不变。

### Requirement: 侧边栏导航链接样式
Layout.tsx 中侧边栏 `<Link>` 的 className 中 `text-sm font-medium` 修改为 `text-base font-medium`；侧边栏 `<aside>` 的 `top-16` 修改为 `top-18`；主内容 `<main>` 的 `pt-20` 修改为 `pt-24`。

## REMOVED Requirements
无
