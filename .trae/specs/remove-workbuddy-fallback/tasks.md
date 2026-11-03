# Tasks

- [x] Task 1: 移除 workbuddyCode 的城市1 兜底
  - [x] SubTask 1.1: 将 `const workbuddyCode = resolveWorkbuddyCode(dataset?.name) || WORKBUDDY_CODE;` 改为 `const workbuddyCode = resolveWorkbuddyCode(dataset?.name);`
  - [x] SubTask 1.2: 确认 `WORKBUDDY_CODE` 仍作为 `WORKBUDDY_CODE_MAP['城市1']` 的值使用，不产生未使用变量告警

- [x] Task 2: 代码卡片条件渲染
  - [x] SubTask 2.1: 「WorkBuddy 分析」Tab 的代码卡片外层改为 `{workbuddyCode && (<div>...</div>)}`，为空时不渲染该卡片
  - [x] SubTask 2.2: 图表展示区与「暂无 WorkBuddy 图表」逻辑保持原样

- [x] Task 3: 验证
  - [x] SubTask 3.1: 阅读代码确认无 `|| WORKBUDDY_CODE` 兜底，`resolveWorkbuddyCode` 未命中返回 `''`
  - [x] SubTask 3.2: 确认城市1-4 仍分别映射到各自常量
  - [x] SubTask 3.3: 运行 `npx tsc -b --pretty false`，退出码 0

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3 依赖 Task 1-2
