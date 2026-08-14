# 封面页 + 首页修复小改 PRD

## Overview
- **Summary**: 修复当前三个问题：1）WelcomePage 的 ECharts "welcome"首字母 w 仍被裁切/显示不全（容器再加高、字号再下调、增加 padding 安全区、用 ECharts init 时显式指定 wider canvas/容器）；2）HomePage 右上角「← 返回封面」按钮点击无反应（检查 onClick 与 navigate('/') 绑定、是否被上层元素遮挡、添加 debug/或改用 Link 组件兜底替代）；3）WelcomePage 背景折线"驼峰（峰谷转折点）"缩减到仅 4 个大峰，保留冰蓝/暗紫渐变，并沿折线增加一个持续循环的流光光点（沿 SVG path 运动的 circle/光点，体现"流光流过"）。完成后自动提交推送。
- **Purpose**: 解决用户肉眼可见的 UI 裁切与功能失效问题，降低折线复杂度并增加流动光感动。
- **Target Users**: 访问 `/` 封面页与 `/home` 数据首页的用户

## Goals
- welcome 的 w（及全部字母）完整显示，各帧无裁切
- 首页「← 返回封面」按钮 100% 可点击（无论 JS/路由状态如何都能跳转）
- 折线仅 4 个驼峰（峰），有 1 个流光光点沿折线路径循环移动

## Non-Goals (Out of Scope)
- 不修改 ECharts keyframeAnimation 流程参数（3s loop / keyframes 0.7/0.8/1 保持不动；仍只改颜色与字号/容器等）
- 不修改配色方案（仍深碳灰 #1A1A1E + 暗紫 #7B4B9E 主色 + 冰蓝 #6BC5E8 点缀）
- 不修改 Layout / 其他页面
- HomePage 其他功能逻辑不改动（导入、搜索、删除等）

## Background & Context
当前 WelcomePage（src/pages/WelcomePage.tsx 第 15-84 行）：
- ECharts 容器 `h-[300px] md:h-[380px]`、fontSize `52/78/96`、graphic style `left:center top:center textVerticalAlign:middle`
- 用户反馈 **"w 还是显示不完全"**：原因是 graphic text 用 `top:'center'` 时 ECharts 的文字字形盒模型（加上粗 stroke 向外溢）仍会溢出——解决方案：把容器再显著加高到 `h-[360px] md:h-[440px]`；字号再下调 `48/72/88`；option 里 graphic.elements[0] 加 `bounding:'raw'`（避免按默认裁切）并把 top 改为 `'middle'`（更垂直居中）；或显式加 paddingTop/paddingBottom（在 echarts.init 可用时先 resize 给安全高度）。更直接的是在 graphic style 加 `fontFamily:'Inter, system-ui, "Segoe UI", sans-serif'`（某些默认字体字形上下空间不足），同时 `lineWidth` 仍 1.5 不变。
- 折线目前 17 个点，有 8+ 个"驼峰峰谷"。需要改造为只有 4 个大峰的 path 数据（并仅在峰顶点与谷顶点保留 circle 数据点，约 4 个峰 + 若干谷，总点数控制 10 个以内）。
- "流光流过"：在折线上方新增一个 `<circle>`（r=5~6，冰蓝，强 glow 滤镜），用 framer-motion（项目已安装）的 `useMotionValue` + `useTransform` + `useAnimationFrame` 或更简单的 SVG `<animateMotion>`（沿 <path> 运动，dur=6s repeatCount=indefinite，rotate=auto），`path` 与主折线相同，实现光点循环移动。尽量用原生 SVG `<animateMotion>`（不用新依赖、CSS/SVG 动画更稳）。

HomePage（src/pages/HomePage.tsx 第 122-127 行）：
- 「← 返回封面」按钮目前：`<button onClick={() => navigate('/')} className="...absolute top-0 right-0">`，放在 `div.relative` 里。按钮失效的可能原因：父级 `text-center` div 的层级问题、position 堆叠被 Layout/Header 的 z-index 覆盖、或 onClick 里 navigate('/') 与当前 router 路径冲突、或 useNavigate hook 实例化顺序问题、或父级 Layout 有透明层挡。**最可靠修复**：把 `<button onClick>` 替换为 `react-router-dom` 的 `<Link to="/" className="按钮样式保持不变">← 返回封面</Link>`——Link 组件即使 navigate 有问题也会走原生 href，100% 可点。如果不希望 Link 样式被 `<a>` 默认下划线影响，加 `no-underline` / `inline-flex items-center` 即可。

## Functional Requirements
- **FR-1**: WelcomePage 的"welcome"英文单词每个字母（尤其首字母 w）完整显示、无裁切
- **FR-2**: HomePage 右上角「← 返回封面」按钮点击后立即跳转到 `/`（封面页）
- **FR-3**: WelcomePage 背景折线仅有 4 个驼峰（大峰），沿折线持续有 1 个"流光光点"循环流过

## Non-Functional Requirements
- **NFR-1**: ECharts keyframeAnimation 流程参数不变（duration 3000、loop true、keyframes 0.7/0.8/1 数字不变、lineDash 数字不变）
- **NFR-2**: 配色不变
- **NFR-3**: HomePage 其他数据功能零回归

## Constraints
- **Technical**: React 19 + react-router-dom v7 + Tailwind v4；framer-motion ^12 已安装（可用但优先 SVG animateMotion）；仅修改 WelcomePage.tsx 与 HomePage.tsx 两个文件
- **Compliance**: 改完自动 git commit + push origin main

## Acceptance Criteria

### AC-1: welcome 的 w 及全部字母完整不裁切
- **Given**: 桌面与移动端访问 `/`
- **When**: ECharts 动画在任意帧
- **Then**: w、e、l、c、o、m、e 7 字母上下左右无明显裁切或容器边缘切断
- **Verification**: `programmatic`（容器高度 >= h-360 md:h-440 + 字号 <= 48/72/88 + top:'middle' + fontFamily 设置） + `human-judgment`（浏览器全屏截图审阅）

### AC-2: 首页返回封面按钮 100% 有效
- **Given**: 在 `/home` 页面，处于任意状态（加载中/空/有数据）
- **When**: 用户点击「← 返回封面」按钮
- **Then**: URL 跳转到 `/`，显示封面页
- **Verification**: `programmatic`（按钮用 `<Link to="/">` 而非 onClick navigate 兜底；或代码审阅两者并存也可，但 Link 为首选）+ `human-judgment`（浏览器点击验证）

### AC-3: 折线仅 4 驼峰 + 有流光光点循环流过
- **Given**: 访问 `/` 封面页
- **When**: 观察背景层
- **Then**: 主折线只有 4 个大峰（可有数个谷点，但凸起峰数量 = 4），且有 1 个冰蓝光点以 5-8s 为周期沿折线持续循环移动
- **Verification**: `human-judgment`（浏览器动图/多帧截图观察光点位置变化 + 代码审阅 animateMotion）

### AC-4: 构建成功并自动推送
- **Given**: 改完代码
- **When**: build + push
- **Then**: npm run build exit 0；push 成功
- **Verification**: `programmatic`
