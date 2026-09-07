# 全局布局紧凑化优化（1366×768 适配）- 产品需求文档

## Overview
- **Summary**: 对网站内页（首页 /home、项目列表 /projects、关于 /about、项目详情 /project/:id）进行全局布局紧凑化：减小卡片内边距、标题与统计数字字号、收紧区块间距、消除容器重复 padding 与水平溢出，使内容在 1366×768 及以上分辨率视口中完整显示，无需用户手动缩放。
- **Purpose**: 当前大部分元素（卡片、统计数字、数据集卡片）在正常视口中显得过大，导致布局溢出或挤压，一屏内可见内容过少。
- **Target Users**: 在 1366×768 笔记本及以上分辨率设备上访问本站的用户（含深色/浅色两种模式）。

## Goals
- 1366×768 视口下四个内页无水平滚动条、无元素挤压/溢出，内容密度舒适。
- 卡片内边距、标题字号、统计数字字号、区块间距整体收紧一档。
- 页面容器不再重复添加 padding（由 Layout 统一提供 `p-4 md:p-6`）。
- 所有尺寸调整基于 Tailwind 响应式类：移动端基础类保持紧凑可用，`md:`（768px+）起适度放宽。
- 根元素字体大小/缩放比例检查确认无误（不引入 zoom/transform 等缩放 hack）。

## Non-Goals
- 不改变任何功能逻辑、组件形状、配色方案、交互动效。
- 不修改 Header 组件（logo/时间字体为用户多轮手动调定）。
- 不修改封面页 WelcomePage（全屏展示页，此前已专门做过字体适配，无卡片/统计数字溢出问题）。
- 不修改 ECharts 图表统一高度 280px 的既有约定。
- 不修改 `pt-20` 顶部留白约定（防固定导航栏遮挡）。
- 不做 git commit / push；用户本地预览确认后再提交推送。

