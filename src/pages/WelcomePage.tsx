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
    // 冰蓝 → 暗紫 渐变实线 + 三角光标；浅色模式加深保证对比度
    lineGradStart: isDark ? '#6BC5E8' : '#2B7FA8',
    lineGradEnd:   isDark ? '#7B4B9E' : '#5B2E7D',
    lineGlow:      isDark ? 'rgba(107,197,232,0.55)' : 'rgba(43,127,168,0.35)',
    cursorFill:    isDark ? '#6BC5E8' : '#2B7FA8',
    cursorGlow: isDark
      ? 'drop-shadow(0 0 4px rgba(107,197,232,0.9))'
      : 'drop-shadow(0 0 3px rgba(43,127,168,0.5))',
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

  // 唯一主角光标的关键帧：波峰处生长+跃起换角，平缓/下降段缩成小光点滑行
  const cursorKeyframes = linePoints
    .map((p, i) => {
      const progress = (trackCumulative[i] / trackTotal) * 100;
      const isPeak = peakIndexes.includes(i);
      const nextIsPeak = peakIndexes.includes(i + 1);
      const peaksPassed = peakIndexes.filter((k) => k <= i).length;
      const easing = nextIsPeak ? 'ease-out' : isPeak ? 'ease-in' : 'linear';
      return `${progress.toFixed(2)}% {
            left: ${((p.x / 1280) * 100).toFixed(3)}%;
            top: ${(((p.y / 720) * 100) - (isPeak ? 3 : 0)).toFixed(3)}%;
            opacity: ${isPeak ? 1 : 0.3};
            transform: translate(-50%, -50%) rotate(${peaksPassed * 120}deg) scale(${isPeak ? 1.15 : 0.34});
            animation-timing-function: ${easing};
          }`;
    })
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
        @keyframes cursor-run {
          ${cursorKeyframes}
        }
      `}</style>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.9]"
        viewBox="0 0 1280 720"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="glowLineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={colors.lineGradStart} />
            <stop offset="100%" stopColor={colors.lineGradEnd} />
          </linearGradient>
        </defs>
        <line x1={0} y1={180} x2={1280} y2={180} stroke={colors.gridLineStroke} strokeWidth="0.5" opacity={`${colors.gridLineOpacity}`} />
        <line x1={0} y1={360} x2={1280} y2={360} stroke={colors.gridLineStroke} strokeWidth="0.5" opacity={`${colors.gridLineOpacity}`} />
        <line x1={0} y1={540} x2={1280} y2={540} stroke={colors.gridLineStroke} strokeWidth="0.5" opacity={`${colors.gridLineOpacity}`} />
        <line x1={0} y1={720} x2={1280} y2={720} stroke={colors.gridLineStroke} strokeWidth="0.5" opacity={`${colors.gridLineOpacity}`} />
        {/* 冰蓝→暗紫渐变实线：沿 12 个节点绘制，带外发光 */}
        <path
          d={linePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
          fill="none"
          stroke="url(#glowLineGrad)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: `drop-shadow(0 0 4px ${colors.lineGlow}) drop-shadow(0 0 10px ${colors.lineGlow})`,
          }}
        />
      </svg>

      {/* 唯一主角光标：沿折线从左到右跑酷，波峰处生长跃起换角，平缓段缩成小光点
          位置用与背景 SVG 一致的百分比映射（x/1280、y/720），任意分辨率都贴合折线 */}
      <span
        className="absolute pointer-events-none"
        style={{
          left: '0%',
          top: '88.889%',
          animation: 'cursor-run 9s linear infinite',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 16 16" style={{ display: 'block', filter: colors.cursorGlow }}>
          <polygon points="8,1.2 14.8,12.9 1.2,12.9" fill={colors.cursorFill} />
        </svg>
      </span>

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
