const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PORT = 5173;
const BASE_URL = `http://localhost:${PORT}`;
const SCREENSHOT_DIR = __dirname;
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('=== 启动验证流程 ===');
  console.log(`目标 URL: ${BASE_URL}`);
  console.log(`使用浏览器: Edge @ ${EDGE_PATH}`);
  
  const browser = await chromium.launch({ headless: true, executablePath: EDGE_PATH, channel: 'msedge' });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  const consoleMessages = [];
  const newConsoleMessages = [];
  
  page.on('console', (msg) => {
    const entry = { type: msg.type(), text: msg.text(), time: new Date().toISOString() };
    consoleMessages.push(entry);
  });
  
  try {
    console.log('\n[步骤1] 导航到 / ...');
    await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
    await sleep(1000);
    
    console.log('[步骤2] 执行硬刷新 location.reload(true) ...');
    page.removeAllListeners('console');
    await page.evaluate(() => { location.reload(true); });
    await sleep(2000);
    
    console.log('[步骤3] 等待 6000ms (ECharts初始化+动画启动) ...');
    await sleep(6000);
    
    page.on('console', (msg) => {
      const entry = { type: msg.type(), text: msg.text(), time: new Date().toISOString() };
      newConsoleMessages.push(entry);
    });
    
    console.log('[步骤4] 截图 S1 + 清空 console ...');
    const s1Path = path.join(SCREENSHOT_DIR, 'S1.png');
    await page.screenshot({ path: s1Path, fullPage: true });
    console.log(`  S1 已保存: ${s1Path}`);
    await page.evaluate(() => { console.clear(); });
    newConsoleMessages.length = 0;
    
    console.log('\n[步骤5] 再等待 3500ms ...');
    await sleep(3500);
    
    console.log('[步骤6] 截图 S2 + 获取 console messages ...');
    const s2Path = path.join(SCREENSHOT_DIR, 'S2.png');
    await page.screenshot({ path: s2Path, fullPage: true });
    console.log(`  S2 已保存: ${s2Path}`);
    console.log(`  清空后新产生的 console 消息数量: ${newConsoleMessages.length}`);
    newConsoleMessages.forEach((m, i) => console.log(`    [${i}] ${m.type.toUpperCase()}: ${m.text}`));
    
    console.log('\n========== 验证 A: Welcome 字母 ==========');
    const welcomeInfo = await page.evaluate(() => {
      const letters = document.querySelectorAll('.welcome-letter, [class*="welcome"][class*="letter"], [data-welcome-letter], svg text.welcome, #welcome-svg text');
      const svgs = document.querySelectorAll('svg');
      let welcomeSVG = null;
      for (const svg of svgs) {
        if (svg.textContent && svg.textContent.toLowerCase().includes('welcome')) {
          welcomeSVG = svg;
          break;
        }
      }
      if (welcomeSVG) {
        const texts = welcomeSVG.querySelectorAll('text');
        const rect = welcomeSVG.getBoundingClientRect();
        const letterInfo = Array.from(texts).map(t => {
          const r = t.getBoundingClientRect();
          return {
            char: t.textContent?.trim(),
            x: Math.round(r.left - rect.left),
            y: Math.round(r.top - rect.top),
            w: Math.round(r.width),
            h: Math.round(r.height),
            visible: r.width > 0 && r.height > 0,
            clippedLeft: (r.left - rect.left) < -2,
            clippedRight: (r.right - rect.right) > 2,
            overflowLeft: rect.left - r.left,
            overflowRight: r.right - rect.right
          };
        });
        const svgW = Math.round(rect.width);
        const svgH = Math.round(rect.height);
        const paddingLeft = Math.round(letterInfo.length > 0 ? letterInfo[0].x : 0);
        const paddingRight = letterInfo.length > 0 ? Math.round(svgW - (letterInfo[letterInfo.length-1].x + letterInfo[letterInfo.length-1].w)) : 0;
        const firstChar = letterInfo[0];
        const hasStrokeAnimation = Array.from(welcomeSVG.querySelectorAll('animate, animateMotion, animateTransform')).length > 0 || 
          Array.from(welcomeSVG.querySelectorAll('*')).some(el => {
            const style = getComputedStyle(el);
            return style.animation && style.animation !== 'none';
          });
        return {
          svgSize: `${svgW}x${svgH}`,
          paddingLeft,
          paddingRight,
          letterCount: letterInfo.length,
          letterInfo,
          allVisible: letterInfo.every(l => l.visible),
          firstCharLeftClip: firstChar?.clippedLeft,
          firstCharRightClip: firstChar?.clippedRight,
          firstCharOverflow: { left: Math.round(firstChar?.overflowLeft||0), right: Math.round(firstChar?.overflowRight||0) },
          hasStrokeAnimation,
          computedColors: Array.from(texts).map(t => getComputedStyle(t).fill || getComputedStyle(t).stroke || '').slice(0, 3)
        };
      }
      return { error: '未找到 Welcome SVG' };
    });
    console.log(JSON.stringify(welcomeInfo, null, 2));
    
    console.log('\n========== 验证 B: 折线图 4 个峰 ==========');
    const peakInfo = await page.evaluate(() => {
      const chartDom = document.querySelector('.echarts-for-react, #main-chart, [class*="chart"], [class*="echart"], canvas, svg.echarts');
      const allDoms = document.querySelectorAll('*');
      let chartEl = null;
      for (const d of allDoms) {
        if (d.getAttribute && (d.getAttribute('_echarts_instance_') || d.getAttribute('echarts_instance'))) {
          chartEl = d;
          break;
        }
      }
      let instance = null;
      if (chartEl && window.echarts) {
        instance = window.echarts.getInstanceByDom(chartEl);
      }
      if (instance) {
        const option = instance.getOption();
        let series = null;
        if (option && option.series) {
          series = option.series.find(s => s.type === 'line') || option.series[0];
        }
        if (series && series.data) {
          const data = series.data;
          const numData = data.map((d, i) => ({
            idx: i,
            x: Array.isArray(d) ? d[0] : i,
            y: Array.isArray(d) ? d[1] : typeof d === 'number' ? d : d?.value
          })).filter(d => typeof d.y === 'number');
          const peaks = [];
          for (let i = 1; i < numData.length - 1; i++) {
            const prev = numData[i-1].y;
            const curr = numData[i].y;
            const next = numData[i+1].y;
            if (curr > prev && curr >= next) {
              peaks.push({ index: numData[i].idx, x: numData[i].x, y: numData[i].y });
            }
          }
          return {
            source: 'ECharts getOption',
            dataPointCount: numData.length,
            peakCount: peaks.length,
            peaks,
            expectedPeaks: [
              { name: '峰1', x: 260, y: 480 },
              { name: '峰2', x: 480, y: 280 },
              { name: '峰3', x: 720, y: 180 },
              { name: '峰4', x: 960, y: 120 }
            ]
          };
        }
      }
      const chartCanvas = document.querySelector('canvas[role="img"], canvas');
      if (chartCanvas) {
        const rect = chartCanvas.getBoundingClientRect();
        return {
          source: 'Canvas 检测',
          canvasSize: `${Math.round(rect.width)}x${Math.round(rect.height)}`,
          note: '无法直接读取 canvas 数据，请通过截图目测峰数'
        };
      }
      return { error: '未找到 ECharts 实例' };
    });
    console.log(JSON.stringify(peakInfo, null, 2));
    
    console.log('\n========== 验证 C: 流光小圆点位置位移 ==========');
    const glowDotInfo = await page.evaluate(() => {
      const dots = document.querySelectorAll('.glow-dot, .stream-dot, [class*="glow"][class*="dot"], [class*="流光"], [class*="stream"]');
      let pos1 = { x: -1, y: -1 };
      if (dots.length > 0) {
        const r = dots[0].getBoundingClientRect();
        pos1 = { x: Math.round(r.left + r.width/2), y: Math.round(r.top + r.height/2), w: Math.round(r.width), h: Math.round(r.height) };
      }
      const allCircles = document.querySelectorAll('circle');
      let brightCircles = [];
      for (const c of allCircles) {
        const style = getComputedStyle(c);
        const fill = style.fill?.toLowerCase() || '';
        const stroke = style.stroke?.toLowerCase() || '';
        const filter = style.filter || '';
        if (fill.includes('#87ceeb') || fill.includes('cyan') || fill.includes('aqua') ||
            stroke.includes('#87ceeb') || stroke.includes('cyan') || stroke.includes('aqua') ||
            fill.includes('#00ffff') || fill.includes('skyblue') || fill.includes('lightblue') ||
            fill.includes('#4fc3f7') || fill.includes('#29b6f6') || fill.includes('#03a9f4') ||
            filter.includes('blur') || filter.includes('glow') || style.opacity > 0.8) {
          const r = c.getBoundingClientRect();
          brightCircles.push({
            cx: +(c.getAttribute('cx') || 0),
            cy: +(c.getAttribute('cy') || 0),
            r: +(c.getAttribute('r') || 0),
            fill: style.fill,
            stroke: style.stroke,
            screenX: Math.round(r.left + r.width/2),
            screenY: Math.round(r.top + r.height/2),
            w: Math.round(r.width),
            h: Math.round(r.height)
          });
        }
      }
      return {
        dotElementCount: dots.length,
        brightCircleCount: brightCircles.length,
        dotPosS1: dots.length > 0 ? pos1 : null,
        brightCirclesS1: brightCircles.slice(0, 10),
        svgAnimateCount: document.querySelectorAll('animate, animateMotion, animateTransform').length
      };
    });
    console.log('S1 时流光位置信息:');
    console.log(JSON.stringify(glowDotInfo, null, 2));
    
    console.log('\n[步骤7] 再等待 2000ms，检测流光是否位移 ...');
    await sleep(2000);
    
    const glowDotInfoS2 = await page.evaluate(() => {
      const dots = document.querySelectorAll('.glow-dot, .stream-dot, [class*="glow"][class*="dot"], [class*="流光"], [class*="stream"]');
      let pos2 = { x: -1, y: -1 };
      if (dots.length > 0) {
        const r = dots[0].getBoundingClientRect();
        pos2 = { x: Math.round(r.left + r.width/2), y: Math.round(r.top + r.height/2) };
      }
      const allCircles = document.querySelectorAll('circle');
      let brightCircles = [];
      for (const c of allCircles) {
        const style = getComputedStyle(c);
        const fill = style.fill?.toLowerCase() || '';
        const stroke = style.stroke?.toLowerCase() || '';
        const filter = style.filter || '';
        if (fill.includes('#87ceeb') || fill.includes('cyan') || fill.includes('aqua') ||
            stroke.includes('#87ceeb') || stroke.includes('cyan') || stroke.includes('aqua') ||
            fill.includes('#00ffff') || fill.includes('skyblue') || fill.includes('lightblue') ||
            fill.includes('#4fc3f7') || fill.includes('#29b6f6') || fill.includes('#03a9f4') ||
            filter.includes('blur') || filter.includes('glow') || style.opacity > 0.8) {
          const r = c.getBoundingClientRect();
          brightCircles.push({
            cx: +(c.getAttribute('cx') || 0),
            cy: +(c.getAttribute('cy') || 0),
            r: +(c.getAttribute('r') || 0),
            screenX: Math.round(r.left + r.width/2),
            screenY: Math.round(r.top + r.height/2)
          });
        }
      }
      return {
        dotElementCount: dots.length,
        brightCircleCount: brightCircles.length,
        dotPosS2: dots.length > 0 ? pos2 : null,
        brightCirclesS2: brightCircles.slice(0, 10)
      };
    });
    console.log('S2 时流光位置信息:');
    console.log(JSON.stringify(glowDotInfoS2, null, 2));
    
    console.log('\n========== 验证跳转 /home ==========');
    console.log('[步骤8] 点击页面主体跳转到 /home ...');
    await page.evaluate(() => {
      const main = document.querySelector('main, #root, .app, body');
      if (main) {
        const rect = main.getBoundingClientRect();
        const evt = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height / 2
        });
        main.dispatchEvent(evt);
      }
    });
    await sleep(2000);
    const urlAfterClick = page.url();
    console.log(`  点击后 URL: ${urlAfterClick}`);
    
    const backButtonInfo = await page.evaluate(() => {
      const link = document.querySelector('a[href="/"]');
      if (!link) {
        const links = document.querySelectorAll('a');
        const all = Array.from(links).map(a => ({ text: a.textContent?.trim(), href: a.getAttribute('href') }));
        return { found: false, allLinks: all };
      }
      const r = link.getBoundingClientRect();
      const style = getComputedStyle(link);
      return {
        found: true,
        text: link.textContent?.trim(),
        href: link.getAttribute('href'),
        position: `x:${Math.round(r.left)},y:${Math.round(r.top)}`,
        size: `${Math.round(r.width)}x${Math.round(r.height)}`,
        visible: r.width > 0 && r.height > 0 && r.top >= 0,
        style: {
          color: style.color,
          background: style.backgroundColor,
          padding: style.padding,
          borderRadius: style.borderRadius
        }
      };
    });
    console.log('返回按钮信息:');
    console.log(JSON.stringify(backButtonInfo, null, 2));
    
    if (backButtonInfo.found) {
      console.log('\n[步骤9] 点击返回按钮跳回 / ...');
      await page.evaluate(() => {
        document.querySelector('a[href="/"]').click();
      });
      await sleep(2000);
      const urlAfterBack = page.url();
      console.log(`  返回后 URL: ${urlAfterBack}`);
      console.log(`  跳转成功: ${urlAfterBack === BASE_URL + '/' || urlAfterBack === BASE_URL}`);
    }
    
    console.log('\n========== 阻断性 JS 错误检查 ==========');
    const blockingErrors = newConsoleMessages.filter(m => 
      m.type === 'error' && !m.text.includes('DevTools') && !m.text.includes('source map') && !m.text.includes('SourceMap') && !m.text.includes('HMR') && !m.text.includes('[vite]')
    );
    console.log(`  清空后总消息数: ${newConsoleMessages.length}`);
    console.log(`  阻断性错误数: ${blockingErrors.length}`);
    blockingErrors.forEach((e, i) => console.log(`    ERROR[${i}]: ${e.text}`));
    
    console.log('\n=== 验证流程完成 ===');
    
  } catch (err) {
    console.error('验证过程中发生错误:', err);
  } finally {
    await browser.close();
  }
}

main();
