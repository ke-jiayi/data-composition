# Tasks

- [x] Task 1: 修改 `src/pages/WelcomePage.tsx` colors 对象 light 分支
  - [x] gradStart: `#553C9A` → `#00D4FF`
  - [x] gradEnd: `#3182CE` → `#60A5FA`
  - [x] dotFill: `#3182CE` → `#22D3EE`
  - [x] dotOpacity: `1` → `0.55`
  - [x] gridLineStroke: `#2C5282` → `#34D399`
  - [x] gridLineOpacity: `0.15` → `0.5`
  - [x] welcomeStroke: `#2C5282` → `#0EA5E9`
  - [x] welcomeDropShadow light 分支调整为青色系 subtle glow
  - [x] neonColor: `#2C5282` → `#0891B2`
  - [x] neonGlow / neonGlowHover light 分支调整为青色系
  - [x] 新增 pathStrokeWidth 字段：dark `3` / light `2`，应用到 mainPath 的 strokeWidth
  - [x] softGlowBlur light 保持 `1.5`（已合适）

- [x] Task 2: 验证编译与构建
  - [x] `npx tsc --noEmit` 无错误
  - [x] `npx vite build` 成功

- [ ] Task 3: 提交并推送
  - [ ] git add / commit / push 到 origin/main

# Task Dependencies
- [Task 2] 依赖于 [Task 1] 完成
- [Task 3] 依赖于 [Task 2] 验证通过
