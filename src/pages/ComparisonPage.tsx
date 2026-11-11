import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

type ComparisonKey = 'city1' | 'city2' | 'city3' | 'city4' | 'city5';

const COMPARISON_DATA = {
  city1: {
    title: '城市1 vs 农村1',
    leftImage: '/images/城乡1_对比图.png',
    leftDesc: '交通通信类城乡均破105，食品类均低于100，体现宏观通胀共性。',
    rightImage: '/images/城乡1_WorkBuddy对比图.png',
    rightDesc: '1-5月城乡总指数走势高度一致，农村总指数略微低于城市。',
    insights: [
      '交通通信类涨幅领跑：城乡两地该类指数均突破105，说明成本上涨是普遍趋势。',
      '食品烟酒类城乡倒挂：城市食品类指数99.2，农村98.8，均低于荣枯线。',
      '其他服务类差异显著：城市110.0高于农村109.7，城市服务消费价格压力更大。',
    ],
  },
  city2: {
    title: '城市2 vs 农村2',
    leftImage: '/images/城乡2_对比图.png',
    leftDesc: '（预留描述，等之后补充）',
    rightImage: '/images/城乡2_WorkBuddy对比图.png',
    rightDesc: '（预留描述，等之后补充）',
    insights: ['（预留结论1）', '（预留结论2）', '（预留结论3）'],
  },
  city3: {
    title: '城市3 vs 农村3',
    leftImage: '/images/城乡3_对比图.png',
    leftDesc: '城乡食品烟酒类均呈现明显的年中冲高回落趋势，波动剧烈。',
    rightImage: '/images/城乡3_WorkBuddy对比图.png',
    rightDesc: '总指数走势高度一致，下半年均趋于平稳。',
    insights: [
      '食品价格大幅回落：城乡食品类价格从年中高点一路下跌，是拖累总指数下行的绝对主力。',
      '交通通信持续通缩：城乡该类价格全年维持在95-97区间，处于明显低位。',
      '医疗保健类韧性微涨：在多数品类回落的情况下，城乡医疗保健类逆势维持在102左右。',
    ],
  },
  city4: {
    title: '城市4 vs 农村4',
    leftImage: '/images/城乡4_对比图.png',
    leftDesc: '烟酒及用品类领涨，交通和通讯类出现下跌，城乡表现高度同频。',
    rightImage: '/images/城乡4_WorkBuddy对比图.png',
    rightDesc: '单月数据对比，城乡消费结构差异在特定年份的缩影。',
    insights: [
      '烟酒及用品类领涨：该类指数居各类之首，显示出较强的价格上行压力。',
      '交通和通讯类出现下跌：是唯一明显低于100荣枯线的类别，成本呈下降趋势。',
      '居住类略微承压：城乡居住类指数均略低于100，呈平稳偏弱态势。',
    ],
  },
  city5: {
    title: '城市5 vs 农村5',
    leftImage: '/images/城乡5_对比图.png',
    leftDesc: '农副产品波动剧烈，鲜菜类呈现过山车行情，畜肉类长期低迷。',
    rightImage: '/images/城乡5_WorkBuddy对比图.png',
    rightDesc: '多品类农产品价格趋势对比，反映气候与供需的复杂影响。',
    insights: [
      '鲜菜类呈现过山车行情：价格暴涨后快速回落，受季节和气候影响显著。',
      '畜肉类长期处于低位：全年大部分时间低于95，持续拖累食品类总指数。',
      '蛋类价格触底反弹：从年初低位一路飙升，涨幅惊人，反映市场供需剧烈变化。',
    ],
  }
} as const;

export function ComparisonPage() {
  const [selectedKey, setSelectedKey] = useState<ComparisonKey>('city1');
  const [chartError, setChartError] = useState(false);
  const [trendError, setTrendError] = useState(false);

  const data = COMPARISON_DATA[selectedKey];

  useEffect(() => {
    setChartError(false);
    setTrendError(false);
  }, [selectedKey]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* 顶部区域 */}
        <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr_auto] md:items-center mb-4">
          <div className="min-w-0">
            <Link
              to="/home"
              className="inline-flex items-center text-sm md:text-base transition-all px-3 py-1.5 rounded-lg border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-400/60 text-purple-700 dark:text-[#B084DC]"
            >
              ← 返回首页
            </Link>
          </div>

          <div className="min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-[#00B4D8] dark:text-[#6BC5E8] dark:drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] text-center">
              {data.title}
            </h1>
            <div className="mt-2 mx-auto w-24 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-sky-500 rounded-full" />
          </div>

          {/* 对比组切换 */}
          <div className="md:justify-self-end">
            <select
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value as ComparisonKey)}
              aria-label="选择对比组"
              className="px-3 py-2 pr-9 rounded-lg bg-white dark:bg-[#1E1E24] text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 text-sm focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/30 transition-colors cursor-pointer"
            >
              <option value="city1">城市1 vs 农村1</option>
              <option value="city2">城市2 vs 农村2</option>
              <option value="city3">城市3 vs 农村3</option>
              <option value="city4">城市4 vs 农村4</option>
              <option value="city5">城市5 vs 农村5</option>
            </select>
          </div>
        </div>

        <div key={selectedKey} className="animate-fade-in">
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
                  src={data.leftImage}
                  alt={`${data.title} 各分类指数城乡对比图`}
                  className="w-full h-auto object-contain rounded"
                  onError={() => setChartError(true)}
                />
              )}
              <p className="text-sm md:text-base text-gray-600 dark:text-purple-200/70 mt-3">
                {data.leftDesc}
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
                  src={data.rightImage}
                  alt={`${data.title} 城乡总指数趋势对比图`}
                  className="w-full h-auto object-contain rounded"
                  onError={() => setTrendError(true)}
                />
              )}
              <p className="text-sm md:text-base text-gray-600 dark:text-purple-200/70 mt-3">
                {data.rightDesc}
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
              {data.insights.map((insight, index) => (
                <li key={`${selectedKey}-${index}`} className="flex items-start gap-2">
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
      </div>
    </Layout>
  );
}
