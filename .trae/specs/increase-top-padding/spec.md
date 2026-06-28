# 增加页面顶部内边距 - 产品需求文档

## Overview
- **Summary**: 将所有页面的内容区域整体向下移动，增加顶部内边距，确保页面内容完全不被顶部固定导航栏遮挡
- **Purpose**: 解决用户反馈的页面顶部内容仍然被导航栏遮挡的问题，提升用户体验
- **Target Users**: 网站所有访问用户

## Goals
- [ ] 将内容区域顶部内边距从 `pt-16` 增加到 `pt-20`
- [ ] 确保首页、项目页、关于页的内容都从导航栏下方清晰显示
- [ ] 保持所有页面的顶部内边距一致

## Non-Goals (Out of Scope)
- 不修改导航栏的样式和高度
- 不修改页面内容布局
- 不添加新功能

## Background & Context
- 导航栏使用 `h-16`（64px）固定高度，`fixed top-0` 固定定位
- 当前内容区域使用 `pt-16`（64px）顶部内边距
- 用户反馈内容仍然被遮挡，需要更大的内边距
- 项目记忆中明确要求使用 `pt-20` 作为统一的顶部内边距

## Functional Requirements
- **FR-1**: Layout 组件的 main 内容区域使用 `pt-20` 顶部内边距
- **FR-2**: 所有页面（首页、项目页、关于页）共享相同的顶部内边距

## Non-Functional Requirements
- **NFR-1**: TypeScript 编译必须通过
- **NFR-2**: 代码风格保持一致

## Constraints
- **Technical**: React 19 + TypeScript + Tailwind CSS
- **Dependencies**: 依赖现有 Layout 组件结构

## Assumptions
- 所有页面都通过 Layout 组件统一管理布局
- 增加 16px 的内边距（从 64px 到 80px）足以解决遮挡问题

## Acceptance Criteria

### AC-1: Layout 组件使用 pt-20 内边距
- **Given**: Layout.tsx 文件存在
- **When**: 查看 main 标签的 className
- **Then**: main 标签必须包含 `pt-20` 类，而不是 `pt-16`
- **Verification**: `programmatic`

### AC-2: 首页内容完全可见
- **Given**: 用户访问首页
- **When**: 页面加载完成
- **Then**: 页面顶部标题"数据作品集"和"导入数据"按钮完全可见，不被导航栏遮挡
- **Verification**: `human-judgment`

### AC-3: 项目页内容完全可见
- **Given**: 用户访问项目列表页
- **When**: 页面加载完成
- **Then**: 页面顶部标题"项目列表"完全可见，不被导航栏遮挡
- **Verification**: `human-judgment`

### AC-4: 关于页内容完全可见
- **Given**: 用户访问关于页
- **When**: 页面加载完成
- **Then**: 页面顶部标题"关于数据作品集"完全可见，不被导航栏遮挡
- **Verification**: `human-judgment`

### AC-5: TypeScript 编译通过
- **Given**: 修改完成后
- **When**: 运行 `npx tsc --noEmit`
- **Then**: 无 TypeScript 错误，编译成功
- **Verification**: `programmatic`

## Open Questions
- [ ] pt-20 是否足够？如果仍然遮挡，可能需要进一步增加
