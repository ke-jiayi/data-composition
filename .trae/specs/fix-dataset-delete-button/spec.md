# Fix Dataset Delete Button Spec

## Why
首页数据集卡片删除功能失效：点击删除图标能弹出"确认删除"弹窗，但用真实鼠标点击红色"确认删除"按钮无反应，数据集未被删除。浏览器实测表明用 JS `.click()` 触发该按钮时代码路径完全正常（弹窗关闭、数据集删除、无 console error），但真实鼠标点击失效——根因是真实点击先触发 `mousedown` 事件，被 Layout 的 document 级 `mousedown` 监听器干扰，且数据集删除弹窗缺少文件夹删除弹窗已有的遮罩 onClick + 内部 stopPropagation 保护。

## What Changes
- 数据集删除弹窗的遮罩层增加 `onClick={() => setDeleteTarget(null)}`（点击背景关闭，与文件夹弹窗一致）
- 数据集删除弹窗的内部卡片增加 `onClick={(e) => e.stopPropagation()}`（阻止点击冒泡到遮罩层导致误关闭）
- `handleDelete` 保持不变（代码路径已验证正确：deleteDataset → loadDatasets → setDeleteTarget(null)）

## Impact
- Affected specs: `add-dataset-delete`（原始删除功能 spec，已完成但存在回归 bug）
- Affected code: `src/pages/HomePage.tsx`（L614-639 数据集删除弹窗 JSX）

## ADDED Requirements
无新增需求，为修复现有功能。

## MODIFIED Requirements
### Requirement: 数据集删除确认弹窗
数据集删除确认弹窗 SHALL 与文件夹删除确认弹窗采用一致的事件处理模式：遮罩层点击关闭弹窗，内部卡片阻止冒泡，确保"确认删除"按钮的 click 事件在真实鼠标交互下能可靠触发 handleDelete。

#### Scenario: 真实鼠标点击确认删除
- **WHEN** 用户用鼠标（非 JS 调用）点击数据集卡片的删除图标，弹窗出现后，用鼠标点击红色"确认删除"按钮
- **THEN** handleDelete 被调用，数据集从 IndexedDB 删除，列表刷新，弹窗关闭

#### Scenario: 点击遮罩层关闭弹窗
- **WHEN** 弹窗打开时用户点击遮罩层空白区域
- **THEN** 弹窗关闭（setDeleteTarget(null)），不触发删除

## REMOVED Requirements
无。
