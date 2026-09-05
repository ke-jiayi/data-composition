# WelcomePage 白天模式修复 - 验证清单

- [x] AC-1 / TR-1.4a: 白天模式 welcome 文字动画 fill 结束为 `#1A1A2E`（深灰蓝），无白色曝光
- [x] AC-2 / TR-1.5a: 黑夜模式 welcome 文字 fill 结束仍为 `#FFFFFF`，描边 `#6C3B9A`
- [x] AC-3 / TR-1.4b: 白天模式"点击任意位置进入"颜色为深青蓝（`#2C5282` 系），textShadow 为 subtle 不刺眼，悬停仍可见
- [x] AC-4 / TR-1.5b: 黑夜模式"点击任意位置进入"仍为 `#5FFBF1` 霓虹青 + neon-flicker 发光
- [x] AC-5 / TR-1.4c: 白天模式 SVG 渐变曲线使用深蓝/深紫蓝系，网格线、圆点在 `#F0F4F8` 背景上可见
- [x] AC-5 / TR-1.5c: 黑夜模式 SVG 渐变/圆点/网格线保持原版颜色和发光
- [x] 一般: hover 处理器内无硬编码 `#5FFBF1` 字符串残留
- [x] 一般: 动态 style 标签 keyframe 字符串插值正确（白天/黑夜两套值）
- [x] 一般: useTheme hook 正确引入，theme 变化会触发组件 re-render 切换颜色
- [x] AC-6 / TR-2.1: `npx tsc --noEmit` 无错误
- [x] AC-6 / TR-2.2: `npx vite build` 成功
- [x] AC-7 / TR-3.1: 变更已提交并推送到 origin/main
