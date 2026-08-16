# 详情页"返回首页"白天模式配色修复 Spec

## Why
ProjectDetailPage 的"返回首页"按钮在白天模式下仍显示霓虹紫色（内联 `color: #B084DC` + `textShadow`），与 HomePage 已修复的"返回封面"按钮不一致。用户要求白天模式下"返回首页"与"返回封面"效果一致（青蓝色 #00B4D8）。

## What Changes
- 在 `src/index.css` 新增一条 `html.light` 作用域规则，覆盖 ProjectDetailPage"返回首页"按钮的内联样式
- 使用 `a[href="/home"]` + `border-purple-500/40` class 组合精确定位，不影响侧边栏导航链接
- 白天模式：文字 #00B4D8、去除 textShadow、背景 rgba(0,180,216,0.08)、边框 #DCE8F2、hover 边框 #00B4D8
- 深色模式不变

## Impact
- Affected code: `src/index.css`（新增 1 条 CSS 规则）
- 不变：HomePage、WelcomePage、深色模式、按钮功能/形状

## MODIFIED Requirements
### Requirement: ProjectDetailPage"返回首页"白天模式配色
白天模式下"返回首页"按钮 SHALL 使用青蓝色 #00B4D8，与"返回封面"按钮效果一致。

#### Scenario: 白天模式
- **WHEN** 白天模式访问 ProjectDetailPage
- **THEN** "返回首页"文字 #00B4D8，无 textShadow，背景 rgba(0,180,216,0.08)，边框 #DCE8F2

#### Scenario: 深色模式不变
- **WHEN** 黑夜模式
- **THEN** "返回首页"保持霓虹紫 #B084DC + textShadow
