import { Link } from 'react-router-dom';

interface HeroSectionProps {
  onImportClick?: () => void;
}

export function HeroSection({ onImportClick }: HeroSectionProps) {
  return (
    <section
      className="min-h-[60vh] flex flex-col justify-center px-4"
      style={{ color: 'var(--text-primary)' }}
    >
      <div className="max-w-3xl">
        <p
          className="font-mono text-sm mb-4"
          style={{ color: 'var(--accent)' }}
        >
          你好，欢迎来访
        </p>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          Hey, 我是数据分析师
        </h1>
        <p
          className="text-lg md:text-xl max-w-2xl mb-8 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          专注于数据采集、清洗与可视化分析，构建有价值的数据作品集
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={onImportClick}
            className="inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--text-primary)',
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            导入数据
          </button>
          <Link
            to="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-all duration-200"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
            }}
          >
            查看项目
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
