import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Layout } from '../components/Layout';
import { useDB } from '../hooks/useDB';
import type { Dataset, DataRow } from '../utils/db';

type SortOption = 'date-desc' | 'name-asc' | 'rowCount-desc';

export function HomePage() {
  const { getAllDatasets, createDataset, saveData, isLoading: dbLoading } = useDB();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isParsing, setIsParsing] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');
  const [currentDate, setCurrentDate] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      setCurrentDate(`${year}-${month}-${day}`);
    };
    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

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

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('zh-CN');
  };

  const totalRowCount = useMemo(() => {
    return datasets.reduce((sum, ds) => sum + ds.rowCount, 0);
  }, [datasets]);

  const lastImportDate = useMemo(() => {
    if (datasets.length === 0) return null;
    const latest = datasets.reduce((max, ds) => (ds.createdAt > max.createdAt ? ds : max), datasets[0]);
    return formatDate(latest.createdAt);
  }, [datasets]);

  const filteredAndSortedDatasets = useMemo(() => {
    let result = [...datasets];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (ds) =>
          ds.name.toLowerCase().includes(query) ||
          (ds.description?.toLowerCase().includes(query) ?? false)
      );
    }

    switch (sortOption) {
      case 'date-desc':
        result.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
        break;
      case 'rowCount-desc':
        result.sort((a, b) => b.rowCount - a.rowCount);
        break;
    }

    return result;
  }, [datasets, searchQuery, sortOption]);

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    setImportError(null);
    setImportSuccess(false);

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, '');

    if (fileExtension === 'csv') {
      Papa.parse<DataRow>(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false,
        complete: async (results) => {
          try {
            const data = results.data;
            const columns = results.meta.fields || [];

            const newDataset: Omit<Dataset, 'id' | 'createdAt' | 'updatedAt'> = {
              name: fileNameWithoutExt,
              fileName: file.name,
              fileType: 'csv',
              columns,
              rowCount: data.length,
            };

            const dataset = await createDataset(newDataset);
            await saveData(dataset.id, data);

            setImportSuccess(true);
            loadDatasets();

            setTimeout(() => {
              setImportSuccess(false);
            }, 3000);
          } catch (err) {
            setImportError(err instanceof Error ? err.message : '保存数据失败');
          } finally {
            setIsParsing(false);
          }
        },
        error: (error) => {
          setImportError(error.message);
          setIsParsing(false);
        },
      });
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json<DataRow>(worksheet, { header: 1 });

          let formattedData: DataRow[] = [];
          let headers: string[] = [];

          if (jsonData.length > 0) {
            headers = jsonData[0] as unknown as string[];
            const rows = jsonData.slice(1) as DataRow[];
            formattedData = rows.map((row) => {
              const obj: DataRow = {};
              headers.forEach((header, index) => {
                obj[header] = row[index as keyof DataRow] ?? null;
              });
              return obj;
            });
          }

          const newDataset: Omit<Dataset, 'id' | 'createdAt' | 'updatedAt'> = {
            name: fileNameWithoutExt,
            fileName: file.name,
            fileType: fileExtension === 'xlsx' ? 'xlsx' : 'xls',
            columns: headers,
            rowCount: formattedData.length,
          };

          const dataset = await createDataset(newDataset);
          await saveData(dataset.id, formattedData);

          setImportSuccess(true);
          loadDatasets();

          setTimeout(() => {
            setImportSuccess(false);
          }, 3000);
        } catch (err) {
          setImportError(err instanceof Error ? err.message : '保存数据失败');
        } finally {
          setIsParsing(false);
        }
      };
      reader.onerror = () => {
        setImportError('读取文件失败');
        setIsParsing(false);
      };
      reader.readAsArrayBuffer(file);
    } else {
      setImportError('不支持的文件格式');
      setIsParsing(false);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (isLoading || dbLoading) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a5f]"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <input
        type="file"
        ref={fileInputRef}
        accept=".csv,.xlsx"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 顶部区域 */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-xl font-bold text-[#1e3a5f]">数据作品集</div>
          <div className="text-sm text-gray-500 hidden sm:block">
            当地时间：{currentDate}
          </div>
          <button
            onClick={handleImport}
            disabled={isParsing}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#2d4a6f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            导入数据
          </button>
        </div>

        {/* 导入状态提示 */}
        {(isParsing || importError || importSuccess) && (
          <div className="mb-6">
            {isParsing && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1e3a5f]"></div>
                  <span className="text-gray-600">正在解析文件...</span>
                </div>
              </div>
            )}
            {importError && !isParsing && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-red-800">解析失败</h3>
                    <p className="text-sm text-red-700 mt-1">{importError}</p>
                  </div>
                </div>
              </div>
            )}
            {importSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-green-800">导入成功</h3>
                    <p className="text-sm text-green-700 mt-1">数据集已成功保存到数据库</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 欢迎语 */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">手动测试：我改了这里</h1>
        </div>

        {/* 统计卡片区 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="text-sm text-gray-500 mb-2">总数据集数量</div>
            <div className="text-3xl font-bold text-[#1e3a5f]">{datasets.length} 个数据集</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="text-sm text-gray-500 mb-2">总数据行数</div>
            <div className="text-3xl font-bold text-[#1e3a5f]">{formatNumber(totalRowCount)} 行</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="text-sm text-gray-500 mb-2">最近导入时间</div>
            <div className="text-3xl font-bold text-[#1e3a5f]">
              {lastImportDate ? `上次更新：${lastImportDate}` : '暂无'}
            </div>
          </div>
        </div>

        {/* 搜索与排序区 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="请输入你要查找的内容"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] text-sm"
            />
          </div>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] text-sm text-gray-700 cursor-pointer"
          >
            <option value="date-desc">导入时间（最新）</option>
            <option value="name-asc">名称 A-Z</option>
            <option value="rowCount-desc">数据量（最多）</option>
          </select>
        </div>

        {/* 数据集列表 */}
        {filteredAndSortedDatasets.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center mb-8">
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
            <h3 className="mt-4 text-lg font-medium text-gray-900">暂无数据，点击右上角导入</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredAndSortedDatasets.map((dataset) => (
              <Link
                key={dataset.id}
                to={`/project/${dataset.id}`}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#1e3a5f]/30 transition-all group"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#1e3a5f] truncate mb-4">
                    {dataset.name}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
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
                      <span className="font-medium text-gray-900">{formatNumber(dataset.rowCount)}</span> 行数据
                    </div>
                    <div className="flex items-center text-gray-500">
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
                      {formatDate(dataset.createdAt)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 底部动画区域 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-gray-100 rounded-[32px] p-12 text-center"
        >
          <p className="text-gray-500 text-lg">（UI界面，还没想好，不用导入）</p>
        </motion.div>
      </div>
    </Layout>
  );
}
