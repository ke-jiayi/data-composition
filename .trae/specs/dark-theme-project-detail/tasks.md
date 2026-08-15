# Tasks

- [ ] Task 1: 深色化 ProjectDetailPage.tsx
  - [ ] 卡片 `bg-white border-gray-200` → `bg-[#26262C] border-[#3A3A44]`
  - [ ] 主标题 `text-gray-900` → `text-white`，正文 `text-gray-600` → `text-[#D1D5DB]`，辅助 `text-gray-500` → `text-[#9CA3AF]`
  - [ ] 按钮 `bg-[#1e3a5f] text-white` → `bg-[#6BC5E8] text-[#0a0e1a]`，hover `bg-[#2d4a6f]` → `hover:bg-[#5AB4D8]`
  - [ ] 标签 `bg-[#1e3a5f]/10 text-[#1e3a5f]` → `bg-[#6BC5E8]/10 text-[#6BC5E8]`
  - [ ] 结论编辑区 `bg-blue-50 border-blue-300` → `bg-[#6BC5E8]/10 border-[#6BC5E8]/40`，`bg-gray-50 border-gray-100` → `bg-[#1E1E24] border-[#3A3A44]`
  - [ ] textarea `border-gray-300 text-gray-700` → `border-[#3A3A44] text-[#D1D5DB] bg-[#1E1E24]`
  - [ ] 加载/错误状态 `text-gray-500`/`text-gray-900` → `text-[#9CA3AF]`/`text-white`，spinner `border-[#1e3a5f]` → `border-[#6BC5E8]`
  - [ ] 代码编辑器区域 `bg-white border-gray-200` → `bg-[#26262C] border-[#3A3A44]`（textarea 的 bg-gray-900 保持不变）
  - [ ] 可视化分析卡片 `bg-white border-gray-200` → `bg-[#26262C] border-[#3A3A44]`，标题 `text-gray-900` → `text-white`
  - [ ] 「添加新结论」虚线边框 `border-gray-300 text-gray-500` → `border-[#3A3A44] text-[#9CA3AF]`，hover `border-[#1e3a5f] text-[#1e3a5f]` → `hover:border-[#6BC5E8] hover:text-[#6BC5E8]`
  - [ ] 保留返回首页按钮已有霓虹紫样式不变

- [ ] Task 2: 深色化 TabNavigation.tsx
  - [ ] Tab 栏 `border-gray-200 bg-white` → `border-[#3A3A44] bg-[#1E1E24]`
  - [ ] 激活 `border-[#1e3a5f] text-[#1e3a5f]` → `border-[#6BC5E8] text-[#6BC5E8]`
  - [ ] 未激活 `text-gray-500 hover:text-gray-700 hover:border-gray-300` → `text-[#9CA3AF] hover:text-[#D1D5DB] hover:border-[#3A3A44]`

- [ ] Task 3: 深色化 DataTable.tsx
  - [ ] 容器 `bg-white border-gray-200` → `bg-[#26262C] border-[#3A3A44]`
  - [ ] 标题 `text-gray-900` → `text-white`，辅助 `text-gray-500` → `text-[#9CA3AF]`
  - [ ] 表头 `bg-gray-50 text-gray-500` → `bg-[#7B4B9E] text-white`，hover `bg-gray-100` → `bg-[#7B4B9E]/80`
  - [ ] 行交替 `bg-white`/`bg-gray-50` → `bg-[#1E1E24]`/`bg-[#26262C]`，hover `bg-blue-50` → `bg-[#6BC5E8]/10`
  - [ ] 单元格 `text-gray-700` → `text-[#D1D5DB]`，`divide-gray-200` → `divide-[#3A3A44]`
  - [ ] 搜索框 `bg-white text-gray-900 border-gray-300` → `bg-[#1E1E24] text-[#D1D5DB] border-[#7B4B9E]`，placeholder `placeholder-gray-400` → `placeholder-[#9CA3AF]`
  - [ ] 蓝色高亮 `text-blue-500` → `text-[#6BC5E8]`，排序图标 `text-blue-500` → `text-[#6BC5E8]`
  - [ ] 空状态 `text-gray-400`/`text-gray-300` → `text-[#9CA3AF]`，清除搜索 `text-blue-500` → `text-[#6BC5E8]`
  - [ ] focus ring `focus:ring-blue-500` → `focus:ring-[#6BC5E8]`

- [ ] Task 4: 深色化 DataCleaning.tsx
  - [ ] 所有 `bg-white` → `bg-[#26262C]`，`text-gray-900` → `text-white`，`text-gray-600/700` → `text-[#D1D5DB]`，`text-gray-500` → `text-[#9CA3AF]`
  - [ ] `border-gray-200` → `border-[#3A3A44]`，`bg-gray-50` → `bg-[#1E1E24]`
  - [ ] 蓝色类 `text-blue-500`/`bg-blue-50` → `text-[#6BC5E8]`/`bg-[#6BC5E8]/10`

- [ ] Task 5: 深色化 SmartAnalysis.tsx
  - [ ] 卡片 `bg-white` → `bg-[#26262C]`，`text-gray-900` → `text-white`，`text-gray-600` → `text-[#D1D5DB]`
  - [ ] `border-gray-200` → `border-[#3A3A44]`，`bg-gray-50` → `bg-[#1E1E24]`
  - [ ] 蓝色类 → 冰蓝 `#6BC5E8`

- [ ] Task 6: 深色化 Pagination.tsx
  - [ ] `bg-white`/`text-gray-900`/`border-gray-200`/`text-gray-500` 按映射表替换
  - [ ] 激活按钮使用冰蓝 `bg-[#6BC5E8] text-[#0a0e1a]`

- [ ] Task 7: 验证 TypeScript 编译通过
  - [ ] 运行 `npx tsc --noEmit` 确认无类型错误

- [ ] Task 8: 提交并推送变更
  - [ ] git add 修改的文件
  - [ ] git commit
  - [ ] git push 到 origin/main（触发 Cloudflare Pages 自动部署）

# Task Dependencies
- Task 1-6 互相独立，可并行执行
- [Task 7] 依赖于 Task 1-6 全部完成
- [Task 8] 依赖于 [Task 7] 验证通过
