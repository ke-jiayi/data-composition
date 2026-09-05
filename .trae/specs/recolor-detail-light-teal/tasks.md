# ProjectDetailPage 白天模式青蓝配色 - 实施计划

## [x] Task 1: 为 ProjectDetailPage 主容器新增作用域 ID + 在 index.css 新增覆盖规则
- **Priority**: high
- **Depends On**: None
- **Description**:
  - 修改 `src/pages/ProjectDetailPage.tsx`：在 Layout 内部内容最外层加 `<div id="detail-page">` 容器（仅作 CSS 作用域，不影响布局）
  - 修改 `src/index.css`：新增 `html.light #detail-page` 作用域内的覆盖规则：
    1. `bg-[#7B4B9E]` → `background-color: #00B4D8 !important;`（覆盖表头紫色）
    2. `border-[#7B4B9E]` → `border-color: #DCE8F2 !important;`（覆盖搜索框紫色边框）
    3. `focus\:ring-\[\#7B4B9E\]` → 如有需要调整 focus ring
  - 确保不对全局 `html.light .bg-[#7B4B9E]` 做修改，仅在 `#detail-page` 作用域内覆盖
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-4
- **Test Requirements**:
  - `programmatic` TR-1.1: `npx tsc --noEmit` 无错误
  - `programmatic` TR-1.2: `npx vite build` 成功
  - `human-judgement` TR-1.3: 审查 ProjectDetailPage L173 表头 `<thead className="bg-[#7B4B9E]">` 确实在 `#detail-page` 作用域内
- **Notes**: DataTable 表头 hover 类 `hover:bg-[#7B4B9E]/80` 也要覆盖 → `hover:bg-[#00B4D8]/80`

## [x] Task 2: 搜索并覆盖详情页其他紫色色值
- **Priority**: medium
- **Depends On**: Task 1
- **Description**:
  - 在 ProjectDetailPage.tsx 及其子组件（TabNavigation、DataTable、DataCleaning、Pagination）搜索 #7B4B9E、#6C3B9A、#A78BFA
  - 对找到的紫色色值在 CSS 中使用 `html.light #detail-page` 前缀添加替换规则：
    - #7B4B9E → #00B4D8
    - #6C3B9A → #0096B0
    - #A78BFA → #48CAE4
  - 搜索框焦点 focus ring `focus:ring-[#6BC5E8]`（冰蓝）已是冷色调，不变
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `human-judgement` TR-2.1: 人工审查组件代码确认所有紫色色值已被 CSS 覆盖
  - `programmatic` TR-2.2: 再次 `npx tsc --noEmit`

## [x] Task 3: 提交并推送
- **Priority**: high
- **Depends On**: Task 1, Task 2
- **Description**: git add、commit、push 到 origin/main
- **Acceptance Criteria Addressed**: 所有 AC
- **Test Requirements**:
  - `programmatic` TR-3.1: git push 成功
