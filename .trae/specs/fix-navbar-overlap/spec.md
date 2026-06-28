# 页面内容被导航栏遮挡问题修复 - 产品需求文档

## Overview
- **Summary**: 修复网站所有页面内容被顶部固定导航栏遮挡的问题，确保内容从导航栏下方开始显示
- **Purpose**: 解决用户反馈的页面顶部内容被固定导航栏遮挡的问题，提升用户体验
- **Target Users**: 网站所有访问用户

## Goals
- [x] 导航栏设置固定高度 `h-16`（64px），确保高度一致
- [x] 首页内容添加顶部内边距，避免被导航栏遮挡
- [x] 项目列表页内容添加顶部内边距，避免被导航栏遮挡
- [x] 关于页内容添加顶部内边距，避免被导航栏遮挡
- [x] 所有页面使用统一的顶部内边距，保持视觉一致性

## Non-Goals (Out of Scope)
- 不修改导航栏的样式（颜色、字体等）
- 不修改页面布局结构
- 不添加新功能或页面

## Background & Context
- 导航栏已设置为 `fixed top-0` 固定定位
- Layout 组件负责统一管理页面布局和内边距
- 所有页面都使用 Layout 组件包裹

## Functional Requirements
- **FR-1**: 导航栏组件必须设置固定高度 `h-16`
- **FR-2**: 页面内容区域必须设置顶部内边距 `pt-16`，与导航栏高度匹配
- **FR-3**: 所有页面使用相同的顶部内边距值，保持一致性

## Non-Functional Requirements
- **NFR-1**: TypeScript 编译必须通过，无类型错误
- **NFR-2**: 代码风格保持一致，遵循项目现有规范

## Constraints
- **Technical**: React 19 + TypeScript + Tailwind CSS
- **Dependencies**: 依赖现有项目结构和组件

## Assumptions
- Layout 组件是所有页面的统一布局容器
- 导航栏高度固定为 64px（h-16）

## Acceptance Criteria

### AC-1: 导航栏固定高度
- **Given**: 导航栏组件已存在
- **When**: 查看 Header.tsx 文件
- **Then**: 导航栏外层容器必须包含 `h-16` 类和 `fixed top-0 left-0 right-0` 定位类
- **Verification**: `programmatic`

### AC-2: 首页内容不被遮挡
- **Given**: 用户访问首页
- **When**: 页面加载完成
- **Then**: 首页内容从导航栏下方开始显示，顶部内容（标题、导入按钮等）完全可见
- **Verification**: `human-judgment`

### AC-3: 项目列表页内容不被遮挡
- **Given**: 用户访问项目列表页
- **When**: 页面加载完成
- **Then**: 项目列表页内容从导航栏下方开始显示，标题完全可见
- **Verification**: `human-judgment`

### AC-4: 关于页内容不被遮挡
- **Given**: 用户访问关于页
- **When**: 页面加载完成
- **Then**: 关于页内容从导航栏下方开始显示，标题完全可见
- **Verification**: `human-judgment`

### AC-5: 所有页面内边距一致
- **Given**: 所有页面都使用 Layout 组件
- **When**: 检查 Layout 组件的内容区域
- **Then**: 所有页面的内容区域使用相同的顶部内边距值（pt-16）
- **Verification**: `programmatic`

### AC-6: TypeScript 编译通过
- **Given**: 修改完成后
- **When**: 运行 `npx tsc --noEmit`
- **Then**: 无 TypeScript 错误，编译成功
- **Verification**: `programmatic`

## Open Questions
- [ ] 是否需要调整内边距值从 pt-16 改为 pt-20？（如果 pt-16 仍然遮挡内容）