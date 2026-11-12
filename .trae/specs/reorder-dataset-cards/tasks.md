# Tasks

- [x] Task 1: 数据集排序数据层（`db.ts`、`useDB.ts`）
  - [x] SubTask 1.1: `Dataset` 接口新增 `order?: number`
  - [x] SubTask 1.2: 新增 `reorderDatasets(orderedIds: string[])`：事务外读取全部数据集，单事务内批量写入 `order = index`
  - [x] SubTask 1.3: `useDB` import、类型与返回值暴露 `reorderDatasets`

- [x] Task 2: 首页数据集卡片拖拽排序（`HomePage.tsx`）
  - [x] SubTask 2.1: 新增层级排序函数（有 order 按 order 升序；无 order 按 createdAt 倒序且排在有序项之后），用于 `visibleDatasets` 渲染
  - [x] SubTask 2.2: 新增 `handleReorderDatasets(sourceId, targetId)`：取当前层级列表、交换位置、调用 `reorderDatasets`、`loadDatasets()`
  - [x] SubTask 2.3: 新增 `dragOverDatasetId` 状态；数据集卡片增加 `onDragOver`、`onDragLeave`、`onDrop`、`onDragEnd`
  - [x] SubTask 2.4: 悬停时目标卡片加青色边框/光环高亮；drop 只处理 `text/plain` 且排除自身
  - [x] SubTask 2.5: 不改变拖入文件夹逻辑与文件夹排序逻辑

- [x] Task 3: 验证（不 push）
  - [x] SubTask 3.1: 运行 `npm run lint` 与 `npm run build`
  - [x] SubTask 3.2: 运行时验证同层级拖拽交换、刷新后顺序保持、悬停高亮
  - [x] SubTask 3.3: 回归验证数据集拖入文件夹仍正常

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3 依赖 Task 1、Task 2
