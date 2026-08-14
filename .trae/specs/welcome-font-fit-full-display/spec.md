# 修复 welcome 放大后显示不全（容器/字号联动自适应）Spec

## Overview
- **Summary**: 彻底定位 WelcomePage 放大后 ECharts `welcome` 文字横向/纵向被裁切的根因，改为「字号由视口宽高共同决定」的自适应算法，同时放大 ECharts 容器高度，确保在任意屏幕尺寸下字号尽量大但完整不裁切。
- **Purpose**: 用户反复反馈「字体一放大就显示不全」，说明固定档位字号 + 固定高度容器的方案对不同屏幕适配不鲁棒，需要真正的自适应 Fit 算法。
- **Target Users**: 所有访问封面页 `/` 的终端用户

## Goals
- 桌面端 welcome 字号尽可能大（不超过 200px 上限），7 字母完整无裁切
- 平板端在 1024px 档附近字号 ≥ 140px 且完整
- 移动端（375px 宽）welcome 完整显示，不横向不溢出、不纵向裁切
- 响应 ECharts `resize()` 后仍能重新算准新字号

## Non-Goals (Out of Scope)
- 不调整 SVG 背景折线、动画、配色、首页/返回按钮等其他元素
- 不改文字内容（仍为 ` welcome `）
- 不改 keyframeAnimation（duration/loop/percent/lineDash 不变）

## Background & Context
- 当前：`fontSize` 分三档 60/100/128 固定，`chartRef` 容器固定 `h-[360px] md:h-[440px]`
- 实测根因：桌面 128 字号 + textPadding 上下 12×2 + shadowBlur 8 + lineWidth 2 → 总高度 ~ 180px；居中于 440px 容器看起来纵向没问题，但 **横向** 9 字符（welcome + 空格）× 128 × 宽因子（~0.75 字符宽/字号）≈ 864px，若视口 1024 + padding 32 → 实际容器宽 992，刚好接近但有移动端更差。移动端 60 字号 × 9 × 0.75 ≈ 405px > 375-32=343px → 必然裁切。
- 更鲁棒的方式：基于视口宽度 × 安全系数（保证不超宽）与容器高度 × 安全系数（保证不超高）取最小值得到 fontSize，保证「Fit」。

## Functional Requirements
- **FR-1**: WelcomePage 初始化字号由 `clamp(48, min(innerWidth*0.66/9/0.75, chartHeight*0.68), 200)` 算法计算（`0.66` 为视口宽利用率，`/9` 是字符数，`/0.75` 是平均字符宽/字号比；`chartHeight*0.68` 为纵向可用系数）。**简化实现**: 直接用 `min(innerWidth * 0.095, chartHeight * 0.68, 200)` 并取 ≥48 的整数。
- **FR-2**: `chartRef` 容器高度放大为响应式三档：`h-[420px] md:h-[560px] lg:h-[680px]`，为大字号留出纵向空间。
- **FR-3**: `handleResize` 同样按上述公式重算 fontSize 并 `setOption` 更新，再 `myChart.resize()`。
- **FR-4**: 外层包裹 div 保留 `pointer-events-none mb-4`。`px-4` 已在外层，不需要改。

## Non-Functional Requirements
- **NFR-1**: 性能：字号计算为纯算术，不增加渲染负担。
- **NFR-2**: 代码整洁：单处公式，初始化/resize 复用。

## Constraints
- **Technical**: ECharts graphic text 仍为描边 + keyframe 动画，text `' welcome '` 不变
- **Dependencies**: 无新依赖

## Assumptions
- `chartRef.current.clientHeight` 在 `echarts.init` 后立即可用（className 已设置固定高度）；若 clientHeight 读 0，则 fallback 用硬编码高度（<768→420, <1024→560, else→680）

## Acceptance Criteria

### AC-1: 桌面端字号变大且完整不裁切
- **Given**: 用户打开封面页，视口宽 ≥ 1440
- **When**: ECharts 初始化 + 3s 描边动画播放
- **Then**: welcome 字号 ≥ 136、W 左缘描边完整、e 右缘描边完整、上下不裁切
- **Verification**: `human-judgment`

### AC-2: 移动端（375px）welcome 完整无裁切
- **Given**: 移动端视口宽约 375px
- **When**: ECharts 初始化并渲染
- **Then**: welcome 7 字母 + 描边完整显示在视口内，横向不溢出、上下不裁切
- **Verification**: `human-judgment`

### AC-3: 窗口缩放后字号自适应
- **Given**: 浏览器窗口从桌面拖到平板宽度（1024 → 768）
- **When**: 触发 resize 事件
- **Then**: fontSize 自动按新尺寸重新计算，ECharts setOption 更新后仍完整显示
- **Verification**: `programmatic`

### AC-4: 配置不变项
- **Given**: 代码构建成功
- **When**: 审阅 WelcomePage.tsx diff
- **Then**: text、top/left、z、textPadding、stroke/shadow/keyframe 数字、handleEnter、SVG 背景、Footer、版权均未改动
- **Verification**: `programmatic`
