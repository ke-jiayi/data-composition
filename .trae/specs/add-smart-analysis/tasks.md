# Tasks

- [x] Task 1: 创建 SmartAnalysis 组件
  - [ ] SubTask 1.1: 创建 src/components/SmartAnalysis.tsx，实现列类型检测函数（数值/文本/日期/唯一值计数）
  - [ ] SubTask 1.2: 实现图表推荐逻辑（日期+数值→折线，文本+数值→柱状/饼，多数值→雷达）
  - [ ] SubTask 1.3: 用 ECharts 渲染图表卡片网格（3-5张），高度 280px
  - [ ] SubTask 1.4: 每张图表右上角添加类型切换按钮（柱状/折线/饼图）
  - [ ] SubTask 1.5: 数据<3行时显示提示文字
  - [ ] SubTask 1.6: 导出 SmartAnalysis 组件

- [x] Task 2: 集成到 ProjectDetailPage
  - [ ] SubTask 2.1: 在 TabNavigation.tsx 的 TabType 添加 'smart'，添加"智能分析"Tab 项
  - [ ] SubTask 2.2: 在 ProjectDetailPage.tsx 添加 activeTab === 'smart' 渲染块，传入 cleanedData 或 rawData
  - [ ] SubTask 2.3: 运行 npx tsc --noEmit 验证编译，git commit 并 push

# Task Dependencies
- Task 2 依赖 Task 1（需要组件存在才能集成）
