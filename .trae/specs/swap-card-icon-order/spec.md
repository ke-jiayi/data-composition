# 卡片图标顺序调整 Spec

## Why
数据集卡片顶部操作组当前为「删除图标 → 移动图标 → XLSX 徽标」，与期望的「移动 → 删除 → 徽标」顺序不符。

## What Changes
- 在卡片顶部操作组容器 `relative flex items-center gap-2 shrink-0` 内，交换「删除」与「移动到文件夹」两个按钮的 DOM 顺序。
- 顺序变为：移动图标 → 删除图标 → XLSX 徽标。
- 两个按钮的 `className`、`opacity-0 group-hover:opacity-100`、hover 颜色、`onClick`、`aria-label`、`title` 全部保持不变。

## Impact
- Affected specs: 首页数据集卡片顶部操作区
- Affected code: `src/pages/HomePage.tsx`

## ADDED Requirements
### Requirement: 卡片右上角图标顺序
系统 SHALL 按「移动到文件夹图标 → 删除图标 → 文件类型徽标」的顺序渲染卡片顶部操作组。

#### Scenario: 悬停数据集卡片
- **WHEN** 鼠标悬停卡片
- **THEN** 从左到右依次显示移动图标、删除图标、XLSX 徽标，同处一个 `flex items-center gap-2` 容器
- **THEN** 图标大小、默认透明度、hover 颜色与改动前一致

#### Scenario: 点击图标
- **WHEN** 点击左侧图标
- **THEN** 仍打开「移动到文件夹」下拉菜单
- **WHEN** 点击右侧图标
- **THEN** 仍弹出「确认删除」弹窗
- **THEN** 两个图标均保留 `preventDefault` / `stopPropagation`，不会触发卡片跳转

#### Scenario: 移动菜单定位
- **WHEN** 移动菜单展开
- **THEN** 仍以操作组为定位基准 `absolute right-0 top-full mt-1 z-10`，位置与改动前一致

## Non-Goals
- 不修改图标 SVG、按钮类名、徽标样式与间距。
- 不修改下拉菜单内部结构与「确认删除」弹窗。
- 不执行任何 git commit / push。
