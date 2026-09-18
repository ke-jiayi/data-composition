# 代码审查报告：移动代码块至数据清洗 Tab 并按数据集映射

- 审查轮次：R1
- 审查日期：2026-09-18
- 审查方式：只读审查（read/grep/git diff/tsc，未修改源码、未运行浏览器、未写入业务数据）
- 被审文件：`src/pages/ProjectDetailPage.tsx`（唯一源码改动文件，当前 553 行）
- 依据文档：spec.md / tasks.md / checklist.md（同目录）
- tsc 结果：`npx tsc --noEmit` 退出码 **0**（仓库根执行）

## Checkpoints

| ID | 检查点 | 结果 | 证据 |
|----|--------|------|------|
| CP1 | chart Tab 命中分支只有图表卡片，无 button/pre/折叠；空状态文案逐字保留 | **pass** | `src/pages/ProjectDetailPage.tsx:529-547`：命中分支 L530-541 仅 `div>h3+div>img+p`（标题/图片/数据来源），无 button、无 `<pre>`、无折叠相关 JSX；空状态分支 L542-545，L544 文案逐字为"暂无可视化图表，请先上传并分析数据"。grep 全 src "数据清洗与可视化代码"仅 L409 一处（clean Tab），chart Tab 零引用。 |
| CP2 | clean Tab：DataCleaning 条件外常驻；代码卡片被 chartMeta 包裹；标题无 emoji 且逐字；▶/▼ 绑定；textarea 仅展开渲染且属性与改造前一致 | **pass** | DataCleaning 在 L393-399（`{id && ...}`），位于 chartMeta 条件之外，clean Tab 下始终渲染；代码卡片 L400 `{chartMeta && (` 包裹至 L431；标题 L409 `<span>数据清洗与可视化代码</span>`，逐字且无 emoji（git diff 旧版为"📊 数据清洗与可视化代码"，📊 已移除）；▶/▼ 指示 L408 `{showCleanCode ? '▼' : '▶'}`，折叠按钮 onClick L405 `setShowCleanCode(!showCleanCode)`；textarea 仅在 L419 `{showCleanCode && (...)}` 时渲染；textarea 属性 L422-426（value/onChange/spellCheck={false}/className/style 含 Fira code、tabSize:4）与改造前逐字一致（diff 对照旧 L128-134 完全相同）。 |
| CP3 | 保存按钮 onClick/disabled/三文案原样；位于折叠头内且点击不触发折叠 | **pass** | L411-417：onClick={handleSaveCode}（L412）、disabled={saveStatus === 'saving'}（L413）、三态文案 L416 '保存中...' / '✓ 已保存' / '保存修改'，与改造前逐字一致。DOM 结构：L402 头部 div（flex justify-between）下是**两个并列 button**——折叠按钮 L403-410 与保存按钮 L411-417，保存按钮不是折叠按钮的子节点；点击事件只冒泡到头部 div，而该 div 无 onClick 处理器，故不会误触发折叠。收起/展开状态下按钮均常驻头部可点击（满足 FR-2）。 |
| CP4 | code 初值 ''；L146 回退链正确；reset effect 依赖 [id] 无循环；showChartCode 无残留 | **pass** | L120 `useState('')`（diff 证实旧为 `useState(PYTHON_CODE)`）；L146 `setCode(datasetData.code \|\| resolveChartMeta(datasetData.name)?.code \|\| '')`，自定义代码优先、映射其次、空串兜底，与 FR-3 一致；reset effect L159-161 依赖数组 `[id]`，函数体仅 `setShowCleanCode(false)`，不读取任何状态、无循环触发风险；chartMeta 解析 L164。grep 全 src `showChartCode` **0 匹配**；`showCleanCode` 共 5 处：L125（声明）、L160（reset）、L405/408（折叠头）、L419（body 条件）。 |
| CP5 | 边界：dataset 未加载不崩、无 chartMeta 不渲染卡片；已保存自定义代码在无映射数据集上的可见性评估 | **pass** | dataset=null 时 L236 `if (error \|\| !dataset)` 提前返回错误页，到不了 Tab 渲染；即便到达，L164 `resolveChartMeta(dataset?.name)` 对 undefined 返回 null（L97 `if (!name) return null`），L400 条件为假，clean Tab 仅渲染 DataCleaning，不崩。无映射数据集（如农村1）即使 `datasetData.code` 有值，代码卡片也完全不渲染、已保存代码不可见——但数据仍保留在 IndexedDB 中，handleSaveCode 不删除它；spec FR-4 明确"仅当 chartMeta 存在时渲染"，实现符合规格（另见 Advisory A1）。 |
| CP6 | 越界：仅一个源码文件；常量未改；其他 Tab JSX 未变 | **pass** | `git status`：M 仅 `src/pages/ProjectDetailPage.tsx` 一个源码文件；另有 `public/images/城市价格指数趋势图.png.png` 删除（D）、两张未跟踪图片及 .trae/specs 目录，均为非源码资产/文档，且 .png.png 删除对应上一轮图表重命名（旧 chart JSX 引用该文件，见 diff 旧 L182），非本轮引入（见 Advisory A3）。PYTHON_CODE L14-40 在 diff 中仅为上下文行，未被修改；CITY2_CODE L42-73、ChartMeta L75-79、CHART_MAP L82-93、resolveChartMeta L96-102 当前内容与上一轮产物描述一致（城市1→/images/城市价格指数趋势图.png+PYTHON_CODE；城市2→/images/城市2_柱状图.png+CITY2_CODE；image/code/title 三字段齐全）。其他 Tab：table L384-388、conclusion L436-521、smart L524-526 在 diff 中无任何改动行（diff 仅 clean、chart 两个 hunk）；handleSaveCode L179-190 与 DataCleaning 调用 L393-399 均未改。说明：前两轮改动未提交，对 HEAD 的 diff 无法按轮次切分，本轮"未改常量/其他 Tab"的结论依据为当前文件内容与 diff hunk 边界的静态比对。 |
| CP7 | `npx tsc --noEmit` 退出码 0 | **pass** | 仓库根执行 `npx tsc --noEmit`，输出 `TSC_EXIT=0`，无任何诊断输出，满足 NFR-1。 |
| CP8 | 浏览器证据充分性评估 | **pass** | tasks.md Task 2 记录四场景实测 PASS：TR-2.1 城市2 clean 默认 textarea=0、标题"▶数据清洗与可视化代码"无 emoji、保存按钮在、展开后 textarea=1 且含城市2.xlsx/不含城市1.xlsx、▼ 指示、再收起回 ▶；TR-2.2 城市2 chart 无代码按钮、pre=0、img=1 src=/images/城市2_柱状图.png；TR-2.3 农村1 clean 代码标题=null、保存按钮=false、textarea=0；TR-2.4 折叠切换；TR-2.5 视觉 5/5；无 console error；农村1 chart 空状态文案仍在。覆盖 AC-1/2/4/5 与 AC-3 的映射+可编辑部分。唯一缺口：保存写库（AC-3 后半：点击"保存修改"→"✓ 已保存"→刷新后自定义代码优先）未做浏览器实测，原因是避免污染 IndexedDB；handleSaveCode（L179-190）本轮零改动、仍走 `updateDataset({ ...dataset, code })`，静态可确认，风险可接受（见 Advisory A4）。 |

