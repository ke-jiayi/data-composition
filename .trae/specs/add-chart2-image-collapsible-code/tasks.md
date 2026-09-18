- [x] Task 1: 在 ProjectDetailPage 的可视化分析 Tab 增加城市2 图片卡片和可折叠代码块
  - [x] SubTask 1.1: 在文件顶部新增 `CITY2_CODE` 常量，存放用户提供的 Python 代码（pandas/matplotlib 柱状图）
  - [x] SubTask 1.2: 新增 `useState` 控制代码块展开状态（`const [showCity2Code, setShowCity2Code] = useState(false)`）
  - [x] SubTask 1.3: 在现有趋势图卡片之后增加第二张图片卡片：bg-[#26262C] rounded-lg border border-[#3A3A44] p-2，含 h3 标题、居中 img（src=/images/城市2_柱状图.png，w-full max-h-[500px] object-contain rounded）、数据来源说明
  - [x] SubTask 1.4: 在第二张图片卡片下方增加可折叠代码块：标题栏点击切换 showCity2Code，展开时显示 `<pre>` + `<code>` 包裹的 CITY2_CODE，深色背景 + 等宽字体 + overflow-x-auto
  - [x] SubTask 1.5: 运行 `npx tsc --noEmit` 验证编译通过

# Task Dependencies
- 无（单一任务，仅改 ProjectDetailPage.tsx）
