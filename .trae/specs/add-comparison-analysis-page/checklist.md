# Checklist

- [x] 首页操作区「导入数据」旁出现「对比分析」按钮，紫色渐变，点击后路由变为 `/comparison`
- [x] `App.tsx` 中存在 `/comparison` 路由并指向 `ComparisonPage`，未知路由仍重定向 `/home`
- [x] `ComparisonPage.tsx` 已创建并从 `src/pages/index.ts` 导出
- [x] 页面顶部左上角有「返回首页」按钮，点击回到 `/home`
- [x] 页面主标题为「城乡消费结构对比分析」
- [x] 标题下方有一排切换按钮，「城市1 vs 农村1」为高亮选中态，结构可扩展
- [x] 主体区为响应式双栏 Grid（`grid-cols-1 lg:grid-cols-2 gap-6`），窄屏单列、宽屏双列
- [x] 左栏卡片标题「各分类指数对比」，图片路径 `/images/城乡1_对比图.png`，配文与需求一致
- [x] 右栏卡片标题「总指数趋势对比」，图片路径 `/images/城乡1_WorkBuddy对比图.png`，配文与需求一致
- [x] 两张图片宽度自适应且不变形（`object-contain`），加载失败时有兜底提示
- [x] 底部宽卡片标题「核心数据洞察」，列表含三条结论且文案与需求完全一致
- [x] 卡片使用 `bg-[#26262C]` 等深色主题类，light/dark 两种主题下文字与背景对比度正常
- [x] 页面无 IndexedDB 相关调用（纯静态）
- [x] `npm run lint` 与 `npm run build` 均通过
- [x] 未执行 git push
