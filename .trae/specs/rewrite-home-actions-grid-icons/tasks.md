# Tasks

- [x] Task 1: 按钮组改为 Grid 布局
  - [x] SubTask 1.1: 将按钮父容器 className 改为 `grid grid-cols-3 gap-4 w-full max-w-xl ml-auto`
  - [x] SubTask 1.2: 标题行外层容器加 `flex-wrap gap-3`，避免窄屏溢出
  - [x] SubTask 1.3: 三个按钮去掉 `w-32`、`shrink-0`，改为 `w-full h-10 px-4 flex items-center justify-center text-sm font-medium rounded-lg`

- [x] Task 2: 添加图标并统一文案
  - [x] SubTask 2.1: 「对比分析」加 `<i className="ri-bar-chart-box-line mr-1"></i>`
  - [x] SubTask 2.2: 「导入数据」加 `<i className="ri-upload-cloud-2-line mr-1"></i>`，文本改为「导入数据」，保留「导入中...」
  - [x] SubTask 2.3: 「新建文件夹」用 `<i className="ri-folder-add-line mr-1"></i>` 替换「+ 」
  - [x] SubTask 2.4: 保留三者配色、hover/disabled 与 onClick/to 逻辑

- [x] Task 3: 验证（不 push）
  - [x] SubTask 3.1: 运行 `npm run lint` 与 `npm run build`
  - [x] SubTask 3.2: 浏览器验证三个按钮等宽、间距一致、图标显示、点击功能正常

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3 依赖 Task 1、Task 2
