# 数据集卡片删除功能 Spec

## Why
用户需要删除不再需要的数据集，当前首页数据集卡片没有删除入口。

## What Changes
- 在 HomePage 每个数据集卡片上添加删除按钮（垃圾桶图标）
- 点击删除弹出确认对话框
- 确认后调用 useDB.deleteDataset 删除数据
- 删除后列表自动刷新

## Impact
- Affected code: src/pages/HomePage.tsx

## ADDED Requirements

### Requirement: 数据集删除
系统 SHALL 在每个数据集卡片上提供删除按钮，点击后弹出确认对话框，确认后从 IndexedDB 删除该数据集。

#### Scenario: 删除数据集
- **WHEN** 用户点击卡片上的删除按钮
- **THEN** 弹出确认对话框"确定要删除 [名称] 吗？此操作不可撤销。"
- **WHEN** 用户点击确认
- **THEN** 调用 deleteDataset 删除数据，列表刷新，卡片消失
