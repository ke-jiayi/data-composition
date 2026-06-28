# 恢复首页简化版本 - 产品需求文档

## Overview
- **Summary**: 将数据作品集网站的首页（HomePage）恢复到简化版本，仅显示"我的数据集"列表和"导入数据"按钮，移除所有额外的 UI 元素（如统计卡片、搜索排序、动画区域等）。
- **Purpose**: 简化首页界面，聚焦核心功能，提供清晰的数据管理入口。
- **Target Users**: 使用数据作品集网站的用户，需要快速访问和管理数据集。

## Goals
- 将 HomePage.tsx 恢复到仅显示数据集列表和导入按钮的简化版本
- 保留数据集导入功能（支持 CSV 和 Excel 文件）
- 保留数据集卡片点击跳转详情页功能
- 确保代码通过 TypeScript 类型检查

## Non-Goals (Out of Scope)
- 不添加统计卡片、搜索排序、动画区域等额外功能
- 不修改 ProjectDetailPage 或其他页面
- 不添加新的依赖包

## Background & Context
- 当前首页已经经历多次修改，包括添加统计卡片、搜索排序、Awwwards 风格设计等
- 用户希望恢复到最基础的版本，仅包含数据集列表和导入按钮
- 当前代码已经是相对简化的版本，需要验证是否符合用户预期

## Functional Requirements
- **FR-1**: 页面顶部显示"我的数据集"标题和数据集数量统计
- **FR-2**: 页面顶部右侧显示"导入数据"按钮，点击可弹出文件选择框
- **FR-3**: 支持导入 CSV 和 Excel (.xlsx) 文件，解析后保存到数据库
- **FR-4**: 数据集列表以卡片形式展示，每张卡片包含数据集名称、数据行数和导入时间
- **FR-5**: 点击数据集卡片可跳转到该数据集的详情页（ProjectDetailPage）
- **FR-6**: 无数据集时显示空状态提示，引导用户导入数据
- **FR-7**: 导入过程中显示加载状态，导入完成后显示成功或失败提示

## Non-Functional Requirements
- **NFR-1**: 使用 Tailwind CSS 进行样式设计，保持简洁专业风格
- **NFR-2**: 代码符合 TypeScript 类型检查要求，无编译错误
- **NFR-3**: 页面响应式布局，适配不同屏幕尺寸

## Constraints
- **Technical**: React 19 + TypeScript，Tailwind CSS，IndexedDB（useDB hook）
- **Dependencies**: papaparse（CSV 解析）、xlsx（Excel 解析）、framer-motion（如存在）

## Assumptions
- 用户希望保留导入功能和数据集列表展示功能
- 当前代码中的导入逻辑已经正确实现
- 数据集按导入时间倒序排列（已在 useDB hook 中处理）

## Acceptance Criteria

### AC-1: 首页显示简化布局
- **Given**: 用户访问首页
- **When**: 页面加载完成
- **Then**: 页面仅显示"我的数据集"标题、数据集数量、导入按钮和数据集列表
- **Verification**: `human-judgment`
- **Notes**: 页面不应包含统计卡片、搜索排序、动画区域等额外元素

### AC-2: 导入数据功能正常
- **Given**: 用户点击"导入数据"按钮
- **When**: 选择 CSV 或 Excel 文件并上传
- **Then**: 文件成功解析并保存到数据库，数据集列表更新
- **Verification**: `programmatic`
- **Notes**: 需要验证文件选择、解析和保存流程

### AC-3: 数据集卡片展示正确
- **Given**: 已导入至少一个数据集
- **When**: 查看数据集列表
- **Then**: 每张卡片显示数据集名称、数据行数和导入时间，点击可跳转详情页
- **Verification**: `human-judgment`

### AC-4: 空状态显示正确
- **Given**: 未导入任何数据集
- **When**: 访问首页
- **Then**: 显示空状态提示，包含"暂无数据集"信息和导入按钮
- **Verification**: `human-judgment`

### AC-5: TypeScript 编译通过
- **Given**: 代码修改完成
- **When**: 运行 TypeScript 类型检查
- **Then**: 无类型错误
- **Verification**: `programmatic`

## Open Questions
- [ ] 当前版本是否已经符合用户要求的"只显示数据集列表和导入按钮"的简化版本？
