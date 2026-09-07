# 全局布局进一步紧凑化（第二轮）- 产品需求文档

## Overview
- **Summary**: 在上一轮布局紧凑化基础上，进一步缩小卡片内边距、统计数字字号、区块标题字号与网格间距，使 1366×768 / 100% 缩放视口下首屏可见内容更多、无需滚动即可看到核心信息。
- **Purpose**: 上一轮调整后用户仍感觉统计数字、卡片内边距偏大，需要再收紧一档以达到笔记本屏一屏完整展示的目标。
- **Target Users**: 1366×768 笔记本及以上分辨率用户。

## Goals
- 统计卡片数字由 `text-2xl` → `text-xl`。
- 统计卡片、数据集卡片、文件夹卡片、各页面板内边距统一由 `p-4`/`p-4 md:p-5` → `p-3`/`p-3 md:p-4`。
- 页面/区块标题字号整体再降一档（`text-3xl md:text-4xl` → `text-2xl md:text-3xl`，`text-2xl` → `text-xl`）。
- 网格间距 `gap-4/gap-5/gap-6` 收紧一档（→ `gap-3/md:gap-4`）。
- 容器宽度不超过视口，无水平滚动。

## Non-Goals
- 不改变功能、配色、形状、动效。
- 不改 Header、封面页、ECharts 280px 高度、pt-20 约定。
- 不 commit/push，待用户本地预览确认。

## Background & Context
- 上一轮 spec `optimize-global-layout-density` 已完成并通过独立审查（Review R1: pass）。
- 当前实际类名（已核对代码）：
  - 首页统计数字 `text-2xl`（L323/331/339）、统计卡 `p-4`（L320/328/336）
  - 首页数据集卡 `p-4`（L452）、文件夹卡 `p-4`（L377）
  - 首页 hero 标题 `text-3xl md:text-4xl`（L255）、"我的数据集" 区块标题已是 `text-xl`（L267）
  - 各页面板 `p-4 md:p-5`，网格 `gap-3 md:gap-4` / `gap-4 md:gap-5` / `gap-4 md:gap-6`
- Layout 内容包装层 `p-4 md:p-6`。

## Functional Requirements
- **FR-1**: HomePage 统计数字 `text-2xl` → `text-xl`；统计卡 `p-4` → `p-3`；统计网格 `gap-3 md:gap-4` → `gap-2 md:gap-3`。
- **FR-2**: HomePage 数据集卡与文件夹卡 `p-4` → `p-3`；数据集网格 `gap-4` → `gap-3 md:gap-4`；文件夹网格 `gap-3` → `gap-2 md:gap-3`。
- **FR-3**: HomePage hero 标题 `text-3xl md:text-4xl` → `text-2xl md:text-3xl`；主内容卡片容器 `p-4 md:p-6` → `p-3 md:p-5`。
- **FR-4**: ProjectListPage / AboutPage / PowerBIPage / ProjectDetailPage 的页面大标题 `text-2xl` → `text-xl`；各面板/卡片 `p-4 md:p-5` → `p-3 md:p-4`；网格间距收紧一档。
- **FR-5**: ProjectDetailPage 结论卡片 `gap-4 p-4` → `gap-3 p-3`；结论列表 `space-y-4` → `space-y-3`。
- **FR-6**: Layout 内容包装层 `p-4 md:p-6` → `p-3 md:p-5`，给内容区更多横向空间。
- **FR-7**: 所有页面级容器确认 `max-w-*` 约束存在且无固定像素宽度撑破视口；root/body `overflow-x-hidden` 保持。

## Non-Functional Requirements
- **NFR-1**: 仅改 Tailwind 尺寸类，不改逻辑与配色。
- **NFR-2**: `npx tsc --noEmit` 与 `npx vite build` 通过。
- **NFR-3**: 移动端（<768px）不退化：基础类仍紧凑，`md:` 前缀类只在桌面放宽。

## Acceptance Criteria

### AC-1: 统计数字与卡片内边距收紧
- **Type**: `rule`
- **Given**: HomePage 统计区、数据集卡、文件夹卡
- **When**: grep 类名
- **Then**: 统计数字为 `text-xl`；统计卡/数据集卡/文件夹卡为 `p-3`；无裸 `p-4` 残留于这些卡片
- **Pass Condition**: grep 验证通过
- **Evidence**: grep 结果

### AC-2: 标题字号统一降一档
- **Type**: `rule`
- **Given**: 四个内页 + PowerBIPage 的页面大标题
- **When**: grep
- **Then**: HomePage hero 为 `text-2xl md:text-3xl`；其余页面大标题为 `text-xl`；无裸 `text-3xl`/`text-2xl` 大标题残留（响应式除外）
- **Pass Condition**: grep 验证通过
- **Evidence**: grep 结果

### AC-3: 网格间距收紧一档
- **Type**: `rule`
- **Given**: 所有内容网格
- **When**: grep `gap-`
- **Then**: 原 `gap-4` → `gap-3`，原 `gap-5/gap-6` → `gap-4`（响应式 md: 类同步收紧）；无 `gap-6` 残留于内容网格
- **Pass Condition**: grep 验证
- **Evidence**: grep 结果

### AC-4: 类型检查与构建通过
- **Type**: `rule`
- **Given**: 修改完成
- **When**: 运行 `npx tsc --noEmit` 与 `npx vite build`
- **Then**: 均退出码 0
- **Pass Condition**: 命令无错误
- **Evidence**: 命令输出

### AC-5: 1366 视口无水平溢出且首屏信息密度提升
- **Type**: `rubric`
- **Dimension**: 1366×768 视觉密度
- **Scale**: 1-5
- **Anchors**: 1=仍溢出/过大；3=完整但偏松；5=首屏可见统计卡+多数据集卡片，密度舒适无溢出
- **Pass Threshold**: >= 4
- **Evidence**: 浏览器检测 `scrollWidth <= clientWidth` + 截图 + 用户预览

### AC-6: 移动端不退化
- **Type**: `rule`
- **Given**: 550px 窄屏
- **When**: 访问 /home 与 /project/:id
- **Then**: `scrollWidth <= clientWidth`，卡片单栏，文字不折行错乱
- **Pass Condition**: 浏览器检测通过
- **Evidence**: 浏览器检测

## Open Questions
- 无
