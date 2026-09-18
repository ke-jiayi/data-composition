# 代码审查报告：分析结论按数据集绑定（bind-conclusions-to-dataset）

- 审查日期：2026-09-18
- 审查方式：只读审查（read / grep / git diff / tsc；未运行浏览器、未写业务数据）
- 被审文件：[ProjectDetailPage.tsx](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx)
- 规格依据：[spec.md](file:///d:/my_project/data-composition/.trae/specs/bind-conclusions-to-dataset/spec.md)（FR-1~FR-4、NFR-1~NFR-2、AC-1~AC-4）

## Review History

| 轮次 | 日期 | 审查员 | 结论 | 说明 |
| --- | --- | --- | --- | --- |
| R1 | 2026-09-18 | 独立代码审查员 | **pass** | 8 项检查点全部 pass；无 actionable finding；tsc 退出码 0 |

## Checkpoints

| ID | 检查点 | 结果 | 证据 |
| --- | --- | --- | --- |
| 1 | CITY2_CONCLUSIONS 三条与用户文本逐字一致（106.7/117.8/11.1、97.4、100.4/97.6/101.0、全角引号“V型”、句末句号） | **pass** | [ProjectDetailPage.tsx L111-115](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L111-L115)。对 L112/L113/L114 字符串字面量与用户文本做 PowerShell 序号化逐字比对（`-ceq`）：三行均 `MATCH=True`；L114 含 U+201C/U+201D（全角“”）= True，ASCII 引号 (U+0022) 数量 = 0；三条均以全角句号“。”结尾。 |
| 2 | CONCLUSIONS_MAP key 为"城市2"；resolveConclusions：空 name→DEFAULT；trim 精确→includes 兜底→DEFAULT | **pass** | key：[L118-120](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L118-L120)（`'城市2': CITY2_CONCLUSIONS`，全文件唯一 key）。resolver：[L123-129](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L123-L129) — L124 `if (!name) return DEFAULT_CONCLUSIONS`（undefined 与空串均覆盖）；L125 `name.trim()`；L126 精确命中；L127 `Object.entries(...).find(([key]) => trimmed.includes(key))` 包含兜底；L128 未命中返回 DEFAULT_CONCLUSIONS。匹配策略与 [resolveChartMeta L96-102](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L96-L102) 一致，符合 FR-2。 |
| 3 | L168 回退链顺序：datasetData.conclusions 非空优先，否则 resolveConclusions(datasetData.name) | **pass** | [L168](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L168)：`setConclusions(datasetData.conclusions && datasetData.conclusions.length > 0 ? datasetData.conclusions : resolveConclusions(datasetData.name))`，顺序与 FR-3 完全一致（已保存非空 → 映射解析）。 |
| 4 | DEFAULT_CONCLUSIONS 内容未被修改（与原三条逐字比对） | **pass** | [L104-108](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L104-L108)。`git diff HEAD -- src/pages/ProjectDetailPage.tsx` 中该常量三行均为 diff 上下文行（无 `+`/`-` 标记），与 HEAD 版本逐字相同：食品烟酒（占 CPI 权重 30%）/衣着（1-5月累计 1.8%）/居住三条原文未动。 |
| 5 | 越界：本轮仅改 ProjectDetailPage.tsx；结论 Tab JSX、三个结论 handler、其他 Tab 及上一轮 CHART_MAP/resolveChartMeta 未被本轮修改 | **pass** | 本轮改动在累计 diff 中可精确分离为两处：新增 [L110-129](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L110-L129)（CITY2_CONCLUSIONS/CONCLUSIONS_MAP/resolveConclusions）与 [L168](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L168) 回退链一行。结论 handler [handleSaveConclusion L213-225](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L213-L225)、[handleDeleteConclusion L227-233](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L227-L233)、[handleAddConclusion L235-238](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L235-L238) 及结论 Tab JSX [L457-542](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L457-L542) 均未出现在 diff 中。CHART_MAP/resolveChartMeta/CITY2_CODE、clean Tab 折叠代码块、chart Tab 三元渲染等 diff hunk 经 [bind-chart-tab-to-dataset/tasks.md](file:///d:/my_project/data-composition/.trae/specs/bind-chart-tab-to-dataset/tasks.md) 与 move-code-block-to-clean-tab 规格证实属于前序轮次，非本轮改动。 |
| 6 | useState 初值仍为 DEFAULT_CONCLUSIONS（FR-4） | **pass** | [L143](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L143)：`const [conclusions, setConclusions] = useState<string[]>(DEFAULT_CONCLUSIONS);`；该行在 diff 中为上下文行，未改。 |
| 7 | `npx tsc --noEmit`（仓库根）退出码 | **pass** | 在 `d:\my_project\data-composition` 执行 `npx tsc --noEmit`，无任何诊断输出，`TSC_EXIT=0`（NFR-1 满足）。 |
| 8 | 浏览器证据对 AC-1/AC-2/AC-3 的充分性评估；AC-3 仅有静态证据是否可接受 | **pass（评估结论：充分/可接受） | 见下方“验收证据评估”。 |

## 验收证据评估（对应检查点 8）

- **AC-1（城市2 专属 3 条）——充分。** 静态链完整：城市2 无已保存结论时，[L168](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L168) 调用 `resolveConclusions('城市2')`，[L126](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L126) 精确命中 CITY2_CONCLUSIONS；结论 Tab [L465](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L465) 直接 `conclusions.map` 全量渲染，恰好 3 条。tasks.md TR-2.1 的浏览器 DOM 断言（含 117.8/106.7/11.1、97.4+交通通信、100.4/97.6/101.0+V型；不含“30%”/衣着类）为 PASS，与静态分析互证。
- **AC-2（城市1/无映射数据集不变）——充分。** 农村1 有 DOM 断言（TR-2.2 PASS：含食品烟酒 30%、衣着 1.8%、居住稳定；不含 117.8/97.4/100.4）。城市1 记录此前被测试删除、无当轮 DOM 证据，但其解析路径与农村1 同一分支：`'城市1'` 精确未命中、`'城市1'.includes('城市2')` 为假 → [L128](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L128) 返回 DEFAULT_CONCLUSIONS；且 DEFAULT_CONCLUSIONS 逐字未改（检查点 4），静态对称性可接受。
- **AC-3（已保存自定义结论优先）——静态证据可接受。** spec 对 AC-3 明示 Evidence 为“代码检查（回退链顺序）”，未要求浏览器断言。[L168](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L168) 三元表达式先判 `datasetData.conclusions && length > 0` 取已保存值、否则才走 resolver，顺序正确；保存入口 [handleSaveConclusion L217](file:///d:/my_project/data-composition/src/pages/ProjectDetailPage.tsx#L217) 仍写入 `updateDataset({...dataset, conclusions})`，闭环未变。静态证据满足该 AC 的既定证据标准。

## Findings

无。

## Advisory（观察建议，不阻塞 pass）

1. **累计工作区含前序轮次的资产改动**：`git diff`（tracked）除 ProjectDetailPage.tsx 外还包含 `public/images/城市价格指数趋势图.png.png` 的删除，另有两个 png 与四个 spec 目录为 untracked。经比对 [bind-chart-tab-to-dataset/tasks.md](file:///d:/my_project/data-composition/.trae/specs/bind-chart-tab-to-dataset/tasks.md) Task 1（图片双扩展名改名）等记录，这些均属前序轮次产物，非本轮引入，不构成越界。建议后续每轮完成后及时提交 commit，使单轮 diff 范围可机械验证，减少归因成本。
2. **AC-3 缺少运行时验证**：静态回退链虽正确且符合 spec 规定的证据类型，但“保存后刷新仍显示自定义结论”未做浏览器复测。若后续轮次触碰加载逻辑，建议补一条 IndexedDB 预置非空 conclusions 的 DOM 断言。
3. **既有行为提示（非本轮回归）**：当用户删光全部结论后，保存的是空数组，重载时因 `length > 0` 判断会重新回落到映射默认值（城市2 又显示 3 条默认结论）。该行为在改造前即存在（旧代码同为 `length > 0 ? ... : DEFAULT_CONCLUSIONS`），本轮未改变，超出 Non-Goals 范围，仅记录备查。
4. **includes 兜底的语义外溢（符合设计）**：名称包含“城市2”的数据集（如“城市2备份”）也会命中城市2 结论。这是 FR-2 明确要求、与 resolveChartMeta 对齐的匹配策略，非缺陷；若未来映射增多导致 key 互为子串，需注意 `Object.entries` 首个命中的顺序敏感性。

## 最终结论

**pass**

FR-1~FR-4 全部正确落地：城市2 三条结论逐字一致（含全角“V型”与全部关键数字）、映射解析三级回退正确、已保存结论优先、DEFAULT_CONCLUSIONS 与 useState 初值未动、结论 Tab UI 与增删改存 handler 零改动、tsc 退出码 0、本轮源码仅触及 ProjectDetailPage.tsx 一个文件。浏览器证据对 AC-1/AC-2 充分，AC-3 的静态证据符合 spec 自认的证据标准。无 actionable finding。
