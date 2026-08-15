# Checklist

## ThemeToggle 组件
- [x] 垂直轨道（霓虹蓝/暗紫线条 + 微弱发光）
- [x] 圆形滑块可拖拽（鼠标 mousedown/move/up）
- [x] 顶部太阳 ☀️（暖黄 #FCD34D），底部月亮 🌙（冰蓝 #6BC5E8）
- [x] 松开吸附到最近端（300ms 过渡动画）
- [x] 拖拽中图标颜色渐变（太阳↔月亮）
- [x] 点击事件 stopPropagation 防止冒泡

## 主题管理
- [x] useTheme hook 管理 light/dark 状态
- [x] localStorage 持久化（key: `theme`）
- [x] 在 `<html>` 上切换 `.light` / `.dark` 类
- [x] 默认为 dark（黑夜模式）
- [x] main.tsx 初始化主题防闪烁

## 浅色主题覆盖
- [x] 页面主背景 #0a0e1a → #F8F9FA
- [x] 卡片背景 #26262C → #FFFFFF
- [x] 次要背景 #1E1E24 → #F0F0F4
- [x] 主文字 #FFFFFF → #1A1A1E
- [x] 正文 #D1D5DB → #4B5563
- [x] 辅助 #9CA3AF → #6B7280
- [x] 边框 #3A3A44 → #E5E7EB
- [x] Header/Sidebar 半透明背景兼容
- [x] WelcomePage 渐变背景兼容

## 集成
- [x] WelcomePage 右上角放置 ThemeToggle（absolute top-6 right-6 z-20）
- [x] ThemeToggle 不触发 WelcomePage 进入导航
- [x] 切换主题后所有页面配色跟随变化

## 通用
- [x] TypeScript 编译通过（`npx tsc --noEmit` 无错误）
- [x] 变更已提交并推送到 origin/main
