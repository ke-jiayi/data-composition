# Tasks

- [x] Task 1: 替换「这个网站是做什么的？」标题图标
  - [x] SubTask 1.1: 删除 `src/pages/AboutPage.tsx` 第 24 行 h2 中的 `🌐`
  - [x] SubTask 1.2: 插入用户给定的饼图 SVG（`viewBox="0 0 24 24"`、`fill="currentColor"`、className `w-6 h-6 flex-shrink-0 inline-block mr-2 text-[#00B4D8] dark:text-[#6BC5E8]`、单条 path）

- [x] Task 2: 替换「联系方式」标题图标
  - [x] SubTask 2.1: 删除第 35 行 h2 中实际存在的 `📮`
  - [x] SubTask 2.2: 插入用户给定的笑脸 SVG（两条 path：笑脸 + 四角星），className 同上
  - [x] SubTask 2.3: 保持标题文字与 h2 的 `className` 不变

- [x] Task 3: 验证
  - [x] SubTask 3.1: 确认 AboutPage 中已无 `🌐` 与 `📮`，两个 SVG 的 path 与给定内容逐字一致
  - [x] SubTask 3.2: 确认未改动其它文件、未新增依赖
  - [x] SubTask 3.3: 运行 `npx tsc -b --pretty false`，退出码 0
  - [x] SubTask 3.4: 确认未执行任何 git commit / push

# Task Dependencies
- Task 1、Task 2 同文件，按顺序执行
- Task 3 依赖 Task 1-2
