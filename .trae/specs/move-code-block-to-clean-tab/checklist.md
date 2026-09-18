- [x] chart Tab 命中分支只保留图表卡片，代码块（按钮+pre）已删除
- [x] chart Tab 空状态分支保持"暂无可视化图表，请先上传并分析数据"
- [x] showChartCode 已重命名为 showCleanCode，默认 false，[id] effect 重置收起
- [x] code useState 初值为空串；加载时回退 datasetData.code || chartMeta?.code || ''
- [x] clean Tab 代码卡片仅在 chartMeta 存在时渲染（农村1 等不显示）
- [x] 代码卡片默认收起，点击标题"数据清洗与可视化代码"（无 emoji）切换展开/收起，▶/▼ 指示正确
- [x] 展开后 textarea 显示映射代码（城市1→城市1.xlsx，城市2→城市2.xlsx），可编辑
- [x] "保存修改"按钮保留且可用，保存后显示"✓ 已保存"（handleSaveCode 未改动，静态确认）
- [x] DataCleaning 组件及其余 Tab（table/conclusion/smart）未改动
- [x] npx tsc --noEmit 退出码 0
- [x] 浏览器实测：城市2 clean 默认收起/展开内容/保存按钮；城市2 chart 无代码块；农村1 clean 无代码卡片

> 独立 Review R1：pass（8/8 检查点，0 actionable），详见 review.md。
