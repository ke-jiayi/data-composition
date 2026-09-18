- [x] public/images/城市价格指数趋势图.png 存在（单扩展名），双扩展名文件已不存在；城市2_柱状图.png 仍存在
- [x] ProjectDetailPage.tsx 新增 CHART_MAP（城市1/城市2 两条），含 image/code/title
- [x] showCity2Code 状态已替换为通用 showChartCode，且 id 变化时重置为 false
- [x] chart Tab 根据 dataset.name 解析 chartMeta（精确 + 包含兜底）
- [x] 城市1 详情页 chart Tab 只显示趋势图（src=/images/城市价格指数趋势图.png）与城市1 代码，无城市2 图片
- [x] 图片 img 保持 w-full max-h-[500px] object-contain rounded，居中显示
- [x] 城市2 详情页 chart Tab 只显示城市2_柱状图.png 与城市2 代码，无城市1 图片
- [x] 无匹配数据集显示"暂无可视化图表，请先上传并分析数据"，无 img、无代码块
- [x] 代码块标题为"数据清洗与可视化代码"，默认收起，点击切换展开/收起
- [x] 其他 Tab（数据预览/清洗/结论/智能分析/代码）逻辑未改动
- [x] npx tsc --noEmit 退出码 0
- [x] 浏览器中两张图片加载成功（naturalWidth>0，无 404）

> 独立 Review R1：pass（10/10 检查点），详见 review.md。
> 提交时提示：两张 png 需显式 `git add public/images/`（重命名+新文件未跟踪），避免 fresh clone 图片 404。
