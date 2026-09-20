- [x] ProjectDetailPage 三处 max-w-7xl → max-w-4xl mx-auto
- [x] ProjectDetailPage 正文 text-sm→text-base、text-xs→text-sm（间距不变）
- [x] TabNavigation tab 文字 text-sm→text-base
- [x] DataTable 表头 text-xs→text-sm、单元格 text-sm→text-base；保留 overflow-x-auto 与 px-4 py-3
- [x] DataCleaning text-sm→text-base、text-xs→text-sm；间距不变
- [x] SmartAnalysis text-base→text-lg、text-sm→text-base；间距不变
- [x] 1366px 下主容器 max-width=896px，水平居中，无页面级横向滚动
- [x] 375px 结构保障（max-w-4xl + overflow-x-auto + flex-wrap），表格内部可横滚
- [x] 字号抽样：Tab/单元格=16px、表头=14px、信息值=16px
- [x] npx tsc --noEmit 退出码 0
- [x] 仅修改 5 个文件：ProjectDetailPage/TabNavigation/DataTable/DataCleaning/SmartAnalysis

> 独立 Review R1：pass（8/8 检查点，字号映射顺序正确，间距零变动，0 actionable），详见 review.md。
