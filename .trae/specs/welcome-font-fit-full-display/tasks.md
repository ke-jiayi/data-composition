# welcome-font-fit-full-display - 实施计划

## [x] Task 1: 容器高度放大 + 字号自适应 Fit 算法
- **Priority**: high
- **Depends On**: None
- **Description**:
  - 在 `echarts.init(chartRef.current)` 之后，先读取 `chartRef.current.clientHeight` 作为 chartH；若为 0 或 falsy，使用 fallback：`window.innerWidth < 768 ? 420 : window.innerWidth < 1024 ? 560 : 680`
  - 计算 fontSize = `clamp(48, min(window.innerWidth * 0.095, chartH * 0.68, 200), 200)`，并 `Math.round` 取整（简化实现：`const fs = Math.max(48, Math.min(Math.round(Math.min(window.innerWidth * 0.095, chartH * 0.68)), 200));`）
  - option.graphic.elements[0].style.fontSize = fs；其他 style 完全保留
  - `chartRef` 容器 className 从 `w-full h-[360px] md:h-[440px] pointer-events-none mb-4` → **改为** `w-full h-[420px] md:h-[560px] lg:h-[680px] pointer-events-none mb-4`
  - `handleResize` 同样：重算 chartH（fallback）→ 重算 fs → `setOption` 更新 → `myChart.resize()`
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-4
- **Test Requirements**:
  - `programmatic` TR-1.1: 代码审阅 chartRef 高度改 420/560/680 三档；初始化 fontSize 算法含 min(innerWidth*0.095, chartH*0.68) + max(48) + min(200) 逻辑；handleResize 同步更新 fs 后 resize
  - `programmatic` TR-1.2: 构建 exit code 0，TS 无错
  - `human-judgement` TR-1.3: 桌面端 welcome ≥136px，W/e 描边完整无裁切；移动端 welcome 完整不溢出

## [x] Task 2: 浏览器验收 + 提交推送部署
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - 启动 dev server，桌面端 1440px 宽截图验证字号 ≥ 136、不裁切；移动端小视口验证完整不溢出；resize 切换后仍正常
  - git commit push origin main，Cloudflare Pages 自动部署成功
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-4
- **Test Requirements**:
  - `human-judgement` TR-2.1: 桌面 / 移动 / resize 三场景截图均完整
  - `programmatic` TR-2.2: push 成功，线上站点可访问

# Task Dependencies
- Task 2 depends on Task 1
