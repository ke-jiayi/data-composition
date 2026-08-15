# Tasks

- [ ] Task 1: 更新 `src/index.css` 浅色模式覆盖区块，应用全新冷灰调科技配色
  - [ ] 页面背景：`bg-[#0a0e1a]` / `bg-[#1A1A1E]` → `#F0F4F8`（含 /80、/95 透明度变体）
  - [ ] 卡片/面板：`bg-[#26262C]` → `#FFFFFF`
  - [ ] 次级面板/表格交替行：`bg-[#1E1E24]` → `#F7FAFC`
  - [ ] PowerBIPage：`bg-[#262626]` → `#F7FAFC`
  - [ ] 主标题文字：`text-white` / `text-[#fafafa]` / `text-gray-900` / `text-gray-800` → `#1A1A2E`
  - [ ] 正文文字：`text-gray-100` / `text-gray-700` / `text-[#D1D5DB]` → `#2D3748`
  - [ ] 辅助文字：`text-gray-400` / `text-gray-500` / `text-[#9CA3AF]` / `text-[#a3a3a3]` → `#718096`
  - [ ] 中间灰：`text-gray-600` → `#4A5568`
  - [ ] 边框：`border-[#3A3A44]` / `border-[#303030]` / `border-white/10` → `#DCE4EC`
  - [ ] 渐变：`from/via/to-[#1A1A1E]` / `[#1E1E24]` → `#F0F4F8` / `#F7FAFC`
  - [ ] 半透明背景：`bg-white/5` → `rgba(0,0,0,0.03)`，`bg-white/10` → `rgba(0,0,0,0.05)`（保持）
  - [ ] 表头：`bg-[#7B4B9E]` 保持 `#7B4B9E`（科技感表头）
  - [ ] 代码编辑器例外：`bg-gray-900.text-gray-100` 保持浅色文字
  - [ ] body 背景与文字色更新为 `#F0F4F8` / `#1A1A2E`
  - [ ] 添加主题切换平滑过渡 `transition`

- [ ] Task 2: 验证 TypeScript 编译和 Vite 构建
  - [ ] 运行 `npx tsc --noEmit` 确认无类型错误
  - [ ] 运行 `npx vite build` 确认构建通过

- [ ] Task 3: 提交并推送变更
  - [ ] git add 修改的文件
  - [ ] git commit
  - [ ] git push 到 origin/main

# Task Dependencies
- [Task 2] 依赖于 [Task 1] 完成
- [Task 3] 依赖于 [Task 2] 验证通过
