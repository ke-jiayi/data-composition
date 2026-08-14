# 放大标题移除图标加入场动画 Spec

## Why
首页"数据作品集"标题旁的 📊 emoji 图标视觉杂乱，且当前字号偏小，缺乏入场动画的层次感。需要移除图标、放大字号、添加克制入场动画。

## What Changes
- 移除标题中的 `📊` emoji 图标，只保留"数据作品集"文字
- 字号从 `text-3xl md:text-4xl`（30/36px）放大至 `text-4xl md:text-5xl`（36/48px，约 +20-33%）
- 添加 framer-motion 入场动画：从 y:20 淡入到 y:0，duration 0.8s，ease-out，只播一次
- 保留粗体、cyan-300 发光色、drop-shadow 等原有风格

## Impact
- Affected code: `src/pages/HomePage.tsx`（标题 h1 及其容器）

## ADDED Requirements
### Requirement: 标题入场动画
"数据作品集"标题在页面加载时从底部上移 20px 并淡入，0.8s ease-out，只播一次，不闪烁不跳动不旋转。

#### Scenario: 页面加载
- **WHEN** 用户打开 HomePage
- **THEN** 标题从下方 20px 处淡入上移到原位，持续 0.8s
