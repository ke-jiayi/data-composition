# 修复返回封面按钮点击被拦截 Spec

## Why
HomePage 的"← 返回封面"按钮使用了 `absolute top-0 right-0` 定位但未设置 z-index，导致相邻的 `<h1>` 标题元素层叠在按钮上方，拦截了所有鼠标点击事件，按钮无法触发跳转。

## What Changes
- 给"返回封面"按钮的外层 `absolute top-0 right-0` div 添加 `z-10`，确保按钮在标题元素之上可点击
- 检查其他页面（ProjectListPage、AboutPage）是否有相同的"返回封面"按钮，如有则同步修复

## Impact
- Affected code: `src/pages/HomePage.tsx`（按钮容器 z-index）、可能涉及 `ProjectListPage.tsx`、`AboutPage.tsx`

## ADDED Requirements
### Requirement: 返回封面按钮可点击
"返回封面"按钮在所有页面均可正常点击，不被相邻元素拦截，点击后跳转到 `/`（WelcomePage）。

#### Scenario: 点击返回封面
- **WHEN** 用户在 HomePage 点击"← 返回封面"按钮
- **THEN** 跳转到 `/` 路径，显示 WelcomePage 封面
