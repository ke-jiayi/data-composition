import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme } from '../hooks/useTheme';

export function WelcomePage() {
  const navigate = useNavigate();
  const [showEnter, setShowEnter] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = {
    welcomeDrawFill: isDark ? '#FFFFFF' : '#1A1A2E',
    welcomeStroke:  isDark ? '#6C3B9A' : '#0EA5E9',
    welcomeDropShadow: isDark
      ? 'drop-shadow(0 0 8px rgba(107,197,232,0.25))'
      : 'drop-shadow(0 0 4px rgba(14,165,233,0.3))',
    neonColor: isDark ? '#5FFBF1' : '#0891B2',
    neonGlow: isDark
      ? '0 0 5px #5FFBF1, 0 0 10px #5FFBF1'
      : '0 0 4px rgba(8,145,178,0.35), 0 0 8px rgba(8,145,178,0.2)',
    neonGlowHover: isDark
      ? '0 0 8px #5FFBF1, 0 0 16px #5FFBF1, 0 0 24px #5FFBF1'
      : '0 0 6px rgba(8,145,178,0.5), 0 0 12px rgba(8,145,178,0.35), 0 0 18px rgba(8,145,178,0.25)',
    gridLineStroke:  isDark ? '#7B4B9E' : '#34D399',
    gridLineOpacity: isDark ? 0.08 : 0,
    // 冰蓝 → 暗紫 渐变实线 + 三角光标；浅色模式亮青/天蓝系
    lineGradStart: isDark ? '#6BC5E8' : '#00B4D8',
    lineGradEnd:   isDark ? '#7B4B9E' : '#3B82F6',
    lineGlow:      isDark ? 'rgba(107,197,232,0.55)' : 'rgba(0,180,216,0.40)',
    trackStroke: isDark ? 'rgba(100,116,139,0.30)' : '#E2E8F0',
    heroFill: isDark ? '#E8FDFF' : '#00B4D8',
    heroGlow: isDark
      ? 'drop-shadow(0 0 6px rgba(95,251,241,0.95)) drop-shadow(0 0 14px rgba(95,251,241,0.6))'
      : 'drop-shadow(0 0 4px rgba(0,180,216,0.75)) drop-shadow(0 0 10px rgba(0,180,216,0.45))',
    heroGlowBurst: isDark
      ? 'drop-shadow(0 0 9px rgba(95,251,241,1)) drop-shadow(0 0 21px rgba(95,251,241,0.8))'
      : 'drop-shadow(0 0 7px rgba(0,180,216,1)) drop-shadow(0 0 16px rgba(0,180,216,0.7))',
    tailStroke: isDark ? '#5FFBF1' : '#00B4D8',
    tailGlow: isDark
      ? 'drop-shadow(0 0 6px rgba(95,251,241,0.8))'
      : 'drop-shadow(0 0 4px rgba(0,180,216,0.6))',
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowEnter(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    navigate('/home');
  };

  const linePoints = [
    { x: 0,    y: 640 },
    { x: 160,  y: 620 },
    { x: 260,  y: 480 },
    { x: 360,  y: 560 },
    { x: 480,  y: 280 },
    { x: 580,  y: 400 },
    { x: 720,  y: 180 },
    { x: 820,  y: 320 },
    { x: 960,  y: 120 },
    { x: 1080, y: 240 },
    { x: 1200, y: 180 },
    { x: 1280, y: 220 },
  ];

  // 折线行程：按累计弧长分配时间，使滑行阶段基本匀速
  const segmentLengths = linePoints.slice(0, -1).map((p, i) => {
    const next = linePoints[i + 1];
    return Math.hypot(next.x - p.x, next.y - p.y);
  });
  const trackTotal = segmentLengths.reduce((sum, len) => sum + len, 0);
  const trackCumulative = segmentLengths.reduce<number[]>(
    (acc, len) => [...acc, acc[acc.length - 1] + len],
    [0],
  );
  // 上凸顶点（y 局部最小）所在节点索引
  const peakIndexes = [2, 4, 6, 8, 10];

  // 位置关键帧：仅 left/top，按累计弧长分配进度，配合 linear 实现全程匀速
  const moveKeyframes = linePoints
    .map((p, i) => {
      const progress = (trackCumulative[i] / trackTotal) * 100;
      return `${progress.toFixed(2)}% {
            left: ${((p.x / 1280) * 100).toFixed(3)}%;
            top: ${((p.y / 720) * 100).toFixed(3)}%;
            animation-timing-function: linear;
          }`;
    })
    .join('\n          ');

  // 爆闪关键帧：仅在波峰（节点 2/4/6/8/10）处将 drop-shadow 发光增强约 1.5 倍再恢复
  const burstFrames: { pct: number; glow: string }[] = [{ pct: 0, glow: colors.heroGlow }];
  peakIndexes.forEach((idx) => {
    const p = (trackCumulative[idx] / trackTotal) * 100;
    burstFrames.push(
      { pct: Math.max(p - 1.3, burstFrames[burstFrames.length - 1].pct + 0.01), glow: colors.heroGlow },
      { pct: p, glow: colors.heroGlowBurst },
      { pct: p + 1.3, glow: colors.heroGlow },
    );
  });
  burstFrames.push({ pct: 100, glow: colors.heroGlow });
  const burstKeyframes = burstFrames
    .map(
      (f) => `${f.pct.toFixed(2)}% {
            filter: ${f.glow};
            animation-timing-function: linear;
          }`,
    )
    .join('\n          ');

  return (
    <div
      onClick={handleEnter}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#1A1A1E] via-[#1E1E24] to-[#1A1A1E] flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <style>{`
        @keyframes welcome-draw {
          0% {
            stroke-dashoffset: 200;
            fill: transparent;
          }
          70% {
            stroke-dashoffset: 0;
            fill: transparent;
          }
          100% {
            stroke-dashoffset: 0;
            fill: ${colors.welcomeDrawFill};
          }
        }
        @keyframes neon-flicker {
          0%, 100% {
            opacity: 1;
            text-shadow: ${colors.neonGlow};
          }
          50% {
            opacity: 0.85;
            text-shadow: ${colors.neonGlow};
          }
        }
        @keyframes line-grow {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes cursor-move {
          ${moveKeyframes}
        }
        @keyframes cursor-burst {
          ${burstKeyframes}
        }
        @keyframes line-tail {
          from { stroke-dashoffset: 6; }
          to { stroke-dashoffset: -94; }
        }
      `}</style>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.9]"
        viewBox="0 0 1280 720"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="glowLineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" style={{ stopColor: colors.lineGradStart, transition: 'stop-color 0.4s ease' }} />
            <stop offset="100%" style={{ stopColor: colors.lineGradEnd, transition: 'stop-color 0.4s ease' }} />
          </linearGradient>
        </defs>
        <line x1={0} y1={180} x2={1280} y2={180} strokeWidth="0.5" style={{ stroke: colors.gridLineStroke, opacity: colors.gridLineOpacity, transition: 'stroke 0.4s ease, opacity 0.4s ease' }} />
        <line x1={0} y1={360} x2={1280} y2={360} strokeWidth="0.5" style={{ stroke: colors.gridLineStroke, opacity: colors.gridLineOpacity, transition: 'stroke 0.4s ease, opacity 0.4s ease' }} />
        <line x1={0} y1={540} x2={1280} y2={540} strokeWidth="0.5" style={{ stroke: colors.gridLineStroke, opacity: colors.gridLineOpacity, transition: 'stroke 0.4s ease, opacity 0.4s ease' }} />
        <line x1={0} y1={720} x2={1280} y2={720} strokeWidth="0.5" style={{ stroke: colors.gridLineStroke, opacity: colors.gridLineOpacity, transition: 'stroke 0.4s ease, opacity 0.4s ease' }} />
        {/* 底层未激活轨道：半透明暗灰细线 */}
        <path
          d={linePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            stroke: colors.trackStroke,
            transition: 'stroke 0.4s ease',
          }}
        />
        {/* 顶层渐变亮线：pathLength 归一化后用 dashoffset 从左到右匀速点亮，与主角光标同步（同 9s linear） */}
        <path
          d={linePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
          fill="none"
          stroke="url(#glowLineGrad)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={100}
          style={{
            strokeDasharray: '100',
            animation: 'line-grow 9s linear infinite',
            filter: `drop-shadow(0 0 4px ${colors.lineGlow}) drop-shadow(0 0 10px ${colors.lineGlow})`,
            transition: 'filter 0.4s ease',
          }}
        />
        {/* 彗星尾迹：约 6% 弧长（≈120px）的亮青短划，始终贴在主角身后；dasharray 间隙 200>100，循环无环绕残段 */}
        <path
          d={linePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
          fill="none"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={100}
          opacity={0.85}
          style={{
            stroke: colors.tailStroke,
            strokeDasharray: '6 200',
            animation: 'line-tail 9s linear infinite',
            filter: colors.tailGlow,
            transition: 'stroke 0.4s ease, filter 0.4s ease',
          }}
        />
      </svg>

      {/* 主角光标 + 3 个拖尾三角：同一动画的相位延迟副本，模拟流星拖尾（Star-trail）
          外层 span 负责位置（cursor-move），内层 span 负责波峰爆闪（cursor-burst 发光增强），
          位置用与背景 SVG 一致的百分比映射（x/1280、y/720），任意分辨率都贴合折线 */}
      {[
        { size: 24, opacity: 1, delay: 0 },
        { size: 18, opacity: 0.6, delay: 0.18 },
        { size: 13, opacity: 0.4, delay: 0.36 },
        { size: 9, opacity: 0.2, delay: 0.54 },
      ].map((c) => (
        <span
          key={c.delay}
          className="absolute pointer-events-none"
          style={{
            left: '0%',
            top: '88.889%',
            transform: 'translate(-50%, -50%)',
            animation: `cursor-move 9s linear ${c.delay}s infinite both`,
          }}
        >
          <span
            style={{
              display: 'block',
              animation: `cursor-burst 9s linear ${c.delay}s infinite both`,
            }}
          >
            <svg
              width={c.size}
              height={c.size}
              viewBox="0 0 16 16"
              style={{ display: 'block', opacity: c.opacity, filter: colors.heroGlow, transition: 'filter 0.4s ease, opacity 0.4s ease' }}
            >
              <polygon points="8,1.2 14.8,12.9 1.2,12.9" style={{ fill: colors.heroFill, transition: 'fill 0.4s ease' }} />
            </svg>
          </span>
        </span>
      ))}

      <div className="relative z-10 text-center px-4">
        <div className="w-full h-[420px] md:h-[560px] lg:h-[440px] pointer-events-none mb-4 flex items-center justify-center overflow-hidden">
          <svg
            viewBox="0 0 600 200"
            className="w-full h-full max-w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="85"
              fontWeight="bold"
              fontFamily="Inter, system-ui, 'Segoe UI', Roboto, sans-serif"
              stroke={`${colors.welcomeStroke}`}
              strokeWidth="2"
              strokeDasharray="200"
              strokeDashoffset="200"
              fill="transparent"
              style={{
                animation: 'welcome-draw 3s ease-in-out infinite',
                filter: `${colors.welcomeDropShadow}`,
              }}
            >
              welcome
            </text>
          </svg>
        </div>

        <div
          className={`transition-all duration-1000 ${
            showEnter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ marginTop: '12px', marginBottom: '24px' }}
        >
          <p
            className="neon-enter-hint"
            style={{
              fontSize: '26px',
              color: colors.neonColor,
              fontWeight: 'bold',
              fontFamily: 'Arial, sans-serif',
              letterSpacing: '0.15em',
              textShadow: colors.neonGlow,
              animation: 'neon-flicker 4s ease-in-out infinite',
              cursor: 'pointer',
              transition: 'text-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = colors.neonGlowHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = colors.neonGlow;
            }}
          >
            点击任意位置进入 →
          </p>
        </div>

        <div className="mx-auto w-32 h-[1.5px] bg-gradient-to-r from-transparent via-[#5BB8D9] to-transparent mb-6" />

        <p className="text-sm md:text-base text-[#7B4B9E]/75 tracking-[0.3em] mb-8">
          DATA&nbsp;&nbsp;PORTFOLIO&nbsp;&nbsp;·&nbsp;&nbsp;数据作品集
        </p>
      </div>

      <div className="absolute bottom-6 text-xs text-[#7B4B9E]/50 tracking-widest">
        © 2026 Data Portfolio · Click to enter
      </div>

      {/* 日夜切换拖拽条 */}
      <div className="absolute top-6 right-6 z-20" onClick={(e) => e.stopPropagation()}>
        <ThemeToggle />
      </div>
    </div>
  );
}

export default WelcomePage;
