# 智能分析 Tab 改造为 WorkBuddy 分析占位页 Spec

## Why
项目详情页的「智能分析」Tab 当前渲染自动图表分析组件，运行时报错且功能不稳定。需要将该 Tab 改造为一个稳定的占位页：重命名为「WorkBuddy 分析」，清空原有分析逻辑，改为「图表展示区」+「代码展示区」两个占位区域，为后续接入 WorkBuddy 分析能力留出位置。

## What Changes
- 将 Tab 导航标签「智能分析」改为「WorkBuddy 分析」（Tab key 仍为 `smart`，URL `?tab=smart` 不变）。
- 移除 `smart` Tab 内的 `SmartAnalysis` 组件渲染，替换为两个占位卡片。
- **删除** `src/components/SmartAnalysis.tsx`（原有 ECharts 自动分析逻辑整体清空，全仓库仅被 ProjectDetailPage 引用）。
- 占位卡片沿用「可视化分析」Tab 的卡片视觉：`bg-[#26262C]` 容器 + `border-[#3A3A44]` + 居中标题 + `text-[#9CA3AF]` 说明文字。
- 数据表格 Tab 仍使用 `rawData` 渲染 `DataTable`（保持不动）。

## Impact
- Affected specs: 项目详情页 Tab 导航与内容区（`smart` 能力被替换为占位页）
- Affected code:
  - `src/components/TabNavigation.tsx`（Tab 标签文案）
  - `src/pages/ProjectDetailPage.tsx`（删除 import、替换 smart Tab 内容）
  - `src/components/SmartAnalysis.tsx`（删除）

## ADDED Requirements
### Requirement: WorkBuddy 分析占位页
系统 SHALL 在 `smart` Tab 中展示两个占位区域，并沿用可视化分析 Tab 的卡片样式。

#### Scenario: 进入 WorkBuddy 分析 Tab
- **WHEN** 用户点击「WorkBuddy 分析」Tab
- **THEN** 页面依次展示「图表展示区」与「代码展示区」两张卡片：卡片容器为 `bg-[#26262C]`、`rounded-lg`、`border border-[#3A3A44]`、`p-2`，标题为 `text-lg font-semibold text-white` 居中；卡片内部为虚线边框占位框（`border-dashed border-[#3A3A44]`、`bg-[#1E1E24]`），内含 `text-[#9CA3AF]` 的占位说明文字
- **AND** 页面不出现任何 ECharts 图表、统计数据或分析交互

#### Scenario: 占位区顺序与高度
- **WHEN** 进入该 Tab
- **THEN** 「图表展示区」在上、「代码展示区」在下；图表占位框最小高度不低于 240px，代码占位框最小高度不低于 180px

### Requirement: Tab 标签重命名
系统 SHALL 将该 Tab 的可见文案改为「WorkBuddy 分析」。

#### Scenario: 标签展示
- **WHEN** 用户查看 Tab 导航
- **THEN** 该 Tab 显示为「WorkBuddy 分析」，点击后 URL 变为 `?tab=smart`，选中态样式与其他 Tab 一致

## MODIFIED Requirements
### Requirement: 项目详情页 Tab 内容
`smart` Tab 由「SmartAnalysis 自动分析视图」改为「WorkBuddy 分析占位视图」；其他 Tab（数据表格 / 数据清洗 / 分析结论 / 可视化分析）渲染逻辑保持不变。

## REMOVED Requirements
### Requirement: SmartAnalysis 自动分析组件
**Reason**: 组件运行时出错，且用户要求清空该 Tab 原有代码逻辑，改为占位结构。
**Migration**: 删除 `src/components/SmartAnalysis.tsx` 与 `ProjectDetailPage.tsx` 中的 `SmartAnalysis` 引入与渲染；`rawData` 继续由数据表格 Tab 使用，不删除。

## Non-Goals
- 不实现任何真实的 WorkBuddy 分析逻辑、图表渲染或代码编辑器。
- 不修改 Tab key、路由参数、Tab 图标（保留现有 🤖 图标）。
- 不修改其他 Tab、数据加载逻辑、IndexedDB 结构、`package.json` 依赖（`echarts` 仍被 `src/components/charts/*` 使用）。

## Acceptance Criteria

### AC-1: Tab 标签为「WorkBuddy 分析」
- **Type**: rule
- **When**: 打开任意数据集详情页
- **Then**: Tab 导航中不再出现「智能分析」文案，出现「WorkBuddy 分析」，点击后 `?tab=smart`
- **Evidence**: 源码检查 + 浏览器 DOM 断言

