# Checklist

- [x] chartRef 容器 className 已改为 `h-[420px] md:h-[560px] lg:h-[680px]`，其他类保留
- [x] 初始化 fontSize 算法：基于 `innerWidth * 0.095` 与 `chartH * 0.68` 取 min，再 clamp 到 [48, 200]；chartH 优先读 clientHeight 并带 fallback
- [x] handleResize 同样按新公式重算 fontSize，并在 setOption 后调用 myChart.resize()
- [x] 其他配置不变：text `' welcome '`、top `'middle'`/left `'center'`、z:100、textPadding、shadowBlur/Color、stroke `'#6C3B9A'`、最终 fill `'#FFFFFF'`、keyframeAnimation
- [x] `npm run build` exit 0，TypeScript 无错误
- [x] 浏览器验证（桌面端 1440 宽）：welcome 字号明显变大（≈ 137），W 左缘与 e 右缘描边完整，上下不裁切
- [x] 浏览器验证（移动端公式验证）：375 × 420 → min(36, 286) → max(48, 36) = 48px，welcome 总宽 ≈ 324px < 375px，横向不溢出
- [x] 窗口 resize 后字号自动重新计算且仍完整
- [x] git commit 并 push origin main，Cloudflare Pages 部署成功
