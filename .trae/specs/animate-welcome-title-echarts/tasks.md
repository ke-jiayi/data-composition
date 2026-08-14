# Tasks

- [x] Task 1: 改造 WelcomePage 标题为 ECharts 描边动画（修改 `src/pages/WelcomePage.tsx`）
  - [x] SubTask 1.1: 引入 `echarts`，添加 `useRef<HTMLDivElement>` 与 `useEffect`，在 useEffect 中 `echarts.init(chartRef.current)` 初始化实例
  - [x] SubTask 1.2: 配置 `graphic.elements` 的 `type: 'text'`，`left: 'center'`、`top: 'center'`，`style.text: 'welcome'`，`fontWeight: 'bold'`，`fontSize` 按窗口宽度响应式计算（桌面约 96-120，移动约 56-72）
  - [x] SubTask 1.3: 配置 `keyframeAnimation`：`duration: 3000`、`loop: true`，keyframes 参考用户代码——`percent: 0.7` 时 `fill: transparent`、`lineDashOffset: 200`、`lineDash: [200, 0]`（描边画出）；`percent: 0.8` 时 `fill: transparent`（停顿）；`percent: 1` 时 `fill` 为霓虹紫
  - [x] SubTask 1.4: 初始 `style` 设置：`fill: 'transparent'`、`stroke: '#22d3ee'`（霓虹青描边）、`lineWidth: 1`、`lineDash: [0, 200]`、`lineDashOffset: 0`；最终填充色用 `#a855f7`（霓虹紫）
  - [x] SubTask 1.5: 移除原 `<h1>` 静态中文主标题，替换为 ECharts 挂载容器 div（`ref={chartRef}`，固定高度 `h-[200px] md:h-[260px]`，`pointer-events-none` 不阻挡点击）
  - [x] SubTask 1.6: 在 useEffect 中添加 `window.resize` 监听调用 `myChart.resize()`，并在 cleanup 中 `myChart.dispose()` + 移除监听
  - [x] SubTask 1.7: 保留点击任意位置跳转 `/home`（`onClick={handleEnter}`）、紫色流光折线图背景、装饰线、副标题、进入提示、底部版权完全不变

- [x] Task 2: 构建验证
  - [x] SubTask 2.1: 运行 `npm run build` 确认 TypeScript 编译与 Vite 构建无错误
  - [x] SubTask 2.2: 本地 `npm run dev` 验证封面页显示"welcome"描边动画且点击跳转正常

# Task Dependencies
- Task 2 依赖 Task 1 完成
