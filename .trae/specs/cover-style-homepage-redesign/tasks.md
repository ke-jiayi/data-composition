# 封面风格首页重构 - 实施计划

## [ ] Task 1: 重写 HomePage.tsx - 封面 Hero 区域
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 创建全屏 Hero 封面区域，使用 `min-h-screen` + 深色渐变背景（from-slate-950 via-slate-900 to-slate-950）
  - 添加霓虹蓝/电光紫装饰（border、glow、underline 等）
  - 大号标题：`数据作品集` + `Data Portfolio`（粗体、大字号）
  - 副标题：`数据分析 · 可视化 · 作品集`
  - 探索按钮：点击平滑滚动到 `#datasets` 锚点（useRef + scrollIntoView）
  - 底部信息小字：`数据来源：国家统计局 | 技术栈：React + Python`
  - 使用 framer-motion 实现渐显+上移动画（staggerChildren 依次出现）
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-4, AC-5
- **Test Requirements**:
  - `human-judgement` TR-1.1: Hero 占满屏幕、内容居中、渐变背景
  - `human-judgement` TR-1.2: 标题/副标题/按钮样式符合科技感
  - `human-judgement` TR-1.3: 点击探索按钮平滑滚动

## [ ] Task 2: 集成现有数据集列表区域
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 在 Hero 下方添加 `id="datasets"` 的数据集列表区域容器
  - 保留原有统计卡片、搜索框、导入按钮、数据集卡片、Footer
  - 使用浅色/白色背景与深色 Hero 形成对比
  - 确保所有原有功能（导入、搜索、点击跳转）不变
- **Acceptance Criteria Addressed**: AC-6
- **Test Requirements**:
  - `programmatic` TR-2.1: 导入按钮和卡片点击逻辑代码完整保留
  - `human-judgement` TR-2.2: 数据集列表区域样式协调美观

## [ ] Task 3: TypeScript 编译验证
- **Priority**: high
- **Depends On**: Task 2
- **Description**: 
  - 运行 `npx tsc --noEmit` 检查 TypeScript 编译
- **Acceptance Criteria Addressed**: AC-7
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
