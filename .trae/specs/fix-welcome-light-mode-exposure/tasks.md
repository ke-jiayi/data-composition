# WelcomePage 白天模式修复 - 实施计划

## [x] Task 1: 重写 WelcomePage 为主题感知组件，逐个替换硬编码颜色
- **Priority**: high
- **Depends On**: None
- **Status**: completed
- **Description**: 
  - 在 WelcomePage.tsx 中引入 `useTheme` hook（`theme` 值为 `'light' | 'dark'`）
  - 基于 theme 定义颜色配置对象 `colors`：为以下每一项提供 light/dark 双值：
    - `welcomeDrawFill`: 黑夜 `#FFFFFF` / 白天 `#1A1A2E`
    - `welcomeStroke`: 黑夜 `#6C3B9A` / 白天 `#2C5282`（深青蓝描边）
    - `welcomeDropShadow`: 黑夜 `drop-shadow(0 0 8px rgba(107,197,232,0.25))` / 白天 `drop-shadow(0 0 4px rgba(44,82,130,0.3))`（减弱发光，深蓝影）
    - `neonColor`: 黑夜 `#5FFBF1` / 白天 `#2C5282`（深青蓝文字）
    - `neonGlow`: 黑夜 `0 0 5px #5FFBF1, 0 0 10px #5FFBF1` / 白天 `0 0 4px rgba(44,82,130,0.35), 0 0 8px rgba(44,82,130,0.2)`（subtle glow，不曝光）
    - `neonGlowHover`: 黑夜 `0 0 8px #5FFBF1, 0 0 16px #5FFBF1, 0 0 24px #5FFBF1` / 白天 `0 0 6px rgba(44,82,130,0.5), 0 0 12px rgba(44,82,130,0.35), 0 0 18px rgba(44,82,130,0.25)`
    - `gradStart`: 黑夜 `#7B4B9E` / 白天 `#553C9A`（深紫蓝，在浅背景对比足够）
    - `gradEnd`: 黑夜 `#6BC5E8` / 白天 `#3182CE`（深蓝）
    - `dotFill`: 黑夜 `#6BC5E8` / 白天 `#3182CE`
    - `dotOpacity`: 黑夜 `0.85` / 白天 `1`（白天不透明增加对比）
    - `gridLineStroke`: 黑夜 `#7B4B9E` / 白天 `#2C5282`
    - `gridLineOpacity`: 黑夜 `0.08` / 白天 `0.15`
    - `softGlowBlur`: 黑夜 `2.5` / 白天 `1.5`（白天减少发光模糊量）
    - `softGlowOpacity`: 可通过 `<filter>` 中增加 opacity 或直接调值
  - 动态生成 `@keyframes welcome-draw` 和 `@keyframes neon-flicker` 的 fill / textShadow 值，使 style 字符串使用模板字面量注入 theme 对应颜色
  - 进入提示的内联 color/textShadow 使用 colors 对象；hover 处理函数中的 textShadow 也使用 colors 对象（而非硬编码 `#5FFBF1`）
  - SVG `<linearGradient>` stopColor、网格线 stroke/opacity、圆圈 fill/opacity、欢迎文字 stroke/filter、softGlow filter 的 stdDeviation 均使用 `colors.xxx`
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-4, AC-5
- **Test Requirements**:
  - `programmatic` TR-1.1: 组件无 TypeScript 错误，`useTheme` 正确引入和使用
  - `programmatic` TR-1.2: keyframe 字符串正确插值颜色（theme='dark' 时产出 `fill: #FFFFFF`，theme='light' 时产出 `fill: #1A1A2E`）
  - `programmatic` TR-1.3: hover 处理不再包含硬编码 `#5FFBF1`
  - `human-judgement` TR-1.4: 白天模式 welcome 文字 fill 不是白、不是曝光；进入提示清楚；SVG 元素可见
  - `human-judgement` TR-1.5: 黑夜模式视觉与原版一致（颜色、发光、描边、动画）
- **Notes**: 
  - 动态 style 标签中 keyframe 字符串是纯字符串插值，这是处理内联 keyframe fill 颜色的唯一可靠方案
  - 所有内联颜色值必须从同一个 colors 对象读取，确保一致性
  - 确保 `ThemeToggle` 容器的 stopPropagation、导航行为、1500ms enter 显示延迟等行为完全不变

## [x] Task 2: 验证编译与构建
- **Priority**: high
- **Depends On**: Task 1
- **Status**: completed
- **Description**: 运行 TypeScript 和 Vite 构建验证
- **Acceptance Criteria Addressed**: AC-6
- **Test Requirements**:
  - `programmatic` TR-2.1: `npx tsc --noEmit` 退出码 0，无错误输出 [PASS]
  - `programmatic` TR-2.2: `npx vite build` 成功，CSS/JS 资源生成 [PASS]

## [/] Task 3: 提交并推送
- **Priority**: high
- **Depends On**: Task 2
- **Description**: git add/commit/push
- **Acceptance Criteria Addressed**: AC-7
- **Test Requirements**:
  - `programmatic` TR-3.1: git push 成功，main 分支远端更新
