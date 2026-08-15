# 点击切换明暗主题按钮（Within 组件）Spec

## Why
现有的垂直拖拽条主题切换器容易误触，用户希望改用点击式按钮。提供的 Within 组件是一个精致的日/月图标，点击即可在明暗主题间切换，且自带平滑过渡动画。

## What Changes
- 重写 `src/components/ThemeToggle.tsx`：用提供的 Within 组件替换原有的垂直拖拽条，改为点击切换
- Within 组件使用 `useTheme` 的 `toggleTheme` 实现点击切换
- 按钮颜色：黑夜模式冰蓝 `#6BC5E8`，白天模式暗紫 `#7B4B9E`（通过 `text-[#7B4B9E] dark:text-[#6BC5E8]` 实现）
- 按钮大小适中（`text-3xl`，约 30px）
- 保留 WelcomePage 右上角定位和 `stopPropagation` 防止误触进入首页
- 复用现有 `useTheme` hook（localStorage 持久化、`dark`/`light` class 切换）和 `main.tsx` 防闪烁初始化
- 主题联动已由 `src/index.css` 的浅色覆盖规则实现，无需额外改动

## Impact
- Affected code: `src/components/ThemeToggle.tsx`（重写）
- 不变：`src/hooks/useTheme.ts`、`src/main.tsx`、`src/pages/WelcomePage.tsx`（仅替换组件实现，导入路径不变）
- 不变：`src/index.css` 主题覆盖规则

## MODIFIED Requirements
### Requirement: 主题切换组件
将原有的垂直拖拽条替换为点击式 Within 按钮。点击按钮在 `dark` 与 `light` 主题间切换，切换时在 `<html>` 上增删 `dark`/`light` class，并通过 `localStorage` 持久化用户偏好。默认黑夜模式。

#### Scenario: 点击切换主题
- **WHEN** 用户点击右上角主题按钮
- **THEN** 当前主题在 dark/light 间切换，`<html>` 的 class 同步更新，`localStorage` 保存偏好

#### Scenario: 图标随主题变化
- **WHEN** 处于黑夜模式（`html.dark`）
- **THEN** Within 图标显示月亮形态，按钮颜色为冰蓝 `#6BC5E8`
- **WHEN** 处于白天模式（`html.light`）
- **THEN** Within 图标显示太阳形态，按钮颜色为暗紫 `#7B4B9E`

#### Scenario: 防止误触进入首页
- **WHEN** 用户点击主题按钮
- **THEN** 不触发 WelcomePage 的 `handleEnter` 导航（通过 `stopPropagation` 阻止冒泡）
