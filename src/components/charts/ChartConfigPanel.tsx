import { useCallback } from 'react';
import type { ChartConfigPanelProps, ChartConfigState } from './types';

/**
 * 图表类型配置
 */
const CHART_TYPES = [
  { value: 'bar', label: '柱状图', icon: '📊' },
  { value: 'line', label: '折线图', icon: '📈' },
  { value: 'pie', label: '饼图', icon: '🥧' },
  { value: 'scatter', label: '散点图', icon: '⚬' },
] as const;

/**
 * 数据源配置
 */
const DATA_SOURCES = [
  { value: 'raw', label: '原始数据' },
  { value: 'cleaned', label: '清洗后数据' },
] as const;

/**
 * 图表配置面板组件
 * 允许用户选择图表类型、配置数据字段等
 */
export const ChartConfigPanel = ({
  fields,
  config,
  onChange,
  onCancel,
  onConfirm,
  showActions = true,
}: ChartConfigPanelProps) => {
  /**
   * 更新配置字段
   */
  const updateConfig = useCallback(
    <K extends keyof ChartConfigState>(key: K, value: ChartConfigState[K]) => {
      onChange({
        ...config,
        [key]: value,
      });
    },
    [config, onChange]
  );

  /**
   * 判断是否为饼图
   */
  const isPieChart = config.chartType === 'pie';

  /**
   * 获取可用字段
   */
  const getAvailableFields = useCallback(
    () => {
      return fields.map((field) => ({
        value: field,
        label: field,
        disabled: false,
      }));
    },
    [fields]
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
      {/* 图表标题 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          图表标题
        </label>
        <input
          type="text"
          value={config.title}
          onChange={(e) => updateConfig('title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="请输入图表标题"
        />
      </div>

      {/* 图表类型选择 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          图表类型
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CHART_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => updateConfig('chartType', type.value)}
              className={`
                px-3 py-2 rounded-md border text-sm font-medium transition-colors
                flex items-center justify-center gap-2
                ${
                  config.chartType === type.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <span>{type.icon}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 数据源选择 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          数据源
        </label>
        <select
          value={config.dataSource}
          onChange={(e) =>
            updateConfig('dataSource', e.target.value as 'raw' | 'cleaned')
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {DATA_SOURCES.map((source) => (
            <option key={source.value} value={source.value}>
              {source.label}
            </option>
          ))}
        </select>
      </div>

      {/* 字段配置 - 根据图表类型显示不同字段 */}
      {!isPieChart ? (
        // 柱状图、折线图、散点图字段配置
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              X 轴字段
            </label>
            <select
              value={config.xAxisField || ''}
              onChange={(e) => updateConfig('xAxisField', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">请选择 X 轴字段</option>
              {getAvailableFields().map((field) => (
                <option key={field.value} value={field.value}>
                  {field.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Y 轴字段
            </label>
            <select
              value={config.yAxisField || ''}
              onChange={(e) => updateConfig('yAxisField', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">请选择 Y 轴字段</option>
              {getAvailableFields().map((field) => (
                <option key={field.value} value={field.value}>
                  {field.label}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : (
        // 饼图字段配置
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              分类字段
            </label>
            <select
              value={config.categoryField || ''}
              onChange={(e) => updateConfig('categoryField', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">请选择分类字段</option>
              {getAvailableFields().map((field) => (
                <option key={field.value} value={field.value}>
                  {field.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              数值字段
            </label>
            <select
              value={config.valueField || ''}
              onChange={(e) => updateConfig('valueField', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">请选择数值字段</option>
              {getAvailableFields().map((field) => (
                <option key={field.value} value={field.value}>
                  {field.label}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      {/* 字段提示 */}
      {fields.length === 0 && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-700">
            暂无可选字段，请先上传数据或选择数据源
          </p>
        </div>
      )}

      {/* 操作按钮 */}
      {showActions && (
        <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-200">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              取消
            </button>
          )}
          {onConfirm && (
            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              确认创建
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ChartConfigPanel;