# Tasks

- [ ] Task 1: 修改 ProjectDetailPage.tsx 正常态「返回首页」按钮样式
  - [ ] className 中 `text-sm text-gray-500 hover:text-gray-700` 改为 `text-[19px]`（14px+5px）
  - [ ] 添加 inline style：`{ color: '#7B4B9E', textShadow: '0 0 8px #7B4B9E, 0 0 20px rgba(123, 75, 158, 0.3)' }`
  - [ ] 保持 `inline-flex items-center transition-colors`、SVG 箭头图标、`to="/home"` 不变

- [ ] Task 2: 验证 TypeScript 编译通过
  - [ ] 运行 `npx tsc --noEmit` 确认无类型错误

- [ ] Task 3: 提交并推送变更
  - [ ] git add 修改的文件
  - [ ] git commit
  - [ ] git push 到 origin/main（触发 Cloudflare Pages 自动部署）

# Task Dependencies
- [Task 2] 依赖于 [Task 1] 完成
- [Task 3] 依赖于 [Task 2] 验证通过
