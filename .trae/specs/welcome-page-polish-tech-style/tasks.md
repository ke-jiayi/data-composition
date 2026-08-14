# WelcomePage 科技感配色升级 - 实施计划

## [x] Task 1: 修复 welcome 文字裁切并按新配色重写 WelcomePage
- **Priority**: high
- **Depends On**: None
- **Description**:
  - 仅修改 `src/pages/WelcomePage.tsx` 一个文件
  - 修复"welcome"不完整显示：加大 ECharts 容器高度（如 `h-[300px] md:h-[380px]`）；字号略下调为 `<640:52 / <1024:78 / 96`；graphic text style 中新增 `textVerticalAlign:'middle'`；`lineWidth` 从 1 提升到 1.5 保持描边清晰但不溢出
  - **ECharts 动画流程完全不动**：保留 `duration:3000 loop:true`、keyframes 百分比 0.7/0.8/1、stroke→fill 流程不变；只改颜色值：`stroke:'#6BC5E8'`（冰蓝描边），最终 `fill:'#7B4B9E'`（暗紫填充），`lineDash/lineDashOffset` 数字不变
  - 背景配色：外容器 `bg-gradient-to-b from-[#1A1A1E] via-[#1E1E24] to-[#1A1A1E]`（深碳灰）
  - 背景折线：删除旧的 3 条紫色折线 + 密集网格线 + base64 网格 + 两个紫色光晕；替换为 **1 条大幅波动的主折线**（path 数据使幅度占 viewBox 60%+，包含暗紫→冰蓝的 linearGradient stroke）+ **数据点**（每个转折点一个小圆点填充冰蓝/暗紫）+ 极少的辅助线（可保留 4 条水平参考线，低 opacity）；整体 opacity 0.55 左右、层级低于前景、pointer-events:none
  - 主标题下方装饰线：`via-#5BB8D9`（冰蓝）细线条（1px 高，宽 48 合适，不要太粗）
  - 副标题文字 color 用暗紫浅色（如 `text-[#7B4B9E]/70`），不要大面积冰蓝
  - 进入提示按钮：冰蓝极细边框（`border-#5BB8D9/50 border`）、深碳灰半透明背景、暗紫色文字；不要大面积冰蓝
  - 底部版权：暗紫浅色 + 冰蓝可点缀
  - 保留：最外层 div `onClick={handleEnter}`、`cursor-pointer select-none`、`handleEnter → navigate('/home')`、`showEnter` 的 setTimeout/useEffect、装饰线结构、副标题 DATA PORTFOLIO、进入提示按钮文案、版权文案；背景装饰和 ECharts 容器均 `pointer-events-none`
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Test Requirements**:
  - `programmatic` TR-1.1: `npm run build` 成功，TypeScript 无错
  - `programmatic` TR-1.2: 代码审阅确认 keyframes 百分比（0.7/0.8/1）、duration=3000、loop=true 均未改动；仅 stroke/fill 颜色和 lineWidth 变化
  - `programmatic` TR-1.3: 代码审阅确认容器高度 className 含 `h-[300px] md:h-[380px]`（或更高），style 含 `textVerticalAlign:'middle'`
  - `programmatic` TR-1.4: 代码审阅 onClick 仍在最外层 div，ECharts 容器与背景装饰均 `pointer-events-none`
  - `human-judgement` TR-1.5: 本地浏览器截图——welcome 7 字母完整无裁切，背景深碳灰、折线带数据点渐变、整体简洁居中
- **Notes**: 背景折线可以用 SVG `<defs><linearGradient id="lineGrad"><stop offset="0%" stop-color="#7B4B9E"/><stop offset="100%" stop-color="#6BC5E8"/></linearGradient></defs>`；数据点在转折点以 `<circle>` 呈现（半径 3-4，半透明）

## [/] Task 2: 构建验证、浏览器测试、自动提交推送
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - 启动/重启 dev server，打开 `/` 路由：
    - 验证 welcome 完整显示、冰蓝→暗紫描边动画按 3s 循环
    - 点击跳转至 /home 正常
  - 运行 `npm run build` 确认构建 0 错误
  - git add WelcomePage.tsx 与本 spec 文档 → commit（消息："Polish WelcomePage: deep-carbon bg, purple/iceblue palette, fix welcome text clip"）→ push origin main
- **Acceptance Criteria Addressed**: AC-5, AC-7, AC-1
- **Test Requirements**:
  - `programmatic` TR-2.1: `npm run build` exit 0
  - `programmatic` TR-2.2: `git push` 成功，上游 main 包含最新提交
  - `human-judgement` TR-2.3: 浏览器验证 welcome 完整不裁切、点击跳转正常
- **Notes**: 推送完成后告知用户 Cloudflare Pages 自动部署中

# Task Dependencies
- Task 2 depends on Task 1
