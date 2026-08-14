# Checklist

- [ ] Header.tsx 中 `<header>` 高度为 `h-18`（72px）
- [ ] Header.tsx 中时间 `<span>` 字号为 `text-base`（16px）
- [ ] Header.tsx 保持 `fixed top-0 left-0 right-0 z-40` 固定定位
- [ ] Header.tsx 保持 `flex items-center justify-between h-full` 垂直居中
- [ ] Header.tsx 左右内边距保持 `px-4 sm:px-6 lg:px-8` 不变
- [ ] Layout.tsx 侧边栏导航链接字号为 `text-base`（16px）
- [ ] Layout.tsx 侧边栏 `<aside>` 顶部偏移为 `top-18`（匹配新 Header 高度）
- [ ] Layout.tsx 主内容 `<main>` 顶部内边距为 `pt-24`（不被 Header 遮挡）
- [ ] TypeScript 编译通过（`npx tsc --noEmit` 无错误）
- [ ] 变更已提交并推送到 origin/main
