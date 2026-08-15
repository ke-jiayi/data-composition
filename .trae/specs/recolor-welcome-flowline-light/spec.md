# WelcomePage 流光线条白天模式青绿色重配 Spec

## Why
上一轮修复 WelcomePage 白天模式时，流光线条改用了深青蓝 `#2C5282` 系，在白底上显得暗淡。用户希望白天模式的流光线条使用更清爽、明亮的青色/翠绿色系，作为背景点缀（透明度 0.4-0.6），而不是深色块。

## What Changes
- 修改 `src/pages/WelcomePage.tsx` 中 `colors` 对象的 light 模式分支值：
  - `gradStart`: `#553C9A` → `#00D4FF`（青色主线条）
  - `gradEnd`: `#3182CE` → `#60A5FA`（浅蓝渐变末端）
  - `dotFill`: `#3182CE` → `#22D3EE`（亮青色数据点）
  - `dotOpacity`: `1` → `0.55`（背景点缀，不抢眼）
  - `gridLineStroke`: `#2C5282` → `#34D399`（翠绿网格线）
  - `gridLineOpacity`: `0.15` → `0.5`（0.4-0.6 范围内）
  - `welcomeStroke`: `#2C5282` → `#0EA5E9`（天蓝描边，明亮但可读）
  - `welcomeDropShadow`: 调整为青色系 subtle glow
  - `neonColor`: `#2C5282` → `#0891B2`（深青，文字可读性优先）
  - `neonGlow` / `neonGlowHover`: 调整为青色系 subtle glow
- 背景渐变 `from/via/to` 在 light 模式保持 `#F0F4F8` / `#F7FAFC`（用户提到 `#F2F6FA`，接近现有值，不单独改以避免与全局冲突）
- 深色模式所有值不变
- 线条粗细：SVG path 的 `strokeWidth="3"` 在 light 模式减为 `2`（更轻盈）—— 通过 colors 对象新增 `pathStrokeWidth` 字段

## Impact
- Affected code: `src/pages/WelcomePage.tsx`（colors 对象 light 分支 + path strokeWidth）
- 不变：深色模式、其他页面、index.css、useTheme

## MODIFIED Requirements
### Requirement: WelcomePage 流光线条白天配色
白天模式下流光线条 SHALL 使用青-蓝或青-绿渐变系，透明度 0.4-0.6 作为背景点缀，数据点使用亮青/亮绿。

#### Scenario: 白天流光线条清爽
- **WHEN** 处于白天模式
- **THEN** 渐变曲线为青→浅蓝（`#00D4FF` → `#60A5FA`），数据点亮青 `#22D3EE` 透明度 0.55，网格线翠绿 `#34D399` 透明度 0.5，整体清爽不暗淡

#### Scenario: 白天线条更细
- **WHEN** 处于白天模式
- **THEN** 主路径 strokeWidth 为 2（深色模式保持 3）

#### Scenario: 深色模式不变
- **WHEN** 处于黑夜模式
- **THEN** 所有流光线条颜色、透明度、粗细保持原版霓虹紫青系
