# 数据清洗Tab添加代码展示功能 - 产品需求文档

## Overview
- **Summary**: 在数据作品集网站的详情页（ProjectDetailPage）的"数据清洗"Tab 中添加一个可折叠的代码块，展示 Python 数据清洗与可视化示例代码
- **Purpose**: 展示数据清洗流程的代码实现，帮助用户理解数据处理逻辑
- **Target Users**: 数据分析师、数据科学家

## Goals
- [ ] 在"数据清洗"Tab 中添加可折叠的代码展示区域
- [ ] 代码块标题为"📊 数据清洗与可视化代码"
- [ ] 默认状态为收起
- [ ] 点击可展开/收起
- [ ] 展示完整的 Python pandas + matplotlib 数据清洗与可视化代码

## Non-Goals (Out of Scope)
- 不修改 DataCleaning 组件的现有功能
- 不添加代码编辑功能
- 不添加代码执行功能

## Background & Context
- 用户希望展示 Jupyter 中运行的 Python 代码
- 代码与城市居民消费价格指数趋势图相关
- 使用 pandas 进行数据清洗，matplotlib 进行可视化

## Functional Requirements
- **FR-1**: 添加代码块展开/收起状态管理
- **FR-2**: 编写 Python 数据清洗与可视化示例代码
- **FR-3**: 使用可折叠 UI 展示代码，默认收起
- **FR-4**: 代码使用深色背景和等宽字体显示

## Non-Functional Requirements
- **NFR-1**: TypeScript 编译必须通过
- **NFR-2**: 代码块样式美观，可读性好

## Constraints
- **Technical**: React 19 + TypeScript + Tailwind CSS
- **Dependencies**: 不添加新依赖

## Acceptance Criteria

### AC-1: 代码块可折叠
- **Given**: 用户访问项目详情页并切换到"数据清洗"Tab
- **When**: 查看页面内容
- **Then**: 显示标题"📊 数据清洗与可视化代码"的可折叠区域，默认收起状态
- **Verification**: `human-judgment`

### AC-2: 点击展开/收起
- **Given**: 代码块处于收起状态
- **When**: 点击标题
- **Then**: 代码块展开显示完整 Python 代码
- **Verification**: `human-judgment`

### AC-3: 代码样式
- **Given**: 代码块已展开
- **When**: 查看代码显示样式
- **Then**: 使用深色背景、等宽字体、代码高亮样式
- **Verification**: `human-judgment`

### AC-4: TypeScript 编译通过
- **Given**: 修改完成后
- **When**: 运行 `npx tsc --noEmit`
- **Then**: 无 TypeScript 错误
- **Verification**: `programmatic`

## Open Questions
- [ ] Python 代码内容需要根据用户实际 Jupyter notebook 内容确定
