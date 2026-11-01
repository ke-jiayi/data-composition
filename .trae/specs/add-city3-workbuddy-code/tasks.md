# Tasks

- [x] Task 1: 新增城市3 WorkBuddy 脚本常量
  - [x] SubTask 1.1: 在 `src/pages/ProjectDetailPage.tsx` 中 `CITY2_WORKBUDDY_CODE` 之后新增 `const CITY3_WORKBUDDY_CODE = \`...\``，内容为用户提供的城市3 脚本，逐字保留换行、缩进与空行
  - [x] SubTask 1.2: 脚本中 `\n` 以 `\\n` 写入模板字符串，确保代码框显示字面 `\n`
  - [x] SubTask 1.3: 确认脚本内不含反引号与 `${`，无其它转义需求

- [x] Task 2: 写入 WORKBUDDY_CODE_MAP
  - [x] SubTask 2.1: 在 `WORKBUDDY_CODE_MAP` 中新增 `'城市3': CITY3_WORKBUDDY_CODE`，城市1/城市2 条目不改动
  - [x] SubTask 2.2: 确认 `resolveWorkbuddyCode` 与 smart Tab 的 `{workbuddyCode}` 渲染无需修改

- [x] Task 3: 验证
  - [x] SubTask 3.1: 阅读代码确认 `WORKBUDDY_CODE_MAP` 含三个键，`CITY3_WORKBUDDY_CODE` 首尾行与用户脚本一致
  - [x] SubTask 3.2: 确认 `CODE_MAP` 与 `CITY3_CODE` 未被改动
  - [x] SubTask 3.3: 运行 `npx tsc -b --pretty false`，退出码 0

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3 依赖 Task 1-2
