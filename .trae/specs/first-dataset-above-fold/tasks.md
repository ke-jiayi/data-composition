# 首屏可见第一个数据集卡片（第三轮）- 实施计划

## Task 1: HomePage 垂直空间激进压缩
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - pt-20 → pt-[72px]（在 Layout.tsx）
  - Layout 内容层 p-3 md:p-5 → p-2 md:p-3
  - 主卡 p-3 md:p-5 → p-2 md:p-3
  - hero 标题 text-2xl md:text-3xl → text-xl md:text-2xl；副标题 text-sm md:text-base → text-xs md:text-sm；分隔线 mt-3 h-1 → mt-2 h-0.5；hero mb-6 → mb-3
  - "我的数据集"标题 text-xl → text-lg；标题行 mb-4 → mb-2
  - 统计网格 mb-6 → mb-3；统计卡 p-3 → p-2；统计数字 text-xl → text-lg；标签 mb-2 → mb-1
  - 面包屑 mb-4 → mb-2；文件夹区 mb-6 → mb-3、文件夹卡 p-3 → p-2；"未分类"标题 mb-3 → mb-2
  - 搜索框 py-2.5 → py-2、mb-5 → mb-3；数据集卡 p-3 → p-2；数据集网格 gap-3 md:gap-4 → gap-2 md:gap-3
- **Acceptance Criteria Addressed**: AC-1, AC-2
- **Test Requirements**:
  - `rule` TR-1.1: grep 验证统计数字 text-lg、统计卡 p-2、标题 text-lg
  - `rule` TR-1.2: 浏览器测量第一个数据集卡片 bottom <= innerHeight

## Task 2: 其余页面同步收紧
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: None
- **Description**:
  - ProjectListPage/AboutPage/PowerBIPage/ProjectDetailPage：标题 text-xl → text-lg；卡片/面板 p-3 md:p-4 → p-2 md:p-3；网格 gap 收紧一档；AboutPage 卡片 p-4 md:p-5 → p-3 md:p-4
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `rule` TR-2.1: grep 验证各页面标题 text-lg、卡片 p-2 md:p-3

## Task 3: 验证
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1, 2
- **Description**:
  - tsc / vite build 通过
  - 浏览器测量 /home 第一个数据集卡片 bottom <= innerHeight
  - 窄屏无溢出
  - 通知用户预览，不 push
- **Acceptance Criteria Addressed**: AC-1, AC-3, AC-4, AC-5, AC-6
- **Test Requirements**:
  - `rule` TR-3.1: tsc 0
  - `rule` TR-3.2: vite build 0
  - `rule` TR-3.3: 数据集卡 bottom <= innerHeight
  - `rule` TR-3.4: 窄屏无溢出
  - `rubric` TR-3.5: 密度 >= 4
