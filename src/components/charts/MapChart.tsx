import { forwardRef, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { DataRow } from '../../types';
import { CHART_COLORS } from './types';

export interface MapChartProps {
  /** 数据源 */
  data: DataRow[];
  /** 地区字段名 */
  regionField?: string;
  /** 数值字段名 */
  valueField?: string;
  /** 图表标题 */
  title?: string;
  /** 图表高度 */
  height?: number | string;
  /** 图表宽度 */
  width?: number | string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 图表点击事件 */
  onChartClick?: (params: unknown) => void;
}

/**
 * 中国省份坐标数据（简化的省会城市坐标作为省份代表）
 * 实际使用时建议引入完整的中国地图 GeoJSON 数据
 */
const CHINA_PROVINCE_COORDS: Record<string, [number, number]> = {
  // 省份/直辖市 - [经度, 纬度]
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
 * 省份别名映射（完整名称 -> 简称）
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
 * 获取省份坐标（支持别名）
 */
const getProvinceCoords = (region: string): [number, number] | undefined => {
  const normalized = PROVINCE_ALIASES[region] || region;
  return CHINA_PROVINCE_COORDS[normalized];
};

/**
 * 检测数据中是否有省份/地区字段
 */
export const detectRegionField = (fields: string[], data: DataRow[]): string | null => {
  const regionKeywords = ['省', '市', '自治区', '地区', '省份', 'region', 'province', 'city'];
  
  for (const field of fields) {
    // 检查字段名是否包含省份相关关键词
    if (regionKeywords.some(k => field.includes(k))) {
      return field;
    }
    // 检查字段值是否像省份名称
    const sampleValue = data[0]?.[field];
    if (typeof sampleValue === 'string') {
      if (sampleValue.includes('省') || sampleValue.includes('市') || 
          sampleValue.includes('自治区') || getProvinceCoords(sampleValue)) {
        return field;
      }
    }
  }
  
  // 尝试通过值匹配
  for (const field of fields) {
    const sampleValue = String(data[0]?.[field] ?? '');
    if (getProvinceCoords(sampleValue)) {
      return field;
    }
  }
  
  return null;
};

/**
 * MapChart 地图热力图组件
 * 使用散点图模拟中国地图热力图效果
 * 
 * 注意：完整的中国地图热力图需要引入 ECharts 的地图数据：
 * import 'echarts/map/js/china.js';
 * 
 * 此组件使用简化方式，通过散点坐标模拟热力效果
 */
export const MapChart = forwardRef<ReactECharts, MapChartProps>(
  (
    {
      data,
      regionField,
      valueField,
      title,
      height = 400,
      width = '100%',
      style,
      className = '',
      onChartClick,
    },
    ref
  ) => {
    const chartOption = useMemo((): EChartsOption => {
      if (!regionField || !valueField || data.length === 0) {
        return {};
      }

      // 按地区聚合数据
      const regionDataMap = new Map<string, number>();
      
      data.forEach((row) => {
        const region = String(row[regionField] ?? '');
        const value = row[valueField];
        const numValue = typeof value === 'number' 
          ? value 
          : parseFloat(String(value)) || 0;
        
        regionDataMap.set(region, (regionDataMap.get(region) ?? 0) + numValue);
      });

      // 转换为散点图数据格式
      const scatterData: [number, number, number][] = [];
      const maxValue = Math.max(...Array.from(regionDataMap.values()));
      
      regionDataMap.forEach((value, region) => {
        const coords = getProvinceCoords(region);
        if (coords) {
          // 归一化值用于散点大小
          const normalizedValue = maxValue > 0 ? (value / maxValue) * 100 : 0;
          scatterData.push([...coords, normalizedValue] as [number, number, number]);
        }
      });

      // 转换为热力图数据（经度, 纬度, 值）
      const heatmapData: [number, number, number][] = [];
      regionDataMap.forEach((value, region) => {
        const coords = getProvinceCoords(region);
        if (coords) {
          heatmapData.push([coords[0], coords[1], value]);
        }
      });

      const baseOption = {
        backgroundColor: '#ffffff',
        title: title
          ? {
              text: title,
              left: 'center',
              textStyle: {
                fontSize: 16,
                fontWeight: 600,
              },
            }
          : undefined,
        tooltip: {
          trigger: 'item',
          formatter: (params: any) => {
            if (params.data) {
              return `${params.data.name || params.name}<br/>数值: ${params.data.value?.[2] || params.value}`;
            }
            return params.name;
          },
          confine: true,
        },
        visualMap: {
          type: 'continuous',
          min: 0,
          max: maxValue,
          text: ['高', '低'],
          realtime: false,
          calculable: false,
          left: 10,
          bottom: 20,
          inRange: {
            color: ['#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
          },
          textStyle: {
            color: '#333',
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
            areaColor: '#e0f3f8',
            borderColor: '#b8d4e3',
            borderWidth: 1,
          },
          emphasis: {
            label: {
              show: true,
              color: '#333',
            },
            itemStyle: {
              areaColor: '#abd9e9',
            },
          },
        },
        series: [
          // 散点层
          {
            name: '数据点',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: scatterData.map(([lng, lat, value]) => ({
              name: scatterData.find(d => d[0] === lng && d[1] === lat)?.toString() || '',
              value: [lng, lat, value],
            })),
            symbolSize: (val: number[]) => {
              const value = val?.[2] ?? 0;
              return Math.max(8, Math.sqrt(value) * 2);
            },
            itemStyle: {
              color: CHART_COLORS[0],
              opacity: 0.8,
            },
            emphasis: {
              scale: 1.5,
            },
          },
          // 热力层（使用 effectScatter 产生涟漪效果）
          {
            name: '热力效果',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: heatmapData.map(([lng, lat, value]) => ({
              name: '',
              value: [lng, lat, value],
            })),
            symbolSize: (val: number[]) => {
              const value = val?.[2] ?? 0;
              return Math.max(6, Math.sqrt(value) * 1.5);
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
              scale: 3,
            },
            itemStyle: {
              color: CHART_COLORS[1] || '#91cc75',
              opacity: 0.6,
            },
          },
        ],
      };

      return baseOption as EChartsOption;
    }, [data, regionField, valueField, title]);

    return (
      <div className={`chart-wrapper ${className}`} style={style}>
        <ReactECharts
          ref={ref}
          option={chartOption}
          style={{ height, width }}
          notMerge={true}
          lazyUpdate={true}
          onEvents={{
            click: onChartClick as any,
          }}
          opts={{
            renderer: 'canvas',
            locale: 'ZH',
          }}
        />
      </div>
    );
  }
);

MapChart.displayName = 'MapChart';

export default MapChart;