### AC-2: 原有分析逻辑已清空
- **Type**: rule
- **When**: 检查源码
- **Then**: `src/components/SmartAnalysis.tsx` 不存在；`ProjectDetailPage.tsx` 不再 import 或渲染 `SmartAnalysis`；`smart` Tab 内无 ECharts 组件
- **Evidence**: 源码检查 + `npx tsc --noEmit` 退出码 0

### AC-3: 两个占位区域存在且样式与可视化分析一致
- **Type**: rule
- **When**: 进入「WorkBuddy 分析」Tab
- **Then**: DOM 中存在「图表展示区」与「代码展示区」两张卡片，顺序为图表在上、代码在下；卡片类名与「可视化分析」Tab 卡片一致（`bg-[#26262C]`、`border-[#3A3A44]`、`rounded-lg`）
- **Evidence**: 浏览器 DOM 断言（属性/类名）

### AC-4: 其他 Tab 与编译不受影响
- **Type**: rule
- **When**: 依次切换数据表格 / 数据清洗 / 分析结论 / 可视化分析
- **Then**: 各 Tab 渲染与行为不变；控制台无 error
- **Evidence**: 浏览器验证 + console 检查

---

## 追加需求（2026-11-01）：填充 WorkBuddy 分析的内容

### Why
上一轮只放置了两个空占位区。本轮把占位区替换为真实内容：顶部展示 WorkBuddy 生成的图表图片，底部展示 WorkBuddy 生成的处理与可视化代码，让该 Tab 成为一份可阅读的成果记录。

### What Changes
- 「图表展示区」：占位虚线框替换为图片 `/images/城市1_WorkBuddy图.png`，图片居中，样式沿用「可视化分析」Tab（`w-full max-h-[500px] object-contain rounded`），卡片标题仍为「图表展示区」。
- 「代码展示区」：卡片标题改为「WorkBuddy 生成的数据处理与可视化代码」；占位框替换为只读代码块（`<pre>`），代码区设置 `max-h-[400px]` + `overflow-y-auto`（超长代码在框内滚动，不撑高页面）。
- 新增模块级常量 `WORKBUDDY_CODE`，原样保存用户提供的 Python 脚本（不修改任何字符）。
- **资源修正**：`public/images/` 下实际文件名为 `城市1_WorkBuddy图.png.png`（双扩展名），而需求路径为 `/images/城市1_WorkBuddy图.png`。本轮的图片路径以需求为准，因此把该文件复制一份为 `public/images/城市1_WorkBuddy图.png`（保留原文件，不删除）。

### 追加 Requirement: WorkBuddy 成果内容展示
系统 SHALL 在 WorkBuddy 分析 Tab 展示图表图片与生成代码。

#### Scenario: 查看图表
- **WHEN** 进入 WorkBuddy 分析 Tab
- **THEN** 「图表展示区」卡片内渲染 `/images/城市1_WorkBuddy图.png`，图片加载成功（HTTP 200），居中展示、不超出卡片宽度

#### Scenario: 查看与滚动代码
- **WHEN** 进入 WorkBuddy 分析 Tab
- **THEN** 「代码展示区」卡片标题为「WorkBuddy 生成的数据处理与可视化代码」，代码区为等宽字体的只读代码块，最大高度 400px 且纵向可滚动，内容与用户提供的脚本逐字一致（首行 `import pandas as pd`，末行 `plt.close(fig)`）

### 追加 Non-Goals
- 不实现代码编辑、复制按钮或运行能力。
- 不为其他数据集提供独立图片/代码映射（图片与代码固定为城市1 的 WorkBuddy 成果）。
- 不修改其他 Tab 与数据加载逻辑。

### 追加 Acceptance Criteria
#### AC-5: 图片正常展示
- **Type**: rule
- **When**: 进入 `?tab=smart`
- **Then**: 卡片内出现 `img[src="/images/城市1_WorkBuddy图.png"]`，且图片无 404、视觉上居中显示
- **Evidence**: 浏览器 DOM/HTTP + 网络请求状态

#### AC-6: 代码块标题、滚动与内容
- **Type**: rule
- **When**: 进入 `?tab=smart`
- **Then**: 标题为「WorkBuddy 生成的数据处理与可视化代码」；代码区 `max-height: 400px`、`overflow-y: auto`；代码首行 `import pandas as pd`、含 `MultipleLocator` 与 `plt.close(fig)`，字符数与用户提供脚本一致
- **Evidence**: DOM 属性断言 + 源码比对
