# Tasks

- [x] Task 1: 新增城市5 手工清洗代码
  - [x] SubTask 1.1: 新增 `CITY5_CODE`，脚本逐字保留（含 `#读取城市5` 无空格注释、空行、`城市5_手工图.png`、末尾 `print`）
  - [x] SubTask 1.2: `CODE_MAP` 新增 `'城市5': CITY5_CODE`

- [x] Task 2: 新增城市5 WorkBuddy 代码
  - [x] SubTask 2.1: 新增 `CITY5_WORKBUDDY_CODE`，脚本逐字保留（含 `Normalize` 导入、区间条形图、`城市5_WorkBuddy图.png`）
  - [x] SubTask 2.2: `WORKBUDDY_CODE_MAP` 新增 `'城市5': CITY5_WORKBUDDY_CODE`

- [x] Task 3: 新增城市5 分析结论
  - [x] SubTask 3.1: 新增 `CITY5_CONCLUSIONS` 三条文案，保留「总指数保持平稳：」等前缀与句号
  - [x] SubTask 3.2: `CONCLUSIONS_MAP` 新增 `'城市5': CITY5_CONCLUSIONS`

- [x] Task 4: 验证
  - [x] SubTask 4.1: 确认三个映射键齐全、城市1-4 条目未变、解析逻辑未改
  - [x] SubTask 4.2: 运行 `npx tsc -b --pretty false`，退出码 0

# Task Dependencies
- Task 2、Task 3 与 Task 1 相互独立，可并行（同一文件，建议顺序执行）
- Task 4 依赖 Task 1-3
