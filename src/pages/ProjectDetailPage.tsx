import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { TabNavigation, type TabType } from '../components/TabNavigation';
import DataTable from '../components/DataTable';
import { useDB } from '../hooks/useDB';

import type { Dataset, DataRow } from '../utils/db';

// TabType 已从 TabNavigation 导入

const PYTHON_CODE = `import pandas as pd
import matplotlib.pyplot as plt

plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei']
plt.rcParams['axes.unicode_minus'] = False

# 读取数据
df = pd.read_excel('城市1.xlsx', header=1)

# 转换数据：把月份从列变成行
df_plot = df.set_index(df.columns[0]).dropna(how='all')
df_plot_T = df_plot.T

# 绘制折线图
plt.figure(figsize=(12, 6))
for col in df_plot_T.columns[:5]:
    plt.plot(df_plot_T.index, df_plot_T[col], marker='o', label=col)

plt.title('城市居民消费价格指数趋势', fontsize=14)
plt.xlabel('月份')
plt.ylabel('指数')
plt.legend(loc='best')
plt.grid(True, alpha=0.3)

# 保存图片
plt.savefig('折线图.png', dpi=300, bbox_inches='tight')
plt.show()`;

const CITY2_CODE = `import pandas as pd
import matplotlib.pyplot as plt

plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei']
plt.rcParams['axes.unicode_minus'] = False

df = pd.read_excel('城市2.xlsx', header=2)
df = df.dropna(how='all', axis=0).dropna(how='all', axis=1)
df = df.set_index(df.columns[0])
df_long = df.stack().reset_index()
df_long.columns = ['指标', '月份', '指数']
df_long = df_long[df_long['指标'] != '数据来源：国家统计局']
df_long.to_excel('城市2_长格式.xlsx', index=False)

df_dec = df_long[df_long['月份'] == '2025年12月'].copy()
df_dec = df_dec[~df_dec['指标'].str.contains('城市居民消费价格指数（上年同月=100）$', na=False)]
df_dec['指标简称'] = df_dec['指标'].str.replace('城市居民消费价格指数（上年同月=100）', '', regex=False)

plt.figure(figsize=(12, 6))
bars = plt.barh(df_dec['指标简称'], df_dec['指数'], color='#00B4D8')

for bar in bars:
    width = bar.get_width()
    plt.text(width + 0.1, bar.get_y() + bar.get_height()/2,
             f'{width:.1f}', va='center', fontsize=10)

plt.title('2025年12月城市居民消费价格指数（分指标）', fontsize=14)
plt.xlabel('指数（上年同月=100）')
plt.grid(axis='x', alpha=0.3)
plt.tight_layout()
plt.savefig('城市2_柱状图.png', dpi=150, bbox_inches='tight')
plt.show()`;

const CITY3_CODE = `import pandas as pd
import matplotlib.pyplot as plt

plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei']
plt.rcParams['axes.unicode_minus'] = False

df = pd.read_excel('城市3.xlsx', header=2)
df = df.dropna(how='all', axis=0).dropna(how='all', axis=1)
df = df.set_index(df.columns[0])

df_long = df.stack().reset_index()
df_long.columns = ['指标', '月份', '指数']
df_long = df_long[df_long['指标'] != '数据来源：国家统计局']

pivot_df = df_long.pivot(index='月份', columns='指标', values='指数')
pivot_df = pivot_df.iloc[:, :5]

plt.figure(figsize=(10, 5))
for col in pivot_df.columns:
    plt.plot(pivot_df.index, pivot_df[col], marker='o', label=col)

plt.title('城市3居民消费价格指数趋势', fontsize=14)
plt.xlabel('月份')
plt.ylabel('指数（上年同月=100）')
plt.legend(loc='best')
plt.grid(True, alpha=0.3)
plt.tight_layout()

plt.savefig('城市3_手工图.png', dpi=150)
plt.show()`;

const CITY4_CODE = `import pandas as pd
import matplotlib.pyplot as plt

plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei']
plt.rcParams['axes.unicode_minus'] = False

# 读取城市4
df = pd.read_excel('城市4.xlsx', header=2)
df = df.dropna(how='all', axis=0).dropna(how='all', axis=1)
df = df.set_index(df.columns[0])
df_long = df.stack().reset_index()
df_long.columns = ['指标', '月份', '指数']

# 筛选最新月份的数据进行对比
latest_month = df_long['月份'].max()
df_latest = df_long[df_long['月份'] == latest_month].copy()
df_latest = df_latest[df_latest['指标'] != '数据来源：国家统计局']

# 画横向柱状图
plt.figure(figsize=(10, 6))
plt.barh(df_latest['指标'], df_latest['指数'], color='#6BC5E8')
plt.title(f'城市4各分类消费价格指数对比（{latest_month}）', fontsize=14)
plt.xlabel('指数')
plt.tight_layout()

plt.savefig('城市4_手工图.png', dpi=150)
plt.show()`;

// 城市5 专属数据处理代码
const CITY5_CODE = `import pandas as pd
import matplotlib.pyplot as plt

plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei']
plt.rcParams['axes.unicode_minus'] = False

#读取城市5
df = pd.read_excel('城市5.xlsx', header=2)
df = df.dropna(how='all', axis=0).dropna(how='all', axis=1)
df = df.set_index(df.columns[0])

df_long = df.stack().reset_index()
df_long.columns = ['指标', '月份', '指数']
df_long = df_long[df_long['指标'] != '数据来源：国家统计局']

pivot_df = df_long.pivot(index='月份', columns='指标', values='指数')
pivot_df = pivot_df.iloc[:, :5]

plt.figure(figsize=(10, 5))
for col in pivot_df.columns:
    plt.plot(pivot_df.index, pivot_df[col], marker='o', label=col)

plt.title('城市5居民消费价格指数趋势', fontsize=14)
plt.xlabel('月份')
plt.ylabel('指数（上年同月=100）')
plt.legend(loc='best')
plt.grid(True, alpha=0.3)
plt.tight_layout()

#保存为城市5
plt.savefig('城市5_手工图.png', dpi=150)
plt.show()
print("城市5手工图已保存！")
`;

// 数据集默认 Python 代码：仅用于「数据清洗」Tab 的代码回退，与图片映射无关
const CODE_MAP: Record<string, string> = {
  '城市1': PYTHON_CODE,
  '城市2': CITY2_CODE,
  '城市3': CITY3_CODE,
  '城市4': CITY4_CODE,
  '城市5': CITY5_CODE,
};

