# 关于页改用 Remix Icon 字体图标 Spec

## Why
手写内联 SVG 路径比例失真、观感不佳。改用 Remix Icon 官方字体图标，可直接复用标准图形，同时统一尺寸、对齐与主题配色。

## What Changes
- 通过 `npm install remixicon` 将图标库加入 `dependencies`（会同步更新 `package.json` 与 lockfile）。
- 在全局入口 `src/main.tsx` 中、`./index.css` 之后引入 `import 'remixicon/fonts/remixicon.css';`，使字体图标在全站可用。
- `src/pages/AboutPage.tsx`：删除「技术栈」与「后续计划」h2 中的整段 `<svg>...</svg>`，替换为 Remix Icon 的 `<i>` 标签：
  - 技术栈：`ri-settings-4-fill`
  - 后续计划：`ri-quill-pen-ai-fill`
- 两个 `<i>` 均使用 `w-6 h-6 inline-flex items-center justify-center mr-2 text-[#00B4D8] dark:text-[#6BC5E8]`，白天深蓝、黑夜亮青，不使用红色。
- h2 的 className 保持原样（技术栈 `mb-4`、后续计划 `mb-3`），标题文字不变。

## Impact
- Affected specs: 关于页标题图标、全局样式入口
- Affected code: `package.json`、`package-lock.json`、`src/main.tsx`、`src/pages/AboutPage.tsx`

## ADDED Requirements
### Requirement: 图标库可用
系统 SHALL 通过 remixicon 包提供 `ri-settings-4-fill` 与 `ri-quill-pen-ai-fill` 两个图标类。

#### Scenario: 安装与引入
- **WHEN** 执行 `npm install remixicon` 并在 `main.tsx` 引入 `remixicon/fonts/remixicon.css`
- **THEN** `package.json` 的 `dependencies` 出现 `remixicon`，构建产物可加载字体文件，页面 `<i class="ri-...">` 正常显示字形

### Requirement: 技术栈图标
#### Scenario: 渲染
- **WHEN** 打开「关于」页
- **THEN** 「技术栈」前显示 `ri-settings-4-fill` 图标，尺寸 24×24（`w-6 h-6`），用 `inline-flex items-center justify-center` 与文字垂直居中

### Requirement: 后续计划图标
#### Scenario: 渲染
- **WHEN** 打开「关于」页
- **THEN** 「后续计划」前显示 `ri-quill-pen-ai-fill` 图标，尺寸与对齐方式同上

### Requirement: 主题配色
#### Scenario: 亮/暗主题
- **WHEN** 切换主题
- **THEN** 两个图标分别为 `#00B4D8` / `#6BC5E8`，无任何红色

## MODIFIED Requirements
### Requirement: 关于页标题图标实现方式
两处图标由内联 SVG 改为 Remix Icon `<i>` 标签；已替换的饼图与笑脸 SVG 保持不动。

## Non-Goals
- 不改动「这个网站是做什么的？」与「联系方式」两处已完成的 SVG 图标。
- 不引入其它图标库，不改 Tailwind 配置。
- 不修改技术栈标签列表、计划列表、其它文案与布局。
- 不执行任何 git commit / push（用户要求在本地预览确认）。
