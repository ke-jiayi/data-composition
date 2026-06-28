import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useDB } from '../hooks/useDB';
import type { Dataset } from '../utils/db';

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function formatNumber(num: number): string {
  return num.toLocaleString('zh-CN');
}

export function ProjectListPage() {
  const { isLoading: dbLoading, getAllDatasets } = useDB();
  const [datasets, setDatasets] = useState<Dataset[]>([]);

  useEffect(() => {
    if (!dbLoading) {
      loadDatasets();
    }
  }, [dbLoading]);

  const loadDatasets = async () => {
    try {
      const allDatasets = await getAllDatasets();
      setDatasets(allDatasets);
    } catch (error) {
      console.error('加载数据集失败:', error);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">项目列表</h1>
          <p className="mt-1 text-sm text-gray-500">已导入 {datasets.length} 个数据集</p>
        </div>

        {datasets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {datasets.map((dataset) => (
              <Link
                key={dataset.id}
                to={`/project/${dataset.id}`}
                className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-lg hover:border-[#1e3a5f]/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{dataset.name}</h3>
                <p className="text-sm text-gray-500">{formatNumber(dataset.rowCount)} 行</p>
                <p className="text-xs text-gray-400 mt-2">导入于 {formatDate(dataset.createdAt)}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📁</div>
            <p className="text-gray-500 text-lg mb-4">暂无项目</p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-2.5 bg-[#1e3a5f] text-white font-medium rounded-lg hover:bg-[#2a4a73] transition-colors"
            >
              返回首页导入数据
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
