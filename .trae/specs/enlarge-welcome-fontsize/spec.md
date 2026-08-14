# 放大 welcome 字号 Spec

## Why
封面页 ECharts 渲染的 `welcome` 文字裁切问题已解决，但当前 `fontSize: 80` 偏小，视觉冲击力不足。用户希望字体再大一点。直接放大固定字号会导致移动端（375px 宽）`welcome` 文字溢出容器被裁切，因此需采用响应式字号。

## What Changes
- 将 ECharts `graphic.text.style.fontSize` 从固定 `80` 改为响应式三档：
  - `width < 640`（移动端）→ `60`
  - `width < 1024`（平板）→ `100`
  - `else`（桌面）→ `128`
- 恢复 `handleResize` 中的 `setOption` 字号更新逻辑，使窗口缩放时字号同步切换档位（仍保留 `myChart.resize()`）。
- 初始化时按 `window.innerWidth` 计算首屏字号。
- 其他配置（text `' welcome '`、top `'middle'`、z、textPadding、shadow、stroke、fill、keyframeAnimation）全部不变。

## Impact
- Affected specs: fix-welcome-clip-restore（前序裁切修复，保持其成果）
- Affected code: `src/pages/WelcomePage.tsx`（仅 fontSize 与 handleResize）

## MODIFIED Requirements
### Requirement: welcome 字号响应式放大
封面页 ECharts `welcome` 文字字号按视口宽度分三档：移动端 60、平板 100、桌面 128，桌面端明显大于原 80，移动端不溢出容器。
