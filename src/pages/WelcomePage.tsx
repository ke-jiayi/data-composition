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
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-950 via-[#0a0f1e] to-slate-950 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      {/* 装饰光晕 */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJhMzA0MCIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=')] opacity-30 pointer-events-none" />

      {/* 主内容 */}
      <div className="relative z-10 text-center px-4">
        {/* 顶部图标 */}
        <div className="mb-6 text-6xl md:text-7xl animate-bounce-slow">📊</div>

        {/* 主标题 */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide text-white mb-6">
          <span className="bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent">
            欢迎来到我的个人数据收集网址
          </span>
        </h1>

        {/* 副标题装饰线 */}
        <div className="mx-auto w-40 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-8" />

        {/* 副标题描述 */}
        <p className="text-sm md:text-base text-gray-400 tracking-[0.3em] mb-20">
          DATA&nbsp;&nbsp;PORTFOLIO&nbsp;&nbsp;·&nbsp;&nbsp;数据作品集
        </p>

        {/* 进入提示 */}
        <div
          className={`transition-all duration-1000 ${
            showEnter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-300 text-sm backdrop-blur-sm animate-pulse hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-colors">
            <span>点击任意位置进入</span>
            <span className="text-lg">→</span>
          </div>
        </div>
      </div>

      {/* 底部版权 */}
      <div className="absolute bottom-6 text-xs text-gray-500/80 tracking-widest">
        © 2026 Data Portfolio · Click to enter
      </div>
    </div>
  );
}

export default WelcomePage;
