import type { EChartsOption } from 'echarts';
import type { DataRow } from '../types';
import ReactECharts from 'echarts-for-react';

/**
 * 蓝色图表配色方案
 */
export const BLUE_CHART_COLORS = [
  '#2563eb', // blue-600
  '#3b82f6', // blue-500
  '#60a5fa', // blue-400
  '#93c5fd', // blue-300
  '#1d4ed8', // blue-700
  '#1e40af', // blue-800
  '#1e3a8a', // blue-900
  '#60a5fa', // sky-400
  '#38bdf8', // sky-400
];

/**
 * 生成柱状图配置
 * @param data 数据数组
 * @param xField X轴字段名（分类字段）
 * @param yField Y轴字段名（数值字段）
 * @param title 图表标题
 * @returns ECharts 配置对象
 */
export const generateBarConfig = (
  data: DataRow[],
  xField: string,
  yField: string,
  title?: string
): EChartsOption => {
  // 提取 X 轴数据（去重）
  const xAxisData = [...new Set(data.map((row) => String(row[xField] ?? '')))];

  // 聚合 Y 轴数据
  const yAxisData = xAxisData.map((xValue) => {
    const matchingRows = data.filter((row) => String(row[xField] ?? '') === xValue);
    return matchingRows.reduce((sum, row) => {
      const yValue = row[yField];
      return sum + (typeof yValue === 'number' ? yValue : parseFloat(String(yValue)) || 0);
    }, 0);
  });

  return {
    backgroundColor: '#ffffff',
    color: BLUE_CHART_COLORS,
    title: title
      ? {
          text: title,
          left: 'center',
          textStyle: {
            fontSize: 16,
            fontWeight: 600,
            color: '#1f2937',
          },
        }
      : undefined,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      confine: true,
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
      data: xAxisData,
      axisLabel: {
        rotate: xAxisData.length > 6 ? 30 : 0,
        color: '#374151',
      },
      axisLine: {
        lineStyle: {
          color: '#d1d5db',
        },
      },
    },
    yAxis: {
      type: 'value',
      name: yField,
      nameTextStyle: {
        color: '#6b7280',
      },
      axisLabel: {
        color: '#374151',
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: '#f3f4f6',
        },
      },
    },
    series: [
      {
        name: yField,
        type: 'bar',
        data: yAxisData,
        barWidth: '60%',
        itemStyle: {
          color: BLUE_CHART_COLORS[0],
          borderRadius: [4, 4, 0, 0],
        },
        emphasis: {
          focus: 'series',
          itemStyle: {
            color: BLUE_CHART_COLORS[1],
          },
        },
      },
    ],
  };
};

/**
 * 生成折线图配置
 * @param data 数据数组
 * @param xField X轴字段名（分类字段）
 * @param yField Y轴字段名（数值字段）
 * @param title 图表标题
 * @returns ECharts 配置对象
 */
export const generateLineConfig = (
  data: DataRow[],
  xField: string,
  yField: string,
  title?: string
): EChartsOption => {
  // 提取 X 轴数据（去重）
  const xAxisData = [...new Set(data.map((row) => String(row[xField] ?? '')))];

  // 聚合 Y 轴数据
  const yAxisData = xAxisData.map((xValue) => {
    const matchingRows = data.filter((row) => String(row[xField] ?? '') === xValue);
    return matchingRows.reduce((sum, row) => {
      const yValue = row[yField];
      return sum + (typeof yValue === 'number' ? yValue : parseFloat(String(yValue)) || 0);
    }, 0);
  });

  return {
    backgroundColor: '#ffffff',
    color: BLUE_CHART_COLORS,
    title: title
      ? {
          text: title,
          left: 'center',
          textStyle: {
            fontSize: 16,
            fontWeight: 600,
            color: '#1f2937',
          },
        }
      : undefined,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
      confine: true,
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
      data: xAxisData,
      boundaryGap: false,
      axisLabel: {
        color: '#374151',
      },
      axisLine: {
        lineStyle: {
          color: '#d1d5db',
        },
      },
    },
    yAxis: {
      type: 'value',
      name: yField,
      nameTextStyle: {
        color: '#6b7280',
      },
      axisLabel: {
        color: '#374151',
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: '#f3f4f6',
        },
      },
    },
    series: [
      {
        name: yField,
        type: 'line',
        data: yAxisData,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          width: 2,
          color: BLUE_CHART_COLORS[0],
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(37, 99, 235, 0.3)' },
              { offset: 1, color: 'rgba(37, 99, 235, 0.05)' },
            ],
          },
        },
        emphasis: {
          focus: 'series',
          itemStyle: {
            color: BLUE_CHART_COLORS[1],
            borderColor: '#fff',
            borderWidth: 2,
          },
        },
      },
    ],
  };
};

