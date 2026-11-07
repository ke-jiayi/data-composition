# Tasks

- [x] Task 1: 安装并引入 Remix Icon
  - [x] SubTask 1.1: 在 `d:\my_project\data-composition` 运行 `npm install remixicon`
  - [x] SubTask 1.2: 在 `src/main.tsx` 的 `import './index.css'` 之后添加 `import 'remixicon/fonts/remixicon.css';`
  - [x] SubTask 1.3: 确认 `node_modules/remixicon/fonts/remixicon.css` 中存在 `.ri-settings-4-fill` 与 `.ri-quill-pen-ai-fill`

- [x] Task 2: 替换 AboutPage 两处 SVG
  - [x] SubTask 2.1: 删除「技术栈」h2 内的整个 `<svg>...</svg>`，插入 `<i className="ri-settings-4-fill w-6 h-6 inline-flex items-center justify-center mr-2 text-[#00B4D8] dark:text-[#6BC5E8]"></i>`，保留「技术栈」文字与 h2 的 `mb-4`
  - [x] SubTask 2.2: 删除「后续计划」h2 内的整个 `<svg>...</svg>`，插入 `<i className="ri-quill-pen-ai-fill w-6 h-6 inline-flex items-center justify-center mr-2 text-[#00B4D8] dark:text-[#6BC5E8]"></i>`，保留「后续计划」文字与 h2 的 `mb-3`

- [x] Task 3: 验证
  - [x] SubTask 3.1: 确认 AboutPage 中「技术栈」「后续计划」两处已无 `<svg>`，仅有对应 `<i>` 标签
  - [x] SubTask 3.2: 确认「这个网站是做什么的？」与「联系方式」的 SVG 未变
  - [x] SubTask 3.3: 运行 `npx tsc -b --pretty false`，退出码 0
  - [x] SubTask 3.4: 确认未执行任何 git commit / push

# Task Dependencies
- Task 2 依赖 Task 1（图标类可用才可验证）
- Task 3 依赖 Task 1-2
