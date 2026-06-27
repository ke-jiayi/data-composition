import { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { TabNavigation } from '../components/TabNavigation';
import DataTable from '../components/DataTable';
import { ChartContainer, BarChart } from '../components/charts';
import { useDB } from '../hooks/useDB';
import type { Project, DataRow, CleaningLog, ChartConfig } from '../types';

type TabType = 'raw' | 'cleaned' | 'charts';

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getProject, getRawData, getCleanedData, getCleaningLogs, getCharts } = useDB();
  
  const [project, setProject] = useState<Project | null>(null);
  const [rawData, setRawData] = useState<DataRow[]>([]);
  const [cleanedData, setCleanedData] = useState<DataRow[]>([]);
  const [cleaningLogs, setCleaningLogs] = useState<CleaningLog[]>([]);
  const [charts, setCharts] = useState<ChartConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 从 URL 获取当前 Tab
  const activeTab = (searchParams.get('tab') as TabType) || 'raw';
  
  // 加载项目数据
  useEffect(() => {
    if (!id) return;
    
    setIsLoading(true);
    setError(null);
    
    Promise.all([
      getProject(id),
      getRawData(id),
      getCleanedData(id),
      getCleaningLogs(id),
      getCharts(id),
    ])
      .then(([projectData, raw, cleaned, logs, chartConfigs]) => {
        if (!projectData) {
          setError('项目未找到');
        } else {
          setProject(projectData);
          setRawData(raw);
          setCleanedData(cleaned);
          setCleaningLogs(logs);
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
  
  // 加载状态
  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3b82f6] mx-auto mb-4"></div>
            <p className="text-[#a3a3a3]">正在加载项目...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  // 错误状态
  if (error || !project) {
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
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">项目未找到</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {error || `项目 ID ${id} 不存在或已被删除`}
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
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
      month: 'long',
      day: 'numeric',
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
            className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
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
            返回项目列表
          </Link>
        </div>
        
        {/* 项目标题区域 */}
        <div className="mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#fafafa]">{project.name}</h1>
              {project.description && (
                <p className="mt-2 text-[#a3a3a3]">{project.description}</p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[#a3a3a3]">
                <span>创建于 {formatDate(project.createdAt)}</span>
                {project.updatedAt !== project.createdAt && (
                  <span>· 更新于 {formatDate(project.updatedAt)}</span>
                )}
              </div>
              {project.tags && project.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#3b82f6]/20 text-[#3b82f6] border border-[#3b82f6]/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 项目信息展示区域 */}
        <div className="bg-[#171717] rounded-lg border border-[#303030] shadow-sm mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-[#fafafa] mb-4">项目信息</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 数据来源 */}
              <div>
                <h3 className="text-sm font-medium text-[#a3a3a3] mb-1">数据来源</h3>
                <p className="text-[#fafafa]">{project.dataSource || '未指定'}</p>
              </div>
              
              {/* 数据量 */}
              <div>
                <h3 className="text-sm font-medium text-[#a3a3a3] mb-1">原始数据量</h3>
                <p className="text-[#fafafa]">{formatNumber(project.rowCount)} 行</p>
              </div>
              
              {/* 清洗后数据量 */}
              <div>
                <h3 className="text-sm font-medium text-[#a3a3a3] mb-1">清洗后数据量</h3>
                <p className="text-[#fafafa]">{formatNumber(project.cleanedRowCount)} 行</p>
              </div>
              
              {/* 项目背景 */}
              {project.background && (
                <div className="md:col-span-2 lg:col-span-3">
                  <h3 className="text-sm font-medium text-[#a3a3a3] mb-1">项目背景</h3>
                  <p className="text-[#fafafa] whitespace-pre-wrap">{project.background}</p>
                </div>
              )}
              
              {/* 采集方式 */}
              {project.collectionMethod && (
                <div className="md:col-span-2 lg:col-span-3">
                  <h3 className="text-sm font-medium text-[#a3a3a3] mb-1">采集方式</h3>
                  <p className="text-[#fafafa] whitespace-pre-wrap">{project.collectionMethod}</p>
                </div>
              )}
              
              {/* 字段说明 */}
              {project.fieldDescription && (
                <div className="md:col-span-2 lg:col-span-3">
                  <h3 className="text-sm font-medium text-[#a3a3a3] mb-1">字段说明</h3>
                  <p className="text-[#fafafa] whitespace-pre-wrap">{project.fieldDescription}</p>
                </div>
              )}
              
              {/* 清洗步骤 */}
              {project.cleaningSteps && (
                <div className="md:col-span-2 lg:col-span-3">
                  <h3 className="text-sm font-medium text-[#a3a3a3] mb-1">清洗步骤</h3>
                  <p className="text-[#fafafa] whitespace-pre-wrap">{project.cleaningSteps}</p>
                </div>
              )}
              
              {/* Insights */}
              {project.insights && project.insights.length > 0 && (
                <div className="md:col-span-2 lg:col-span-3">
                  <h3 className="text-sm font-medium text-[#a3a3a3] mb-2">核心分析结论</h3>
                  <ul className="space-y-2">
                    {project.insights.map((insight, index) => (
                      <li key={index} className="flex items-start text-[#fafafa]">
                        <svg className="w-5 h-5 text-[#3b82f6] mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Tab 切换 */}
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        
        {/* Tab 内容 */}
        <div className="mt-6">
          {/* 原始数据 Tab */}
          {activeTab === 'raw' && (
            <div>
              <DataTable data={rawData} title="原始数据" />
            </div>
          )}
          
          {/* 清洗后数据 Tab */}
          {activeTab === 'cleaned' && (
            <div className="space-y-6">
              {/* 清洗操作日志 */}
              {cleaningLogs.length > 0 && (
                <div className="bg-[#171717] rounded-lg border border-[#303030] shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-[#fafafa] mb-4">清洗操作日志</h3>
                  <div className="space-y-3">
                    {cleaningLogs.map((log) => (
                      <div key={log.id} className="flex items-start border-b border-[#303030] pb-3 last:border-0 last:pb-0">
                        <div className="flex-shrink-0 mt-0.5">
                          <svg className="w-5 h-5 text-[#3b82f6]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-[#fafafa]">{log.operation}</p>
                          <p className="text-sm text-[#a3a3a3]">{log.details}</p>
                          {log.affectedRows && (
                            <p className="text-xs text-[#a3a3a3] mt-1">影响行数: {log.affectedRows}</p>
                          )}
                        </div>
                        <span className="text-xs text-[#a3a3a3] whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleDateString('zh-CN')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* 清洗后数据表格 */}
              <DataTable data={cleanedData} title="清洗后数据" />
            </div>
          )}
          
          {/* 可视化看板 Tab */}
          {activeTab === 'charts' && (
            <div className="space-y-6">
              {charts.length > 0 ? (
                charts.map((chart) => (
                  <ChartContainer
                    key={chart.id}
                    title={chart.title}
                    showExport={true}
                    onDelete={() => {
                      // TODO: 实现删除图表功能
                    }}
                  >
                    {chart.chartType === 'bar' && (
                      <BarChart option={chart.config} />
                    )}
                    {chart.chartType === 'line' && (
                      <BarChart option={chart.config} />
                    )}
                    {chart.chartType === 'pie' && (
                      <BarChart option={chart.config} />
                    )}
                  </ChartContainer>
                ))
              ) : (
                <div className="bg-[#171717] rounded-lg border border-[#303030] shadow-sm p-12 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-[#303030]"
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
                  <h3 className="mt-2 text-sm font-medium text-[#fafafa]">暂无图表</h3>
                  <p className="mt-1 text-sm text-[#a3a3a3]">
                    该项目尚未创建可视化图表
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