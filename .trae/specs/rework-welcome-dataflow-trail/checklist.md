- [x] 背景 SVG 内包含 2 条同 d 的 `<path>`：底层轨道（2px、半透明暗灰）+ 顶层渐变亮线（4px、冰蓝→暗紫）
- [x] 顶层亮线设置 `pathLength="100"`、`stroke-dasharray: 100`、`stroke-dashoffset` 动画 100→0（`@keyframes line-grow 9s linear infinite`）
- [x] 亮线点亮动画时长与主角移动时长严格一致（均为 9s），主三角与亮线 delay 0，同步出发
- [x] 旧 `@keyframes cursor-run`、旧单三角覆盖层、旧的 `cursorFill/cursorGlow` 键、top 抬升和 rotate 逻辑均已删除
- [x] 新生成 `@keyframes cursor-move`：12 节点、仅 left/top、累计弧长分配进度、全程 linear
- [x] 新生成 `@keyframes cursor-burst`：在 5 个波峰进度处有 scale 1→1.7→1 + blur 0→1.6px→0 的爆闪，约 ±1.3% 进度内完成
- [x] 页面上共有 4 个 `<polygon>`（1 主 + 3 拖尾），无额外散落三角形
- [x] 主三角 24px / opacity 1；拖尾分别为 18px/13px/9px，opacity 0.50/0.28/0.14，delay 0.18s/0.36s/0.54s
- [x] 外层定位 span 的 inline animation 使用 `cursor-move 9s linear <delay>s infinite both`
- [x] 内层 span 的 inline animation 使用 `cursor-burst 9s linear <同 delay>s infinite both`
- [x] 无波峰 top 抬升、无抛物线跳跃、无 rotate 换角
- [x] 4 条装饰网格线保留，未改动
- [x] 浅色模式轨道线/三角配色加深且清晰
- [x] 未修改 welcome 文字动画、Enter 提示、页脚、路由、ThemeToggle、index.html
- [x] `npx tsc --noEmit` 退出码 0
- [x] 浏览器：无 console error、无失败的外部资源请求、双主题截图清晰
- [x] 仅修改 WelcomePage.tsx；未 push

---

### 追加检查项（2026-10-18 顶点特效）

- [x] 拖尾三角 opacity 已改为 0.6/0.4/0.2（尺寸与 delay 不变）
- [x] 背景 SVG 内新增第 3 条尾迹 `<path>`：`pathLength=100`、`stroke-dasharray: 6 200`、`line-tail 9s linear infinite`（dashoffset 6→-94）、青色 stroke 宽 3 + 发光
- [x] 尾迹亮段约 6% 弧长（≈120px），始终贴在主角身后；循环边界无远端残段闪烁
- [x] 新增 `vertexIndexes = [2,3,4,5,6,7,8,9,10]`（9 个极值顶点）
- [x] 9 组星芒 + 9 组波纹预埋元素，位置 = 顶点百分比坐标（x/1280、y/720）
- [x] 每组星芒/波纹的 animation-delay = `trackCumulative[i]/trackTotal*9s`（实测 1.505/2.084/3.46/4.166/5.343/6.121/7.223/7.99/8.596s），与主角过点严格同步
- [x] `@keyframes star-flash`：opacity 0→1→0、scale 0.5→2→2.3、rotate 0°→70°，5% 后恒隐藏（爆发 ≈0.45s）
- [x] `@keyframes ripple-flash`：scale 0→1（半径 0→50px）、opacity 1→0，6.5% 后恒隐藏（≈0.59s）
- [x] 渐变亮线、底层轨道、主角/拖尾三角颜色与尺寸、`cursor-move`/`cursor-burst`/`line-grow` 关键帧均未改动
- [x] 浅色模式尾迹/星芒/波纹为加深青色（实测 `#0891B2` / `#0B7285` / `rgba(8,145,178,0.7)`）且清晰
- [x] 未修改 welcome 文字、Enter 提示、页脚、路由、ThemeToggle、index.html
- [x] `npx tsc --noEmit` 退出码 0
- [x] 浏览器：无 console error（双主题均验证）；本次沙箱浏览器截图功能不可用，双主题视觉以 DOM 断言覆盖并交由用户本地预览终验
- [x] 仅修改 WelcomePage.tsx；未 push

---

### 追加检查项（2026-10-18 第二次：移除生硬几何图形）

- [x] `colors` 中已删除 `starStroke` 和 `rippleStroke` 键
- [x] 代码中已删除 `vertexIndexes` 常量及其注释
- [x] `@keyframes star-flash` 和 `@keyframes ripple-flash` 已完全删除
- [x] `vertexIndexes.map(...)` 渲染的 9 组顶点特效元素已完全删除（含十字星 svg 和圆环 svg）
- [x] `@keyframes cursor-burst` 已改为仅含 `filter: drop-shadow(...)` 变化，不含 `scale(` 或 `blur(`
- [x] 波峰发光增强在约 ±1.3% 进度内完成，从正常值到约 1.5 倍再恢复
- [x] 浅色模式下波峰发光增强同样生效（通过动态生成关键帧文本）
- [x] 背景 SVG 内仍有 3 条 `<path>`：底层轨道、顶层渐变亮线、彗星尾迹
- [x] 彗星尾迹 `<path>` 保留 `pathLength="100"`、`stroke-dasharray: 6 200`、`line-tail 9s linear infinite`
- [x] 3 个拖尾三角 opacity 仍为 0.6/0.4/0.2，delay 仍为 0.18s/0.36s/0.54s
- [x] 页面上无十字星 `<svg>`、无圆环 `<circle>` 等多余几何图形
- [x] `cursor-move` / `line-grow` 关键帧未改动
- [x] welcome 文字、Enter 提示、页脚、ThemeToggle、路由均未改动
- [x] `npx tsc --noEmit` 退出码 0
- [x] 浏览器：双主题无 console error，视觉干净流畅
- [x] 仅修改 WelcomePage.tsx；未 push
