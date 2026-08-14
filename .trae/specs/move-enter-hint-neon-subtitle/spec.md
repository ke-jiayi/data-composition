# 移动"点击任意位置进入"为霓虹副标题 Spec

## Why
当前"点击任意位置进入"是底部带边框的按钮样式，视觉上过于突出且与主标题 welcome 割裂。用户希望它作为 welcome 主标题正下方的副标题提醒，用冰蓝色霓虹发光效果呈现，字号小、视觉弱于主标题，仅作引导提示。

## What Changes
- 将"点击任意位置进入"从底部按钮（带边框、圆角、背景）移到 welcome SVG 容器正下方
- 改为 20px 冰蓝色 `#6BC5E8` 文字，font-weight: bold
- 添加 text-shadow 霓虹发光：`0 0 5px #6BC5E8, 0 0 10px #6BC5E8`（比主标题暗）
- 与主标题间距 margin-top: 20px
- hover 时发光增强（text-shadow 扩大）
- 保留 showEnter 渐显动画（1.5s 延迟后 opacity 0→1）
- 移除原有按钮边框/背景/箭头样式
- 添加慢速闪烁动画（比主标题 3s 慢，幅度小）

## Impact
- Affected specs: svg-text-replace-echarts（welcome 主标题渲染）
- Affected code: `src/pages/WelcomePage.tsx`（仅 JSX 结构和 CSS）

## ADDED Requirements
### Requirement: 霓虹副标题提醒
welcome 主标题正下方显示"点击任意位置进入"作为副标题，20px 冰蓝霓虹发光，hover 增强，比主标题视觉弱。

#### Scenario: 副标题显示
- **WHEN** 页面加载完成
- **THEN** welcome 下方 20px 处显示冰蓝色"点击任意位置进入"霓虹文字，1.5s 后渐显

#### Scenario: 悬停反馈
- **WHEN** 鼠标悬停在副标题上
- **THEN** text-shadow 发光范围扩大，作为可点击反馈
