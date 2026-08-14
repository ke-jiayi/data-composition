import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as echarts from 'echarts';

export function WelcomePage() {
  const navigate = useNavigate();
  const [showEnter, setShowEnter] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowEnter(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    const myChart = echarts.init(chartRef.current);
    const width = window.innerWidth;
    const fontSize = width < 640 ? 52 : width < 1024 ? 78 : 96;
    const option = {
      graphic: {
        elements: [
          {
            type: 'text',
            left: 'center',
            top: 'center',
            style: {
              text: 'welcome',
              fontSize: fontSize,
              fontWeight: 'bold',
              textVerticalAlign: 'middle',
              lineDash: [0, 200],
              lineDashOffset: 0,
              fill: 'transparent',
              stroke: '#6BC5E8',
              lineWidth: 1.5,
            },
            keyframeAnimation: {
              duration: 3000,
              loop: true,
              keyframes: [
                {
                  percent: 0.7,
                  style: {
                    fill: 'transparent',
                    lineDashOffset: 200,
                    lineDash: [200, 0],
                  },
                },
                {
                  percent: 0.8,
                  style: {
                    fill: 'transparent',
                  },
                },
                {
                  percent: 1,
                  style: {
                    fill: '#7B4B9E',
                  },
                },
              ],
            },
          },
        ],
      },
    };
    myChart.setOption(option as any);

    const handleResize = () => {
      const w = window.innerWidth;
      const fs = w < 640 ? 52 : w < 1024 ? 78 : 96;
      myChart.setOption({
        graphic: { elements: [{ style: { fontSize: fs } }] },
      } as any);
      myChart.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.dispose();
    };
  }, []);

  const handleEnter = () => {
    navigate('/home');
  };

  const linePoints = [
    { x: 0, y: 620 },
    { x: 80, y: 600 },
    { x: 160, y: 520 },
    { x: 240, y: 580 },
    { x: 320, y: 380 },
    { x: 400, y: 460 },
    { x: 480, y: 300 },
    { x: 560, y: 420 },
    { x: 640, y: 180 },
    { x: 720, y: 300 },
    { x: 800, y: 140 },
    { x: 880, y: 260 },
    { x: 960, y: 100 },
    { x: 1040, y: 220 },
    { x: 1120, y: 80 },
    { x: 1200, y: 180 },
    { x: 1280, y: 120 },
  ];

  return (
    <div
      onClick={handleEnter}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#1A1A1E] via-[#1E1E24] to-[#1A1A1E] flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.55]"
        viewBox="0 0 1280 720"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#7B4B9E" />
            <stop offset="100%" stop-color="#6BC5E8" />
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
          d="M0,620 L80,600 L160,520 L240,580 L320,380 L400,460 L480,300 L560,420 L640,180 L720,300 L800,140 L880,260 L960,100 L1040,220 L1120,80 L1200,180 L1280,120"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="3"
          filter="url(#softGlow)"
        />
        {linePoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={3.5}
            fill="#6BC5E8"
            opacity="0.85"
            filter="url(#softGlow)"
          />
        ))}
      </svg>

      <div className="relative z-10 text-center px-4">
        <div ref={chartRef} className="w-full h-[300px] md:h-[380px] pointer-events-none mb-4" />

        <div className="mx-auto w-32 h-[1.5px] bg-gradient-to-r from-transparent via-[#5BB8D9] to-transparent mb-6" />

        <p className="text-sm md:text-base text-[#7B4B9E]/75 tracking-[0.3em] mb-16">
          DATA&nbsp;&nbsp;PORTFOLIO&nbsp;&nbsp;·&nbsp;&nbsp;数据作品集
        </p>

        <div
          className={`transition-all duration-1000 ${
            showEnter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#5BB8D9]/60 bg-[#1A1A1E]/40 backdrop-blur-sm text-[#7B4B9E] text-sm hover:bg-[#7B4B9E]/10 hover:border-[#6BC5E8] transition-colors">
            <span>点击任意位置进入</span>
            <span className="text-lg">→</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 text-xs text-[#7B4B9E]/50 tracking-widest">
        © 2026 Data Portfolio · Click to enter
      </div>
    </div>
  );
}

export default WelcomePage;
