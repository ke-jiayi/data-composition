# 封面风格首页重构 - 产品需求文档

## Overview
- **Summary**: 将数据作品集网站的首页（HomePage）重构为具有"封面感"的设计，参考 penny's cyberspace 风格，实现全屏居中、深色渐变背景、科技感视觉焦点
- **Purpose**: 提升第一印象，打造专业、清晰、具有科技感的视觉效果，像一本书的封面一样吸引用户
- **Target Users**: 数据分析师、招聘方、访客

## Goals
- [ ] 实现全屏居中的封面式布局，占满整个视口高度
- [ ] 使用深色渐变背景（深蓝/深灰/黑色）搭配亮色文字
- [ ] 添加霓虹蓝/电光紫作为强调色
- [ ] 实现页面加载时的渐显+上移动画
- [ ] 保留现有导入数据和数据集列表功能
- [ ] 所有功能正常可用

## Non-Goals (Out of Scope)
- 不修改其他页面（ProjectDetailPage、ProjectListPage、AboutPage）
- 不修改数据集卡片的详细样式
- 不修改导航栏组件
- 不修改路由配置

## Background & Context
- 项目使用 React 19 + TypeScript + Tailwind CSS v4
- framer-motion 已安装（v12.42.0）
- 现有 HomePage 包含：导入按钮、统计卡片、搜索框、数据集列表、Footer
- 布局组件 Layout.tsx 已包含 pt-20 顶部内边距，导航栏固定高度 h-16

## Functional Requirements
- **FR-1**: Hero 封面区域（全屏）：大号标题、副标题、探索按钮、底部信息
- **FR-2**: 数据集列表区域（封面下方）：保留原有统计卡片、搜索框、数据集列表
- **FR-3**: "探索作品"按钮点击后平滑滚动到数据集列表
- **FR-4**: 保留导入数据功能（集成在数据集列表区域）

## Non-Functional Requirements
- **NFR-1**: 页面加载动画流畅（fade-in + slide-up）
- **NFR-2**: 响应式设计，适配移动端
- **NFR-3**: TypeScript 编译无错误
- **NFR-4**: 导航栏不遮挡封面内容（正确处理 padding）

## Constraints
- **Technical**: React 19 + TypeScript + Tailwind CSS v4 + framer-motion
- **Dependencies**: 不添加新依赖
- **Layout**: 仍使用 Layout 组件包裹，需协调 pt-20 与全屏 Hero 的关系

## Acceptance Criteria

### AC-1: 全屏封面布局
- **Given**: 访问首页
- **When**: 页面加载完成
- **Then**: Hero 区域占满整个视口高度，内容垂直水平居中
- **Verification**: `human-judgment`

### AC-2: 深色渐变背景
- **Given**: 查看封面区域
- **When**: 检查背景样式
- **Then**: 使用深色渐变背景（深蓝/深灰/黑），搭配霓虹蓝/电光紫强调色
- **Verification**: `human-judgment`

### AC-3: 标题与副标题
- **Given**: 查看封面区域
- **When**: 检查文字内容
- **Then**: 显示大号标题（如"数据作品集 / Data Portfolio"）和副标题（如"数据分析 · 可视化 · 作品集"）
- **Verification**: `human-judgment`

### AC-4: 探索按钮与滚动
- **Given**: 点击"探索作品"或"Enter"按钮
- **When**: 执行点击操作
- **Then**: 页面平滑滚动到下方的数据集列表区域
- **Verification**: `human-judgment`

### AC-5: 加载动画
- **Given**: 刷新页面
- **When**: 页面加载
- **Then**: 标题、副标题、按钮有渐显+上移动画，依次出现
- **Verification**: `human-judgment`

### AC-6: 功能完整保留
- **Given**: 滚动到数据集列表区域
- **When**: 尝试导入数据、点击卡片
- **Then**: 导入数据功能和数据集卡片跳转功能正常
- **Verification**: `programmatic`

### AC-7: TypeScript 编译通过
- **Given**: 修改完成
- **When**: 运行 `npx tsc --noEmit`
- **Then**: 无 TypeScript 错误
- **Verification**: `programmatic`

## Open Questions
- [ ] 封面区域是否需要处理 Layout 的 pt-20？（建议 Hero 用负 margin 或 calc 补偿，或在 Layout 内调整）
