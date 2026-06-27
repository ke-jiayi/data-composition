import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useDB } from '../hooks/useDB';
import type { Dataset } from '../utils/db';

interface HomePageProps {
  onImportClick?: () => void;
}

export function HomePage({ onImportClick }: HomePageProps) {
  const { getAllDatasets, deleteDataset, isLoading: dbLoading } = useDB();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadDatasets = useCallback(async () => {
    try {
      const data = await getAllDatasets();
      setDatasets(data);
    } catch (err) {
      console.error('加载数据集失败:', err);
    } finally {
      setIsLoading(false);
    }
  }, [getAllDatasets]);

  useEffect(() => {
    if (!dbLoading) {
      loadDatasets();
    }
  }, [dbLoading, loadDatasets]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('确定要删除这个数据集吗？此操作不可撤销。')) {
      try {
        await deleteDataset(id);
        loadDatasets();
      } catch (err) {
        console.error('删除数据集失败:', err);
      }
    }
  };

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

  const getFileTypeBadgeColor = (fileType: string) => {
    const colors: Record<string, string> = {
      csv: 'bg-green-100 text-green-700 border-green-200',
      xlsx: 'bg-blue-100 text-blue-700 border-blue-200',
      xls: 'bg-blue-100 text-blue-700 border-blue-200',
      json: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    };
    return colors[fileType.toLowerCase()] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  if (isLoading || dbLoading) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a5f]"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题和导入按钮 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">我的数据集</h1>
            <p className="mt-1 text-sm text-gray-500">
              已导入 {datasets.length} 个数据集
            </p>
          </div>
          <button
            onClick={onImportClick}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#2d4a6f] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            导入数据
          </button>
        </div>

        {/* 空状态 */}
        {datasets.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">暂无数据集</h3>
            <p className="mt-2 text-sm text-gray-500">导入您的第一个数据集开始分析</p>
            <button
              onClick={onImportClick}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#2d4a6f] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              导入您的第一个数据集
            </button>
          </div>
        ) : (
          /* 数据集卡片网格 */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {datasets.map((dataset) => (
              <Link
                key={dataset.id}
                to={`/project/${dataset.id}`}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-[#1e3a5f]/30 transition-all group"
              >
                <div className="p-6">
                  {/* 卡片头部 */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#1e3a5f] truncate">
                        {dataset.name}
                      </h3>
                      {dataset.description && (
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {dataset.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={(e) => handleDelete(dataset.id, e)}
                      className="ml-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="删除数据集"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* 文件类型标签 */}
                  <div className="mb-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border ${getFileTypeBadgeColor(
                        dataset.fileType
                      )}`}
                    >
                      {dataset.fileType.toUpperCase()}
                    </span>
                  </div>

                  {/* 统计信息 */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <svg
                        className="w-4 h-4 text-gray-400 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-gray-600">
                        <span className="font-medium text-gray-900">{formatNumber(dataset.rowCount)}</span> 条数据
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <svg
                        className="w-4 h-4 text-gray-400 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-gray-500">{formatDate(dataset.createdAt)}</span>
                    </div>
                  </div>

                  {/* 文件名字段 */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 truncate">
                      文件: {dataset.fileName}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
