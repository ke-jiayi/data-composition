# Checklist

## 组件实现
- [x] `ThemeToggle.tsx` 使用提供的 Within 组件（SVG 日/月图标）
- [x] 点击按钮调用 `toggleTheme` 切换主题
- [x] 按钮颜色：黑夜模式 `#6BC5E8`，白天模式 `#7B4B9E`
- [x] 按钮大小适中（`text-3xl`）
- [x] 保留具名导出 `ThemeToggle` 和默认导出（WelcomePage 导入不变）
- [x] 不再包含拖拽逻辑（mousedown/mousemove/mouseup）

## 主题联动
- [x] 切换时 `<html>` 的 `dark`/`light` class 正确切换
- [x] `localStorage` 持久化用户偏好
- [x] 默认黑夜模式
- [x] 所有页面背景色、文字颜色、卡片颜色同步切换（已由 index.css 覆盖规则保证）

## 防误触
- [x] WelcomePage 中按钮容器保留 `stopPropagation`，点击按钮不触发进入首页

## 验证
- [x] TypeScript 编译通过（`npx tsc --noEmit` 无错误）
- [x] 变更已提交并推送到 origin/main
