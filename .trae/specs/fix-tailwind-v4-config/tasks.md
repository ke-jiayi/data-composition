# 修复 Tailwind CSS v4 配置问题 - 实施计划

## [ ] Task 1: 修改 index.css 使用 Tailwind v4 语法
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 打开 src/index.css
  - 将 `@tailwind base; @tailwind components; @tailwind utilities;` 替换为 `@import "tailwindcss";`
  - 添加 `@source "../**/*.{js,ts,jsx,tsx,html}";` 指定内容扫描路径
  - 将 tailwind.config.js 中的主题配置迁移到 `@theme { ... }` 块中
  - 保存文件
- **Acceptance Criteria Addressed**: AC-1, AC-2
- **Test Requirements**:
  - `programmatic` TR-1.1: index.css 包含 `@import "tailwindcss";`
  - `programmatic` TR-1.2: index.css 包含 `@source` 指令
  - `programmatic` TR-1.3: index.css 包含 `@theme` 块

## [ ] Task 2: 验证 Tailwind 样式生效
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 在浏览器中检查导航栏高度是否为 64px
  - 检查内容区域 padding-top 是否为 80px
  - 如果开发服务器需要重启，重启它
- **Acceptance Criteria Addressed**: AC-3, AC-4, AC-5
- **Test Requirements**:
  - `programmatic` TR-2.1: header 元素高度约为 64px
  - `programmatic` TR-2.2: main 元素 padding-top 约为 80px
  - `human-judgement` TR-2.3: 页面内容不被导航栏遮挡

## [ ] Task 3: TypeScript 编译验证
- **Priority**: high
- **Depends On**: Task 2
- **Description**: 
  - 运行 `npx tsc --noEmit` 检查 TypeScript 编译
- **Acceptance Criteria Addressed**: AC-6
- **Test Requirements**:
  - `programmatic` TR-3.1: `npx tsc --noEmit` 退出码为 0

## [ ] Task 4: 提交并推送代码
- **Priority**: high
- **Depends On**: Task 3
- **Description**: 
  - 使用 git 提交修改
  - 推送到 GitHub
- **Acceptance Criteria Addressed**: 所有
- **Test Requirements**:
  - `programmatic` TR-4.1: git commit 成功
  - `programmatic` TR-4.2: git push 成功
