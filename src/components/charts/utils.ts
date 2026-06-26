import type { EChartsOption } from 'echarts';
import type { ChartConfigState } from './types';
import type { DataRow } from '../../types';
import { CHART_COLORS } from './types';

/**
 * 根据数据和配置生成柱状图配置选项
 */
export const generateBarChartOption = (
  data: DataRow[],
  xAxisField: string,
  yAxisField: string,
  title?: string
): EChartsOption => {
  // 提取 X 轴数据（去重）
  const xAxisData = [...new Set(data.map((row) => row[xAxisField]))];

  // 提取 Y 轴数据
  const yAxisData = xAxisData.map((xValue) => {
    const matchingRows = data.filter((row) => row[xAxisField] === xValue);
    // 如果有多行相同 X 值，计算 Y 值的总和
    return matchingRows.reduce((sum, row) => {
      const yValue = row[yAxisField];
      return sum + (typeof yValue === 'number' ? yValue : parseFloat(String(yValue)) || 0);
    }, 0);
  });

  return {
    title: title
      ? {
          text: title,
          left: 'center',
        }
      : undefined,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: title ? '15%' : '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: xAxisData.map(String),
      axisLabel: {
        rotate: xAxisData.length > 6 ? 30 : 0,
      },
    },
    yAxis: {
      type: 'value',
      name: yAxisField,
    },
    series: [
      {
        name: yAxisField,
        type: 'bar',
        data: yAxisData,
        itemStyle: {
          color: CHART_COLORS[0],
        },
        emphasis: {
          focus: 'series',
        },
      },
    ],
  };
};

/**
 * 根据数据和配置生成折线图配置选项
 */
export const generateLineChartOption = (
  data: DataRow[],
  xAxisField: string,
  yAxisField: string,
  title?: string
): EChartsOption => {
  // 提取 X 轴数据（去重）
  const xAxisData = [...new Set(data.map((row) => row[xAxisField]))];

  // 提取 Y 轴数据
  const yAxisData = xAxisData.map((xValue) => {
    const matchingRows = data.filter((row) => row[xAxisField] === xValue);
    return matchingRows.reduce((sum, row) => {
      const yValue = row[yAxisField];
      return sum + (typeof yValue === 'number' ? yValue : parseFloat(String(yValue)) || 0);
    }, 0);
  });

  return {
    title: title
      ? {
          text: title,
          left: 'center',
        }
      : undefined,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: title ? '15%' : '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: xAxisData.map(String),
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      name: yAxisField,
    },
    series: [
      {
        name: yAxisField,
        type: 'line',
        data: yAxisData,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          width: 2,
        },
        areaStyle: {
          opacity: 0.3,
        },
        emphasis: {
          focus: 'series',
        },
      },
    ],
  };
};

/**
 * 根据数据和配置生成饼图配置选项
 */
export const generatePieChartOption = (
  data: DataRow[],
  categoryField: string,
  valueField: string,
  title?: string
): EChartsOption => {
  // 按分类字段聚合数据
  const categoryMap = new Map<string, number>();

  data.forEach((row) => {
    const category = String(row[categoryField] ?? '');
    const value =
      typeof row[valueField] === 'number'
        ? row[valueField]
        : parseFloat(String(row[valueField])) || 0;

    categoryMap.set(category, (categoryMap.get(category) ?? 0) + value);
  });

  // 转换为饼图数据格式
  const pieData = Array.from(categoryMap.entries()).map(([name, value], index) => ({
    name,
    value,
    itemStyle: {
      color: CHART_COLORS[index % CHART_COLORS.length],
    },
  }));

  return {
    title: title
      ? {
          text: title,
          left: 'center',
        }
      : undefined,
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 'middle',
    },
    series: [
      {
        name: categoryField,
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
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: true,
        },
        data: pieData,
      },
    ],
  };
};

/**
 * 根据图表类型自动生成对应的配置
 */
export const generateChartOption = (
  chartType: ChartConfigState['chartType'],
  data: DataRow[],
  config: ChartConfigState
): EChartsOption => {
  switch (chartType) {
    case 'bar':
      if (!config.xAxisField || !config.yAxisField) {
        throw new Error('柱状图需要配置 X 轴字段和 Y 轴字段');
      }
      return generateBarChartOption(data, config.xAxisField, config.yAxisField, config.title);

    case 'line':
      if (!config.xAxisField || !config.yAxisField) {
        throw new Error('折线图需要配置 X 轴字段和 Y 轴字段');
      }
      return generateLineChartOption(data, config.xAxisField, config.yAxisField, config.title);

    case 'pie':
      if (!config.categoryField || !config.valueField) {
        throw new Error('饼图需要配置分类字段和数值字段');
      }
      return generatePieChartOption(data, config.categoryField, config.valueField, config.title);

    case 'scatter':
      if (!config.xAxisField || !config.yAxisField) {
        throw new Error('散点图需要配置 X 轴字段和 Y 轴字段');
      }
      // 散点图使用类似柱状图的配置
      return generateBarChartOption(data, config.xAxisField, config.yAxisField, config.title);

    default:
      throw new Error(`不支持的图表类型: ${chartType}`);
  }
};

/**
 * 验证图表配置是否完整
 */
export const validateChartConfig = (config: ChartConfigState): { valid: boolean; error?: string } => {
  if (!config.title.trim()) {
    return { valid: false, error: '请输入图表标题' };
  }

  if (config.chartType === 'pie') {
    if (!config.categoryField) {
      return { valid: false, error: '请选择分类字段' };
    }
    if (!config.valueField) {
      return { valid: false, error: '请选择数值字段' };
    }
  } else {
    if (!config.xAxisField) {
      return { valid: false, error: '请选择 X 轴字段' };
    }
    if (!config.yAxisField) {
      return { valid: false, error: '请选择 Y 轴字段' };
    }
  }

  return { valid: true };
};