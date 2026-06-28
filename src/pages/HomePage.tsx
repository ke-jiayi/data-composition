import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { useDB } from '../hooks/useDB';
import { parseFile } from '../utils/fileParser';
import type { Dataset } from '../utils/db';

// 格式化时间戳为 YYYY-MM-DD
function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// 格式化数字为本地格式
function formatNumber(num: number): string {
  return num.toLocaleString('zh-CN');
}

export function HomePage() {
  const today = new Date();
  const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const { isLoading: dbLoading, createDataset, saveData, getAllDatasets } = useDB();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 根据搜索关键词过滤数据集
  const filteredDatasets = searchQuery
    ? datasets.filter(
        (d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.fileName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : datasets;

  // 加载数据集列表
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

  // 点击导入按钮，触发文件选择
  const handleImport = () => {
    fileInputRef.current?.click();
  };

  // 处理文件选择
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 检查文件类型
    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith('.csv') && !fileName.endsWith('.xlsx') && !fileName.endsWith('.xls')) {
      setImportError('仅支持 CSV 和 XLSX 文件');
      return;
    }

    setIsImporting(true);
    setImportError(null);
    setImportSuccess(false);

    try {
      // 解析文件
      const importData = await parseFile(file);

      // 创建数据集记录
      const name = file.name.replace(/\.(csv|json|xlsx|xls)$/i, '');
      const dataset = await createDataset({
        name,
        fileName: importData.fileName,
        fileType: importData.fileType,
        columns: importData.columns,
        rowCount: importData.rowCount,
        tags: [importData.fileType.toUpperCase()],
      });

      // 保存数据到 IndexedDB
      await saveData(dataset.id, importData.rows);

      // 刷新数据集列表
      await loadDatasets();

      // 显示成功提示
      setImportSuccess(true);
      setTimeout(() => {
        setImportSuccess(false);
      }, 3000);
    } catch (error) {
      setImportError(error instanceof Error ? error.message : '导入失败');
    } finally {
      setIsImporting(false);
      // 清空文件输入
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">📊 数据作品集</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">当地时间：{dateString}</span>
            <button
              onClick={handleImport}
              disabled={isImporting || dbLoading}
              className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a4a73] transition-colors"
            >
              {isImporting ? '导入中...' : '导入数据'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* 导入成功提示 */}
        {importSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">✓ 数据导入成功！</p>
          </div>
        )}

        {/* 导入失败提示 */}
        {importError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex justify-between items-center">
            <p className="text-red-700 font-medium">✗ {importError}</p>
            <button
              onClick={() => setImportError(null)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">总数据集数量</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatNumber(datasets.length)} 个数据集
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">总数据行数</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatNumber(datasets.reduce((sum, d) => sum + d.rowCount, 0))} 行
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">最近更新时间</p>
            <p className="text-2xl font-bold text-gray-900">
              {datasets.length > 0 ? formatDate(datasets[0].updatedAt) : '暂无数据'}
            </p>
          </div>
        </div>

        {/* 搜索输入框 */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="请输入你要查找的内容"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
          />
        </div>

        {/* 数据集列表 */}
        {datasets.length > 0 ? (
          filteredDatasets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDatasets.map((dataset) => (
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
            <div className="text-center py-12">
              <p className="text-gray-500">未找到匹配的数据集</p>
            </div>
          )
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📁</div>
            <p className="text-gray-500 text-lg mb-4">暂无数据集</p>
            <button
              onClick={handleImport}
              disabled={isImporting || dbLoading}
              className="px-6 py-2.5 bg-[#1e3a5f] text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a4a73] transition-colors"
            >
              {isImporting ? '导入中...' : '导入第一个数据集'}
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-16 py-8 text-center text-sm text-gray-500 border-t border-gray-200"
      >
        <p>© 2026 数据作品集 | 用数据记录成长</p>
      </motion.div>
    </Layout>
  );
}