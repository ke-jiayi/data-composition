# Tasks

- [x] Task 1: 在 `src/index.css` 添加 `@custom-variant dark` 配置
  - [x] 在 `@import "tailwindcss";` 之后添加 `@custom-variant dark (&:where(.dark, .dark *));`

- [x] Task 2: 验证 TypeScript 编译通过
  - [x] 运行 `npx tsc --noEmit` 确认无类型错误

- [x] Task 3: 提交并推送变更
  - [x] git add 修改的文件
  - [x] git commit
  - [x] git push 到 origin/main

# Task Dependencies
- [Task 2] 依赖于 [Task 1] 完成
- [Task 3] 依赖于 [Task 2] 验证通过
