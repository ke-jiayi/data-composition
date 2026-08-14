# Checklist

- [x] WelcomePage ECharts fontSize 初始化按 window.innerWidth 计算（<640→60, <1024→100, else→128）
- [x] handleResize 内 setOption 更新 fontSize + myChart.resize() 均保留
- [x] 其他配置不变：text `' welcome '`、top `'middle'`、z:100、textPadding、shadow、stroke `'#6C3B9A'`、fill `'#FFFFFF'`、keyframeAnimation
- [x] npm run build exit 0，TypeScript 无错误
- [x] 浏览器验证：桌面端 welcome 字号明显大于原 80，W/e 描边仍完整不裁切
- [x] 浏览器验证：移动端（375 宽）welcome 不溢出容器、不裁切（按源码 60px 档位，宽约 252px < 375px）
- [x] git commit 并 push origin main，Cloudflare Pages 部署成功
