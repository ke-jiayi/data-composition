# Tasks

- [x] Task 1: 统一四个标题图标为 Remix Icon
  - [x] SubTask 1.1: 「这个网站是做什么的？」h2：删除整个 `<svg>...</svg>`，插入 `<i className="ri-pie-chart-2-fill w-7 h-7 text-2xl flex-shrink-0 inline-flex items-center justify-center mr-3 text-[#00B4D8] dark:text-[#6BC5E8]"></i>`
  - [x] SubTask 1.2: 「联系方式」h2：删除整个 `<svg>...</svg>`，插入 `<i className="ri-chat-smile-2-fill ...">`（类名结构同上）
  - [x] SubTask 1.3: 确认 `remixicon.css` 中存在 `.ri-pie-chart-2-fill` 与 `.ri-chat-smile-2-fill`（已确认：第 1570、411 行）

- [x] Task 2: 统一尺寸、对齐与间距
  - [x] SubTask 2.1: 「技术栈」`<i>` 类名改为 `ri-settings-4-fill w-7 h-7 text-2xl flex-shrink-0 inline-flex items-center justify-center mr-3 text-[#00B4D8] dark:text-[#6BC5E8]`
  - [x] SubTask 2.2: 「后续计划」`<i>` 类名改为 `ri-quill-pen-ai-fill` + 同上一组类名
  - [x] SubTask 2.3: 四个 h2 的 className 追加 `flex items-center`，保留 `text-xl font-semibold text-gray-900 dark:text-[#E2E8F0]` 与各自的 `mb-4` / `mb-3`

- [x] Task 3: 验证
  - [x] SubTask 3.1: 四个 h2 均为 `flex items-center`，四个图标均为 `w-7 h-7 text-2xl flex-shrink-0 mr-3`，无 `w-6 h-6` / `mr-2` 残留
  - [x] SubTask 3.2: 标题区域已无手写 `<svg>`，联系方式正文的 GitHub / 邮箱 SVG 未变
  - [x] SubTask 3.3: 运行 `npx tsc -b --pretty false`，退出码 0
  - [x] SubTask 3.4: 确认未执行任何 git commit / push

# Task Dependencies
- Task 2 依赖 Task 1（同一文件同一区域，顺序执行）
- Task 3 依赖 Task 1-2
