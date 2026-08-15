# Checklist

## 组件实现
- [ ] `ThemeToggle.tsx` 使用提供的 Within 组件（SVG 日/月图标）
- [ ] 点击按钮调用 `toggleTheme` 切换主题
- [ ] 按钮颜色：黑夜模式 `#6BC5E8`，白天模式 `#7B4B9E`
- [ ] 按钮大小适中（`text-3xl`）
- [ ] 保留具名导出 `ThemeToggle` 和默认导出（WelcomePage 导入不变）
- [ ] 不再包含拖拽逻辑（mousedown/mousemove/mouseup）

## 主题联动
- [ ] 切换时 `<html>` 的 `dark`/`light` class 正确切换
- [ ] `localStorage` 持久化用户偏好
- [ ] 默认黑夜模式
- [ ] 所有页面背景色、文字颜色、卡片颜色同步切换（已由 index.css 覆盖规则保证）

## 防误触
- [ ] WelcomePage 中按钮容器保留 `stopPropagation`，点击按钮不触发进入首页

## 验证
- [ ] TypeScript 编译通过（`npx tsc --noEmit` 无错误）
- [ ] 变更已提交并推送到 origin/main
