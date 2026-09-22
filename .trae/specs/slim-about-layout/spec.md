# 关于页面瘦身排版优化 Spec

## Why
AboutPage 当前主内容区为 `max-w-5xl`（1024px），正文段落无字号类（浏览器默认 16px）、小字 text-sm（14px）偏小。希望收窄到 max-w-4xl 并放大正文字号，与详情页排版风格一致，提升阅读舒适度。

## What Changes
- AboutPage.tsx 容器 `max-w-5xl` → `max-w-4xl`（896px 居中）。
- 正文字号放大：body 段落（无字号类）加 `text-lg`；text-sm（备注、技术栈标签）→ text-base。
- h1 页面标题 text-lg → text-xl；h2 区块标题 text-lg → text-xl（保持与 body text-lg 的层级区分）。
- 卡片间距（p-3 md:p-4、space-y-3 md:space-y-4、gap-2）不变。

## Impact
- Affected code: 仅 src/pages/AboutPage.tsx

## MODIFIED Requirements

### Requirement: 关于页面排版
The AboutPage SHALL use a narrower centered layout with larger body text for comfortable reading.

#### Scenario: 打开关于页
- **WHEN** 用户打开 AboutPage
- **THEN**: 主容器 max-width≈896px 居中；正文 text-lg（18px）；标签/备注 text-base（16px）；h1/h2 text-xl（20px）；间距不变；小屏无横向滚动

## Non-Goals
- 不改 Layout 组件、配色、卡片样式、内容文本。
- 不改其他页面。

## Acceptance Criteria

### AC-1: 容器收窄
- **Type**: `rule`
- **When**: 打开 AboutPage
- **THEN**: 主容器 class 含 max-w-4xl mx-auto，不含 max-w-5xl；computed max-width≈896px
- **Evidence**: 代码 grep + 浏览器

### AC-2: 字号放大
- **Type**: `rule`
- **When**: 检查文本元素
- **THEN**: body 段落 font-size≈18px；标签/备注≈16px；h1/h2≈20px
- **Evidence**: 浏览器 getComputedStyle

### AC-3: 间距不变
- **Type**: `rule`
- **When**: 检查卡片
- **THEN**: section 仍为 p-3 md:p-4；space-y-3 md:space-y-4；gap-2 不变
- **Evidence**: 代码 grep

### AC-4: 无横向滚动
- **Type**: `rule`
- **When**: 视口 1366px 或更窄
- **THEN**: documentElement.scrollWidth <= clientWidth
- **Evidence**: 浏览器

### AC-5: 编译通过
- **Type**: `rule`
- **When**: npx tsc --noEmit
- **THEN**: 退出码 0
- **Evidence**: tsc 输出

## Open Questions
- 无。
