/**
 * 图表组件模块
 *
 * @requires echarts-for-react
 * 安装依赖: npm install echarts-for-react
 */

// 容器组件
export { ChartContainer } from './ChartContainer';
export type { ChartContainerProps } from './types';

// 图表组件
export { BarChart } from './BarChart';
export type { BarChartProps } from './BarChart';

export { LineChart } from './LineChart';
export type { LineChartProps } from './LineChart';

export { PieChart } from './PieChart';
export type { PieChartProps } from './PieChart';

// 配置面板
export { ChartConfigPanel } from './ChartConfigPanel';

// 类型导出
export type {
  BaseChartProps,
  ChartConfigPanelProps,
  ChartConfigState,
  ExportOptions,
} from './types';

// 工具函数导出
export {
  generateBarChartOption,
  generateLineChartOption,
  generatePieChartOption,
  generateChartOption,
  validateChartConfig,
} from './utils';

// 常量导出
export { getBaseChartOption, CHART_COLORS } from './types';