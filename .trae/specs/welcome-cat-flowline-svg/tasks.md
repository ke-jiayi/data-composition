# Tasks

- [x] Task 1: 改造封面页背景流光 SVG（src/pages/WelcomePage.tsx）
  - [x] SubTask 1.1: `colors` 渐变方向调整——暗色 `gradStart: '#6BC5E8'`、`gradEnd: '#7B4B9E'`；浅色保持 `'#00D4FF' → '#60A5FA'` 不变
  - [x] SubTask 1.2: 6 个静态数据点 `<circle>` → 🐱 内联 SVG `<text>`（沿用 `linePoints` 索引 [0,2,4,6,8,11]，`textAnchor="middle"` + `dominantBaseline="central"` 居中）
  - [x] SubTask 1.3: 移动流光 `<animateMotion>` `dur` 6s → 8s
  - [x] SubTask 1.4: 增强发光——线条 `#softGlow` stdDeviation 2.5/1.5→3.5/2.5；新增 `#flowGlow`（stdDeviation 4.5/3，双 blur 叠加）用于移动流光点
  - [x] SubTask 1.5: 确认满屏无左右留白——路径首点 x=0 / 末点 x=1280，`<svg>` 保留 `absolute inset-0 w-full h-full` + `preserveAspectRatio="none"`；装饰网格线与 `pointer-events-none` 未动
- [x] Task 2: 编译 + 浏览器验证
  - [x] SubTask 2.1: `npx tsc --noEmit` 退出码 0
  - [x] SubTask 2.2: 浏览器（封面页）——路径左右铺满无留白；6 个 🐱 `<text>` 存在且数据点 `<circle>` 数为 0；`animateMotion` dur="8s"；发光 filter 生效；暗色渐变 stop-color=`#6BC5E8`→`#7B4B9E`；无 console error；welcome 文字 svg 正常

# Completion Evidence
- tsc 退出码 0
- 暗色实测：themeClass='dark'、svgPreserve='none'、svgViewBox='0 0 1280 720'、svgLeft=0、svgWidth=viewportW、pathBBoxX=0、pathBBoxW=1280、gradientStops=['#6BC5E8','#7B4B9E']、catCount=6、dataPointCircles=0、totalCircles=1、animateMotionDur='8s'、softGlowStd='3.5'、flowGlowStd='4.5'、welcomeTextSvgPresent=true
- 浅色实测：themeClass='light'、gradientStops=['#00D4FF','#60A5FA']、catCount=6
- 截图确认：猫图标可见、折线左右贯通至边缘、发光明显
- console 无 error/warning（仅 React DevTools info）
- 代码审查：无 echarts import；装饰网格线保留；仅修改 WelcomePage.tsx

# Task Dependencies
- Task 2 depends on Task 1
