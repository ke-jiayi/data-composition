# 精简统计卡片+导航栏实时时钟 Spec

## Why
首页统计卡片中"最近更新"信息价值低且占位，需移除；同时在导航栏右上角添加实时时钟，提升科技感并替代"最近更新"的时间显示功能。

## What Changes
- 移除 HomePage 统计卡片中的"最近更新"卡片，只保留"总数据集"和"总数据行"两个
- 统计卡片网格从 `md:grid-cols-3` 改为 `md:grid-cols-2`
- Header 右侧添加实时时钟组件，显示 `YYYY-MM-DD HH:MM:SS`（24小时制）
- 时钟样式：冰蓝色 #6BC5E8，等宽字体 monospace，字号适中不抢眼（text-sm）
- 时钟每秒更新一次（setInterval 1000ms）

## Impact
- Affected code: `src/pages/HomePage.tsx`（移除第3个卡片）、`src/components/Header.tsx`（添加时钟）

## ADDED Requirements
### Requirement: 导航栏实时时钟
导航栏右上角显示实时系统时间，格式 YYYY-MM-DD HH:MM:SS，每秒更新，冰蓝色等宽字体，不抢眼。

#### Scenario: 时钟显示
- **WHEN** 用户打开任意页面
- **THEN** 导航栏右上角显示当前时间，每秒跳动一次

### Requirement: 统计卡片精简
HomePage 只显示"总数据集"和"总数据行"两个统计卡片，移除"最近更新"。

#### Scenario: 统计卡片
- **WHEN** 用户查看首页统计区
- **THEN** 只看到 2 个卡片（总数据集、总数据行），横向排列
