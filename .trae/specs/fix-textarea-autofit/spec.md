# 修复代码 textarea 高度不自适应 Spec

## Why
数据清洗 Tab 的代码 textarea 只显示 2-3 行（浏览器默认 rows=2）。根因：自适应 effect 仅依赖 `[code]`，切换到 clean Tab 时 code 未变化、effect 不重新执行；且同步执行时布局未完成导致 scrollHeight 不准。用户要求用 onChange/onFocus + scrollHeight 实现可靠自适应。

## What Changes
- ProjectDetailPage.tsx fit() effect 依赖增加 `activeTab`（切换到 clean Tab 时重新 fit）；fit() 内改用 requestAnimationFrame 等布局完成后再测 scrollHeight。
- textarea 增加 `onFocus` 处理器调用 fit()（聚焦时确保完整显示）。
- textarea 的 `onChange` 在 setCode 后调用 fit()（编辑时即时自适应）。
- 保留 `resize-none`；保留 `overflow-hidden`（高度正确时无裁剪无滚动条）。

## Impact
- Affected code: 仅 src/pages/ProjectDetailPage.tsx（L179-190 effect、L442-449 textarea）

## MODIFIED Requirements

### Requirement: textarea 高度自适应
The code editor textarea SHALL auto-fit height to show all code lines, on mount, on tab switch, on focus, and on edit.

#### Scenario: 切换到数据清洗 Tab
- **WHEN** code 已加载、用户切换到 clean Tab
- **THEN** textarea 立即展开到全部代码行高度，scrollHeight === clientHeight

#### Scenario: 聚焦编辑
- **WHEN** textarea 获焦或内容变化
- **THEN** 高度即时重新自适应，无 2-3 行截断

## Non-Goals
- 不改保存逻辑、不改 chartMeta 映射、不改其他 Tab。
- 不改结论 Tab textarea。
- 不改卡片容器样式。

## Acceptance Criteria

### AC-1: 切换 Tab 即完整显示
- **Type**: `rule`
- **Given**: 城市2、code 已加载
- **When**: 从其他 Tab 切到 clean Tab
- **THEN**: textarea scrollHeight === clientHeight，代码全部可见，无 2-3 行截断
- **Evidence**: 浏览器 DOM 断言

### AC-2: 聚焦/编辑即时自适应
- **Type**: `rule`
- **When**: textarea 获焦或 onChange 触发
- **THEN**: 高度重新适配，scrollHeight === clientHeight
- **Evidence**: 浏览器 DOM 断言

### AC-3: 无手柄、无滚动条
- **Type**: `rule`
- **When**: 检查 textarea
- **THEN**: resize='none'、overflowY='hidden'、maxHeight='none'
- **Evidence**: 浏览器 DOM 断言

### AC-4: 编译通过
- **Type**: `rule`
- **When**: npx tsc --noEmit
- **THEN**: 退出码 0
- **Evidence**: tsc 输出

## Open Questions
- 无。
