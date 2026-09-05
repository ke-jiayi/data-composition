# HomePage 文件夹管理功能 - 实施计划

## [x] Task 1: 数据层扩展：folders store + folderId 字段 + CRUD
- **Priority**: high
- **Depends On**: None
- **Description**:
  - 修改 `src/utils/db.ts`
  - 新增 `Folder` 接口：`{ id: string; name: string; createdAt: number }`
  - Dataset 接口添加可选字段 `folderId?: string`
  - DBSchema 新增 `folders` store；升级 DB_VERSION 2 → 3，并在 upgrade 里创建 folders store + 为 datasets 补充 folderId（老数据保留 undefined 即可）
  - 添加 folders CRUD: `createFolder(name)` / `getAllFolders()` / `updateFolder(id, patch)` / `deleteFolder(id)`
  - 添加 `getDatasetsByFolderId(folderId: string | null)`：null 表示未分类
  - `createDataset` 接受 `folderId?` 字段并存储
  - 保持所有现有函数签名向后兼容（folderId 为可选）
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `programmatic` TR-1.1: `npx tsc --noEmit` 无错误（Folder/Dataset/folderId 类型均正确）
  - `human-judgement` TR-1.2: 代码审查确认 DB_VERSION 提升 + folders store 在 upgrade 分支创建

## [x] Task 2: useDB hook 暴露 folders 相关方法
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - 在 `src/hooks/useDB.ts` 中导入新增的 createFolder/getAllFolders/updateFolder/deleteFolder/getDatasetsByFolderId
  - 添加到 UseDBReturn 类型并在 return 中用 wrapOperation 包装
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `programmatic` TR-2.1: `npx tsc --noEmit` 无错误

## [x] Task 3: HomePage 文件夹 UI（面包屑 / 展示 / 进入 / 未分类）
- **Priority**: high
- **Depends On**: Task 2
- **Description**:
  - 修改 `src/pages/HomePage.tsx`
  - 新增 state: `folders: Folder[]`, `currentFolderId: string | null`
  - 加载：useEffect 中加载 folders + 根据 currentFolderId 用 getDatasetsByFolderId 筛选 datasets
  - 工具栏：面包屑（首页 [/] 文件夹名）+ "新建文件夹"按钮 + "导入数据"按钮（ImportModal 保留，按钮不变）
  - 新建文件夹：简单弹窗 prompt 或内联 input；调用 createFolder 后刷新 folders
  - 文件夹卡片：在数据集列表上方网格显示；图标文件夹样式；显示名称 + 数据集数量；hover 编辑/删除图标；点击卡片切换 currentFolderId 进入
  - 重命名：编辑图标 → 输入框；空值拦截；updateFolder 后刷新
  - 删除：仅当 folder 内数据集数量为 0，删除提示 `confirm("确认删除此文件夹？")` ，否则 alert("文件夹不为空，无法删除")
  - 未分类：根目录下"未分类的数据集"区域显示 folderId 为 null 的数据集
  - 移动数据集：每张数据集卡片加一个"移动到文件夹"小按钮（点击后显示 options：未分类/每个文件夹），选中后调用 updateDataset 设置 folderId + 重新加载
  - handleFileImport（HomePage 内部拖拽导入）：createDataset 时传入 folderId: currentFolderId，这样在文件夹内直接拖入会自动归类
- **Acceptance Criteria Addressed**: AC-2~AC-5, AC-7, AC-8, AC-9
- **Test Requirements**:
  - `programmatic` TR-3.1: `npx tsc --noEmit` 无错误
  - `human-judgement` TR-3.2: 审查 HomePage.tsx 渲染结构：根目录顶部是面包屑+新建按钮，然后文件夹卡片网格，再是未分类数据集

## [x] Task 4: ImportModal 预览页添加"放入文件夹"下拉 + createDataset 传 folderId
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - 修改 `src/components/ImportModal.tsx` props: 新增可选 `folders?: Folder[]`，新增 `currentFolderId?: string | null`
  - 在预览步骤（step === 'preview'）的数据集名称 input 下面添加"放入文件夹" select：
    - 选项：`<option value="">未分类</option>` + `<option value={id}>{name}</option>` 遍历 folders
    - 默认值：若 currentFolderId 存在则选中它，否则选"未分类"
  - 用 useState 管理 selectedFolderId（初始：currentFolderId ?? ''）
  - handleConfirm 调用 createDataset 时把 `folderId: selectedFolderId || undefined`（空字符串转 undefined）
  - HomePage 中 ImportModal 传 folders={folders} currentFolderId={currentFolderId}
- **Acceptance Criteria Addressed**: AC-6
- **Test Requirements**:
  - `programmatic` TR-4.1: `npx tsc --noEmit` 无错误
  - `human-judgement` TR-4.2: 审查 preview 步骤确实出现文件夹下拉

## [ ] Task 5: 验证 tsc + vite build 并提交推送
- **Priority**: high
- **Depends On**: Task 3, Task 4
- **Description**:
  - `npx tsc --noEmit` 无错误
  - `npx vite build` 成功
  - git add/commit/push 到 origin/main
- **Acceptance Criteria Addressed**: 所有 AC
- **Test Requirements**:
  - `programmatic` TR-5.1: tsc 通过
  - `programmatic` TR-5.2: vite build 通过
  - `programmatic` TR-5.3: git push 成功
