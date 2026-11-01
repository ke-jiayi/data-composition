# Tasks

- [x] Task 1: 新增城市2 WorkBuddy 脚本常量
  - [x] SubTask 1.1: 在 `src/pages/ProjectDetailPage.tsx` 中现有 `WORKBUDDY_CODE` 之后新增 `CITY2_WORKBUDDY_CODE` 模板字符串常量，内容为用户提供的完整城市2 Python 脚本，逐字保留换行、缩进与空行
  - [x] SubTask 1.2: 全文不要写入 `f-string` 之外的 `${...}`（确认脚本中无 JS 模板插值冲突）

- [x] Task 2: 新增 WorkBuddy 代码映射与解析函数
  - [x] SubTask 2.1: 新增 `WORKBUDDY_CODE_MAP`（`'城市1': WORKBUDDY_CODE`、`'城市2': CITY2_WORKBUDDY_CODE`）
  - [x] SubTask 2.2: 新增 `resolveWorkbuddyCode(name?: string): string`，规则与 `resolveDefaultCode` 一致（精确匹配 → 名称包含兜底 → 未命中返回 `''`）
  - [x] SubTask 2.3: 在组件内计算 `const workbuddyCode = resolveWorkbuddyCode(dataset?.name) || WORKBUDDY_CODE;`

- [x] Task 3: WorkBuddy 代码块接入动态代码
  - [x] SubTask 3.1: 将 smart Tab `<pre>` 内的 `{WORKBUDDY_CODE}` 改为 `{workbuddyCode}`
  - [x] SubTask 3.2: 确认代码块样式、标题文案、图片动态路径均保持不变

- [x] Task 4: 验证
  - [x] SubTask 4.1: 全局搜索确认 `CODE_MAP` 未被改动（仍为 城市1 → `PYTHON_CODE`、城市2 → `CITY2_CODE`）
  - [x] SubTask 4.2: 运行 `npx tsc -b --pretty false` 退出码 0
  - [x] SubTask 4.3: 确认 `public/images/城市2_WorkBuddy图.png` 与 `public/images/城市2_手工图.png` 存在

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3 依赖 Task 2
- Task 4 依赖 Task 1-3
