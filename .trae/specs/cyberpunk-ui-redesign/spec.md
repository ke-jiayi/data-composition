# 赛博朋克 UI 风格改造 Spec

## Why
当前网站主题色偏浅（Layout 使用 `bg-gray-50`、Header 白色、卡片白色），整体观感中规中矩，缺乏辨识度。用户希望在不改动任何功能的前提下，将 UI 主题色统一改造为深蓝黑底色，叠加紫色流光折线图背景，呈现赛博朋克风格，同时移除封面页顶部的条形小图标以消除"AI 模板感"。

## What Changes
- **主题色改造**：将全局背景从浅灰（`bg-gray-50`）改为深蓝黑（接近 `#0a0e1a` / `slate-950` 系列），文字主色改为浅色
- **Header 改造**：顶部导航栏由白色背景改为深蓝黑半透明背景，文字改为浅色霓虹色
- **Layout 改造**：侧边栏由白色改为深色玻璃态，激活态使用霓虹紫/青
- **卡片改造**：HomePage 统计卡片、数据集卡片由白底改为深色半透明玻璃态，配霓虹边框与光晕
- **背景流光**：在页面背景层叠加一条紫色（magenta/purple）流光折线图样式的 SVG 装饰，带 blur 与 glow 效果
- **封面页调整**：移除 WelcomePage 顶部 `📊` 条形 emoji 图标，保留主标题与进入提示
- **去 AI 感**：减少千篇一律的对称渐变文字、emoji 堆砌，改用更克制的等宽字体点缀与霓虹线条
- **功能保持**：所有路由、导入、搜索、删除、跳转、编辑等功能逻辑完全不变

## Impact
- Affected specs: add-back-to-cover-button、add-welcome-cover-page、restore-homepage-ui-style、fix-navbar-overlap
- Affected code:
  - `src/index.css`（主题变量、scrollbar、selection、base body）
  - `src/components/Layout.tsx`（背景色、侧边栏样式）
  - `src/components/Header.tsx`（深色背景、文字色）
  - `src/pages/WelcomePage.tsx`（移除 emoji、加紫色折线流光背景）
  - `src/pages/HomePage.tsx`（卡片深色化、统计卡片深色化、按钮霓虹化）

## ADDED Requirements

### Requirement: 深蓝黑全局主题
系统 SHALL 在所有受 Layout 包裹的页面以及封面页使用深蓝黑作为主背景色（近似 `#0a0e1a`），文字主色变为浅色（白/浅灰），确保整体视觉统一为深色赛博朋克基调。

#### Scenario: 进入任一受 Layout 包裹页面
- **WHEN** 用户访问 /home、/projects、/project/:id、/about
- **THEN** 页面背景呈深蓝黑色，文字为浅色，无残留浅灰背景

### Requirement: 紫色流光折线图背景
系统 SHALL 在封面页（WelcomePage）背景层渲染一条紫色（magenta/purple）流光折线图样式的装饰，折线呈数据图表走势形态，带 blur 辉光效果，作为背景点缀而非前景内容。

#### Scenario: 打开封面页
- **WHEN** 用户访问 `/`
- **THEN** 背景出现紫色流光折线图装饰，带辉光，不遮挡主标题与进入提示

### Requirement: 封面页去除条形小图标
系统 SHALL 移除 WelcomePage 主标题上方的 `📊` 条形 emoji 图标，标题区仅保留主标题、装饰线、副标题与进入提示。

#### Scenario: 查看封面页主标题区
- **WHEN** 用户查看封面页
- **THEN** 主标题"欢迎来到我的个人数据收集网址"上方不再有任何 emoji 或条形图标

### Requirement: 赛博朋克风格卡片
HomePage 的统计卡片与数据集卡片 SHALL 使用深色半透明玻璃态背景（如 `bg-white/5` + `backdrop-blur`），配霓虹色边框（青/紫）与悬停光晕，替换原白底卡片。

#### Scenario: 查看数据集卡片
- **WHEN** 用户在 HomePage 查看数据集列表
- **THEN** 卡片呈深色玻璃态，悬停时出现霓虹光晕与边框高亮

### Requirement: 深色导航栏
Header SHALL 使用深蓝黑半透明背景（如 `bg-[#0a0e1a]/80 backdrop-blur`），文字与图标使用霓虹浅色，底部边框改为霓虹紫/青细线。

#### Scenario: 查看顶部导航
- **WHEN** 用户查看页面顶部 Header
- **THEN** Header 呈深色半透明，"✈️ 导航"文字呈霓虹色

## MODIFIED Requirements

### Requirement: 现有功能保持
所有现有功能（路由跳转、文件导入、搜索过滤、数据集删除、编辑结论、代码编辑器、Tab 切换） SHALL 保持原有行为不变，仅视觉样式改变。

#### Scenario: 功能回归验证
- **WHEN** 用户在改造后执行导入、搜索、删除、跳转、编辑操作
- **THEN** 所有功能行为与改造前完全一致

## REMOVED Requirements

### Requirement: 浅色主题视觉
**Reason**: 用户明确要求改为深蓝黑赛博朋克风格
**Migration**: 通过修改 CSS 变量与组件 className 实现，不删除任何功能代码
