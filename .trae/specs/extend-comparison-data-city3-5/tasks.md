# Tasks

- [x] Task 1: 扩展 COMPARISON_DATA 与类型
  - [x] SubTask 1.1: 在 `COMPARISON_DATA` 中按用户提供内容新增 `city3`、`city4`、`city5`
  - [x] SubTask 1.2: 将 `ComparisonKey` 类型扩展为 `'city1' | 'city2' | 'city3' | 'city4' | 'city5'`

- [x] Task 2: 下拉框补充选项
  - [x] SubTask 2.1: 在 `<select>` 中按顺序新增 city3、city4、city5 三个 `<option>`

- [x] Task 3: 验证（不 push）
  - [x] SubTask 3.1: 运行 `npm run lint` 与 `npm run build`
  - [x] SubTask 3.2: 浏览器验证下拉框含 5 个选项，切换 city3/city4/city5 后标题、配文、结论正确切换

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3 依赖 Task 1、Task 2