// 按数据集名称解析默认代码：先精确匹配，未命中再按名称包含兜底
function resolveDefaultCode(name?: string): string {
  if (!name) return '';
  const trimmed = name.trim();
  if (CODE_MAP[trimmed]) return CODE_MAP[trimmed];
  const fallback = Object.entries(CODE_MAP).find(([key]) => trimmed.includes(key));
  return fallback ? fallback[1] : '';
}

// 按数据集名称绑定数据清洗步骤，作为「清洗记录」展示内容
const CLEANING_STEPS_MAP: Record<string, string[]> = {
  '城市1': [
    '读取原始宽表（表头在第 1 行）',
    '去除全空行列（dropna how=all）',
    '宽表转置为长表（df.T）',
    '选取前 5 个指标绘制趋势曲线',
  ],
  '城市2': [
    '读取原始宽表（表头在第 2 行）',
    '去除全空行列（dropna how=all）',
    '宽表转长表（stack + reset_index）',
    '过滤「数据来源：国家统计局」汇总行',
    '筛选 2025 年 12 月数据',
    '简化指标名称（去除指数后缀）',
  ],
};

const DEFAULT_CLEANING_STEPS = [
  '读取原始数据表',
  '去除空值记录',
  '宽表转长表',
  '统一字段命名',
];

// 根据数据集名称解析清洗步骤：先精确匹配，未命中再按名称包含兜底，仍无则返回通用步骤
function resolveCleaningSteps(name?: string): string[] {
  if (!name) return DEFAULT_CLEANING_STEPS;
  const trimmed = name.trim();
  if (CLEANING_STEPS_MAP[trimmed]) return CLEANING_STEPS_MAP[trimmed];
  const fallback = Object.entries(CLEANING_STEPS_MAP).find(([key]) => trimmed.includes(key));
  return fallback ? fallback[1] : DEFAULT_CLEANING_STEPS;
}

// WorkBuddy 生成的清洗与可视化脚本
const WORKBUDDY_CODE = `import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.ticker import MultipleLocator

SRC = "城市1.xlsx"
LONG = "城市1_长格式.xlsx"
FIG = "城市1_折线图.png"

raw = pd.read_excel(SRC, header=None)

df = raw.iloc[2:].copy()
df.columns = ["指标"] + list(raw.iloc[2, 1:])
df = df[df["指标"].notna()]
df = df[~df["指标"].astype(str).str.contains("数据来源|数据库|时间")]
df["指标"] = df["指标"].astype(str).str.strip()

long = df.melt(id_vars="指标", var_name="月份", value_name="指数")
long["指数"] = pd.to_numeric(long["指数"], errors="coerce")
long["月份"] = long["月份"].astype(str).str.replace("年", "-").str.replace("月", "")
long["月份"] = pd.to_datetime(long["月份"], format="%Y-%m").dt.to_period("M")
long = long.dropna(subset=["指数"]).sort_values(["月份", "指标"]).reset_index(drop=True)

long["分类"] = (
    long["指标"]
    .str.replace(r"类?城市居民消费价格指数.*", "", regex=True)
    .str.replace("类", "", regex=False)
    .str.strip()
    .replace({"": "城市总体"})
)
long = long[["月份", "分类", "指标", "指数"]]
long["月份"] = long["月份"].astype(str)
long.to_excel(LONG, index=False)

pivot = long.pivot(index="月份", columns="分类", values="指数")
pivot = pivot.drop(columns=["城市总体"], errors="ignore")
pivot = pivot[sorted(pivot.columns, key=lambda c: pivot[c].iloc[-1] - pivot[c].iloc[0], reverse=True)]

BG, ICE, PURPLE, TEXT, GRID = "#0B1220", "#5EE7FF", "#A78BFA", "#E6EDF7", "#243147"
COLORS = ["#5EE7FF", "#7DD3FC", "#8B9DFF", "#A78BFA", "#C084FC",
          "#67E8F9", "#93C5FD", "#D8B4FE"]

plt.rcParams["font.sans-serif"] = ["Microsoft YaHei", "SimHei"]
plt.rcParams["axes.unicode_minus"] = False

fig, ax = plt.subplots(figsize=(11, 6), dpi=160, facecolor=BG)
ax.set_facecolor(BG)
fig.subplots_adjust(left=0.075, right=0.86, top=0.88, bottom=0.13)

x = range(len(pivot.index))
for i, col in enumerate(pivot.columns):
    ax.plot(x, pivot[col], color=COLORS[i % len(COLORS)], lw=2.2,
            marker="o", ms=5, mec=BG, mew=1.2,
            label=f"{col}  {pivot[col].iloc[-1]:.1f}", alpha=0.95, zorder=3)

ax.axhline(100, color="#64748B", lw=1, ls="--", alpha=0.75, zorder=1)

ax.set_xticks(list(x))
ax.set_xticklabels([d.replace("-", "年") + "月" for d in pivot.index], color=TEXT, fontsize=10)
ax.set_ylabel("指数（上年同月=100）", color=TEXT, fontsize=10.5, labelpad=8)
ax.yaxis.set_major_locator(MultipleLocator(2))
ax.tick_params(axis="y", colors=TEXT, labelsize=9.5)
ax.tick_params(axis="x", colors=TEXT, length=0, pad=6)

ax.grid(axis="y", color=GRID, lw=0.8, alpha=0.55)
ax.set_axisbelow(True)
for s in ("top", "right"):
    ax.spines[s].set_visible(False)
for s in ("left", "bottom"):
    ax.spines[s].set_color(GRID)

ax.set_title("2026年1-5月各分类消费价格指数趋势", color="#F8FAFC",
             fontsize=15, fontweight="bold", pad=18, loc="left")

leg = ax.legend(loc="center left", bbox_to_anchor=(1.015, 0.5), frameon=False,
                fontsize=9.5, labelcolor=TEXT, handlelength=1.8, labelspacing=0.9)
for t in leg.get_texts():
    t.set_color(TEXT)

ax.text(0, -0.155, "数据来源：国家统计局　|　虚线为荣枯线 100", transform=ax.transAxes,
        color="#7C8CA6", fontsize=8.5)

fig.savefig(FIG, facecolor=BG, bbox_inches="tight")
plt.close(fig)
`;

