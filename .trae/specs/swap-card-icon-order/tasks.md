# Tasks

- [x] Task 1: 交换卡片操作图标顺序
  - [x] SubTask 1.1: 在卡片顶部操作组中，把「移动到文件夹」按钮块移到「删除」按钮块之前，最终为 移动 → 删除 → XLSX 徽标
  - [x] SubTask 1.2: 确认两个按钮的类名、hover 效果、onClick、aria-label/title 与 SVG 未改动

- [x] Task 2: 验证
  - [x] SubTask 2.1: 阅读代码确认顺序与容器结构正确、下拉菜单与删除弹窗仍可正常触发
  - [x] SubTask 2.2: 运行 `npx tsc -b --pretty false`，退出码 0

# Task Dependencies
- Task 2 依赖 Task 1
