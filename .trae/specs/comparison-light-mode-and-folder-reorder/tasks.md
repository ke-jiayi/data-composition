# Tasks

- [x] Task 1: 修复对比页白天模式配色（`ComparisonPage.tsx`）
  - [x] SubTask 1.1: 主标题改为 `text-[#00B4D8] dark:text-[#6BC5E8]`，保留深色模式 drop-shadow
  - [x] SubTask 1.2: `<select>` 改为 `bg-white dark:bg-[#1E1E24] text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600`，保留原有间距/圆角/focus 样式

- [x] Task 2: 文件夹排序数据层（`db.ts`、`useDB.ts`）
  - [x] SubTask 2.1: `Folder` 接口新增 `order?: number`
  - [x] SubTask 2.2: `createFolder` 写入 `order = 当前最大 order + 1`
  - [x] SubTask 2.3: `getAllFolders` 按 `order ?? createdAt` 排序，并为缺失 `order` 的旧数据补齐写入
  - [x] SubTask 2.4: 新增 `reorderFolders(orderedIds: string[])`，先读取全部文件夹，再在同一事务内批量写入 `order`
  - [x] SubTask 2.5: `useDB` import、类型与返回值暴露 `reorderFolders`

- [x] Task 3: 首页文件夹拖拽排序（`HomePage.tsx`）
  - [x] SubTask 3.1: 解构 `reorderFolders`；新增 `handleReorderFolders(sourceId, targetId)` 交换数组位置、持久化并 `loadFolders()`
  - [x] SubTask 3.2: 文件夹卡片加 `draggable` 与 `onDragStart`（写入 `application/x-folder-id`）、`onDragEnd` 清除高亮
  - [x] SubTask 3.3: `onDrop` 优先读取文件夹 ID 执行排序；否则回退读取 `text/plain` 执行原有数据集移入逻辑
  - [x] SubTask 3.4: 保留并复用 `dragOverFolderId` 青色高亮与 `onDragOver`/`onDragLeave`

- [x] Task 4: 验证（不 push）
  - [x] SubTask 4.1: 运行 `npm run lint` 与 `npm run build`
  - [x] SubTask 4.2: 浏览器验证浅色模式标题与下拉框配色
  - [x] SubTask 4.3: 浏览器验证文件夹拖拽交换、高亮、刷新后顺序保持，且数据集拖入文件夹仍正常

# Task Dependencies
- Task 3 依赖 Task 2
- Task 4 依赖 Task 1、Task 2、Task 3
