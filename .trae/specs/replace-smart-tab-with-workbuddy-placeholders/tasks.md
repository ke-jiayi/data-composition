# Tasks

- [x] Task 1: 重命名 Tab 标签
  - [x] SubTask 1.1: 在 `src/components/TabNavigation.tsx` 中把 `key: 'smart'` 项的 `label` 由 `'智能分析'` 改为 `'WorkBuddy 分析'`
  - [x] SubTask 1.2: 保持 `key`、`icon`（🤖）、顺序与其他 Tab 不变

- [x] Task 2: 清空 SmartAnalysis 逻辑并新增两个占位区域
  - [x] SubTask 2.1: 删除 `src/components/SmartAnalysis.tsx`
  - [x] SubTask 2.2: 在 `src/pages/ProjectDetailPage.tsx` 删除 `import { SmartAnalysis } from '../components/SmartAnalysis';`
  - [x] SubTask 2.3: 将 `activeTab === 'smart'` 的渲染块替换为占位结构（注释改为「Tab: WorkBuddy 分析」）：外层 `div.space-y-4`，内含两张卡片
  - [x] SubTask 2.4: 卡片结构——容器 `bg-[#26262C] rounded-lg border border-[#3A3A44] p-2`，标题 `text-lg font-semibold text-white mb-4 text-center`（分别为「图表展示区」「代码展示区」）；内部占位框 `rounded-lg border border-dashed border-[#3A3A44] bg-[#1E1E24] flex items-center justify-center`，图表框 `min-h-[240px]`、代码框 `min-h-[180px]`，说明文字 `text-base text-[#9CA3AF]`
  - [x] SubTask 2.5: 保留 `rawData` 与 `getData`（数据表格 Tab 仍用 `DataTable data={rawData}`），不新增任何未使用变量（`noUnusedLocals` 下编译通过）

- [x] Task 3: 验证（tsc + 浏览器）
  - [x] SubTask 3.1: `npx tsc --noEmit` 退出码 0
  - [x] SubTask 3.2: 浏览器——Tab 导航显示「WorkBuddy 分析」、无「智能分析」；点击后 `?tab=smart`，出现「图表展示区」「代码展示区」两卡片、顺序正确、无 ECharts 图表
  - [x] SubTask 3.3: 浏览器——卡片样式与「可视化分析」Tab 一致（背景/边框/圆角类名一致）；深色与浅色模式均正常，console 无 error
  - [x] SubTask 3.4: 浏览器——数据表格 / 数据清洗 / 分析结论 / 可视化分析 Tab 正常渲染

- [x] Task 4: 准备图片资源与代码常量
  - [x] SubTask 4.1: 将 `public/images/城市1_WorkBuddy图.png.png` 复制为 `public/images/城市1_WorkBuddy图.png`（保留原文件）
  - [x] SubTask 4.2: 在 `src/pages/ProjectDetailPage.tsx` 顶部新增模块级常量 `WORKBUDDY_CODE`（模板字符串），内容与用户提供的 Python 脚本逐字一致

- [x] Task 5: 渲染图表图片与代码块
  - [x] SubTask 5.1: 「图表展示区」卡片内把虚线占位框替换为 `<img src="/images/城市1_WorkBuddy图.png" alt="WorkBuddy 生成的城市1消费价格指数趋势图" className="w-full max-h-[500px] object-contain rounded" />`，外层保持 `flex justify-center`，标题仍为「图表展示区」
  - [x] SubTask 5.2: 「代码展示区」卡片标题改为「WorkBuddy 生成的数据处理与可视化代码」；占位框替换为 `<pre>` 只读代码块内容 `{WORKBUDDY_CODE}`，类名为 `bg-[#1E1E24] text-[#D1D5DB] p-4 rounded-lg text-base leading-relaxed whitespace-pre overflow-x-auto max-h-[400px] overflow-y-auto`，等宽字体 `font-mono`
  - [x] SubTask 5.3: 两张卡片容器继续沿用 `bg-[#26262C] rounded-lg border border-[#3A3A44] p-2`，标题样式 `text-lg font-semibold text-white mb-4 text-center` 不变

- [x] Task 6: 验证（tsc + 浏览器）
  - [x] SubTask 6.1: `npx tsc --noEmit` 退出码 0
  - [x] SubTask 6.2: 浏览器——`?tab=smart` 中图片 `/images/城市1_WorkBuddy图.png` 返回 200 且可见、居中；页面无 Broken image
  - [x] SubTask 6.3: 浏览器——代码块标题正确、`max-height:400px`、`overflow-y:auto`、可内部滚动；首行 `import pandas as pd`、末行 `plt.close(fig)`
  - [x] SubTask 6.4: 浏览器——深色/浅色模式正常，其他 Tab 渲染不变，console 无 error

# Task Dependencies
- Task 2 depends on Task 1（先改标签文案，再替换 Tab 内容，同页无冲突）
- Task 3 depends on Task 1, Task 2
- Task 5 depends on Task 4（先备好资源与常量，再渲染）
- Task 6 depends on Task 4, Task 5
