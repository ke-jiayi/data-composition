# Checklist

## 白天模式网格横线隐藏
- [x] gridLineOpacity light 分支为 `0`（横线不可见）
- [x] 背景只有流光曲线和数据点

## 深色模式不变
- [x] gridLineOpacity dark 分支保持 `0.08`
- [x] 流光曲线、数据点颜色不变

## 验证
- [x] `npx tsc --noEmit` 无错误
- [x] `npx vite build` 成功
- [x] 变更已提交并推送到 origin/main
