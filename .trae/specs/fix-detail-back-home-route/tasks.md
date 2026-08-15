# Tasks

- [x] Task 1: 修复 ProjectDetailPage.tsx 两处「返回首页」跳转目标
  - [x] 正常态左上角「返回首页」链接 `to="/"` 改为 `to="/home"`
  - [x] 错误态「返回首页」链接 `to="/"` 改为 `to="/home"`
  - [x] 保持其余 className、SVG 图标、结构不变

- [x] Task 2: 验证 TypeScript 编译通过
  - [x] 运行 `npx tsc --noEmit` 确认无类型错误

- [x] Task 3: 提交并推送变更
  - [x] git add 修改的文件
  - [x] git commit
  - [x] git push 到 origin/main（触发 Cloudflare Pages 自动部署）

# Task Dependencies
- [Task 2] 依赖于 [Task 1] 完成
- [Task 3] 依赖于 [Task 2] 验证通过
