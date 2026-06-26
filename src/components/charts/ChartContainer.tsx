import { useCallback } from 'react';
import type { ChartContainerProps } from './types';

/**
 * 图表容器组件
 * 提供统一的图表包装，包含标题、工具栏、导出功能等
 *
 * @requires echarts-for-react
 * npm install echarts-for-react
 */
export const ChartContainer = ({
  title,
  children,
  showToolbar = true,
  showExport = true,
  className = '',
  onExport,
  onDelete,
}: ChartContainerProps) => {
  /**
   * 导出图表为图片
   * 注意：导出功能需要图表组件自己实现getDataURL方法
   */
  const handleExport = useCallback(() => {
    if (onExport) {
      onExport('');
    } else {
      console.warn('导出功能需要图表组件配合实现');
    }
  }, [onExport]);

  /**
   * 删除图表
   */
  const handleDelete = useCallback(() => {
    if (onDelete) {
      onDelete();
    }
  }, [onDelete]);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* 头部 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">{title}</h3>

        {/* 工具栏 */}
        {showToolbar && (
          <div className="flex items-center gap-2">
            {showExport && (
              <button
                onClick={handleExport}
                className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors flex items-center gap-1"
                title="导出为图片"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span className="hidden sm:inline">导出</span>
              </button>
            )}
            {onDelete && (
              <button
                onClick={handleDelete}
                className="px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors flex items-center gap-1"
                title="删除图表"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span className="hidden sm:inline">删除</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* 图表区域 */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default ChartContainer;