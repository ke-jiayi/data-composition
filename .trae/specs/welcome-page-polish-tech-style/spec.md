# 封面页 Welcome 配色与科技感升级 PRD

## Overview
- **Summary**: 按指定配色方案重做 WelcomePage（封面页）视觉：深碳灰背景、暗紫主色、冰蓝点缀，背景替换为带数据点的大幅波动暗紫→冰蓝渐变折线流光；修复当前"welcome"文字在 ECharts 容器中被裁切/未完全显示的问题（增大容器、控制 fontSize/lineDash）；保留 ECharts 描边动画循环、保留点击任意位置进入 `/home`、保持全屏居中、整体简洁干净。**动画效果参数（3s loop、keyframes 百分比、stroke→fill 流程）完全不动，仅改颜色值以适配新配色**。末尾自动提交推送到 GitHub 触发 Cloudflare Pages 部署。
- **Purpose**: 摆脱当前封面页"廉价感"配色与拥挤感，呈现专业数据分析师风格。
- **Target Users**: 访问 `/` 路由的访客。

## Goals
- 修复 welcome 英文文字不完整/被裁切的问题
- 按配色方案：深碳灰背景 + 暗紫主色 + 冰蓝点缀（少量线条/边框）
- 背景实现单条大幅波动、带数据点、暗紫→冰蓝渐变的折线流光（替换现有多条紫色折线+密网格）
- 标题字号/字体呈现粗体、瘦高的科技感（类似电影海报）
- 保持全屏居中布局与"点击任意位置进入"交互

## Non-Goals (Out of Scope)
- 不修改 HomePage、ProjectDetailPage 等其他页面
- 不修改 ECharts keyframeAnimation 的 duration、loop、keyframes 百分比/逻辑（只改 stroke/fill/lineWidth 等颜色值）
- 不增加图标/emoji/装饰性元素
- 不改变路由逻辑与跳转路径

## Background & Context
当前 WelcomePage（`src/pages/WelcomePage.tsx`）：
- 背景 `from-[#0a0e1a] via-[#0f0a1e] to-[#0a0e1a]`（深蓝黑）+ 两个紫色光晕 + 一个含 3 条紫色折线 + 网格线的 SVG（viewBox 1280x600）+ base64 网格
- 标题区：ECharts 容器 `w-full h-[200px] md:h-[260px]`，fontSize `<640:60 / <1024:88 / 110`，style `top:'center' left:'center'`；用户反馈"字体没有完全显示出来"——原因是容器高度偏小 / 加粗描边 + lineDash 叠加后视觉超出 + `top:'center'` 在宽屏下瘦高字垂直偏上/下，需要把容器加高 + 控制 stroke 粗细 + 字号略下调并加 `textVerticalAlign:'middle'`（ECharts graphic text 的该属性）
- 现有 ECharts 参数：`stroke:#22d3ee lineWidth:1 lineDash:[0,200] lineDashOffset:0 fill:transparent` → keyframes 0.7 `lineDashOffset:200 lineDash:[200,0] fill:transparent` → 0.8 fill:transparent → 1 `fill:#a855f7`
- 进入提示：紫色 pill 按钮

新配色（由用户指定）：
- 背景色：深碳灰 `#1A1A1E`（或 `#1E1E24`，按效果取其一即可）
- 主色调：暗紫色 `#6C3B9A` 或 `#7B4B9E`，用于主要文字、边框
- 点缀色：冰蓝色 `#6BC5E8` 或 `#5BB8D9`，仅用于极细装饰线条与按钮边框，不大面积使用

## Functional Requirements
- **FR-1**: WelcomePage 中央显示的"welcome"动画文字必须完整可见，不被容器裁切或遮挡
- **FR-2**: 页面背景使用用户指定配色：深碳灰底色、单条大幅波动折线流光（带数据点、暗紫→冰蓝渐变、强幅度、流动感）
- **FR-3**: 装饰性线条（标题下划线、按钮边框、细装饰线）仅使用冰蓝色
- **FR-4**: 点击页面任意区域仍能跳转到 `/home`
- **FR-5**: 全屏居中布局，整体简洁干净

## Non-Functional Requirements
- **NFR-1**: ECharts 动画的时长（3000ms）、循环（loop:true）、keyframes 百分比（0.7/0.8/1）、stroke→fill 流程**完全保持不变**，仅改 stroke/fill/lineWidth 颜色相关值
- **NFR-2**: 背景折线作为装饰，`pointer-events-none`，不阻挡前景交互且不遮挡文字（使用 opacity/层级控制）
- **NFR-3**: 响应式：移动端和桌面端 welcome 文字完整、布局居中

