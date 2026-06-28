import { Layout } from '../components/Layout';

export function HomePage() {
  const today = new Date();
  const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const exampleDatasets = [
    { name: '销售数据', rows: 1284 },
    { name: '用户行为', rows: 8923 },
    { name: '产品库存', rows: 456 },
  ];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">📊 数据作品集</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">当地时间：{dateString}</span>
            <button className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg">
              导入数据
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">总数据集数量</p>
            <p className="text-2xl font-bold text-gray-900">0 个数据集</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">总数据行数</p>
            <p className="text-2xl font-bold text-gray-900">0 行</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">最近更新时间</p>
            <p className="text-2xl font-bold text-gray-900">暂无数据</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exampleDatasets.map((dataset, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{dataset.name}</h3>
              <p className="text-sm text-gray-500">{dataset.rows} 行</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
