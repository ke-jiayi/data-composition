# 项目详情页图片动态匹配重构 Spec

## Why
目前「可视化分析」与「WorkBuddy 分析」图片路径由 `CHART_MAP` 硬编码映射，新增数据集/图片时必须改代码。希望改为按数据集名称拼接路径，后续只要把图片按 `{数据集名}_手工图.png` / `{数据集名}_WorkBuddy图.png` 命名放入 `public/images`，页面即可自动加载。

## What Changes
- 删除 `ChartMeta` 接口、`CHART_MAP` 映射表与 `resolveChartMeta()` 函数（彻底移除图片映射）。
- 原 `CHART_MAP` 中的默认 Python 代码拆成独立 `CODE_MAP` + `resolveDefaultCode()`，用于「数据清洗」Tab 中数据集未保存代码时的回退。
- 「可视化分析」Tab 图片改为动态拼接：
  - `src={`/images/${dataset.name}_手工图.png`}`
  - 标题改为动态 `${dataset.name} 可视化图表`
  - 图片加载失败时回退到原有「暂无可视化图表」空态提示（保留无图数据集的原行为）
- 「WorkBuddy 分析」Tab 图片改为动态拼接：
  - `src={`/images/${dataset.name}_WorkBuddy图.png`}`
  - alt 改为动态 `${dataset.name} WorkBuddy 分析图`
  - 图片加载失败时显示「暂无 WorkBuddy 图表」提示
- **资源调整**：将 `public/images/城市2_柱状图.png` 重命名为 `public/images/城市2_手工图.png`，使城市2 符合新命名约定且可视化图仍正常显示。
- 「数据清洗」Tab 代码卡片的显示条件由 `chartMeta` 改为「数据集有已保存代码或存在默认代码」，保持无代码数据集（如农村1）不渲染代码卡片的既有行为。

## Impact
- Affected specs: 项目详情页「可视化分析」Tab 图表图片、「WorkBuddy 分析」Tab 图表图片、「数据清洗」Tab 代码回退
- Affected code:
  - `src/pages/ProjectDetailPage.tsx`（删除 `CHART_MAP` / `ChartMeta` / `resolveChartMeta`，新增 `CODE_MAP` / `resolveDefaultCode`，改造两个 Tab 的图片与代码卡片条件）
  - `public/images/`（`城市2_柱状图.png` → `城市2_手工图.png`）

## ADDED Requirements
### Requirement: 图片路径按数据集名称动态拼接
系统 SHALL 根据当前数据集名称动态拼接图片路径，不再依赖任何图片映射表。

#### Scenario: 城市1 查看两类图表
- **WHEN** 打开名称为「城市1」的数据集详情页
- **THEN** 「可视化分析」Tab 渲染 `/images/城市1_手工图.png`，「WorkBuddy 分析」Tab 渲染 `/images/城市1_WorkBuddy图.png`，且两张图片均加载成功

#### Scenario: 城市2 查看两类图表
- **WHEN** 打开名称为「城市2」的数据集详情页
- **THEN** 「可视化分析」Tab 渲染 `/images/城市2_手工图.png`（由原 `城市2_柱状图.png` 改名而来），「WorkBuddy 分析」Tab 渲染 `/images/城市2_WorkBuddy图.png`，均加载成功

#### Scenario: 新增图片无需改代码
- **WHEN** 新增名称为「农村1」的数据集，并把 `农村1_手工图.png`、`农村1_WorkBuddy图.png` 放入 `public/images`
- **THEN** 无需修改任何代码，两个 Tab 即自动加载对应图片

#### Scenario: 图片缺失时的回退
- **WHEN** 数据集对应图片文件不存在（加载失败）
- **THEN** 「可视化分析」Tab 显示原有「暂无可视化图表，请先上传并分析数据」空态提示；「WorkBuddy 分析」Tab 显示「暂无 WorkBuddy 图表」提示，不出现空白/破图残留

## MODIFIED Requirements
### Requirement: 数据清洗 Tab 代码回退
系统 SHALL 在数据集存在已保存代码或命中 `CODE_MAP` 默认代码时渲染「数据清洗与可视化代码」卡片；代码回退逻辑与图片映射完全解耦。

#### Scenario: 城市1 / 城市2 默认代码
- **WHEN** 数据集未保存过代码，且名称为「城市1」或「城市2」
- **THEN** 代码输入框预填对应默认 Python 脚本（原有示例代码内容不变），「保存修改」按钮与三态文案行为不变

#### Scenario: 无代码数据集
- **WHEN** 数据集无已保存代码且未命中 `CODE_MAP`（如农村1）
- **THEN** 不渲染代码卡片（与改动前一致）

## REMOVED Requirements
### Requirement: 图片硬编码映射
**Reason**: 每次新增图片都要改代码，维护成本高且易出现路径 404。
**Migration**: 删除 `ChartMeta` / `CHART_MAP` / `resolveChartMeta`；图片统一按 `public/images/{数据集名}_手工图.png` 与 `{数据集名}_WorkBuddy图.png` 命名；城市2 现有图片重命名为 `城市2_手工图.png`。

## Non-Goals
- 不改变 Tab 顺序、Tab key、URL 参数。
- 不改变图表卡片、WorkBuddy 代码块的整体样式与布局。
- 不引入图片存在性探测接口（自动扫描 `public/images` 目录）或后端；仅依靠浏览器加载失败回退。
- 不执行任何 git commit / push。
