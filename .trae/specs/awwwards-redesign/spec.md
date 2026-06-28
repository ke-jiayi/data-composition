# Awwwards风格首页重新设计 - Product Requirement Document

## Overview
- **Summary**: 参考 awwwards.com 的设计风格重新设计数据作品集网站首页，采用大卡片展示、渐变背景、优雅动画等现代设计元素，同时确保详情页内容与首页不重复。
- **Purpose**: 提升网站视觉效果和用户体验，使其更具设计感和专业感。
- **Target Users**: 使用该网站进行数据管理和分析的用户。

## Goals
- 参考 awwwards 设计风格重新设计首页布局
- 使用大卡片、渐变背景、优雅动画等现代设计元素
- 确保详情页内容与首页不重复（首页展示概览，详情页展示详细数据）
- 保持所有现有功能（导入、搜索、排序、统计）

## Non-Goals (Out of Scope)
- 不修改数据库结构
- 不修改导入逻辑
- 不修改数据清洗功能
- 不添加用户认证系统
- 不实现后端 API

## Background & Context
- 当前首页有基本功能但设计较普通
- 项目使用 React + TypeScript + Tailwind CSS + IndexedDB
- awwwards 的设计特点：大卡片展示、渐变背景、优雅动画、分类区域清晰

## Functional Requirements

- **FR-1**: 首页顶部 Hero 区域，大标题 + 渐变背景 + 欢迎语
- **FR-2**: 统计卡片区域，展示总数据集数量、总数据行数、最近更新时间
- **FR-3**: 搜索框支持实时过滤数据集
- **FR-4**: 排序功能支持按时间、名称、数据量排序
- **FR-5**: 数据集以大卡片形式展示（参考 awwwards 的网站卡片）
- **FR-6**: 底部区域有滚动动画（保留原有设计）
- **FR-7**: 导入功能正常工作
- **FR-8**: 详情页与首页内容不重复（首页展示概览，详情页展示详细表格和清洗功能）

## Non-Functional Requirements

- **NFR-1**: 页面响应式，适配桌面和移动端
- **NFR-2**: 动画流畅，参考 awwwards 的优雅效果
- **NFR-3**: 使用 Tailwind CSS 进行样式设计
- **NFR-4**: 代码风格与现有项目保持一致

## Constraints
- **Technical**: React 19, TypeScript, Tailwind CSS 4, IndexedDB
- **Business**: 保持现有功能不变

## Acceptance Criteria

### AC-1: Hero 区域设计精美
- **Given**: 用户打开首页
- **When**: 页面加载完成
- **Then**: Hero 区域显示大标题、渐变背景和欢迎语，视觉效果类似 awwwards
- **Verification**: `human-judgment`

### AC-2: 统计卡片显示正确
- **Given**: 用户已导入数据集
- **When**: 页面加载完成
- **Then**: 统计卡片显示正确的数据
- **Verification**: `programmatic`

### AC-3: 数据集卡片设计精美
- **Given**: 用户看到数据集列表
- **When**: 页面加载完成
- **Then**: 数据集以大卡片形式展示，包含名称、数据量、导入时间，有 hover 效果
- **Verification**: `human-judgment`

### AC-4: 详情页与首页不重复
- **Given**: 用户从首页进入详情页
- **When**: 点击数据集卡片
- **Then**: 详情页展示详细表格和清洗功能，与首页的概览展示不重复
- **Verification**: `human-judgment`

### AC-5: 搜索排序功能正常
- **Given**: 用户使用搜索或排序
- **When**: 输入关键词或选择排序方式
- **Then**: 列表实时更新
- **Verification**: `programmatic`

### AC-6: 导入功能正常
- **Given**: 用户点击导入按钮
- **When**: 选择文件并确认
- **Then**: 数据成功导入并更新列表
- **Verification**: `programmatic`

### AC-7: 底部动画区域正常
- **Given**: 用户滚动页面
- **When**: 底部区域进入视口
- **Then**: 显示渐显动画
- **Verification**: `human-judgment`

## Open Questions
- [ ] Hero 区域的具体渐变配色？（使用深蓝色系渐变）
- [ ] 卡片的具体阴影和间距？（参考 awwwards 的卡片风格）
