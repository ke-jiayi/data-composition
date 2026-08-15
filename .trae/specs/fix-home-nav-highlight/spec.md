# 修复首页导航跳转与高亮 - Spec

## Why
项目列表页（ProjectListPage）的「返回首页导入数据」按钮标签含「首页」却跳转到 `/`（封面页），与「首页」应指向数据首页 `/home` 的语义矛盾，造成用户困惑。同时侧边栏导航的激活态不够醒目，用户在 `/home` 时难以快速识别当前所处位置。

## What Changes
- 修复 ProjectListPage.tsx 中「返回首页导入数据」链接 `to="/"` → `to="/home"`
- 增强 Layout.tsx 侧边栏导航激活态样式：激活项文字改为霓虹蓝 `#6BC5E8` 并加发光阴影，增强背景与左边框，使激活项（尤其是「首页」）在视觉上明显区别于未激活项
- HomePage.tsx 的「← 返回封面」按钮保持 `to="/"` 不变
- 不影响其他导航项（项目、关于）的跳转逻辑

## Impact
- Affected specs: `top-navigation-refactor`（导航结构）、`enlarge-navbar-text-height`（导航样式）
- Affected code:
  - `src/pages/ProjectListPage.tsx`：修复「返回首页导入数据」跳转目标
  - `src/components/Layout.tsx`：增强侧边栏导航激活态样式

## ADDED Requirements

### Requirement: 首页导航跳转正确
系统 SHALL 确保所有标签含「首页」的导航按钮跳转到 `/home`（数据首页），而非 `/`（封面页）。

#### Scenario: 项目列表页空状态点击返回首页
- **WHEN** 用户在项目列表页（`/projects`）且无数据集
- **AND** 点击「返回首页导入数据」按钮
- **THEN** 跳转到 `/home`（数据首页，显示导入按钮与数据集列表）
- **AND** 不跳转到 `/`（封面页）

### Requirement: 导航激活态醒目
系统 SHALL 为侧边栏当前激活的导航项应用醒目的高亮样式，使其在视觉上明显区别于未激活项。

#### Scenario: 首页激活高亮
- **WHEN** 用户处于 `/home` 页面
- **THEN** 侧边栏「首页」项文字为霓虹蓝 `#6BC5E8` 带发光阴影
- **AND** 有明显背景色与左边框
- **AND** 「项目」「关于」项保持未激活的灰色样式

## MODIFIED Requirements

### Requirement: ProjectListPage 空状态返回链接
ProjectListPage.tsx 中空状态的 `<Link to="/">返回首页导入数据</Link>` 修改为 `<Link to="/home">返回首页导入数据</Link>`，其余样式不变。

### Requirement: Layout 侧边栏导航激活态样式
Layout.tsx 中导航链接激活态 className 从 `text-cyan-300 bg-purple-500/10 border-l-2 border-cyan-400` 增强为：文字色 `#6BC5E8` + `text-shadow` 发光 + 更明显的背景 `bg-cyan-500/15` + 左边框 `border-l-2 border-cyan-400`，使激活项更醒目。未激活态样式保持不变。

## REMOVED Requirements
无
