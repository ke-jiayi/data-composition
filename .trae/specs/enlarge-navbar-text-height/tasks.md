# Tasks

- [ ] Task 1: 修改 Header.tsx 顶部栏高度与时间字号
  - [ ] 将 `<header>` 的 `h-16` 改为 `h-18`（72px）
  - [ ] 将时间 `<span>` 的 `text-sm` 改为 `text-base`（16px）
  - [ ] 保持 `fixed top-0`、背景、模糊、边框、阴影、左右内边距、`flex items-center h-full` 垂直居中不变

- [ ] Task 2: 修改 Layout.tsx 侧边栏导航链接与布局偏移
  - [ ] 将侧边栏 `<Link>` className 中 `text-sm font-medium` 改为 `text-base font-medium`
  - [ ] 将 `<aside>` 的 `top-16` 改为 `top-18`（匹配新 Header 高度）
  - [ ] 将 `<main>` 的 `pt-20` 改为 `pt-24`（避免内容被加高 Header 遮挡）

- [ ] Task 3: 验证 TypeScript 编译通过
  - [ ] 运行 `npx tsc --noEmit` 确认无类型错误

- [ ] Task 4: 提交并推送变更
  - [ ] git add 修改的文件
  - [ ] git commit
  - [ ] git push 到 origin/main（触发 Cloudflare Pages 自动部署）

# Task Dependencies
- [Task 2] 依赖于 [Task 1] 完成后再统一验证
- [Task 3] 依赖于 [Task 1] 与 [Task 2] 完成
- [Task 4] 依赖于 [Task 3] 验证通过
