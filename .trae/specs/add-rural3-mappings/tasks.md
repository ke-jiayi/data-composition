# Tasks

- [x] Task 1: 新增农村3 手工清洗代码
  - [x] SubTask 1.1: 在 `src/pages/ProjectDetailPage.tsx` 新增常量 `RURAL3_CODE`，逐字保留用户脚本（含 `# 1. 读取并清洗`、`# 2. 修复时间排序`、`# 3. 改用关键词匹配（解决Excel文本有空格不匹配的问题）`、`# 4. 画面积折线图`、`get_simple_name`、`ax.fill_between(..., 100, ...)`、`农村3_手工图.png`、末尾 `print("农村3手工面积图已保存！")`）
  - [x] SubTask 1.2: `CODE_MAP` 新增 `'农村3': RURAL3_CODE`

- [x] Task 2: 新增农村3 WorkBuddy 代码
  - [x] SubTask 2.1: 新增常量 `RURAL3_WORKBUDDY_CODE`，逐字保留用户脚本（含 `SRC, LONG, FIG`、`LinearSegmentedColormap`、`long.to_excel(LONG, index=False)`、`ax.barh`、`f"{v:+.1f}".replace("-", "−")`、`fig.savefig(FIG, facecolor=BG, bbox_inches="tight")`）
  - [x] SubTask 2.2: `WORKBUDDY_CODE_MAP` 新增 `'农村3': RURAL3_WORKBUDDY_CODE`

- [x] Task 3: 新增农村3 分析结论
  - [x] SubTask 3.1: 新增常量 `RURAL3_CONCLUSIONS` 三条文案，保留「食品价格大幅回落：」等前缀、全角括号与句号
  - [x] SubTask 3.2: `CONCLUSIONS_MAP` 新增 `'农村3': RURAL3_CONCLUSIONS`

- [x] Task 4: 验证
  - [x] SubTask 4.1: 确认三个映射均含 `'农村3'`，城市1-5、农村1-2 条目未变，解析函数未改
  - [x] SubTask 4.2: 运行 `npx tsc -b --pretty false`，退出码 0
  - [x] SubTask 4.3: 确认未执行任何 git commit / push

# Task Dependencies
- Task 1、Task 2、Task 3 同处一个文件，按顺序执行
- Task 4 依赖 Task 1-3
