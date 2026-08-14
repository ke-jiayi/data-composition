# Welcome 标题 ECharts 描边动画 Spec

## Why
当前封面页主标题"欢迎来到我的个人数据收集网址"为静态渐变文字，视觉冲击力不足。用户希望将标题改为单词"welcome"，并使用 ECharts 的 graphic text keyframeAnimation 实现"描边绘制 → 填充"的循环动画特效，让封面页更具科技感与动感。

## What Changes
- **标题文案**：WelcomePage 主标题由"欢迎来到我的个人数据收集网址"改为"welcome"（小写单词）
- **动画实现**：用 ECharts `graphic.elements` 的 `type: 'text'` + `keyframeAnimation` 实现描边动画（参考用户提供的代码：lineDash 从 [0,200]→[200,0]、lineDashOffset 从 0→200 描出轮廓，随后 fill 从 transparent 变为实色），`loop: true` 循环播放，`duration: 3000`
- **配色适配**：参考代码中的黑色描边/填充改为赛博朋克霓虹色（描边 stroke 用霓虹青 `#22d3ee`，最终填充 fill 用霓虹紫 `#a855f7`），与现有深蓝黑主题一致
- **字号响应式**：fontSize 在桌面端较大（约 96-120），移动端缩小（约 56-72），通过初始化时按窗口宽度计算
- **容器替换**：移除原静态 `<h1>` 主标题，改为一个 ECharts 挂载容器 div（带 ref），动画文字居中
- **保留项**：点击任意位置跳转 `/home` 逻辑、紫色流光折线图背景、装饰线、副标题、进入提示、底部版权均保留不变

## Impact
- Affected specs: add-welcome-cover-page、cyberpunk-ui-redesign
- Affected code: `src/pages/WelcomePage.tsx`（仅此一个文件）

## ADDED Requirements

### Requirement: Welcome 标题 ECharts 描边动画
系统 SHALL 在封面页（WelcomePage）用 ECharts 渲染单词"welcome"的文字动画，使用 graphic text 的 keyframeAnimation 实现"描边绘制 → 停顿 → 填充"的循环效果。

#### Scenario: 打开封面页查看标题
- **WHEN** 用户访问 `/`
- **THEN** 页面中央显示"welcome"文字动画：先以霓虹青描边逐笔画出文字轮廓，停顿后填充为霓虹紫色，动画循环播放

#### Scenario: 窗口尺寸变化
- **WHEN** 用户调整浏览器窗口大小
- **THEN** ECharts 实例调用 resize，文字保持居中且字号适配新尺寸

### Requirement: 动画配色为赛博朋克霓虹色
系统 SHALL 将参考代码中的黑色描边与填充改为霓虹青（描边 `#22d3ee`）与霓虹紫（填充 `#a855f7`），与深蓝黑主题协调。

#### Scenario: 查看动画颜色
- **WHEN** 动画播放
- **THEN** 描边阶段为霓虹青色轮廓，填充阶段为霓虹紫色实心文字

## MODIFIED Requirements

### Requirement: 封面页主标题
原主标题为静态渐变文字"欢迎来到我的个人数据收集网址"，现修改为 ECharts 动画文字"welcome"，其余封面页元素（背景流光、副标题、进入提示、点击跳转）保持不变。

#### Scenario: 标题文案
- **WHEN** 用户查看封面页中央
- **THEN** 显示单词"welcome"，不再显示中文长标题

## REMOVED Requirements

### Requirement: 静态中文主标题
**Reason**: 用户要求改为"welcome"单词动画
**Migration**: 移除原 `<h1>` 静态标题，替换为 ECharts 动画容器
