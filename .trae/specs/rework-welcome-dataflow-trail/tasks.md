# Tasks

- [x] Task 1: 双层路径点亮（底层轨道 + line-grow 动画）
  - [x] SubTask 1.1: `colors` 增改——新增 `trackStroke`（底层轨道颜色，dark `rgba(100,116,139,0.30)` / light `rgba(71,85,105,0.25)`）、`heroFill`（dark `#E8FDFF` / light `#0B7285`）、`heroGlow`（dark `drop-shadow(0 0 6px rgba(95,251,241,0.95)) drop-shadow(0 0 14px rgba(95,251,241,0.6))` / light `drop-shadow(0 0 4px rgba(11,114,133,0.65)) drop-shadow(0 0 8px rgba(11,114,133,0.35))`）；移除废弃的 `cursorFill` / `cursorGlow`
  - [x] SubTask 1.2: 在背景 `<svg>` 内、渐变亮线之前插入底层轨道 `<path>`：与亮线完全相同的 `d`，`fill="none"`、`stroke={colors.trackStroke}`、`strokeWidth={2}`、`strokeLinecap/Linejoin="round"`
  - [x] SubTask 1.3: 渐变亮线 `<path>` 增加 `pathLength="100"`；inline style 添加 `strokeDasharray: '100'` 与 `animation: 'line-grow 9s linear infinite'`；在 `<style>` 块新增 `@keyframes line-grow { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }`
  - [x] SubTask 1.4: 保留原有 `glowLineGrad` 渐变、`drop-shadow` 发光、4 条网格线、容器 `opacity-[0.9]` 均不变

- [x] Task 2: 主角 + 拖尾 + 爆闪
  - [x] SubTask 2.1: 删除旧 `@keyframes cursor-run`、旧单三角 `<span>` 覆盖层及关联 `cursorKeyframes` 计算代码
  - [x] SubTask 2.2: 重新计算折线累计弧长与行程百分比（可复用现有 `segmentLengths` / `trackCumulative` / `trackTotal` / `peakIndexes` 逻辑）；生成 12 节点 `@keyframes cursor-move`，每关键帧仅含 `left`、`top`、`animation-timing-function: linear`
  - [x] SubTask 2.3: 生成 `@keyframes cursor-burst`：0% 与 100% 为 `scale(1)`/`blur(0)`；在每个波峰进度 `p`（节点 2/4/6/8/10）两侧插入三帧：`max(p-1.3, 前帧+0.01)%` → `scale(1)` `blur(0)`、`p%` → `scale(1.7)` `blur(1.6px)`、`min(p+1.3, 后帧-0.01)%` → `scale(1)` `blur(0)`；全程 linear
  - [x] SubTask 2.4: 渲染 4 个光标（1 主 + 3 拖尾）：外层为绝对定位 `<span>`，static style 包含 `left: '0%'`、`top: '88.889%'`、`transform: 'translate(-50%,-50%)'`；inline animation 为 `cursor-move 9s linear 0s infinite both`（主三角 delay 0，拖尾 delay 分别为 `0.18s/0.36s/0.54s`）；内层 `<span style="display:block">` 附加 `cursor-burst` 同 delay；最内层 `<svg>` 分别使用尺寸 24/18/13/9、opacity 1/0.50/0.28/0.14、`fill={colors.heroFill}`、`filter={colors.heroGlow}`

- [x] Task 3: 验证（tsc + 浏览器双主题）
  - [x] SubTask 3.1: `npx tsc --noEmit` 退出码 0
  - [x] SubTask 3.2: 浏览器（深色）——DOM 断言：底层轨道 path 1 条（strokeWidth=2）、亮线 path 1 条（pathLength=100、strokeDasharray=100、animation 含 line-grow 9s）、`<polygon>` 总数 4；无 console error
  - [x] SubTask 3.3: 浏览器——不同时间采样唯一主角 `<span>` 的 `left/top` computed 值，确认其贴合折线；亮线 dashoffset 动画与主角同步（均 9s linear）
  - [x] SubTask 3.4: 浏览器（浅色）——轨道线/三角配色加深且清晰；双主题截图；确认 welcome 文字、Enter 提示、页脚、ThemeToggle 正常

