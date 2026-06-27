import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { DataRow, CleaningLog } from '../types';
import { deduplicate, fillNulls, deleteColumn } from '../utils/dataCleaning';

export interface DataCleaningProps {
  data: DataRow[];
  projectId: string;
  onDataChange: (data: DataRow[]) => void;
}

type FillStrategy = 'mean' | 'median' | 'custom';

const DataCleaning: React.FC<DataCleaningProps> = ({
  data,
  projectId,
  onDataChange,
}) => {
  const [logs, setLogs] = useState<CleaningLog[]>([]);
  const [showFillModal, setShowFillModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [fillStrategy, setFillStrategy] = useState<FillStrategy>('mean');
  const [customValue, setCustomValue] = useState<string>('');

  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  const addLog = useCallback(
    (operation: string, details: string, beforeCount?: number, afterCount?: number) => {
      const newLog: CleaningLog = {
        id: uuidv4(),
        projectId,
        operation,
        details,
        timestamp: Date.now(),
        affectedRows: beforeCount !== undefined && afterCount !== undefined ? beforeCount - afterCount : undefined,
      };
      setLogs((prev) => [newLog, ...prev]);
    },
    [projectId]
  );

  const handleDeduplicate = useCallback(() => {
    const beforeCount = data.length;
    const cleaned = deduplicate(data);
    const afterCount = cleaned.length;

    onDataChange(cleaned);
    addLog(
      '去重',
      `移除 ${beforeCount - afterCount} 条重复记录`,
      beforeCount,
      afterCount
    );
  }, [data, onDataChange, addLog]);

  const handleOpenFillModal = useCallback((column: string) => {
    setSelectedColumn(column);
    setShowFillModal(true);
  }, []);

  const handleFillNulls = useCallback(() => {
    const beforeCount = data.length;
    const cleaned = fillNulls(data, selectedColumn, fillStrategy, customValue || undefined);
    const afterCount = cleaned.length;

    const strategyText = fillStrategy === 'mean' ? '均值' : fillStrategy === 'median' ? '中位数' : `自定义值(${customValue || '无'})`;
    onDataChange(cleaned);
    addLog(
      '填充空值',
      `列 "${selectedColumn}" 使用 ${strategyText} 填充`,
      beforeCount,
      afterCount
    );
    setShowFillModal(false);
    setCustomValue('');
  }, [data, selectedColumn, fillStrategy, customValue, onDataChange, addLog]);

  const handleOpenDeleteModal = useCallback((column: string) => {
    setSelectedColumn(column);
    setShowDeleteModal(true);
  }, []);

  const handleDeleteColumn = useCallback(() => {
    const beforeCount = data.length;
    const cleaned = deleteColumn(data, selectedColumn);
    const afterCount = cleaned.length;

    onDataChange(cleaned);
    addLog(
      '删除列',
      `删除列 "${selectedColumn}"`,
      beforeCount,
      afterCount
    );
    setShowDeleteModal(false);
  }, [data, selectedColumn, onDataChange, addLog]);

  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md border border-gray-200">
      {/* 头部 */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">数据清洗</h3>
        <p className="text-sm text-gray-500 mt-1">
          当前数据：<span className="font-medium text-blue-500">{data.length}</span> 行
        </p>
      </div>

      {/* 操作按钮区域 */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleDeduplicate}
            disabled={data.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            去重
          </button>
        </div>

        {/* 列操作 */}
        {columns.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">列操作：</p>
            <div className="flex flex-wrap gap-2">
              {columns.map((column) => (
                <div
                  key={column}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  <span className="max-w-[120px] truncate">{column}</span>
                  <div className="flex items-center gap-1 ml-1">
                    <button
                      onClick={() => handleOpenFillModal(column)}
                      className="p-0.5 text-blue-500 hover:text-blue-700"
                      title="填充空值"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleOpenDeleteModal(column)}
                      className="p-0.5 text-red-500 hover:text-red-700"
                      title="删除列"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 清洗前后对比 */}
      {logs.length > 0 && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">清洗前：</span>
              <span className="text-lg font-semibold text-gray-900">
                {data.length + (logs.reduce((sum, log) => sum + (log.affectedRows || 0), 0))}
              </span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">清洗后：</span>
              <span className="text-lg font-semibold text-blue-500">{data.length}</span>
            </div>
            <span className="text-sm text-green-600">
              (-{logs.reduce((sum, log) => sum + (log.affectedRows || 0), 0)})
            </span>
          </div>
        </div>
      )}

      {/* 日志列表 */}
      <div className="p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">清洗日志</h4>
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <svg className="w-10 h-10 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-sm">暂无清洗记录</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {logs.map((log) => (
              <div
                key={log.id}
                className="p-3 bg-gray-50 border border-gray-200 rounded-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                      {log.operation}
                    </span>
                    <span className="text-sm text-gray-600">{log.details}</span>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {formatTimestamp(log.timestamp)}
                  </span>
                </div>
                {log.affectedRows !== undefined && log.affectedRows > 0 && (
                  <p className="text-xs text-green-600 mt-1">
                    影响行数：-{log.affectedRows}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 填充空值弹窗 */}
      {showFillModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-4 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900">填充空值</h4>
              <p className="text-sm text-gray-500 mt-1">列：{selectedColumn}</p>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">填充策略</label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="fillStrategy"
                      value="mean"
                      checked={fillStrategy === 'mean'}
                      onChange={() => setFillStrategy('mean')}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">均值</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="fillStrategy"
                      value="median"
                      checked={fillStrategy === 'median'}
                      onChange={() => setFillStrategy('median')}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">中位数</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="fillStrategy"
                      value="custom"
                      checked={fillStrategy === 'custom'}
                      onChange={() => setFillStrategy('custom')}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">自定义</span>
                  </label>
                </div>
              </div>
              {fillStrategy === 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">自定义值</label>
                  <input
                    type="text"
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    placeholder="请输入自定义值"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowFillModal(false);
                  setCustomValue('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleFillNulls}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 删除列弹窗 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-4 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900">删除列</h4>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600">
                确定要删除列 "<span className="font-medium text-gray-900">{selectedColumn}</span>" 吗？此操作不可撤销。
              </p>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleDeleteColumn}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataCleaning;