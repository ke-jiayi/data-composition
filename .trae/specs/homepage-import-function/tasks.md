# 首页导入数据功能 - The Implementation Plan (Decomposed and Prioritized Task List)

## [x] Task 1: 在 HomePage 中添加导入相关的 state 和 file input ref
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 添加导入数据相关的 state：parsedData（解析后的数据数组）、columns（列名数组）、fileName（文件名）、isParsing（加载状态）、error（错误信息）
  - 添加 hidden file input 的 ref，用于触发文件选择对话框
  - file input 接受 .csv 和 .xlsx 文件
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `programmatic` TR-1.1: 组件正确声明所有必需的 state 变量
  - `programmatic` TR-1.2: file input 元素的 accept 属性包含 .csv 和 .xlsx
- **Notes**: 使用 useRef 引用 file input 元素

## [ ] Task 2: 实现 handleImport 函数和文件解析逻辑
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 实现 handleImport 函数：点击按钮时触发 file input 的 click 事件
  - 实现 handleFileChange 函数：处理文件选择
  - 根据文件扩展名选择解析器：.csv 使用 papaparse，.xlsx 使用 xlsx
  - 解析过程中设置 isLoading 状态
  - 解析成功后保存数据到 state
  - 解析失败时设置错误信息
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-5, AC-6, AC-7
- **Test Requirements**:
  - `programmatic` TR-2.1: handleImport 函数能正确触发文件选择框
  - `programmatic` TR-2.2: CSV 文件使用 papaparse 解析
  - `programmatic` TR-2.3: Excel 文件使用 xlsx 解析
  - `programmatic` TR-2.4: 解析成功后数据保存到 state
  - `programmatic` TR-2.5: 解析失败时设置错误信息
  - `human-judgement` TR-2.6: 加载状态正确显示
- **Notes**: 可以参考 utils/fileParser.ts 的实现方式

## [ ] Task 3: 实现数据表格展示区域
- **Priority**: high
- **Depends On**: Task 2
- **Description**: 
  - 在页面上添加数据预览区域
  - 有数据时显示表格，包含列名和数据行
  - 显示文件名和数据行数统计
  - 表格支持横向滚动
  - 最多展示前 100 行数据，避免大文件性能问题
  - 无数据时不显示该区域
  - 显示错误信息（如果有）
- **Acceptance Criteria Addressed**: AC-4, AC-6
- **Test Requirements**:
  - `human-judgement` TR-3.1: 表格正确显示列名和数据
  - `human-judgement` TR-3.2: 显示文件名和数据行数
  - `programmatic` TR-3.3: 最多展示 100 行数据
  - `human-judgement` TR-3.4: 表格样式美观，支持横向滚动
- **Notes**: 使用 Tailwind CSS 样式，可以参考 DataTable 组件

## [x] Task 4: 绑定导入按钮并验证功能
- **Priority**: high
- **Depends On**: Task 3
- **Description**: 
  - 将"导入数据"按钮的 onClick 绑定到 handleImport 函数
  - 确保 TypeScript 编译通过
  - 验证功能完整性
- **Acceptance Criteria Addressed**: AC-1, AC-5
- **Test Requirements**:
  - `programmatic` TR-4.1: 按钮 onClick 绑定到 handleImport
  - `programmatic` TR-4.2: TypeScript 编译无错误
- **Notes**: 保留原有的 ImportModal 功能作为备选

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 2
- Task 4 depends on Task 3