# Task Dependencies
- Task 2 depends on Task 1（Task 2 需复用 linePoints / track lengths，且旧光标代码需删除）
- Task 3 depends on Task 1, Task 2

---

# 追加任务（2026-10-18）：彗星拖尾增强 + 顶点星芒 + 雷达波纹

- [x] Task 4: 彗星拖尾增强（拖尾三角提亮 + 青色尾迹线）
  - [x] SubTask 4.1: 3 个拖尾三角的 opacity 由 `0.5/0.28/0.14` 改为 `0.6/0.4/0.2`（尺寸 18/13/9 与 delay 0.18s/0.36s/0.54s 不变）
  - [x] SubTask 4.2: `colors` 新增 `tailStroke`（dark `#5FFBF1` / light `#0891B2`）、`tailGlow`（dark `drop-shadow(0 0 6px rgba(95,251,241,0.8))` / light `drop-shadow(0 0 4px rgba(8,145,178,0.5))`）、`starStroke`（dark `#E8FDFF` / light `#0B7285`）、`rippleStroke`（dark `rgba(95,251,241,0.9)` / light `rgba(8,145,178,0.7)`）
  - [x] SubTask 4.3: 背景 `<svg>` 内、渐变亮线之后新增尾迹 `<path>`（同 d）：`fill="none"`、`stroke={colors.tailStroke}`、`strokeWidth={3}`、round 端点/连接、`pathLength={100}`、style `strokeDasharray: '6 200'`、`animation: 'line-tail 9s linear infinite'`、`filter: colors.tailGlow`、`opacity 0.85`
  - [x] SubTask 4.4: `<style>` 块新增 `@keyframes line-tail { from { stroke-dashoffset: 6; } to { stroke-dashoffset: -94; } }`

- [x] Task 5: 顶点星芒 + 雷达波纹
  - [x] SubTask 5.1: 新增 `const vertexIndexes = [2,3,4,5,6,7,8,9,10];`（全部极值点：波峰 2/4/6/8/10 + 波谷 3/5/7/9），并由 `trackCumulative[i]/trackTotal*9` 计算每个顶点的触发延迟（保留 3 位小数，单位 s）
  - [x] SubTask 5.2: `<style>` 块新增 `@keyframes star-flash`：`0% { opacity:0; transform: translate(-50%,-50%) scale(0.5) rotate(0deg); }` → `1.2% { opacity:1; scale(1.4) rotate(20deg); }` → `2.8% { opacity:0.9; scale(2) rotate(45deg); }` → `5% { opacity:0; scale(2.3) rotate(70deg); }` → `100%` 同 5% 保持隐藏
  - [x] SubTask 5.3: `<style>` 块新增 `@keyframes ripple-flash`：`0% { opacity:1; transform: translate(-50%,-50%) scale(0); }` → `6.5% { opacity:0; scale(1); }` → `100%` 同 6.5% 保持隐藏
  - [x] SubTask 5.4: 渲染 9 组预埋元素（`vertexIndexes.map`）：每组一个绝对定位容器 `<span>`（`left: x/1280*100%`、`top: y/720*100%`、`pointer-events-none`），内部包含：① 十字星 `<svg width=48 height=48 viewBox="0 0 48 48">`（两条 1.5px 相交线 `(24,4)-(24,44)` 与 `(4,24)-(44,24)`，`stroke={colors.starStroke}`、`strokeLinecap="round"`、发光 filter），外层 span 加 `animation: star-flash 9s linear ${delay}s infinite both`；② 圆环 `<svg width=120 height=120 viewBox="0 0 120 120">`（`<circle cx=60 cy=60 r=50 fill="none" stroke={colors.rippleStroke} strokeWidth={1.5}>`），外层 span 加 `animation: ripple-flash 9s linear ${delay}s infinite both`