// WorkBuddy 生成的清洗与可视化脚本（城市2）
const CITY2_WORKBUDDY_CODE = `import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.ticker import MultipleLocator

SRC, LONG, FIG = "城市2.xlsx", "城市2_长格式.xlsx", "城市2_WorkBuddy图.png"

raw = pd.read_excel(SRC, header=None)

df = raw.iloc[2:].copy()
df.columns = ["指标"] + list(raw.iloc[2, 1:])
df = df[df["指标"].notna()]
df = df[~df["指标"].astype(str).str.contains("数据来源|数据库|时间")]
df["指标"] = df["指标"].astype(str).str.strip()

long = df.melt(id_vars="指标", var_name="月份", value_name="指数")
long["指数"] = pd.to_numeric(long["指数"], errors="coerce")
long["月份"] = long["月份"].astype(str).str.replace("年", "-").str.replace("月", "")
long["月份"] = pd.to_datetime(long["月份"], format="%Y-%m").dt.to_period("M")
long = long.dropna(subset=["指数"]).sort_values(["月份", "指标"]).reset_index(drop=True)

long["分类"] = (
    long["指标"]
    .str.replace(r"类?城市居民消费价格指数.*", "", regex=True)
    .str.replace("类", "", regex=False)
    .str.strip()
    .replace({"": "城市总体"})
)
long = long[["月份", "分类", "指标", "指数"]]
long["月份"] = long["月份"].astype(str)
long.to_excel(LONG, index=False)

pivot = long.pivot(index="月份", columns="分类", values="指数")
pivot = pivot.drop(columns=["城市总体"], errors="ignore")
pivot = pivot[sorted(pivot.columns, key=lambda c: pivot[c].iloc[-1] - pivot[c].iloc[0], reverse=True)]

BG, ICE, PURPLE, TEXT, GRID = "#0B1220", "#5EE7FF", "#A78BFA", "#E6EDF7", "#243147"
COLORS = ["#5EE7FF", "#67E8F9", "#7DD3FC", "#8B9DFF", "#93C5FD",
          "#A78BFA", "#C084FC", "#D8B4FE"]

plt.rcParams["font.sans-serif"] = ["Microsoft YaHei", "SimHei"]
plt.rcParams["axes.unicode_minus"] = False

fig, ax = plt.subplots(figsize=(11.5, 6.2), dpi=160, facecolor=BG)
ax.set_facecolor(BG)
fig.subplots_adjust(left=0.072, right=0.855, top=0.88, bottom=0.14)

x = range(len(pivot.index))
for i, col in enumerate(pivot.columns):
    ax.plot(x, pivot[col], color=COLORS[i % len(COLORS)], lw=2.2,
            marker="o", ms=4.8, mec=BG, mew=1.2,
            label=f"{col}  {pivot[col].iloc[-1]:.1f}", alpha=0.95, zorder=3)

ax.axhline(100, color="#64748B", lw=1, ls="--", alpha=0.75, zorder=1)
ax.set_xlim(-0.35, len(x) - 0.65)
ax.set_ylim(95, 119)

ax.set_xticks(list(x))
ax.set_xticklabels([f"{d[:4]}\\n{d[5:]}月" for d in pivot.index], color=TEXT, fontsize=9.5)
ax.set_ylabel("指数（上年同月=100）", color=TEXT, fontsize=10.5, labelpad=8)
ax.yaxis.set_major_locator(MultipleLocator(2))
ax.tick_params(axis="y", colors=TEXT, labelsize=9.5)
ax.tick_params(axis="x", colors=TEXT, length=0, pad=6)

ax.grid(axis="y", color=GRID, lw=0.8, alpha=0.55)
ax.set_axisbelow(True)
for s in ("top", "right"):
    ax.spines[s].set_visible(False)
for s in ("left", "bottom"):
    ax.spines[s].set_color(GRID)

ax.set_title("2025年4月-12月城市各分类消费价格指数趋势", color="#F8FAFC",
             fontsize=15, fontweight="bold", pad=18, loc="left")

top = pivot.columns[0]
ax.annotate(f"{top}  {pivot[top].iloc[-1]:.1f}", xy=(len(x) - 1, pivot[top].iloc[-1]),
            xytext=(-6, 8), textcoords="offset points", ha="right",
            color=COLORS[0], fontsize=9, fontweight="bold")

leg = ax.legend(loc="center left", bbox_to_anchor=(1.012, 0.5), frameon=False,
                fontsize=9.5, handlelength=1.8, labelspacing=0.85)
for t in leg.get_texts():
    t.set_color(TEXT)

ax.text(0, -0.165, "数据来源：国家统计局　|　虚线为荣枯线 100", transform=ax.transAxes,
        color="#7C8CA6", fontsize=8.5)

fig.savefig(FIG, facecolor=BG, bbox_inches="tight")
plt.close(fig)

print(long.groupby("分类")["指数"].agg(["min", "max", "first", "last"]).round(2))
`;

