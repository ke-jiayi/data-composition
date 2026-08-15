# Checklist

## 白天模式网格横线隐藏
- [ ] gridLineOpacity light 分支为 `0`（横线不可见）
- [ ] 背景只有流光曲线和数据点

## 深色模式不变
- [ ] gridLineOpacity dark 分支保持 `0.08`
- [ ] 流光曲线、数据点颜色不变

## 验证
- [ ] `npx tsc --noEmit` 无错误
- [ ] `npx vite build` 成功
- [ ] 变更已提交并推送到 origin/main
