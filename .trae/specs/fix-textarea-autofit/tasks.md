# Tasks

- [x] Task 1: 修复 textarea 自适应高度（ProjectDetailPage.tsx）
  - [x] SubTask 1.1: fit() effect 依赖增加 `activeTab`；fit() 内用 requestAnimationFrame 等布局完成后再测 scrollHeight
  - [x] SubTask 1.2: textarea 增加 `onFocus` 调用 fit()；`onChange` 在 setCode 后调用 fit()
  - [x] SubTask 1.3: 保留 resize-none、overflow-hidden 不变
- [x] Task 2: tsc + 浏览器验证
  - [x] SubTask 2.1: npx tsc --noEmit 退出码 0
  - [x] SubTask 2.2: 城市2：从其他 Tab 切到 clean → scrollHeight===clientHeight；聚焦/编辑 → 仍自适应；resize='none'、overflowY='hidden'

# Completion Evidence
- tsc 退出码 0
- 浏览器实测（城市2，从 data Tab 切到 clean Tab）：found=true、hasCity2=true、codeLen=1125、scrollHeight=994===clientHeight=994、noVScroll=true、noHScroll=true、resize='none'、overflowY='hidden'、maxHeight='none'、heightPx=994（远超 2-3 行的 60-80px）
- 聚焦后：高度不变、noVScroll=true
- 编辑（追加再删除空格）：afterAdd.noVScroll=true、afterDel.noVScroll=true

# Task Dependencies
- Task 2 depends on Task 1
