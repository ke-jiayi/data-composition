# Tasks

- [x] Task 1: 修复三个操作按钮被压缩问题
  - [x] SubTask 1.1: 给「对比分析」Link 的 className 增加 `shrink-0`，移除 `py-2`，保留 `w-32 h-10 px-4 flex items-center justify-center`
  - [x] SubTask 1.2: 对「导 入 数 据」按钮做同样处理
  - [x] SubTask 1.3: 对「+ 新建文件夹」按钮做同样处理，保留边框样式
  - [x] SubTask 1.4: 保持三者颜色、渐变、圆角、hover/disabled 与 onClick/to 逻辑不变

- [x] Task 2: 验证（不 push）
  - [x] SubTask 2.1: 运行 `npm run lint` 与 `npm run build`
  - [x] SubTask 2.2: 浏览器验证三个按钮实测宽高一致，并在较窄视口下仍保持一致

# Task Dependencies
- Task 2 依赖 Task 1
