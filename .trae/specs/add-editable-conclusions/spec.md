# 可编辑分析结论 Spec

## Why
用户希望直接在页面上编辑分析结论内容，无需通过 TRAE 改代码。当前结论是静态硬编码的。

## What Changes
- 在 Dataset 接口添加 `conclusions?: string[]` 字段
- 将"分析结论"Tab 的静态卡片替换为可编辑卡片
- 支持编辑、保存、删除、添加结论
- 结论数据通过 updateDataset 保存到 IndexedDB

## Impact
- Affected code: src/utils/db.ts, src/pages/ProjectDetailPage.tsx

## ADDED Requirements

### Requirement: 可编辑结论
系统 SHALL 允许用户直接编辑每条结论卡片的内容。

### Requirement: 结论保存
系统 SHALL 提供每条卡片的保存按钮，将结论保存到 IndexedDB。

### Requirement: 结论删除
系统 SHALL 允许用户删除任意一条结论。

### Requirement: 结论添加
系统 SHALL 提供"添加新结论"按钮，新增空卡片。

### Requirement: 结论加载
系统 SHALL 在页面加载时自动加载上次保存的结论，无保存数据时显示默认 3 条。

## MODIFIED Requirements

### Requirement: Dataset 接口
Dataset 接口新增 `conclusions?: string[]` 可选字段。
