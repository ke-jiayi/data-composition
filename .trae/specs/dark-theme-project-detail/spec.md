# 项目详情页深色科技风配色 - Spec

## Why
项目详情页（ProjectDetailPage）及其子组件当前使用白底浅色风格（bg-white、text-gray-900 等），与首页的深色赛博朋克霓虹风格不一致，视觉割裂感明显。需要统一为深色科技风配色。

## What Changes
- ProjectDetailPage.tsx：所有 `bg-white` 卡片改为 `bg-[#26262C]`，`text-gray-900` 改为 `text-white`，`text-gray-600/700` 改为 `text-[#D1D5DB]`，`text-gray-500` 改为 `text-[#9CA3AF]`，`border-gray-200` 改为 `border-[#3A3A44]`，`bg-[#1e3a5f]` 按钮改为 `bg-[#6BC5E8]` 冰蓝主色
- TabNavigation.tsx：Tab 栏背景改深色，未激活 Tab 灰色 `text-[#9CA3AF]`，激活 Tab 冰蓝 `text-[#6BC5E8]` + 下划线 `border-[#6BC5E8]`
- DataTable.tsx：表格容器深色背景，表头暗紫 `bg-[#7B4B9E]` 白字，行交替 `bg-[#1E1E24]`/`bg-[#26262C]`，搜索框深色背景 + 暗紫边框，蓝色高亮改冰蓝 `#6BC5E8`
- DataCleaning.tsx：同卡片/表格深色化
- SmartAnalysis.tsx：卡片深色化，图表卡片背景改深色
- Pagination.tsx：分页器深色化
- 不修改 HomePage、WelcomePage 的配色

## Impact
- Affected specs: `style-detail-back-home-neon`（返回首页按钮已为霓虹紫，保持不变）
- Affected code:
  - `src/pages/ProjectDetailPage.tsx`
  - `src/components/TabNavigation.tsx`
  - `src/components/DataTable.tsx`
  - `src/components/DataCleaning.tsx`
  - `src/components/SmartAnalysis.tsx`
  - `src/components/Pagination.tsx`

## 颜色映射表

| 用途 | 旧值 | 新值 |
|------|------|------|
| 卡片/面板背景 | `bg-white` | `bg-[#26262C]` |
| 表头背景 | `bg-gray-50` | `bg-[#7B4B9E]` |
| 表格行交替 | `bg-white`/`bg-gray-50` | `bg-[#1E1E24]`/`bg-[#26262C]` |
| 主标题文字 | `text-gray-900` | `text-white` |
| 正文文字 | `text-gray-600`/`text-gray-700` | `text-[#D1D5DB]` |
| 辅助文字 | `text-gray-500` | `text-[#9CA3AF]` |
| 卡片边框 | `border-gray-200`/`border-gray-100` | `border-[#3A3A44]` |
| 按钮主色 | `bg-[#1e3a5f]` | `bg-[#6BC5E8]`（文字保持深色 `text-[#0a0e1a]`） |
| 蓝色高亮 | `text-blue-500`/`bg-blue-50` | `text-[#6BC5E8]`/`bg-[#6BC5E8]/10` |
| 搜索框边框 | `border-gray-300` | `border-[#7B4B9E]` |
| 搜索框背景 | `bg-white` | `bg-[#1E1E24]` |

## ADDED Requirements

### Requirement: 项目详情页深色科技风配色
系统 SHALL 为项目详情页及其子组件应用深色科技风配色，与首页深色风格保持一致。

#### Scenario: 项目详情页深色显示
- **WHEN** 用户进入项目详情页（`/project/:id`）
- **THEN** 卡片/面板为深灰背景 `#26262C`，边框 `#3A3A44`
- **AND** 主标题为纯白 `#FFFFFF`，正文为浅灰 `#D1D5DB`，辅助文字为中灰 `#9CA3AF`
- **AND** Tab 激活项为冰蓝 `#6BC5E8` 带下划线，未激活为灰色
- **AND** 数据表表头为暗紫 `#7B4B9E` 白字，行交替深色
- **AND** 按钮主色为冰蓝 `#6BC5E8`
- **AND** 搜索框深色背景 + 暗紫边框

#### Scenario: 不影响首页与封面页
- **WHEN** 用户访问首页（`/home`）或封面页（`/`）
- **THEN** 配色保持原有深色风格不变，未受项目详情页修改影响

## MODIFIED Requirements

### Requirement: ProjectDetailPage 卡片与文字样式
所有 `bg-white rounded-lg border border-gray-200 shadow-sm` 改为 `bg-[#26262C] rounded-lg border border-[#3A3A44] shadow-sm`；`text-gray-900` → `text-white`；`text-gray-600` → `text-[#D1D5DB]`；`text-gray-500` → `text-[#9CA3AF]`；`bg-[#1e3a5f]` 按钮 → `bg-[#6BC5E8] text-[#0a0e1a]`；标签 `bg-[#1e3a5f]/10 text-[#1e3a5f]` → `bg-[#6BC5E8]/10 text-[#6BC5E8]`；结论编辑区 `bg-blue-50`/`bg-gray-50` → `bg-[#6BC5E8]/10`/`bg-[#1E1E24]`；加载与错误状态同步深色化。

### Requirement: TabNavigation 深色化
Tab 栏 `border-gray-200 bg-white` → `border-[#3A3A44] bg-[#1E1E24]`；激活 `border-[#1e3a5f] text-[#1e3a5f]` → `border-[#6BC5E8] text-[#6BC5E8]`；未激活 `text-gray-500 hover:text-gray-700` → `text-[#9CA3AF] hover:text-[#D1D5DB]`。

### Requirement: DataTable 深色化
容器 `bg-white border-gray-200` → `bg-[#26262C] border-[#3A3A44]`；表头 `bg-gray-50 text-gray-500` → `bg-[#7B4B9E] text-white`；行交替 `bg-white`/`bg-gray-50` → `bg-[#1E1E24]`/`bg-[#26262C]`；hover `bg-blue-50` → `bg-[#6BC5E8]/10`；单元格 `text-gray-700` → `text-[#D1D5DB]`；搜索框 `bg-white border-gray-300 text-gray-900` → `bg-[#1E1E24] border-[#7B4B9E] text-[#D1D5DB]`；蓝色高亮 `text-blue-500` → `text-[#6BC5E8]`；空状态 `text-gray-400` → `text-[#9CA3AF]`。

### Requirement: DataCleaning 深色化
所有 `bg-white`/`text-gray-900`/`border-gray-200`/`bg-gray-50` 等浅色类按映射表替换为深色等效值。

### Requirement: SmartAnalysis 深色化
图表卡片 `bg-white` → `bg-[#26262C]`，文字 `text-gray-900`/`text-gray-600` → `text-white`/`text-[#D1D5DB]`，边框 `border-gray-200` → `border-[#3A3A44]`。

### Requirement: Pagination 深色化
分页器浅色类按映射表替换为深色等效值，按钮激活态使用冰蓝 `#6BC5E8`。

## REMOVED Requirements
无