// WorkBuddy 生成的清洗与可视化脚本（城市3）
const CITY3_WORKBUDDY_CODE = `import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.ticker import MultipleLocator

SRC, LONG, FIG = "城市3.xlsx", "城市3_长格式.xlsx", "城市3_WorkBuddy图.png"

raw = pd.read_excel(SRC, header=None)

df = raw.iloc[2:].copy()
df.columns = ["指标"] + list(raw.iloc[2, 1:])
df = df[df["指标"].notna()]
df = df[~df["指标"].astype(str).str.contains("数据来源|数据库|时间")]
df["指标"] = df["指标"].astype(str).str.strip()

long = df.melt(id_vars="指标", var_name="月份", value_name="指数")
long["指数"] = pd.to_numeric(long["指数"], errors="coerce")
long["月份"] = long["月份"].astype(str).str.replace("年", "-").str.replace("月", "")
long["月份"] = pd.to_datetime(long["月份"], format="%Y-%m").dt.to_period("M")
long = long.dropna(subset=["指数"]).sort_values(["月份", "指标"]).reset_index(drop=True)

long["分类"] = (
    long["指标"]
    .str.replace(r"类?城市居民消费价格指数.*", "", regex=True)
    .str.replace("类", "", regex=False)
    .str.strip()
    .replace({"": "城市总体"})
)
long = long[["月份", "分类", "指标", "指数"]]
long["月份"] = long["月份"].astype(str)
long.to_excel(LONG, index=False)

pivot = long.pivot(index="月份", columns="分类", values="指数")
pivot = pivot.drop(columns=["城市总体"], errors="ignore")
pivot = pivot[sorted(pivot.columns, key=lambda c: pivot[c].iloc[-1] - pivot[c].iloc[0], reverse=True)]

BG, ICE, PURPLE, TEXT, GRID = "#0B1220", "#5EE7FF", "#A78BFA", "#E6EDF7", "#243147"
COLORS = ["#5EE7FF", "#67E8F9", "#7DD3FC", "#8B9DFF", "#93C5FD",
          "#A78BFA", "#C084FC", "#D8B4FE"]

plt.rcParams["font.sans-serif"] = ["Microsoft YaHei", "SimHei"]
plt.rcParams["axes.unicode_minus"] = False

fig, ax = plt.subplots(figsize=(11.5, 6.2), dpi=160, facecolor=BG)
ax.set_facecolor(BG)
fig.subplots_adjust(left=0.072, right=0.855, top=0.88, bottom=0.14)

x = range(len(pivot.index))
for i, col in enumerate(pivot.columns):
    ax.plot(x, pivot[col], color=COLORS[i % len(COLORS)], lw=2.2,
            marker="o", ms=4.8, mec=BG, mew=1.2,
            label=f"{col}  {pivot[col].iloc[-1]:.1f}", alpha=0.95, zorder=3)

ax.axhline(100, color="#64748B", lw=1, ls="--", alpha=0.75, zorder=1)
ax.set_xlim(-0.35, len(x) - 0.65)
ax.set_ylim(94, 111.5)

ax.set_xticks(list(x))
ax.set_xticklabels([f"{d[:4]}\\n{d[5:]}月" for d in pivot.index], color=TEXT, fontsize=9.5)
ax.set_ylabel("指数（上年同月=100）", color=TEXT, fontsize=10.5, labelpad=8)
ax.yaxis.set_major_locator(MultipleLocator(2))
ax.tick_params(axis="y", colors=TEXT, labelsize=9.5)
ax.tick_params(axis="x", colors=TEXT, length=0, pad=6)

ax.grid(axis="y", color=GRID, lw=0.8, alpha=0.55)
ax.set_axisbelow(True)
for s in ("top", "right"):
    ax.spines[s].set_visible(False)
for s in ("left", "bottom"):
    ax.spines[s].set_color(GRID)

ax.set_title("2020年4月-12月城市各分类消费价格指数趋势", color="#F8FAFC",
             fontsize=15, fontweight="bold", pad=18, loc="left")

hi = pivot.columns[-1]
ax.annotate(f"{hi}  {pivot[hi].iloc[0]:.1f}→{pivot[hi].iloc[-1]:.1f}",
            xy=(0, pivot[hi].iloc[0]), xytext=(8, 10), textcoords="offset points",
            color=COLORS[-1], fontsize=9, fontweight="bold")

leg = ax.legend(loc="center left", bbox_to_anchor=(1.012, 0.5), frameon=False,
                fontsize=9.5, handlelength=1.8, labelspacing=0.85)
for t in leg.get_texts():
    t.set_color(TEXT)

ax.text(0, -0.165, "数据来源：国家统计局　|　虚线为荣枯线 100", transform=ax.transAxes,
        color="#7C8CA6", fontsize=8.5)

fig.savefig(FIG, facecolor=BG, bbox_inches="tight")
plt.close(fig)

print(long.groupby("分类")["指数"].agg(["min", "max", "first", "last"]).round(2))
`;

// WorkBuddy 生成的清洗与可视化脚本（城市4）
const CITY4_WORKBUDDY_CODE = `import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap, TwoSlopeNorm
from matplotlib.ticker import MultipleLocator

SRC, LONG, FIG = "城市4.xlsx", "城市4_长格式.xlsx", "城市4_WorkBuddy图.png"

raw = pd.read_excel(SRC, header=None)
df = raw.iloc[2:].copy()
df.columns = ["指标", str(raw.iloc[2, 1])]
df = df[df["指标"].notna()]
df = df[~df["指标"].astype(str).str.contains("数据来源|数据库|时间|^注：")]
df["指标"] = df["指标"].astype(str).str.strip()

long = df.melt(id_vars="指标", var_name="月份", value_name="指数")
long["指数"] = pd.to_numeric(long["指数"], errors="coerce")
long["月份"] = long["月份"].astype(str).str.replace("年", "-").str.replace("月", "")
long["月份"] = pd.to_datetime(long["月份"], format="%Y-%m").dt.to_period("M")
long = long.dropna(subset=["指数"]).reset_index(drop=True)
long["分类"] = (long["指标"].str.replace(r"类?城市居民消费价格指数.*", "", regex=True)
              .str.strip().replace({"": "城市总体"}))
long = long[["月份", "分类", "指标", "指数"]]
long["月份"] = long["月份"].astype(str)
long.to_excel(LONG, index=False)

ser = long.set_index("分类")["指数"].drop("城市总体", errors="ignore").sort_values()
total = long.loc[long["分类"] == "城市总体", "指数"].iloc[0]

BG, TEXT, GRID = "#0B1220", "#E6EDF7", "#243147"
plt.rcParams["font.sans-serif"] = ["Microsoft YaHei", "SimHei"]
plt.rcParams["axes.unicode_minus"] = False

cmap = LinearSegmentedColormap.from_list(
    "tech",
    [(0.00, "#DDD6FE"), (0.16, "#C084FC"), (0.34, "#7C3AED"),
     (0.50, "#1E3A5F"), (0.62, "#0E7490"), (0.80, "#22B8E6"), (1.00, "#A5F3FC")],
    N=256,
)
norm = TwoSlopeNorm(vmin=min(98.4, ser.min()), vcenter=100, vmax=max(104.2, ser.max()))

fig, ax = plt.subplots(figsize=(11, 6.8), dpi=160, facecolor=BG)
ax.set_facecolor(BG)
fig.subplots_adjust(left=0.245, right=0.955, top=0.815, bottom=0.135)

ax.barh(ser.index, ser.values - 100, left=100, height=0.62,
        color=[cmap(norm(v)) for v in ser.values],
        edgecolor=BG, linewidth=0.9, zorder=3)

for y, v in enumerate(ser.values):
    ax.text(v + (0.09 if v >= 100 else -0.09), y, f"{v:.1f}",
            va="center", ha="left" if v >= 100 else "right",
            color=TEXT, fontsize=10.5, fontweight="bold", zorder=4)

ax.axvline(100, color="#6B7F99", lw=1.3, zorder=2)
ax.axvline(total, color="#94A3B8", lw=1.1, ls=(0, (4, 3)), alpha=0.85, zorder=2)
ax.text(total - 0.06, len(ser) - 0.42, f"城市总体 {total:.1f}",
        color="#A9B8CC", fontsize=9.5, ha="right", va="center")

ax.set_xlim(97.9, 104.5)
ax.xaxis.set_major_locator(MultipleLocator(1))
ax.set_ylim(-0.75, len(ser) - 0.15)
ax.set_xlabel("指数（上年同月=100）", color=TEXT, fontsize=10.5, labelpad=10)
ax.tick_params(axis="x", colors=TEXT, labelsize=9.5, length=0, pad=6)
ax.tick_params(axis="y", colors=TEXT, labelsize=10.5, length=0, pad=10)
ax.grid(axis="x", color=GRID, lw=0.8, alpha=0.45)
ax.set_axisbelow(True)
for s in ("top", "right", "left"):
    ax.spines[s].set_visible(False)
ax.spines["bottom"].set_color(GRID)

ax.set_title("2015年12月城市居民消费分类价格指数差异", color="#F8FAFC",
             fontsize=15.5, fontweight="bold", pad=44, loc="left")
ax.text(0, 1.048, "条形以荣枯线 100 为基线，向右为同比上涨，向左为下跌",
        transform=ax.transAxes, color="#7C8CA6", fontsize=9.5, va="bottom")

ax.text(0, -0.128, "数据来源：国家统计局", transform=ax.transAxes,
        color="#7C8CA6", fontsize=8.5)
fig.savefig(FIG, facecolor=BG, bbox_inches="tight")
plt.close(fig)
`;

