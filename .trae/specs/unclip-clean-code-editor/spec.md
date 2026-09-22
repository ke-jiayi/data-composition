# 数据清洗代码编辑器完整显示修复 Spec

## Why
代码编辑器（textarea）当前用 `overflow-hidden` + 仅依赖 `code` 的自适应高度。窗口宽度变化导致软换行重排时高度不更新，底部代码行被静默裁剪（不可见且无滚动条）。需去掉 overflow 限制并让高度在窗口变化时也能自适应，确保代码任何情况下完整展开显示。

## What Changes
- ProjectDetailPage.tsx 自适应高度 effect（L179-186）：抽出 `fit()`，除 `code` 变化外增加 `window resize` 监听（含清理），宽度变化后重新 fit。
- 代码 textarea（L442）：className 去掉 `overflow-hidden`（浏览器默认 overflow:auto；高度正确时无滚动条，高度短暂过期时可滚动而非裁剪）。

## Impact
- Affected code: 仅 src/pages/ProjectDetailPage.tsx（L179-186、L442）

## MODIFIED Requirements

### Requirement: 代码编辑器完整显示
The code editor in 数据清洗 Tab SHALL fully display all code lines without clipping, under any window width.

#### Scenario: 进入页面
- **WHEN** 打开 chartMeta 存在的数据集的数据清洗 Tab
- **THEN** textarea scrollHeight === clientHeight，全部代码可见，无内部滚动条

#### Scenario: 窗口宽度变化
- **WHEN** 触发 window resize（如改变视口宽度引起软换行重排）
- **THEN** 高度重新自适应，scrollHeight === clientHeight 仍成立，无内容被裁剪

## Non-Goals
- 不改结论 Tab 的 textarea（L474，有独立 min-h-[80px] 设计）。
- 不改卡片容器的 overflow-hidden（L425，圆角裁剪用途）。
- 不改清洗日志列表的 max-h-[300px] overflow-y-auto（日志区，前次 spec 明确保留）。
- 不改保存逻辑与编辑能力。

## Acceptance Criteria

### AC-1: 进入即完整显示
- **Type**: `rule`
- **Given**: 城市2 数据清洗 Tab
- **When**: 页面加载完成
- **THEN**: textarea 存在、值含"城市2.xlsx"、scrollHeight === clientHeight、computed overflowY 为 auto
- **Evidence**: 浏览器 DOM 断言

### AC-2: resize 后仍完整
- **Type**: `rule`
- **When**: dispatch window resize 事件后
- **THEN**: scrollHeight === clientHeight 仍成立
- **Evidence**: 浏览器 DOM 断言

### AC-3: 无 max-height
- **Type**: `rule`
- **When**: 检查代码 textarea
- **THEN**: computed maxHeight 为 none
- **Evidence**: 浏览器 DOM 断言

### AC-4: 编译通过
- **Type**: `rule`
- **When**: npx tsc --noEmit
- **Then**: 退出码 0
- **Evidence**: tsc 输出

## Open Questions
- 无。
