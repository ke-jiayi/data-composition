# 首页数据集列表搜索功能 - 实现计划

## [x] Task 1: 添加搜索状态变量
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 添加 searchQuery 状态变量，用于存储搜索关键词
  - 使用 useState 管理搜索输入
- **Acceptance Criteria Addressed**: [AC-1, AC-2]
- **Test Requirements**:
  - `programmatic` TR-1.1: searchQuery 状态正确声明
- **Notes**: 状态初始值为空字符串

## [x] Task 2: 添加搜索输入框 UI
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 在统计卡片下方、数据集列表上方添加搜索输入框
  - 输入框占位文字为"请输入你要查找的内容"
  - 使用 Tailwind CSS 样式
  - 输入框有适当的宽度和内边距
- **Acceptance Criteria Addressed**: [AC-1]
- **Test Requirements**:
  - `human-judgment` TR-2.1: 搜索框正确显示在预期位置
  - `human-judgment` TR-2.2: 占位文字正确显示
- **Notes**: 样式参考现有输入框风格

## [x] Task 3: 实现搜索过滤逻辑
- **Priority**: high
- **Depends On**: Task 2
- **Description**: 
  - 创建过滤后的数据集列表
  - 根据 dataset.name 或 dataset.fileName 匹配关键词
  - 搜索不区分大小写（使用 toLowerCase()）
  - 当 searchQuery 为空时，显示所有数据集
- **Acceptance Criteria Addressed**: [AC-2, AC-3, AC-4]
- **Test Requirements**:
  - `programmatic` TR-3.1: 过滤逻辑正确实现
  - `programmatic` TR-3.2: 大小写不敏感匹配正确
  - `human-judgment` TR-3.3: 实时搜索响应正常
- **Notes**: 使用 filter 和 includes 方法实现

## [x] Task 4: 添加无匹配结果提示
- **Priority**: medium
- **Depends On**: Task 3
- **Description**: 
  - 当过滤后没有数据集时，显示"未找到匹配的数据集"
  - 使用条件渲染实现
- **Acceptance Criteria Addressed**: [AC-5]
- **Test Requirements**:
  - `human-judgment` TR-4.1: 无匹配时正确显示提示
- **Notes**: 样式简洁，与空状态风格一致

## [x] Task 5: 验证 TypeScript 编译并提交推送
- **Priority**: high
- **Depends On**: Task 4
- **Description**: 
  - 运行 TypeScript 类型检查确保无错误
  - 提交并推送代码到 GitHub
- **Acceptance Criteria Addressed**: [AC-6]
- **Test Requirements**:
  - `programmatic` TR-5.1: npx tsc --noEmit 返回码为 0
  - `programmatic` TR-5.2: git push 成功完成
- **Notes**: 完成后自动触发 Cloudflare Pages 部署

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 2
- Task 4 depends on Task 3
- Task 5 depends on Task 4
