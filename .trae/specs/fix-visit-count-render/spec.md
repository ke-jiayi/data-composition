# 修复访问量渲染逻辑 Spec

## Why
HomePage 访问量 fetch 逻辑用 `!data.count` 判断是否更新，当 API 返回 `count: 0`（KV 未绑定/初次访问）时会被当作 falsy 跳过，导致页面停留在初始值 0 无法更新。需修复为精确的 null/undefined 判断。

## What Changes
- `if (settled || !data.count) return;` 改为 `if (settled || data.count == null) return;`
- 确保每次页面加载时访问量自动从 API 更新

## Impact
- Affected code: `src/pages/HomePage.tsx`（访问量 useEffect）

## ADIFIED Requirements
### Requirement: 访问量正确渲染
页面加载时调用 /api/visit，无论返回 count 为何值（含 0）都正确渲染到"总访问量"卡片。

#### Scenario: count 为 0
- **WHEN** API 返回 {count: 0}
- **THEN** 页面显示 0，不被跳过
