# 主题状态全局共享（React Context）Spec

## Why
当前 `useTheme` hook 内部使用 `useState`，每个调用方（WelcomePage、ThemeToggle）创建各自独立的 state 实例。ThemeToggle 点击切换时只更新自己的 state + html class，WelcomePage 的 `theme` state 不变，导致基于 `theme` 计算的 `colors` 对象不更新——必须重新 mount WelcomePage（跳转再返回）才能看到颜色变化。

## What Changes
- 新建 `src/contexts/ThemeContext.tsx`，提供 `ThemeProvider` 和 `ThemeContext`
- `ThemeProvider` 承载现有 useState + localStorage + html class 逻辑（从 `useTheme` 迁移）
- 改写 `src/hooks/useTheme.ts`：内部改为 `useContext(ThemeContext)`，对外 API（`{ theme, setTheme, toggleTheme }`）保持不变
- 在 `src/App.tsx` 用 `ThemeProvider` 包裹 `AppContent`（与 `ImportModalProvider` 同级，最外层）
- 不修改 `src/main.tsx` 防闪烁初始化（渲染前从 localStorage 设 html class，仍然有效）
- 不修改 WelcomePage、ThemeToggle 的调用代码（API 不变，自动从 context 拿到共享状态）

## Impact
- Affected code:
  - 新增：`src/contexts/ThemeContext.tsx`
  - 改写：`src/hooks/useTheme.ts`（实现层，API 不变）
  - 改：`src/App.tsx`（加 Provider 包裹）
- 不变：`src/pages/WelcomePage.tsx`、`src/components/ThemeToggle.tsx`（调用 `useTheme()` 不变，自动响应）
- 不变：`src/main.tsx`、`src/index.css`

## ADDED Requirements
### Requirement: 主题状态全局共享
系统 SHALL 通过 React Context 在应用根层级提供单一主题状态源，所有调用 `useTheme()` 的组件订阅同一份状态。

#### Scenario: 切换按钮立即响应
- **WHEN** 用户在 WelcomePage 点击主题切换按钮
- **THEN** WelcomePage 的 `theme` state 立即更新，`colors` 对象重新计算，页面颜色立即变化，无需跳转

#### Scenario: 跨页面同步
- **WHEN** 在任意页面切换主题后导航到其他页面
- **THEN** 新页面读取的 `theme` 与切换后的值一致

#### Scenario: 持久化
- **WHEN** 主题切换
- **THEN** `localStorage` 同步保存新值，刷新后保持偏好

#### Scenario: 防闪烁
- **WHEN** 页面首次加载
- **THEN** `main.tsx` 在 React 渲染前从 localStorage 读取并设置 html class，无白屏闪烁

## MODIFIED Requirements
### Requirement: useTheme hook
`useTheme` SHALL 通过 `useContext(ThemeContext)` 读取共享主题状态，对外返回 `{ theme, setTheme, toggleTheme }`（API 与原 hook 一致）。若在 Provider 外调用 SHALL 抛出明确错误。
