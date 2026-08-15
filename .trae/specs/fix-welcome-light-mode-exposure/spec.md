# WelcomePage 白天模式修复 + 科技感保留 PRD

## Overview
- **Summary**: 让 WelcomePage 成为主题感知组件，修复白天模式下 welcome 文字"曝光"（白色填充）和霓虹色看不清的问题，同时保持白天/黑夜双模式的科技感视觉效果。
- **Purpose**: 当前 WelcomePage 的大量颜色通过内联 style、SVG 属性、@keyframes 硬编码，CSS 类覆盖机制无法触及它们，导致白天模式下关键元素曝光或不可读。
- **Target Users**: 白天模式的网站访问者

## Goals
- 白天模式下 welcome SVG 文字描边动画结束时使用深色填充（而非白色），避免曝光
- 白天模式下"点击任意位置进入"提示文字和 glow 效果清晰可读
- 白天模式下 SVG 渐变线、动态圆圈、网格线有足够的对比度
- 黑夜模式所有视觉效果完全保持不变
- 保留科技感：白天模式也有自己的"白天赛博朋克"氛围

## Non-Goals (Out of Scope)
- 不修改 HomePage、ProjectDetailPage 等其他页面（用户明确说 xlsx 内容没问题）
- 不修改 useTheme hook
- 不修改 index.css 中的 `@custom-variant dark` 配置

## Background & Context
- 现有 `useTheme` hook 在 WelcomePage 尚未使用
- WelcomePage 的颜色问题根源：
  1. `@keyframes welcome-draw` 的 100% fill=`#FFFFFF`（硬编码在 style 标签字符串中）
  2. `@keyframes neon-flicker` 的 textShadow=`#5FFBF1`（亮青）
  3. 进入提示 `<p>` 的 style 中 color=`#5FFBF1` + textShadow 内联
  4. hover 处理函数 `e.currentTarget.style.textShadow` 直接赋值
  5. SVG `<linearGradient>` stopColor 硬编码 `#7B4B9E` → `#6BC5E8`
  6. SVG 网格线 stroke=`#7B4B9E`
  7. SVG 圆圈 fill=`#6BC5E8`
  8. SVG 欢迎文字 stroke=`#6C3B9A` + drop-shadow 发光
  9. softGlow filter 发光值
- 这些硬编码颜色大多在 Tailwind/类级 CSS 覆盖范围之外，必须通过组件代码感知主题来替换。

## Functional Requirements
- **FR-1**: WelcomePage 组件使用 `useTheme` hook 并根据当前主题切换所有硬编码颜色值。
- **FR-2**: `welcome-draw` 关键帧动画的 100% fill 跟随主题变化（黑夜白 / 白天深灰蓝）。
- **FR-3**: `neon-flicker` 关键帧动画的 textShadow 颜色跟随主题变化（黑夜霓虹青 glow / 白天深青蓝 subtle glow）。
- **FR-4**: 进入提示文字的 color 和 textShadow（包含默认、hover 处理）跟随主题变化。
- **FR-5**: SVG 渐变线的 stopColor 跟随主题变化（黑夜紫→青 / 白天深蓝→暗紫）。
- **FR-6**: SVG 圆圈（静态点 + 动态点）的 fill 跟随主题变化，发光滤镜强度在白天减弱。
- **FR-7**: SVG 网格线 stroke 跟随主题变化，白天用蓝系，黑夜用紫系。
- **FR-8**: welcome SVG 文字的 stroke 和 drop-shadow 跟随主题变化，白天有足够对比的描边。

## Non-Functional Requirements
- **NFR-1**: 黑夜模式视觉像素级不变。
- **NFR-2**: 主题切换时颜色无闪烁或突兀变化，尽量平滑。
- **NFR-3**: TypeScript 编译通过，Vite 构建通过。

## Constraints
- **Technical**: React + TypeScript + Tailwind CSS v4，必须复用 `useTheme` hook
- **Dependencies**: 无新依赖

## Assumptions
- 颜色值：白天科技感替代色基于冷灰蓝体系：
  - 主强调（替代亮青）：`#2C5282` 深青蓝 + `#3182CE` 深蓝
  - 次强调（替代暗紫）：`#553C9A` 深紫蓝（白天背景上对比度更高）
  - welcome fill 结束态：`#1A1A2E`（深灰蓝，与主标题文字色一致）
- 发光强度：白天模式发光整体降低，强调"线条感"而非"glow"

## Acceptance Criteria

### AC-1: welcome 文字动画无曝光
- **Given**: 用户处于白天模式
- **When**: 进入 WelcomePage 等待动画执行
- **Then**: 描边动画结束后填充色为深灰蓝 `#1A1A2E`，清晰可见，不是白色曝光
- **Verification**: `human-judgment`

### AC-2: 黑夜模式 welcome 动画不变
- **Given**: 用户处于黑夜模式
- **When**: 进入 WelcomePage 等待动画
- **Then**: fill 结束态依然是白色 `#FFFFFF`，描边仍是暗紫
- **Verification**: `human-judgment`

### AC-3: 进入提示文字白天清晰可读
- **Given**: 用户处于白天模式
- **When**: 查看"点击任意位置进入 →"文字
- **Then**: 文字颜色为深青蓝系，textShadow 是 subtle 不刺眼，悬停时 glow 也在浅背景可读
- **Verification**: `human-judgment`

### AC-4: 黑夜模式进入提示不变
- **Given**: 用户处于黑夜模式
- **When**: 查看进入提示
- **Then**: 依然是 `#5FFBF1` 霓虹青 + 霓虹 flicker 发光
- **Verification**: `human-judgment`

### AC-5: SVG 线条/圆圈白天有对比度
- **Given**: 用户处于白天模式
- **When**: 查看背景装饰 SVG（渐变曲线、网格线、圆点）
- **Then**: 使用深蓝/深紫蓝系，在 `#F0F4F8` 冷灰背景上清晰可见
- **Verification**: `human-judgment`

### AC-6: 编译通过
- **Given**: 代码已修改
- **When**: 运行 `npx tsc --noEmit` 和 `npx vite build`
- **Then**: 两项均通过
- **Verification**: `programmatic`

### AC-7: 推送成功
- **Given**: 所有修改验证通过
- **When**: 执行 git commit & push
- **Then**: 成功推送到 origin/main
- **Verification**: `programmatic`

## Open Questions
无
