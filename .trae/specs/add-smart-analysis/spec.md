# 智能分析功能 Spec

## Why
用户上传数据后需要手动配置图表，缺乏自动化分析能力。添加智能分析模块可自动检测数据类型并推荐合适的图表，提升用户体验。

## What Changes
- 在 TabNavigation 中添加 'smart' Tab 类型
- 在 ProjectDetailPage 添加"智能分析"Tab
- 创建 SmartAnalysis 组件：自动分析列类型，推荐并渲染 3-5 张图表
- 每张图表支持切换类型（柱状图/折线图/饼图）
- 使用 ECharts 渲染，高度 280px

## Impact
- Affected code: src/components/TabNavigation.tsx, src/pages/ProjectDetailPage.tsx, src/components/SmartAnalysis.tsx（新建）

## ADDED Requirements

### Requirement: 智能数据分析
系统 SHALL 自动分析数据集每一列的类型（数值、文本、日期）和唯一值数量。

### Requirement: 图表推荐
系统 SHALL 根据列类型自动推荐图表：
- 日期列 + 数值列 → 折线图
- 文本列（唯一值≤20）+ 数值列 → 柱状图/饼图
- 2+ 数值列 → 雷达图

### Requirement: 图表切换
每张图表右上角 SHALL 提供切换按钮，支持柱状图/折线图/饼图手动切换。

### Requirement: 数据量保护
当数据少于 3 行时 SHALL 显示"数据量太少，无法生成有意义的图表"。
