# Tasks

- [x] Task 1: 替换 WorkBuddy Tab 的 Emoji 图标
  - [x] SubTask 1.1: 在 `src/components/TabNavigation.tsx` 的 `tabs` 数组中，把 `smart` 项的 `icon` 由 `<span className="text-lg leading-5">🤖</span>` 改为内联 SVG 机器人图标
  - [x] SubTask 1.2: SVG 使用 `viewBox="0 0 24 24"`、题目给定的 `path`、`fill="currentColor"`，className 为 `w-5 h-5 inline-block mr-1 text-[#00B4D8] dark:text-[#6BC5E8]`
  - [x] SubTask 1.3: 保留 `key: 'smart' as TabType`、`label: 'WorkBuddy 分析'`，其余 Tab 配置与 `TabNavigation` 渲染逻辑不变

- [x] Task 2: 验证
  - [x] SubTask 2.1: 确认 `src` 中已无 `🤖`，其他 Tab 的图标 SVG 未被改动
  - [x] SubTask 2.2: 确认未新增依赖、未修改 `ProjectDetailPage.tsx`
  - [x] SubTask 2.3: 运行 `npx tsc -b --pretty false`，退出码 0
  - [x] SubTask 2.4: 确认未执行任何 git commit / push

# Task Dependencies
- Task 2 依赖 Task 1
