# 数据集卡片点击跳转功能 - 产品需求文档

## Overview
- **Summary**: 修复 HomePage 数据集卡片的点击跳转功能，确保正确跳转到项目详情页。
- **Purpose**: 用户点击数据集卡片时能够正确导航到对应的项目详情页面。
- **Target Users**: 使用数据作品集网站的用户。

## Goals
- 点击数据集卡片跳转到正确的路由路径 `/project/:id`
- 鼠标悬停时有视觉反馈
- 新导入的数据集卡片同样支持跳转

## Non-Goals (Out of Scope)
- 不修改其他页面或组件
- 不修改路由配置（已有 `/project/:id` 路由）

## Background & Context
- 当前 HomePage 使用 `<Link>` 组件但路径错误（`/dataset/:id`），而路由配置为 `/project/:id`
- ProjectDetailPage 已正确实现接收 id 参数的逻辑

## Functional Requirements
- **FR-1**: 点击数据集卡片跳转到 `/project/:id` 路径
- **FR-2**: 鼠标悬停时显示视觉反馈（阴影变化、光标 pointer）
- **FR-3**: 导入新数据后，新卡片支持点击跳转

## Non-Functional Requirements
- **NFR-1**: 代码符合 TypeScript 类型检查要求
- **NFR-2**: 使用 Tailwind CSS 样式

## Constraints
- **Technical**: React 19 + TypeScript，Tailwind CSS，react-router-dom
- **Scope**: 仅修改 HomePage.tsx 文件

## Assumptions
- 路由配置 `/project/:id` 已正确配置
- ProjectDetailPage 已正确实现接收 id 参数

## Acceptance Criteria

### AC-1: 卡片点击跳转到正确路径
- **Given**: 用户在首页看到数据集卡片
- **When**: 用户点击卡片
- **Then**: 页面跳转到 `/project/:id` 路径，ProjectDetailPage 正确加载对应数据集
- **Verification**: `human-judgment`

### AC-2: 悬停视觉反馈
- **Given**: 用户将鼠标悬停在数据集卡片上
- **When**: 鼠标悬停时
- **Then**: 卡片显示视觉反馈（阴影变化、光标变为 pointer）
- **Verification**: `human-judgment`

### AC-3: 新导入卡片支持跳转
- **Given**: 用户导入新数据集
- **When**: 新卡片显示在列表中
- **Then**: 新卡片支持点击跳转到详情页
- **Verification**: `human-judgment`

### AC-4: TypeScript 编译通过
- **Given**: 代码修改完成
- **When**: 运行 TypeScript 类型检查
- **Then**: 无类型错误
- **Verification**: `programmatic`

## Open Questions
- 无
