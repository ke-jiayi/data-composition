# 可视化分析 Tab 按数据集绑定图表与代码 Spec

## Why
项目详情页"可视化分析"Tab 当前无条件堆叠渲染城市1 折线图和城市2 柱状图两张图，无论打开哪个数据集都会看到全部内容。需要让图表和代码与当前数据集一一对应：城市1 只看城市1 的图和代码，城市2 只看城市2 的图和代码，没有图表的数据集（如农村1）显示空状态提示。

## Problem
- [ProjectDetailPage.tsx](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx) 的 chart Tab（约 L480-525）中，两个图片卡片和代码块写死在 JSX 里，与 `dataset.name` 无关。
- `public/images/` 下城市1 图片实际文件名为 `城市价格指数趋势图.png.png`（双扩展名，历史命名错误），代码中引用的也是错误双扩展名路径；用户要求的正确路径是 `/images/城市价格指数趋势图.png`。

## Users / Goals
- 打开"城市1"详情页 → chart Tab 只显示城市1 折线图 + 城市1 可折叠代码。
- 打开"城市2"详情页 → chart Tab 只显示城市2 柱状图 + 城市2 可折叠代码。
- 打开"农村1"或其他无图表数据集 → 显示"暂无可视化图表，请先上传并分析数据"。

## Non-Goals
- 不改"数据预览/清洗/结论/智能分析"等其他 Tab 的任何逻辑。
- 不改 IndexedDB schema（不新增 chartImage/chartCode/chartTitle 字段），采用页面内映射表方案。
- 不改 Header/封面/其他页面。

## Constraints / Assumptions
- 数据集 `name` 字段值即"城市1""城市2"等（导入时由用户命名）；映射匹配先按 trim 后精确匹配，未命中再按名称包含 key 做兜底匹配。
- 两个代码常量 `PYTHON_CODE`（城市1，L13）与 `CITY2_CODE`（城市2，L42）已存在，直接复用。PYTHON_CODE 仍作为其他 Tab（代码 Tab）的默认代码，不删除、不修改。

## Functional Requirements
- **FR-1**: 新增 `CHART_MAP` 常量（Record），key 为数据集名称，value 为 `{ image, code, title }`：
  - `城市1` → image `/images/城市价格指数趋势图.png`，code `PYTHON_CODE`，title `城市居民消费价格指数趋势图`
  - `城市2` → image `/images/城市2_柱状图.png`，code `CITY2_CODE`，title `2025年12月城市居民消费价格指数（分指标）`
- **FR-2**: 重命名资源文件 `public/images/城市价格指数趋势图.png.png` → `public/images/城市价格指数趋势图.png`（消除双扩展名，使引用路径与用户要求一致）。
- **FR-3**: chart Tab 根据当前 `dataset.name` 从 CHART_MAP 解析配置；命中则渲染**单个**卡片：标题 h3、图片（居中、w-full、max-h-[500px]、object-contain、rounded）、数据来源说明、下方可折叠代码块。
- **FR-4**: 可折叠代码块标题统一为"数据清洗与可视化代码"（不带 emoji，按用户要求），默认收起，点击展开/收起，展开显示该数据集对应的 code；切换数据集（id 变化）时重置为收起。
- **FR-5**: 未命中映射时渲染空状态："暂无可视化图表，请先上传并分析数据"，样式与 Tab 内深色卡片风格协调（居中、灰色文字）。
- **FR-6**: 删除现有写死的两张图并列 JSX 与 `showCity2Code` 状态，替换为通用的 `showChartCode` 状态。

## Non-Functional Requirements
- **NFR-1**: `npx tsc --noEmit` 退出码 0。
- **NFR-2**: 仅修改 `src/pages/ProjectDetailPage.tsx` 与重命名一个 public 资源文件，无其他文件改动。

## Acceptance Criteria

### AC-1: 城市1 只显示城市1 内容
- **Type**: `rule`
- **Given**: 当前数据集 name 为"城市1"
- **When**: 进入"可视化分析"Tab
- **Then**: 只渲染一张图，src 为 `/images/城市价格指数趋势图.png`，标题为城市1 趋势图标题；代码块展开后内容为 PYTHON_CODE；页面中不存在城市2 图片元素
- **Evidence**: 代码检查 + 浏览器 DOM 断言

### AC-2: 城市2 只显示城市2 内容
- **Type**: `rule`
- **Given**: 当前数据集 name 为"城市2"
- **When**: 进入"可视化分析"Tab
- **Then**: 只渲染一张图，src 为 `/images/城市2_柱状图.png`，标题为城市2 柱状图标题；代码块展开后内容为 CITY2_CODE；页面中不存在城市1 图片元素
- **Evidence**: 代码检查 + 浏览器 DOM 断言

### AC-3: 无匹配数据集显示空状态
- **Type**: `rule`
- **Given**: 当前数据集 name 不在 CHART_MAP 中（如"农村1"）
- **When**: 进入"可视化分析"Tab
- **Then**: 显示文案"暂无可视化图表，请先上传并分析数据"，且无 img、无可折叠代码块
- **Evidence**: 代码检查 + 浏览器 DOM 断言

### AC-4: 图片资源路径有效
- **Type**: `rule`
- **When**: 检查 public/images 目录与 img src
- **Then**: 文件 `城市价格指数趋势图.png` 存在（无双扩展名），`城市2_柱状图.png` 存在；两张图片在浏览器中加载成功（naturalWidth > 0）
- **Evidence**: 目录列表 + 浏览器网络/图片加载断言

### AC-5: 代码块交互
- **Type**: `rule`
- **When**: 点击"数据清洗与可视化代码"标题
- **Then**: 默认收起，点击后展开显示对应代码，再点击收起；切换数据集后恢复收起
- **Evidence**: 浏览器交互验证

### AC-6: 其他 Tab 与编译不受影响
- **Type**: `rule`
- **When**: tsc 编译并切换其他 Tab
- **Then**: tsc 退出码 0；其他 Tab（数据预览/清洗/结论/智能分析/代码）功能与渲染不发生变化
- **Evidence**: tsc 输出 + 代码 diff 复核

## Open Questions
- 无（匹配策略采用精确 + 包含兜底；空状态文案已由用户指定）。
