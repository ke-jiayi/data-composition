# Tasks

- [x] Task 1: 删除图片映射，保留代码回退
  - [x] SubTask 1.1: 删除 `ChartMeta` 接口、`CHART_MAP` 常量与 `resolveChartMeta()` 函数
  - [x] SubTask 1.2: 新增 `CODE_MAP`（城市1 → `PYTHON_CODE`，城市2 → `CITY2_CODE`）与 `resolveDefaultCode(name?)`（精确匹配 + 名称包含兜底，与原 `resolveChartMeta` 的匹配规则一致，无命中返回 `''`）
  - [x] SubTask 1.3: 数据加载 effect 中 `setCode` 改用 `datasetData.code || resolveDefaultCode(datasetData.name) || ''`
  - [x] SubTask 1.4: 「数据清洗」Tab 代码卡片的渲染条件由 `chartMeta` 改为「`dataset.code` 或默认代码存在」，保持无代码数据集不渲染卡片

- [x] Task 2: 「可视化分析」Tab 图片动态化
  - [x] SubTask 2.1: 移除 `chartMeta` 变量及 `chartMeta ? ... : ...` 分支
  - [x] SubTask 2.2: 图片 `src` 改为 `` `/images/${dataset.name}_手工图.png` ``，alt 与标题改为基于 `dataset.name` 的动态文案（标题 `${dataset.name} 可视化图表`）
  - [x] SubTask 2.3: 图片 `onError` 时回退显示原有「暂无可视化图表，请先上传并分析数据」空态，并在数据集名称变化时重置失败状态

- [x] Task 3: 「WorkBuddy 分析」Tab 图片动态化
  - [x] SubTask 3.1: 图片 `src` 由硬编码 `城市1_WorkBuddy图.png` 改为 `` `/images/${dataset.name}_WorkBuddy图.png` ``，alt 改为 `${dataset.name} WorkBuddy 分析图`
  - [x] SubTask 3.2: 图片 `onError` 时显示「暂无 WorkBuddy 图表」提示，数据集名称变化时重置失败状态

- [x] Task 4: 资源改名
  - [x] SubTask 4.1: 将 `public/images/城市2_柱状图.png` 重命名为 `public/images/城市2_手工图.png`，确认目录中不再存在旧文件名

- [x] Task 5: 验证
  - [x] SubTask 5.1: 全局搜索确认源码中不再存在 `CHART_MAP` / `chartMeta` / `resolveChartMeta` / `城市2_柱状图` / `城市1_WorkBuddy图.png` 硬编码
  - [x] SubTask 5.2: 运行 `npx tsc -b` 类型检查通过
  - [x] SubTask 5.3: 确认 `public/images` 中城市1/城市2 的 `_手工图.png` 与 `_WorkBuddy图.png` 均存在

# Task Dependencies
- Task 2、Task 3、Task 4 依赖 Task 1 完成后的类型定义清理
- Task 2 与 Task 3 相互独立、可并行
- Task 5 依赖 Task 1-4
