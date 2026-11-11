# Tasks

- [x] Task 1: 建立 COMPARISON_DATA 与选中状态
  - [x] SubTask 1.1: 在 `ComparisonPage.tsx` 定义 `COMPARISON_DATA`（`city1`、`city2`，字段：`title`/`leftImage`/`leftDesc`/`rightImage`/`rightDesc`/`insights`）
  - [x] SubTask 1.2: 用 `useState` 管理当前选中键，默认 `city1`，删除原 `comparisonScopes` 常量

- [x] Task 2: 顶部三段式布局
  - [x] SubTask 2.1: 左侧保留「← 返回首页」按钮
  - [x] SubTask 2.2: 中间居中显示当前 `title`
  - [x] SubTask 2.3: 右侧新增 `<select>`，选项「城市1 vs 农村1」「城市2 vs 农村2」，深色背景样式，切换时更新状态

- [x] Task 3: 主体与结论动态渲染
  - [x] SubTask 3.1: 左/右卡片图片与配文改为读取当前选中项字段
  - [x] SubTask 3.2: 底部 insights 列表按当前项动态渲染
  - [x] SubTask 3.3: 为内容区域加 `key={selectedKey}` + `animate-fade-in` 淡入过渡
  - [x] SubTask 3.4: 图片 onError 兜底状态在切换对比组时重置

- [x] Task 5: 修复切换淡入动画不生效
  - [x] SubTask 5.1: `index.css` 仅声明了 `--animate-fade-in` 变量但缺少 `@keyframes fade-in`，在 `src/index.css` 补充 `@keyframes fade-in`（0% opacity:0 → 100% opacity:1）

- [x] Task 4: 验证（不 push）
  - [x] SubTask 4.1: 运行 `npm run lint` 与 `npm run build`
  - [x] SubTask 4.2: 浏览器验证默认组渲染、切换到 city2 后标题/图片/配文/结论全部变化、返回首页仍可用

# Task Dependencies
- Task 2、Task 3 依赖 Task 1
- Task 4 依赖 Task 1-3
