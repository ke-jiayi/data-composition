# Checklist

## ThemeToggle 组件
- [ ] 垂直轨道（霓虹蓝/暗紫线条 + 微弱发光）
- [ ] 圆形滑块可拖拽（鼠标 mousedown/move/up）
- [ ] 顶部太阳 ☀️（暖黄 #FCD34D），底部月亮 🌙（冰蓝 #6BC5E8）
- [ ] 松开吸附到最近端（300ms 过渡动画）
- [ ] 拖拽中图标颜色渐变（太阳↔月亮）
- [ ] 点击事件 stopPropagation 防止冒泡

## 主题管理
- [ ] useTheme hook 管理 light/dark 状态
- [ ] localStorage 持久化（key: `theme`）
- [ ] 在 `<html>` 上切换 `.light` / `.dark` 类
- [ ] 默认为 dark（黑夜模式）
- [ ] main.tsx 或 index.html 初始化主题防闪烁

## 浅色主题覆盖
- [ ] 页面主背景 #0a0e1a → #F8F9FA
- [ ] 卡片背景 #26262C → #FFFFFF
- [ ] 次要背景 #1E1E24 → #F0F0F4
- [ ] 主文字 #FFFFFF → #1A1A1E
- [ ] 正文 #D1D5DB → #4B5563
- [ ] 辅助 #9CA3AF → #6B7280
- [ ] 边框 #3A3A44 → #E5E7EB
- [ ] Header/Sidebar 半透明背景兼容
- [ ] WelcomePage 渐变背景兼容

## 集成
- [ ] WelcomePage 右上角放置 ThemeToggle（absolute top-6 right-6 z-20）
- [ ] ThemeToggle 不触发 WelcomePage 进入导航
- [ ] 切换主题后所有页面配色跟随变化

## 通用
- [ ] TypeScript 编译通过（`npx tsc --noEmit` 无错误）
- [ ] 变更已提交并推送到 origin/main