// 城市5 专属 WorkBuddy 代码
const CITY5_WORKBUDDY_CODE = `import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap, Normalize
from matplotlib.ticker import MultipleLocator

SRC, LONG, FIG = "城市5.xlsx", "城市5_长格式.xlsx", "城市5_WorkBuddy图.png"

raw = pd.read_excel(SRC, header=None)
df = raw.iloc[2:].copy()
df.columns = ["指标"] + list(raw.iloc[2, 1:])
df = df[df["指标"].notna()]
df = df[~df["指标"].astype(str).str.contains("数据来源|数据库|时间|^注：")]
df["指标"] = df["指标"].astype(str).str.strip()

long = df.melt(id_vars="指标", var_name="月份", value_name="指数")
long["指数"] = pd.to_numeric(long["指数"], errors="coerce")
long["月份"] = long["月份"].astype(str).str.replace("年", "-").str.replace("月", "")
long["月份"] = pd.to_datetime(long["月份"], format="%Y-%m").dt.to_period("M")
long = long.dropna(subset=["指数"]).sort_values(["月份", "指标"]).reset_index(drop=True)
long["分类"] = (long["指标"].str.replace(r"类?城市居民消费价格指数.*", "", regex=True)
              .str.strip().replace({"": "总体"}))
long = long[["月份", "分类", "指标", "指数"]]
long["月份"] = long["月份"].astype(str)
long.to_excel(LONG, index=False)

g = long.groupby("分类")["指数"]
stat = pd.DataFrame({"low": g.min(), "high": g.max(), "last": g.last()})
stat["span"] = stat["high"] - stat["low"]
stat = stat.sort_values("last")

BG, TEXT, GRID = "#0B1220", "#E6EDF7", "#243147"
plt.rcParams["font.sans-serif"] = ["Microsoft YaHei", "SimHei"]
plt.rcParams["axes.unicode_minus"] = False

cmap = LinearSegmentedColormap.from_list(
    "tech", ["#5EE7FF", "#38BDF8", "#7D8CF5", "#A78BFA", "#C084FC"], N=256)
norm = Normalize(0, stat["span"].max())

fig, ax = plt.subplots(figsize=(11.4, 5.9), dpi=160, facecolor=BG)
ax.set_facecolor(BG)
fig.subplots_adjust(left=0.11, right=0.955, top=0.795, bottom=0.145)

y = list(range(len(stat)))
ax.barh(y, stat["span"], left=stat["low"], height=0.44,
        color=[cmap(norm(v)) for v in stat["span"]],
        edgecolor=BG, linewidth=1.0, zorder=3)
ax.scatter(stat["last"], y, s=82, color="#F8FAFC", edgecolor=BG,
           linewidth=1.5, zorder=6)

for i, (lo, hi, last) in enumerate(zip(stat["low"], stat["high"], stat["last"])):
    ax.text(lo - 0.7, i, f"{lo:.1f}–{hi:.1f}", va="center", ha="right",
            color="#7C8CA6", fontsize=9, zorder=6)
    ax.text(last, i + 0.30, f"{last:.1f}", va="bottom", ha="center",
            color="#F8FAFC", fontsize=10.5, fontweight="bold", zorder=6)

ax.axvline(100, color="#6B7F99", lw=1.2, zorder=2)
ax.text(100, len(stat) - 0.32, "100", color="#8CA0B8", fontsize=9,
        ha="center", va="center")

ax.set_xlim(77.8, 121.5)
ax.set_ylim(-0.72, len(stat) - 0.28)
ax.set_yticks(y)
ax.set_yticklabels(stat.index)
ax.xaxis.set_major_locator(MultipleLocator(5))
ax.set_xlabel("指数（上年同月=100）", color=TEXT, fontsize=10.5, labelpad=10)
ax.tick_params(axis="x", colors=TEXT, labelsize=9.5, length=0, pad=6)
ax.tick_params(axis="y", colors=TEXT, labelsize=11.5, length=0, pad=10)
ax.grid(axis="x", color=GRID, lw=0.8, alpha=0.42)
ax.set_axisbelow(True)
for s in ("top", "right", "left"):
    ax.spines[s].set_visible(False)
ax.spines["bottom"].set_color(GRID)

ax.set_title("2025年5月-2026年5月城市食品类消费价格指数区间", color="#F8FAFC",
             fontsize=15.5, fontweight="bold", pad=44, loc="left")
ax.text(0, 1.048,
        "条形为 13 个月的最高与最低指数区间，圆点为 2026 年 5 月值；颜色越紫波动越剧烈",
        transform=ax.transAxes, color="#7C8CA6", fontsize=9.5, va="bottom")

ax.text(0, -0.135, "数据来源：国家统计局", transform=ax.transAxes,
        color="#7C8CA6", fontsize=8.5)
fig.savefig(FIG, facecolor=BG, bbox_inches="tight")
plt.close(fig)
`;

