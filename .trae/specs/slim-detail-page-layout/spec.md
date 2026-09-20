# 项目详情页瘦身排版优化 Spec

## Why
ProjectDetailPage 当前主内容区为 `max-w-7xl`（1280px），在常规屏幕上过宽，正文行宽过长阅读不舒适；正文多为 text-sm 偏小。希望收窄主内容宽度到 max-w-4xl 并适度放大正文字号，提升阅读舒适度，同时保证移动端不出现横向滚动。

## Problem
- 主内容容器 `max-w-7xl mx-auto` 过宽。
- 正文 text-sm、text-base 偏小。
- 表格已有 overflow-x-auto，收窄后不会出现横向滚动。

## Users / Goals
- 主内容区（数据集信息卡、Tab 导航、原始数据表、清洗、结论、图表、智能分析）最大宽度 max-w-4xl，水平居中。
- 正文字号放大：text-sm → text-base，text-base → text-lg，text-xs → text-sm（标签/表头/Tag）。
- 表格/卡片内部 padding 不减小，避免拥挤。
- 移动端自适应，无横向滚动。

## Non-Goals
- 不改 Header/Layout/WelcomePage/HomePage。
- 不改功能逻辑、不改配色、不改间距数值（只改宽度与字号）。
- 不改图片最大高度 max-h-[500px]。

## Functional Requirements
- **FR-1（容器宽度）**: ProjectDetailPage 内三处 `max-w-7xl mx-auto`（loading 态、error 态、主内容态）统一改为 `max-w-4xl mx-auto`。
- **FR-2（ProjectDetailPage 正文字号）**: 页面内 text-sm → text-base、text-base → text-lg、text-xs → text-sm（适用：标题、描述、信息卡标签与值、Tab 内说明文字、按钮文字等正文）。按钮内 px/py、卡片 p-2/p-3、grid gap 等间距保持不变。
- **FR-3（TabNavigation）**: tab 按钮 text-sm → text-base。
- **FR-4（DataTable）**: 表头 text-xs → text-sm，单元格/搜索框/分页说明 text-sm → text-base；保留 overflow-x-auto；px-4 py-3 不变。
- **FR-5（DataCleaning）**: text-sm → text-base；间距与按钮样式不变。
- **FR-6（SmartAnalysis）**: text-sm → text-base、text-base → text-lg；间距不变。

## Non-Functional Requirements
- **NFR-1**: `npx tsc --noEmit` 退出码 0。
- **NFR-2**: 不引入横向滚动：1366px 与 375px（iPhone）宽度下 `document.documentElement.scrollWidth === clientWidth`。
- **NFR-3**: 仅修改以下文件：src/pages/ProjectDetailPage.tsx、src/components/TabNavigation.tsx、src/components/DataTable.tsx、src/components/DataCleaning.tsx、src/components/SmartAnalysis.tsx。

## Acceptance Criteria

### AC-1: 主内容区收窄到 max-w-4xl
- **Type**: `rule`
- **When**: 打开任意数据集详情页
- **Then**: 主内容容器 class 含 max-w-4xl mx-auto，不含 max-w-7xl；页面内容水平居中
- **Evidence**: 代码 grep + 浏览器 getComputedStyle 容器 max-width ≈ 896px

### AC-2: 正文字号放大
- **Type**: `rule`
- **When**: 检查详情页各文本元素
- **Then**: 原 text-sm 正文现 computed font-size ≈ 16px（text-base）；原 text-base 现 ≈ 18px（text-lg）；原 text-xs 表头/标签现 ≈ 14px（text-sm）
- **Evidence**: 浏览器 getComputedStyle 抽样（数据集信息值、Tab 标签、表头、表格单元格）

### AC-3: 表格/卡片间距不变且不拥挤
- **Type**: `rule`
- **When**: 查看表格与卡片
- **Then**: DataTable th/td 仍为 px-4 py-3；卡片 p-2 md:p-3、grid gap-2 md:gap-3 不变
- **Evidence**: 代码 grep

### AC-4: 移动端无横向滚动
- **Type**: `rule`
- **When**: 视口宽度 375px
- **Then**: document.documentElement.scrollWidth === clientWidth；表格内部可横向滚动（overflow-x-auto）但页面整体不溢出
- **Evidence**: 浏览器评估

### AC-5: 编译通过
- **Type**: `rule`
- **When**: npx tsc --noEmit
- **Then**: 退出码 0
- **Evidence**: tsc 输出

## Open Questions
- 无。
