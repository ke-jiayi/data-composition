# Checklist

- [x] WelcomePage.tsx 中 ECharts 实例已完全移除（无 echarts.init / setOption / handleResize 相关逻辑）
- [x] 使用 SVG `<text>` 渲染 `welcome`，保留 `stroke: '#6C3B9A'`、`fill: '#FFFFFF'`（动画结束后）
- [x] CSS `@keyframes` 实现 3s 循环：描边绘制 → 填充变白
- [x] 字号自适应算法保留（SVG viewBox 自适应，fontSize 固定 128 由 SVG 自动缩放）
- [x] 文字在任意尺寸下完整显示无裁切（W/e 边缘、上下）
- [x] `npm run build` exit 0
- [x] 浏览器验证：桌面端、动画效果、SVG 自适应均通过
- [x] git commit 并 push origin main，Cloudflare Pages 部署成功