// 按数据集名称绑定 WorkBuddy 生成的处理与可视化代码
const WORKBUDDY_CODE_MAP: Record<string, string> = {
  '城市1': WORKBUDDY_CODE,
  '城市2': CITY2_WORKBUDDY_CODE,
  '城市3': CITY3_WORKBUDDY_CODE,
  '城市4': CITY4_WORKBUDDY_CODE,
  '城市5': CITY5_WORKBUDDY_CODE,
};

// 按数据集名称解析 WorkBuddy 代码：先精确匹配，未命中再按名称包含兜底
function resolveWorkbuddyCode(name?: string): string {
  if (!name) return '';
  const trimmed = name.trim();
  if (WORKBUDDY_CODE_MAP[trimmed]) return WORKBUDDY_CODE_MAP[trimmed];
  const fallback = Object.entries(WORKBUDDY_CODE_MAP).find(([key]) => trimmed.includes(key));
  return fallback ? fallback[1] : '';
}

const DEFAULT_CONCLUSIONS = [
  '食品烟酒类价格波动最大，是影响总指数的主要因素，占 CPI 权重的 30% 以上，价格变动对整体指数影响显著',
  '衣着类价格呈现持续上涨趋势，1-5月累计上涨 1.8%，涨幅较为明显，需关注后续价格走势',
  '居住类价格保持稳定，波动幅度最小，是稳定物价的重要支撑因素',
];

// 城市2 专属分析结论
const CITY2_CONCLUSIONS = [
  '其他用品及服务类价格涨幅显著，从2025年4月的106.7升至12月的117.8，累计上涨11.1个百分点，是拉动总指数上行的主要因素。',
  '交通通信类价格持续低迷，全年各月均低于100，12月为97.4，反映该领域价格下行压力较大，与城市1的交通通信表现形成对比。',
  '食品烟酒类价格波动较大，5月为100.4，9月降至97.6，12月回升至101.0，呈现“V型”走势，需关注其波动对总指数的影响。',
];

// 城市3 专属分析结论
const CITY3_CONCLUSIONS = [
  '总指数保持温和：城市3总体CPI在2025年期间保持平稳，处于温和区间，未出现大幅波动。',
  '食品烟酒类为核心变量：食品烟酒类价格年内波动最为明显，是拉动总指数起伏的最主要因素。',
  '居住类价格底盘稳固：居住类价格全年维持在100左右，对整体物价稳定起到了压舱石的作用。',
];

// 城市4 专属分析结论
const CITY4_CONCLUSIONS = [
  '服务消费韧性凸显：教育文化娱乐、医疗保健等升级类消费价格呈现稳步微涨，反映出服务消费需求具有较强韧性。',
  '交通通信类持续承压：受大宗商品价格及行业竞争影响，交通通信类价格持续低于荣枯线（100），是拖累总指数的因素。',
  '衣着与生活用品走势分化：衣着类价格温和上涨，而生活用品及服务类价格出现阶段性下行，反映居民日常消费结构的变化。',
];

// 城市5 专属分析结论
const CITY5_CONCLUSIONS = [
  '鲜菜价格波动剧烈：鲜菜类价格年内最高达118.1，最低仅84.8，是影响城市5食品类价格指数起伏的最大不稳定因素。',
  '畜肉类拖累食品指数：畜肉类价格长期处于低位（2026年5月仅为93.1），多个月份低于荣枯线，是拖累总指数下行的主要因素。',
  '粮食类价格底盘极稳：粮食类价格全年在98.5-99.8的极窄区间内运行，展现出极强的刚性需求与稳定性。',
];

// 按数据集名称绑定默认结论
const CONCLUSIONS_MAP: Record<string, string[]> = {
  '城市1': DEFAULT_CONCLUSIONS,
  '城市2': CITY2_CONCLUSIONS,
  '城市3': CITY3_CONCLUSIONS,
  '城市4': CITY4_CONCLUSIONS,
  '城市5': CITY5_CONCLUSIONS,
};

