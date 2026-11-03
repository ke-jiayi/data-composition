# Tasks

- [x] Task 1: 首页操作区按钮对调
  - [x] SubTask 1.1: 将「+ 新建文件夹」按钮块移到「导 入 数 据」按钮块之后，保持 `className`/`onClick`/`disabled` 不变
  - [x] SubTask 1.2: 确认隐藏的 `<input ref={fileInputRef}>` 仍在两个按钮之后

- [x] Task 2: 文件夹弹窗底部按钮对调
  - [x] SubTask 2.1: 在新建/重命名文件夹弹窗中，把「创建/保存」按钮块移到「取消」按钮块之前
  - [x] SubTask 2.2: 确认 `justify-end`、`gap-3`、`disabled={!folderNameInput.trim()}`、`handleConfirmFolder` 与关闭逻辑不变

- [x] Task 3: 验证
  - [x] SubTask 3.1: 阅读代码确认两处顺序正确，且未改动删除确认弹窗
  - [x] SubTask 3.2: 运行 `npx tsc -b --pretty false`，退出码 0

# Task Dependencies
- Task 1 与 Task 2 相互独立，可并行
- Task 3 依赖 Task 1-2
