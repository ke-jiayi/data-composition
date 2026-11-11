# 首页操作按钮等宽等高修复 Spec

## Why
首页右上角三个按钮虽然已写上 `w-32 h-10`，但它们是 flex 子项，默认 `flex-shrink: 1`。当容器宽度不足或受右侧/标题挤压时，文字较短的「对比分析」「导入数据」会被压缩得比「+ 新建文件夹」更小，导致视觉上仍不一致。

## What Changes
- 三个按钮统一保留固定尺寸 `w-32 h-10`，额外加 `shrink-0` 防止被 flex 布局压缩。
- 统一使用 `flex items-center justify-center` 居中内容。
- 统一左右内边距为 `px-4`，去掉多余的 `py-2`（高度由 `h-10` 决定），避免 padding 干扰尺寸计算。
- 颜色、渐变、边框、圆角与 hover/disabled 交互保持不变。

## Impact
- 受影响能力：首页「我的数据集」操作区布局
- 受影响代码：`src/pages/HomePage.tsx`（操作区按钮组，约 274-294 行）

## 根因说明
`w-32` 只是基础宽度，flex 布局下子项可收缩；`whitespace-nowrap` 会让每个按钮的最小宽度等于文案宽度，文案短的按钮可被压缩的空间更大，因此前两个按钮变小、第三个不变。

## ADDED Requirements

### Requirement: 三个按钮严格等宽等高
系统 SHALL 使「对比分析」「导入数据」「+ 新建文件夹」在任意视口下都保持相同宽度（128px）与高度（40px），不被 flex 压缩。

#### Scenario: 桌面宽度下尺寸一致
- **WHEN** 用户查看首页操作区
- **THEN** 三个按钮渲染尺寸均为 128×40px，不因文案长度不同而不同

#### Scenario: 容器空间紧张时不收缩
- **WHEN** 浏览器窗口变窄或同行其他元素占用空间
- **THEN** 三个按钮仍保持 128×40px，不出现前两个变窄、第三个不变的情况

#### Scenario: 内容居中与内边距一致
- **WHEN** 按钮渲染
- **THEN** 文案水平垂直居中，左右内边距均为 `px-4`，无额外纵向 padding 影响高度

#### Scenario: 样式与交互不变
- **WHEN** 用户悬停或点击按钮
- **THEN** 颜色、渐变、圆角、hover 阴影/缩放、disabled 状态与原实现一致；「对比分析」跳转 `/comparison`、「导入数据」触发导入、「+ 新建文件夹」打开弹窗

## MODIFIED Requirements
### Requirement: 首页三个操作按钮尺寸统一
在原统一宽高基础上补充 `shrink-0` 防止 flex 收缩，并统一为 `px-4` + `h-10` 控制内边距与高度。

## REMOVED Requirements
无
