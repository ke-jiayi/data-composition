# 全局布局紧凑化优化（1366×768 适配）- 实施计划

## Task 1: Layout 全局容器紧凑化与溢出保护
- **Status**: `completed`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - 根容器增加 `overflow-x-hidden`；main 保持 `pt-20`；内容包装层 padding 由 `p-6 md:p-10` 收紧为 `p-4 md:p-6`，作为全站唯一的页面外边距来源。
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-7
- **Test Requirements**:
  - `rule` TR-1.1: [Layout.tsx](file:///d:/my_project/data-composition/src/components/Layout.tsx) 根 div 含 `overflow-x-hidden`，main 含 `pt-20`，包装层为 `p-4 md:p-6`；证据：文件 L40/L78/L79
- **Completion Evidence**:
  - 已核实 L40 `min-h-screen bg-[#0a0e1a] overflow-x-hidden`、L78 `pt-20`、L79 `p-4 md:p-6`，均符合要求。

## Task 2: HomePage 紧凑化
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - 容器移除重复 padding（`max-w-6xl mx-auto`）；hero 标题 `text-3xl md:text-4xl`；主卡片 `p-4 md:p-6`；区块标题 `text-xl`；统计卡片 `p-4`、统计数字 `text-2xl`；数据集卡片 `p-4`、卡片标题 `text-base`；网格 gap 与 mb 间距整体收紧一档；搜索框 `py-2.5`。
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-5
- **Test Requirements**:
  - `rule` TR-2.1: HomePage 中无裸 `p-6`/`p-8` 主要卡片、无裸 `text-3xl` 统计数字；证据：grep 与文件 L238-L565
- **Completion Evidence**:
  - 已核实：L238 容器无重复 padding；L255 hero `text-3xl md:text-4xl`；L264 主卡片 `p-4 md:p-6`；L267 区块标题 `text-xl`；L319 统计网格 `gap-3 md:gap-4 mb-6`；L320/328/336 统计卡 `p-4`；L323/331/339 统计数字 `text-2xl`；L447 数据集网格 `gap-4`；L452 卡片 `p-4`；L533 卡片标题 `text-base`；L439 搜索框 `py-2.5`。

## Task 3: ProjectListPage 紧凑化
- **Status**: `completed`
- **Priority**: medium
- **Depends On**: Task 1
- **Description**:
  - 容器移除重复 padding（`max-w-5xl mx-auto`）；标题区 `mb-6`；网格 `gap-4 md:gap-5`；项目卡片 `p-4 md:p-5`。
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-5
- **Test Requirements**:
  - `rule` TR-3.1: ProjectListPage 容器无 `px-*` 重复 padding，卡片为 `p-4 md:p-5`；证据：文件 L37-L49
- **Completion Evidence**:
  - 已核实：L37 `max-w-5xl mx-auto`；L38 `mb-6`；L44 `gap-4 md:gap-5`；L49 卡片 `p-4 md:p-5`。

## Task 4: AboutPage 紧凑化
- **Status**: `completed`
- **Priority**: medium
- **Depends On**: Task 1
- **Description**:
  - 容器移除重复 padding（`max-w-5xl mx-auto`）；标题区 `mb-6`；四张板块卡片 `p-8` 收紧为 `p-5 md:p-6`。
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-5
- **Test Requirements**:
  - `rule` TR-4.1: AboutPage 容器无重复 padding，板块卡片为 `p-5 md:p-6`，无裸 `p-8`；证据：文件 L14-L84
- **Completion Evidence**:
  - 已核实：L14 `max-w-5xl mx-auto`；L15 `mb-6`；L23/34/69/84 四张卡片均为 `p-5 md:p-6`。

## Task 5: ProjectDetailPage 紧凑化
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - 三处容器（loading L153、error L169、正常态 L220）由 `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8` 改为 `max-w-7xl mx-auto`（padding 由 Layout 统一提供）；loading/error 内部 `py-12` 居中留白保留。
  - 标题卡片（L246）`p-6` → `p-4 md:p-5`；项目大标题（L249）`text-3xl` → `text-2xl`。
  - 数据集信息面板（L277）`p-6` → `p-4 md:p-5`；信息网格（L279）`gap-6` → `gap-4 md:gap-6`。
  - Tab 内容区（L311）`mt-6` → `mt-4 md:mt-5`。
  - 分析结论面板（L356）`p-6` → `p-4 md:p-5`；结论标题（L357）`mb-6` → `mb-4`。
  - 图表面板（L448）已是 `p-4`，保持不变。
  - 仅改尺寸/间距/字号类，不改任何逻辑与配色。
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-5
- **Test Requirements**:
  - `rule` TR-5.1: ProjectDetailPage 三处容器无 `px-*`/`py-8` 重复 padding；主要面板无裸 `p-6`；大标题为 `text-2xl`；证据：grep 与改后文件审查
  - `rubric` TR-5.2: 详情页 1366×768 视觉密度；scale 1-5；anchors 1=仍溢出/挤压，3=完整显示但局部偏松，5=密度舒适首屏信息完整；threshold >= 4；证据：1366×768 详情页截图
- **Completion Evidence**:
  - 三处容器（L153/L169/L220）均为 `max-w-7xl mx-auto`，重复 padding 已移除。
  - L246 标题卡片 `p-4 md:p-5`、L249 大标题 `text-2xl`；L277 信息面板 `p-4 md:p-5`、L279 网格 `gap-4 md:gap-6`；L311 Tab 内容 `mt-4 md:mt-5`；L356 结论面板 `p-4 md:p-5`、L357 标题 `mb-4`。
  - grep 复核：无裸 `p-6`/`p-8`/`text-3xl`/`px-4 sm:px-6`/`py-8` 残留（仅响应式 `md:gap-6`）。
  - 注：实施中发现同文件并行 Edit 会互相覆盖，改为串行编辑后全部生效。

## Task 6: 子组件、PowerBIPage 与全局溢出保险
- **Status**: `completed`
- **Priority**: medium
- **Depends On**: Task 1
- **Description**:
  - [TabNavigation.tsx](file:///d:/my_project/data-composition/src/components/TabNavigation.tsx) L92：导航栏 `px-6` → `px-4 md:px-6`；nav 增加 `overflow-x-auto scrollbar-hide` 小屏横向滚动保护（桌面外观不变）。
  - [SmartAnalysis.tsx](file:///d:/my_project/data-composition/src/components/SmartAnalysis.tsx) L334：卡片网格 `gap-6` → `gap-4 md:gap-5`。
  - [index.css](file:///d:/my_project/data-composition/src/index.css) `@layer base` 的 body 规则增加 `overflow-x: hidden;` 作为全局兜底保险。
  - DataTable / DataCleaning 内部面板已是 `p-4`，不改动。
  - **范围补充（实施时发现）**：[PowerBIPage.tsx](file:///d:/my_project/data-composition/src/pages/PowerBIPage.tsx) 挂在 `/powerbi` 路由（导航栏无入口但 URL 可访问），存在同样的重复 padding 与过大类名，按相同规则一并收紧：容器去重 padding、`mb-8`→`mb-6`、标题 `text-3xl`→`text-2xl`、副标题 `text-lg`→`text-base`、三张卡片 `p-6`→`p-4 md:p-5`、步骤网格 `gap-6`→`gap-4 md:gap-6`。
  - MobileMenu.tsx / Sidebar.tsx 为未被引用的死代码（Layout 使用内建侧边栏），不改动。
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-6, AC-7
- **Test Requirements**:
  - `rule` TR-6.1: TabNavigation 导航栏为 `px-4 md:px-6` 且含横向滚动保护；SmartAnalysis 网格为 `gap-4 md:gap-5`；index.css body 含 `overflow-x: hidden`；证据：改后文件审查
  - `rule` TR-6.2: 不出现 `zoom`/`scale()`/根 font-size 重写；证据：全局 grep
- **Completion Evidence**:
  - TabNavigation L92 已为 `px-4 md:px-6 overflow-x-auto scrollbar-hide`；SmartAnalysis L334 已为 `gap-4 md:gap-5`；index.css L63 body 已含 `overflow-x: hidden`。
  - PowerBIPage L6/L8/L9/L12/L18/L51/L91/L95 全部按规则收紧；grep 复核无裸 `p-6`/`text-3xl` 残留。
  - 全局 grep 确认无 `zoom`、`transform: scale()`、根 font-size 重写；index.html viewport 保持 `width=device-width, initial-scale=1.0`。

## Task 7: 验证（tsc + build + 浏览器溢出与窄屏检查）
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 5, Task 6
- **Description**:
  - 运行 `npx tsc --noEmit` 与 `npx vite build`，确认零错误。
  - 启动/复用本地 dev server，用浏览器自动化在 1366×768 视口下访问 /home、/projects、/about、/project/:id，检测 `scrollWidth <= clientWidth` 并截图目检。
  - 在 375×667 移动视口下抽查 /home 与 /project/:id，确认无水平滚动、布局不退化。
  - 输出验证证据，通知用户本地预览确认；**不执行 git commit/push**。
- **Acceptance Criteria Addressed**: AC-1, AC-4, AC-5, AC-6
- **Test Requirements**:
  - `rule` TR-7.1: `npx tsc --noEmit` 退出码 0；证据：命令输出
  - `rule` TR-7.2: `npx vite build` 退出码 0；证据：命令输出
  - `rule` TR-7.3: 1366×768 下四页面 `scrollWidth <= clientWidth` 全部为 true；证据：浏览器控制台检测结果
  - `rule` TR-7.4: 375px 视口下 /home 与 /project/:id `scrollWidth <= clientWidth` 为 true 且目检无错位；证据：浏览器检测与截图
  - `rubric` TR-7.5: 四页面桌面视觉密度；scale 1-5；anchors 同 AC-5；threshold >= 4；证据：1366×768 截图与用户预览反馈
- **Completion Evidence**:
  - TR-7.1 `rule`：`npx tsc --noEmit` 退出码 0（修改前后各跑一次均通过）。
  - TR-7.2 `rule`：`npx vite build` 成功（✓ built in 2.21s，939 modules）；仅有既有的字体运行时解析提示与 chunk >500kB 警告，与本次修改无关。
  - TR-7.3 `rule`：浏览器自动化检测（dev server http://localhost:5173/）——/home、/projects、/about、/powerbi 在约 998px 视口下 scrollWidth 均等于 clientWidth（990/998），无水平溢出；详情页通过 IndexedDB 注入测试数据集后验证，数据表格/数据清洗/分析结论/智能分析/可视化分析 5 个 Tab 在 544-892px 视口下 scrollWidth 均等于 clientWidth。
  - TR-7.4 `rule`：约 552px 窄视口下 /home、/about、/project/:id 三页面 scrollWidth=544=clientWidth，无溢出；首页卡片单栏堆叠；Tab 按钮 5 个全部单行显示（isSingleLine 全 true），Tab 容器 scrollWidth=639 > clientWidth=512 证明 overflow-x-auto 横向滚动保护生效、无折行。
  - TR-7.5 `rubric`：自评 4/5。截图目检（home-with-data、detail-table、detail-smart、about-desktop、projects-mobile 等 11 张）显示卡片内边距、统计数字（text-2xl）、标题字号均明显收紧，密度均匀，无挤压/重叠/文字裁切/按钮错行。未给满分原因：浏览器代理环境无法精确设置 1366×768 视口（实测 544-998px），但全站布局均为 max-width 约束 + 流式网格，更窄视口不溢出则更宽视口只会居中留白、不可能溢出；最终视觉密度由用户在本机 1366 屏预览确认（用户明确要求本地预览后再推送）。
  - 额外修复：目检发现窄屏下 Tab 按钮文字被压缩折行，已为 Tab 按钮补充 `shrink-0 whitespace-nowrap`（配合 nav 的 overflow-x-auto scrollbar-hide），复验通过。
