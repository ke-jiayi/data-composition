import { useState, useCallback } from 'react';
import { FileUpload } from './FileUpload';
import { ImportPreview } from './ImportPreview';
import { parseFile } from '../utils/fileParser';
import type { ImportData, Project } from '../types';
import { v4 as uuidv4 } from 'uuid';

type ImportStep = 'upload' | 'preview' | 'importing' | 'success' | 'error';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (project: Project) => void;
  saveRawData: (projectId: string, data: ImportData['rows']) => Promise<void>;
  createProject: (project: Project) => Promise<void>;
}

export const ImportModal = ({
  isOpen,
  onClose,
  onImportSuccess,
  saveRawData,
  createProject,
}: ImportModalProps) => {
  const [step, setStep] = useState<ImportStep>('upload');
  const [importData, setImportData] = useState<ImportData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [createdProject, setCreatedProject] = useState<Project | null>(null);

  // 处理文件选择
  const handleFileSelect = useCallback(async (file: File) => {
    setError(null);
    setStep('upload');

    try {
      const data = await parseFile(file);
      setImportData(data);
      setStep('preview');
    } catch (err) {
      setError(err instanceof Error ? err.message : '文件解析失败');
      setStep('error');
    }
  }, []);

  // 确认导入
  const handleConfirm = useCallback(async () => {
    if (!importData) return;

    setStep('importing');
    setError(null);

    try {
      // 创建项目
      const projectId = uuidv4();
      const now = Date.now();

      const project: Project = {
        id: projectId,
        name: importData.fileName.replace(/\.(csv|json)$/i, ''),
        description: '',
        background: '',
        dataSource: `导入自 ${importData.fileName}`,
        collectionMethod: '',
        fieldDescription: importData.columns
          .map(col => `${col} (${importData.detectedTypes[col]})`)
          .join('、'),
        cleaningSteps: '',
        insights: [],
        tags: [importData.fileType.toUpperCase()],
        createdAt: now,
        updatedAt: now,
        rowCount: importData.rowCount,
        cleanedRowCount: 0,
      };

      // 保存原始数据
      await saveRawData(projectId, importData.rows);

      // 创建项目
      await createProject(project);

      setCreatedProject(project);
      setStep('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : '导入失败');
      setStep('error');
    }
  }, [importData, saveRawData, createProject]);

  // 关闭模态框
  const handleClose = useCallback(() => {
    // 如果导入成功，通知父组件
    if (step === 'success' && createdProject) {
      onImportSuccess(createdProject);
    }

    // 重置状态
    setStep('upload');
    setImportData(null);
    setError(null);
    setCreatedProject(null);
    onClose();
  }, [step, createdProject, onImportSuccess, onClose]);

  // 返回上传步骤
  const handleBack = useCallback(() => {
    setStep('upload');
    setImportData(null);
    setError(null);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />

      {/* 模态框 */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
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
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {/* 上传步骤 */}
            {step === 'upload' && (
              <div className="space-y-6">
                <p className="text-gray-600">
                  上传 CSV 或 JSON 文件以创建新的数据项目。系统将自动检测列名和数据类型。
                </p>
                <FileUpload onFileSelect={handleFileSelect} />
              </div>
            )}

            {/* 预览步骤 */}
            {step === 'preview' && importData && (
              <ImportPreview
                data={importData}
                onConfirm={handleConfirm}
                onCancel={handleBack}
                isImporting={false}
              />
            )}

            {/* 导入中状态 */}
            {step === 'importing' && (
              <div className="flex flex-col items-center justify-center py-12">
                <svg
                  className="animate-spin h-12 w-12 text-blue-500 mb-4"
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
                <p className="text-lg text-gray-700">正在导入数据，请稍候...</p>
              </div>
            )}

            {/* 成功状态 */}
            {step === 'success' && createdProject && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">数据导入成功！</h3>
                <p className="text-gray-600 mb-4">
                  已成功导入 <span className="font-medium">{createdProject.name}</span>，共 {createdProject.rowCount.toLocaleString()} 行数据
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  开始分析
                </button>
              </div>
            )}

            {/* 错误状态 */}
            {step === 'error' && error && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">导入失败</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <div className="flex space-x-3">
                  <button
                    onClick={handleBack}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    重新上传
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
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