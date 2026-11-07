# Tasks

- [x] Task 1: 替换首页面包屑 Emoji 为内联 SVG 图标
  - [x] SubTask 1.1: 在 `src/pages/HomePage.tsx` 的面包屑「首页」按钮中删除 `🏠 `，改为内联 SVG 房子图标，放置在「首页」文字之前
  - [x] SubTask 1.2: 图标使用 `className="mr-2 inline-block h-4 w-4 align-[-2px] text-[#00B4D8] dark:text-[#6BC5E8]"` 与 `fill="currentColor"`，保证尺寸协调、主题变色
  - [x] SubTask 1.3: 保持按钮原有 `onClick` 与 `px-2 py-1 rounded transition-colors` 等类名不变

- [x] Task 2: 验证
  - [x] SubTask 2.1: 确认 HomePage 中已无 `🏠`，且文件夹层级的 `📁` 未被改动
  - [x] SubTask 2.2: 确认未新增 remixicon 依赖、未修改 index.html / package.json
  - [x] SubTask 2.3: 运行 `npx tsc -b --pretty false`，退出码 0
  - [x] SubTask 2.4: 确认未执行任何 git commit / push

# Task Dependencies
- Task 2 依赖 Task 1
