# ProjectDetailPage 白天模式紫色→青蓝色 PRD

## Overview
- **Summary**: 将 ProjectDetailPage 白天模式下所有紫色系元素（#7B4B9E/#6C3B9A/#A78BFA）替换为青蓝色系（#00B4D8/#0096B0/#48CAE4），深色模式保持不变。
- **Purpose**: 统一白天模式配色为冷冽青蓝科技感，去除紫色霓虹元素在浅色背景上的突兀感。
- **Target Users**: 白天模式访问详情页的用户。

## Goals
- 表格表头 `bg-[#7B4B9E]` 白天模式改为 `#00B4D8`
- DataTable 搜索框紫色边框白天模式改为浅蓝灰
- 所有紫色内联色值（#7B4B9E/#6C3B9A/#A78BFA）在白天模式替换为对应青蓝色
- 深色模式完全不变

## Non-Goals
- 不改 HomePage、WelcomePage
- 不改功能逻辑、布局形状
- 不改深色模式现有紫色

## Background & Context
- index.css L502 存在全局规则 `html.light .bg-[#7B4B9E] { background-color: #7B4B9E !important; }` 强制表头保留紫色，需要在 ProjectDetailPage 作用域内覆盖
- ProjectDetailPage 主容器缺少 ID，通过给最外层容器新增 ID 来限定作用域
- DataTable.tsx L146 使用 `border-[#7B4B9E]` 紫色边框，也需作用域覆盖

## Functional Requirements
- **FR-1**: 表格表头白天模式使用青蓝色背景
- **FR-2**: DataTable 搜索框紫色边框白天模式改为浅蓝灰边框
- **FR-3**: 所有紫色内联色值在详情页白天模式下替换为对应青蓝色
- **FR-4**: 深色模式下所有紫色元素保持不变

## Non-Functional Requirements
- **NFR-1**: 作用域精确，只影响详情页白天模式
- **NFR-2**: 不改变功能、布局、组件形状
- **NFR-3**: 切换主题时有平滑过渡

## Constraints
- **Technical**: React + Tailwind CSS v4 + Vite；使用 CSS 选择器覆盖而非修改组件本身
- **Dependencies**: 不新增依赖

## Assumptions
- 详情页页面可通过新增 `<div id="detail-page">` 容器来限定作用域
- 侧边栏导航等全局元素不受详情页内部 ID 影响

## Acceptance Criteria

### AC-1: 表格表头青蓝色（白天）
- **Given**: 白天模式打开详情页并进入"数据表格"Tab
- **When**: 渲染表格
- **Then**: 表头背景 `#00B4D8`（替换原紫色 `#7B4B9E`），文字仍为白色
- **Verification**: `programmatic`

### AC-2: DataTable 搜索框边框改浅蓝灰
- **Given**: 白天模式详情页数据表格
- **When**: 渲染搜索框
- **Then**: 边框 `#DCE8F2`（替换原紫色 `#7B4B9E`）
- **Verification**: `programmatic`

### AC-3: 深色模式不变
- **Given**: 黑夜模式
- **When**: 访问详情页所有区域
- **Then**: 表头、边框等所有紫色元素保持不变（#7B4B9E、#6C3B9A、#A78BFA）
- **Verification**: `programmatic`

### AC-4: 作用域精确不影响其他页面
- **Given**: 白天模式
- **When**: 访问非详情页页面（HomePage/WelcomePage）
- **Then**: 样式不变，不被详情页覆盖规则影响
- **Verification**: `programmatic`

## Open Questions
- 无
