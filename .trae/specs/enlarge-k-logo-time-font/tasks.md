# Tasks

- [ ] Task 1: 修改 Header.tsx 中 'K.导航' 与时间字号
  - [ ] K 字 `span` 的 `text-2xl` 改为 `text-3xl`（30px）
  - [ ] 点号 `span` 的 `text-2xl` 改为 `text-3xl`（30px）
  - [ ] '导航' `span` 的 `text-lg` 改为 `text-xl`（20px）
  - [ ] 时间 `span` 的 `text-base` 改为 `text-lg`（18px）
  - [ ] 保持颜色、text-shadow、font-family、leading-none、Header 高度、固定定位、垂直居中不变

- [ ] Task 2: 验证 TypeScript 编译通过
  - [ ] 运行 `npx tsc --noEmit` 确认无类型错误

- [ ] Task 3: 提交并推送变更
  - [ ] git add 修改的文件
  - [ ] git commit
  - [ ] git push 到 origin/main（触发 Cloudflare Pages 自动部署）

# Task Dependencies
- [Task 2] 依赖于 [Task 1] 完成
- [Task 3] 依赖于 [Task 2] 验证通过
