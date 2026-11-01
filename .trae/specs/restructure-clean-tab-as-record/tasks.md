# Tasks

- [x] Task 1: 移除数据清洗操作工具
  - [x] SubTask 1.1: 删除 `src/pages/ProjectDetailPage.tsx` 中的 `import DataCleaning from '../components/DataCleaning';`
  - [x] SubTask 1.2: 删除 `clean` Tab 中 `{id && (<DataCleaning data={cleanedData} projectId={id} onDataChange={handleCleanedDataChange} />)}` 整段
  - [x] SubTask 1.3: 删除 `cleanedData` 状态、`handleCleanedDataChange` 回调；`useDB()` 解构中去掉 `saveData`；加载 effect 中删除 `setCleanedData(data)`
  - [x] SubTask 1.4: 将 `SmartAnalysis` 的 `data` 由 `cleanedData.length > 0 ? cleanedData : rawData` 改为 `rawData`
  - [x] SubTask 1.5: 删除文件 `src/components/DataCleaning.tsx`

- [x] Task 2: 新增「数据清洗记录」步骤列表
  - [x] SubTask 2.1: 在 `ProjectDetailPage.tsx` 顶部新增步骤映射数据：`CLEANING_STEPS_MAP`（键 `城市1`、`城市2`，值为字符串数组）与 `DEFAULT_CLEANING_STEPS`（通用 4 步），并新增 `resolveCleaningSteps(name?)`，规则与 `resolveChartMeta` 相同（精确匹配 → 名称包含兜底 → 默认）
  - [x] SubTask 2.2: 步骤内容：城市1 = 读取原始宽表 / 去除全空行列 / 宽表转置为长表 / 选取前 5 个指标绘制趋势；城市2 = 读取原始宽表 / 去除全空行列 / 宽表转长表（stack） / 过滤汇总行 / 筛选 2025 年 12 月 / 简化指标名称；默认 = 读取原始数据 / 去除空值 / 宽表转长表 / 统一字段命名
  - [x] SubTask 2.3: 在 `clean` Tab 内、代码卡片之前渲染「数据清洗记录」卡片：标题「数据清洗记录」+ 说明文案「从原始宽表到可用长表的完整处理步骤」+ 编号列表（序号两位数字徽标 + 文字），沿用页面既有深色卡片样式（`bg-[#26262C]`、`border-[#3A3A44]`、`text-[#9CA3AF]`/`text-[#D1D5DB]`）
  - [x] SubTask 2.4: 保留代码卡片（标题「数据清洗与可视化代码」、「保存修改」按钮、textarea、`fitCode`）原样，位置在步骤卡片之后

- [x] Task 3: 验证（tsc + 浏览器双主题）
  - [x] SubTask 3.1: `npx tsc --noEmit` 退出码 0
  - [x] SubTask 3.2: 浏览器——城市1/城市2 的 clean Tab：无「去重」按钮、无「列操作」、无「清洗日志」、无清洗前后对比；存在「数据清洗记录」步骤列表与「数据清洗与可视化代码」卡片及「保存修改」按钮；步骤卡片 DOM 顺序在代码卡片之前（注：沙箱浏览器 IndexedDB 仅存 城市2/农村1，城市2 已运行时全项 PASS；城市1 由同一 `resolveCleaningSteps` 逻辑 + 源码常量核对）
  - [x] SubTask 3.3: 浏览器——城市1 步骤含「宽表转置为长表」，城市2 步骤含「宽表转长表」与「筛选」；无映射数据集显示通用步骤且代码卡片按既有逻辑隐藏（城市2 六步逐条核对，农村1 四步通用步骤且无代码卡片/保存按钮，均 PASS）
  - [x] SubTask 3.4: 浏览器——代码编辑 + 「保存修改」→「✓ 已保存」，刷新后内容保留；数据表格/分析结论/智能分析/可视化分析 Tab 正常；无 console error（保存后刷新文本保留；四个 Tab 均正常渲染；0 error）

# Task Dependencies
- Task 2 depends on Task 1（同一文件内先清理旧结构与失效变量，再插入新卡片）
- Task 3 depends on Task 1, Task 2
