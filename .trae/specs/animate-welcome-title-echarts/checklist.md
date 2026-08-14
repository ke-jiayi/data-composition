# Checklist

- [x] `src/pages/WelcomePage.tsx` 已引入 `echarts` 并用 `useRef` + `useEffect` 初始化 ECharts 实例
- [x] 主标题文案为"welcome"（小写），不再显示"欢迎来到我的个人数据收集网址"
- [x] graphic text 配置了 `keyframeAnimation`：`duration: 3000`、`loop: true`
- [x] keyframes 实现描边动画：`lineDash` 从 `[0,200]` → `[200,0]`，`lineDashOffset` 从 `0` → `200`，`fill` 从 `transparent` → 霓虹紫
- [x] 描边色 `stroke` 为霓虹青 `#22d3ee`，最终填充 `fill` 为霓虹紫 `#a855f7`
- [x] `fontSize` 响应式（桌面大、移动小）
- [x] 原 `<h1>` 静态主标题已移除，替换为 ECharts 挂载容器
- [x] ECharts 容器为 `pointer-events-none`，不阻挡外层 div 的点击跳转
- [x] `window.resize` 监听调用 `myChart.resize()`
- [x] useEffect cleanup 中 `myChart.dispose()` 并移除 resize 监听
- [x] 点击任意位置跳转 `/home` 逻辑（`onClick={handleEnter}`）保留不变
- [x] 紫色流光折线图背景、装饰线、副标题、进入提示、底部版权保留不变
- [x] `npm run build` 构建成功，无 TypeScript 错误
- [x] 本地 `npm run dev` 验证"welcome"描边动画播放且点击跳转正常
