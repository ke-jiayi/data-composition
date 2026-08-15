# Checklist

## 白天模式流光线条配色
- [ ] 渐变曲线 start `#00D4FF`（青色）/ end `#60A5FA`（浅蓝）
- [ ] 数据点 fill `#22D3EE`（亮青），opacity `0.55`
- [ ] 网格线 stroke `#34D399`（翠绿），opacity `0.5`
- [ ] welcome 描边 `#0EA5E9`（天蓝）
- [ ] welcome drop-shadow 青色系 subtle glow
- [ ] 进入提示文字 `#0891B2`（深青，可读）
- [ ] neonGlow / neonGlowHover 青色系
- [ ] 主路径 strokeWidth 白天 `2` / 黑夜 `3`

## 深色模式不变
- [ ] 渐变 `#7B4B9E` → `#6BC5E8`
- [ ] 数据点 `#6BC5E8` opacity `0.85`
- [ ] 网格线 `#7B4B9E` opacity `0.08`
- [ ] welcome 描边 `#6C3B9A`
- [ ] 进入提示 `#5FFBF1` 霓虹青
- [ ] strokeWidth `3`

## 验证
- [ ] `npx tsc --noEmit` 无错误
- [ ] `npx vite build` 成功
- [ ] 变更已提交并推送到 origin/main
