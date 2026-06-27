import { useState, useRef, useCallback, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { DataRow } from '../../types';
import { CHART_COLORS } from './types';

export type ChartType = 'bar' | 'line' | 'pie';

export interface ChartPanelProps {
  /** 数据源 */
  data: DataRow[];
  /** 可用字段列表 */
  fields: string[];
  /** 自定义类名 */
  className?: string;
  /** 高度 */
  height?: number;
}

/**
 * 图表配置状态
 */
interface ConfigState {
  chartType: ChartType;
  xField: string;
  yField: string;
}

/**
 * ChartPanel 图表容器组件
 * 提供图表类型选择、字段选择、图表生成和导出功能
 */
export const ChartPanel = ({
  data,
  fields,
  className = '',
  height = 300,
}: ChartPanelProps) => {
  const chartRef = useRef<ReactECharts>(null);
  const [config, setConfig] = useState<ConfigState>({
    chartType: 'bar',
    xField: '',
    yField: '',
  });
  const [generated, setGenerated] = useState(false);

  // 数值字段筛选
  const numericFields = useMemo(() => {
    return fields.filter((field) => {
      const sampleValue = data[0]?.[field];
      return typeof sampleValue === 'number' || !isNaN(parseFloat(String(sampleValue)));
    });
  }, [fields, data]);

  // 分类字段（默认为所有非数值字段）
  const categoryFields = useMemo(() => {
    return fields.filter((field) => !numericFields.includes(field));
  }, [fields, numericFields]);

  // 更新配置
  const updateConfig = useCallback(<K extends keyof ConfigState>(
    key: K,
    value: ConfigState[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setGenerated(false);
  }, []);

  // 生成图表配置
  const chartOption = useMemo((): EChartsOption | null => {
    if (!generated || !config.xField || !config.yField) {
      return null;
    }

    // 提取 X 轴数据（去重）
    const xAxisData = [...new Set(data.map((row) => String(row[config.xField] ?? '')))];

    // 聚合 Y 轴数据
    const yAxisData = xAxisData.map((xValue) => {
      const matchingRows = data.filter((row) => String(row[config.xField] ?? '') === xValue);
      return matchingRows.reduce((sum, row) => {
        const yValue = row[config.yField];
        return sum + (typeof yValue === 'number' ? yValue : parseFloat(String(yValue)) || 0);
      }, 0);
    });

    const baseOption: EChartsOption = {
      backgroundColor: '#ffffff',
      color: CHART_COLORS,
      tooltip: {
        trigger: config.chartType === 'pie' ? 'item' : 'axis',
        axisPointer: { type: 'shadow' },
        confine: true,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '10%',
        containLabel: true,
      },
    };

    if (config.chartType === 'bar') {
      return {
        ...baseOption,
        xAxis: {
          type: 'category',
          data: xAxisData,
          axisLabel: { rotate: xAxisData.length > 6 ? 30 : 0 },
        },
        yAxis: { type: 'value', name: config.yField },
        series: [{
          type: 'bar',
          data: yAxisData,
          itemStyle: { color: CHART_COLORS[0] },
          emphasis: { focus: 'series' },
        }],
      };
    }

    if (config.chartType === 'line') {
      return {
        ...baseOption,
        xAxis: {
          type: 'category',
          data: xAxisData,
          boundaryGap: false,
        },
        yAxis: { type: 'value', name: config.yField },
        series: [{
          type: 'line',
          data: yAxisData,
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 2 },
          areaStyle: { opacity: 0.3 },
          emphasis: { focus: 'series' },
        }],
      };
    }

    // Pie chart
    const pieData = xAxisData.map((name, index) => ({
      name,
      value: yAxisData[index],
    }));

    return {
      ...baseOption,
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 'middle',
      },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          formatter: '{b}: {d}%',
        },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 'bold' },
        },
        data: pieData,
      }],
    };
  }, [generated, config, data]);

  // 生成图表
  const handleGenerate = useCallback(() => {
    if (config.xField && config.yField) {
      setGenerated(true);
    }
  }, [config.xField, config.yField]);

  // 导出 PNG
  const handleExportPng = useCallback(() => {
    if (chartRef.current) {
      const echartsInstance = chartRef.current.getEchartsInstance();
      const dataURL = echartsInstance.getDataURL({
        type: 'png',
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = 'chart.png';
      link.href = dataURL;
      link.click();
    }
  }, []);

  // 图表类型选项
  const chartTypes = [
    { value: 'bar', label: '柱状图', icon: '📊' },
    { value: 'line', label: '折线图', icon: '📈' },
    { value: 'pie', label: '饼图', icon: '🥧' },
  ] as const;

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* 配置区域 */}
      <div className="p-3 border-b border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* 图表类型 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              图表类型
            </label>
            <select
              value={config.chartType}
              onChange={(e) => updateConfig('chartType', e.target.value as ChartType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         bg-white text-gray-900"
            >
              {chartTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* X 轴字段 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              X 轴字段
            </label>
            <select
              value={config.xField}
              onChange={(e) => updateConfig('xField', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         bg-white text-gray-900"
            >
              <option value="">选择 X 轴字段</option>
              {categoryFields.map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>

          {/* Y 轴字段 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Y 轴字段
            </label>
            <select
              value={config.yField}
              onChange={(e) => updateConfig('yField', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         bg-white text-gray-900"
            >
              <option value="">选择 Y 轴字段</option>
              {numericFields.map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>

          {/* 操作按钮 */}
          <div className="flex items-end gap-2">
            <button
              onClick={handleGenerate}
              disabled={!config.xField || !config.yField}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm
                         hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         font-medium transition-colors"
            >
              生成图表
            </button>
            <button
              onClick={handleExportPng}
              disabled={!generated || !chartOption}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm
                         hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         text-gray-700 font-medium transition-colors"
              title="导出 PNG"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
        </div>

        {/* 提示信息 */}
        {fields.length === 0 && (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-xs text-yellow-700">
              暂无字段可选，请先上传数据
            </p>
          </div>
        )}
        {!config.xField && config.yField && (
          <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-xs text-blue-700">
              请选择 X 轴字段（分类字段）
            </p>
          </div>
        )}
        {config.xField && !config.yField && (
          <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-xs text-blue-700">
              请选择 Y 轴字段（数值字段）
            </p>
          </div>
        )}
      </div>

      {/* 图表展示区域 */}
      <div className="p-3">
        {chartOption ? (
          <ReactECharts
            ref={chartRef}
            option={chartOption}
            style={{ height, width: '100%' }}
            notMerge={true}
            lazyUpdate={true}
            opts={{ renderer: 'canvas', locale: 'ZH' }}
          />
        ) : (
          <div
            className="flex items-center justify-center bg-gray-50 rounded-lg"
            style={{ height }}
          >
            <div className="text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p>选择字段后点击"生成图表"按钮</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartPanel;
