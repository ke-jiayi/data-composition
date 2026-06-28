# 首页重新设计 - Product Requirement Document

## Overview
- **Summary**: 按照设计图重新实现数据作品集网站的首页，包括顶部导航区、统计卡片区、搜索排序区、数据集列表区和底部动画占位区。
- **Purpose**: 提升首页的视觉效果和用户体验，使布局更加清晰专业，同时增强功能（搜索、排序、统计）。
- **Target Users**: 使用该网站进行数据管理和分析的用户。

## Goals
- 重新设计首页布局，使其更符合设计图风格
- 添加统计卡片展示关键数据指标
- 实现数据集搜索和排序功能
- 添加滚动触发的入场动画效果
- 保持与现有 useDB hook 的集成

## Non-Goals (Out of Scope)
- 不修改项目详情页（ProjectDetailPage）
- 不修改数据库结构（db.ts）
- 不修改导入逻辑（保持现有 CSV/Excel 解析）
- 不添加用户认证系统
- 不实现后端 API

## Background & Context
- 当前首页有基本的导入和数据集列表功能，但布局较简单
- 项目使用 React + TypeScript + Tailwind CSS + IndexedDB (idb)
- 已有 useDB hook 提供数据库操作
- 需要安装 framer-motion 实现滚动动画
- 需要保留"手动测试：我改了这里"作为页面欢迎语

## Functional Requirements

- **FR-1**: 顶部区域显示 Logo（数据作品集）、当前日期时间和导入数据按钮
- **FR-2**: 统计卡片区域展示总数据集数量、总数据行数、最近导入时间
- **FR-3**: 搜索框支持按名称或描述实时过滤数据集
- **FR-4**: 排序下拉菜单支持按导入时间（默认）、名称、数据量排序
- **FR-5**: 数据集列表以卡片形式展示，点击跳转详情页
- **FR-6**: 空数据集时显示友好的空状态提示
- **FR-7**: 底部占位区域显示指定文字，并有滚动入场动画
- **FR-8**: 导入数据按钮点击后弹出文件选择框，支持 CSV/Excel
- **FR-9**: 导入成功后自动更新数据集列表和统计数据

## Non-Functional Requirements

- **NFR-1**: 页面响应式，适配桌面和移动端
- **NFR-2**: 搜索和排序操作响应时间 < 100ms
- **NFR-3**: 动画流畅，帧率 60fps
- **NFR-4**: 使用 Tailwind CSS 进行样式设计
- **NFR-5**: 代码风格与现有项目保持一致

## Constraints
- **Technical**: React 19, TypeScript, Tailwind CSS 4, IndexedDB
- **Business**: 保持现有功能不变，仅做布局和体验优化
- **Dependencies**: framer-motion（新增），papaparse, xlsx（已有）

## Assumptions
- 日期格式使用本地时间，格式为 xxxx-xx-xx
- 搜索为前端实时过滤，不涉及后端
- 排序为前端排序
- 动画使用 framer-motion 的 whileInView 实现滚动触发

## Acceptance Criteria

### AC-1: 顶部区域布局正确
- **Given**: 用户打开首页
- **When**: 页面加载完成
- **Then**: 左侧显示"数据作品集"标题，中间显示当前日期，右侧显示"导入数据"蓝色按钮
- **Verification**: `human-judgment`

### AC-2: 统计卡片正确显示
- **Given**: 用户已导入若干数据集
- **When**: 页面加载完成
- **Then**: 三个统计卡片分别显示正确的数据集数量、总数据行数、最近导入时间
- **Verification**: `programmatic`

### AC-3: 搜索功能正常
- **Given**: 用户在搜索框中输入关键词
- **When**: 输入内容变化
- **Then**: 数据集列表实时过滤，只显示名称或描述匹配的数据集
- **Verification**: `programmatic`

### AC-4: 排序功能正常
- **Given**: 用户选择排序方式
- **When**: 排序选项改变
- **Then**: 数据集列表按选中的方式排序（导入时间倒序为默认）
- **Verification**: `programmatic`

### AC-5: 数据集卡片可点击跳转
- **Given**: 用户看到数据集列表
- **When**: 点击某个数据集卡片
- **Then**: 跳转到该数据集的详情页（/project/:id）
- **Verification**: `programmatic`

### AC-6: 空状态提示友好
- **Given**: 用户还没有导入任何数据
- **When**: 打开首页
- **Then**: 显示友好的空状态提示，引导用户点击右上角导入
- **Verification**: `human-judgment`

### AC-7: 底部区域有滚动动画
- **Given**: 用户滚动页面到底部区域
- **When**: 底部区域进入视口
- **Then**: 底部占位区域以渐显方式出现（类似 ECharts 官网效果）
- **Verification**: `human-judgment`

### AC-8: 导入功能正常
- **Given**: 用户点击"导入数据"按钮
- **When**: 选择 CSV 或 Excel 文件并确认
- **Then**: 文件被解析，数据保存到数据库，列表和统计自动更新
- **Verification**: `programmatic`

### AC-9: 保留欢迎语
- **Given**: 用户打开首页
- **When**: 页面加载完成
- **Then**: 页面上显示"手动测试：我改了这里"文字
- **Verification**: `human-judgment`

## Open Questions
- [ ] 统计卡片的具体样式和配色方案？（假设沿用现有深蓝色主色）
- [ ] 底部占位区域的具体尺寸？（假设占满宽度，高度约 400px）
