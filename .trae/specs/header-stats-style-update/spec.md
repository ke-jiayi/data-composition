# 顶部导航栏和统计卡片样式优化 - 产品需求文档

## Overview
- **Summary**: 优化顶部导航栏和首页统计卡片的样式，使其更加简洁和美观。
- **Purpose**: 提升网站视觉体验，使界面更加现代化。
- **Target Users**: 使用数据作品集网站的所有用户。

## Goals
- 确保顶部左侧只显示纸飞机图标（✈️）和"数据作品集"文字
- 为统计卡片添加白色背景、圆角边框和阴影效果
- 确保卡片内部内容居中显示

## Non-Goals (Out of Scope)
- 不修改其他功能逻辑
- 不改变布局结构

## Background & Context
- 当前 Header 组件已经显示纸飞机图标和标题
- 统计卡片已有基本样式，需要微调

## Functional Requirements
- **FR-1**: 顶部左侧显示纸飞机图标（✈️）和"数据作品集"文字
- **FR-2**: 统计卡片样式：`bg-white rounded-lg shadow-sm border border-gray-200 p-4`
- **FR-3**: 统计卡片内容居中显示

## Non-Functional Requirements
- **NFR-1**: 使用 Tailwind CSS 样式
- **NFR-2**: 代码符合 TypeScript 类型检查要求

## Constraints
- **Technical**: React 19 + TypeScript，Tailwind CSS
- **Scope**: 修改 Header.tsx 和 HomePage.tsx

## Acceptance Criteria

### AC-1: 顶部左侧显示正确
- **Given**: 用户访问网站
- **When**: 页面加载完成
- **Then**: 顶部左侧显示纸飞机图标和"数据作品集"文字
- **Verification**: `human-judgment`

### AC-2: 统计卡片样式正确
- **Given**: 用户访问首页
- **When**: 统计卡片显示
- **Then**: 卡片具有白色背景、圆角边框和阴影效果，内容居中
- **Verification**: `human-judgment`

### AC-3: TypeScript 编译通过
- **Given**: 代码修改完成
- **When**: 运行 TypeScript 类型检查
- **Then**: 无类型错误
- **Verification**: `programmatic`

## Open Questions
- 无
