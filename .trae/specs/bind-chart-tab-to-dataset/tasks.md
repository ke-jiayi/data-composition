# Tasks

## Task 1: 重命名城市1 图片资源，消除双扩展名
- **Status**: `completed`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - 将 `public/images/城市价格指数趋势图.png.png` 重命名为 `public/images/城市价格指数趋势图.png`（用 Shell `Rename-Item`，不新增/不删除其他文件）
  - 确认 `城市2_柱状图.png` 仍存在
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `rule` TR-1.1: 目录中存在 `城市价格指数趋势图.png`（单扩展名）且不存在双扩展名文件
- **Completion Evidence**: `Get-ChildItem public/images` 输出仅 `城市2_柱状图.png`、`城市价格指数趋势图.png`，双扩展名文件已不存在。

## Task 2: 新增 CHART_MAP 并改造 chart Tab 按数据集渲染
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - SubTask 2.1: 新增 `ChartMeta` 接口与 `CHART_MAP` 常量（城市1/城市2 两条，含 image/code/title）及 `resolveChartMeta`（trim 精确 + 包含兜底）
  - SubTask 2.2: 状态 `showCity2Code` → `showChartCode`；新增 `useEffect(..., [id])` 切换数据集重置收起
  - SubTask 2.3: 组件内 `const chartMeta = resolveChartMeta(dataset?.name)`
  - SubTask 2.4: chart Tab 改为三元渲染：命中渲染单卡片（标题/居中 img/数据来源）+ 可折叠代码块（标题"数据清洗与可视化代码"）；未命中渲染空状态文案
  - SubTask 2.5: 删除原两张图并列 JSX/Fragment；其他 Tab 未改
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-5, AC-6
- **Test Requirements**:
  - `rule` TR-2.1: 固定 img 路径仅存在于 CHART_MAP —— PASS（grep：城市2_柱状图.png 仅出现在 CHART_MAP L89）
  - `rule` TR-2.2: 空状态文案存在 —— PASS（L552）
  - `rule` TR-2.3: 代码块标题"数据清洗与可视化代码"，showChartCode 控制 —— PASS（L537/540/543）
  - `rule` TR-2.4: `npx tsc --noEmit` 退出码 0 —— PASS（TSC_EXIT_0）
- **Completion Evidence**: tsc 0；代码 diff 仅涉及常量区、状态行、reset effect、chart Tab JSX；其他 Tab JSX 未触碰；PYTHON_CODE 常量保留。

## Task 3: 浏览器验证三个数据集场景
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 2
- **Description**:
  - 浏览器实测城市2、农村1；城市1 记录在此前删除功能调试会话中被测试删除，改用图片资源直连加载 + 代码路径对称性验证
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-4, AC-5
- **Test Requirements**:
  - `rule` TR-3.1: 城市1 图片直连加载成功、src 单扩展名 —— PASS（naturalWidth=3120；映射条目 L83-87 正确，渲染分支与城市2 共享并经实测）
  - `rule` TR-3.2: 城市2 页面 img=1 src=/images/城市2_柱状图.png —— PASS（naturalWidth=1786）
  - `rule` TR-3.3: 农村1 空状态文案存在、main 内 img=0、无代码按钮 —— PASS
  - `rule` TR-3.4: 两图 naturalWidth>0 —— PASS（3120 / 1786）
  - `rubric` TR-3.5: 视觉一致性 —— 5/5；沿用原深色卡片 bg-[#26262C]/border/p-2、同 img 类名、同 pre 样式，空状态卡片同色系居中，无新增风格；阈值 ≥4 通过
- **Completion Evidence**: 城市2 展开代码含"城市2.xlsx"且为唯一 img；折叠三步（无 pre→有 pre→无 pre）通过；农村1 空状态通过。

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 2
