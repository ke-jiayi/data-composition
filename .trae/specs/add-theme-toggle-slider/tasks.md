# Tasks

- [ ] Task 1: 创建 `src/hooks/useTheme.ts` 主题管理 hook
  - [ ] 定义 `Theme = 'light' | 'dark'` 类型
  - [ ] `useTheme()` 返回 `{ theme, toggleTheme, setTheme }`
  - [ ] 从 localStorage 读取初始值（默认 'dark'）
  - [ ] 切换时在 `document.documentElement` 上设置 `light` / `dark` 类
  - [ ] 同步写入 localStorage

- [ ] Task 2: 创建 `src/components/ThemeToggle.tsx` 垂直拖拽条组件
  - [ ] 垂直轨道（细长线条，霓虹蓝发光，高度 ~120px，宽度 ~4px）
  - [ ] 圆形滑块（可拖拽，带渐变光晕）
  - [ ] 顶部太阳图标 ☀️（暖黄 #FCD34D），底部月亮图标 🌙（冰蓝 #6BC5E8）
  - [ ] 鼠标拖拽逻辑：mousedown → mousemove → mouseup
  - [ ] 松开时吸附到最近端（顶部/底部），300ms 过渡动画
  - [ ] 拖拽中根据位置计算图标颜色渐变（太阳↔月亮）
  - [ ] 调用 `useTheme().setTheme('light'|'dark')` 切换主题
  - [ ] 点击事件 `stopPropagation` 防止冒泡

- [ ] Task 3: 修改 `src/index.css` 添加浅色主题覆盖规则
  - [ ] `:root` 定义深色 CSS 变量（`--theme-bg`, `--theme-surface`, `--theme-text`, `--theme-border` 等）
  - [ ] `html.light` 定义浅色变量值
  - [ ] `html.light body` 设置浅色背景 + 深色文字
  - [ ] 覆盖 Tailwind 硬编码类：`html.light .bg-\[\#0a0e1a\]` → `#F8F9FA`，`html.light .bg-\[\#26262C\]` → `#FFFFFF`，`html.light .bg-\[\#1E1E24\]` → `#F0F0F4` 等
  - [ ] 覆盖文字色：`html.light .text-white` → `#1A1A1E`，`html.light .text-\[\#D1D5DB\]` → `#4B5563`，`html.light .text-\[\#9CA3AF\]` → `#6B7280`
  - [ ] 覆盖边框色：`html.light .border-\[\#3A3A44\]` → `#E5E7EB`
  - [ ] 覆盖 Header/Sidebar 背景半透明值
  - [ ] 覆盖 WelcomePage 渐变背景

- [ ] Task 4: 修改 `src/pages/WelcomePage.tsx` 集成 ThemeToggle
  - [ ] 右上角 `absolute top-6 right-6 z-20` 放置 ThemeToggle
  - [ ] ThemeToggle 外层包裹 `onClick={e => e.stopPropagation()}` 防止触发进入导航
  - [ ] 背景 className 添加浅色模式兼容（通过 CSS 覆盖即可，不需改 className）

- [ ] Task 5: 修改 `src/main.tsx` 初始化主题（防闪烁）
  - [ ] 在 React 渲染前从 localStorage 读取 theme
  - [ ] 在 `<html>` 上设置对应类
  - [ ] 或在 index.html 的 `<head>` 中添加内联脚本

- [ ] Task 6: 验证 TypeScript 编译通过
  - [ ] 运行 `npx tsc --noEmit` 确认无类型错误

- [ ] Task 7: 提交并推送变更
  - [ ] git add 修改的文件
  - [ ] git commit
  - [ ] git push 到 origin/main

# Task Dependencies
- [Task 2] 依赖于 [Task 1] 完成（ThemeToggle 使用 useTheme）
- [Task 4] 依赖于 [Task 2] 完成（WelcomePage 引入 ThemeToggle）
- [Task 3] 和 [Task 5] 独立，可与 Task 1-2 并行
- [Task 6] 依赖于 Task 1-5 全部完成
- [Task 7] 依赖于 [Task 6] 验证通过
