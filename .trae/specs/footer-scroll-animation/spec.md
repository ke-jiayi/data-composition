# 首页底部滚动触发动画 - 产品需求文档

## Overview
- **Summary**: 在 HomePage 底部添加 Footer 区域，使用 framer-motion 实现滚动触发的入场动画。
- **Purpose**: 提升页面视觉效果，增强用户体验。
- **Target Users**: 使用数据作品集网站的所有用户。

## Goals
- 在页面最底部添加 Footer 区域，显示版权信息
- 使用 framer-motion 实现滚动触发的入场动画
- 动画效果：从下往上渐显（y: 30 → 0，opacity: 0 → 1）
- 动画只在首次进入视口时触发一次

## Non-Goals (Out of Scope)
- 不添加其他动画效果
- 不修改其他页面

## Background & Context
- HomePage 目前没有 Footer 区域
- framer-motion 已安装，可直接使用

## Functional Requirements
- **FR-1**: Footer 区域显示"© 2026 数据作品集 | 用数据记录成长"
- **FR-2**: 使用 framer-motion 的 useInView hook 检测元素进入视口
- **FR-3**: 动画参数：y: 30 → 0，opacity: 0 → 1，持续时间 0.6s，ease-out
- **FR-4**: 动画只触发一次（once: true）

## Non-Functional Requirements
- **NFR-1**: 代码符合 TypeScript 类型检查要求
- **NFR-2**: 使用 Tailwind CSS 进行样式设计

## Constraints
- **Technical**: React 19 + TypeScript，Tailwind CSS，framer-motion
- **Scope**: 仅修改 HomePage.tsx 文件

## Assumptions
- framer-motion 已正确安装
- Footer 内容简单，不需要国际化

## Acceptance Criteria

### AC-1: Footer 显示正确
- **Given**: 用户访问首页
- **When**: 页面加载完成
- **Then**: Footer 区域显示"© 2026 数据作品集 | 用数据记录成长"
- **Verification**: `human-judgment`

### AC-2: 滚动触发动画
- **Given**: 用户滚动页面到底部
- **When**: Footer 区域进入视口
- **Then**: Footer 从下往上渐显（y: 30 → 0，opacity: 0 → 1），持续 0.6s
- **Verification**: `human-judgment`

### AC-3: 动画只触发一次
- **Given**: 用户多次滚动到 Footer 区域
- **When**: Footer 已播放过动画后再次进入视口
- **Then**: 动画不重复播放
- **Verification**: `human-judgment`

### AC-4: TypeScript 编译通过
- **Given**: 代码修改完成
- **When**: 运行 TypeScript 类型检查
- **Then**: 无类型错误
- **Verification**: `programmatic`

## Open Questions
- 无
