# Tasks

- [x] Task 1: 整体替换 WorkBuddy Tab 的 SVG
  - [x] SubTask 1.1: 删除 `src/components/TabNavigation.tsx` 中 `smart` 项现有的整个 `<svg> ... </svg>`（含旧 path、width/height、颜色类）
  - [x] SubTask 1.2: 写入用户给定 SVG：`viewBox="0 0 24 24"`、`fill="currentColor"`、`className="w-5 h-5 flex-shrink-0 inline-block mr-1"`、路径为 `M13 2V4H15C15.5523...H13Z`
  - [x] SubTask 1.3: 保持 `key: 'smart' as TabType`、`label: 'WorkBuddy 分析'`，其他 Tab 与渲染逻辑不变

- [x] Task 2: 验证
  - [x] SubTask 2.1: 确认该 SVG 内不含 `text-[#00B4D8]`、`dark:text-[#6BC5E8]` 等硬编码颜色，且含 `flex-shrink-0`
  - [x] SubTask 2.2: 确认旧路径 `M12 2a2 2 0 0 1 2 2c0 .74` 已不存在，其他四个 Tab 图标未变
  - [x] SubTask 2.3: 运行 `npx tsc -b --pretty false`，退出码 0
  - [x] SubTask 2.4: 确认未执行任何 git commit / push

# Task Dependencies
- Task 2 依赖 Task 1
