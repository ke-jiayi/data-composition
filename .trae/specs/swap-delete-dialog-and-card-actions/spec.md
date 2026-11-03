# 删除确认按钮与卡片操作区布局 Spec

## Why
1）数据集删除确认弹窗中红色「确认删除」在右、取消在左，不符合「危险操作靠左突出」的习惯；2）数据集卡片右上角的删除/移动图标采用绝对定位，覆盖在 XLSX 徽标上，造成遮挡。

## What Changes
- 数据集删除确认弹窗底部：由【取消】→【确认删除】调整为【确认删除】→【取消】（仅交换 JSX 顺序，类名与事件不变）。
- 数据集卡片顶部行改为：标题（`min-w-0` 可压缩）+ 右侧一个 Flex 容器，容器内依次为「删除图标、移动图标、XLSX 徽标」，统一 `flex items-center gap-2 shrink-0`。
- 删除/移动按钮移除 `absolute top-3 right-3` / `absolute top-3 right-11` 定位，改为普通 flex 子项；保留 `opacity-0 group-hover:opacity-100`、颜色、圆角、padding 与 `hover` 效果。
- XLSX 徽标移除 `ml-2`（改由父级 `gap-2` 提供间距），保留颜色、圆角、字号与 `shrink-0`。
- 「移动到文件夹」下拉菜单由相对卡片的 `absolute top-10 right-3` 改为相对操作组的 `absolute right-0 top-full mt-1 z-10`，视觉位置与样式保持一致。

## Impact
- Affected specs: 数据集删除确认弹窗按钮顺序、数据集卡片顶部布局
- Affected code: `src/pages/HomePage.tsx`

## ADDED Requirements
### Requirement: 删除确认弹窗按钮顺序
系统 SHALL 在「确认删除」弹窗底部按红色「确认删除」在左、「取消」在右渲染。

#### Scenario: 删除数据集
- **WHEN** 点击卡片删除图标后弹窗出现
- **THEN** 底部从左到右为「确认删除」（`bg-red-500`）、「取消」（`bg-white/5`）
- **THEN** 点击「确认删除」仍调用 `handleDelete`，点击「取消」仍执行 `setDeleteTarget(null)`
- **THEN** 两个按钮的类名、hover 效果与改动前一致

### Requirement: 卡片操作图标与 XLSX 徽标同行
系统 SHALL 将删除/移动图标与文件类型徽标放在同一 Flex 行内，图标组位于徽标左侧，二者不重叠。

#### Scenario: 悬停数据集卡片
- **WHEN** 鼠标悬停在数据集卡片上
- **THEN** 顶部一行从左到右为标题、删除图标、移动图标、XLSX 徽标
- **THEN** 两个图标在同一水平线上，与徽标间有 `gap-2` 间距，无绝对定位造成的遮挡
- **THEN** 图标默认 `opacity-0`，仅在 `group-hover` 时完全显现

#### Scenario: 打开移动菜单
- **WHEN** 点击移动图标
- **THEN** 下拉菜单紧贴操作组下方右对齐显示，层级 `z-10`，样式与改动前一致
- **THEN** 菜单内「未分类」与各文件夹项仍调用 `handleMoveToFolder`

## MODIFIED Requirements
### Requirement: 移动菜单定位
下拉菜单定位由卡片级绝对定位改为操作组相对定位（操作组加 `relative`），避免与徽标重叠。

## Non-Goals
- 不修改「删除文件夹」弹窗的按钮顺序。
- 不修改按钮颜色、圆角、字号、padding、hover 类名与任何事件处理逻辑。
- 不修改卡片其他内容（行数、导入时间、底部箭头、顶部色条）。
- 不执行任何 git commit / push。
