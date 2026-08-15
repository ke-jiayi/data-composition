# 修复 Within 组件黑夜模式月亮不显示 Spec

## Why
Within 主题切换按钮在黑夜模式下只显示太阳，月亮形态未出现。根因是 Tailwind CSS v4 默认的 `dark:` 变体使用 `@media (prefers-color-scheme: dark)` 媒体查询，而本项目通过在 `<html>` 上切换 `.dark`/`.light` class 来切换主题。因此 Within 组件内部所有 `dark:[transform:...]` 动画类和 `dark:text-[#6BC5E8]` 按钮颜色均不响应主题切换。

## What Changes
- 在 `src/index.css` 顶部（`@import "tailwindcss"` 之后）添加 `@custom-variant dark (&:where(.dark, .dark *));`
- 这让 Tailwind v4 的 `dark:` 变体改为匹配 `.dark` class（而非媒体查询），与项目的 class 切换机制一致

## Impact
- Affected code: `src/index.css`（新增一行配置）
- 受益组件：`src/components/ThemeToggle.tsx`（Within 的日→月变形动画和按钮颜色恢复正常）
- 附带受益：`src/components/charts/ChartContainer.tsx` 中的 `dark:` 类也会正确响应 `.dark` class

## ADDED Requirements
### Requirement: Tailwind dark 变体使用 class 策略
系统 SHALL 配置 Tailwind v4 的 `dark:` 变体匹配 `<html>` 上的 `.dark` class，而非 `prefers-color-scheme` 媒体查询。

#### Scenario: 黑夜模式下 Within 显示月亮
- **WHEN** `<html>` 带有 `dark` class
- **THEN** Within 组件的 SVG 路径应用 `dark:` 变换，显示月亮形态，按钮颜色为冰蓝 `#6BC5E8`

#### Scenario: 白天模式下 Within 显示太阳
- **WHEN** `<html>` 带有 `light` class（无 `dark`）
- **THEN** Within 组件的 SVG 路径保持默认状态，显示太阳形态，按钮颜色为暗紫 `#7B4B9E`
