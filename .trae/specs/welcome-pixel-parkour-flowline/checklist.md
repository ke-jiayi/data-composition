- [x] 旧流光逻辑已移除：无 lineGrad / softGlow / flowGlow / animateMotion / 🐱 text / 渐变 mainPath
- [x] 未新增 echarts import 或 remixicon 依赖
- [x] 折线为 11 段、每段 strokeWidth=4、strokeDasharray="10 4"、butt/miter 端点
- [x] 折线颜色红绿交替（暗色 #C84C0C / #3FA34D）
- [x] 路径首点 x=0、末点 x=1280，渲染后左右贯通无留白
- [x] 12 个节点各有内联 SVG 像素小鸟（金色 + 深色描边）
- [x] 小鸟层为绝对定位百分比坐标，与 SVG viewBox 精确对齐
- [x] @keyframes 单次跳跃 0.8s，animation-delay 依次错开，含上抛/落回/淡出并循环
- [x] 浅色模式红绿加深（#B03E06 / #2E7D32），小鸟仍清晰
- [x] 未修改 index.html、welcome 文字动画、Enter 提示、页脚、路由、ThemeToggle
- [x] npx tsc --noEmit 退出码 0
- [x] 浏览器：无 console error、无失败的外部资源请求、双主题截图均清晰
- [x] 仅修改 WelcomePage.tsx

---

### 追加检查项（2026-10-17 放慢节奏）

- [x] 小鸟 `animation-duration` 已改为 `6.4s`（单次跳跃约 2s）
- [x] 节点 `animation-delay` 已改为 `i * 0.3s`（序列 `0s/0.3s/0.6s … 3.3s`）
- [x] `@keyframes pixel-jump` 关键帧百分比与位移取值未改动
- [x] 颜色常量、SVG 结构、小鸟数量（12）与位置未改动
- [x] `welcome` 文字 `welcome-draw 3s` 描边动画保持 3s 未改动
- [x] `npx tsc --noEmit` 退出码 0
- [x] 浏览器：无 console error；深浅双主题截图视觉与调整前一致（仅节奏变慢）
- [x] 仅修改 WelcomePage.tsx；未 push
