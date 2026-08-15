# 日夜切换拖拽条 - Spec

## Why
当前网站仅支持深色模式。用户希望在欢迎页右上角添加一个垂直拖拽条，通过拖拽太阳/月亮滑块在白天/黑夜模式间切换，所有页面的配色跟随变化。

## What Changes
- 新建 `src/components/ThemeToggle.tsx`：垂直拖拽滑块组件（太阳☀️顶部 / 月亮🌙底部，拖拽 + 吸附 + 过渡动画）
- 新建 `src/hooks/useTheme.ts`：主题管理 hook（localStorage 持久化，切换 `html.light` / `html.dark` 类）
- 修改 `src/pages/WelcomePage.tsx`：右上角放置 ThemeToggle，背景渐变跟随主题
- 修改 `src/index.css`：添加 CSS 变量 + 浅色主题覆盖规则
- 修改 `src/components/Layout.tsx`：主背景使用 CSS 变量
- 修改 `src/main.tsx`（或 index.html）：初始化时从 localStorage 读取主题偏好，避免闪烁

## Impact
- Affected specs: `dark-theme-project-detail`（项目详情页深色配色，需兼容浅色覆盖）
- Affected code: `src/components/ThemeToggle.tsx`(新), `src/hooks/useTheme.ts`(新), `src/pages/WelcomePage.tsx`, `src/index.css`, `src/components/Layout.tsx`, `src/main.tsx`

## 技术方案

### 主题切换机制
- 在 `<html>` 元素上切换 `.light` / `.dark` 类
- 默认（无类或 `.dark`）：黑夜模式（现有深色配色不变）
- `.light` 类：白天模式
- localStorage key: `theme`，值为 `'light'` 或 `'dark'`
- 默认值：`'dark'`（黑夜模式）

### CSS 变量 + 覆盖策略
在 `index.css` 中：
1. `:root` 定义深色变量（保持现有配色）
2. `html.light` 定义浅色变量并覆盖关键样式
3. 通过 CSS 选择器覆盖 Tailwind 硬编码颜色类（`bg-[#0a0e1a]` → 浅色等）

### 覆盖的颜色映射（浅色模式）
| 深色值 | 浅色值 | 用途 |
|--------|--------|------|
| `#0a0e1a` | `#F8F9FA` | 页面主背景 |
| `#1A1A1E` / `#1E1E24` | `#F0F0F4` | 次要背景/渐变 |
| `#26262C` | `#FFFFFF` | 卡片/面板背景 |
| `#3A3A44` | `#E5E7EB` | 边框 |
| `#FFFFFF`(文字) | `#1A1A1E` | 主文字 |
| `#D1D5DB` | `#4B5563` | 正文文字 |
| `#9CA3AF` | `#6B7280` | 辅助文字 |

## ADDED Requirements

### Requirement: 垂直日夜切换拖拽条
系统 SHALL 在欢迎页右上角提供垂直拖拽滑块，用户可拖拽太阳/月亮图标切换日夜模式。

#### Scenario: 拖拽切换模式
- **WHEN** 用户拖拽滑块从底部（月亮）向上移动到顶部（太阳）
- **THEN** 滑块显示太阳图标（暖黄 #FCD34D）
- **AND** 松开鼠标后滑块吸附到顶部
- **AND** 页面切换为白天模式（浅色背景 + 深色文字）

#### Scenario: 松开吸附
- **WHEN** 用户拖拽到中间位置松开
- **THEN** 滑块自动吸附到最近端（顶部太阳或底部月亮）
- **AND** 吸附有平滑过渡动画（transition 300ms ease）

#### Scenario: 默认黑夜模式
- **WHEN** 用户首次访问网站
- **THEN** 滑块位于底部（月亮），页面为黑夜模式
- **AND** 月亮图标为冰蓝色 #6BC5E8

#### Scenario: 持久化偏好
- **WHEN** 用户选择白天模式后刷新页面
- **THEN** 页面保持白天模式
- **AND** 滑块位于顶部（太阳）

### Requirement: 全站配色跟随主题
系统 SHALL 在切换主题时更新所有页面的背景色、文字颜色和卡片颜色。

#### Scenario: 白天模式全站效果
- **WHEN** 主题切换为白天模式
- **THEN** Layout 主背景变为 #F8F9FA
- **AND** 卡片背景变为 #FFFFFF
- **AND** 主文字变为 #1A1A1E
- **AND** 边框变为 #E5E7EB

### Requirement: 拖拽条视觉设计
- 拖拽条轨道：细长霓虹蓝/暗紫线条，微弱发光（box-shadow）
- 滑块：圆形，带渐变光晕
- 太阳图标：☀️，暖黄 #FCD34D
- 月亮图标：🌙，冰蓝 #6BC5E8
- 过渡区域：图标颜色渐变融合

## MODIFIED Requirements

### Requirement: WelcomePage 布局
WelcomePage 右上角（`absolute top-6 right-6`）添加 ThemeToggle 组件，z-index 高于背景 SVG。背景渐变在浅色模式下切换为浅色渐变（`from-[#F8F9FA] via-[#F0F0F4] to-[#F8F9FA]`）。ThemeToggle 的点击事件需 `stopPropagation` 以免触发 WelcomePage 的进入导航。

### Requirement: Layout 主背景
Layout 主容器 `bg-[#0a0e1a]` 在浅色模式下通过 CSS 覆盖为 `#F8F9FA`。

### Requirement: index.css 主题覆盖
在 `@layer base` 后新增浅色模式覆盖规则，使用 `html.light` 选择器 + CSS 变量覆盖关键 Tailwind 硬编码颜色类。

## REMOVED Requirements
无
