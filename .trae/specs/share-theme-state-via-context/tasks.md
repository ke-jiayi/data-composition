# Tasks

- [x] Task 1: 新建 `src/contexts/ThemeContext.tsx`
  - [x] 定义 `Theme = 'light' | 'dark'` 类型
  - [x] 创建 `ThemeContext`，值为 `{ theme, setTheme, toggleTheme } | null`
  - [x] 实现 `ThemeProvider` 组件：把现有 useTheme 的 useState + localStorage + html class 逻辑搬入
  - [x] 导出 `ThemeProvider` 和 `ThemeContext`

- [x] Task 2: 改写 `src/hooks/useTheme.ts`
  - [x] 内部改为 `useContext(ThemeContext)`
  - [x] 若 context 为 null（Provider 外调用）抛出错误
  - [x] 对外 API 保持 `{ theme, setTheme, toggleTheme }` 不变
  - [x] 保留 `Theme` 类型导出

- [x] Task 3: 在 `src/App.tsx` 用 `ThemeProvider` 包裹应用
  - [x] import `ThemeProvider`
  - [x] 在 `App` 函数中把 `ThemeProvider` 放最外层，包裹 `ImportModalProvider`（或同级，确保覆盖所有路由）

- [x] Task 4: 验证编译与构建
  - [x] `npx tsc --noEmit` 无错误
  - [x] `npx vite build` 成功

- [x] Task 5: 提交并推送
  - [x] git add / commit / push 到 origin/main

# Task Dependencies
- [Task 2] 依赖于 [Task 1] 完成
- [Task 3] 依赖于 [Task 2] 完成
- [Task 4] 依赖于 [Task 3] 完成
- [Task 5] 依赖于 [Task 4] 验证通过
