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

  return (
    <div
      onClick={handleEnter}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a0e1a] via-[#0f0a1e] to-[#0a0e1a] flex flex-col items-center justify-center cursor-pointer select-none"
    >
      {/* 装饰光晕 */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* 紫色流光折线图背景 */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
        viewBox="0 0 1280 600"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* 垂直网格线 */}
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 80}
            y1={0}
            x2={i * 80}
            y2={600}
            stroke="#a855f7"
            strokeWidth="0.5"
            opacity="0.08"
          />
        ))}
        {/* 水平网格线 */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={i * 75}
            x2={1280}
            y2={i * 75}
            stroke="#a855f7"
            strokeWidth="0.5"
            opacity="0.08"
          />
        ))}
        {/* 第三条折线（底层，最浅） */}
        <path
          d="M0,500 L100,480 L200,490 L300,460 L400,470 L500,450 L600,460 L700,440 L800,450 L900,430 L1000,440 L1100,420 L1200,430 L1280,410"
          fill="none"
          stroke="#7c3aed"
          strokeWidth="2"
          opacity="0.4"
          filter="url(#glow)"
        />
        {/* 第二条折线（中层） */}
        <path
          d="M0,400 L100,380 L200,350 L300,370 L400,320 L500,340 L600,300 L700,310 L800,270 L900,290 L1000,250 L1100,260 L1200,230 L1280,240"
          fill="none"
          stroke="#d946ef"
          strokeWidth="2.5"
          opacity="0.6"
          filter="url(#glow)"
        />
        {/* 第一条折线（顶层，最亮） */}
        <path
          d="M0,300 L100,250 L200,280 L300,200 L400,230 L500,150 L600,180 L700,100 L800,140 L900,80 L1000,120 L1100,60 L1200,90 L1280,40"
          fill="none"
          stroke="#a855f7"
          strokeWidth="2.5"
          opacity="0.8"
          filter="url(#glow)"
        />
      </svg>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJhMzA0MCIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=')] opacity-30 pointer-events-none" />

      {/* 主内容 */}
      <div className="relative z-10 text-center px-4">
        {/* 主标题 */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide text-white mb-6">
          <span className="bg-gradient-to-r from-cyan-300 via-purple-200 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            欢迎来到我的个人数据收集网址
          </span>
        </h1>

        {/* 副标题装饰线 */}
        <div className="mx-auto w-40 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent mb-8 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />

        {/* 副标题描述 */}
        <p className="text-sm md:text-base text-purple-200/60 tracking-[0.3em] mb-20">
          DATA&nbsp;&nbsp;PORTFOLIO&nbsp;&nbsp;·&nbsp;&nbsp;数据作品集
        </p>

        {/* 进入提示 */}
        <div
          className={`transition-all duration-1000 ${
            showEnter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-200 text-sm backdrop-blur-sm animate-pulse hover:bg-purple-500/20 hover:border-purple-400/70 transition-colors">
            <span>点击任意位置进入</span>
            <span className="text-lg">→</span>
          </div>
        </div>
      </div>

      {/* 底部版权 */}
      <div className="absolute bottom-6 text-xs text-purple-300/40 tracking-widest">
        © 2026 Data Portfolio · Click to enter
      </div>
    </div>
  );
}

export default WelcomePage;
