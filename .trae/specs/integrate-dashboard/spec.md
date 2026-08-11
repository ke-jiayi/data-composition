# 集成数据大屏到 data-composition 网站 Spec

## Why
用户已使用 VizAgent 生成了一个数据大屏 dashboard.html，希望将其集成到 data-composition 网站中，通过 /dashboard 路由访问，并在首页添加入口。

## What Changes
- 在 App.tsx 中添加 `/dashboard` 路由，使用 iframe 嵌入 `public/dashboard.html`
- 创建新的 DashboardPage 组件，用 Layout 包裹，iframe 全屏展示
- 在 HomePage 数据集列表区域上方添加"📊 数据大屏"入口卡片，点击跳转到 /dashboard
- 确保大屏页面风格与网站整体一致（使用 Layout 组件包裹）

## Impact
- Affected code: src/App.tsx, src/pages/DashboardPage.tsx（新建）, src/pages/index.ts, src/pages/HomePage.tsx

## ADDED Requirements

### Requirement: 数据大屏路由
系统 SHALL 提供 `/dashboard` 路由，通过 iframe 嵌入 `public/dashboard.html` 展示数据大屏。

#### Scenario: 访问数据大屏
- **WHEN** 用户访问 `/dashboard`
- **THEN** 显示使用 Layout 包裹的页面，内部 iframe 加载 dashboard.html

### Requirement: 首页数据大屏入口
系统 SHALL 在首页数据集列表区域上方添加一个"📊 数据大屏"入口卡片，点击后跳转到 /dashboard。

#### Scenario: 从首页进入大屏
- **WHEN** 用户点击首页的"数据大屏"卡片
- **THEN** 页面跳转到 /dashboard
