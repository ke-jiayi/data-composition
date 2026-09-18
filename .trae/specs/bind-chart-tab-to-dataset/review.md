# 代码审查报告：可视化分析 Tab 按数据集绑定图表与代码

## Review History

| 轮次 | 日期 | 审查员 | 范围 | 结论 |
| --- | --- | --- | --- | --- |
| R1 | 2026-09-18 | 独立代码审查员（只读） | spec/tasks/checklist、src/pages/ProjectDetailPage.tsx、public/images、全仓 grep、git diff、npx tsc --noEmit | **pass** |

审查方式：全程只读，未修改任何源代码，未执行任何写数据操作。

## Checkpoints

| ID | 检查点 | 结果 | 证据 |
| --- | --- | --- | --- |
| CP-1 | CHART_MAP 两条映射与 spec FR-1 完全一致（key/image/code/title） | pass | [ProjectDetailPage.tsx L82-93](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L82-L93)：`城市1` → image `/images/城市价格指数趋势图.png`（L84）、code `PYTHON_CODE`（L85）、title `城市居民消费价格指数趋势图`（L86）；`城市2` → image `/images/城市2_柱状图.png`（L89）、code `CITY2_CODE`（L90）、title `2025年12月城市居民消费价格指数（分指标）`（L91）。与 FR-1 逐字一致。ChartMeta 接口 L75-79 字段齐全。 |
| CP-2 | resolveChartMeta：trim 精确 + 包含兜底；空 name 返回 null；顺序陷阱评估 | pass | [L96-102](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L96-L102)：`!name`（undefined/空串）→ null（L97）；`name.trim()` 后精确索引（L98-99）；未命中按 CHART_MAP 插入序 `includes` 兜底（L100-101）；纯空白串经 trim 得 `''`，精确与 includes 均不命中 → null。**顺序陷阱（不阻塞，spec 已接受该策略）**：名称如"城市10"精确不命中后，`'城市10'.includes('城市1')` 为 true，会误绑到城市1；"城市20"则绑城市2。当前真实数据集为城市1/城市2/农村1，均不受影响。 |
| CP-3 | chart Tab 命中分支：仅一张 img（src/alt/指定类名/居中/数据来源）+ 一个可折叠代码块；标题严格文案、无 emoji、默认收起、展开为 chartMeta.code | pass | [L519-549](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L519-L549)：命中分支全树仅 1 个 `<img>`（L524-528），`src={chartMeta.image}`、`alt={chartMeta.title}`、className 逐字为 `w-full max-h-[500px] object-contain rounded`（L527）；外层 `flex justify-center` 居中（L523），h3 `text-center`（L522）；数据来源说明 L530。可折叠块仅此一个（L534-548）：标题 `<span>数据清洗与可视化代码</span>`（L540）无 emoji，▼/▶ 在独立 span（L541）；初始 `useState(false)`（L125）默认收起，`showChartCode` 为 true 才渲染 `<pre><code>{chartMeta.code}</code></pre>`（L543-546）。 |
| CP-4 | 未命中分支文案逐字正确，且无 img、无代码块 | pass | [L550-553](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L550-L553)：三元 else 分支仅一个深色卡片 div + `<p>`，文案逐字为"暂无可视化图表，请先上传并分析数据"（L552）；分支内无 img、无 button/pre；居中样式 `flex flex-col items-center justify-center text-center`、灰字 `text-[#9CA3AF]`，符合 FR-5。 |
| CP-5 | id 变化时 showChartCode 重置 effect 正确、依赖正确、无无限渲染 | pass | [L159-161](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L159-L161)：`useEffect(() => { setShowChartCode(false); }, [id])`，依赖数组 `[id]` 正确（数据集由路由 id 标识）。挂载时也会执行一次但与初始值 false 相同，React 对同值 setState 跳过重渲染；effect 不依赖任何会循环变化的值，无无限渲染风险。 |
| CP-6 | 越界检查：其他 Tab、handleDelete、saveCode 未误改；PYTHON_CODE 保留且内容未变 | pass | git diff 仅含四个 hunk：常量区新增（CITY2_CODE/ChartMeta/CHART_MAP/resolveChartMeta）、L125 状态行、L158-164 effect+chartMeta、L517-555 chart Tab JSX。table（L384-388）、clean（含代码编辑卡片与 handleSaveCode 保存按钮，L391-422）、conclusion（L425-510，handleDeleteConclusion L206-212）、smart（L513-515）均未出现在 diff 中。独立 `handleDelete` 位于未改动的 [HomePage.tsx L111](file:///d:/my_project/data-composition/src/pages/HomePage.tsx#L111)（git status 仅 ProjectDetailPage.tsx 一个 src 文件为 M）。handleSaveCode L179-190 逻辑未变。PYTHON_CODE L14-40 在 diff 中无任何 +/- 行，内容保留（仍读 `城市1.xlsx`，clean 代码 Tab 与 L120/L146 默认值继续复用）。注：clean Tab 卡片标题 L402 仍带"📊"emoji，属既有其他 Tab，按 Non-Goals 不应改动，保持正确。另：相对 HEAD，CITY2_CODE 在本次工作树 diff 中整体为新增（上一任务未提交），但工作树净状态与 spec"复用 CITY2_CODE"一致，内容与 L48/72 引用自洽。 |
| CP-7 | 两个 png 均存在、无 .png.png 残留；src 内无旧双扩展名引用 | pass | 目录列表：`public/images/` 仅含 `城市2_柱状图.png`、`城市价格指数趋势图.png`，无 `.png.png`。全 src grep `城市价格指数趋势图\.png\.png`：0 处。grep 图片名：src 内仅 L72（CITY2_CODE 字符串内 savefig 文件名，非页面引用）、L84/L89（CHART_MAP）。 |
| CP-8 | 全仓 grep `showCity2Code` 残留为 0 | pass | src/ 下 0 处。全仓仅 5 处命中且全部位于 `.trae/specs/` 文档（本 spec FR-6 L32、tasks L21、checklist L3 描述迁移本身；以及历史 spec add-chart2-image-collapsible-code/tasks.md L3/L5 的存档记录），属文档性引用而非代码残留。 |
| CP-9 | `npx tsc --noEmit` 退出码 | pass | 在仓库根执行 `npx tsc --noEmit`，输出 `TSC_EXIT=0`（无任何诊断输出），满足 NFR-1/AC-6。 |
| CP-10 | 城市1 替代证据（图片直连 naturalWidth=3120 + 共享代码路径）对 AC-1 是否充分 | pass | 充分。城市1 与城市2 走同一三元渲染分支（L519-549），分支内仅一个绑定 `chartMeta.*` 的 img/pre，两者差异完全来自 CHART_MAP 数据，而城市1 映射条目已经静态逐字核对（CP-1，L83-87：src 单扩展名、title、`code: PYTHON_CODE`）；"页面不存在城市2 图片元素"由结构保证——chart Tab 内无任何写死的城市2 元素（grep 证实 `城市2_柱状图.png` 页面引用仅 L89 一处映射）。图片直连 naturalWidth=3120>0 证明 FR-2 重命名后资源可达（AC-4），渲染分支本身已由城市2/农村1 实测覆盖。残余风险仅为城市1 详情页未做实时 DOM 断言，在共享分支+映射静态正确的前提下可忽略。 |

## Findings

1. **（低，版本管理）重命名后的图片未纳入 git 跟踪** — `public/images/`
   - 问题：`git status` 显示旧文件 `城市价格指数趋势图.png.png` 为已删除（D），而新文件 `城市价格指数趋势图.png` 与 `城市2_柱状图.png` 均为未跟踪（??）。本次"重命名"在 git 视角是"删除 + 未跟踪新文件"。若提交时仅用 `git commit -a`/`git add -u`，提交后仓库将不包含任何城市1 图片，fresh clone 或 CI 构建环境中 `/images/城市价格指数趋势图.png` 会 404（本地 dev 因直接读磁盘而无法暴露此问题）。
   - 建议：提交时显式纳入新资源，例如 `git add public/images/城市价格指数趋势图.png public/images/城市2_柱状图.png public/images/城市价格指数趋势图.png.png`（删除项一并暂存），使提交中呈现 rename 并保留两张图片。

（顺序匹配"城市10→城市1"的理论误匹配见 CP-2，spec Open Questions 已明确接受"精确 + 包含兜底"策略，按审查要求不阻塞，不单列 finding。）

## 最终结论

**pass**

- FR-1～FR-6、AC-1～AC-6 全部满足：映射逐字正确、解析逻辑与空状态正确、命中分支只渲染当前数据集单图+无 emoji 标题的可折叠代码块（默认收起、id 变化重置）、未命中文案逐字正确、资源重命名落地且无旧路径/旧状态残留、tsc 退出码 0、其他 Tab 与 PYTHON_CODE 未被误改。
- 城市1 替代证据对 AC-1 充分（共享渲染分支已实测 + 映射数据静态核对 + 图片直连成功）。
- 唯一 finding 为低优先级 git 跟踪卫生问题，不影响功能与验收，建议在提交前处理。
