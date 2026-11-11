# 首页操作按钮 Grid 重排 Spec

## Why
三个按钮用固定 `w-32` + flex 排列，在容器宽度受限时会显得宽度与间距不稳定，且前两个纯文字按钮视觉重量偏轻，与第三个带「+」的按钮不平衡。

## What Changes
- 按钮父容器由 flex 改为 `grid grid-cols-3 gap-4 w-full max-w-xl ml-auto`，三列绝对等宽、间距一致；外层标题与按钮行增加换行能力，避免小屏溢出。
- 取消三个按钮的固定宽度 `w-32` 与 `shrink-0`，改为 `w-full h-10` 随网格撑满。
- 统一为 `flex items-center justify-center text-sm font-medium px-4 rounded-lg`。
- 为三个按钮增加 Remix Icon 图标：`ri-bar-chart-box-line`、`ri-upload-cloud-2-line`、`ri-folder-add-line`，图标统一 `mr-1`。
- 「导入数据」文案去掉用于撑宽的空格，改为「导入数据」，导入中仍显示「导入中...」。
- 保留各自配色（紫粉渐变、紫青渐变、深色青边框）与 hover/disabled 交互。

## Impact
- 受影响能力：首页「我的数据集」操作区布局
- 受影响代码：`src/pages/HomePage.tsx`（约 266-302 行：标题行容器与按钮组）

## ADDED Requirements

### Requirement: 三个按钮 Grid 等宽排列
系统 SHALL 使用三列 Grid 排列三个操作按钮，使三者在任意可用宽度下绝对等宽，列间距统一为 `gap-4`。

#### Scenario: 等宽与等距
- **WHEN** 用户查看首页操作区
- **THEN** 三个按钮宽度完全相同，按钮之间间距一致（16px）
- **THEN** 三个按钮高度均为 40px（`h-10`），圆角均为 `rounded-lg`

#### Scenario: 小屏不溢出
- **WHEN** 视口较窄，标题块与按钮组无法同排容纳
- **THEN** 按钮组整体换行到下一行，仍保持三列等宽，不挤压标题与按钮内容

### Requirement: 按钮图标与文字统一
系统 SHALL 为三个按钮提供风格一致的图标，并保证图标与文字垂直居中。

#### Scenario: 图标展示
- **WHEN** 页面渲染
- **THEN** 「对比分析」前显示 `ri-bar-chart-box-line` 图标
- **THEN** 「导入数据」前显示 `ri-upload-cloud-2-line` 图标
- **THEN** 「新建文件夹」前显示 `ri-folder-add-line` 图标，替换原「+ 」文本
- **THEN** 图标与文字间距为 `mr-1`，整体水平垂直居中

#### Scenario: 文案精简
- **WHEN** 未在导入中
- **THEN** 第二个按钮显示「导入数据」（无空格填充）
- **WHEN** 正在导入
- **THEN** 仍显示「导入中...」

#### Scenario: 交互与配色不变
- **WHEN** 用户点击或悬停
- **THEN** 三个按钮各自保留原渐变/边框配色、hover 阴影与缩放、disabled 半透明禁用态
- **THEN** 「对比分析」跳转 `/comparison`、「导入数据」触发文件选择、「新建文件夹」打开新建弹窗

## MODIFIED Requirements
### Requirement: 首页三个操作按钮尺寸统一
由固定宽度 `w-32` 的 flex 排列改为 Grid 三列等宽、`w-full h-10` 自适应布局。

## REMOVED Requirements
无
