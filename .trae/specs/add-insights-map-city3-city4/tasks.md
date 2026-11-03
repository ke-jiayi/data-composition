# Tasks

- [x] Task 1: 新增城市3/城市4 结论常量
  - [x] SubTask 1.1: 新增 `CITY3_CONCLUSIONS`，三条文案与用户提供内容逐字一致（保留中文冒号与标题前缀）
  - [x] SubTask 1.2: 新增 `CITY4_CONCLUSIONS`，三条文案与用户提供内容逐字一致

- [x] Task 2: 扩展映射并改造兜底
  - [x] SubTask 2.1: `CONCLUSIONS_MAP` 新增 `'城市3': CITY3_CONCLUSIONS`、`'城市4': CITY4_CONCLUSIONS`，并显式登记 `'城市1': DEFAULT_CONCLUSIONS`
  - [x] SubTask 2.2: `resolveConclusions` 未命中时返回 `[]`，不再返回 `DEFAULT_CONCLUSIONS`
  - [x] SubTask 2.3: 确认加载 effect 中「已保存结论优先」的逻辑保持不变

- [x] Task 3: 「分析结论」Tab 空态
  - [x] SubTask 3.1: 当 `conclusions.length === 0` 时，在列表区域显示「暂无分析结论」提示文案
  - [x] SubTask 3.2: 保留 `+ 添加新结论` 按钮与原有编辑/删除交互

- [x] Task 4: 验证
  - [x] SubTask 4.1: 阅读代码确认三处文案与用户内容逐字一致
  - [x] SubTask 4.2: 确认 `resolveConclusions` 未命中返回 `[]`，城市1 显式映射到 `DEFAULT_CONCLUSIONS`
  - [x] SubTask 4.3: 运行 `npx tsc -b --pretty false`，退出码 0

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3 依赖 Task 2
- Task 4 依赖 Task 1-3
