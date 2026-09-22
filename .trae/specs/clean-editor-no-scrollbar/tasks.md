# Tasks

- [x] Task 1: textarea 样式修改（ProjectDetailPage.tsx L447）
  - [x] SubTask 1.1: className 增加 `resize-none overflow-hidden`（其余不动；fit()/resize 监听/保存逻辑均不改）
- [x] Task 2: tsc + 浏览器验证
  - [x] SubTask 2.1: npx tsc --noEmit 退出码 0
  - [x] SubTask 2.2: 城市2 ?tab=clean：resize='none'、overflowY='hidden'、maxHeight='none'、scrollHeight<=clientHeight、hasCity2=true、可编辑、保存按钮在；textarea 祖先链无 maxHeight

# Completion Evidence
- tsc 退出码 0
- 浏览器实测（城市2 ?tab=clean）：resize='none'、overflowY/X='hidden'、maxHeight='none'、noVScroll=true、noHScroll=true、codeLen=1125 含"城市2.xlsx"、readonly=false、saveBtn=true
- 祖先链逐级检查：无任何非 none 的 maxHeight
- dispatch resize 事件后仍 scrollHeight<=clientHeight（fit 回归通过）

# Task Dependencies
- Task 2 depends on Task 1
