# 全局布局进一步紧凑化（第二轮）- 实施计划

## Task 1: HomePage 进一步紧凑化
- **Status**: `completed`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - hero 标题（L255）`text-3xl md:text-4xl` → `text-2xl md:text-3xl`
  - 主内容卡片容器（L264）`p-4 md:p-6` → `p-3 md:p-5`
  - 统计网格（L319）`gap-3 md:gap-4` → `gap-2 md:gap-3`
  - 三张统计卡（L320/L328/L336）`p-4` → `p-3`
  - 三个统计数字（L323/L331/L339）`text-2xl` → `text-xl`
  - 文件夹网格（L373）`gap-3` → `gap-2 md:gap-3`；文件夹卡（L377）`p-4` → `p-3`
  - 数据集网格（L447）`gap-4` → `gap-3 md:gap-4`；数据集卡（L452）`p-4` → `p-3`
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3
- **Test Requirements**:
  - `rule` TR-1.1: HomePage 统计数字为 text-xl；统计/数据集/文件夹卡为 p-3；hero 为 text-2xl md:text-3xl；网格 gap 收紧；证据：grep 与文件审查

## Task 2: 其余页面（ProjectList/About/PowerBI/ProjectDetail）紧凑化
- **Status**: `completed`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - ProjectListPage：标题 `text-2xl`→`text-xl`；网格 `gap-4 md:gap-5`→`gap-3 md:gap-4`；卡片 `p-4 md:p-5`→`p-3 md:p-4`
  - AboutPage：标题 `text-2xl`→`text-xl`；`space-y-6`→`space-y-4 md:space-y-5`；四张板块卡 `p-5 md:p-6`→`p-4 md:p-5`
  - PowerBIPage：标题 `text-2xl`→`text-xl`；三张卡 `p-4 md:p-5`→`p-3 md:p-4`；步骤网格 `gap-4 md:gap-6`→`gap-3 md:gap-4`
  - ProjectDetailPage：大标题 `text-2xl`→`text-xl`；三块面板 `p-4 md:p-5`→`p-3 md:p-4`；信息网格 `gap-4 md:gap-6`→`gap-3 md:gap-4`；结论卡 `gap-4 p-4`→`gap-3 p-3`；结论列表 `space-y-4`→`space-y-3`
- **Acceptance Criteria Addressed**: AC-2, AC-3
- **Test Requirements**:
  - `rule` TR-2.1: 四页面大标题为 text-xl；面板/卡片为 p-3 md:p-4（AboutPage 为 p-4 md:p-5）；网格 gap 收紧一档；证据：grep 与文件审查

## Task 3: Layout 内容包装层收紧
- **Status**: `completed`
- **Priority**: medium
- **Depends On**: None
- **Description**:
  - Layout 内容包装层（L79）`p-4 md:p-6` → `p-3 md:p-5`
  - 保留 root `overflow-x-hidden` 与 body `overflow-x: hidden`
- **Acceptance Criteria Addressed**: AC-1, AC-3
- **Test Requirements**:
  - `rule` TR-3.1: Layout 内容层为 p-3 md:p-5；root/body overflow-x 保留；证据：文件审查

## Task 4: 验证（tsc + build + 浏览器检测）
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 1, 2, 3
- **Description**:
  - `npx tsc --noEmit` 与 `npx vite build` 通过
  - 浏览器在桌面视口检测 /home、/projects、/about、/powerbi、/project/:id（含各 Tab）`scrollWidth <= clientWidth`
  - 550px 窄屏抽查 /home 与 /project/:id 不退化
  - 通知用户本地预览，不 push
- **Acceptance Criteria Addressed**: AC-4, AC-5, AC-6
- **Test Requirements**:
  - `rule` TR-4.1: tsc 退出码 0
  - `rule` TR-4.2: vite build 退出码 0
  - `rule` TR-4.3: 各页面 scrollWidth <= clientWidth
  - `rule` TR-4.4: 窄屏无溢出、卡片单栏
  - `rubric` TR-4.5: 1366 视觉密度 >= 4
- **Completion Evidence**:
  - TR-4.1: `npx tsc --noEmit` 退出码 0。
  - TR-4.2: `npx vite build` 成功（✓ built in 2.33s），仅既有 chunk 警告。
  - TR-4.3: 浏览器检测 /home、/projects、/about、/powerbi、/project/:id（表格/结论/智能分析 Tab）均 scrollWidth == clientWidth，无水平溢出。
  - TR-4.4: 窄屏自动化环境无法调整窗口（window.resizeTo 无效）；上一轮已验证 552px 窄屏 /home 与详情页无溢出、Tab 单行横滑不折行，本轮 TabNavigation 未改动，结论延续。
  - TR-4.5 rubric: 自评 4/5。截图目检：统计数字 text-xl、统计卡/数据集卡 p-3、页面标题 text-xl、hero text-2xl md:text-3xl、面板 p-3 md:p-4、网格 gap 收紧一档，密度较上一轮进一步提升，无挤压/溢出/裁切。最终由用户本机 1366 预览确认。
  - 实施注意：同文件并行 Edit 会互相覆盖（已多次观察到），本轮改为串行编辑后全部生效。
