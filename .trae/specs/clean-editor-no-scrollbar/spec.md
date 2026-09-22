# 代码编辑器去滚动条与拖拽手柄 Spec

## Why
数据清洗 Tab 的代码 textarea 未设 `resize:none`（浏览器 UA 默认绘制右下角拖拽手柄）且 overflow 为默认 `auto`（上次改动移除 overflow-hidden 所致），任何 1px 高度舍入偏差都会显示右侧滚动条。用户要求：无滚动条、无拖拽手柄、高度自适应内容完整显示。

## What Changes
- 代码 textarea（L447）className 增加 `resize-none` 与 `overflow-hidden`；其余类名不变。
- 高度自适应机制已就位（fit() + code 变化 + window resize 监听，L179-190），无需改动；无 max-height，父容器无高度限制。

## Impact
- Affected code: 仅 src/pages/ProjectDetailPage.tsx L447（一行）

## MODIFIED Requirements

### Requirement: 代码编辑器样式
The code editor SHALL show no scrollbar and no resize handle, with height fully fitting the content.

#### Scenario: 打开数据清洗 Tab
- **WHEN** 打开 chartMeta 存在的数据集的数据清洗 Tab
- **THEN** computed resize 为 none、overflowY 为 hidden、scrollHeight <= clientHeight（内容完整）、maxHeight 为 none

#### Scenario: 编辑与保存保留
- **WHEN** 检查代码卡片
- **THEN** textarea 可编辑（onChange/ref 保留），"保存修改"按钮原样

## Non-Goals
- 不改结论 Tab textarea（L486，min-h-[80px] resize-y 为独立设计）。
- 不改卡片容器 L430 的 overflow-hidden（圆角 cosmetic 裁剪，无高度限制，内容撑高不受影响）。
- 不改 fit() 自适应高度逻辑（已含 resize 监听）。

## Acceptance Criteria

### AC-1: 无滚动条、无手柄、完整显示
- **Type**: `rule`
- **Given**: 城市2 数据清洗 Tab
- **When**: 页面加载完成
- **THEN**: computed resize='none'、overflowY='hidden'、maxHeight='none'、scrollHeight<=clientHeight、代码含"城市2.xlsx"
- **Evidence**: 浏览器 DOM 断言

### AC-2: 父容器无高度限制
- **Type**: `rule`
- **When**: 检查 textarea 各级祖先
- **THEN**: 无 maxHeight 限制（逐级 computed maxHeight 为 none）
- **Evidence**: 浏览器 DOM 断言

### AC-3: 编辑与保存保留
- **Type**: `rule`
- **When**: 检查 DOM
- **THEN**: textarea readOnly=false/disabled=false；"保存修改"按钮存在
- **Evidence**: 浏览器 DOM 断言

### AC-4: 编译通过
- **Type**: `rule`
- **When**: npx tsc --noEmit
- **THEN**: 退出码 0
- **Evidence**: tsc 输出

## Open Questions
- 无。
