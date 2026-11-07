# 关于页标题图标比例与对齐调整 Spec

## Why
四个区块标题为 `text-xl`（20px）的粗体文字，而图标只有 24px 盒子、实际字形 20px，视觉上「小马拉大车」；且图标与文字不在同一水平中心线上，间距偏紧。

## What Changes
- 四个标题的图标统一为 Remix Icon 字体图标（此前仅后两个已切换）：
  - 「这个网站是做什么的？」内联 SVG → `<i className="ri-pie-chart-2-fill ...">`
  - 「联系方式」内联 SVG → `<i className="ri-chat-smile-2-fill ...">`
  - 「技术栈」「后续计划」保留 `ri-settings-4-fill` / `ri-quill-pen-ai-fill`
- 图标尺寸由 `w-6 h-6` 调整为 `w-7 h-7` 并追加 `text-2xl`（字号 24px、盒子 28px），同时保留 `flex-shrink-0` 防挤压。
- 四个 h2 增加 `flex items-center`，使「图标 + 标题文字」在同一 flex 行内垂直居中。
- 图标与文字间距由 `mr-2` 改为 `mr-3`。
- 颜色保持 `text-[#00B4D8] dark:text-[#6BC5E8]`（白天深蓝、黑夜亮青），无红色。
- h2 原有的 `text-xl font-semibold text-gray-900 dark:text-[#E2E8F0]` 与 `mb-4` / `mb-3` 间距保留。

## Impact
- Affected specs: 关于页四区块标题图标与布局
- Affected code: `src/pages/AboutPage.tsx`

## ADDED Requirements
### Requirement: 图标尺寸与标题协调
系统 SHALL 让四个标题图标以 24px 字形、28px 盒子呈现，视觉重量与 `text-xl` 标题匹配。

#### Scenario: 渲染
- **WHEN** 打开「关于」页
- **THEN** 四个图标均为 `w-7 h-7 text-2xl`，且带 `flex-shrink-0`，不被文字挤压

### Requirement: 垂直居中
#### Scenario: 对齐
- **WHEN** 任一标题渲染
- **THEN** 其 h2 带 `flex items-center`，图标与文字中心线水平对齐

### Requirement: 图标与文字间距
#### Scenario: 间距
- **WHEN** 标题渲染
- **THEN** 图标右侧为 `mr-3`（12px）呼吸间距

### Requirement: 统一图标来源
#### Scenario: 一致性
- **WHEN** 检查四个标题
- **THEN** 全部使用 Remix Icon `<i>` 标签（`ri-pie-chart-2-fill`、`ri-chat-smile-2-fill`、`ri-settings-4-fill`、`ri-quill-pen-ai-fill`），不再存在手写标题 SVG

## MODIFIED Requirements
### Requirement: 关于页标题布局
h2 由纯文本块改为 `flex items-center` 的图标+文字组合，其余文字样式与下边距保持不变。

## Non-Goals
- 不修改标题文字、区块下边距（`mb-4` / `mb-3`）、正文内容与卡片样式。
- 不修改联系方式正文中的 GitHub / 邮箱 SVG 图标。
- 不新增依赖（remixicon 已安装），不改 `main.tsx` / Tailwind 配置。
- 不执行任何 git commit / push（用户要求在本地预览确认）。