## Constraints
- **Technical**: 仅修改 `src/pages/WelcomePage.tsx`（允许修改 `src/index.css` 中极少数与封面页相关的全局变量以适配配色，但**优先内联 className**）；ECharts ^6.1.0 已安装；使用 React 19 + Vite + Tailwind v4
- **Dependencies**: 无新增依赖
- **Compliance**: 自动提交并推送 GitHub（git commit + git push）

## Assumptions
- "HomePage"为用户笔误，实际修改 WelcomePage（封面页，即显示 welcome 文字和"点击任意位置进入"的那一页）；因为用户同时提及"welcome 字体"、"点击任意位置进入"、"折线流光背景"、"全屏居中布局"——这些均只在 WelcomePage 出现。此 spec 按 WelcomePage 改造。
- "动画效果不用动"指 ECharts 的描边→填充动画流程不变，颜色值需要按新配色替换。

## Acceptance Criteria

### AC-1: welcome 文字完整显示不裁切
- **Given**: 用户在桌面或移动端浏览器访问 `/`
- **When**: 封面页渲染完成且 ECharts 动画播放
- **Then**: "welcome"每个字母（w e l c o m e）在各阶段均完整可见，上/下/左/右无明显裁切或被遮挡
- **Verification**: `human-judgment` + `programmatic`（容器 className 确认高度 >= 300px（md >= 360px），style 含 textVerticalAlign: 'middle'）

### AC-2: 配色按用户指定
- **Given**: 封面页渲染完成
- **When**: 观察背景、主文字、点缀线条
- **Then**: 背景为深碳灰 `#1A1A1E` / `#1E1E24`；主色调（边框、标题填充色）为暗紫 `#6C3B9A` / `#7B4B9E`；点缀色（下划线、按钮描边细线条、按钮边框）为冰蓝 `#6BC5E8` / `#5BB8D9` 且未大面积使用
- **Verification**: `human-judgment`

### AC-3: 背景折线流光（大幅波动 + 带数据点 + 暗紫→冰蓝渐变）
- **Given**: 封面页渲染完成
- **When**: 观察背景层
- **Then**: 存在一条主要折线，幅度大（起点到最低点落差占屏幕高度 60%+），带数据点（圆点），折线 stroke 呈现暗紫→冰蓝的渐变（可用多段 path 或 linearGradient）；视觉呈流动感；不遮挡前景文字（opacity 适中 + 层级低于前景）
- **Verification**: `human-judgment`

### AC-4: ECharts 动画流程保持不变
- **Given**: 封面页 ECharts 初始化
- **When**: 观察 3 秒动画循环
- **Then**: duration 3000ms、loop:true、keyframes 在 70%、80%、100% 的执行逻辑（描边绘制 → 停顿 → 填充）完全保持不变；仅颜色值为新配色（stroke 为冰蓝 #6BC5E8、fill 为暗紫 #7B4B9E）
- **Verification**: `programmatic`（代码审阅 option.keyframeAnimation.keyframes 百分比与 duration/loop 值）

### AC-5: 点击任意位置进入仍正常
- **Given**: 封面页渲染完成
- **When**: 用户点击页面任意空白/背景区域
- **Then**: URL 跳转到 `/home`，显示数据首页
- **Verification**: `programmatic`（代码审阅 handleEnter/onClick 未修改 + `pointer-events:none` 仍作用于 ECharts 容器与背景装饰）

### AC-6: 全屏居中简洁干净
- **Given**: 封面页渲染完成
- **When**: 观察整体布局
- **Then**: welcome 标题 + 装饰线 + 副标题 + 进入提示整体在视口垂直水平居中；没有多余 emoji/密集网格/杂乱光晕；保留底部版权
- **Verification**: `human-judgment`

### AC-7: 构建成功并自动推送
- **Given**: 代码修改完成
- **When**: 执行 `npm run build` 与 `git commit + push`
- **Then**: TypeScript + Vite build exit code 0；main 分支推送到 GitHub 成功；触发 Cloudflare Pages 部署
- **Verification**: `programmatic`

## Open Questions
- [ ] 用户最终确认 WelcomePage（封面页）是本次目标而非 HomePage（数据首页）——根据措辞已按 WelcomePage 处理
