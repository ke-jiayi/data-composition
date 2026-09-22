# Tasks

- [x] Task 1: 移除折叠状态与 effect（ProjectDetailPage.tsx）
  - [x] SubTask 1.1: 删除 L146 `const [showCleanCode, setShowCleanCode] = useState(false);`（保留 codeRef）
  - [x] SubTask 1.2: 删除 L180-183 [id] 重置 effect（整个 effect 仅剩 setShowCleanCode）
  - [x] SubTask 1.3: 自适应高度 effect（L185-191）去掉 `!showCleanCode` 守卫与依赖，改为仅依赖 `[code]`，注释同步更新
- [x] Task 2: 代码卡片改常显（L431-461）
  - [x] SubTask 2.1: 折叠按钮（button + ▶/▼ span）替换为静态标题 `<h3 className="text-base font-medium text-white">数据清洗与可视化代码</h3>`
  - [x] SubTask 2.2: 删除 `{showCleanCode && (...)}` 条件包裹，textarea（含 bg-gray-900 容器 div）始终渲染；textarea 属性/样式不变
  - [x] SubTask 2.3: "保存修改"按钮保持原样（onClick/disabled/三态文案）
- [x] Task 3: tsc + 浏览器验证
  - [x] SubTask 3.1: npx tsc --noEmit 退出码 0
  - [x] SubTask 3.2: 城市2 clean Tab：进入即见代码（含"城市2.xlsx"）、无 ▶/▼、scrollHeight===clientHeight、scrollWidth<=clientWidth、保存按钮在；农村1 clean Tab：无代码卡片

# Completion Evidence
- grep `showCleanCode|setShowCleanCode` 全文件 0 匹配
- tsc 退出码 0
- 浏览器实测（城市2 ?tab=clean）：found=true、hasCity2=true、noVScroll=true（scrollHeight=clientHeight=994）、noHScroll=true（scrollWidth=clientWidth=526）、minHeight='0px'、overflow='hidden'、headerIsStatic=true、hasCollapseArrow=false、saveBtnExists=true、readonly=false、disabled=false
- 浏览器实测（农村1 ?tab=clean）：hasCodeCard=false、hasTextarea=false

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 2
