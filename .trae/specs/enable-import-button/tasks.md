# 启用首页导入按钮功能 - 实现计划

## [x] Task 1: 添加导入相关的状态和 hooks
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 导入 useDB hook 获取 createDataset、saveData、getAllDatasets 函数
  - 导入 parseFile 函数用于文件解析
  - 添加 useState 管理 datasets、isImporting、importError、importSuccess 状态
  - 添加 useRef 用于 file input 元素
  - 添加 useEffect 加载初始数据集列表
- **Acceptance Criteria Addressed**: [AC-2, AC-3, AC-4]
- **Test Requirements**:
  - `programmatic` TR-1.1: 代码正确导入所有必需的 hooks 和函数
  - `programmatic` TR-1.2: 所有状态变量正确声明
- **Notes**: 参考 ImportModal 组件的实现方式

## [x] Task 2: 实现文件选择和解析逻辑
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 添加 hidden file input 元素，accept 属性为 .csv,.xlsx
  - 实现 handleImport 函数：点击按钮触发 file input 的 click
  - 实现 handleFileChange 函数：处理文件选择
  - 使用 parseFile 解析文件，设置 isImporting 状态
  - 解析失败时设置 importError
- **Acceptance Criteria Addressed**: [AC-1, AC-2]
- **Test Requirements**:
  - `programmatic` TR-2.1: file input accept 属性包含 .csv 和 .xlsx
  - `programmatic` TR-2.2: handleImport 正确触发文件选择
  - `programmatic` TR-2.3: handleFileChange 使用 parseFile 解析文件
- **Notes**: 使用 parseFile 函数统一处理 CSV 和 Excel 文件

## [x] Task 3: 实现数据保存和列表刷新
- **Priority**: high
- **Depends On**: Task 2
- **Description**: 
  - 解析成功后调用 createDataset 创建数据集记录
  - 调用 saveData 将数据保存到 IndexedDB
  - 导入成功后调用 getAllDatasets 刷新数据集列表
  - 设置 importSuccess 状态，显示成功提示
  - 3 秒后自动清除成功提示
- **Acceptance Criteria Addressed**: [AC-3, AC-4, AC-5]
- **Test Requirements**:
  - `programmatic` TR-3.1: createDataset 正确调用
  - `programmatic` TR-3.2: saveData 正确调用
  - `programmatic` TR-3.3: getAllDatasets 在导入后调用刷新列表
- **Notes**: 数据集名称使用文件名（去除扩展名）

## [x] Task 4: 更新 UI 显示真实数据和状态
- **Priority**: medium
- **Depends On**: Task 3
- **Description**: 
  - 统计卡片显示真实数据（从 datasets 计算）
  - 数据集列表显示真实数据（从 datasets 获取）
  - 导入过程中按钮显示加载状态
  - 导入成功/失败时显示提示信息
  - 空状态时显示"暂无数据集"提示
- **Acceptance Criteria Addressed**: [AC-4, AC-5]
- **Test Requirements**:
  - `human-judgment` TR-4.1: 统计卡片显示真实数据
  - `human-judgment` TR-4.2: 数据集列表显示真实数据集
  - `human-judgment` TR-4.3: 导入状态正确显示
- **Notes**: 使用 Tailwind CSS 样式

## [x] Task 5: 绑定按钮并验证 TypeScript 编译
- **Priority**: high
- **Depends On**: Task 4
- **Description**: 
  - 将"导入数据"按钮的 onClick 绑定到 handleImport
  - 运行 TypeScript 类型检查确保无错误
  - 提交并推送代码到 GitHub
- **Acceptance Criteria Addressed**: [AC-1, AC-6]
- **Test Requirements**:
  - `programmatic` TR-5.1: 按钮 onClick 正确绑定
  - `programmatic` TR-5.2: npx tsc --noEmit 返回码为 0
  - `programmatic` TR-5.3: git push 成功完成
- **Notes**: 完成后自动触发 Cloudflare Pages 部署

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 2
- Task 4 depends on Task 3
- Task 5 depends on Task 4