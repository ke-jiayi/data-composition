# Tasks

- [x] Task 1: 新增农村5 手工清洗代码
  - [x] SubTask 1.1: 在 `src/pages/ProjectDetailPage.tsx` 新增常量 `RURAL5_CODE`，逐字保留用户脚本（含 `df = pd.read_excel('农村5.xlsx', header=2)`、`df_long['月份_时间'] = pd.to_datetime(...)`、`df_long['简称'] = df_long['指标'].str.extract(r'^(.*?)类')`、`colors`/`markers` 列表、`ax.set_title('农村5农副产品消费价格指数趋势', ...)`、`plt.savefig('农村5_手工图.png', ...)`、末尾 `print("农村5手工图已保存")`）
  - [x] SubTask 1.2: `CODE_MAP` 新增 `'农村5': RURAL5_CODE`

- [x] Task 2: 新增农村5 WorkBuddy 代码
  - [x] SubTask 2.1: 新增常量 `RURAL5_WORKBUDDY_CODE`，逐字保留用户脚本（含 `SRC, LONG, FIG`、`np.arange`、`Rectangle` 热力图绘制、`rel_lum` lambda、`Normalize(vmin=84.5, vmax=119)`、`cb.ax.axhline(100, ...)`、`fig.savefig(FIG, facecolor=BG, bbox_inches="tight")`）
  - [x] SubTask 2.2: 将 Python 中的 `\n` 在 TS 模板字符串里写成 `\\n`，确保页面显示为 `f"{m[:4]}\n{m[5:]}月"` 而非真实换行
  - [x] SubTask 2.3: `WORKBUDDY_CODE_MAP` 新增 `'农村5': RURAL5_WORKBUDDY_CODE`

- [x] Task 3: 新增农村5 分析结论
  - [x] SubTask 3.1: 新增常量 `RURAL5_CONCLUSIONS` 三条文案，保留「鲜菜类呈现过山车行情：」等前缀、全角标点与句号
  - [x] SubTask 3.2: `CONCLUSIONS_MAP` 新增 `'农村5': RURAL5_CONCLUSIONS`

- [x] Task 4: 验证
  - [x] SubTask 4.1: 确认三个映射均含 `'农村5'`，城市1-5、农村1-4 条目未变，解析函数未改
  - [x] SubTask 4.2: 确认 `\\n` 转义在源码中正确出现且页面脚本不会因换行断裂
  - [x] SubTask 4.3: 运行 `npx tsc -b --pretty false`，退出码 0
  - [x] SubTask 4.4: 确认未执行任何 git commit / push

# Task Dependencies
- Task 1、Task 2、Task 3 同处一个文件，按顺序执行
- Task 4 依赖 Task 1-3
