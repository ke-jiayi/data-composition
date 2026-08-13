# 可编辑代码编辑器 Spec

## Why
用户希望直接在页面上修改 Python 代码并保存，无需通过 TRAE 改代码。当前代码展示区是只读的。

## What Changes
- 安装 react-simple-code-editor + prismjs（轻量级 Python 语法高亮编辑器）
- 在 Dataset 接口添加 `code?: string` 字段
- 在 ProjectDetailPage 数据清洗 Tab 中用可编辑编辑器替换只读代码块
- 添加"保存修改"按钮，调用 updateDataset 保存代码
- 页面加载时优先读取 dataset.code，无则用默认 PYTHON_CODE

## Impact
- Affected code: src/utils/db.ts, src/pages/ProjectDetailPage.tsx, package.json

## ADDED Requirements

### Requirement: 可编辑代码编辑器
系统 SHALL 在数据清洗 Tab 中提供可编辑的 Python 代码编辑器，支持语法高亮。

### Requirement: 代码保存
系统 SHALL 提供保存按钮，将编辑器中的代码保存到 IndexedDB（与数据集关联）。

### Requirement: 代码加载
系统 SHALL 在页面加载时自动加载上次保存的代码版本。

## MODIFIED Requirements

### Requirement: Dataset 接口
Dataset 接口新增 `code?: string` 可选字段，用于存储用户编辑的 Python 代码。
