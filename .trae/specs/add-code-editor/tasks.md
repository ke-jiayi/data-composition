# Tasks

- [x] Task 1: 集成可编辑代码编辑器
  - [ ] SubTask 1.1: 安装依赖 `npm install react-simple-code-editor prismjs @types/prismjs`
  - [ ] SubTask 1.2: 在 src/utils/db.ts 的 Dataset 接口添加 `code?: string` 字段
  - [ ] SubTask 1.3: 在 ProjectDetailPage.tsx 中：
    - 导入 react-simple-code-editor 和 prismjs（含 Python 语法高亮）
    - 添加 `code` 状态（初始值：dataset.code || PYTHON_CODE）
    - 在数据加载完成后设置 code 状态
    - 用 CodeEditor 替换只读 pre/code 块
    - 添加"保存修改"按钮，调用 updateDataset({ ...dataset, code })
    - 保存成功后显示提示（如"已保存"文字短暂显示）
  - [ ] SubTask 1.4: 运行 npx tsc --noEmit 验证编译，git commit 并 push

# Task Dependencies
- None（单一任务）
