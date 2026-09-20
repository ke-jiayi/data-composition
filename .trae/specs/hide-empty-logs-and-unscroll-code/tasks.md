# Tasks

- [x] Task 1: DataCleaning 空日志时隐藏整个清洗日志区域
  - [x] SubTask 1.1: 将 DataCleaning.tsx L198-208 的"清洗日志"区域（h4 标题 + 空状态 + 日志列表）整体用 `{logs.length > 0 && (...)}` 包裹，删除空状态分支（svg + "暂无清洗记录"）
  - [x] SubTask 1.2: 保留日志列表的 `max-h-[300px] overflow-y-auto`（有日志时不变）
- [x] Task 2: ProjectDetailPage 代码 textarea 自适应高度
  - [x] SubTask 2.1: 为 textarea 添加 `ref`（useRef<HTMLTextAreaElement>）
  - [x] SubTask 2.2: 添加 useEffect，在 `showCleanCode` 和 `code` 变化时执行 `el.style.height='auto'; el.style.height=el.scrollHeight+'px'`
  - [x] SubTask 2.3: textarea className 去掉 `min-h-[300px]` 和 `resize-y`，加 `overflow-hidden`
- [x] Task 3: tsc + 浏览器验证
  - [x] SubTask 3.1: npx tsc --noEmit 退出码 0
  - [x] SubTask 3.2: 浏览器验证空日志数据集（无"清洗日志"文本）；展开代码块无内部滚动条（scrollHeight===clientHeight）

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 1 + Task 2