// 根据数据集名称解析结论：先精确匹配，未命中再按名称包含兜底；仍无匹配则返回空数组（页面显示暂无分析结论）
function resolveConclusions(name?: string): string[] {
  if (!name) return [];
  const trimmed = name.trim();
  if (CONCLUSIONS_MAP[trimmed]) return CONCLUSIONS_MAP[trimmed];
  const fallback = Object.entries(CONCLUSIONS_MAP).find(([key]) => trimmed.includes(key));
  return fallback ? fallback[1] : [];
}

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getDataset, getData, updateDataset } = useDB();

  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [rawData, setRawData] = useState<DataRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [conclusions, setConclusions] = useState<string[]>(DEFAULT_CONCLUSIONS);
  const [editingConclusion, setEditingConclusion] = useState<number | null>(null);
  const [conclusionSaveStatus, setConclusionSaveStatus] = useState<{ [key: number]: 'idle' | 'saving' | 'saved' }>({});
  const codeRef = useRef<HTMLTextAreaElement>(null);

  const [chartImageError, setChartImageError] = useState(false);
  const [workbuddyImageError, setWorkbuddyImageError] = useState(false);

  // 切换数据集时重置图片加载失败状态
  useEffect(() => {
    setChartImageError(false);
    setWorkbuddyImageError(false);
  }, [dataset?.name]);

  // 从 URL 获取当前 Tab
  const activeTab = (searchParams.get('tab') as TabType) || 'table';

  // 加载项目数据
  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    Promise.all([
      getDataset(id),
      getData(id),
    ])
      .then(([datasetData, data]) => {
        if (!datasetData) {
          setError('数据集未找到');
        } else {
          setDataset(datasetData);
          setCode(datasetData.code || resolveDefaultCode(datasetData.name) || '');
          setConclusions(datasetData.conclusions && datasetData.conclusions.length > 0 ? datasetData.conclusions : resolveConclusions(datasetData.name));
          setRawData(data);
        }
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : '加载项目失败');
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  // 代码 textarea 高度自适应：rAF 等布局完成后再测 scrollHeight，避免 2-3 行截断
  const fitCode = useCallback(() => {
    const el = codeRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    });
  }, []);

  // code 变化或切换到 clean Tab 时重新自适应；窗口宽度变化也重新 fit
  useEffect(() => {
    fitCode();
    const onResize = () => fitCode();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [code, activeTab, fitCode]);

  // 当前数据集名称，用于动态拼接图片路径
  const datasetName = dataset?.name ?? '';

  // 当前数据集对应的 WorkBuddy 代码；未命中映射时为空
  const workbuddyCode = resolveWorkbuddyCode(dataset?.name);

  // 是否存在可显示的清洗代码（已保存代码或默认代码）
  const hasCleanCode = Boolean(dataset?.code || resolveDefaultCode(dataset?.name));

  // 根据当前数据集名称解析清洗步骤
  const cleaningSteps = resolveCleaningSteps(dataset?.name);

  // 切换 Tab
  const handleTabChange = (tab: TabType) => {
    setSearchParams({ tab });
  };

  const handleSaveCode = async () => {
    if (!id || !dataset) return;
    setSaveStatus('saving');
    try {
      await updateDataset({ ...dataset, code });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('保存代码失败:', error);
      setSaveStatus('idle');
    }
  };

  const handleSaveConclusion = async (index: number) => {
    if (!dataset) return;
    setConclusionSaveStatus(prev => ({ ...prev, [index]: 'saving' }));
    try {
      await updateDataset({ ...dataset, conclusions });
      setConclusionSaveStatus(prev => ({ ...prev, [index]: 'saved' }));
      setEditingConclusion(null);
      setTimeout(() => setConclusionSaveStatus(prev => ({ ...prev, [index]: 'idle' })), 2000);
    } catch (error) {
      console.error('保存结论失败:', error);
      setConclusionSaveStatus(prev => ({ ...prev, [index]: 'idle' }));
    }
  };

  const handleDeleteConclusion = (index: number) => {
    const newConclusions = conclusions.filter((_, i) => i !== index);
    setConclusions(newConclusions);
    if (dataset) {
      updateDataset({ ...dataset, conclusions: newConclusions });
    }
  };

  const handleAddConclusion = () => {
    setConclusions([...conclusions, '']);
    setEditingConclusion(conclusions.length);
  };

  // 加载状态
  if (isLoading) {
    return (
      <Layout>
        <div id="detail-page">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6BC5E8] mx-auto mb-4"></div>
              <p className="text-[#9CA3AF]">正在加载项目...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // 错误状态
  if (error || !dataset) {
    return (
      <Layout>
        <div id="detail-page">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-[#9CA3AF]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-base font-medium text-white">项目未找到</h3>
              <p className="mt-1 text-base text-[#9CA3AF]">
                {error || `项目 ID ${id} 不存在或已被删除`}
              </p>
              <div className="mt-6">
                <Link
                  to="/home"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-[#0a0e1a] bg-[#6BC5E8] hover:bg-[#5AB4D8]"
                >
                  返回首页
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('zh-CN');
  };

  return (
    <Layout>
      <div id="detail-page">
        <div className="max-w-4xl mx-auto">
        {/* 返回按钮 */}
        <div className="mb-4">
          <Link
            to="/home"
            className="inline-flex items-center text-[19px] transition-all px-4 py-2 rounded-lg border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-400/60"
            style={{ color: '#B084DC', textShadow: '0 0 6px #7B4B9E, 0 0 12px #7B4B9E, 0 0 24px rgba(123, 75, 158, 0.6)' }}
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            返回首页
          </Link>
        </div>

        {/* 项目标题区域 */}
        <div className="mb-4 bg-[#26262C] rounded-lg border border-[#3A3A44] shadow-sm p-2 md:p-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-lg font-bold text-white">{dataset.name}</h1>
              {dataset.description && (
                <p className="mt-2 text-[#D1D5DB]">{dataset.description}</p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-base text-[#9CA3AF]">
                <span>创建于 {formatDate(dataset.createdAt)}</span>
                {dataset.updatedAt !== dataset.createdAt && (
                  <span>· 更新于 {formatDate(dataset.updatedAt)}</span>
                )}
              </div>
              {dataset.tags && dataset.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {dataset.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-[#6BC5E8]/10 text-[#6BC5E8] border border-[#6BC5E8]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 项目信息展示区域 */}
        <div className="bg-[#26262C] rounded-lg border border-[#3A3A44] shadow-sm mb-4">
          <div className="p-2 md:p-3">
            <h2 className="text-lg font-semibold text-white mb-3">数据集信息</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
              {/* 文件名 */}
              <div>
                <h3 className="text-base font-medium text-[#9CA3AF] mb-1">文件名</h3>
                <p className="text-white">{dataset.fileName}</p>
              </div>

              {/* 文件类型 */}
              <div>
                <h3 className="text-base font-medium text-[#9CA3AF] mb-1">文件类型</h3>
                <p className="text-white uppercase">{dataset.fileType}</p>
              </div>

              {/* 数据量 */}
              <div>
                <h3 className="text-base font-medium text-[#9CA3AF] mb-1">数据行数</h3>
                <p className="text-white">{formatNumber(dataset.rowCount)} 行</p>
              </div>

              {/* 字段 */}
              <div className="md:col-span-2 lg:col-span-3">
                <h3 className="text-base font-medium text-[#9CA3AF] mb-1">数据字段</h3>
                <p className="text-white">{dataset.columns.join('、')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 切换 */}
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Tab 内容 */}
        <div className="mt-4 md:mt-5">
          {/* Tab 1: 数据表格 */}
          {activeTab === 'table' && (
            <div>
              <DataTable data={rawData} title="原始数据" />
            </div>
          )}

          {/* Tab 2: 数据清洗 */}
          {activeTab === 'clean' && (
            <div className="space-y-4">
              {/* 数据清洗记录：只读展示清洗步骤，位于代码卡片之上 */}
              <div className="bg-[#26262C] rounded-lg border border-[#3A3A44] overflow-hidden">
                <div className="px-4 py-3 border-b border-[#3A3A44]">
                  <h3 className="text-base font-medium text-white">数据清洗记录</h3>
                  <p className="text-sm text-[#9CA3AF] mt-1">从原始宽表到可用长表的完整处理步骤</p>
                </div>
                <ol className="p-4 space-y-2">
                  {cleaningSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#6BC5E8]/15 text-[#6BC5E8] text-xs font-semibold flex items-center justify-center mt-0.5">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      <span className="text-base text-[#D1D5DB] leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              {hasCleanCode && (
                <div className="bg-[#26262C] rounded-lg border border-[#3A3A44] overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#3A3A44] flex items-center justify-between">
                    <h3 className="text-base font-medium text-white">数据清洗与可视化代码</h3>
                    <button
                      onClick={handleSaveCode}
                      disabled={saveStatus === 'saving'}
                      className="px-3 py-1 text-base font-medium text-[#0a0e1a] bg-[#6BC5E8] rounded-lg hover:bg-[#5AB4D8] transition-colors disabled:opacity-50"
                    >
                      {saveStatus === 'saving' ? '保存中...' : saveStatus === 'saved' ? '✓ 已保存' : '保存修改'}
                    </button>
                  </div>
                  <div className="bg-gray-900">
                    <textarea
                      ref={codeRef}
                      value={code}
                      onChange={(e) => { setCode(e.target.value); fitCode(); }}
                      onFocus={fitCode}
                      spellCheck={false}
                      className="w-full bg-gray-900 text-gray-100 p-4 font-mono text-base leading-relaxed resize-none overflow-hidden outline-none border-0 focus:ring-0"
                      style={{ fontFamily: '"Fira code", "Fira Mono", monospace', tabSize: 4 }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: 分析结论 */}
          {activeTab === 'conclusion' && (
            <div className="space-y-3">
              <div className="bg-[#26262C] rounded-lg border border-[#3A3A44] p-2 md:p-3">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  数据分析结论
                </h3>
                <div className="space-y-2">
                  {conclusions.length === 0 && (
                    <p className="text-base text-[#9CA3AF] py-6 text-center">暂无分析结论</p>
                  )}
                  {conclusions.map((conclusion, index) => (
                    <div
                      key={index}
                      className={`flex gap-2 p-2 rounded-lg border transition-colors ${
                        editingConclusion === index
                          ? 'bg-[#6BC5E8]/10 border-[#6BC5E8]/40 ring-2 ring-[#6BC5E8]/20'
                          : 'bg-[#1E1E24] border-[#3A3A44]'
                      }`}
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-[#6BC5E8] text-[#0a0e1a] rounded-full flex items-center justify-center text-base font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        {editingConclusion === index ? (
                          <textarea
                            value={conclusion}
                            onChange={(e) => {
                              const newConclusions = [...conclusions];
                              newConclusions[index] = e.target.value;
                              setConclusions(newConclusions);
                            }}
                            className="w-full p-2 border border-[#3A3A44] rounded-lg text-base text-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#6BC5E8]/30 focus:border-[#6BC5E8]/60 min-h-[80px] resize-y"
                            placeholder="请输入分析结论..."
                            autoFocus
                          />
                        ) : (
                          <p
                            className="text-base text-[#D1D5DB] cursor-pointer hover:text-white"
                            onClick={() => setEditingConclusion(index)}
                          >
                            {conclusion || '点击编辑...'}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          {editingConclusion === index ? (
                            <>
                              <button
                                onClick={() => handleSaveConclusion(index)}
                                disabled={conclusionSaveStatus[index] === 'saving'}
                                className="px-3 py-1 text-sm font-medium text-[#0a0e1a] bg-[#6BC5E8] rounded-lg hover:bg-[#5AB4D8] transition-colors disabled:opacity-50"
                              >
                                {conclusionSaveStatus[index] === 'saving' ? '保存中...' : conclusionSaveStatus[index] === 'saved' ? '✓ 已保存' : '保存修改'}
                              </button>
                              <button
                                onClick={() => setEditingConclusion(null)}
                                className="px-3 py-1 text-sm font-medium text-[#9CA3AF] bg-[#1E1E24] rounded-lg hover:bg-[#3A3A44] transition-colors"
                              >
                                取消
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => setEditingConclusion(index)}
                              className="text-sm text-[#9CA3AF] hover:text-[#6BC5E8] transition-colors"
                            >
                              ✏️ 编辑
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteConclusion(index)}
                            className="text-sm text-[#9CA3AF] hover:text-red-500 transition-colors"
                          >
                            🗑️ 删除
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAddConclusion}
                  className="mt-4 w-full py-2 border-2 border-dashed border-[#3A3A44] rounded-lg text-base text-[#9CA3AF] hover:border-[#6BC5E8] hover:text-[#6BC5E8] transition-colors"
                >
                  + 添加新结论
                </button>
              </div>
            </div>
          )}

          {/* Tab: WorkBuddy 分析（WorkBuddy 生成的图表与代码） */}
          {activeTab === 'smart' && (
            <div className="space-y-4">
              <div className="bg-[#26262C] rounded-lg border border-[#3A3A44] p-2">
                <h3 className="text-lg font-semibold text-white mb-4 text-center">图表展示区</h3>
                <div className="flex justify-center">
                  {workbuddyImageError ? (
                    <p className="text-base text-[#9CA3AF] py-8">暂无 WorkBuddy 图表</p>
                  ) : (
                    <img
                      src={`/images/${datasetName}_WorkBuddy图.png`}
                      alt={`${datasetName} WorkBuddy 分析图`}
                      className="w-full max-h-[500px] object-contain rounded"
                      onError={() => setWorkbuddyImageError(true)}
                    />
                  )}
                </div>
              </div>
              {workbuddyCode && (
                <div className="bg-[#26262C] rounded-lg border border-[#3A3A44] p-2">
                  <h3 className="text-lg font-semibold text-white mb-4 text-center">WorkBuddy 生成的数据处理与可视化代码</h3>
                  <pre className="bg-[#1E1E24] text-[#D1D5DB] p-4 rounded-lg font-mono text-base leading-relaxed whitespace-pre overflow-x-auto max-h-[400px] overflow-y-auto">
                    {workbuddyCode}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Tab: 可视化分析（按数据集名称动态拼接图片路径） */}
          {activeTab === 'chart' && (
            chartImageError ? (
              <div className="bg-[#26262C] rounded-lg border border-[#3A3A44] p-10 flex flex-col items-center justify-center text-center">
                <p className="text-base text-[#9CA3AF]">暂无可视化图表，请先上传并分析数据</p>
              </div>
            ) : (
              <div className="bg-[#26262C] rounded-lg border border-[#3A3A44] p-2">
                <h3 className="text-lg font-semibold text-white mb-4 text-center">{datasetName} 可视化图表</h3>
                <div className="flex justify-center">
                  <img
                    src={`/images/${datasetName}_手工图.png`}
                    alt={`${datasetName} 可视化图表`}
                    className="w-full max-h-[500px] object-contain rounded"
                    onError={() => setChartImageError(true)}
                  />
                </div>
                <p className="text-base text-[#9CA3AF] mt-4 text-center">数据来源：国家统计局 | 使用 Python Matplotlib 生成</p>
              </div>
            )
          )}
        </div>
      </div>
      </div>
    </Layout>
  );
}
