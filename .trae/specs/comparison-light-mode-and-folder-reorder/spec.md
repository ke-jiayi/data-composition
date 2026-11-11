# 对比页白天模式与文件夹拖拽排序 Spec

## Why
对比页在浅色模式下标题过黑、下拉框为纯白背景，与深色科技风不一致；首页文件夹顺序固定为创建时间，无法像桌面图标一样调整。

## What Changes
- `ComparisonPage.tsx`：主标题浅色模式改为深青色 `text-[#00B4D8]`，深色模式改为 `dark:text-[#6BC5E8]`；下拉框改为浅色白底深字 + 深色模式 `dark:bg-[#1E1E24] dark:text-white`，边框按主题适配。
- `db.ts`：`Folder` 增加可选 `order` 字段；`createFolder` 写入递增 `order`；`getAllFolders` 按 `order`（缺失时回退 `createdAt`）排序并自动为旧数据补齐 `order`；新增 `reorderFolders(orderedIds)` 用单事务批量写入顺序。
- `useDB.ts`：暴露 `reorderFolders`。
- `HomePage.tsx`：文件夹卡片支持 `draggable`，拖拽使用独立 MIME `application/x-folder-id`，拖到另一文件夹时交换位置并持久化；保留原有「拖数据集进文件夹」逻辑；拖拽经过时目标文件夹青色高亮。

## Impact
- 受影响能力：对比页主题适配、首页文件夹排序与拖拽
- 受影响代码：`src/pages/ComparisonPage.tsx`、`src/utils/db.ts`、`src/hooks/useDB.ts`、`src/pages/HomePage.tsx`

## 关键设计
- IndexedDB 为 schemaless，新增 `order` 字段无需升级 DB 版本。
- 拖拽类型区分：数据集仍写 `text/plain`，文件夹写 `application/x-folder-id`；`onDrop` 先判断文件夹类型，再回退到数据集逻辑，避免互相误触发。
- 排序为「交换两者位置」（按需求），随后对全部文件夹重排并写入 `order = index`。

## ADDED Requirements

### Requirement: 对比页白天模式配色
系统 SHALL 使对比页标题与下拉框在浅色/深色模式下均符合科技风。

#### Scenario: 标题颜色
- **WHEN** 浅色模式查看对比页
- **THEN** 标题为深青色 `#00B4D8`
- **WHEN** 深色模式查看
- **THEN** 标题为亮青色 `#6BC5E8` 并保留原有发光阴影

#### Scenario: 下拉框主题
- **WHEN** 浅色模式
- **THEN** 下拉框为白底、深灰文字、浅灰边框，不使用突兀纯白无边框样式
- **WHEN** 深色模式
- **THEN** 下拉框为 `#1E1E24` 背景、白色文字、灰色边框

### Requirement: 文件夹拖拽排序
系统 SHALL 允许将一个文件夹卡片拖到另一个文件夹卡片上，交换两者顺序并持久化，刷新后顺序保持。

#### Scenario: 拖拽交换
- **WHEN** 用户拖动文件夹 A 并放到文件夹 B 上
- **THEN** A 与 B 在文件夹列表中交换位置
- **THEN** 新顺序写入 IndexedDB，刷新页面后仍保持

#### Scenario: 视觉反馈
- **WHEN** 拖拽文件夹经过另一个文件夹卡片
- **THEN** 目标卡片显示青色高亮边框与发光
- **WHEN** 拖拽结束或离开
- **THEN** 高亮清除

#### Scenario: 不影响原有拖拽
- **WHEN** 用户把数据集卡片拖到文件夹上
- **THEN** 仍执行「移动数据集到该文件夹」，不触发文件夹排序
- **WHEN** 用户把文件夹拖到自己的卡片上
- **THEN** 不产生任何变更

### Requirement: 文件夹顺序持久化
系统 SHALL 在 `folders` 表新增 `order` 字段，读取时按 `order` 升序返回；旧数据无 `order` 时按 `createdAt` 排序并自动补齐。

#### Scenario: 新建文件夹
- **WHEN** 用户新建文件夹
- **THEN** 新文件夹获得当前最大 `order + 1`，排在列表末尾

#### Scenario: 读取排序
- **WHEN** 页面加载文件夹列表
- **THEN** 按 `order` 升序渲染，旧数据缺失 `order` 时自动补齐后稳定排序

## MODIFIED Requirements
### Requirement: 对比页顶部样式
标题由 `text-gray-900 / dark:text-cyan-300` 改为按需求的双主题青色；下拉框由固定深色改为双主题配色。

## REMOVED Requirements
无
