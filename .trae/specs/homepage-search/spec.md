# 首页数据集列表搜索功能 - 产品需求文档

## Overview
- **Summary**: 在 HomePage 的数据集列表上方添加实时搜索功能，用户可以通过关键词过滤数据集。
- **Purpose**: 让用户能够快速找到特定的数据集，提升用户体验。
- **Target Users**: 使用数据作品集网站的用户，需要查找特定数据集。

## Goals
- 添加搜索输入框，占位文字为"请输入你要查找的内容"
- 实现实时过滤，根据名称或文件名匹配
- 搜索不区分大小写
- 没有匹配结果时显示"未找到匹配的数据集"

## Non-Goals (Out of Scope)
- 不实现排序功能（排序功能可能在后续添加）
- 不实现高级搜索（如正则表达式、日期范围等）
- 不修改其他页面

## Background & Context
- HomePage 已有完整的数据集列表展示功能
- 需要添加搜索功能提升数据集查找效率

## Functional Requirements
- **FR-1**: 搜索输入框位于统计卡片下方、数据集列表上方
- **FR-2**: 输入框占位文字为"请输入你要查找的内容"
- **FR-3**: 实时过滤数据集列表，只显示名称或文件名中包含关键词的数据集
- **FR-4**: 搜索不区分大小写（如搜索"销售"可匹配"销售数据"、"销售报表"等）
- **FR-5**: 没有匹配结果时显示"未找到匹配的数据集"

## Non-Functional Requirements
- **NFR-1**: 搜索响应即时，无需点击按钮
- **NFR-2**: 代码符合 TypeScript 类型检查要求
- **NFR-3**: 使用 Tailwind CSS 进行样式设计

## Constraints
- **Technical**: React 19 + TypeScript，Tailwind CSS
- **Scope**: 仅修改 HomePage.tsx 文件

## Assumptions
- 用户希望简化搜索功能，不需要复杂选项
- 搜索基于客户端过滤，数据已加载到组件状态

## Acceptance Criteria

### AC-1: 搜索框显示正确
- **Given**: 用户访问首页
- **When**: 页面加载完成
- **Then**: 搜索输入框显示在统计卡片下方、数据集列表上方，占位文字为"请输入你要查找的内容"
- **Verification**: `human-judgment`

### AC-2: 实时搜索功能
- **Given**: 用户在搜索框输入关键词
- **When**: 用户输入时
- **Then**: 数据集列表实时更新，只显示匹配的数据集
- **Verification**: `human-judgment`

### AC-3: 大小写不敏感
- **Given**: 用户输入"ABC"或"abc"
- **When**: 搜索时
- **Then**: 结果相同，都能匹配"ABC"或"abc"开头的数据集
- **Verification**: `programmatic`

### AC-4: 名称和文件名匹配
- **Given**: 数据集名称为"销售数据"，文件名为"sales.csv"
- **When**: 用户搜索"销售"或"sales"
- **Then**: 该数据集显示在结果中
- **Verification**: `human-judgment`

### AC-5: 无匹配结果显示
- **Given**: 用户搜索一个不存在的关键词
- **When**: 没有数据集匹配
- **Then**: 显示"未找到匹配的数据集"
- **Verification**: `human-judgment`

### AC-6: TypeScript 编译通过
- **Given**: 代码修改完成
- **When**: 运行 TypeScript 类型检查
- **Then**: 无类型错误
- **Verification**: `programmatic`

## Open Questions
- 无
