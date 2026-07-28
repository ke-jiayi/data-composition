import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { DataRow } from '../../utils/db';
import { CHART_COLORS } from './types';

export type ChartType = 'bar' | 'line' | 'pie';
export type AggregationType = 'sum' | 'average' | 'count';

export interface ChartPanelProps {
  data: DataRow[];
  fields: string[];
  className?: string;
  height?: number;
}

interface ConfigState {
  chartType: ChartType;
  xField: string;
  yField: string;
  aggregation: AggregationType;
}

const AGGREGATION_OPTIONS: { value: AggregationType; label: string }[] = [
  { value: 'sum', label: '求和' },
  { value: 'average', label: '平均值' },
  { value: 'count', label: '计数' },
];

const parseNumeric = (value: unknown): number => {
  if (typeof value === 'number') return value;
  const parsed = parseFloat(String(value));
  return isNaN(parsed) ? 0 : parsed;
};

export const ChartPanel = ({
  data,
  fields,
  className = '',
  height = 280,
}: ChartPanelProps) => {
  const chartRef = useRef<ReactECharts>(null);
  const [config, setConfig] = useState<ConfigState>({
    chartType: 'bar',
    xField: '',
    yField: '',
    aggregation: 'sum',
  });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const numericFields = useMemo(() => {
    return fields.filter((field) => {
      const sampleValue = data[0]?.[field];
      return typeof sampleValue === 'number' || !isNaN(parseFloat(String(sampleValue)));
    });
  }, [fields, data]);

  const categoryFields = useMemo(() => {
    return fields.filter((field) => !numericFields.includes(field));
  }, [fields, numericFields]);

  const updateConfig = useCallback(<K extends keyof ConfigState>(
    key: K,
    value: ConfigState[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setSelectedCategory(null);
  }, []);

  const isReady = Boolean(config.xField && config.yField);

  const { xAxisData, yAxisData } = useMemo(() => {
    if (!isReady) return { xAxisData: [] as string[], yAxisData: [] as number[] };

    const xValues = [...new Set(data.map((row) => String(row[config.xField] ?? '')))];

    const yValues = xValues.map((xValue) => {
      const matchingRows = data.filter((row) => String(row[config.xField] ?? '') === xValue);
      if (config.aggregation === 'count') {
        return matchingRows.length;
      }
      const values = matchingRows.map((row) => parseNumeric(row[config.yField]));
      const total = values.reduce((sum, v) => sum + v, 0);
      if (config.aggregation === 'average') {
        return values.length === 0 ? 0 : total / values.length;
      }
      return total;
    });

    return { xAxisData: xValues, yAxisData: yValues };
  }, [isReady, config, data]);

  const chartOption = useMemo((): EChartsOption | null => {
    if (!isReady) return null;

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
          selectedMode: 'single',
          selected: selectedCategory
            ? { dataIndex: xAxisData.indexOf(selectedCategory) }
            : undefined,
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
          selectedMode: 'single',
          selected: selectedCategory
            ? { dataIndex: xAxisData.indexOf(selectedCategory) }
            : undefined,
        }],
      };
    }

    const pieData = xAxisData.map((name, index) => ({
      name,
      value: yAxisData[index],
      selected: name === selectedCategory,
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
        selectedMode: 'single',
        data: pieData,
      }],
    };
  }, [isReady, config, xAxisData, yAxisData, selectedCategory]);

  useEffect(() => {
    if (!isReady) setSelectedCategory(null);
  }, [isReady]);

  const handleChartClick = useCallback((params: unknown) => {
    const p = params as { name?: string; dataIndex?: number };
    if (p?.name) {
      setSelectedCategory((prev) => (prev === p.name ? null : p.name!));
    } else if (typeof p?.dataIndex === 'number' && xAxisData[p.dataIndex]) {
      const name = xAxisData[p.dataIndex];
      setSelectedCategory((prev) => (prev === name ? null : name));
    }
  }, [xAxisData]);

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

  const chartTypes = [
    { value: 'bar', label: '柱状图', icon: '📊' },
    { value: 'line', label: '折线图', icon: '📈' },
    { value: 'pie', label: '饼图', icon: '🥧' },
  ] as const;

  const detailRows = useMemo(() => {
    if (!selectedCategory || !config.xField) return [];
    return data
      .filter((row) => String(row[config.xField] ?? '') === selectedCategory)
      .slice(0, 10);
  }, [selectedCategory, config.xField, data]);

  const tableColumns = useMemo(() => {
    if (detailRows.length === 0) return [];
    return Object.keys(detailRows[0]);
  }, [detailRows]);

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="p-2 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">图表配置</span>
          <div className="flex items-center gap-1">
            <button
              onClick={handleExportPng}
              disabled={!chartOption}
              className="p-2 border border-gray-300 rounded-md shadow-sm
                         hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         text-gray-700 transition-colors"
              title="导出 PNG"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            <button
              onClick={toggleCollapse}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              title={isCollapsed ? '展开' : '折叠'}
            >
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              聚合方式
            </label>
            <select
              value={config.aggregation}
              onChange={(e) => updateConfig('aggregation', e.target.value as AggregationType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         bg-white text-gray-900"
            >
              {AGGREGATION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {fields.length === 0 && (
          <div className="mt-1.5 p-1.5 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-xs text-yellow-700">
              暂无字段可选，请先上传数据
            </p>
          </div>
        )}
        {!config.xField && config.yField && (
          <div className="mt-1.5 p-1.5 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-xs text-blue-700">
              请选择 X 轴字段（分类字段）
            </p>
          </div>
        )}
        {config.xField && !config.yField && (
          <div className="mt-1.5 p-1.5 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-xs text-blue-700">
              请选择 Y 轴字段（数值字段）
            </p>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <div className="p-2">
          {data.length === 0 ? (
            <div className="flex items-center justify-center bg-gray-50 rounded-lg min-h-32">
              <div className="text-center p-4">
                <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-sm text-gray-500">暂无数据，请先上传数据</p>
              </div>
            </div>
          ) : chartOption ? (
            <ReactECharts
              ref={chartRef}
              option={chartOption}
              style={{ height, width: '100%' }}
              notMerge={true}
              lazyUpdate={true}
              opts={{ renderer: 'canvas', locale: 'ZH' }}
              onEvents={{
                click: handleChartClick,
              }}
            />
          ) : (
            <div className="flex items-center justify-center bg-gray-50 rounded-lg min-h-32">
              <div className="text-center p-4">
                <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-sm text-gray-500">选择 X、Y 字段后自动生成图表</p>
              </div>
            </div>
          )}

          {selectedCategory && detailRows.length > 0 && (
            <div className="mt-3 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200">
                <span className="text-xs font-medium text-gray-700">
                  「{selectedCategory}」数据明细（前 {detailRows.length} 条）
                </span>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  关闭
                </button>
              </div>
              <div className="overflow-x-auto max-h-48 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      {tableColumns.map((col) => (
                        <th key={col} className="px-3 py-2 text-left font-medium text-gray-600 border-b border-gray-200">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {detailRows.map((row, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                        {tableColumns.map((col) => (
                          <td key={col} className="px-3 py-1.5 text-gray-700">
                            {String(row[col] ?? '')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChartPanel;
