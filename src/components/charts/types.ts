import type { EChartsOption } from 'echarts';

/**
 * 图表基础配置类型
 */
export interface BaseChartProps {
  /** 图表配置选项 */
  option: EChartsOption;
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
  /** 图表点击事件回调 */
  onChartClick?: (params: unknown) => void;
}

/**
 * 图表容器组件属性
 */
export interface ChartContainerProps {
  /** 图表标题 */
  title: string;
  /** 子元素（图表组件） */
  children: React.ReactNode;
  /** 是否显示工具栏 */
  showToolbar?: boolean;
  /** 是否显示导出按钮 */
  showExport?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 图表实例引用（用于导出等操作） */
  chartRef?: React.RefObject<{ getEchartsInstance: () => unknown }>;
  /** 导出回调 */
  onExport?: (imageData: string) => void;
  /** 删除回调 */
  onDelete?: () => void;
}

/**
 * 图表配置面板属性
 */
export interface ChartConfigPanelProps {
  /** 可用字段列表 */
  fields: string[];
  /** 当前图表配置 */
  config: ChartConfigState;
  /** 配置变更回调 */
  onChange: (config: ChartConfigState) => void;
  /** 取消回调 */
  onCancel?: () => void;
  /** 确认回调 */
  onConfirm?: () => void;
  /** 是否显示操作按钮 */
  showActions?: boolean;
}

/**
 * 图表配置状态
 */
export interface ChartConfigState {
  chartType: 'bar' | 'line' | 'pie' | 'scatter';
  title: string;
  xAxisField?: string;
  yAxisField?: string;
  categoryField?: string;
  valueField?: string;
  dataSource: 'raw' | 'cleaned';
}

/**
 * 图表导出配置
 */
export interface ExportOptions {
  /** 图片类型 */
  type: 'png' | 'jpeg' | 'svg';
  /** 背景色 */
  backgroundColor?: string;
  /** 像素比例 */
  pixelRatio?: number;
  /** 排除组件 */
  excludeComponents?: string[];
}

/**
 * 通用 ECharts 配置选项
 */
export const getBaseChartOption = (): EChartsOption => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    confine: true,
  },
  legend: {
    type: 'scroll',
    bottom: 0,
    pageIconSize: 12,
    pageTextStyle: {
      fontSize: 12,
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    top: '10%',
    containLabel: true,
  },
});

/**
 * 颜色主题
 */
export const CHART_COLORS = [
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc',
];