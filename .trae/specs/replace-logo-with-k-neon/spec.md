# 替换导航栏Logo为K字霓虹发光 Spec

## Why
导航栏左侧的纸飞机 emoji 视觉廉价感强，需要替换为大写字母"K"Logo，配霓虹蓝发光效果，提升科技感品牌识别度。

## What Changes
- 将 `✈️` emoji 替换为大写字母 "K"，使用 Arial Black/Impact 粗体
- "K" 颜色为霓虹蓝 #6BC5E8，添加 text-shadow 发光（0 0 8px #6BC5E8, 0 0 20px rgba(107,197,232,0.3)）
- "导航"文字改为"数据作品集"
- "K"字号与导航栏高度（h-16=64px）匹配，饱满醒目（约 text-2xl）
- "K"与"数据作品集"间距合适（gap-2）

## Impact
- Affected code: `src/components/Header.tsx`

## ADDED Requirements
### Requirement: K字霓虹Logo
导航栏左侧显示粗体大写"K"，霓虹蓝发光，旁边是"数据作品集"文字，点击仍触发侧边栏切换。

#### Scenario: 导航栏显示
- **WHEN** 用户打开任意页面
- **THEN** 导航栏左侧显示发光的"K"Logo + "数据作品集"文字
