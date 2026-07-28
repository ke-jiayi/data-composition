# 可视化大屏展示功能 - 产品需求文档

## Overview
- **Summary**: 在数据作品集网站的详情页（ProjectDetailPage）的"可视化分析"Tab 中展示一张静态图片，作为数据大屏展示区域
- **Purpose**: 展示用户使用 Python Matplotlib 生成的图表，提供直观的数据可视化展示
- **Target Users**: 数据分析师、业务人员

## Goals
- [ ] 在"可视化分析"Tab 中添加图片展示区域
- [ ] 显示图片标题
- [ ] 显示图片说明文字
- [ ] 图片居中显示，宽度占满容器，最大高度 500px

## Non-Goals (Out of Scope)
- 不添加新的 Tab
- 不修改现有 ChartPanel 的功能
- 不添加图片上传功能

## Background & Context
- 用户希望在现有"可视化分析"Tab 中展示一张已生成的图表
- 图片文件已存在于 public/images/ 目录
- 文件名：城市价格指数趋势图.png.png（需要注意双扩展名）

## Functional Requirements
- **FR-1**: 在 activeTab === 'chart' 的代码块中添加图片展示
- **FR-2**: 图片上方显示标题"城市居民消费价格指数趋势图"
- **FR-3**: 图片下方显示说明"数据来源：国家统计局 | 使用 Python Matplotlib 生成"
- **FR-4**: 图片居中显示，宽度占满容器，最大高度 500px

## Non-Functional Requirements
- **NFR-1**: TypeScript 编译必须通过
- **NFR-2**: 保持现有的 ChartPanel 功能不变

## Constraints
- **Technical**: React 19 + TypeScript + Tailwind CSS
- **Dependencies**: 图片文件已存在于 public/images/

## Acceptance Criteria

### AC-1: 图片展示区域
- **Given**: 用户访问项目详情页并切换到"可视化分析"Tab
- **When**: 查看页面内容
- **Then**: 显示图片展示区域，包含标题、图片和说明
- **Verification**: `human-judgment`

### AC-2: 图片样式
- **Given**: 图片已加载
- **When**: 检查图片样式
- **Then**: 图片居中显示，宽度占满容器（w-full），最大高度 500px（max-h-[500px]）
- **Verification**: `programmatic`

### AC-3: TypeScript 编译通过
- **Given**: 修改完成后
- **When**: 运行 `npx tsc --noEmit`
- **Then**: 无 TypeScript 错误
- **Verification**: `programmatic`

## Open Questions
- [ ] 是否需要保留现有的 ChartPanel 功能？（建议保留，同时展示图片和图表功能）
