- [x] CITY2_CONCLUSIONS 常量 3 条，与用户提供文本逐字一致（含 106.7/117.8/11.1、97.4、100.4/97.6/101.0、“V型”）
- [x] CONCLUSIONS_MAP 含城市2 映射；resolveConclusions 精确→包含→DEFAULT_CONCLUSIONS 兜底
- [x] 加载回退链：已保存 conclusions 优先，否则 resolveConclusions(datasetData.name)
- [x] 城市2 分析结论 Tab 恰好 3 条专属结论，无城市1 原结论
- [x] 城市1/农村1 仍显示 DEFAULT_CONCLUSIONS 原 3 条
- [x] 结论的编辑/保存/添加/删除功能与 Tab UI 未改动
- [x] 仅修改 ProjectDetailPage.tsx；npx tsc --noEmit 退出码 0
- [x] 浏览器实测城市2（3 条专属）与农村1（原 3 条）

> 独立 Review R1：pass（8/8 检查点，逐字比对 MATCH，0 actionable），详见 review.md。
