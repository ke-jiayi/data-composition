# 首页 UI 布局骨架 - 产品需求文档

## Overview
- **Summary**: 修改 HomePage.tsx，实现一个纯 UI 布局骨架，不包含任何功能逻辑，所有数据使用硬编码的静态值。
- **Purpose**: 快速搭建首页 UI 结构，便于后续逐步添加功能逻辑。
- **Target Users**: 开发团队，用于快速预览首页布局效果。

## Goals
- 创建顶部区域：左侧显示"📊 数据作品集"，右侧显示当前日期和"导入数据"按钮
- 创建三个统计卡片：总数据集数量、总数据行数、最近更新时间（均为硬编码值）
- 创建数据集列表区域：显示 2-3 个示例卡片，每个卡片显示名称和行数
- 底部留空，不加任何内容
- 使用 Tailwind CSS 进行样式设计

## Non-Goals (Out of Scope)
- 不实现任何功能逻辑（搜索、排序、跳转、动画等）
- 不修改其他文件
- 不添加任何交互事件（点击、hover 等）
- 不使用真实数据或数据库连接

## Background & Context
- 当前 HomePage.tsx 包含完整的导入功能和数据集列表展示逻辑
- 用户希望先创建纯 UI 骨架，后续再逐步添加功能
- 需要使用 Tailwind CSS 进行样式设计

## Functional Requirements
- **FR-1**: 顶部左侧显示"📊 数据作品集"标题
- **FR-2**: 顶部右侧显示当前日期（格式：当地时间：xxxx-xx-xx）
- **FR-3**: 顶部右侧显示"导入数据"按钮（仅 UI，不绑定功能）
- **FR-4**: 中间区域显示三个统计卡片（水平排列）
  - 卡片 1：总数据集数量（硬编码为"0 个数据集"）
  - 卡片 2：总数据行数（硬编码为"0 行"）
  - 卡片 3：最近更新时间（硬编码为"暂无数据"）
- **FR-5**: 统计卡片下方显示数据集列表（网格布局）
  - 每个卡片显示名称和行数
  - 使用示例数据（2-3 个示例卡片）
- **FR-6**: 底部留空，不加任何内容

## Non-Functional Requirements
- **NFR-1**: 使用 Tailwind CSS 进行样式设计
- **NFR-2**: 保持代码简洁，不包含任何功能逻辑
- **NFR-3**: 响应式布局，适配不同屏幕尺寸

## Constraints
- **Technical**: React 19 + TypeScript，Tailwind CSS
- **Dependencies**: 仅使用现有依赖，不添加新包
- **Scope**: 仅修改 HomePage.tsx 文件

## Assumptions
- 用户将在后续步骤中添加功能逻辑
- 当前代码中的 Layout 组件保持不变
- 不需要实现任何交互功能

## Acceptance Criteria

### AC-1: 顶部区域显示正确
- **Given**: 用户访问首页
- **When**: 页面加载完成
- **Then**: 顶部左侧显示"📊 数据作品集"，右侧显示当前日期和"导入数据"按钮
- **Verification**: `human-judgment`

### AC-2: 统计卡片显示正确
- **Given**: 用户访问首页
- **When**: 页面加载完成
- **Then**: 显示三个水平排列的统计卡片，分别显示"0 个数据集"、"0 行"、"暂无数据"
- **Verification**: `human-judgment`

### AC-3: 数据集列表显示正确
- **Given**: 用户访问首页
- **When**: 页面加载完成
- **Then**: 显示 2-3 个示例数据集卡片，每个卡片显示名称和行数
- **Verification**: `human-judgment`

### AC-4: 无功能逻辑
- **Given**: 用户查看代码
- **When**: 检查 HomePage.tsx
- **Then**: 代码中不包含任何功能逻辑（搜索、排序、跳转、动画等）
- **Verification**: `human-judgment`

### AC-5: TypeScript 编译通过
- **Given**: 代码修改完成
- **When**: 运行 TypeScript 类型检查
- **Then**: 无类型错误
- **Verification**: `programmatic`

## Open Questions
- [ ] 用户是否希望保留 Layout 组件包裹整个页面？
