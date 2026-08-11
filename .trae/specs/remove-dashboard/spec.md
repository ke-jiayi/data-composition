# 移除数据大屏功能 Spec

## Why
用户要求移除数据大屏相关功能，保留其他所有功能不变。

## What Changes
- 删除 src/pages/DashboardPage.tsx
- 从 src/pages/index.ts 移除 DashboardPage 导出
- 从 src/App.tsx 移除 /dashboard 路由和 DashboardPage 导入
- 从 src/pages/HomePage.tsx 移除数据大屏入口卡片
- 删除 public/dashboard.html

## Impact
- Affected code: src/App.tsx, src/pages/index.ts, src/pages/HomePage.tsx, src/pages/DashboardPage.tsx, public/dashboard.html

## REMOVED Requirements

### Requirement: 数据大屏路由
**Reason**: 用户要求移除
**Migration**: 无需迁移

### Requirement: 首页数据大屏入口
**Reason**: 用户要求移除
**Migration**: 无需迁移
