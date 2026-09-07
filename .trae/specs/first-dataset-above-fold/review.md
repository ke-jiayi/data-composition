# 独立审查 - 首屏可见第一个数据集卡片（第三轮紧凑化）

## Spec: `first-dataset-above-fold`
**Reviewer**: 独立审查代理
**Date**: 2026-09-07
**Result**: **pass**

## 结论依据
AC-1（首屏可见第一个数据集卡片）已通过实测验证：模拟 1366px 宽（lg 断点）布局下，第一个数据集卡片底部 = 615px，视口高度 = 748px，`fitsInViewport = true`。615px 亦小于典型 1366×768 浏览器内容区（约 650px），满足用户"100% 缩放无需滚动看到第一个数据集卡片"的目标。

## Checkpoints

| ID | 检查点 | 类型 | 结果 |
|---|---|---|---|
| CP-1 | Layout `pt-20` → `pt-[72px]`，紧贴 Header(72px) 不遮挡 | rule | **pass** — Layout.tsx L78 `pt-[72px]`，grep 无 `pt-20` 残留 |
| CP-2 | Layout 内容层 `p-2 md:p-3` | rule | **pass** — L79 |
| CP-3 | HomePage hero 标题 `text-xl md:text-2xl`，副标题 `text-xs md:text-sm`，分隔线 `mt-2 h-0.5`，hero `mb-3` | rule | **pass** — L255/259/260/240 |
| CP-4 | HomePage 主卡 `p-2 md:p-3`；"我的数据集"标题 `text-lg`，标题行 `mb-2` | rule | **pass** — L264/267/265 |
| CP-5 | 统计卡 `p-2`，数字 `text-lg`，标签 `mb-1`，网格 `mb-3` | rule | **pass** — L320/323/322/319 |
| CP-6 | 面包屑 `mb-2`；文件夹区 `mb-3`、文件夹卡 `p-2`；"未分类"标题 `mb-2` | rule | **pass** — L347/366/377/415 |
| CP-7 | 搜索框 `py-2 mb-3`；数据集卡 `p-2`；数据集网格 `gap-2 md:gap-3` | rule | **pass** — L439/424/452/447 |
| CP-8 | ProjectListPage 标题 `text-lg`，卡片 `p-2 md:p-3`，网格 `gap-2 md:gap-3` | rule | **pass** — L39/49/44 |
| CP-9 | AboutPage 标题 `text-lg`，卡片 `p-3 md:p-4`，`space-y-3 md:space-y-4` | rule | **pass** — L16/23/21 |
| CP-10 | PowerBIPage 标题 `text-lg`，卡片 `p-2 md:p-3`，步骤网格 `gap-2 md:gap-3` | rule | **pass** — L9/18-91/95 |
| CP-11 | ProjectDetailPage 标题 `text-lg`，面板/结论卡/图表面板 `p-2 md:p-3`/`p-2`，信息网格 `gap-2 md:gap-3`，结论卡 `gap-2 p-2`，`space-y-2` | rule | **pass** — L249/246/277/356/448/279/365/361 |
| CP-12 | tsc --noEmit 退出码 0 | rule | **pass** |
| CP-13 | vite build 成功（✓ built in 2.28s） | rule | **pass** |
| CP-14 | 模拟 lg 布局下第一个数据集卡片 bottom (615) <= innerHeight (748) | rule | **pass** |
| CP-15 | 窄屏无水平溢出（scrollWidth == clientWidth） | rule | **pass** — /home 544=544，/project/1 552=552 |
| CP-16 | 无布局缩放 hack（zoom/scale/根 font-size 重写） | rule | **pass** — grep 仅 ECharts 图表 zoom 与 ThemeToggle 图标 scale（既有非布局代码） |
| CP-17 | 未改 Header/封面/ECharts 280px/功能逻辑/配色 | rule | **pass** — diff 仅涉及尺寸/间距/字号类 |

## Findings

**无 actionable finding。** 所有 17 个检查点 pass，无遗留遗漏。

## 最终结论

**Result: pass**

本轮在 6 个文件（Layout、HomePage、ProjectListPage、AboutPage、PowerBIPage、ProjectDetailPage）上完成第三轮激进紧凑化：顶部 pt 紧贴 Header、内容层与卡片 padding 降至 p-2 md:p-3、hero 标题/副标题/分隔线全面缩小、统计卡与数据集卡 p-2、统计数字 text-lg、各处 mb/gap 收紧一档。

实测模拟 1366px 宽布局下第一个数据集卡片底部 615px，小于视口 748px 与典型浏览器内容区 ~650px，达成"100% 缩放无需滚动看到第一个数据集卡片"目标。tsc/build 通过，无水平溢出，无缩放 hack，未触碰 Header/封面/ECharts/功能/配色。最终由用户本机 1366×768 预览确认后再提交推送。