/**
 * 生成饼图配置
 * @param data 数据数组
 * @param categoryField 分类字段名
 * @param valueField 数值字段名
 * @param title 图表标题
 * @returns ECharts 配置对象
 */
export const generatePieConfig = (
  data: DataRow[],
  categoryField: string,
  valueField: string,
  title?: string
): EChartsOption => {
  // 按分类字段聚合数据
  const categoryMap = new Map<string, number>();

  data.forEach((row) => {
    const category = String(row[categoryField] ?? '');
    const value = row[valueField];
    const numValue =
      typeof value === 'number'
        ? value
        : parseFloat(String(value)) || 0;

    categoryMap.set(category, (categoryMap.get(category) ?? 0) + numValue);
  });

  // 转换为饼图数据格式
  const pieData = Array.from(categoryMap.entries()).map(([name, value], index) => ({
    name,
    value,
    itemStyle: {
      color: BLUE_CHART_COLORS[index % BLUE_CHART_COLORS.length],
    },
  }));

  return {
    backgroundColor: '#ffffff',
    title: title
      ? {
          text: title,
          left: 'center',
          textStyle: {
            fontSize: 16,
            fontWeight: 600,
            color: '#1f2937',
          },
        }
      : undefined,
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
      confine: true,
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 'middle',
      textStyle: {
        color: '#374151',
      },
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
          color: '#374151',
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
 * 中国省份坐标数据
 */
const CHINA_PROVINCE_COORDS: Record<string, [number, number]> = {
  '北京': [116.46, 39.92],
  '天津': [117.2, 39.13],
  '河北': [114.48, 38.03],
  '山西': [112.53, 37.87],
  '内蒙古': [111.65, 40.82],
  '辽宁': [123.38, 41.8],
  '吉林': [125.35, 43.88],
  '黑龙江': [126.63, 45.75],
  '上海': [121.48, 31.22],
  '江苏': [118.78, 32.04],
  '浙江': [120.19, 30.26],
  '安徽': [117.27, 31.86],
  '福建': [119.3, 26.08],
  '江西': [115.89, 28.68],
  '山东': [116.97, 36.65],
  '河南': [113.65, 34.76],
  '湖北': [114.31, 30.52],
  '湖南': [113, 28.21],
  '广东': [113.23, 23.16],
  '广西': [110.28, 25.29],
  '海南': [110.35, 20.02],
  '重庆': [106.54, 29.59],
  '四川': [104.06, 30.67],
  '贵州': [106.71, 26.57],
  '云南': [102.73, 25.04],
  '西藏': [91.11, 29.97],
  '陕西': [108.95, 34.27],
  '甘肃': [103.73, 36.03],
  '青海': [101.74, 36.56],
  '宁夏': [106.27, 38.47],
  '新疆': [87.68, 43.77],
  '香港': [114.1, 22.2],
  '澳门': [113.33, 22.13],
  '台湾': [121.5, 25.03],
};

/**
 * 省份别名映射
 */
const PROVINCE_ALIASES: Record<string, string> = {
  '北京市': '北京',
  '天津市': '天津',
  '河北省': '河北',
  '山西省': '山西',
  '内蒙古自治区': '内蒙古',
  '辽宁省': '辽宁',
  '吉林省': '吉林',
  '黑龙江省': '黑龙江',
  '上海市': '上海',
  '江苏省': '江苏',
  '浙江省': '浙江',
  '安徽省': '安徽',
  '福建省': '福建',
  '江西省': '江西',
  '山东省': '山东',
  '河南省': '河南',
  '湖北省': '湖北',
  '湖南省': '湖南',
  '广东省': '广东',
  '广西壮族自治区': '广西',
  '海南省': '海南',
  '重庆市': '重庆',
  '四川省': '四川',
  '贵州省': '贵州',
  '云南省': '云南',
  '西藏自治区': '西藏',
  '陕西省': '陕西',
  '甘肃省': '甘肃',
  '青海省': '青海',
  '宁夏回族自治区': '宁夏',
  '新疆维吾尔自治区': '新疆',
  '香港特别行政区': '香港',
  '澳门特别行政区': '澳门',
  '台湾省': '台湾',
};

/**
 * 标准化省份名称
 */
const normalizeProvince = (name: string): string => {
  return PROVINCE_ALIASES[name] || name;
};

/**
 * 生成地图热力图配置
 * @param data 数据数组
 * @param regionField 地区字段名（如省份）
 * @param valueField 数值字段名
 * @param title 图表标题
 * @returns ECharts 配置对象
 */
export const generateMapConfig = (
  data: DataRow[],
  regionField: string,
  valueField: string,
  title?: string
): EChartsOption => {
  // 按地区聚合数据
  const regionDataMap = new Map<string, number>();

  data.forEach((row) => {
    const regionRaw = String(row[regionField] ?? '');
    const region = normalizeProvince(regionRaw);
    const value = row[valueField];
    const numValue =
      typeof value === 'number'
        ? value
        : parseFloat(String(value)) || 0;

    regionDataMap.set(region, (regionDataMap.get(region) ?? 0) + numValue);
  });

  // 计算最大值用于归一化
  const values = Array.from(regionDataMap.values());
  const maxValue = values.length > 0 ? Math.max(...values) : 0;
  const minValue = values.length > 0 ? Math.min(...values) : 0;

  // 转换为散点数据
  const scatterData: { name: string; value: [number, number, number] }[] = [];
  regionDataMap.forEach((value, region) => {
    const coords = CHINA_PROVINCE_COORDS[region];
    if (coords) {
      scatterData.push({
        name: region,
        value: [coords[0], coords[1], value],
      });
    }
  });

  return {
    backgroundColor: '#ffffff',
    title: title
      ? {
          text: title,
          left: 'center',
          textStyle: {
            fontSize: 16,
            fontWeight: 600,
            color: '#1f2937',
          },
        }
      : undefined,
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        if (params.data && params.data.value) {
          return `${params.data.name}<br/>数值: ${params.data.value[2]}`;
        }
        return params.name;
      },
      confine: true,
    },
    visualMap: {
      type: 'continuous',
      min: minValue,
      max: maxValue,
      text: ['高', '低'],
      realtime: false,
      calculable: false,
      left: 10,
      bottom: 20,
      inRange: {
        color: ['#bf212b', '#e76f51', '#f4a261', '#e9c46a', '#2a9d8f', '#264653'],
      },
      textStyle: {
        color: '#374151',
      },
    },
    geo: {
      map: 'china',
      roam: false,
      zoom: 1.2,
      center: [105, 36],
      label: {
        show: false,
      },
      itemStyle: {
        areaColor: '#f0f9ff',
        borderColor: '#bae6fd',
        borderWidth: 1,
      },
      emphasis: {
        label: {
          show: true,
          color: '#1f2937',
        },
        itemStyle: {
          areaColor: '#bae6fd',
        },
      },
    },
    series: [
      {
        name: '数据分布',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: scatterData,
        symbolSize: (val: number[]) => {
          const value = val?.[2] ?? 0;
          if (maxValue === minValue) return 10;
          const ratio = (value - minValue) / (maxValue - minValue);
          return Math.max(8, ratio * 30 + 5);
        },
        itemStyle: {
          color: BLUE_CHART_COLORS[0],
          opacity: 0.85,
        },
        emphasis: {
          scale: 1.3,
        },
      },
    ],
  };
};

