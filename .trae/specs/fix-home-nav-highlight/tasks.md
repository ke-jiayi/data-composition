# Tasks

- [x] Task 1: 修复 ProjectListPage.tsx「返回首页导入数据」跳转目标
  - [x] 将空状态 `<Link to="/">返回首页导入数据</Link>` 的 `to="/"` 改为 `to="/home"`
  - [x] 保持其余 className 样式不变

- [x] Task 2: 增强 Layout.tsx 侧边栏导航激活态样式
  - [x] 激活态文字色改为霓虹蓝 `#6BC5E8`，加 `text-shadow` 发光效果（通过 inline style 实现）
  - [x] 背景从 `bg-purple-500/10` 增强为 `bg-cyan-500/15`
  - [x] 保持左边框 `border-l-2 border-cyan-400`
  - [x] 未激活态样式保持不变

- [x] Task 3: 验证 TypeScript 编译通过
  - [x] 运行 `npx tsc --noEmit` 确认无类型错误

- [x] Task 4: 提交并推送变更
  - [x] git add 修改的文件
  - [x] git commit
  - [x] git push 到 origin/main（触发 Cloudflare Pages 自动部署）

# Task Dependencies
- [Task 3] 依赖于 [Task 1] 与 [Task 2] 完成
- [Task 4] 依赖于 [Task 3] 验证通过
