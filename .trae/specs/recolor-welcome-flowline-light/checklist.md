# Checklist

## 白天模式流光线条配色
- [x] 渐变曲线 start `#00D4FF`（青色）/ end `#60A5FA`（浅蓝）
- [x] 数据点 fill `#22D3EE`（亮青），opacity `0.55`
- [x] 网格线 stroke `#34D399`（翠绿），opacity `0.5`
- [x] welcome 描边 `#0EA5E9`（天蓝）
- [x] welcome drop-shadow 青色系 subtle glow
- [x] 进入提示文字 `#0891B2`（深青，可读）
- [x] neonGlow / neonGlowHover 青色系
- [x] 主路径 strokeWidth 白天 `2` / 黑夜 `3`

## 深色模式不变
- [x] 渐变 `#7B4B9E` → `#6BC5E8`
- [x] 数据点 `#6BC5E8` opacity `0.85`
- [x] 网格线 `#7B4B9E` opacity `0.08`
- [x] welcome 描边 `#6C3B9A`
- [x] 进入提示 `#5FFBF1` 霓虹青
- [x] strokeWidth `3`

## 验证
- [x] `npx tsc --noEmit` 无错误
- [x] `npx vite build` 成功
- [x] 变更已提交并推送到 origin/main