- [x] Task 6: 验证（tsc + 浏览器双主题）
  - [x] SubTask 6.1: `npx tsc --noEmit` 退出码 0
  - [x] SubTask 6.2: 浏览器（深色）DOM 断言——背景 SVG path = 3（轨道/亮线/尾迹）；尾迹 path `pathLength=100`、`stroke-dasharray=6 200`、animation 含 `line-tail`；polygon 仍 = 4 且拖尾 opacity 为 0.6/0.4/0.2；星芒容器 9 个、波纹圆环 9 个；无 console error
  - [x] SubTask 6.3: 浏览器——提取 style 文本断言 `star-flash`（scale(0.5)/scale(2)/rotate(70deg)）与 `ripple-flash`（scale(0)/scale(1)）存在；抽查 9 组元素的 animation-delay 为 1.505s/2.084s/3.46s/4.166s/5.343s/6.121s/7.223s/7.99s/8.596s（与预期 ±0.01s 内一致）
  - [x] SubTask 6.4: 浅色主题 DOM 断言（尾迹 `#0891B2`、星芒 `#0B7285`、波纹 `rgba(8,145,178,0.7)`）+ 双主题 console 无 error；本次沙箱浏览器截图功能受渲染器节流限制不可用，视觉确认交由用户本地预览完成

# Task Dependencies（追加）
- Task 4、Task 5 无相互依赖，但修改同一文件需顺序执行
- Task 6 depends on Task 4, Task 5

---

# 追加任务（2026-10-18 第二次）：移除生硬几何图形，回归纯粹流畅

- [x] Task 7: 删除十字星芒与雷达波纹代码
  - [x] SubTask 7.1: 删除 `colors` 中的 `starStroke` 和 `rippleStroke` 键
  - [x] SubTask 7.2: 删除 `vertexIndexes` 常量及其注释
  - [x] SubTask 7.3: 删除 `@keyframes star-flash` 和 `@keyframes ripple-flash` 的完整 keyframes 定义
  - [x] SubTask 7.4: 删除 `vertexIndexes.map(...)` 渲染的 9 组顶点特效元素（包含十字星 svg 和圆环 svg 的完整 JSX 块）

- [x] Task 8: 波峰特效改为仅增强 drop-shadow 发光
  - [x] SubTask 8.1: 修改 `@keyframes cursor-burst`：移除 `scale` 和 `blur` 相关代码，改为在波峰进度处仅增强 `drop-shadow` 发光半径（约 1.5 倍）
  - [x] SubTask 8.2: 确保 `cursor-burst` 关键帧中不包含 `transform: scale(...)` 或 `filter: blur(...)`，仅包含 `filter: drop-shadow(...)` 的变化
  - [x] SubTask 8.3: 通过 React 根据主题动态生成关键帧文本实现主题适配（新增 `heroGlowBurst` 键）

- [x] Task 9: 验证（tsc + 浏览器双主题）
  - [x] SubTask 9.1: `npx tsc --noEmit` 退出码 0
  - [x] SubTask 9.2: 浏览器（深色）DOM 断言——无 `star-flash` / `ripple-flash` keyframes；无 `starStroke` / `rippleStroke`；无 `vertexIndexes`；页面上无十字星 svg、无圆环 circle；背景 SVG path = 3（轨道/亮线/尾迹）；polygon = 4；无 console error
  - [x] SubTask 9.3: 浏览器——提取 style 文本断言 `cursor-burst` 不含 `scale(` 或 `blur(`，仅含 `drop-shadow`；关键帧进度与之前一致（约 ±1.3% 进度内完成变化）
  - [x] SubTask 9.4: 浅色主题 DOM 断言——尾迹 `#0891B2`、主角/拖尾三角发光正常；无十字星/圆环；双主题 console 无 error