## Background & Context
- 技术栈：React 19 + TypeScript + Tailwind CSS v4（`@import "tailwindcss"`，class 策略暗色模式 `.dark`/`.light`）+ Vite + IndexedDB。
- [index.html](file:///d:/my_project/data-composition/index.html) viewport 为 `width=device-width, initial-scale=1.0`，根字体为浏览器默认 16px，**无缩放问题，无需改动**。
- [Layout.tsx](file:///d:/my_project/data-composition/src/components/Layout.tsx) 结构：固定 Header（h-18=72px）+ 可滑出 Sidebar + main 内容区；main 统一 `pt-20`，内容包装层统一提供 `p-4 md:p-6`，根容器已加 `overflow-x-hidden`。
- 上轮会话已完成 Layout / HomePage / ProjectListPage / AboutPage 四个文件的紧凑化修改（工作区未提交），ProjectDetailPage 及少量子组件尚未处理。
- 响应式断点约定：移动端基础类，`md:` = 768px+，`lg:` = 1024px+。

## Functional Requirements
- **FR-1**: 项目详情页（ProjectDetailPage）三处容器（loading/error/正常态）移除重复的 `px-4 sm:px-6 lg:px-8`，与其他页面一致仅保留 `max-w-* mx-auto`。
- **FR-2**: 项目详情页标题卡片、数据集信息面板、分析结论面板的内边距由 `p-6` 收紧为 `p-4 md:p-5`；项目大标题 `text-3xl` 收紧为 `text-2xl`；区块纵向间距（mb-6/mt-6/gap-6）收紧一档。
- **FR-3**: TabNavigation 栏内边距 `px-6` 改为 `px-4 md:px-6`，并增加小屏横向滚动保护（不改变桌面外观）。
- **FR-4**: SmartAnalysis 卡片网格 `gap-6` 收紧为 `gap-4 md:gap-5`。
- **FR-5**: 在 index.css 全局为 body 增加 `overflow-x: hidden` 兜底保险（Layout 根 div 已有，body 级双保险）。
- **FR-6**: 已完成的 Layout / HomePage / ProjectListPage / AboutPage 修改保持不变，仅做复核。

## Non-Functional Requirements
- **NFR-1**: 所有调整仅涉及 Tailwind 尺寸/间距/字号类，不改动 TS 逻辑。
- **NFR-2**: 深色模式与浅色模式表现一致（间距类与主题无关，不需额外配色处理）。
- **NFR-3**: `npx tsc --noEmit` 与 `npx vite build` 必须通过。
- **NFR-4**: 移动端（375px 宽）布局不得退化：无水平滚动、文字可读、按钮可点。

## Constraints
- **Technical**: 仅使用 Tailwind CSS 响应式工具类；不引入新依赖；不改 index.html viewpoint 与根字体。
- **Business**: 修改完成后不提交、不推送，等待用户本地预览确认。
- **Dependencies**: 本地 dev server（Vite，http://localhost:5173/）用于预览验证。

## Assumptions
- "1366×768 及以上分辨率"指浏览器视口（含操作系统缩放 100%）；用户主要在笔记本屏幕上使用。
- 封面页（/）不在本次抱怨范围内，保持现状。
- 弹窗（Modal）内容为居中浮层，现有 `max-w-sm mx-4` 已具备视口保护，不需要调整。

## Acceptance Criteria

### AC-1: 1366×768 视口无水平溢出
- **Type**: `rule`
- **Given**: 浏览器视口设置为 1366×768
- **When**: 分别访问 /home、/projects、/about、/project/:id 四个页面
- **Then**: 每个页面 `document.documentElement.scrollWidth <= clientWidth`，无水平滚动条，无内容被裁切
- **Pass Condition**: 四个页面均检测通过（浏览器 DevTools 控制台验证 + 截图目检）
- **Evidence**: 浏览器自动化检测结果与页面截图

### AC-2: 卡片内边距与容器 padding 规范统一
- **Type**: `rule`
- **Given**: 四个内页的主要卡片/面板
- **When**: 检查类名
- **Then**: 不存在裸 `p-6`/`p-8` 的主要内容卡片（弹窗等浮层除外）；页面级容器不存在与 Layout 重复的 `px-*`/`py-*`（loading/error 态的 `py-12` 居中留白除外）
- **Pass Condition**: 全局 grep 验证无违规类名
- **Evidence**: grep 结果与代码审查

### AC-3: 标题与统计数字字号收紧
- **Type**: `rule`
- **Given**: 四个内页的页面大标题与统计数字
- **When**: 检查类名
- **Then**: 统计数字使用 `text-2xl`；页面级大标题不使用裸 `text-3xl`（首页 hero 标题使用响应式 `text-3xl md:text-4xl` 除外）
- **Pass Condition**: 全局 grep 验证
- **Evidence**: grep 结果

### AC-4: 类型检查与构建通过
- **Type**: `rule`
- **Given**: 全部修改完成
- **When**: 运行 `npx tsc --noEmit` 与 `npx vite build`
- **Then**: 两条命令均退出码 0，无错误
- **Pass Condition**: 命令输出无错误
- **Evidence**: 命令输出日志

### AC-5: 1366×768 下视觉密度舒适
- **Type**: `rubric`
- **Dimension**: 桌面视口视觉密度与完整性
- **Scale**: 1-5
- **Anchors**: 1 = 元素仍明显过大、溢出或挤压严重；3 = 基本完整显示但局部偏松或偏挤；5 = 四页面密度均匀舒适、首屏可见内容明显增多、无溢出挤压
- **Pass Threshold**: >= 4
- **Evidence**: 1366×768 四页面截图与用户预览确认

### AC-6: 移动端布局不退化
- **Type**: `rule`
- **Given**: 浏览器视口设置为 375×667（移动端）
- **When**: 访问 /home 与 /project/:id
- **Then**: 无水平滚动条，卡片单栏排列，文字不重叠，按钮可点击
- **Pass Condition**: 检测 `scrollWidth <= clientWidth` 且目检无错位
- **Evidence**: 浏览器检测结果与移动端视口截图

### AC-7: 不引入缩放 hack
- **Type**: `rule`
- **Given**: 全部修改
- **When**: 检查 html/body/CSS
- **Then**: 不出现 `zoom`、`transform: scale()`、根 font-size 重写等缩放手段；viewport meta 保持 `width=device-width, initial-scale=1.0`
- **Pass Condition**: grep 与文件审查确认
- **Evidence**: 代码审查

## Open Questions
- 无（用户已明确给出 5 个调整方向与"先不 push"的要求）
