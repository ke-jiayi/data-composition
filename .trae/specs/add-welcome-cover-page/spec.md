# 欢迎封面页 Spec

## Why
用户希望打开网站第一眼看到的是"书的封面"式欢迎页，写着"欢迎来到我的个人数据收集网址"，然后**跳转**（不是下滑）到数据首页。

## What Changes
- 新增 WelcomePage 封面页：全屏占满视口，显示"欢迎来到我的个人数据收集网址"和"点击任意位置进入"提示，点击屏幕任意位置跳转到 /home
- 首页 HomePage 的路由从 `/` 改为 `/home`
- `/` 路由改为 WelcomePage
- 导航栏"首页"链接从 `/` 改为 `/home`（Layout.tsx、MobileMenu.tsx、Sidebar.tsx）
- 其他路由的 Navigate 保持指向 `/home`
- pages/index.ts 导出 WelcomePage

## Impact
- Affected code: src/App.tsx, src/pages/index.ts, src/components/Layout.tsx, src/components/MobileMenu.tsx, src/components/Sidebar.tsx
- New file: src/pages/WelcomePage.tsx

## ADDED Requirements

### Requirement: 欢迎封面页
系统 SHALL 在根路径 `/` 提供全屏封面页。

#### Scenario: 点击封面跳转
- **WHEN** 用户访问 `/`
- **THEN** 显示全屏欢迎页，写着"欢迎来到我的个人数据收集网址"
- **WHEN** 用户点击封面任意位置
- **THEN** 页面**跳转到** `/home`（数据内容首页）

## MODIFIED Requirements

### Requirement: 首页路由
HomePage 由 `/` 路径移动到 `/home` 路径。

### Requirement: 导航"首页"链接
导航栏所有"首页"入口指向 `/home` 而非 `/`。
