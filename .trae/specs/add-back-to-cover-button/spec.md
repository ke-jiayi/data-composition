# 首页返回封面按钮 Spec

## Why
点击封面跳转到 /home 后，用户无法再返回封面欢迎页。需要在首页添加"返回封面"按钮。

## What Changes
- 在 HomePage 页面标题区域的右上角（或合适位置）添加"← 返回封面"按钮
- 点击后 navigate 到 `/`（欢迎封面页）
- 按钮风格与网站整体一致（青色/深色点缀色）

## Impact
- Affected code: src/pages/HomePage.tsx

## ADDED Requirements

### Requirement: 首页返回封面按钮
首页 SHALL 提供返回封面页的按钮，点击后跳转到 `/`。
