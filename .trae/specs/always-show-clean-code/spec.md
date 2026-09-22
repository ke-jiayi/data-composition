# 数据清洗代码区常显（移除折叠） Spec

## Why
"数据清洗"Tab 的代码块目前默认折叠，需点击标题才能展开。用户希望代码直接完整显示，无需任何折叠/展开操作，同时保留"保存修改"按钮与可编辑能力。

## What Changes
- 移除折叠状态 `showCleanCode` 及其重置 effect（[id] effect 中仅剩 setShowCleanCode，整体删除）。
- 折叠头按钮（▶/▼ + hover 变色）改为静态标题"数据清洗与可视化代码"；"保存修改"按钮原样保留。
- 代码 textarea 从条件渲染改为始终渲染；保留 ref + 自适应高度 effect（改为仅依赖 `code`），确保无内部滚动条、完整显示所有代码行。
- 宽度自适应：textarea 保持 `w-full`，默认软换行（不加 wrap="off"），不会出现内部横向滚动条。

## Impact
- Affected code: 仅 src/pages/ProjectDetailPage.tsx（L146-147、L180-191、L431-461）

## ADDED Requirements

### Requirement: 代码区常显
The system SHALL always render the code editor (textarea) in the 数据清洗 Tab without any collapse/expand interaction.

#### Scenario: 直接显示代码
- **WHEN** user opens the 数据清洗 Tab（chartMeta 存在的数据集）
- **THEN** 代码区立即完整显示全部代码，无折叠按钮、无 ▶/▼ 指示、无需点击

#### Scenario: 无映射数据集
- **WHEN** 打开无 chartMeta 的数据集（如农村1）
- **THEN** 整个代码卡片仍不渲染（沿用现有 chartMeta 条件，行为不变）

## MODIFIED Requirements

### Requirement: 折叠头改静态标题
折叠按钮替换为静态标题文本"数据清洗与可视化代码"；"保存修改"按钮位置、样式、三种状态文案（保存中.../✓ 已保存/保存修改）与 handleSaveCode 逻辑完全不变。

### Requirement: 自适应高度去条件
自适应高度 effect 移除 `showCleanCode` 依赖与守卫，仅依赖 `code`；textarea 保持 `overflow-hidden`、无 min-h/固定高度，挂载与内容变化时高度自动等于内容高度。

## REMOVED Requirements

### Requirement: 折叠/展开交互
**Reason**: 用户要求代码直接完整显示，不需要折叠操作。
**Migration**: 删除 showCleanCode 状态、[id] 重置 effect、折叠按钮与条件渲染；无数据迁移。

## Non-Goals
- 不改保存逻辑（handleSaveCode/updateDataset）、编辑能力、DataCleaning 组件、其他 Tab。
- 不改代码卡片外层样式（bg-[#26262C] rounded-lg border）与标题文案。

## Acceptance Criteria

### AC-1: 代码区常显且完整
- **Type**: `rule`
- **Given**: chartMeta 存在的数据集（城市2）
- **When**: 进入数据清洗 Tab（不点击任何东西）
- **Then**: textarea 立即渲染且显示全部代码（值含"城市2.xlsx"），scrollHeight === clientHeight（无内部滚动条），无 ▶/▼ 按钮
- **Evidence**: 浏览器 DOM 断言

### AC-2: 保存功能保留
- **Type**: `rule`
- **When**: 检查代码卡片
- **Then**: "保存修改"按钮存在且 onClick=handleSaveCode、三态文案不变；textarea 可编辑（onChange=setCode 保留）
- **Evidence**: 代码检查 + 浏览器确认按钮存在

### AC-3: 无横向滚动条
- **Type**: `rule`
- **When**: 展开检查 textarea
- **Then**: scrollWidth <= clientWidth（软换行，无内部横向滚动）
- **Evidence**: 浏览器 DOM 断言

### AC-4: 无映射数据集行为不变
- **Type**: `rule`
- **Given**: 农村1（无 chartMeta）
- **When**: 进入数据清洗 Tab
- **Then**: 不渲染代码卡片（与改动前一致）
- **Evidence**: 浏览器 DOM 断言

### AC-5: 编译通过
- **Type**: `rule`
- **When**: npx tsc --noEmit
- **Then**: 退出码 0
- **Evidence**: tsc 输出

## Open Questions
- 无。
