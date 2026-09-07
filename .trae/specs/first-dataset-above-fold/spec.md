# 首屏可见第一个数据集卡片（第三轮紧凑化）- 产品需求文档

## Overview
- **Summary**: 在前两轮紧凑化基础上，进一步压缩首页垂直空间，使 1366×768 屏幕、浏览器 100% 缩放时，无需滚动即可看到从顶部导航到第一个数据集卡片的完整内容。
- **Purpose**: 用户目前需缩放到 80% 才能看到完整内容；实测第一个数据集卡片底部距视口顶部 935px，超出典型浏览器内容区（约 650px）。
- **Target Users**: 1366×768 笔记本用户，浏览器 100% 缩放。

## Measured Baseline（实测数据）
浏览器视口 748px（接近真实内容区），首页各区块距视口顶部的距离：
- Header: 72px（fixed）
- main pt-20: 80px
- 统计网格底部: 522px（统计卡片已可见）
- **第一个数据集卡片底部: 935px**（需滚动，超出视口 187px）
- 目标：第一个数据集卡片底部 ≤ ~660px，需再压缩约 275px

## Goals
- 第一个数据集卡片在 100% 缩放、无滚动时完整可见。
- 统计卡片进一步收紧，视觉密度更高。
- 不影响移动端（<768px）可读性与功能。

## Non-Goals
- 不改 Header、封面页、ECharts 280px、功能逻辑、配色。
- 不引入 zoom/scale/根 font-size 重写。
- 不 commit/push，待用户预览确认。

## Functional Requirements
- **FR-1**: 顶部留白 `pt-20`(80px) → `pt-[72px]`，紧贴 Header（Header h-18=72px，不遮挡），省 8px。
- **FR-2**: Layout 内容层 `p-3 md:p-5` → `p-2 md:p-3`，主内容卡 `p-3 md:p-5` → `p-2 md:p-3`。
- **FR-3**: hero 标题 `text-2xl md:text-3xl` → `text-xl md:text-2xl`；副标题 `text-sm md:text-base` → `text-xs md:text-sm`；分隔线 `mt-3 h-1` → `mt-2 h-0.5`；hero 区 `mb-6` → `mb-3`。
- **FR-4**: "我的数据集"标题 `text-xl` → `text-lg`；标题行 `mb-4` → `mb-2`。
- **FR-5**: 统计网格 `gap-2 md:gap-3`，`mb-6` → `mb-3`；统计卡 `p-3` → `p-2`；统计数字 `text-xl` → `text-lg`；标签与数字间距 `mb-2` → `mb-1`。
- **FR-6**: 面包屑 `mb-4` → `mb-2`；文件夹区 `mb-6` → `mb-3`，文件夹卡 `p-3` → `p-2`；"未分类"标题 `mb-3` → `mb-2`。
- **FR-7**: 搜索框 `py-2.5` → `py-2`，`mb-5` → `mb-3`；数据集卡 `p-3` → `p-2`；数据集网格 `gap-3 md:gap-4` → `gap-2 md:gap-3`。
- **FR-8**: 其余页面（ProjectList/About/PowerBI/ProjectDetail）同步适度收紧间距一档，保持一致（卡片 p-3 md:p-4 → p-2 md:p-3，标题 text-xl → text-lg，网格 gap 收紧）。
- **FR-9**: root/body `overflow-x-hidden` 保持；所有容器 `max-w-*` 约束保留。

## Non-Functional Requirements
- **NFR-1**: 仅改 Tailwind 尺寸/间距/字号类。
- **NFR-2**: tsc 与 vite build 通过。
- **NFR-3**: 移动端不退化。

## Acceptance Criteria

### AC-1: 首屏可见第一个数据集卡片
- **Type**: `rule`
- **Given**: 视口高度 748px（或 1366×768 内容区）
- **When**: 访问 /home，有数据集
- **Then**: 第一个数据集卡片底部 `getBoundingClientRect().bottom <= window.innerHeight`
- **Pass Condition**: 浏览器测量 bottom <= innerHeight
- **Evidence**: 浏览器测量 JSON

### AC-2: 统计卡片与标题进一步收紧
- **Type**: `rule`
- **Given**: /home 统计区
- **When**: grep
- **Then**: 统计数字 text-lg；统计卡 p-2；标题 text-lg；无裸 text-xl 统计数字
- **Pass Condition**: grep 通过
- **Evidence**: grep

### AC-3: 类型检查与构建通过
- **Type**: `rule`
- **When**: tsc / vite build
- **Then**: 退出码 0
- **Evidence**: 命令输出

### AC-4: 移动端不退化
- **Type**: `rule`
- **Given**: 窄屏
- **When**: 访问 /home
- **Then**: scrollWidth <= clientWidth，无溢出
- **Evidence**: 浏览器检测

### AC-5: 视觉密度舒适
- **Type**: `rubric`
- **Dimension**: 1366 首屏密度
- **Scale**: 1-5；1=溢出/过小；3=完整但拥挤或偏松；5=首屏完整可见统计卡+第一个数据集卡，密度舒适
- **Pass Threshold**: >= 4
- **Evidence**: 截图 + 用户预览

### AC-6: 无缩放 hack
- **Type**: `rule`
- **When**: grep
- **Then**: 无 zoom/scale()/根 font-size 重写
- **Evidence**: grep
