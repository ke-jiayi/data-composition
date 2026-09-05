# HomePage 文件夹管理功能 PRD

## Overview
- **Summary**: 在 HomePage 添加"文件夹"管理功能，用户可创建文件夹、重命名/删除文件夹、拖拽或导入时选择归类数据集；根目录显示文件夹卡片 + "未分类"数据集，点击文件夹进入子视图并显示面包屑。
- **Purpose**: 解决大量数据集堆积时难以整理的问题，提供类似电脑磁盘的自由组织方式。
- **Target Users**: 拥有多个数据集并希望按主题/来源分类整理的用户。

## Goals
- IndexedDB 新增 folders 表 + datasets.folderId 字段（backward compatible）
- 提供文件夹 CRUD：新建/重命名/删除（空才能删）
- 首页分两层视图：根目录（文件夹卡片 + 未分类数据集）/ 文件夹视图（子数据集列表）+ 面包屑
- 导入流程可选择放入哪个文件夹（或"未分类"）
- 首页文件夹卡片显示：名称、数据集数量

## Non-Goals (Out of Scope)
- 文件夹嵌套（仅一层，子文件夹不在本期）
- 数据集卡片拖拽到文件夹（拖拽交互复杂，改为导入时下拉 + 首页卡片菜单"移动到文件夹"）
- 文件夹共享、权限、云同步
- 其他页面（ProjectDetail/Welcome/ProjectList）改动

## Background & Context
- 当前数据集存储：`utils/db.ts` DBSchema，`datasets` store，版本 2
- useDB hook 提供 createDataset/getAllDatasets 等
- HomePage 有直接拖拽导入（L100-L129）和 ImportModal 两种导入路径

## Functional Requirements
- **FR-1**: Folder CRUD（IndexedDB `folders` 表：id, name, createdAt）
- **FR-2**: Dataset 新增 `folderId?: string` 字段（null/undefined = 未分类）
- **FR-3**: 首页根目录：顶部工具栏（当前路径面包屑 + 新建文件夹按钮 + 导入按钮），上面是文件夹卡片网格，下面是"未分类的数据集"列表
- **FR-4**: 文件夹视图：进入文件夹后，面包屑显示"首页 / 文件夹名"，内容显示该文件夹下数据集卡片
- **FR-5**: 重命名（卡片上编辑图标，输入框，空值不允许）
- **FR-6**: 删除文件夹：仅当文件夹内数据集数量为 0 时才可删除，否则提示
- **FR-7**: ImportModal 预览页添加"放入文件夹"下拉（选项："未分类" + 所有已创建文件夹）
- **FR-8**: HomePage 直接拖拽导入（handleFileImport）时，文件夹 ID 取当前视图：根目录→未分类，进入文件夹→该文件夹
- **FR-9**: 数据集卡片悬停显示"移动到文件夹"小按钮菜单，可移至未分类或其他文件夹

## Non-Functional Requirements
- **NFR-1**: DB 升级 version 2 → 3；旧用户数据升级无损
- **NFR-2**: 所有组件风格与首页现有卡片/按钮一致（Tailwind，青蓝/白色），只改 UI 不改功能形状
- **NFR-3**: 主题切换不影响新功能（深色模式 + 白天模式通过现有覆盖规则自然生效）
- **NFR-4**: 所有状态持久化到 IndexedDB，刷新不丢失

## Constraints
- **Technical**: IndexedDB (idb) v2 升级 to v3；React + TypeScript；不引入新依赖
- **Dependencies**: 现有 `uuid` 和 `idb` 可复用

## Assumptions
- 文件夹仅单层（不递归嵌套）
- ImportModal 在 HomePage 打开，HomePage 可传入 folders 列表和当前 folderId
- 删除确认/空文件夹判断用原生 confirm 即可（或简单 UI）

## Acceptance Criteria

### AC-1: 文件夹 CRUD 数据层
- **Given**: 旧用户数据库 version 2
- **When**: 刷新页面触发 DB 升级到 version 3
- **Then**: 新增 folders store，datasets 仍完整可用（folderId 默认为 undefined）
- **Verification**: `programmatic`

### AC-2: 新建文件夹
- **Given**: 在首页根目录
- **When**: 点击"新建文件夹"按钮，输入名称"国家统计局数据"并确认
- **Then**: 顶部出现新文件夹卡片，显示名称 + 0 个数据集
- **Verification**: `human-judgment`

### AC-3: 重命名文件夹
- **Given**: 已创建文件夹
- **When**: 点击编辑图标，输入新名称并确认
- **Then**: 卡片名称立即更新，刷新后仍为新名
- **Verification**: `human-judgment`

### AC-4: 删除文件夹
- **Given**: 空文件夹
- **When**: 点击删除图标
- **Then**: 文件夹消失
- **Given**: 有数据集的文件夹
- **When**: 点击删除图标
- **Then**: 拒绝删除并提示"文件夹不为空"
- **Verification**: `human-judgment`

### AC-5: 进入文件夹 + 面包屑
- **Given**: 点击文件夹卡片
- **When**: 进入子视图
- **Then**: 面包屑显示"首页 / 文件夹名称"，只显示该文件夹的数据集，点击"首页"返回根目录
- **Verification**: `human-judgment`

### AC-6: 导入选择文件夹
- **Given**: 根目录点击"导入数据"打开 ImportModal
- **When**: 在预览页选文件夹为"国家统计局数据"并导入
- **Then**: 新数据集自动出现在"国家统计局数据"文件夹下
- **Verification**: `human-judgment`

### AC-7: 首页拖拽导入（进入文件夹内）
- **Given**: 已进入"国家统计局数据"文件夹
- **When**: 拖拽文件导入
- **Then**: 新数据集 folderId 指向该文件夹
- **Verification**: `human-judgment`

### AC-8: 数据集移动到文件夹
- **Given**: 根目录下有一个未分类数据集 + 有文件夹
- **When**: 点击卡片上的"移动到文件夹"选择目标文件夹
- **Then**: 数据集立即从"未分类"消失并出现在目标文件夹
- **Verification**: `human-judgment`

### AC-9: 未分类区域
- **Given**: 根目录
- **When**: 有 folderId 为空的数据集
- **Then**: 显示在"未分类的数据集"列表
- **Verification**: `human-judgment`

## Open Questions
- [x] 文件夹嵌套？暂不支持（单层）
- [x] 拖拽数据集到文件夹？改为卡片上移动菜单避免 HTML5 拖拽复杂性
