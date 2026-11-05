# Tasks

- [x] Task 1: 新增农村1 手工清洗代码
  - [x] SubTask 1.1: 新增 `RURAL1_CODE`，逐字保留（含 `# 1. 读取农村1` 等带空格注释、`# 2. 修复日期排序（重点！）`、`plt.xticks(rotation=45) # 日期倾斜一下，防止字挤在一起`、`农村1_手工图.png`、末尾 `print`）
  - [x] SubTask 1.2: `CODE_MAP` 新增 `'农村1': RURAL1_CODE`

- [x] Task 2: 新增农村1 WorkBuddy 代码
  - [x] SubTask 2.1: 新增 `RURAL1_WORKBUDDY_CODE`，逐字保留（含 `import numpy as np`、`Rectangle`、`LinearSegmentedColormap`、`Normalize(vmin=95, vmax=115.5)`、`ScalarMappable`、`农村1_WorkBuddy图.png`）
  - [x] SubTask 2.2: `WORKBUDDY_CODE_MAP` 新增 `'农村1': RURAL1_WORKBUDDY_CODE`

- [x] Task 3: 新增农村1 分析结论
  - [x] SubTask 3.1: 新增 `RURAL1_CONCLUSIONS` 三条文案，保留「交通通信类涨幅居前：」等前缀、全角括号与句号
  - [x] SubTask 3.2: `CONCLUSIONS_MAP` 新增 `'农村1': RURAL1_CONCLUSIONS`

- [x] Task 4: 验证
  - [x] SubTask 4.1: 确认三个映射含 `农村1`，城市1-5 条目未变，解析逻辑未改
  - [x] SubTask 4.2: 运行 `npx tsc -b --pretty false`，退出码 0

# Task Dependencies
- Task 2、Task 3 与 Task 1 相互独立（同一文件，建议顺序执行）
- Task 4 依赖 Task 1-3
