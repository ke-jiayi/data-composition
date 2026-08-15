# Checklist

## 配置
- [ ] `src/index.css` 在 `@import "tailwindcss";` 后添加 `@custom-variant dark (&:where(.dark, .dark *));`
- [ ] 黑夜模式（`html.dark`）下 Within 组件显示月亮形态
- [ ] 白天模式（`html.light`）下 Within 组件显示太阳形态
- [ ] 黑夜模式下按钮颜色为冰蓝 `#6BC5E8`
- [ ] 白天模式下按钮颜色为暗紫 `#7B4B9E`

## 验证
- [ ] TypeScript 编译通过（`npx tsc --noEmit` 无错误）
- [ ] 变更已提交并推送到 origin/main
