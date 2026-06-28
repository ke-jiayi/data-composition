# 首页导入数据功能 - Product Requirement Document

## Overview
- **Summary**: 在 HomePage 页面实现一个完整的文件导入功能，用户点击"导入数据"按钮后弹出文件选择框，选择 CSV 或 Excel 文件后解析为 JSON 数组，保存到组件 state 中，并在页面上以表格形式展示解析结果。
- **Purpose**: 提供一个直接在首页预览导入数据的功能，让用户能够快速查看文件内容。
- **Target Users**: 数据分析师、网站用户

## Goals
- 实现 handleImport 函数处理文件导入逻辑
- 支持 CSV 和 Excel (.xlsx) 文件格式
- 使用 papaparse 解析 CSV，xlsx 库解析 Excel
- 解析成功后在页面用表格展示数据
- 将"导入数据"按钮的 onClick 绑定到 handleImport

## Non-Goals (Out of Scope)
- 不涉及数据库持久化存储（仅保存在组件 state 中）
- 不涉及导入模态框（ImportModal）的修改
- 不支持 JSON 文件格式（用户明确要求 CSV 和 Excel）
- 不涉及数据清洗和图表功能

## Background & Context
- 项目已有 papaparse 和 xlsx 依赖安装在 package.json 中
- 已有 utils/fileParser.ts 提供文件解析工具函数
- 当前首页的"导入数据"按钮使用 ImportModal 模态框
- 项目使用 React 19 + TypeScript + Vite + Tailwind CSS

## Functional Requirements
- **FR-1**: 点击"导入数据"按钮触发文件选择对话框
- **FR-2**: 文件选择框仅接受 .csv 和 .xlsx 文件
- **FR-3**: 使用 papaparse 库解析 CSV 文件
- **FR-4**: 使用 xlsx 库解析 Excel (.xlsx) 文件
- **FR-5**: 解析成功后将数据保存到组件 state 中
- **FR-6**: 在页面上用表格展示解析后的数据
- **FR-7**: 显示文件名和数据行数等基本信息
- **FR-8**: 处理解析错误，显示错误提示

## Non-Functional Requirements
- **NFR-1**: 解析过程中显示加载状态
- **NFR-2**: 表格支持横向滚动（数据列多时）
- **NFR-3**: 代码符合 TypeScript 类型规范
- **NFR-4**: 不引入新的依赖（papaparse 和 xlsx 已存在）

## Constraints
- **Technical**: React 19, TypeScript, Tailwind CSS, papaparse, xlsx
- **Business**: 仅在 HomePage 组件内实现，不修改其他组件
- **Dependencies**: papaparse ^5.5.4, xlsx ^0.18.5

## Assumptions
- 用户只需要预览数据，不需要持久化存储
- 表格最多展示前 N 行（如前 100 行），避免大文件性能问题
- 可以复用现有的 DataTable 组件或简单表格实现

## Acceptance Criteria

### AC-1: 文件选择对话框
- **Given**: 用户在首页
- **When**: 用户点击"导入数据"按钮
- **Then**: 弹出文件选择对话框，只允许选择 .csv 和 .xlsx 文件
- **Verification**: `programmatic`

### AC-2: CSV 文件解析
- **Given**: 用户选择了一个有效的 CSV 文件
- **When**: 文件被选中
- **Then**: 使用 papaparse 解析文件，解析结果为 JSON 数组格式
- **Verification**: `programmatic`

### AC-3: Excel 文件解析
- **Given**: 用户选择了一个有效的 .xlsx 文件
- **When**: 文件被选中
- **Then**: 使用 xlsx 库解析文件，解析结果为 JSON 数组格式
- **Verification**: `programmatic`

### AC-4: 数据表格展示
- **Given**: 文件解析成功
- **When**: 解析完成
- **Then**: 页面显示数据表格，包含列名和数据行
- **Verification**: `human-judgment`

### AC-5: 按钮绑定
- **Given**: 用户在首页
- **When**: 点击"导入数据"按钮
- **Then**: 触发 handleImport 函数，打开文件选择框
- **Verification**: `programmatic`

### AC-6: 错误处理
- **Given**: 用户选择了无效文件或解析失败
- **When**: 解析过程中发生错误
- **Then**: 显示友好的错误提示信息
- **Verification**: `human-judgment`

### AC-7: 加载状态
- **Given**: 文件正在解析中
- **When**: 解析过程未完成
- **Then**: 显示加载状态提示
- **Verification**: `human-judgment`

## Open Questions
- [ ] 表格是否需要分页？（默认展示前 100 行即可）
- [ ] 是否需要保留原来的 ImportModal 导入功能？（建议保留，两个入口并存）