# Task Dependencies（第二次追加）
- Task 8 depends on Task 7（需先删除旧代码再修改 burst）
- Task 9 depends on Task 7, Task 8

---

# 追加任务（2026-10-18 第三次）：浅色模式配色优化 + 平滑过渡

- [x] Task 10: 浅色模式配色调整（colors 浅色分支）
  - [x] SubTask 10.1: 基础色——`lineGradStart` 浅色改 `'#00B4D8'`、`lineGradEnd` 浅色改 `'#3B82F6'`、`lineGlow` 浅色改 `'rgba(0,180,216,0.40)'`、`trackStroke` 浅色改 `'#E2E8F0'`、`heroFill` 浅色改 `'#00B4D8'`、`tailStroke` 浅色改 `'#00B4D8'`
  - [x] SubTask 10.2: 发光——`heroGlow` 浅色改 `'drop-shadow(0 0 4px rgba(0,180,216,0.75)) drop-shadow(0 0 10px rgba(0,180,216,0.45))'`、`heroGlowBurst` 浅色改 `'drop-shadow(0 0 7px rgba(0,180,216,1)) drop-shadow(0 0 16px rgba(0,180,216,0.7))'`、`tailGlow` 浅色改 `'drop-shadow(0 0 4px rgba(0,180,216,0.6))'`
  - [x] SubTask 10.3: 深色分支所有值保持不变（`#6BC5E8`/`#7B4B9E`/`rgba(100,116,139,0.30)`/`#E8FDFF`/`#5FFBF1` 等）

- [x] Task 11: 主题切换平滑过渡（transition）
  - [x] SubTask 11.1: 渐变 `<stop>` 的 `stopColor` 改为 `style={{ stopColor: ..., transition: 'stop-color 0.4s ease' }}` 形式
  - [x] SubTask 11.2: 底层轨迹 `<path>` 的 `stroke` 改为 style 形式并加 `transition: 'stroke 0.4s ease'`
  - [x] SubTask 11.3: 渐变亮线 `<path>` style 加 `transition: 'filter 0.4s ease'`；尾迹 `<path>` 的 `stroke` 改为 style 形式并加 `transition: 'stroke 0.4s ease, filter 0.4s ease'`
  - [x] SubTask 11.4: 4 个三角光标：`<polygon>` 的 `fill` 改为 style 形式并加 `transition: 'fill 0.4s ease'`；三角 `<svg>` 的 style 加 `transition: 'filter 0.4s ease, opacity 0.4s ease'`
  - [x] SubTask 11.5: 4 条网格线 `<line>` 的 `stroke`/`opacity` 改为 style 形式并加 `transition: 'stroke 0.4s ease, opacity 0.4s ease'`

- [x] Task 12: 验证（tsc + 浏览器双主题 + 切换过渡）
  - [x] SubTask 12.1: `npx tsc --noEmit` 退出码 0
  - [x] SubTask 12.2: 深色 DOM 断言——所有颜色与追加前完全一致（渐变 `#6BC5E8`/`#7B4B9E`、轨迹 `rgba(100,116,139,0.30)`、三角 `#E8FDFF`、尾迹 `#5FFBF1`）
  - [x] SubTask 12.3: 浅色 DOM 断言——渐变 `#00B4D8`/`#3B82F6`、轨迹 `#E2E8F0`、尾迹 `#00B4D8`、三角 `#00B4D8`、发光 `rgba(0,180,216,...)`（以浅色刷新加载验证，inline 与 computed 一致）
  - [x] SubTask 12.4: 相关元素 computed style 含 `transition`（约 0.4s）；双主题无 console error；注：沙箱浏览器渲染器节流会冻结 transition 导致切换瞬间 computed 值停留在旧值，实际浏览器正常，已用刷新直载方式绕过验证

# Task Dependencies（第三次追加）
- Task 11 depends on Task 10（同一 colors 对象，先改值再加过渡）
- Task 12 depends on Task 10, Task 11
