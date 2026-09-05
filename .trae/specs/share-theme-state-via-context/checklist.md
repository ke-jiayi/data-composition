# Checklist

## Context 实现
- [x] `src/contexts/ThemeContext.tsx` 存在，导出 `ThemeProvider` 和 `ThemeContext`
- [x] `ThemeProvider` 内部管理单一 theme state，切换时同步 localStorage 和 html class
- [x] `ThemeContext` 默认值为 null

## useTheme 改写
- [x] `useTheme` 内部使用 `useContext(ThemeContext)`
- [x] Provider 外调用 `useTheme` 抛出明确错误
- [x] 对外 API `{ theme, setTheme, toggleTheme }` 保持不变
- [x] WelcomePage 和 ThemeToggle 调用代码无需修改

## App 包裹
- [x] `App.tsx` 用 `ThemeProvider` 包裹整个应用
- [x] Provider 位于 Router 之外或确保覆盖所有路由

## 行为验证
- [x] WelcomePage 点击切换按钮后颜色立即变化（无需跳转）
- [x] 黑夜 ↔ 白天切换后 localStorage 同步保存
- [x] 刷新页面后主题保持，无白屏闪烁（main.tsx 防闪烁仍有效）
- [x] 黑夜模式所有样式不受影响

## 编译验证
- [x] `npx tsc --noEmit` 无错误
- [x] `npx vite build` 成功
- [x] 变更已提交并推送到 origin/main
