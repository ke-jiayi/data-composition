# Tasks

- [x] Task 1: 新增城市4 手工清洗代码
  - [x] SubTask 1.1: 在 `src/pages/ProjectDetailPage.tsx` 中 `CITY3_CODE` 之后新增 `const CITY4_CODE = \`...\``，逐字保留用户脚本（含中文注释、空行与缩进）
  - [x] SubTask 1.2: 在 `CODE_MAP` 中新增 `'城市4': CITY4_CODE`，前三项不改动

- [x] Task 2: 新增城市4 WorkBuddy 代码
  - [x] SubTask 2.1: 在 `CITY3_WORKBUDDY_CODE` 之后新增 `const CITY4_WORKBUDDY_CODE = \`...\``，逐字保留用户脚本
  - [x] SubTask 2.2: 确认脚本内无 `\n` 转义、无反引号、无 `${`，无需额外转义
  - [x] SubTask 2.3: 在 `WORKBUDDY_CODE_MAP` 中新增 `'城市4': CITY4_WORKBUDDY_CODE`，前三项不改动

- [x] Task 3: 验证
  - [x] SubTask 3.1: 阅读代码确认 `CODE_MAP` 与 `WORKBUDDY_CODE_MAP` 各含四个键，城市4 脚本首尾行与用户内容一致
  - [x] SubTask 3.2: 确认 `resolveDefaultCode` / `resolveWorkbuddyCode`、图片路径、Tab 渲染未改动
  - [x] SubTask 3.3: 运行 `npx tsc -b --pretty false`，退出码 0

# Task Dependencies
- Task 1 与 Task 2 相互独立，可并行（同一文件，建议顺序执行）
- Task 3 依赖 Task 1-2
