# Tasks

- [x] Task 1: 新增 WelcomePage 封面页组件
  - [ ] SubTask 1.1: 创建 src/pages/WelcomePage.tsx，使用 react-router-dom 的 useNavigate
  - [ ] SubTask 1.2: 封面页全屏 min-h-screen，深色渐变背景（from-slate-950 via-[#0a0f1e] to-slate-950），不使用 Layout
  - [ ] SubTask 1.3: 居中显示大标题"欢迎来到我的个人数据收集网址"，加霓虹风格装饰
  - [ ] SubTask 1.4: 下方显示"点击任意位置进入 →"提示，带轻微呼吸动画
  - [ ] SubTask 1.5: 整个页面 onClick 调用 navigate('/home')，cursor-pointer

- [x] Task 2: 修改路由和导航链接
  - [ ] SubTask 2.1: 在 src/pages/index.ts 添加 export { WelcomePage } from './WelcomePage'
  - [ ] SubTask 2.2: 在 src/App.tsx 导入 WelcomePage，`/` 路由渲染 WelcomePage，HomePage 改为 `/home` 路由
  - [ ] SubTask 2.3: Navigate to="/" 改为 Navigate to="/home"
  - [ ] SubTask 2.4: src/components/Layout.tsx 导航首页链接从 `/` 改为 `/home`
  - [ ] SubTask 2.5: src/components/MobileMenu.tsx 导航首页链接从 `/` 改为 `/home`
  - [ ] SubTask 2.6: src/components/Sidebar.tsx 导航首页链接从 `/` 改为 `/home`

- [x] Task 3: 编译验证并提交推送
  - [ ] SubTask 3.1: 运行 npx tsc --noEmit 验证编译
  - [ ] SubTask 3.2: git commit 并 push

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3 依赖 Task 1 & 2
