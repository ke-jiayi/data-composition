import { useMemo, useState } from 'react';
import type { ImportData } from '../types';

interface ImportPreviewProps {
  data: ImportData;
  onConfirm: () => void;
  onCancel: () => void;
  isImporting?: boolean;
}

const PREVIEW_ROWS = 10; // 预览显示的行数

export const ImportPreview = ({
  data,
  onConfirm,
  onCancel,
  isImporting = false,
}: ImportPreviewProps) => {
  const [showAllRows, setShowAllRows] = useState(false);

  // 预览数据（限制行数）
  const previewRows = useMemo(() => {
    return showAllRows ? data.rows : data.rows.slice(0, PREVIEW_ROWS);
  }, [data.rows, showAllRows]);

  // 类型图标映射
  const typeIcons: Record<string, string> = {
    string: '📝',
    number: '🔢',
    boolean: '✓✗',
    date: '📅',
  };

  // 类型颜色映射
  const typeColors: Record<string, string> = {
    string: 'bg-blue-100 text-blue-800',
    number: 'bg-green-100 text-green-800',
    boolean: 'bg-purple-100 text-purple-800',
    date: 'bg-orange-100 text-orange-800',
  };

  // 格式化单元格值显示
  const formatCellValue = (value: string | number | boolean | null): string => {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    if (typeof value === 'number') {
      // 数字格式化：最多保留 4 位小数
      return value % 1 === 0 ? value.toString() : value.toFixed(4);
    }
    // 字符串过长截断
    const str = String(value);
    return str.length > 50 ? str.substring(0, 47) + '...' : str;
  };

  return (
    <div className="w-full space-y-6">
      {/* 文件信息摘要 */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">文件信息</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500">文件名：</span>
            <span className="font-medium text-gray-900 ml-1">{data.fileName}</span>
          </div>
          <div>
            <span className="text-gray-500">类型：</span>
            <span className="font-medium text-gray-900 ml-1 uppercase">{data.fileType}</span>
          </div>
          <div>
            <span className="text-gray-500">列数：</span>
            <span className="font-medium text-gray-900 ml-1">{data.columns.length}</span>
          </div>
          <div>
            <span className="text-gray-500">行数：</span>
            <span className="font-medium text-gray-900 ml-1">{data.rowCount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* 列信息 */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">列信息</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.columns.map((column) => (
              <div
                key={column}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <span className="font-medium text-gray-900 truncate">{column}</span>
                </div>
                <span
                  className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                    typeColors[data.detectedTypes[column]]
                  }`}
                >
                  {typeIcons[data.detectedTypes[column]]} {data.detectedTypes[column]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 数据预览表格 */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">数据预览</h3>
          {!showAllRows && data.rows.length > PREVIEW_ROWS && (
            <span className="text-sm text-gray-500">
              显示前 {PREVIEW_ROWS} 行（共 {data.rowCount.toLocaleString()} 行）
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 sticky left-0 z-10">
                  #
                </th>
                {data.columns.map((column) => (
                  <th
                    key={column}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {previewRows.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap sticky left-0 bg-inherit">
                    {index + 1}
                  </td>
                  {data.columns.map((column) => (
                    <td
                      key={column}
                      className="px-4 py-2 text-sm text-gray-900 whitespace-nowrap"
                    >
                      {formatCellValue(row[column])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 显示更多/收起按钮 */}
        {data.rows.length > PREVIEW_ROWS && (
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 text-center">
            <button
              onClick={() => setShowAllRows(!showAllRows)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {showAllRows ? '收起' : `查看全部 ${data.rowCount.toLocaleString()} 行`}
            </button>
          </div>
        )}
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          onClick={onCancel}
          disabled={isImporting}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          取消
        </button>
        <button
          onClick={onConfirm}
          disabled={isImporting}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isImporting && (
            <svg
              className="animate-spin h-4 w-4 text-white"
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
          )}
          <span>{isImporting ? '导入中...' : '确认导入'}</span>
        </button>
      </div>
    </div>
  );
};