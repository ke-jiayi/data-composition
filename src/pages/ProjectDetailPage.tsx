import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { TabNavigation } from '../components/TabNavigation';
import DataTable from '../components/DataTable';
import DataCleaning from '../components/DataCleaning';
import { ChartPanel } from '../components/charts';
import { useDB } from '../hooks/useDB';
import { useImportModal } from '../contexts/ImportModalContext';
import type { Dataset, DataRow, ChartConfig } from '../utils/db';

type TabType = 'table' | 'clean' | 'chart';

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getDataset, getData, getCharts, saveData } = useDB();
  const { openModal } = useImportModal();

  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [rawData, setRawData] = useState<DataRow[]>([]);
  const [cleanedData, setCleanedData] = useState<DataRow[]>([]);
  const [charts, setCharts] = useState<ChartConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      getCharts(id),
    ])
      .then(([datasetData, data, chartConfigs]) => {
        if (!datasetData) {
          setError('数据集未找到');
        } else {
          setDataset(datasetData);
          setRawData(data);
          setCleanedData(data); // 初始化清洗后数据为原始数据
          setCharts(chartConfigs);
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
            <div>
              {id && (
                <DataCleaning
                  data={cleanedData}
                  projectId={id}
                  onDataChange={handleCleanedDataChange}
                />
              )}
            </div>
          )}

          {/* Tab 3: 可视化图表 */}
          {activeTab === 'chart' && (
            <div className="space-y-4">
              {cleanedData.length > 0 ? (
                <ChartPanel
                  data={cleanedData}
                  fields={dataset.columns}
                />
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">暂无图表</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    该数据集尚未创建可视化图表
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
