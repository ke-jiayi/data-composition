# Checklist

- [x] ProjectListPage.tsx 中「返回首页导入数据」链接 `to="/home"`（不再指向 `/`）
- [x] ProjectListPage.tsx 该链接其余 className 样式保持不变
- [x] HomePage.tsx 中「← 返回封面」按钮仍为 `to="/"`（未改动）
- [x] Layout.tsx 侧边栏导航激活态文字色为 `#6BC5E8` 且有发光阴影
- [x] Layout.tsx 激活态背景为 `bg-cyan-500/15`
- [x] Layout.tsx 激活态保持左边框 `border-l-2 border-cyan-400`
- [x] Layout.tsx 未激活态样式保持不变（`text-gray-400 hover:text-purple-300 hover:bg-purple-500/5`）
- [x] Layout.tsx navLinks 中「首页」仍指向 `/home`（未改动）
- [x] TypeScript 编译通过（`npx tsc --noEmit` 无错误）
- [x] 变更已提交并推送到 origin/main
