# Checklist

## 文字色覆盖
- [ ] `text-gray-100` → `#374151`（浅色模式）
- [ ] `text-gray-100` 在代码编辑器（`bg-gray-900`）上保持 `#F3F4F6`
- [ ] `text-gray-500` → `#6B7280`
- [ ] `text-gray-600` → `#4B5563`
- [ ] `text-gray-700` → `#374151`
- [ ] `text-gray-800` → `#1F2937`
- [ ] `text-gray-900` → `#1A1A1E`
- [ ] `text-[#fafafa]` → `#1A1A1E`
- [ ] `text-[#a3a3a3]` → `#6B7280`
- [ ] `text-[#D1D5DB]` → `#374151`（更新，原 `#4B5563`）
- [ ] `text-white` → `#1A1A1E`（已有，确认未删除）

## 背景/边框覆盖
- [ ] `bg-[#262626]` → `#F0F0F4`
- [ ] `border-[#303030]` → `#E5E7EB`
- [ ] `bg-white/5` → `rgba(0,0,0,0.03)`
- [ ] `bg-white/10` → `rgba(0,0,0,0.05)`

## 通用
- [ ] 黑夜模式不受影响（新规则仅在 `html.light` 下生效）
- [ ] TypeScript 编译通过（`npx tsc --noEmit` 无错误）
- [ ] 变更已提交并推送到 origin/main
