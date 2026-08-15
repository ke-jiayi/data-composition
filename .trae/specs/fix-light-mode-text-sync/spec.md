# 修复白天模式文字颜色同步 - Spec

## Why
切换到白天模式时，部分文字颜色未从白色/浅色切换为深色（`text-gray-100`、`text-[#fafafa]`、`text-[#a3a3a3]` 缺少覆盖规则），导致浅色背景上文字不可见。同时正文文字色需调整为 `#374151` 以降低曝光感。

## What Changes
- 修改 `src/index.css` 浅色主题覆盖规则：
  - 新增缺失的文字色覆盖：`text-gray-100`、`text-gray-500/600/700/800/900`、`text-[#fafafa]`、`text-[#a3a3a3]`
  - 更新正文色：`text-[#D1D5DB]` 覆盖从 `#4B5563` → `#374151`
  - 新增代码编辑器例外：`bg-gray-900` 上的 `text-gray-100` 保持浅色
  - 新增半透明背景覆盖：`bg-white/5`、`bg-white/10` 在浅色模式下调为浅灰
  - 新增 PowerBIPage 暗色背景覆盖：`bg-[#262626]` → `#F0F0F4`，`border-[#303030]` → `#E5E7EB`

## Impact
- Affected specs: `add-theme-toggle-slider`（浅色覆盖规则的补全）
- Affected code: `src/index.css`（仅此文件）

## ADDED Requirements

### Requirement: 白天模式文字颜色完整覆盖
系统 SHALL 在白天模式下将所有白色/浅色文字类覆盖为深色，确保浅色背景上文字可读。

#### Scenario: text-gray-100 在白天模式切换为深色
- **WHEN** 主题为白天模式
- **THEN** `text-gray-100` 文字变为 `#374151`（深灰）
- **EXCEPT** 代码编辑器（`bg-gray-900` 元素上的 `text-gray-100`）保持 `#F3F4F6` 浅色

#### Scenario: text-[#fafafa] 在白天模式切换为深色
- **WHEN** 主题为白天模式
- **THEN** `text-[#fafafa]` 文字变为 `#1A1A1E`（接近黑色）

#### Scenario: 正文文字色调整为 #374151
- **WHEN** 主题为白天模式
- **THEN** `text-[#D1D5DB]` 文字色为 `#374151`（非 `#4B5563`）

## MODIFIED Requirements

### Requirement: index.css 浅色主题覆盖规则
在现有 `Light Theme Overrides` 段中补充以下规则：

**新增文字色覆盖：**
- `html.light .text-gray-100` → `#374151`（代码编辑器例外见下）
- `html.light .text-gray-500` → `#6B7280`
- `html.light .text-gray-600` → `#4B5563`
- `html.light .text-gray-700` → `#374151`
- `html.light .text-gray-800` → `#1F2937`
- `html.light .text-gray-900` → `#1A1A1E`
- `html.light .text-\[\#fafafa\]` → `#1A1A1E`
- `html.light .text-\[\#a3a3a3\]` → `#6B7280`

**更新现有覆盖：**
- `html.light .text-\[\#D1D5DB\]` → `#374151`（原 `#4B5563`）

**代码编辑器例外（保持浅色文字）：**
- `html.light .bg-gray-900.text-gray-100` → `#F3F4F6`（同元素同时有 bg-gray-900 和 text-gray-100）

**新增背景/边框覆盖：**
- `html.light .bg-\[\#262626\]` → `#F0F0F4`
- `html.light .border-\[\#303030\]` → `#E5E7EB`
- `html.light .bg-white\/5` → `rgba(0, 0, 0, 0.03)`
- `html.light .bg-white\/10` → `rgba(0, 0, 0, 0.05)`

## REMOVED Requirements
无
