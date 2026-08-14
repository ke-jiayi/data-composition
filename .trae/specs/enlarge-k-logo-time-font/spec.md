# K.导航 与时间字体放大 - Spec

## Why
上一次放大（`enlarge-navbar-text-height`）仅将时间从 14px 调到 16px，变化太细微几乎不可见，且 'K.导航' Logo 区域字号完全未调整。用户反馈「没啥变化」，需要将 'K.导航' Logo 与时间两个元素的字号明显放大，使导航栏更醒目。

## What Changes
- 'K.' Logo 两个 `span`（K 字与点）字号从 `text-2xl`（24px）增大至 `text-3xl`（30px）
- '导航' 文字 `span` 字号从 `text-lg`（18px）增大至 `text-xl`（20px）
- 时间 `span` 字号从 `text-base`（16px）增大至 `text-lg`（18px）
- 保持 Header 高度 `h-18`（72px）、固定定位、垂直居中、颜色发光效果、左右内边距不变

## Impact
- Affected specs: `enlarge-navbar-text-height`（在其基础上进一步放大字号）
- Affected code: `src/components/Header.tsx`

## ADDED Requirements

### Requirement: K.导航 与时间字号明显放大
系统 SHALL 将 Header 中 'K.' Logo、'导航' 文字和时间的字号明显放大，使变化在视觉上清晰可见。

#### Scenario: 导航栏字号放大显示
- **WHEN** 用户访问任意页面
- **THEN** 左侧 'K.' Logo 字号为 30px（text-3xl），'导航' 文字字号为 20px（text-xl）
- **AND** 右侧时间字号为 18px（text-lg）
- **AND** Header 高度、固定定位、垂直居中、发光效果保持不变

## MODIFIED Requirements

### Requirement: Header Logo 与时间字号
Header.tsx 中：
- K 字 `span` 的 `text-2xl` 修改为 `text-3xl`
- 点号 `span` 的 `text-2xl` 修改为 `text-3xl`
- '导航' `span` 的 `text-lg font-semibold` 修改为 `text-xl font-semibold`
- 时间 `span` 的 `text-base font-mono tabular-nums` 修改为 `text-lg font-mono tabular-nums`

其余样式（颜色、text-shadow、font-family、leading-none 等）保持不变。

## REMOVED Requirements
无
