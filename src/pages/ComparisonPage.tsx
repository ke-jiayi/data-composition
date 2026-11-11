import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

// 可扩展的对比维度（当前仅一个，暂不实现切换逻辑）
const comparisonScopes = ['城市1 vs 农村1'];

const insights = [
  '交通通信类涨幅领跑：城乡两地该类指数均突破105，说明成本上涨是普遍趋势。',
  '食品烟酒类城乡倒挂：城市食品类指数99.2，农村98.8，均低于荣枯线。',
  '其他服务类差异显著：城市110.0高于农村109.7，城市服务消费价格压力更大。',
];

export function ComparisonPage() {
  const [chartError, setChartError] = useState(false);
  const [trendError, setTrendError] = useState(false);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* 顶部区域 */}
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between mb-4">
          <div className="min-w-0">
            <Link
              to="/home"
              className="inline-flex items-center text-sm md:text-base transition-all px-3 py-1.5 rounded-lg border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-400/60 text-purple-700 dark:text-[#B084DC]"
            >
              ← 返回首页
            </Link>
            <h1 className="mt-3 text-xl md:text-2xl font-bold text-gray-900 dark:text-cyan-300 dark:drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              城乡消费结构对比分析
            </h1>
            <div className="mt-2 w-24 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-sky-500 rounded-full" />
          </div>

          {/* 对比范围切换（预留） */}
          <div className="flex flex-wrap items-center gap-2">
            {comparisonScopes.map((scope, index) => (
              <button
                key={scope}
                type="button"
                className={
                  index === 0
                    ? 'px-4 py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] transition-all'
                    : 'px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-[#3A3A44] bg-white dark:bg-[#26262C] text-gray-600 dark:text-purple-200/70 hover:border-purple-400/60 transition-all'
                }
              >
                {scope}
              </button>
            ))}
          </div>
        </div>

        {/* 主体展示区 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {/* 左栏：各分类指数对比 */}
          <div className="bg-white dark:bg-[#26262C] rounded-lg border border-gray-200 dark:border-[#3A3A44] shadow-sm dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)] p-3 md:p-4">
            <h2 className="flex items-center text-base md:text-lg font-semibold text-gray-900 dark:text-[#E2E8F0] mb-3">
              <span className="w-1 h-5 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full inline-block mr-2" />
              各分类指数对比
            </h2>
            {chartError ? (
              <div className="flex items-center justify-center py-16">
                <p className="text-sm md:text-base text-gray-500 dark:text-[#9CA3AF]">暂无图表</p>
              </div>
            ) : (
              <img
                src="/images/城乡1_对比图.png"
                alt="各分类指数城乡对比图"
                className="w-full h-auto object-contain rounded"
                onError={() => setChartError(true)}
              />
            )}
            <p className="text-sm md:text-base text-gray-600 dark:text-purple-200/70 mt-3">
              交通通信类城乡均破105，食品类均低于100，体现宏观通胀共性。
            </p>
          </div>

          {/* 右栏：总指数趋势对比 */}
          <div className="bg-white dark:bg-[#26262C] rounded-lg border border-gray-200 dark:border-[#3A3A44] shadow-sm dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)] p-3 md:p-4">
            <h2 className="flex items-center text-base md:text-lg font-semibold text-gray-900 dark:text-[#E2E8F0] mb-3">
              <span className="w-1 h-5 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full inline-block mr-2" />
              总指数趋势对比
            </h2>
            {trendError ? (
              <div className="flex items-center justify-center py-16">
                <p className="text-sm md:text-base text-gray-500 dark:text-[#9CA3AF]">暂无图表</p>
              </div>
            ) : (
              <img
                src="/images/城乡1_WorkBuddy对比图.png"
                alt="城乡总指数趋势对比图"
                className="w-full h-auto object-contain rounded"
                onError={() => setTrendError(true)}
              />
            )}
            <p className="text-sm md:text-base text-gray-600 dark:text-purple-200/70 mt-3">
              1-5月城乡总指数走势高度一致，农村总指数略微低于城市。
            </p>
          </div>
        </div>

        {/* 底部结论区 */}
        <div className="mt-6 bg-white dark:bg-[#26262C] rounded-lg border border-gray-200 dark:border-[#3A3A44] shadow-sm dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)] p-3 md:p-4">
          <h2 className="flex items-center text-base md:text-lg font-semibold text-gray-900 dark:text-[#E2E8F0] mb-3">
            <span className="w-1 h-5 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full inline-block mr-2" />
            核心数据洞察
          </h2>
          <div className="mb-3 w-full h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-sky-500 rounded-full" />
          <ul className="space-y-2">
            {insights.map((insight, index) => (
              <li key={insight} className="flex items-start gap-2">
                <span className="shrink-0 w-5 h-5 mt-0.5 rounded-full bg-purple-500/15 text-purple-700 dark:text-[#B084DC] text-xs font-medium flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-sm md:text-base text-gray-600 dark:text-purple-200/70 leading-relaxed">
                  {insight}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
