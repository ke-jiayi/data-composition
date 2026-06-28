# 启用首页导入按钮功能 - 产品需求文档

## Overview
- **Summary**: 将 HomePage 中的"导入数据"按钮连接到现有的文件导入逻辑，使用已有的 useDB hook，实现真正的导入功能。
- **Purpose**: 让用户能够通过首页导入 CSV 或 Excel 文件，数据保存到 IndexedDB 后刷新数据集列表。
- **Target Users**: 使用数据作品集网站的用户，需要导入和管理数据集。

## Goals
- 点击"导入数据"按钮弹出文件选择对话框
- 支持选择 CSV 或 Excel (.xlsx) 文件
- 导入成功后数据保存到 IndexedDB
- 刷新数据集列表和统计数据
- 只修改 HomePage.tsx 文件

## Non-Goals (Out of Scope)
- 不修改其他文件（如 useDB hook、fileParser 等）
- 不添加 JSON 文件支持（用户只提到 CSV 和 Excel）
- 不创建导入预览或确认流程（简化流程，直接导入）
- 不修改 ImportModal 组件

## Background & Context
- 当前 HomePage.tsx 是纯 UI 骨架，导入按钮不绑定功能
- 项目已有完整的导入逻辑（useDB hook、parseFile 函数、ImportModal 组件）
- 需要复用现有代码实现导入功能

## Functional Requirements
- **FR-1**: 点击"导入数据"按钮弹出文件选择对话框
- **FR-2**: 文件选择框只接受 .csv 和 .xlsx 文件
- **FR-3**: 使用 papaparse 解析 CSV 文件，使用 xlsx 库解析 Excel 文件
- **FR-4**: 解析成功后调用 createDataset 创建数据集记录
- **FR-5**: 调用 saveData 将数据保存到 IndexedDB
- **FR-6**: 导入成功后刷新数据集列表（调用 getAllDatasets）
- **FR-7**: 导入成功后更新统计卡片数据（数据集数量、总行数、最近更新时间）
- **FR-8**: 导入过程中显示加载状态
- **FR-9**: 导入失败时显示错误提示

## Non-Functional Requirements
- **NFR-1**: 使用 Tailwind CSS 进行样式设计
- **NFR-2**: 代码符合 TypeScript 类型检查要求
- **NFR-3**: 只修改 HomePage.tsx，不修改其他文件

## Constraints
- **Technical**: React 19 + TypeScript，Tailwind CSS，IndexedDB（useDB hook）
- **Dependencies**: papaparse（CSV 解析）、xlsx（Excel 解析）、parseFile 函数
- **Scope**: 仅修改 HomePage.tsx 文件

## Assumptions
- 用户希望简化导入流程，不需要预览确认步骤
- 导入后数据集列表会自动刷新
- 统计卡片会实时更新显示真实数据

## Acceptance Criteria

### AC-1: 点击按钮弹出文件选择框
- **Given**: 用户在首页点击"导入数据"按钮
- **When**: 按钮被点击
- **Then**: 弹出文件选择对话框，只接受 .csv 和 .xlsx 文件
- **Verification**: `human-judgment`

### AC-2: 文件解析成功
- **Given**: 用户选择了有效的 CSV 或 Excel 文件
- **When**: 文件被选择
- **Then**: 文件被正确解析，数据被提取
- **Verification**: `programmatic`

### AC-3: 数据保存到 IndexedDB
- **Given**: 文件解析成功
- **When**: 解析完成
- **Then**: 数据集记录被创建，数据被保存到 IndexedDB
- **Verification**: `programmatic`

### AC-4: 数据集列表刷新
- **Given**: 导入成功
- **When**: 数据保存完成
- **Then**: 数据集列表显示新导入的数据集
- **Verification**: `human-judgment`

### AC-5: 统计数据更新
- **Given**: 导入成功
- **When**: 数据保存完成
- **Then**: 统计卡片显示真实数据（数据集数量、总行数、最近更新时间）
- **Verification**: `human-judgment`

### AC-6: TypeScript 编译通过
- **Given**: 代码修改完成
- **When**: 运行 TypeScript 类型检查
- **Then**: 无类型错误
- **Verification**: `programmatic`

## Open Questions
- [ ] 导入成功后是否需要显示成功提示？