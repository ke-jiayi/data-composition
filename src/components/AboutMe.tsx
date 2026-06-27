const skills = [
  '数据分析',
  '数据采集',
  '数据清洗',
  '可视化',
  'React',
  'TypeScript',
  'ECharts',
  'Python',
];

export function AboutMe() {
  return (
    <section
      className="py-16 px-4"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-3xl">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          关于我
        </h2>
        <div className="space-y-4">
          <p
            className="leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            我是一名数据分析师，热爱探索数据的价值。通过这个作品集，我展示如何从零开始采集数据、清洗数据、分析数据，并最终通过可视化让数据讲故事。
          </p>
          <p
            className="leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            如果你有数据相关的问题或合作机会，欢迎联系我。
          </p>
        </div>
        <div className="mt-8">
          <h3
            className="text-sm font-medium mb-4 uppercase tracking-wider"
            style={{ color: 'var(--text-secondary)' }}
          >
            技术栈
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-md text-sm transition-colors duration-200 cursor-default"
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
