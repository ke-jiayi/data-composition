# 修复 Tailwind CSS v4 配置问题 - 产品需求文档

## Overview
- **Summary**: 修复 Tailwind CSS v4 的配置问题，确保所有 Tailwind 工具类（如 pt-20、h-16 等）正确生效，解决页面内容被导航栏遮挡的根本问题
- **Purpose**: Tailwind CSS v4 使用了完全不同的配置方式，当前项目使用 v3 的语法导致所有工具类未生效
- **Target Users**: 网站所有访问用户

## Goals
- [ ] 修复 Tailwind CSS v4 配置，使所有工具类正确生效
- [ ] 确保导航栏高度 h-16 生效
- [ ] 确保内容区域顶部内边距 pt-20 生效
- [ ] 所有页面内容从导航栏下方清晰显示

## Non-Goals (Out of Scope)
- 不修改页面功能逻辑
- 不修改页面布局结构
- 不升级或降级 Tailwind 版本

## Background & Context
- 项目使用 Tailwind CSS v4.3.1
- 当前 index.css 使用 v3 语法：`@tailwind base; @tailwind components; @tailwind utilities;`
- v4 应使用 `@import "tailwindcss";` 语法
- v4 内容扫描路径通过 `@source` 指令在 CSS 中指定
- v4 主题自定义通过 `@theme` 块在 CSS 中指定
- 由于配置错误，所有 Tailwind 工具类未生效，导致页面样式完全错误

## Functional Requirements
- **FR-1**: index.css 使用 Tailwind v4 正确的导入语法
- **FR-2**: 内容扫描路径通过 `@source` 正确配置
- **FR-3**: 主题配置迁移到 `@theme` 块
- **FR-4**: 导航栏 h-16 高度正确生效（64px）
- **FR-5**: 内容区域 pt-20 内边距正确生效（80px）

## Non-Functional Requirements
- **NFR-1**: TypeScript 编译必须通过
- **NFR-2**: 页面样式正常显示

## Constraints
- **Technical**: Tailwind CSS v4 + PostCSS + Vite
- **Dependencies**: 保持现有依赖版本不变

## Assumptions
- 修改 index.css 配置后，开发服务器会自动热更新
- 所有 Tailwind 工具类在配置修复后会正常工作

## Acceptance Criteria

### AC-1: Tailwind 配置修复
- **Given**: index.css 文件已修改
- **When**: 检查 index.css 内容
- **Then**: 使用 `@import "tailwindcss";` 而不是 `@tailwind base;` 等
- **Verification**: `programmatic`

### AC-2: 内容扫描路径配置
- **Given**: index.css 文件已修改
- **When**: 检查 index.css 内容
- **Then**: 包含 `@source` 指令指定正确的内容扫描路径
- **Verification**: `programmatic`

### AC-3: 导航栏高度正确
- **Given**: 页面加载完成
- **When**: 检查 header 元素的实际高度
- **Then**: header 高度约为 64px（h-16）
- **Verification**: `programmatic`

### AC-4: 内容区域顶部内边距正确
- **Given**: 页面加载完成
- **When**: 检查 main 元素的 padding-top
- **Then**: main 的 padding-top 约为 80px（pt-20）
- **Verification**: `programmatic`

### AC-5: 页面内容不被遮挡
- **Given**: 用户访问首页
- **When**: 页面加载完成
- **Then**: 页面顶部标题和按钮完全可见，不被导航栏遮挡
- **Verification**: `human-judgment`

### AC-6: TypeScript 编译通过
- **Given**: 修改完成后
- **When**: 运行 `npx tsc --noEmit`
- **Then**: 无 TypeScript 错误
- **Verification**: `programmatic`

## Open Questions
- [ ] 是否需要保留 tailwind.config.js 文件？（v4 中不再需要）
