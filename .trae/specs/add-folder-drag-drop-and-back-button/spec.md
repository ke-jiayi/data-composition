# 首页文件夹交互优化 Spec

## Why
进入文件夹后只能通过面包屑的「首页」退出，操作路径不明显；移动数据集到文件夹只能依赖卡片下拉菜单，效率偏低。补充显眼的返回按钮与拖拽移动能力，可显著改善文件夹的使用体验。

## What Changes
- 首页面包屑导航栏最右侧新增「返回首页」按钮（`ml-auto` 靠右、带 `ri-arrow-go-back-line` 图标），仅在进入文件夹后显示；点击清空 `currentFolderId`（并清空搜索词）回到根目录。
- 首页数据集卡片（`<Link>` 卡片）增加 `draggable` 与 `onDragStart`，将数据集 ID 写入 `dataTransfer('text/plain')`。
- 根目录的文件夹卡片增加 `onDragOver`（`preventDefault` 以允许 drop）、`onDragLeave`、`onDrop`；drop 时调用现有 `handleMoveToFolder(datasetId, folder.id)`，内部已执行 `updateDataset` + 刷新列表。
- 拖拽悬停在文件夹卡片上时增加高亮视觉反馈（青色边框 + 轻微发光/背景变化）。

## Impact
- 受影响能力：首页文件夹导航、数据集移动交互
- 受影响代码：`src/pages/HomePage.tsx`
  - 面包屑区域（约 352-376 行）
  - 文件夹卡片网格（约 379-425 行）
  - 数据集卡片 `Link`（约 462-467 行）
  - 新增 `dragOverFolderId` 状态

## 约束与边界
- 文件夹卡片仅在根目录（`currentFolderId === null`）渲染，因此拖拽目标也仅限根目录的文件夹卡片；不支持把文件夹内的数据集拖回根目录（本次不实现）。
- 复用现有 `handleMoveToFolder`，不新增数据层方法；不涉及 IndexedDB 结构变更。

## ADDED Requirements

### Requirement: 面包屑返回首页按钮
系统 SHALL 在进入文件夹后的面包屑导航栏最右侧提供「返回首页」按钮。

#### Scenario: 文件夹内显示返回按钮
- **WHEN** 用户处于某个文件夹内（`currentFolderId !== null`）
- **THEN** 面包屑右侧显示「返回首页」按钮，带返回图标，样式与深色科技风一致

#### Scenario: 点击返回根目录
- **WHEN** 用户点击「返回首页」
- **THEN** `currentFolderId` 置空、搜索词清空，页面回到根目录并显示全部文件夹与未分类数据集

#### Scenario: 根目录不显示
- **WHEN** 用户处于根目录
- **THEN** 不显示该「返回首页」按钮（面包屑「首页」已是当前页）

### Requirement: 数据集卡片可拖拽
系统 SHALL 允许将首页的数据集卡片拖拽到文件夹卡片上完成移动。

#### Scenario: 开始拖拽
- **WHEN** 用户按住数据集卡片并拖动
- **THEN** 卡片可被拖动，且 `dataTransfer` 中写入了该数据集的 ID

#### Scenario: 拖拽悬停文件夹高亮
- **WHEN** 拖拽的数据集悬停在某个文件夹卡片上
- **THEN** 该文件夹卡片呈现青色边框/背景高亮，提示可释放

#### Scenario: 放下完成移动
- **WHEN** 用户在文件夹卡片上松开鼠标
- **THEN** 调用现有移动逻辑把该数据集 `folderId` 更新为当前文件夹 ID，并刷新列表；该数据集从根目录「未分类」列表中移除，文件夹计数 +1

#### Scenario: 拖拽取消
- **WHEN** 拖拽离开文件夹卡片或未在文件夹上释放
- **THEN** 高亮状态消失，数据不发生变更

#### Scenario: 点击行为不受影响
- **WHEN** 用户直接点击数据集卡片（非拖拽）
- **THEN** 仍正常进入该数据集的项目详情页

## MODIFIED Requirements
无

## REMOVED Requirements
无
