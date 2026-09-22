# Tasks

- [x] Task 1: 自适应高度增加 resize 监听 + 去掉 overflow-hidden（ProjectDetailPage.tsx）
  - [x] SubTask 1.1: L179-186 effect 抽出 `fit()`；`[code]` 变化时执行；`window.addEventListener('resize', fit)` 并在 cleanup 移除
  - [x] SubTask 1.2: L442 textarea className 去掉 `overflow-hidden`（保留其余类名不变）
- [x] Task 2: tsc + 浏览器验证
  - [x] SubTask 2.1: npx tsc --noEmit 退出码 0
  - [x] SubTask 2.2: 城市2 ?tab=clean：scrollHeight===clientHeight、maxHeight=none、overflowY=auto；dispatch resize 后 scrollHeight===clientHeight 仍成立

# Completion Evidence
- tsc 退出码 0
- 浏览器实测（城市2 ?tab=clean）：found=true、hasCity2=true、codeLen=1125、noVScroll=true、noHScroll=true、maxHeight='none'、overflowY='auto'
- resize 验证：dispatch resize 事件后 noVScroll=true；视口实际缩窄 50px 再恢复，均保持无裁剪
- main 内 textarea 计数=1（仅代码编辑器），无误伤

# Task Dependencies
- Task 2 depends on Task 1
