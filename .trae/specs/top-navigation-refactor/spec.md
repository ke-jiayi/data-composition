# 顶部导航结构重构 - 产品需求文档

## Overview
- **Summary**: 将网站从侧边栏导航改为顶部导航栏，包含纸飞机图标、网站标题和三个导航链接。
- **Purpose**: 优化导航体验，使网站更加现代化和直观。
- **Target Users**: 使用数据作品集网站的所有用户。

## Goals
- 将侧边栏导航改为顶部导航栏
- 左侧显示纸飞机图标 + "数据作品集"标题
- 右侧显示三个导航链接：首页、项目、关于
- 创建 ProjectListPage（项目列表页）
- 创建 AboutPage（关于页）

## Non-Goals (Out of Scope)
- 不修改其他页面的功能逻辑
- 不修改数据导入功能

## Background & Context
- 当前使用侧边栏导航（Sidebar 组件）
- 需要改为顶部导航栏风格

## Functional Requirements
- **FR-1**: 顶部导航栏左侧显示纸飞机图标（✈️）和"数据作品集"标题
- **FR-2**: 顶部导航栏右侧显示三个导航链接：首页、项目、关于
- **FR-3**: 点击"首页"跳转到 HomePage（路径：/）
- **FR-4**: 点击"项目"跳转到 ProjectListPage（路径：/projects）
- **FR-5**: 点击"关于"跳转到 AboutPage（路径：/about）
- **FR-6**: 创建 ProjectListPage，显示所有数据集卡片列表
- **FR-7**: 创建 AboutPage，显示关于网站的信息

## Non-Functional Requirements
- **NFR-1**: 导航栏固定在顶部，滚动时保持可见
- **NFR-2**: 响应式设计，移动端显示汉堡菜单
- **NFR-3**: 使用 Tailwind CSS 样式
- **NFR-4**: 代码符合 TypeScript 类型检查要求

## Constraints
- **Technical**: React 19 + TypeScript，Tailwind CSS，react-router-dom
- **Scope**: 修改 Layout.tsx、创建 Header 组件、创建 ProjectListPage、创建 AboutPage、修改 App.tsx

## Assumptions
- ProjectListPage 复用 HomePage 的数据集列表展示逻辑
- AboutPage 内容简洁，显示网站简介

## Acceptance Criteria

### AC-1: 顶部导航栏显示正确
- **Given**: 用户访问网站
- **When**: 页面加载完成
- **Then**: 顶部显示导航栏，左侧有纸飞机图标和"数据作品集"标题，右侧有三个导航链接
- **Verification**: `human-judgment`

### AC-2: 导航链接跳转正确
- **Given**: 用户点击导航链接
- **When**: 点击"首页"/"项目"/"关于"
- **Then**: 页面正确跳转到对应页面
- **Verification**: `human-judgment`

### AC-3: ProjectListPage 显示数据集列表
- **Given**: 用户访问 /projects
- **When**: 页面加载完成
- **Then**: 显示所有数据集卡片列表
- **Verification**: `human-judgment`

### AC-4: AboutPage 显示关于信息
- **Given**: 用户访问 /about
- **When**: 页面加载完成
- **Then**: 显示关于网站的信息
- **Verification**: `human-judgment`

### AC-5: TypeScript 编译通过
- **Given**: 代码修改完成
- **When**: 运行 TypeScript 类型检查
- **Then**: 无类型错误
- **Verification**: `programmatic`

## Open Questions
- 无
