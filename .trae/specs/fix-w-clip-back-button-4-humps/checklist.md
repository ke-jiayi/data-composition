# Checklist

- [ ] WelcomePage ECharts 容器 `h-[360px] md:h-[440px]`、fontSize 三档 <=48/72/88
- [ ] WelcomePage graphic text top:'middle'、含 fontFamily Inter/system-ui、textVerticalAlign:'middle'
- [ ] WelcomePage ECharts keyframeAnimation：duration=3000 loop=true、keyframes percent=0.7/0.8/1、lineDash/lineDashOffset 数字完全不变
- [ ] 浏览器验证：桌面 & 移动端 welcome 的 w 及 7 字母各帧完整不裁切
- [ ] 背景主折线 path 含 exactly 4 个凸起驼峰（峰数=4），峰/起点/终点处 circle 数据点不超过 6 个
- [ ] 背景 SVG 内存在 `<animateMotion dur="6s" repeatCount="indefinite">` + `<mpath href="#mainPath"/>`，主 path id="mainPath"
- [ ] 浏览器验证：流光光点沿折线以 6s 周期循环流过
- [ ] HomePage 「← 返回封面」按钮替换为 `<Link to="/">← 返回封面</Link>`，className 与旧按钮一致，有 no-underline
- [ ] 浏览器验证：/home 页面点击返回封面按钮，URL 变为 `/`（显示封面页）
- [ ] 配色不变：深碳灰背景、暗紫主色、冰蓝仅细点缀
- [ ] WelcomePage & HomePage 其他逻辑零改动（跳转/导入/搜索/删除等不受影响）
- [ ] npm run build exit 0，TypeScript 无错误
- [ ] git commit 并 push origin main 成功
