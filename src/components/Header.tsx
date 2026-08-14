import { useState, useEffect } from 'react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');
  const timeStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-18 bg-[#0a0e1a]/80 backdrop-blur-md border-b border-purple-500/30 shadow-[0_2px_20px_rgba(168,85,247,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          <button
            onClick={onToggleSidebar}
            className="flex items-center gap-2 text-cyan-300 hover:text-purple-400 transition-colors"
            aria-label="Toggle sidebar"
          >
            <span
              className="text-3xl leading-none"
              style={{
                fontFamily: 'XiQueMeiHua, "KaiTi", "STKaiti", cursive, serif',
                fontWeight: 'normal',
                color: '#6BC5E8',
                textShadow: '0 0 8px #6BC5E8, 0 0 20px rgba(107, 197, 232, 0.3)',
              }}
            >
              K
            </span>
            <span
              className="text-3xl leading-none -ml-1"
              style={{
                color: '#6BC5E8',
                textShadow: '0 0 8px #6BC5E8, 0 0 20px rgba(107, 197, 232, 0.3)',
              }}
            >
              .
            </span>
            <span className="text-xl font-semibold">导航</span>
          </button>
          <span
            className="text-lg font-mono tabular-nums"
            style={{ color: '#6BC5E8' }}
          >
            {timeStr}
          </span>
        </div>
      </div>
    </header>
  );
}
