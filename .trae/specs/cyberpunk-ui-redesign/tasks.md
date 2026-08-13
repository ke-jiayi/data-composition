# Tasks

- [x] Task 1: 改造全局主题色为深蓝黑（修改 `src/index.css`）
  - [x] SubTask 1.1: 修改 `:root` 与 `@theme` 中的 CSS 变量：background 改为 `#0a0e1a`，surface 改为深色半透明，text 改为浅色，border 改为深色霓虹边
  - [x] SubTask 1.2: 修改 `body` 背景色为深蓝黑，文字色为浅灰白
  - [x] SubTask 1.3: 修改 `::selection`、scrollbar 配色为深色基调 + 紫色高亮
  - [x] SubTask 1.4: 修改 `.card`、`.btn`、`.input`、`.data-table` 等组件类为深色玻璃态样式（保留类名，仅改样式值）

- [x] Task 2: 改造 Layout 与 Header 为深色赛博朋克风
  - [x] SubTask 2.1: 修改 `src/components/Layout.tsx`：根容器 `bg-gray-50` 改为深蓝黑（如 `bg-[#0a0e1a]`），侧边栏改为深色玻璃态（`bg-[#0a0e1a]/90 backdrop-blur` + 霓虹边框），激活态链接改为霓虹紫/青
  - [x] SubTask 2.2: 修改 `src/components/Header.tsx`：背景改为 `bg-[#0a0e1a]/80 backdrop-blur`，底部边框改为霓虹紫细线，"✈️ 导航"文字改为霓虹青/紫色

- [x] Task 3: 改造 WelcomePage 封面页
  - [x] SubTask 3.1: 移除 WelcomePage 主标题上方的 `📊` emoji 图标 div（第30行）
  - [x] SubTask 3.2: 在背景层新增紫色流光折线图 SVG 装饰：用 SVG path 绘制一条折线图走势（类似数据图表），stroke 用紫色（如 `#a855f7` / `#d946ef`），加 `filter: blur` 与 glow 效果，定位为绝对定位铺满背景
  - [x] SubTask 3.3: 调整主标题样式去除"AI 感"：保留渐变但更克制，可加入等宽字体点缀或霓虹下划线，整体保持赛博朋克基调
  - [x] SubTask 3.4: 确保"点击任意位置进入"跳转逻辑不变

- [x] Task 4: 改造 HomePage 为深色赛博朋克风（仅样式，不动逻辑）
  - [x] SubTask 4.1: 主内容卡片容器由 `bg-white` 改为深色玻璃态（`bg-white/5 backdrop-blur` + 霓虹边框）
  - [x] SubTask 4.2: 三个统计卡片改为深色玻璃态，左侧色条改为霓虹青/紫/品红渐变，数字文字改为浅色
  - [x] SubTask 4.3: 搜索框改为深色背景 + 霓虹聚焦边框
  - [x] SubTask 4.4: 数据集卡片改为深色玻璃态，悬停光晕改为霓虹紫/青，文字色调整为浅色
  - [x] SubTask 4.5: "导入数据"按钮改为霓虹渐变（紫/青），文字保持可读
  - [x] SubTask 4.6: 空状态、删除确认对话框、提示框（成功/失败）改为深色基调
  - [x] SubTask 4.7: "← 返回封面"按钮改为深色霓虹边框风格
  - [x] SubTask 4.8: 确保所有功能（handleImport、handleFileChange、handleDelete、搜索过滤、Link 跳转）逻辑代码完全不变

- [x] Task 5: 构建验证与回归测试
  - [x] SubTask 5.1: 运行 `npm run build` 确认 TypeScript 编译与 Vite 构建无错误
  - [x] SubTask 5.2: 本地 `npm run dev` 验证封面页、首页、项目详情页视觉与功能正常

# Task Dependencies
- Task 2、Task 3、Task 4 可在 Task 1 完成后并行执行（都依赖全局主题变量）
- Task 5 依赖 Task 1-4 全部完成
