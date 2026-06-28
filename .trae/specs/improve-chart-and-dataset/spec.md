# 图表区域优化与多数据集管理 - Product Requirement Document

## Overview
- **Summary**: 优化图表区域布局，支持折叠/展开功能；改进导入功能，实现多数据集管理，每次导入的数据作为独立数据集存储。
- **Purpose**: 解决图表区域占位过大和导入数据覆盖问题，提升用户体验。
- **Target Users**: 数据分析师、网站用户

## Goals
- 优化 ChartPanel 图表区域，支持折叠/展开，数据为空时隐藏或显示提示
- 实现多数据集管理，导入数据追加到列表而不是覆盖
- 在首页展示所有数据集卡片，支持查看和删除

## Non-Goals (Out of Scope)
- 不修改数据库 schema 结构
- 不实现数据集合并功能
- 不实现图表拖拽调整大小

## Background & Context
- 项目使用 IndexedDB 存储数据集，已有完整的 CRUD 操作
- ChartPanel 当前高度默认 300px，无折叠功能
- 首页已有数据集卡片展示功能
- HomePage 的 handleFileChange 目前只更新 state，未保存到数据库

## Functional Requirements
- **FR-1**: ChartPanel 支持折叠/展开切换
- **FR-2**: ChartPanel 数据为空时自动隐藏或显示简洁提示
- **FR-3**: 导入数据时自动保存为新数据集到数据库
- **FR-4**: 导入成功后刷新数据集列表
- **FR-5**: 首页展示所有已导入的数据集卡片
- **FR-6**: 用户可删除单个数据集

## Non-Functional Requirements
- **NFR-1**: 图表区域折叠后不影响页面布局
- **NFR-2**: 数据集存储在 IndexedDB 中，持久化保存
- **NFR-3**: 代码符合 TypeScript 类型规范

## Constraints
- **Technical**: React 19, TypeScript, Tailwind CSS, IndexedDB (idb)
- **Business**: 保持原有导入功能流程，仅改为追加模式

## Assumptions
- 用户希望导入数据后能永久保存
- 用户希望能够管理多个数据集

## Acceptance Criteria

### AC-1: ChartPanel 折叠/展开
- **Given**: 用户在项目详情页的图表 Tab
- **When**: 用户点击折叠/展开按钮
- **Then**: 图表区域切换显示/隐藏状态
- **Verification**: `human-judgment`

### AC-2: 空数据时图表区域优化
- **Given**: 图表数据为空或未生成
- **When**: 用户进入图表 Tab
- **Then**: 图表区域显示简洁提示或自动隐藏
- **Verification**: `human-judgment`

### AC-3: 导入数据追加模式
- **Given**: 用户已导入过数据集
- **When**: 用户导入新的数据文件
- **Then**: 新数据作为独立数据集添加到列表，不影响已有数据集
- **Verification**: `programmatic`

### AC-4: 数据集列表展示
- **Given**: 用户已导入多个数据集
- **When**: 用户访问首页
- **Then**: 首页展示所有数据集卡片，显示名称、行数、导入时间
- **Verification**: `human-judgment`

### AC-5: 数据集删除
- **Given**: 用户在首页
- **When**: 用户点击数据集卡片的删除按钮
- **Then**: 数据集被删除，列表刷新
- **Verification**: `programmatic`

## Open Questions
- [ ] ChartPanel 的折叠状态是否需要持久化？（默认不需要）
- [ ] 是否需要在导入成功后自动跳转到新数据集详情页？（默认不需要）
