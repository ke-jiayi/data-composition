# 修正城市1 可视化图片路径 Spec

## Why
「可视化分析」Tab 中城市1 的图片显示为破裂图标：`CHART_MAP['城市1'].image` 仍指向旧文件名 `/images/城市价格指数趋势图.png`，该文件在 `public/images/` 中并不存在；同时仓库中实际的图片文件名为 `城市1_手工图.png.png`（双扩展名，资源管理器默认隐藏扩展名后显示为 `城市1_手工图.png`），导致按 `/images/城市1_手工图.png` 访问时 404。

## What Changes
- 把 `CHART_MAP['城市1'].image` 修正为 `/images/城市1_手工图.png`（精确路径，无空格、无旧名字）。
- 将 `public/images/城市1_手工图.png.png` 复制一份为 `public/images/城市1_手工图.png`，使上述路径可被 Vite 静态资源命中（保留原文件，不删除、不改名）。
- 全局检查其他图片路径，确认城市2 `/images/城市2_柱状图.png` 与 WorkBuddy `/images/城市1_WorkBuddy图.png` 均指向存在的文件，无需改动。

## Impact
- Affected specs: 项目详情页「可视化分析」Tab 的图表图片
- Affected code:
  - `src/pages/ProjectDetailPage.tsx`（`CHART_MAP` 城市1 的 `image` 字段）
  - `public/images/`（新增 `城市1_手工图.png`）

## ADDED Requirements
### Requirement: 城市1 图表图片路径精确
系统 SHALL 在「可视化分析」Tab 中渲染 `/images/城市1_手工图.png`。

#### Scenario: 城市1 详情页查看图表
- **WHEN** 打开名称为「城市1」的数据集详情页并切换到「可视化分析」Tab
- **THEN** 页面渲染 `img[src="/images/城市1_手工图.png"]`，图片加载成功（HTTP 200，Content-Type 为 image/png），显示为正常图表而非破裂图标

#### Scenario: 路径全局一致性
- **WHEN** 全局搜索 `src` 下的图片路径
- **THEN** 不存在 `/images/城市价格指数趋势图.png` 等旧文件名，城市1 仅引用 `/images/城市1_手工图.png`

## REMOVED Requirements
### Requirement: 旧图片路径引用
**Reason**: `城市价格指数趋势图.png` 资源不存在，引用导致 404。
**Migration**: 统一改为 `/images/城市1_手工图.png`，并补齐同名资源文件。

## Non-Goals
- 不替换图片内容本身，只修正路径与补齐资源。
- 不修改城市2、WorkBuddy Tab、其他 Tab 及数据加载逻辑。
- 不删除 `public/images/城市1_手工图.png.png` 与 `城市1_WorkBuddy图.png.png` 原始文件。

## Acceptance Criteria

### AC-1: 源码路径精确
- **Type**: rule
- **When**: 全局搜索 `城市价格指数趋势图` 与 `城市1_手工图`
- **Then**: 旧路径不存在；`CHART_MAP['城市1'].image` 恰为 `/images/城市1_手工图.png`
- **Evidence**: Grep 结果

### AC-2: 图片可访问且正常显示
- **Type**: rule
- **When**: 请求 `http://localhost:5173/images/城市1_手工图.png` 并在浏览器打开 `?tab=chart`
- **Then**: HTTP 200 / image/png；浏览器中 `img` 的 `naturalWidth > 0`、`complete = true`，无 console error
- **Evidence**: HTTP 请求 + 浏览器断言

### AC-3: 其他图片与编译不受影响
- **Type**: rule
- **When**: `npx tsc --noEmit` 并切换其他 Tab
- **Then**: 退出码 0；城市2 图表、WorkBuddy Tab 图片与代码、其他 Tab 均正常
- **Evidence**: tsc 输出 + 浏览器验证
