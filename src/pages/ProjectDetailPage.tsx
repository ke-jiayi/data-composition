import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { TabNavigation, type TabType } from '../components/TabNavigation';
import DataTable from '../components/DataTable';
import DataCleaning from '../components/DataCleaning';
import { SmartAnalysis } from '../components/SmartAnalysis';
import { useDB } from '../hooks/useDB';
import { useImportModal } from '../contexts/ImportModalContext';
import type { Dataset, DataRow } from '../utils/db';

// TabType 已从 TabNavigation 导入

const PYTHON_CODE = `import pandas as pd
import matplotlib.pyplot as plt

plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei']
plt.rcParams['axes.unicode_minus'] = False

# 读取数据
df = pd.read_excel('城市1.xlsx', header=1)

# 转换数据：把月份从列变成行
df_plot = df.set_index(df.columns[0]).dropna(how='all')
df_plot_T = df_plot.T

# 绘制折线图
plt.figure(figsize=(12, 6))
for col in df_plot_T.columns[:5]:
    plt.plot(df_plot_T.index, df_plot_T[col], marker='o', label=col)

plt.title('城市居民消费价格指数趋势', fontsize=14)
plt.xlabel('月份')
plt.ylabel('指数')
plt.legend(loc='best')
plt.grid(True, alpha=0.3)

# 保存图片
plt.savefig('折线图.png', dpi=300, bbox_inches='tight')
plt.show()`;

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getDataset, getData, saveData } = useDB();
  const { openModal } = useImportModal();

  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [rawData, setRawData] = useState<DataRow[]>([]);
  const [cleanedData, setCleanedData] = useState<DataRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [codeExpanded, setCodeExpanded] = useState(false);

  // 从 URL 获取当前 Tab
  const activeTab = (searchParams.get('tab') as TabType) || 'table';

  // 加载项目数据
  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    Promise.all([
      getDataset(id),
      getData(id),
    ])
      .then(([datasetData, data]) => {
        if (!datasetData) {
          setError('数据集未找到');
        } else {
          setDataset(datasetData);
          setRawData(data);
          setCleanedData(data); // 初始化清洗后数据为原始数据
        }
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : '加载项目失败');
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  // 切换 Tab
  const handleTabChange = (tab: TabType) => {
    setSearchParams({ tab });
  };

  // 数据清洗变化
  const handleCleanedDataChange = useCallback(async (newData: DataRow[]) => {
    if (!id) return;
    setCleanedData(newData);
    // 保存清洗后的数据
    await saveData(id, newData);
  }, [id, saveData]);

  // 加载状态
  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a5f] mx-auto mb-4"></div>
            <p className="text-gray-500">正在加载项目...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // 错误状态
  if (error || !dataset) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">项目未找到</h3>
            <p className="mt-1 text-sm text-gray-500">
              {error || `项目 ID ${id} 不存在或已被删除`}
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#1e3a5f] hover:bg-[#2d4a6f]"
              >
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('zh-CN');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 返回按钮 */}
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            返回首页
          </Link>
        </div>

        {/* 项目标题区域 */}
        <div className="mb-6 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{dataset.name}</h1>
              {dataset.description && (
                <p className="mt-2 text-gray-600">{dataset.description}</p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span>创建于 {formatDate(dataset.createdAt)}</span>
                {dataset.updatedAt !== dataset.createdAt && (
                  <span>· 更新于 {formatDate(dataset.updatedAt)}</span>
                )}
              </div>
              {dataset.tags && dataset.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {dataset.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1e3a5f]/10 text-[#1e3a5f] border border-[#1e3a5f]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#2d4a6f] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              导入数据
            </button>
          </div>
        </div>

        {/* 项目信息展示区域 */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">数据集信息</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 文件名 */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">文件名</h3>
                <p className="text-gray-900">{dataset.fileName}</p>
              </div>

              {/* 文件类型 */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">文件类型</h3>
                <p className="text-gray-900 uppercase">{dataset.fileType}</p>
              </div>

              {/* 数据量 */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">数据行数</h3>
                <p className="text-gray-900">{formatNumber(dataset.rowCount)} 行</p>
              </div>

              {/* 字段 */}
              <div className="md:col-span-2 lg:col-span-3">
                <h3 className="text-sm font-medium text-gray-500 mb-1">数据字段</h3>
                <p className="text-gray-900">{dataset.columns.join('、')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 切换 */}
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Tab 内容 */}
        <div className="mt-6">
          {/* Tab 1: 数据表格 */}
          {activeTab === 'table' && (
            <div>
              <DataTable data={rawData} title="原始数据" />
            </div>
          )}

          {/* Tab 2: 数据清洗 */}
          {activeTab === 'clean' && (
            <div className="space-y-4">
              {id && (
                <DataCleaning
                  data={cleanedData}
                  projectId={id}
                  onDataChange={handleCleanedDataChange}
                />
              )}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setCodeExpanded(!codeExpanded)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">📊 数据清洗与可视化代码</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${codeExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {codeExpanded && (
                  <div className="border-t border-gray-200">
                    <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm font-mono leading-relaxed">
                      <code>{PYTHON_CODE}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 3: 分析结论 */}
          {activeTab === 'conclusion' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  数据分析结论
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-red-50 border border-red-100 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">食品烟酒类价格波动最大</h4>
                      <p className="text-sm text-gray-600">是影响总指数的主要因素，占 CPI 权重的 30% 以上，价格变动对整体指数影响显著</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-orange-50 border border-orange-100 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">衣着类价格呈现持续上涨趋势</h4>
                      <p className="text-sm text-gray-600">1-5月累计上涨 1.8%，涨幅较为明显，需关注后续价格走势</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-green-50 border border-green-100 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">居住类价格保持稳定</h4>
                      <p className="text-sm text-gray-600">波动幅度最小，是稳定物价的重要支撑因素</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: 智能分析 */}
          {activeTab === 'smart' && (
            <SmartAnalysis data={cleanedData.length > 0 ? cleanedData : rawData} columns={dataset?.columns || []} />
          )}

          {/* Tab 4: 可视化分析 */}
          {activeTab === 'chart' && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">城市居民消费价格指数趋势图</h3>
              <div className="flex justify-center">
                <img
                  src="/images/城市价格指数趋势图.png.png"
                  alt="城市居民消费价格指数趋势图"
                  className="w-full max-h-[500px] object-contain rounded"
                />
              </div>
              <p className="text-sm text-gray-500 mt-4 text-center">数据来源：国家统计局 | 使用 Python Matplotlib 生成</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
