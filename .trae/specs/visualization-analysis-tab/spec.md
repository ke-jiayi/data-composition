# 详情页可视化分析功能 - 产品需求文档

## Overview
- **Summary**: 在数据作品集网站的详情页（ProjectDetailPage）中增加一个"可视化分析"Tab，实现类似 Power BI 的交互式图表功能，支持图表类型选择、字段配置、聚合方式、实时渲染、点击联动和数据导出
- **Purpose**: 为用户提供直观的数据可视化分析能力，帮助用户快速理解和分析数据集
- **Target Users**: 数据分析师、业务人员

## Goals
- [ ] 在详情页添加"可视化分析"Tab
- [ ] 支持图表类型选择（柱状图、折线图、饼图）
- [ ] 支持 X 轴和 Y 轴字段选择
- [ ] 支持聚合方式选择（求和、平均值、计数）
- [ ] 图表实时渲染（配置变化时自动更新）
- [ ] 图表高度不超过 280px
- [ ] 支持悬停显示数值
- [ ] 点击图表显示对应数据明细
- [ ] 支持导出为 PNG 图片
- [ ] 数据源优先使用清洗后数据，没有则使用原始数据

## Non-Goals (Out of Scope)
- 不添加多图表联动功能（本轮仅实现基础交互）
- 不修改其他页面的功能
- 不更改图表库（继续使用 ECharts）

## Background & Context
- 项目使用 ECharts (echarts-for-react) 作为图表库
- 已有 ChartPanel 组件实现了基础图表功能
- ChartPanel 从 `../../types` 导入 DataRow，但实际类型定义在 `../../utils/db`
- 需要增强 ChartPanel 支持聚合方式、实时渲染和点击联动
- TabNavigation 当前只有 'table' 和 'clean' 两个 Tab

## Functional Requirements
- **FR-1**: TabNavigation 添加 'chart' 类型和"可视化分析"Tab
- **FR-2**: ChartPanel 添加聚合方式选择（求和、平均值、计数）
- **FR-3**: ChartPanel 配置变化时自动渲染，无需点击"生成图表"按钮
- **FR-4**: ChartPanel 支持点击图表显示对应数据明细
- **FR-5**: 图表高度不超过 280px
- **FR-6**: 图表支持悬停显示数值
- **FR-7**: 图表支持导出为 PNG
- **FR-8**: 数据源优先使用 cleanedData，为空时使用 rawData

## Non-Functional Requirements
- **NFR-1**: TypeScript 编译必须通过
- **NFR-2**: 图表渲染性能良好，无明显卡顿
- **NFR-3**: 布局紧凑，不浪费空间

## Constraints
- **Technical**: React 19 + TypeScript + Tailwind CSS + ECharts
- **Dependencies**: 使用现有 ECharts 库

## Acceptance Criteria

### AC-1: 可视化分析 Tab 可访问
- **Given**: 用户访问项目详情页
- **When**: 查看 Tab 导航
- **Then**: 显示"可视化分析"Tab，点击可切换到图表视图
- **Verification**: `programmatic`

### AC-2: 图表配置完整
- **Given**: 可视化分析 Tab 已激活
- **When**: 查看图表配置面板
- **Then**: 包含图表类型选择、X轴字段、Y轴字段、聚合方式四个配置项
- **Verification**: `human-judgment`

### AC-3: 聚合方式可用
- **Given**: 用户选择了图表类型和字段
- **When**: 查看聚合方式选项
- **Then**: 可以选择"求和"、"平均值"、"计数"三种聚合方式
- **Verification**: `programmatic`

### AC-4: 实时渲染
- **Given**: 用户已选择配置
- **When**: 用户修改配置（图表类型、字段、聚合方式）
- **Then**: 图表自动更新，无需点击生成按钮
- **Verification**: `human-judgment`

### AC-5: 图表高度受限
- **Given**: 图表已渲染
- **When**: 检查图表高度
- **Then**: 图表高度不超过 280px
- **Verification**: `programmatic`

### AC-6: 悬停显示数值
- **Given**: 图表已渲染
- **When**: 鼠标悬停在图表元素上
- **Then**: 显示包含数值的提示框
- **Verification**: `human-judgment`

### AC-7: 点击显示数据明细
- **Given**: 图表已渲染
- **When**: 点击图表中的柱子或扇区
- **Then**: 下方显示对应的数据明细
- **Verification**: `human-judgment`

### AC-8: 导出 PNG
- **Given**: 图表已渲染
- **When**: 点击导出按钮
- **Then**: 下载 PNG 图片
- **Verification**: `programmatic`

### AC-9: 数据源优先级
- **Given**: 数据集有清洗后数据和原始数据
- **When**: 进入可视化分析 Tab
- **Then**: 使用清洗后数据；如果没有清洗后数据，使用原始数据
- **Verification**: `human-judgment`

### AC-10: TypeScript 编译通过
- **Given**: 修改完成后
- **When**: 运行 `npx tsc --noEmit`
- **Then**: 无 TypeScript 错误
- **Verification**: `programmatic`

## Open Questions
- [ ] 是否需要保留"生成图表"按钮？（建议移除，改为实时渲染）
