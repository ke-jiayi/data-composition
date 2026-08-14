# Checklist

- [ ] WelcomePage.tsx 中 ECharts 实例已完全移除（无 echarts.init / setOption / handleResize 相关逻辑）
- [ ] 使用 SVG `<text>` 渲染 `welcome`，保留 `stroke: '#6C3B9A'`、`fill: '#FFFFFF'`（动画结束后）
- [ ] CSS `@keyframes` 实现 3s 循环：描边绘制 → 填充变白
- [ ] 字号自适应算法保留（innerWidth*0.095 / chartH*0.68）
- [ ] 文字在任意尺寸下完整显示无裁切（W/e 边缘、上下）
- [ ] `npm run build` exit 0
- [ ] 浏览器验证：桌面端、移动端、resize 均通过
- [ ] git commit 并 push origin main，Cloudflare Pages 部署成功
