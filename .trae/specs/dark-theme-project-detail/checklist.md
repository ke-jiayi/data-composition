# Checklist

## ProjectDetailPage.tsx
- [ ] 卡片背景为 `bg-[#26262C]`，边框为 `border-[#3A3A44]`
- [ ] 主标题 `text-white`，正文 `text-[#D1D5DB]`，辅助文字 `text-[#9CA3AF]`
- [ ] 按钮主色为 `bg-[#6BC5E8]`，文字深色
- [ ] 标签使用 `bg-[#6BC5E8]/10 text-[#6BC5E8]`
- [ ] 结论编辑区深色化（`bg-[#6BC5E8]/10` / `bg-[#1E1E24]`）
- [ ] 加载/错误状态深色化
- [ ] 返回首页按钮霓虹紫样式保持不变

## TabNavigation.tsx
- [ ] Tab 栏背景 `bg-[#1E1E24]`，边框 `border-[#3A3A44]`
- [ ] 激活 Tab 冰蓝 `text-[#6BC5E8]` + 下划线 `border-[#6BC5E8]`
- [ ] 未激活 Tab 灰色 `text-[#9CA3AF]`

## DataTable.tsx
- [ ] 容器 `bg-[#26262C] border-[#3A3A44]`
- [ ] 表头 `bg-[#7B4B9E]` 白字
- [ ] 行交替 `bg-[#1E1E24]` / `bg-[#26262C]`
- [ ] 搜索框 `bg-[#1E1E24]` + `border-[#7B4B9E]` + `text-[#D1D5DB]`
- [ ] 蓝色高亮改为冰蓝 `#6BC5E8`

## DataCleaning.tsx
- [ ] 卡片/面板深色化
- [ ] 文字颜色按映射表替换
- [ ] 蓝色类改为冰蓝

## SmartAnalysis.tsx
- [ ] 图表卡片 `bg-[#26262C]`
- [ ] 文字 `text-white` / `text-[#D1D5DB]`
- [ ] 边框 `border-[#3A3A44]`

## Pagination.tsx
- [ ] 分页器深色化
- [ ] 激活按钮冰蓝 `bg-[#6BC5E8]`

## 通用
- [ ] 不含残留的 `bg-white`、`text-gray-900`、`bg-gray-50`、`text-blue-500` 等浅色类（代码编辑器 textarea 的 bg-gray-900 除外）
- [ ] HomePage 与 WelcomePage 配色未改动
- [ ] TypeScript 编译通过（`npx tsc --noEmit` 无错误）
- [ ] 变更已提交并推送到 origin/main
