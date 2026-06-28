# 首页底部滚动触发动画 - 实现计划

## [ ] Task 1: 导入 framer-motion hooks
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 在 HomePage.tsx 中导入 motion 和 useInView hooks
  - 使用：import { motion, useInView } from 'framer-motion'
- **Acceptance Criteria Addressed**: [AC-2]
- **Test Requirements**:
  - `programmatic` TR-1.1: 导入语句正确无误
- **Notes**: framer-motion 已安装，无需额外安装

## [ ] Task 2: 创建 Footer ref
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 创建 ref 用于引用 Footer 元素
  - 使用 useRef<HTMLDivElement> 管理 ref
- **Acceptance Criteria Addressed**: [AC-2]
- **Test Requirements**:
  - `programmatic` TR-2.1: ref 正确创建和绑定
- **Notes**: 确保 ref 与 useInView 配合使用

## [ ] Task 3: 添加 Footer UI 和动画
- **Priority**: high
- **Depends On**: Task 2
- **Description**: 
  - 在 Layout 内部、HomePage 最底部添加 Footer 区域
  - 显示文字："© 2026 数据作品集 | 用数据记录成长"
  - 使用 motion.div 包装 Footer 内容
  - 动画配置：
    - initial: { opacity: 0, y: 30 }
    - animate: { opacity: 1, y: 0 }
    - transition: { duration: 0.6, ease: "easeOut" }
  - 使用 useInView 检测元素进入视口，once: true
- **Acceptance Criteria Addressed**: [AC-1, AC-2, AC-3]
- **Test Requirements**:
  - `human-judgment` TR-3.1: Footer 文字正确显示
  - `human-judgment` TR-3.2: 滚动时动画正确触发
  - `human-judgment` TR-3.3: 动画只播放一次
- **Notes**: 样式简洁，与页面整体风格一致

## [ ] Task 4: 验证 TypeScript 编译并提交推送
- **Priority**: high
- **Depends On**: Task 3
- **Description**: 
  - 运行 TypeScript 类型检查确保无错误
  - 提交并推送代码到 GitHub
- **Acceptance Criteria Addressed**: [AC-4]
- **Test Requirements**:
  - `programmatic` TR-4.1: npx tsc --noEmit 返回码为 0
  - `programmatic` TR-4.2: git push 成功完成
- **Notes**: 完成后自动触发 Cloudflare Pages 部署

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 2
- Task 4 depends on Task 3
