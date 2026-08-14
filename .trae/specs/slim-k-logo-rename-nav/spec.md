# K字瘦身体+文字改回导航 Spec

## Why
当前 K 字使用 Arial Black 过于粗壮，视觉笨重。需要改为瘦长挺拔的窄体无衬线风格，让线条利落；同时将旁边文字从"数据作品集"改回"导航"。

## What Changes
- K 字字体从 Arial Black/Impact 改为窄体无衬线（如 'Oswald', 'Arial Narrow', sans-serif，font-weight 500-600 而非 bold）
- 保留霓虹蓝 #6BC5E8 颜色 + text-shadow 发光
- K 字垂直居中，字号与导航栏高度匹配（text-2xl）
- "数据作品集"改回"导航"，text-lg font-semibold

## Impact
- Affected code: `src/components/Header.tsx`

## ADDED Requirements
### Requirement: K字瘦长Logo
导航栏 K 字使用窄体无衬线字体，瘦长挺拔，霓虹蓝发光，旁边显示"导航"文字。

#### Scenario: 导航栏显示
- **WHEN** 用户打开任意页面
- **THEN** 导航栏左侧显示瘦长窄体 K + "导航"文字
