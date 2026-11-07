# Tasks

- [x] Task 1: 修复 WorkBuddy Tab 图标挤压
  - [x] SubTask 1.1: 在 `src/components/TabNavigation.tsx` 的 `smart` 项 SVG 上，className 增加 `flex-shrink-0`，并保持 `w-5 h-5`、`inline-block`、`mr-1`、`text-[#00B4D8] dark:text-[#6BC5E8]`
  - [x] SubTask 1.2: 用新的圆角机器人路径替换旧 `path`，保留 `viewBox="0 0 24 24"`、`fill="currentColor"`（可保留 `aria-hidden="true"`）
  - [x] SubTask 1.3: 不改动其他 Tab 图标、`TabNavigation` 渲染逻辑与激活态配色

- [x] Task 2: 验证
  - [x] SubTask 2.1: 确认 className 同时包含 `flex-shrink-0` 与 `w-5 h-5`，`path` 为新路径
  - [x] SubTask 2.2: 确认其他四个 Tab 的 SVG 与配置未变
  - [x] SubTask 2.3: 运行 `npx tsc -b --pretty false`，退出码 0
  - [x] SubTask 2.4: 确认未执行任何 git commit / push

# Task Dependencies
- Task 2 依赖 Task 1
