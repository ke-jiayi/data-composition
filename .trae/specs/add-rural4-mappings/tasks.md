# Tasks

- [x] Task 1: 新增农村4 手工清洗代码
  - [x] SubTask 1.1: 在 `src/pages/ProjectDetailPage.tsx` 新增常量 `RURAL4_CODE`，逐字保留用户脚本（含 `# 1. 读取并清洗（由于是单月数据，结构比较简单）`、`df.columns = ['指标', '指数']`、`df['简称'] = df['指标'].str.extract(r'^(.*?)类')`、`# 2. 画横向条形图`、`ax.axvline(100, ...)`、`ax.set_xlim(95, 106)`、`# 在柱子末端显示数值`、`plt.savefig('农村4_手工图.png', ...)`、末尾 `print("农村4手工图已保存")`）
  - [x] SubTask 1.2: `CODE_MAP` 新增 `'农村4': RURAL4_CODE`

- [x] Task 2: 新增农村4 WorkBuddy 代码
  - [x] SubTask 2.1: 新增常量 `RURAL4_WORKBUDDY_CODE`，逐字保留用户脚本（含 `SRC, LONG, FIG`、`from matplotlib.ticker import MultipleLocator`、`up = int((ser > 100).sum())`、`ax.scatter(v, i, s=260, ...)`、`ax.text(100, len(ser) - 0.30, "100", ...)`、`f"圆点即当月指数，竖线为基准 100；紫为上涨、青为下跌（8 类中 {up} 类高于 100）"`、`fig.savefig(FIG, facecolor=BG, bbox_inches="tight")`）
  - [x] SubTask 2.2: `WORKBUDDY_CODE_MAP` 新增 `'农村4': RURAL4_WORKBUDDY_CODE`

- [x] Task 3: 新增农村4 分析结论
  - [x] SubTask 3.1: 新增常量 `RURAL4_CONCLUSIONS` 三条文案，保留「烟酒及用品类领涨：」等前缀、全角标点与句号
  - [x] SubTask 3.2: `CONCLUSIONS_MAP` 新增 `'农村4': RURAL4_CONCLUSIONS`

- [x] Task 4: 验证
  - [x] SubTask 4.1: 确认三个映射均含 `'农村4'`，城市1-5、农村1-3 条目未变，解析函数未改
  - [x] SubTask 4.2: 运行 `npx tsc -b --pretty false`，退出码 0
  - [x] SubTask 4.3: 确认未执行任何 git commit / push

# Task Dependencies
- Task 1、Task 2、Task 3 同处一个文件，按顺序执行
- Task 4 依赖 Task 1-3