## Findings

无（本次审查未发现阻塞性问题，8 项检查点全部 pass）。

## Advisory（观察类建议，不阻塞）

- **A1（CP5）无映射数据集的已保存代码不可见但仍留存**：按 FR-4，无 chartMeta 时整个卡片不渲染，若某数据集曾保存过自定义 code 后名称又不再命中映射（或历史数据），用户将无法在 UI 查看/再次编辑该代码，数据本身不丢失。当前符合 spec 明文要求；若产品上希望"有自定义代码即展示卡片"，未来可将 L400 条件放宽为 `chartMeta \|\| dataset.code` 之类，需产品确认，本轮不要求。
- **A2（CP3）保存按钮未显式声明 `type="button"`**：折叠按钮 L404 有 `type="button"`，保存按钮 L411-417 没有。当前 JSX 树中无 `<form>` 祖先，按钮默认 type=submit 不会产生任何提交行为，无实际影响；建议后续顺手补齐以保持一致、防范未来被包进表单。
- **A3（CP6）工作区存在非本轮的资产/文档变更**：`城市价格指数趋势图.png.png`（重名后缀）删除、两张新图片未跟踪、三个 spec 目录未跟踪。均非源码且非本轮产生，但提交时需注意甄别，建议整理提交时只纳入预期文件或与前两轮改动统一规划。
- **A4（CP8）保存写库路径缺端到端实测**：handleSaveCode 未改动且静态正确，可接受；建议后续在测试用 IndexedDB（或测试数据集）上补一次"编辑→保存→✓ 已保存→刷新→自定义代码优先显示"的完整闭环验证。

## 最终结论

**pass**

FR-1 ~ FR-6 全部落实，NFR-1（tsc=0）与 NFR-2（仅一个源码文件）满足；AC-1/2/4/5 有浏览器实测证据，AC-3 的保存闭环有静态证据支撑（函数零改动），AC-6 经 tsc 与 diff 复核确认。无 actionable 问题，上述 4 条 Advisory 均不阻塞合入。

## Review History

| 轮次 | 日期 | 结论 | 说明 |
|------|------|------|------|
| R1 | 2026-09-18 | pass | 首次独立只读审查；8 检查点全 pass，0 actionable，4 条 Advisory；tsc 退出码 0。 |
