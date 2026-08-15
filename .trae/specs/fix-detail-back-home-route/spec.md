# 修复项目详情页返回首页跳转 - Spec

## Why
项目详情页（ProjectDetailPage，点进 xlsx 数据集时）左上角的「返回首页」按钮 `to="/"` 跳转到了封面页（WelcomePage），而非数据首页（HomePage / 数据作品集）。用户期望点击后回到 `/home` 数据首页。

## What Changes
- ProjectDetailPage.tsx 正常态左上角「返回首页」链接 `to="/"` → `to="/home"`
- ProjectDetailPage.tsx 错误态「返回首页」链接 `to="/"` → `to="/home"`
- 其他页面（HomePage、ProjectListPage 等）暂不修改

## Impact
- Affected specs: `fix-home-nav-highlight`（同类型跳转修复）
- Affected code: `src/pages/ProjectDetailPage.tsx`

## ADDED Requirements

### Requirement: 项目详情页返回首页跳转正确
系统 SHALL 确保项目详情页的「返回首页」按钮跳转到 `/home`（数据首页），而非 `/`（封面页）。

#### Scenario: 点进数据集后返回首页
- **WHEN** 用户在项目详情页（`/project/:id`）点击左上角「返回首页」
- **THEN** 跳转到 `/home`（数据首页，显示数据集列表）
- **AND** 不跳转到 `/`（封面页）

#### Scenario: 项目不存在时返回首页
- **WHEN** 项目详情页显示错误状态（项目不存在或已删除）
- **AND** 用户点击「返回首页」
- **THEN** 跳转到 `/home`

## MODIFIED Requirements

### Requirement: ProjectDetailPage 返回首页链接
ProjectDetailPage.tsx 中两处 `<Link to="/">返回首页</Link>` 的 `to="/"` 均修改为 `to="/home"`，其余样式与结构不变。

## REMOVED Requirements
无
