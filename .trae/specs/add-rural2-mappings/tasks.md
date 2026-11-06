# Tasks

- [x] Task 1: 新增农村2 手工清洗代码
  - [x] SubTask 1.1: 新增 `RURAL2_CODE`，逐字保留（含 `# 1. 读取并清洗数据`、`# 2. 提取 2025年12月 的数据画玫瑰图`、`# 3. 画南丁格尔玫瑰图`、`# 4. 保存`、`values = np.concatenate(...)`、`农村2_手工图.png`、末尾 `print`）
  - [x] SubTask 1.2: `CODE_MAP` 新增 `'农村2': RURAL2_CODE`

- [x] Task 2: 新增农村2 WorkBuddy 代码
  - [x] SubTask 2.1: 新增 `RURAL2_WORKBUDDY_CODE`，内容与 `RURAL2_CODE` 逐字相同
  - [x] SubTask 2.2: `WORKBUDDY_CODE_MAP` 新增 `'农村2': RURAL2_WORKBUDDY_CODE`

- [x] Task 3: 新增农村2 分析结论
  - [x] SubTask 3.1: 新增 `RURAL2_CONCLUSIONS` 三条文案，保留「食品价格先抑后扬：」等前缀、全角括号与句号
  - [x] SubTask 3.2: `CONCLUSIONS_MAP` 新增 `'农村2': RURAL2_CONCLUSIONS`

- [x] Task 4: 验证
  - [x] SubTask 4.1: 确认三个映射含 `农村2`，已有条目未变，解析逻辑未改
  - [x] SubTask 4.2: 运行 `npx tsc -b --pretty false`，退出码 0

# Task Dependencies
- Task 2、Task 3 与 Task 1 相互独立（同一文件，建议顺序执行）
- Task 4 依赖 Task 1-3
