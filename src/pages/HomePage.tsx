import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Layout } from '../components/Layout';
import { useDB } from '../hooks/useDB';
import type { Dataset, DataRow } from '../utils/db';

export function HomePage() {
  const { getAllDatasets, createDataset, saveData, isLoading: dbLoading } = useDB();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isParsing, setIsParsing] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
      <input
        type="file"
        ref={fileInputRef}
        accept=".csv,.xlsx"
        className="hidden"
        onChange={handleFileChange}
      />
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
            onClick={handleImport}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#2d4a6f] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            导入数据
          </button>
        </div>

        {/* 导入状态提示 */}
        {(isParsing || importError || importSuccess) && (
          <div className="mb-8">
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
              onClick={handleImport}
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
                      <span className="font-medium text-gray-900">{formatNumber(dataset.rowCount)}</span> 条数据
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
      </div>
    </Layout>
  );
}
