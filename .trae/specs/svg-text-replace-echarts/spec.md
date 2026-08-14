# use SVG to render welcome text instead of ECharts to fix stroke clipping Spec

## Overview
- **Summary**: 彻底放弃使用 ECharts `graphic.text` 绘制 `welcome` 文字，改用原生 SVG `<text>` 元素实现相同的描边动画效果，从根本上解决大字号下文字描边（尤其是 W/E 边缘）被裁切的问题。
- **Purpose**: ECharts Canvas 渲染机制决定了其对 graphic 元素内部 bounding box 的严格裁剪，`textPadding` 和 `z` 等方案均无法完美解决边缘缺失。SVG 作为矢量 DOM 元素，天生支持任意描边尺寸且不会被容器裁剪。
- **Target Users**: 封面页访问者

## Goals
- 彻底解决 `welcome` 文字 W/E 边缘及描边被裁切的问题
- 保持原有的描边动画视觉效果（3s 循环：描边绘制 → 填充变白）
- 保持字号自适应逻辑
- 移除 ECharts 实例对文字渲染的依赖（背景 SVG 独立），代码更简洁

## Non-Goals (Out of Scope)
- 不修改背景折线 SVG 及其动画
- 不修改文字内容 `welcome`
- 不修改首页、路由、其他组件

## Background & Context
- 当前：ECharts 实例 + `graphic.text` 渲染带描边动画的 `welcome`
- 问题：Canvas 内部 bounding box 裁剪导致大字号时 W/E 边缘被切
- 替代方案：用 `<svg><text>` + CSS `stroke-dasharray` / `fill` 动画复刻效果

## Functional Requirements
- **FR-1**: 移除 `echarts.init`、`setOption`、`handleResize`、`chartRef` 等所有 ECharts 文字渲染相关代码。
- **FR-2**: 使用 SVG `<text>` 元素渲染 `welcome`，保留原配色：stroke `#6C3B9A`、fill 初始 transparent、最终 `#FFFFFF`、lineWidth 2。
- **FR-3**: 用 CSS `@keyframes` 实现描边绘制动画（3s 循环）：前 70% 时间绘制描边（`stroke-dashoffset` 200→0），后 30% 时间填充变白（fill transparent→#FFFFFF）。
- **FR-4**: 保留原响应式字号算法（`Math.max(48, Math.min(Math.round(Math.min(innerWidth * 0.095, chartH * 0.68)), 200))`），应用到 SVG `fontSize` 属性。
- **FR-5**: 保留外层容器结构及 Tailwind 样式。

## Non-Functional Requirements
- **NFR-1**: 动画流畅，无卡顿。
- **NFR-2**: 代码更简洁，移除 ECharts 实例。

## Constraints
- **Technical**: 必须保持与原视觉一致
- **Dependencies**: 无需新增依赖，使用原生 SVG + CSS

## Assumptions
- SVG `<text>` + `stroke-dasharray` 可以完美模拟 ECharts 的 keyframe 动画。
- 移除 ECharts 实例后，项目其他地方（如 ProjectDetailPage）仍可能使用 ECharts（需检查并保留 import）。

## Acceptance Criteria

### AC-1: welcome 文字无裁切
- **Given**: 用户打开封面页，任意屏幕宽度
- **When**: 文字渲染完成
- **Then**: `welcome` 7 字母描边完整，W 左缘与 e 右缘无缺失
- **Verification**: `human-judgment`

### AC-2: 还原原有动画效果
- **Given**: 文字首次加载
- **When**: 3s 循环播放
- **Then**: 先绘制紫色描边，再填充为白色，循环播放
- **Verification**: `human-judgment`

### AC-3: 自适应字号
- **Given**: 不同屏幕宽度
- **When**: 字号自动调整
- **Then**: 视觉效果与上一版一致，且完整显示
- **Verification**: `human-judgment`

### AC-4: 移除 ECharts 实例
- **Given**: 构建通过
- **When**: 审阅代码
- **Then**: `WelcomePage.tsx` 中不再包含 `echarts.init`、`setOption`、`handleResize`、`chartRef` 相关代码
- **Verification**: `programmatic`
