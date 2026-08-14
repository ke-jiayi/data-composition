# Checklist

- [x] WelcomePage ECharts `text` 为 `' welcome '`（首尾各一空格），不是 `DATA PORTFOLIO`
- [x] WelcomePage ECharts `top` 为 `'middle'`
- [x] 保留 `z: 100`、`textPadding: [12,24,12,24]`、`shadowBlur`、`shadowColor`、`stroke: '#6C3B9A'`、最终 `fill: '#FFFFFF'`
- [x] `keyframeAnimation`（duration 3000 / loop / percent 0.7-0.8-1 / lineDash 数字）不变
- [x] `handleResize` 仅 `myChart.resize()`，不再覆盖 fontSize
- [x] npm run build exit 0，TypeScript 无错误
- [x] 浏览器验证：桌面端 welcome 的 W 左缘与 e 右缘描边完整不裁切
- [x] 文字内容显示为 welcome（非 DATA PORTFOLIO）
- [x] git commit 并 push origin main，Cloudflare Pages 部署成功
