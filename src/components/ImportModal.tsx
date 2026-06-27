import { useState, useCallback } from 'react';
import { FileUpload } from './FileUpload';
import { ImportPreview } from './ImportPreview';
import { parseFile } from '../utils/fileParser';
import type { ImportData } from '../types';
import type { Dataset, DataRow } from '../utils/db';

type ImportStep = 'upload' | 'preview' | 'importing' | 'success' | 'error';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (dataset: Dataset) => void;
  saveData: (datasetId: string, data: DataRow[]) => Promise<void>;
  createDataset: (dataset: Omit<Dataset, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Dataset>;
}

export const ImportModal = ({
  isOpen,
  onClose,
  onImportSuccess,
  saveData,
  createDataset,
}: ImportModalProps) => {
  const [step, setStep] = useState<ImportStep>('upload');
  const [importData, setImportData] = useState<ImportData | null>(null);
  const [datasetName, setDatasetName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [createdDataset, setCreatedDataset] = useState<Dataset | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 处理文件选择
  const handleFileSelect = useCallback(async (file: File) => {
    setError(null);
    setIsLoading(true);

    try {
      const data = await parseFile(file);
      setImportData(data);
      setDatasetName(file.name.replace(/\.(csv|json|xlsx|xls)$/i, ''));
      setStep('preview');
    } catch (err) {
      setError(err instanceof Error ? err.message : '文件解析失败');
      setStep('error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 确认导入
  const handleConfirm = useCallback(async () => {
    if (!importData) return;

    setStep('importing');
    setError(null);

    try {
      const fileName = importData.fileName;
      const name = datasetName || fileName.replace(/\.(csv|json|xlsx|xls)$/i, '');

      const dataset = await createDataset({
        name,
        fileName,
        fileType: importData.fileType,
        columns: importData.columns,
        rowCount: importData.rowCount,
        tags: [importData.fileType.toUpperCase()],
      });

      await saveData(dataset.id, importData.rows);

      setCreatedDataset(dataset);
      setStep('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : '导入失败');
      setStep('error');
    }
  }, [importData, datasetName, saveData, createDataset]);

  // 关闭模态框
  const handleClose = useCallback(() => {
    if (step === 'success' && createdDataset) {
      onImportSuccess(createdDataset);
    }

    setStep('upload');
    setImportData(null);
    setDatasetName('');
    setError(null);
    setCreatedDataset(null);
    onClose();
  }, [step, createdDataset, onImportSuccess, onClose]);

  // 返回上传步骤
  const handleBack = useCallback(() => {
    setStep('upload');
    setImportData(null);
    setDatasetName('');
    setError(null);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={handleClose}
      />

      {/* 模态框 */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-gray-200">
          {/* 头部 */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-3">
              {step === 'preview' && (
                <button
                  onClick={handleBack}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <h2 className="text-xl font-semibold text-gray-900">
                {step === 'upload' && '导入数据'}
                {step === 'preview' && '预览数据'}
                {step === 'importing' && '正在导入...'}
                {step === 'success' && '导入成功'}
                {step === 'error' && '导入失败'}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 内容区域 */}
          <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50">
            {/* 上传步骤 */}
            {step === 'upload' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <p className="text-gray-600 mb-4">
                    上传 CSV、JSON 或 Excel 文件以创建新的数据项目。系统将自动检测列名和数据类型。
                  </p>
                  <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />
                </div>

                {/* 支持格式说明 */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">支持的文件格式</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-medium">CSV</span>
                      <span>逗号分隔值</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-medium">JSON</span>
                      <span>JavaScript 对象</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-medium">Excel</span>
                      <span>.xlsx / .xls</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 预览步骤 */}
            {step === 'preview' && importData && (
              <div className="space-y-5">
                {/* 数据集名称输入 */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    数据集名称
                  </label>
                  <input
                    type="text"
                    value={datasetName}
                    onChange={(e) => setDatasetName(e.target.value)}
                    placeholder="输入数据集名称"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  />
                </div>

                <ImportPreview
                  data={importData}
                  onConfirm={handleConfirm}
                  onCancel={handleBack}
                  isImporting={false}
                />
              </div>
            )}

            {/* 导入中状态 */}
            {step === 'importing' && (
              <div className="flex flex-col items-center justify-center py-16">
                <svg
                  className="animate-spin h-14 w-14 text-blue-500 mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <p className="text-lg font-medium text-gray-700">正在导入数据，请稍候...</p>
                <p className="text-sm text-gray-500 mt-1">这可能需要几秒钟时间</p>
              </div>
            )}

            {/* 成功状态 */}
            {step === 'success' && createdDataset && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">数据导入成功！</h3>
                <p className="text-gray-600 mb-6">
                  已成功导入 <span className="font-medium text-gray-900">{createdDataset.name}</span>，
                  共 <span className="font-medium text-gray-900">{createdDataset.rowCount.toLocaleString()}</span> 行数据
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  开始分析
                </button>
              </div>
            )}

            {/* 错误状态 */}
            {step === 'error' && error && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-5">
                  <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">导入失败</h3>
                <p className="text-red-600 mb-6">{error}</p>
                <div className="flex space-x-3">
                  <button
                    onClick={handleBack}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    重新上传
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-5 py-2.5 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    关闭
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};