/**
 * 导出图表为 PNG
 * @param chartRef echarts-for-react 组件的 ref
 * @param filename 文件名（不含扩展名），默认为 'chart'
 * @param pixelRatio 像素比例，默认 2
 */
export const exportChartAsPng = (
  chartRef: React.RefObject<ReactECharts | null>,
  filename: string = 'chart',
  pixelRatio: number = 2
): void => {
  if (!chartRef.current) {
    console.error('Chart ref is not available');
    return;
  }

  const echartsInstance = chartRef.current.getEchartsInstance();
  const dataURL = echartsInstance.getDataURL({
    type: 'png',
    pixelRatio,
    backgroundColor: '#ffffff',
  });

  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = dataURL;
  link.click();
};

/**
 * 导出图表为 JPEG
 * @param chartRef echarts-for-react 组件的 ref
 * @param filename 文件名（不含扩展名），默认为 'chart'
 * @param pixelRatio 像素比例，默认 2
 */
export const exportChartAsJpeg = (
  chartRef: React.RefObject<ReactECharts | null>,
  filename: string = 'chart',
  pixelRatio: number = 2
): void => {
  if (!chartRef.current) {
    console.error('Chart ref is not available');
    return;
  }

  const echartsInstance = chartRef.current.getEchartsInstance();
  const dataURL = echartsInstance.getDataURL({
    type: 'jpeg',
    pixelRatio,
    backgroundColor: '#ffffff',
  });

  const link = document.createElement('a');
  link.download = `${filename}.jpeg`;
  link.href = dataURL;
  link.click();
};
