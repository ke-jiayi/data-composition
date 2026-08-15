# Tasks

- [ ] Task 1: 在 `src/index.css` 添加 `@custom-variant dark` 配置
  - [ ] 在 `@import "tailwindcss";` 之后添加 `@custom-variant dark (&:where(.dark, .dark *));`

- [ ] Task 2: 验证 TypeScript 编译通过
  - [ ] 运行 `npx tsc --noEmit` 确认无类型错误

- [ ] Task 3: 提交并推送变更
  - [ ] git add 修改的文件
  - [ ] git commit
  - [ ] git push 到 origin/main

# Task Dependencies
- [Task 2] 依赖于 [Task 1] 完成
- [Task 3] 依赖于 [Task 2] 验证通过
