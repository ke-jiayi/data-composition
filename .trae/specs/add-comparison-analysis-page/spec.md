# 城乡对比分析大屏 Spec

## Why
当前站点只能通过「导入数据 → 项目详情」查看单个城市的分析结果，缺少一个能直接展示「城市 vs 农村」横向对比结论的静态展示页。新增一个独立大屏页面，可以让访客无需上传任何数据就能快速理解城乡消费结构差异。

## What Changes
- 首页（HomePage）顶部操作区新增「对比分析」按钮（紫色渐变），点击跳转 `/comparison`。
- `App.tsx` 新增 `/comparison` 路由，指向新建的 `ComparisonPage.tsx`；并在 `src/pages/index.ts` 导出该页面。
- 新建 `ComparisonPage.tsx`：深色科技风、纯静态展示，包含顶部标题栏与组合切换按钮、左右双栏图表卡片、底部「核心数据洞察」结论卡片。
- 页面复用现有 `Layout` 布局，卡片沿用项目已有的深色主题类（`bg-[#26262C]` / `dark:bg-[#26262C]` 等），保证白天/黑夜模式均正常。
- 页面不涉及 IndexedDB，不引入任何数据读取逻辑。

## Impact
- 受影响能力：首页入口、前端路由、静态展示页
- 受影响代码：
  - `src/pages/HomePage.tsx`（顶部操作区按钮）
  - `src/App.tsx`（路由注册）
  - `src/pages/index.ts`（页面导出）
  - `src/pages/ComparisonPage.tsx`（新建）
  - `public/images/城乡1_对比图.png`、`public/images/城乡1_WorkBuddy对比图.png`（所需静态图片资源，当前仓库中缺失）

## 前置依赖 / 风险
- 页面引用的两张图片当前不存在于 `public/images/` 目录。需由用户把图片放入该目录；实现时按项目已有约定加 `onError` 兜底提示，避免预览时出现破图。

## ADDED Requirements

### Requirement: 首页对比分析入口
系统 SHALL 在首页（HomePage）「我的数据集」操作区、「导入数据」按钮旁提供「对比分析」入口，点击后跳转到 `/comparison`。

#### Scenario: 从首页进入对比分析页
- **WHEN** 用户在首页点击「对比分析」按钮
- **THEN** 浏览器路由变为 `/comparison` 并渲染对比分析大屏页面

#### Scenario: 按钮样式
- **WHEN** 首页渲染操作区
- **THEN** 「对比分析」按钮呈现紫色渐变样式，与「导入数据」按钮同排展示

### Requirement: 对比分析路由
系统 SHALL 在 `App.tsx` 中注册 `/comparison` 路由并指向 `ComparisonPage`，未知路由仍重定向到 `/home`。

#### Scenario: 直接访问路由
- **WHEN** 用户直接访问 `/comparison`
- **THEN** 页面正常渲染对比分析大屏，不触发 IndexedDB 初始化阻塞

### Requirement: 对比分析页面顶部区域
系统 SHALL 在页面顶部提供返回首页按钮、主标题「城乡消费结构对比分析」以及一排切换按钮。

#### Scenario: 返回首页
- **WHEN** 用户点击左上角「返回首页」
- **THEN** 路由跳转到 `/home`

#### Scenario: 切换按钮预留
- **WHEN** 页面加载完成
- **THEN** 显示一个「城市1 vs 农村1」切换按钮并处于高亮选中态，为后续扩展预留结构

### Requirement: 主体双栏图表展示
系统 SHALL 使用响应式 Grid 双栏布局展示两张图表卡片：左栏「各分类指数对比」，右栏「总指数趋势对比」。

#### Scenario: 左栏卡片
- **WHEN** 页面渲染主体区
- **THEN** 左栏卡片标题为「各分类指数对比」，图片为 `/images/城乡1_对比图.png`，下方配文「交通通信类城乡均破105，食品类均低于100，体现宏观通胀共性。」

#### Scenario: 右栏卡片
- **WHEN** 页面渲染主体区
- **THEN** 右栏卡片标题为「总指数趋势对比」，图片为 `/images/城乡1_WorkBuddy对比图.png`，下方配文「1-5月城乡总指数走势高度一致，农村总指数略微低于城市。」

#### Scenario: 图片自适应
- **WHEN** 视口宽度变化
- **THEN** 图片宽度自适应容器且不变形（保持原始宽高比，`object-contain`）

#### Scenario: 图片缺失兜底
- **WHEN** 图片加载失败（文件不存在）
- **THEN** 卡片内显示「暂无图表」类提示文案，不出现破图图标

### Requirement: 核心数据洞察结论区
系统 SHALL 在页面底部提供宽卡片「核心数据洞察」，用列表展示三条结论。

#### Scenario: 结论列表内容
- **WHEN** 页面渲染底部区域
- **THEN** 依次展示：
  1. 交通通信类涨幅领跑：城乡两地该类指数均突破105，说明成本上涨是普遍趋势。
  2. 食品烟酒类城乡倒挂：城市食品类指数99.2，农村98.8，均低于荣枯线。
  3. 其他服务类差异显著：城市110.0高于农村109.7，城市服务消费价格压力更大。

### Requirement: 深色科技风与主题适配
系统 SHALL 使用项目现有深色卡片样式类，并保证在 light / dark 两种主题下文字与卡片对比度正常。

#### Scenario: 白天模式
- **WHEN** 站点处于 light 主题
- **THEN** 卡片为浅色背景、文字为深色，页面仍保持可读

#### Scenario: 黑夜模式
- **WHEN** 站点处于 dark 主题
- **THEN** 卡片为 `#26262C` 深色背景、文字为浅色，呈现深色科技风

## MODIFIED Requirements
无

## REMOVED Requirements
无
