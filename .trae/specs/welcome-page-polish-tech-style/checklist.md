# WelcomePage 科技感升级 检查清单

- [ ] WelcomePage.tsx ECharts 容器高度 >= h-[300px] md:h-[380px]，含 textVerticalAlign:'middle'，字号较原方案下调
- [ ] welcome 7 字母在桌面/移动端各帧均完整不被裁切/遮挡（代码类名正确 + 浏览器验证）
- [ ] 背景为深碳灰 #1A1A1E / #1E1E24（非深蓝黑 #0a0e1a）
- [ ] 主色调为暗紫 #6C3B9A / #7B4B9E（ECharts 最终 fill、副标题、按钮文字、版权文字等）
- [ ] 点缀色冰蓝 #6BC5E8 / #5BB8D9 仅用于极细装饰线条与按钮边框，未大面积使用
- [ ] 背景仅一条主要折线：大幅波动（跨度占 60%+）、带数据点（circle）、stroke 为暗紫→冰蓝 linearGradient
- [ ] 背景装饰（折线/光点/辅助线）pointer-events-none 且层级低于前景、opacity 适中不遮挡文字
- [ ] 删除了旧的 3 条紫色折线 + 密集网格线 + base64 网格 + 紫色光晕（保持简洁）
- [ ] ECharts keyframeAnimation 关键参数未变：duration=3000、loop=true、keyframes percent=0.7/0.8/1
- [ ] ECharts 动画仅改颜色：stroke 改为 #6BC5E8、fill 最终改为 #7B4B9E；lineDash/lineDashOffset 数字与 keyframes 逻辑不变
- [ ] onClick={handleEnter} 仍在最外层 div，handleEnter → navigate('/home') 未改
- [ ] showEnter setTimeout/useEffect 未改；装饰线结构、副标题、进入提示文案、版权文案保留
- [ ] 页面整体全屏居中，简洁干净，无多余 emoji/密集装饰
- [ ] npm run build 成功，exit code 0，无 TypeScript 错误
- [ ] 浏览器验证：welcome 各帧完整不裁切、冰蓝描边→暗紫填充循环、点击跳转 /home 正常、背景折线渐变+数据点可见
- [ ] git commit 并 push origin main 成功，触发 Cloudflare Pages 部署
