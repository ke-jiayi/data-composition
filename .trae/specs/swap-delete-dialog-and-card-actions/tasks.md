# Tasks

- [x] Task 1: 数据集删除确认弹窗按钮对调
  - [x] SubTask 1.1: 在 `{deleteTarget && ...}` 弹窗底部，将「确认删除」按钮块移到「取消」按钮块之前
  - [x] SubTask 1.2: 确认 `handleDelete`、`setDeleteTarget(null)`、红色/深色类名与 hover 不变

- [x] Task 2: 卡片顶部布局重排
  - [x] SubTask 2.1: 顶部行改为标题 + 右侧操作组容器（`relative flex items-center gap-2 shrink-0`），标题加 `min-w-0`
  - [x] SubTask 2.2: 删除/移动按钮移入操作组并去掉 `absolute top-3 right-*`，保留 `opacity-0 group-hover:opacity-100` 与其余类名
  - [x] SubTask 2.3: XLSX 徽标移入同一容器、位于图标组之后，移除 `ml-2`
  - [x] SubTask 2.4: 移动菜单改为 `absolute right-0 top-full mt-1 z-10`，置于操作组容器内

- [x] Task 3: 验证
  - [x] SubTask 3.1: 阅读代码确认无 `absolute top-3 right-3/right-11` 残留，图标与徽标同容器
  - [x] SubTask 3.2: 确认删除文件夹弹窗与其他卡片内容未改动
  - [x] SubTask 3.3: 运行 `npx tsc -b --pretty false`，退出码 0

# Task Dependencies
- Task 1 与 Task 2 相互独立，可并行（同一文件，建议顺序执行）
- Task 3 依赖 Task 1-2
