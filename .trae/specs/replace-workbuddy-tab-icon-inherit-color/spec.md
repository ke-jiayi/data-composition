# WorkBuddy Tab 图标改为继承文字色 Spec

## Why
之前两版图标分别存在硬编码蓝色（不随 Tab 选中态变化）和路径形状偏差的问题。本次改为完全继承父级文字颜色（默认灰、选中青），并使用 Remix Icon 官方 `robot-2-fill` 路径。

## What Changes
- 在 `src/components/TabNavigation.tsx` 的 `smart` Tab 中，删除现有整个 `<svg> ... </svg>`（含 `width`/`height`/`viewBox`/旧 `path`/颜色类），整体替换为用户给定的 SVG。
- 新 SVG：`viewBox="0 0 24 24"`、`fill="currentColor"`、`className="w-5 h-5 flex-shrink-0 inline-block mr-1"`，不含任何 `text-[#...]` / `dark:text-[#...]` 硬编码颜色类。
- 颜色改由父级按钮文字色决定（未选中为灰色系，选中为青色系）。
- 保留 `w-5 h-5 flex-shrink-0` 以维持 20×20 尺寸且不被挤压。

## Impact
- Affected specs: 详情页 Tab 导航（WorkBuddy 分析图标）
- Affected code: `src/components/TabNavigation.tsx`

## ADDED Requirements
### Requirement: 图标颜色继承
系统 SHALL 让 WorkBuddy Tab 的 SVG 颜色完全继承所在 Tab 的文字色，不出现独立于选中态的蓝/青色。

#### Scenario: 未选中
- **WHEN** 当前 Tab 不是 WorkBuddy 分析
- **THEN** 图标与「WorkBuddy 分析」文字同为默认灰色系

#### Scenario: 选中
- **WHEN** 当前 Tab 是 WorkBuddy 分析
- **THEN** 图标随文字变为青色系，与文字颜色完全一致

#### Scenario: 形状与尺寸
- **WHEN** Tab 栏渲染
- **THEN** 图标使用用户给定的 Remix Icon `robot-2-fill` 路径，保持 20×20（`w-5 h-5`）且不被 flex 挤压（`flex-shrink-0`）

## MODIFIED Requirements
### Requirement: WorkBuddy Tab 图标
上一版 SVG（`M12 2a2 2 0 0 1 2 2c0 .74...` + `text-[#00B4D8] dark:text-[#6BC5E8]`）被整体删除，替换为新路径且不再包含硬编码颜色。

## Non-Goals
- 不修改其他四个 Tab 的图标与配置。
- 不修改 `TabNavigation` 的渲染逻辑、`gap-2`、`overflow-x-auto`、激活态颜色规则。
- 不新增依赖，不修改 `ProjectDetailPage.tsx`。
- 不执行任何 git commit / push（用户要求在本地预览确认）。
