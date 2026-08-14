# 修复 w 裁切/返回按钮/4 峰折线 - 实施计划

## [x] Task 1: WelcomePage：修复 w 不完整 + 折线改 4 驼峰 + 加流光光点
- **Priority**: high
- **Depends On**: None
- **Acceptance Criteria Addressed**: AC-1, AC-3, AC-4
- **Description**:
  - 仅改 `src/pages/WelcomePage.tsx`
  - **修复 w 裁切**：容器 className 加大到 `h-[360px] md:h-[440px]`；fontSize 下调 `<640→48, <1024→72, else 88`；graphic style 增加 `fontFamily:'Inter, system-ui, "Segoe UI", Roboto, sans-serif'`；graphic element 的 `top:'center'` 改为 `top:'middle'`；保留 `textVerticalAlign:'middle'`；保留 `lineWidth 1.5`
  - **保持 ECharts 动画关键参数不变**：duration 3000、loop true、keyframes percent 0.7/0.8/1 数字保持不变、lineDash [0,200]/[200,0] 及 lineDashOffset 0/200 保持不变；stroke `#6BC5E8`、fill `#7B4B9E` 保持
  - handleResize 同步使用新字号 48/72/88
  - **折线改只有 4 个大驼峰**：将 linePoints 数组和 path 改为仅有 4 个大峰（凸起 4 次）的数据。示例 path（恰好 4 个峰）：
    - M 0,640 L 160,620 L 260,480 ↗峰1 L 360,560 L 480,280 ↗峰2 L 580,400 L 720,180 ↗峰3 L 820,320 L 960,120 ↗峰4 L 1080,240 L 1200,180 L 1280,220
    - 对应 linePoints 包含这 13 个点即可（峰共 4 处）；circle 数据点只在 4 个峰顶与起点/终点处显示（总共 6 个 circle，不要满屏圆点，保持简洁）
    - viewBox 保持 1280×720，linearGradient/softGlow/参考线 opacity 保留，不要额外装饰
  - **增加流光光点沿折线循环流过**：在同一个背景 SVG 内，新增一个 `<circle r="5.5" fill="#6BC5E8" filter="url(#softGlow)">`，并在该 circle 内部嵌一个原生 SVG `<animateMotion dur="6s" repeatCount="indefinite" rotate="auto"><mpath href="#mainPath"/></animateMotion>`。注意给主 path 加 `id="mainPath"` 供 mpath 引用。
  - 保留所有逻辑不变：onClick={handleEnter} → navigate('/home')、showEnter setTimeout useEffect、装饰线/副标题/进入按钮/版权文案、pointer-events-none 装饰等
- **Test Requirements**:
  - `programmatic` TR-1.1: 代码审阅容器高度 className 含 `h-[360px] md:h-[440px]`、字号档位 48/72/88、graphic top:'middle' + fontFamily、keyframes 百分比和 duration/loop 未变
  - `programmatic` TR-1.2: 代码审阅 path 数据恰好包含 4 个凸起峰（可用肉眼数峰数或按代码注释标记 4 峰），SVG animateMotion + mpath 存在且引用主 path
  - `human-judgement` TR-1.3: 浏览器全宽截图 welcome 7 字母完整不裁切；背景折线只有 4 峰；流光光点沿折线循环流动

## [x] Task 2: HomePage：修复「← 返回封面」按钮点击失效
- **Priority**: high
- **Depends On**: None
- **Acceptance Criteria Addressed**: AC-2
- **Description**:
  - 仅改 `src/pages/HomePage.tsx` 中「← 返回封面」按钮这一处（第 122-127 行附近的 button + 其 absolute 包裹 div）
  - **修复方案（100% 兜底）**：
    - 在文件顶部已有 `import { Link, useNavigate } ...`（`Link` 已经导入，无需新增）
    - 把 `<button onClick={() => navigate('/')}>← 返回封面</button>` **直接替换**为 `<Link to="/">← 返回封面</Link>`；className 原样移植（保持 padding/颜色/边框/圆角/hover 完全一致）
    - 加上 `no-underline inline-flex items-center` 避免 a 标签默认下划线并保持对齐
    - 外层 `absolute top-0 right-0` 容器保留以固定右上位置
  - 其他所有代码不变（导入逻辑、数据集列表、delete、search、useDB 调用等完全不动）
- **Test Requirements**:
  - `programmatic` TR-2.1: 代码审阅按钮实际渲染为 `<Link to="/">`（不是 onClick navigate），className 与旧按钮一致
  - `human-judgement` TR-2.2: 浏览器访问 /home，点按钮 → 成功跳回封面页 `/`

## [x] Task 3: 构建 + 浏览器验证 + 自动提交推送
- **Priority**: high
- **Depends On**: Task 1 & Task 2
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-4
- **Description**:
  - npm run build 必须 exit 0
  - 浏览器验证 `/`：welcome 全字不切、4 驼峰折线、流光光点存在且循环
  - 浏览器验证 `/home`：点返回封面按钮 → 回到 `/`
  - git add WelcomePage.tsx / HomePage.tsx / 本 spec 三份文档 → commit："Fix welcome W clip, home back button, 4-hump line with flowing light" → push origin main
- **Test Requirements**:
  - `programmatic` TR-3.1: build exit 0
  - `programmatic` TR-3.2: push 成功
  - `human-judgement` TR-3.3: 浏览器三项视觉 + 跳转全部通过

# Task Dependencies
- Task 3 depends on Task 1 & Task 2（Task 1 & 2 可并行）
