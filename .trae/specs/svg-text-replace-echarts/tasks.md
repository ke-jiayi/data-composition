# svg-text-replace-echarts - 实施计划

## [x] Task 1: 用 SVG <text> 替换 ECharts 渲染
- **Priority**: high
- **Depends On**: None
- **Description**:
  - 移除 `echarts` import、`chartRef`、`useEffect` 中所有 echarts 初始化和 option 代码
  - 移除 `handleResize` 中的 echarts 相关逻辑
  - 在原 `chartRef` 位置包裹一个 `<svg>` 元素，内部包含 `<text>` 元素
  - 用 CSS `@keyframes` 实现描边绘制和填充动画
  - 保留原字号算法，但使用 state 管理 fontSize
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-4
- **Test Requirements**:
  - `programmatic` TR-1.1: 代码中无 `echarts.init` 调用
  - `human-judgement` TR-1.2: 浏览器验证文字完整、动画流畅、字号自适应

## [/] Task 2: 验证 + 提交推送部署
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 构建验证 + 浏览器验收 + Git 提交推送
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3
- **Test Requirements**:
  - `human-judgement` TR-2.1: 桌面/移动端均无裁切
  - `programmatic` TR-2.2: push 成功，线上可访问
