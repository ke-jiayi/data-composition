# 修复 welcome 裁切并恢复文字内容 Spec

## Why
上一轮把 ECharts `graphic.text` 的 `text` 改成了 `DATA PORTFOLIO`，但用户要求文字应为 `welcome`；同时 W 与末字母 e 的描边边缘仍被裁切，甚至因 `DATA PORTFOLIO` 更长（13 字符 × 80px 在窄屏严重溢出）而更严重。根因是 ECharts `graphic.text` 元素带 `stroke` 时，内部 boundingBox 会裁切首末字母的描边，`textPadding`/`z` 未能真正解决。

## What Changes
- 将 `text` 从 `DATA PORTFOLIO` 恢复为 `welcome`，并在首尾各加一个空格（`' welcome '`），利用空格扩展 boundingBox，保留首字母 W 左侧与末字母 e 右侧的描边，彻底消除裁切。
- `top` 由 `center` 改回 `middle`（ECharts text graphic 标准垂直居中值）。
- 保留上一轮新增的 `z: 100`、`textPadding: [12,24,12,24]`、`shadowBlur`/`shadowColor` 作为辅助。
- 保留上一轮配色 `stroke: '#6C3B9A'`、最终 `fill: '#FFFFFF'`，不引入颜色变量。
- 保留 `keyframeAnimation`（duration 3000 / loop / percent 0.7-0.8-1）不变。
- `handleResize` 维持仅 `myChart.resize()`。

## Impact
- Affected specs: fix-w-clip-back-button-4-humps（已完成的前序修复）、animate-welcome-title-echarts
- Affected code: `src/pages/WelcomePage.tsx`（仅 ECharts option 配置块）

## ADDED Requirements
### Requirement: welcome 文字描边不被裁切
ECharts `graphic.text` 渲染 `welcome` 时，首字母 W 左侧与末字母 e 右侧的描边完整可见，不被 boundingBox 裁切。

#### Scenario: 桌面端与移动端均无裁切
- **WHEN** 用户在桌面端或移动端打开封面页 `/`
- **THEN** ECharts 渲染的 `welcome` 7 字母描边完整，W 左缘与 e 右缘无缺失

## MODIFIED Requirements
### Requirement: 封面页主标题文字内容
封面页 ECharts 动画文字内容应为 `welcome`（首尾各带一个空格用于防裁切），不是 `DATA PORTFOLIO`。
