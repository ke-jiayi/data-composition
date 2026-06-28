# 进一步缩小图表区域修改计划

## 问题分析

用户反馈图表区域仍然太大，需要进一步缩小。当前 ChartPanel 组件：
- 默认高度 300px
- 配置区域 padding: p-3
- 图表展示区域 padding: p-3
- 空数据提示区域 min-height: min-h-48 (192px)

## 修改方案

### 修改文件：`src/components/charts/ChartPanel.tsx`

1. **减小默认高度**：从 300px 降到 200px
2. **减小配置区域 padding**：从 p-3 降到 p-2
3. **减小 grid 间距**：从 gap-3 降到 gap-2
4. **减小图表展示区域 padding**：从 p-3 降到 p-2
5. **减小空数据提示区域 min-height**：从 min-h-48 降到 min-h-32 (128px)
6. **减小提示信息区域 padding**：从 mt-2 p-2 降到 mt-1.5 p-1.5

### 修改文件：`src/pages/ProjectDetailPage.tsx`

1. 如果有传入高度参数，也需要相应调整

## 风险与注意事项

1. 图表高度减小可能影响图表可读性，特别是饼图和折线图
2. 需要确保配置区域的选择框和按钮仍然可用

## 修改步骤

1. 修改 ChartPanel.tsx 的默认高度
2. 修改配置区域和图表区域的 padding
3. 修改空数据提示区域的 min-height
4. 验证 TypeScript 编译通过
5. 提交代码并推送