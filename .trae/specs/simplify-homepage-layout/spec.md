# 首页布局简化 Spec

## Why
首页全屏封面设计导致用户需要下滑才能看到数据内容，信息密度低。需要让数据操作成为页面核心。

## What Changes
- 移除全屏封面 Hero 区域（大标题、副标题、探索按钮、装饰背景）
- 移除 framer-motion Hero 动画变体
- 移除 scrollToDatasets 函数和 datasetsRef
- 页面顶部显示小标题"📊 数据作品集"和导入按钮
- 标题下方直接显示统计卡片
- 统计卡片下方直接显示搜索框和数据集列表
- 保留 Footer 动画

## Impact
- Affected code: src/pages/HomePage.tsx

## MODIFIED Requirements

### Requirement: 首页布局
首页 SHALL 以数据内容为核心，顶部小标题 + 统计卡片 + 搜索 + 数据集列表，无全屏封面。
