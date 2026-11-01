# Tasks

- [x] Task 1: 新增城市3 手工清洗代码常量
  - [x] SubTask 1.1: 在 `src/pages/ProjectDetailPage.tsx` 中 `CITY2_CODE` 之后新增 `const CITY3_CODE = \`...\`` 模板字符串，内容为用户提供的城市3 脚本，逐字保留换行、缩进与空行
  - [x] SubTask 1.2: 确认脚本内不含反引号与 `${`，无需额外转义

- [x] Task 2: 写入 CODE_MAP
  - [x] SubTask 2.1: 在 `CODE_MAP` 中新增 `'城市3': CITY3_CODE`，城市1/城市2 条目不改动
  - [x] SubTask 2.2: 确认 `resolveDefaultCode` 与组件内 `hasCleanCode` / `setCode` 逻辑无需修改

- [x] Task 3: 验证
  - [x] SubTask 3.1: 阅读代码确认 `CODE_MAP` 现含三个键，`CITY3_CODE` 首尾行与用户脚本一致
  - [x] SubTask 3.2: 运行 `npx tsc -b --pretty false`，退出码 0

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3 依赖 Task 1-2
