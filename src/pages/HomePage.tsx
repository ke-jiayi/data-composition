import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-[#1e3a5f] border-t-transparent rounded-full"
          />
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

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8 px-2"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-[#1e3a5f] to-[#4a6fa5] bg-clip-text text-transparent">
            数据作品集
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden sm:block">{currentDate}</span>
          <motion.button
            onClick={handleImport}
            disabled={isParsing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-[#1e3a5f]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            导入数据
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        {(isParsing || importError || importSuccess) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8"
          >
            {isParsing && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-6 h-6 border-3 border-[#1e3a5f] border-t-transparent rounded-full"
                  />
                  <span className="text-gray-600 font-medium">正在解析文件...</span>
                </div>
              </div>
            )}
            {importError && !isParsing && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-semibold text-red-800">解析失败</h3>
                    <p className="text-sm text-red-600 mt-1">{importError}</p>
                  </div>
                </div>
              </div>
            )}
            {importSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-100 rounded-2xl p-5"
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                  >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-sm font-semibold text-green-800">导入成功</h3>
                    <p className="text-sm text-green-600 mt-1">数据集已成功保存到数据库</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e3a5f] via-[#2d4a6f] to-[#162a44] p-8 md:p-12 mb-10"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            手动测试：我改了这里
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-blue-100 text-lg md:text-xl max-w-2xl"
          >
            欢迎来到数据作品集，管理您的所有数据集，进行数据清洗与可视化分析
          </motion.p>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10"
      >
        <motion.div
          whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(30, 58, 95, 0.15)' }}
          transition={{ duration: 0.3 }}
          className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
              <svg className="w-6 h-6 text-[#1e3a5f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <div className="text-sm text-gray-500 mb-1">总数据集数量</div>
            <div className="text-3xl font-bold text-[#1e3a5f]">{datasets.length}</div>
            <div className="text-sm text-gray-400">个数据集</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(30, 58, 95, 0.15)' }}
          transition={{ duration: 0.3 }}
          className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-transparent rounded-bl-full" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
              <svg className="w-6 h-6 text-[#1e3a5f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-sm text-gray-500 mb-1">总数据行数</div>
            <div className="text-3xl font-bold text-[#1e3a5f]">{formatNumber(totalRowCount)}</div>
            <div className="text-sm text-gray-400">行数据</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(30, 58, 95, 0.15)' }}
          transition={{ duration: 0.3 }}
          className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-50 to-transparent rounded-bl-full" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
              <svg className="w-6 h-6 text-[#1e3a5f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-sm text-gray-500 mb-1">最近更新时间</div>
            <div className="text-2xl font-bold text-[#1e3a5f]">{lastImportDate || '--'}</div>
            <div className="text-sm text-gray-400">上次更新</div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="搜索数据集..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-15 pr-4 py-3.5 bg-white border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] text-sm shadow-sm transition-all"
            style={{ paddingLeft: '4rem' }}
          />
        </div>
        <div className="relative">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="appearance-none px-4 py-3.5 bg-white border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] text-sm text-gray-700 cursor-pointer shadow-sm pr-10 transition-all"
          >
            <option value="date-desc">导入时间（最新）</option>
            <option value="name-asc">名称 A-Z</option>
            <option value="rowCount-desc">数据量（最多）</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        {filteredAndSortedDatasets.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center"
          >
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">暂无数据集</h3>
            <p className="text-gray-500">点击右上角的"导入数据"按钮，开始管理您的数据集</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedDatasets.map((dataset, index) => (
              <motion.div
                key={dataset.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6, boxShadow: '0 25px 50px -12px rgba(30, 58, 95, 0.2)' }}
              >
                <Link
                  to={`/project/${dataset.id}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-gray-100"
                >
                  <div className="relative h-36 bg-gradient-to-br from-[#1e3a5f] via-[#2d4a6f] to-[#3d5a8f] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-16 h-16 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="absolute top-3 right-3 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                      {dataset.fileType.toUpperCase()}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate group-hover:text-[#1e3a5f] transition-colors">
                      {dataset.name}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">数据量</span>
                        <span className="text-sm font-semibold text-[#1e3a5f]">{formatNumber(dataset.rowCount)} 行</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">导入时间</span>
                        <span className="text-sm text-gray-500">{formatDate(dataset.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-[48px] p-12 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#1e3a5f]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white shadow-lg flex items-center justify-center"
          >
            <svg className="w-8 h-8 text-[#1e3a5f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </motion.div>
          <p className="text-gray-500 text-lg md:text-xl">{`（UI界面，还没想好，不用导入）`}</p>
        </div>
      </motion.section>
    </Layout>
  );
}