# 白天模式去除 WelcomePage 网格横线 Spec

## Why
白天模式下 WelcomePage 背景有4条翠绿色网格横线（opacity 0.5），在浅色背景上过于显眼。用户希望白天模式与黑夜模式一致，背景只保留流光曲线，不显示网格横线。

## What Changes
- 修改 `src/pages/WelcomePage.tsx` 中 `colors.gridLineOpacity` 的 light 分支：`0.5` → `0`
- 黑夜模式保持不变（`0.08`，几乎不可见）

## Impact
- Affected code: `src/pages/WelcomePage.tsx`（colors 对象 gridLineOpacity light 分支）
- 不变：深色模式、流光曲线、数据点、其他页面

## MODIFIED Requirements
### Requirement: WelcomePage 网格横线白天模式隐藏
白天模式下网格横线 SHALL 完全不可见（opacity 0），背景只保留流光曲线和数据点。

#### Scenario: 白天无网格横线
- **WHEN** 处于白天模式
- **THEN** 4条网格横线 opacity 为 0，不可见，背景只有流光曲线

#### Scenario: 深色模式不变
- **WHEN** 处于黑夜模式
- **THEN** 网格横线保持 opacity 0.08（几乎不可见），与现状一致
