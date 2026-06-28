# 首页重新设计 - The Implementation Plan (Decomposed and Prioritized Task List)

## [ ] Task 1: 安装 framer-motion 依赖
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 在 package.json 中添加 framer-motion 依赖
  - 运行 npm install 安装依赖
- **Acceptance Criteria Addressed**: [AC-7]
- **Test Requirements**:
  - `programmatic` TR-1.1: package.json 中包含 framer-motion 依赖
  - `programmatic` TR-1.2: npm install 成功执行
- **Notes**: framer-motion 用于实现滚动入场动画

## [ ] Task 2: 重构 HomePage 顶部区域
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 左侧显示"数据作品集" Logo/标题
  - 中间显示当前日期时间（格式：当地时间：xxxx-xx-xx）
  - 右侧显示"导入数据"蓝色按钮
  - 保留现有的文件选择和导入逻辑
- **Acceptance Criteria Addressed**: [AC-1, AC-8, AC-9]
- **Test Requirements**:
  - `programmatic` TR-2.1: 顶部区域包含 Logo、日期、导入按钮三个元素
  - `human-judgement` TR-2.2: 布局与设计图一致，左右对齐合理
  - `programmatic` TR-2.3: 导入按钮点击后触发文件选择框
- **Notes**: 日期使用 useState + useEffect 实时更新

## [ ] Task 3: 实现统计卡片组件
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 三个统计卡片水平排列
  - 卡片1：总数据集数量（从 datasets.length 获取）
  - 卡片2：总数据行数（累加所有 dataset.rowCount）
  - 卡片3：最近导入时间（取最新的 dataset.createdAt）
  - 数据从 useDB hook 实时获取
- **Acceptance Criteria Addressed**: [AC-2]
- **Test Requirements**:
  - `programmatic` TR-3.1: 三个卡片显示正确的统计数据
  - `programmatic` TR-3.2: 导入新数据后统计数据自动更新
  - `human-judgement` TR-3.3: 卡片样式美观，有适当的间距和阴影
- **Notes**: 空数据时显示 0 或"暂无"

## [ ] Task 4: 实现搜索和排序功能
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 搜索框：占位文字"请输入你要查找的内容"
  - 实时过滤：按数据集名称或描述匹配
  - 排序下拉：支持"导入时间（最新）"、"名称"、"数据量"
  - 默认按导入时间倒序排列
- **Acceptance Criteria Addressed**: [AC-3, AC-4]
- **Test Requirements**:
  - `programmatic` TR-4.1: 搜索框输入后列表实时过滤
  - `programmatic` TR-4.2: 排序选项切换后列表正确排序
  - `programmatic` TR-4.3: 默认排序为导入时间倒序
- **Notes**: 搜索不区分大小写

## [ ] Task 5: 重构数据集列表
- **Priority**: high
- **Depends On**: [Task 4]
- **Description**: 
  - 数据集以卡片网格形式展示
  - 每个卡片包含：名称、数据行数、导入时间
  - 点击卡片跳转到 /project/:id
  - 空状态显示友好提示
- **Acceptance Criteria Addressed**: [AC-5, AC-6]
- **Test Requirements**:
  - `programmatic` TR-5.1: 点击卡片正确跳转到详情页
  - `human-judgement` TR-5.2: 卡片样式美观，有 hover 效果
  - `human-judgement` TR-5.3: 空状态提示友好
- **Notes**: 保留删除按钮（可选）

## [ ] Task 6: 实现底部滚动动画区域
- **Priority**: medium
- **Depends On**: [Task 1]
- **Description**: 
  - 页面底部添加大圆角矩形占位区域
  - 显示文字"（UI界面，还没想好，不用导入）"
  - 使用 framer-motion 实现滚动入场动画（渐显 + 上移）
  - 参考 ECharts 官网的优雅渐显效果
- **Acceptance Criteria Addressed**: [AC-7]
- **Test Requirements**:
  - `human-judgement` TR-6.1: 滚动到视口时有平滑的渐显动画
  - `human-judgement` TR-6.2: 动画自然流畅，不突兀
  - `programmatic` TR-6.3: 底部区域显示正确的文字内容
- **Notes**: 使用 framer-motion 的 motion.div + whileInView

## [ ] Task 7: 整合与优化
- **Priority**: medium
- **Depends On**: [Task 2, Task 3, Task 4, Task 5, Task 6]
- **Description**: 
  - 整合所有组件到 HomePage
  - 添加欢迎语"手动测试：我改了这里"
  - 调整整体间距和布局
  - 确保响应式布局
- **Acceptance Criteria Addressed**: [AC-9]
- **Test Requirements**:
  - `programmatic` TR-7.1: 页面包含"手动测试：我改了这里"文字
  - `human-judgement` TR-7.2: 整体布局美观，间距合理
  - `human-judgement` TR-7.3: 移动端适配良好
- **Notes**: 保持与现有设计风格一致

## [ ] Task 8: TypeScript 类型检查与提交
- **Priority**: high
- **Depends On**: [Task 7]
- **Description**: 
  - 运行 TypeScript 编译检查
  - 修复所有类型错误
  - 提交代码并推送到 GitHub
- **Acceptance Criteria Addressed**: [所有 AC]
- **Test Requirements**:
  - `programmatic` TR-8.1: tsc 编译无错误
  - `programmatic` TR-8.2: 代码成功推送到 GitHub
- **Notes**: 确保所有功能正常工作

# Task Dependencies
- Task 6 depends on Task 1
- Task 5 depends on Task 4
- Task 7 depends on Task 2, Task 3, Task 4, Task 5, Task 6
- Task 8 depends on Task 7
