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
  console.log('=== 启动验证流程（V2增强版） ===');
  console.log(`目标 URL: ${BASE_URL}`);
  console.log(`使用浏览器: Edge @ ${EDGE_PATH}`);
  
  const browser = await chromium.launch({ headless: true, executablePath: EDGE_PATH, channel: 'msedge' });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  const newConsoleMessages = [];
  
  try {
    console.log('\n[步骤1] 导航到 / 并等待加载...');
    await page.goto(BASE_URL + '/', { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(1500);
    
    console.log('[步骤2] 执行硬刷新 location.reload(true) ...');
    await page.evaluate(() => { location.reload(true); });
    await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    await sleep(2000);
    
    console.log('[步骤3] 等待 6500ms (ECharts初始化+至少一轮描边动画)...');
    await sleep(6500);
    
    page.on('console', (msg) => {
      newConsoleMessages.push({ type: msg.type(), text: msg.text() });
    });
    
    console.log('[步骤4] 全页截图 S1 + console.clear() ...');
    const s1Path = path.join(SCREENSHOT_DIR, 'S1.png');
    await page.screenshot({ path: s1Path, fullPage: true });
    console.log(`  ✓ S1 已保存: ${s1Path}`);
    await page.evaluate(() => { console.clear(); });
    newConsoleMessages.length = 0;
    
    console.log('\n[步骤5] 再等待 3500ms...');
    await sleep(3500);
    
    console.log('[步骤6] 截图 S2 + 获取清空后 console messages...');
    const s2Path = path.join(SCREENSHOT_DIR, 'S2.png');
    await page.screenshot({ path: s2Path, fullPage: true });
    console.log(`  ✓ S2 已保存: ${s2Path}`);
    console.log(`  清空后新产生 console: ${newConsoleMessages.length} 条`);
    newConsoleMessages.forEach((m, i) => console.log(`    [${i}] ${m.type.toUpperCase()}: ${m.text.substring(0, 200)}`));
    
    console.log('\n========== 验证 A: Welcome 7 字母 ==========');
    const letterCheck = await page.evaluate(() => {
      const echartsDiv = document.querySelector('div[_echarts_instance_], div[style*="width"], div[class*="chart"]');
      const canvasList = document.querySelectorAll('canvas');
      let chartCanvas = null;
      for (const c of canvasList) {
        const pr = c.parentElement;
        if (pr && (pr.getAttribute('_echarts_instance_') || pr.querySelector && pr.querySelector('[_echarts_instance_]'))) {
          chartCanvas = c;
          break;
        }
      }
      const rootDiv = document.querySelector('#root > div');
      const chartContainer = document.querySelector('div.h-\\[360px\\], div.h-\\[440px\\]') || 
                            document.querySelectorAll('.relative.z-10 > div')[0];
      let containerInfo = null;
      if (chartContainer) {
        const r = chartContainer.getBoundingClientRect();
        containerInfo = {
          className: chartContainer.className.substring(0, 60),
          w: Math.round(r.width),
          h: Math.round(r.height),
          x: Math.round(r.left),
          y: Math.round(r.top),
          children: chartContainer.children.length
        };
      }
      const bodyText = document.body.innerText || '';
      const hasWelcome = bodyText.toLowerCase().includes('welcome');
      const welcomePos = bodyText.toLowerCase().indexOf('welcome');
      const aroundWelcome = welcomePos >= 0 ? 
        bodyText.substring(Math.max(0, welcomePos - 10), welcomePos + 20) : '';
      
      const svgs = document.querySelectorAll('svg');
      let mainSvgInfo = null;
      for (const svg of svgs) {
        const r = svg.getBoundingClientRect();
        if (r.width > 800 && r.height > 300) {
          mainSvgInfo = {
            w: Math.round(r.width),
            h: Math.round(r.height),
            viewBox: svg.getAttribute('viewBox'),
            textsCount: svg.querySelectorAll('text').length,
            circlesCount: svg.querySelectorAll('circle').length,
            animatesCount: svg.querySelectorAll('animate, animateMotion').length
          };
          break;
        }
      }
      
      return {
        hasWelcomeText: hasWelcome,
        welcomeTextContext: aroundWelcome,
        chartCanvasFound: !!chartCanvas,
        chartCanvasSize: chartCanvas ? `${Math.round(chartCanvas.getBoundingClientRect().width)}x${Math.round(chartCanvas.getBoundingClientRect().height)}` : null,
        chartContainerInfo: containerInfo,
        mainSvgInfo,
        svgsCount: svgs.length,
        echartInstanceAttr: echartsDiv?.getAttribute?._echarts_instance_?.substring(0, 20) || null
      };
    });
    console.log('Welcome检测:');
    console.log(JSON.stringify(letterCheck, null, 2));
    
    console.log('\n========== 验证 B: 折线图 4 个峰 ==========');
    const peakVerify = await page.evaluate(() => {
      const svgs = document.querySelectorAll('svg');
      let mainSvg = null;
      for (const s of svgs) {
        const r = s.getBoundingClientRect();
        if (r.width > 800) { mainSvg = s; break; }
      }
      let peakResult = { error: '未找到主 SVG' };
      if (mainSvg) {
        const path = mainSvg.querySelector('path#mainPath') || mainSvg.querySelector('path');
        const d = path?.getAttribute('d') || '';
        const coords = [];
        const regex = /(\d+),(\d+)/g;
        let m;
        while ((m = regex.exec(d)) !== null) {
          coords.push({ x: parseInt(m[1]), y: parseInt(m[2]) });
        }
        const peaks = [];
        for (let i = 1; i < coords.length - 1; i++) {
          const p = coords[i-1], c = coords[i], n = coords[i+1];
          if (c.y < p.y && c.y <= n.y) {
            peaks.push({ i, x: c.x, y: c.y, desc: `↑(${c.x},${c.y})` });
          }
        }
        const circles = mainSvg.querySelectorAll('circle[r="3.5"]');
        const circlePositions = Array.from(circles).map(c => ({
          cx: parseInt(c.getAttribute('cx')),
          cy: parseInt(c.getAttribute('cy'))
        }));
        peakResult = {
          pathDParsed: coords.length,
          coordsSample: coords.slice(0, 12),
          upwardPeaksCount: peaks.length,
          upwardPeaks: peaks,
          anchorCirclePoints: circlePositions,
          expectedPeakPoints: [
            { x: 260, y: 480 }, { x: 480, y: 280 },
            { x: 720, y: 180 }, { x: 960, y: 120 }
          ],
          anchorMatchExpected: [260,480,480,280,720,180,960,120].every(v => 
            circlePositions.some(cp => cp.cx === v || cp.cy === v)
          )
        };
      }
      return peakResult;
    });
    console.log('峰数验证:');
    console.log(JSON.stringify(peakVerify, null, 2));
    
    console.log('\n========== 验证 C: 流光小圆点位移 ==========');
    const glowS1 = await page.evaluate(() => {
      const svgs = document.querySelectorAll('svg');
      let mainSvg = null;
      for (const s of svgs) { if (s.getBoundingClientRect().width > 800) { mainSvg = s; break; } }
      if (!mainSvg) return { error: 'no svg' };
      const movingCircle = mainSvg.querySelector('circle > animateMotion')?.parentElement;
      if (!movingCircle) return { error: 'no moving circle' };
      const r = movingCircle.getBoundingClientRect();
      return {
        tag: movingCircle.tagName,
        r: movingCircle.getAttribute('r'),
        fill: getComputedStyle(movingCircle).fill,
        screenX: Math.round(r.left + r.width/2),
        screenY: Math.round(r.top + r.height/2),
        size: `${Math.round(r.width)}x${Math.round(r.height)}`,
        time: Date.now()
      };
    });
    console.log('流光 S1 位置:');
    console.log(JSON.stringify(glowS1, null, 2));
    
    console.log('\n  等待 2000ms 后获取 S2 位置...');
    await sleep(2000);
    
    const glowS2 = await page.evaluate(() => {
      const svgs = document.querySelectorAll('svg');
      let mainSvg = null;
      for (const s of svgs) { if (s.getBoundingClientRect().width > 800) { mainSvg = s; break; } }
      if (!mainSvg) return { error: 'no svg' };
      const movingCircle = mainSvg.querySelector('circle > animateMotion')?.parentElement;
      if (!movingCircle) return { error: 'no moving circle' };
      const r = movingCircle.getBoundingClientRect();
      return {
        tag: movingCircle.tagName,
        r: movingCircle.getAttribute('r'),
        fill: getComputedStyle(movingCircle).fill,
        screenX: Math.round(r.left + r.width/2),
        screenY: Math.round(r.top + r.height/2),
        size: `${Math.round(r.width)}x${Math.round(r.height)}`,
        time: Date.now()
      };
    });
    console.log('流光 S2 位置:');
    console.log(JSON.stringify(glowS2, null, 2));
    if (glowS1.screenX && glowS2.screenX) {
      const dx = glowS2.screenX - glowS1.screenX;
      const dy = glowS2.screenY - glowS1.screenY;
      const dist = Math.round(Math.sqrt(dx*dx + dy*dy));
      console.log(`  位移距离: ΔX=${dx}, ΔY=${dy}, 距离=${dist}px`);
      console.log(`  位移判定: ${dist > 30 ? '✓ 明显位移 (流光循环流动)' : '✗ 几乎没动'}`);
    }
    
    console.log('\n========== 验证跳转 /home & 返回按钮 ==========');
    console.log('[步骤8] 通过 navigate API 直接跳 /home（兜底: 同时点击）...');
    const urlBefore = page.url();
    
    const clickResult = await page.evaluate(() => {
      return new Promise((resolve) => {
        try {
          const tryClick = (attempt) => {
            const root = document.querySelector('#root > div') || document.body;
            if (root) {
              const r = root.getBoundingClientRect();
              const cx = r.left + r.width * 0.5;
              const cy = r.top + r.height * 0.5;
              root.dispatchEvent(new MouseEvent('click', {
                bubbles: true, cancelable: true, view: window,
                clientX: cx, clientY: cy
              }));
            }
            setTimeout(() => {
              if (!location.pathname.startsWith('/home') && attempt < 3) {
                tryClick(attempt + 1);
              } else {
                resolve({ finalPath: location.pathname, attempts: attempt });
              }
            }, 800);
          };
          setTimeout(() => tryClick(1), 100);
        } catch (e) {
          resolve({ error: String(e) });
        }
      });
    });
    console.log('  点击尝试结果:', JSON.stringify(clickResult));
    
    await sleep(1500);
    let curPath = await page.evaluate(() => location.pathname);
    if (!curPath.startsWith('/home')) {
      console.log('  点击未跳转，改用 router push...');
      await page.evaluate(() => {
        try {
          const ev = new CustomEvent('__nav_home__', { detail: '/home' });
          window.dispatchEvent(ev);
          if (window.__reactRouterNavigate) {
            window.__reactRouterNavigate('/home');
          } else {
            history.pushState({}, '', '/home');
            dispatchEvent(new PopStateEvent('popstate'));
          }
        } catch (e) {}
      });
      await sleep(2000);
      curPath = await page.evaluate(() => location.pathname);
      if (!curPath.startsWith('/home')) {
        console.log('  history push 也没渲染，使用 page.goto 直接访问 /home ...');
        await page.goto(BASE_URL + '/home', { waitUntil: 'networkidle', timeout: 30000 });
        await sleep(1500);
      }
    }
    
    const urlAfterNav = page.url();
    console.log(`  当前 URL: ${urlAfterNav}`);
    
    const backBtnCheck = await page.evaluate(() => {
      const sel = 'a[href="/"]';
      const link = document.querySelector(sel);
      const result = {
        selectorExists: !!link,
        pathname: location.pathname,
        allLinkTexts: Array.from(document.querySelectorAll('a')).map(a => ({
          text: (a.textContent || '').trim().substring(0, 30),
          href: a.getAttribute('href')
        })).slice(0, 15)
      };
      if (link) {
        const r = link.getBoundingClientRect();
        result.text = (link.textContent || '').trim();
        result.href = link.getAttribute('href');
        result.visible = r.width > 0 && r.height > 0 && r.top >= -10;
        result.position = `(${Math.round(r.left)},${Math.round(r.top)})`;
        result.size = `${Math.round(r.width)}x${Math.round(r.height)}`;
        const styles = getComputedStyle(link);
        result.style = {
          color: styles.color,
          padding: styles.padding,
          border: styles.borderColor ? `1px solid ${styles.borderColor}` : 'none',
          topRight: r.top < 200 && r.left > innerWidth * 0.7
        };
      }
      return result;
    });
    console.log('返回按钮检查:');
    console.log(JSON.stringify(backBtnCheck, null, 2));
    
    let backNavResult = { before: '', after: '', success: false };
    if (backBtnCheck.selectorExists && backBtnCheck.visible) {
      console.log('\n[步骤9] 点击 a[href="/"] 返回封面 ...');
      backNavResult.before = await page.evaluate(() => location.href);
      await page.click('a[href="/"]').catch(async (e) => {
        console.log('  Playwright click 失败，改用 JS click:', e.message);
        await page.evaluate(() => document.querySelector('a[href="/"]').click());
      });
      await sleep(1500);
      backNavResult.after = await page.evaluate(() => location.href);
      backNavResult.success = backNavResult.after === BASE_URL + '/' || backNavResult.after === BASE_URL || backNavResult.after.endsWith('/');
    }
    console.log('返回跳转结果:');
    console.log(JSON.stringify(backNavResult, null, 2));
    
    console.log('\n========== 阻断性 JS 错误 ==========');
    const blocking = newConsoleMessages.filter(m => 
      m.type === 'error' && 
      !m.text.includes('DevTools') && !m.text.includes('source map') && 
      !m.text.includes('SourceMap') && !m.text.includes('HMR') &&
      !m.text.includes('[vite]') && !m.text.includes('Preload')
    );
    console.log(`  清空后总消息: ${newConsoleMessages.length}`);
    console.log(`  阻断性错误数: ${blocking.length}`);
    blocking.forEach((e, i) => console.log(`  BLOCK_ERROR[${i}]: ${e.text.substring(0, 300)}`));
    
    console.log('\n========== ✨ 最终总结 ==========');
    console.log(`端口号: ${PORT}`);
    console.log(`S1/S2截图: OK`);
    
    console.log('\n=== 验证流程完成 ===');
    
  } catch (err) {
    console.error('\n❌ 验证过程出错:', err.message || err);
    console.error(err.stack);
  } finally {
    await browser.close();
  }
}

main();
