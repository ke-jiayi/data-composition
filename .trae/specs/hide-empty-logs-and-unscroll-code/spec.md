# 数据清洗 Tab 优化：隐藏空日志 + 代码区去滚动条 Spec

## Why
数据清洗 Tab 的"清洗日志"区域在没有记录时仍显示"暂无清洗记录"占位，视觉冗余；"数据清洗与可视化代码"可折叠区域的 textarea 有固定 min-h-[300px] 且 textarea 内置 overflow:auto，代码较长时出现内部滚动条，阅读不便。需要：空日志时隐藏整个日志区域；代码区去掉高度限制，展开后完全显示。

## What Changes
- DataCleaning.tsx：`logs.length === 0` 时不渲染整个"清洗日志"区域（含 h4 标题、空状态图标与"暂无清洗记录"文案）；仅在 `logs.length > 0` 时渲染日志列表。
- ProjectDetailPage.tsx：代码 textarea 去掉 `min-h-[300px]` 与 `resize-y`；添加 ref + useEffect 自适应高度（展开时 height=scrollHeight，内容变化时重新计算），消除内部滚动条。

## Impact
- Affected code: src/components/DataCleaning.tsx（L198-208）、src/pages/ProjectDetailPage.tsx（L442-448 textarea + 新增 ref/effect）

## ADDED Requirements

### Requirement: 空日志隐藏
The system SHALL hide the entire "清洗日志" section (heading + list + empty state) when there are no clean log records.

#### Scenario: No logs
- **WHEN** user opens the 数据清洗 Tab and the dataset has no clean logs
- **THEN** the "清洗日志" heading and "暂无清洗记录" text are NOT rendered

#### Scenario: Has logs
- **WHEN** clean logs exist
- **THEN** the "清洗日志" heading and log entries render as before

### Requirement: 代码区无内部滚动条
The system SHALL display the full code content without an internal scrollbar when the "数据清洗与可视化代码" section is expanded.

#### Scenario: Expand code block
- **WHEN** user clicks to expand the code block
- **THEN** the textarea auto-resizes to fit all content; no internal scrollbar appears regardless of code length

## MODIFIED Requirements

### Requirement: 代码 textarea 样式
Remove `min-h-[300px]` and `resize-y` from the textarea className; add auto-resize behavior via ref and useEffect. The textarea SHALL NOT have a fixed height or internal scrollbar.

## Non-Goals
- 不改其他 Tab、DataCleaning 的清洗功能、保存逻辑、折叠交互。
- 不改 textarea 的可编辑性（仍可编辑、可保存）。
- 不改日志列表的 `max-h-[300px] overflow-y-auto`（有日志时保留滚动，仅隐藏空状态）。

## Acceptance Criteria

### AC-1: 空日志隐藏整个区域
- **Type**: `rule`
- **Given**: 数据集无清洗日志
- **When**: 进入数据清洗 Tab
- **Then**: DOM 中不存在"清洗日志"文本、不存在"暂无清洗记录"文本
- **Evidence**: 浏览器 DOM 断言

### AC-2: 有日志时正常显示
- **Type**: `rule`
- **Given**: 数据集有清洗日志
- **When**: 进入数据清洗 Tab
- **Then**: "清洗日志"标题与日志条目正常渲染，日志列表 max-h-[300px] overflow-y-auto 保留
- **Evidence**: 代码检查

### AC-3: 代码区无内部滚动条
- **Type**: `rule`
- **When**: 展开代码块
- **Then**: textarea scrollHeight === clientHeight（无内部滚动）；textarea 高度随内容自适应
- **Evidence**: 浏览器 DOM 断言

### AC-4: 编译通过
- **Type**: `rule`
- **When**: npx tsc --noEmit
- **Then**: 退出码 0
- **Evidence**: tsc 输出

## Open Questions
- 无。
