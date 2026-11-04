# Tasks

- [x] Task 1: 替换城市5 结论文案
  - [x] SubTask 1.1: 将 `CITY5_CONCLUSIONS` 三条字符串替换为鲜菜、畜肉类、粮食类三条新文案，逐字一致
  - [x] SubTask 1.2: 确认 `CONCLUSIONS_MAP['城市5']` 仍指向 `CITY5_CONCLUSIONS`，其余键未变

- [x] Task 2: 验证
  - [x] SubTask 2.1: 阅读代码确认三条文案与用户提供内容完全一致，旧文案无残留
  - [x] SubTask 2.2: 运行 `npx tsc -b --pretty false`，退出码 0

# Task Dependencies
- Task 2 依赖 Task 1
