import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function WelcomePage() {
  const navigate = useNavigate();
  const [showEnter, setShowEnter] = useState(false);

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
            fill: #FFFFFF;
          }
        }
        @keyframes neon-flicker {
          0%, 100% {
            opacity: 1;
            text-shadow: 0 0 5px #5FFBF1, 0 0 10px #5FFBF1;
          }
          50% {
            opacity: 0.85;
            text-shadow: 0 0 4px #5FFBF1, 0 0 8px #5FFBF1;
          }
        }
      `}</style>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.55]"
        viewBox="0 0 1280 720"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7B4B9E" />
            <stop offset="100%" stopColor="#6BC5E8" />
          </linearGradient>
          <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <line x1={0} y1={180} x2={1280} y2={180} stroke="#7B4B9E" strokeWidth="0.5" opacity="0.08" />
        <line x1={0} y1={360} x2={1280} y2={360} stroke="#7B4B9E" strokeWidth="0.5" opacity="0.08" />
        <line x1={0} y1={540} x2={1280} y2={540} stroke="#7B4B9E" strokeWidth="0.5" opacity="0.08" />
        <line x1={0} y1={720} x2={1280} y2={720} stroke="#7B4B9E" strokeWidth="0.5" opacity="0.08" />
        <path
          id="mainPath"
          d="M0,640 L160,620 L260,480 L360,560 L480,280 L580,400 L720,180 L820,320 L960,120 L1080,240 L1200,180 L1280,220"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="3"
          filter="url(#softGlow)"
        />
        {[0, 2, 4, 6, 8, 11].map((i) => (
          <circle
            key={i}
            cx={linePoints[i].x}
            cy={linePoints[i].y}
            r={3.5}
            fill="#6BC5E8"
            opacity="0.85"
            filter="url(#softGlow)"
          />
        ))}
        <circle r="5.5" fill="#6BC5E8" filter="url(#softGlow)">
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#mainPath" />
          </animateMotion>
        </circle>
      </svg>

      <div className="relative z-10 text-center px-4">
        <div className="w-full h-[420px] md:h-[560px] lg:h-[680px] pointer-events-none mb-4 flex items-center justify-center overflow-hidden">
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
              stroke="#6C3B9A"
              strokeWidth="2"
              strokeDasharray="200"
              strokeDashoffset="200"
              fill="transparent"
              style={{
                animation: 'welcome-draw 3s ease-in-out infinite',
                filter: 'drop-shadow(0 0 8px rgba(107, 197, 232, 0.25))',
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
          style={{ marginTop: '20px' }}
        >
          <p
            className="neon-enter-hint"
            style={{
              fontSize: '22px',
              color: '#5FFBF1',
              fontWeight: 'bold',
              fontFamily: 'Arial, sans-serif',
              letterSpacing: '0.15em',
              textShadow: '0 0 5px #5FFBF1, 0 0 10px #5FFBF1',
              animation: 'neon-flicker 4s ease-in-out infinite',
              cursor: 'pointer',
              transition: 'text-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = '0 0 8px #5FFBF1, 0 0 16px #5FFBF1, 0 0 24px #5FFBF1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = '0 0 5px #5FFBF1, 0 0 10px #5FFBF1';
            }}
          >
            点击任意位置进入 →
          </p>
        </div>

        <div className="mx-auto w-32 h-[1.5px] bg-gradient-to-r from-transparent via-[#5BB8D9] to-transparent mb-6" />

        <p className="text-sm md:text-base text-[#7B4B9E]/75 tracking-[0.3em] mb-16">
          DATA&nbsp;&nbsp;PORTFOLIO&nbsp;&nbsp;·&nbsp;&nbsp;数据作品集
        </p>
      </div>

      <div className="absolute bottom-6 text-xs text-[#7B4B9E]/50 tracking-widest">
        © 2026 Data Portfolio · Click to enter
      </div>
    </div>
  );
}

export default WelcomePage;
