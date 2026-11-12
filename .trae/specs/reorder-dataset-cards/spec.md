# 数据集卡片拖拽排序 Spec

## Why
文件夹之间已可拖拽换位、数据集可拖入文件夹，但同一层级（同一文件夹内或根目录「未分类」）的数据集卡片之间无法调整顺序，缺少类似桌面图标的排序能力。

## What Changes
- `db.ts`：`Dataset` 增加可选 `order`；新增 `reorderDatasets(orderedIds)`（先读取全部数据集，再在单事务内按索引写入 `order`）。
- `useDB.ts`：暴露 `reorderDatasets`。
- `HomePage.tsx`：同一层级的数据集列表按 `order` 升序渲染（无 `order` 的旧数据回退为按 `createdAt` 倒序）；数据集卡片增加 `onDragOver`/`onDragLeave`/`onDrop`/`onDragEnd`，拖到另一数据集卡片时交换两者位置并持久化；拖拽悬停时目标卡片青色高亮。
- 保持既有行为：拖数据集到文件夹卡片仍执行「移入文件夹」（由文件夹卡片的 onDrop 处理，二者 DOM 不重叠）。

## Impact
- 受影响能力：首页数据集排序与拖拽
- 受影响代码：`src/utils/db.ts`、`src/hooks/useDB.ts`、`src/pages/HomePage.tsx`
- 不改动文件夹排序逻辑与数据集移入文件夹逻辑

## 关键设计
- 排序仅在「同层级」内进行：根目录只排未分类数据集，进入文件夹后只排该文件夹数据集。
- 拖拽数据类型复用 `text/plain` 传数据集 ID；文件夹拖拽使用 `application/x-folder-id`，落在数据集卡片上时不处理。
- `reorderDatasets` 只接收当前层级的 ID 列表，写入 `order = 0..n-1`，不影响其他层级数据集。
- IndexedDB schemaless，新增 `order` 无需升级版本。

## ADDED Requirements

### Requirement: 同层级数据集拖拽排序
系统 SHALL 允许将数据集卡片拖到同层级的另一数据集卡片上，交换两者顺序并持久化。

#### Scenario: 根目录排序
- **WHEN** 在「未分类」区域把「农村1」拖到「城市1」上
- **THEN** 两张卡片交换位置
- **THEN** 新顺序写入 IndexedDB，刷新后保持

#### Scenario: 文件夹内排序
- **WHEN** 进入某个文件夹，把卡片 A 拖到卡片 B 上
- **THEN** 仅该文件夹内顺序交换，其他文件夹/根目录顺序不受影响

#### Scenario: 视觉反馈
- **WHEN** 拖拽数据集卡片经过另一数据集卡片
- **THEN** 目标卡片显示青色边框/光环高亮
- **WHEN** 拖拽结束、离开或放下
- **THEN** 高亮清除

#### Scenario: 与现有拖拽互不干扰
- **WHEN** 把数据集卡片拖到文件夹卡片上
- **THEN** 仍执行「移入该文件夹」，不触发数据集排序
- **WHEN** 把文件夹拖到数据集卡片上
- **THEN** 不产生任何变更
- **WHEN** 卡片拖到自身
- **THEN** 不产生任何变更

### Requirement: 数据集顺序持久化
系统 SHALL 在 `datasets` 表新增可选 `order` 字段；首页渲染时按 `order` 升序展示，缺少 `order` 时按 `createdAt` 倒序。

#### Scenario: 读取排序
- **WHEN** 首页加载某层级数据集
- **THEN** 已有 `order` 的数据按 order 升序
- **THEN** 无 `order` 的旧数据排在有序数据之后，并按创建时间倒序

## MODIFIED Requirements
### Requirement: 数据集卡片拖拽
在原「拖入文件夹」基础上新增「同层级互换排序」，拖拽开始仍写入 `text/plain` 数据集 ID。

## REMOVED Requirements
无
