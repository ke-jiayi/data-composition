import { forwardRef, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { BaseChartProps } from './types';
import { getBaseChartOption, CHART_COLORS } from './types';

export interface BarChartProps extends BaseChartProps {
  direction?: 'vertical' | 'horizontal';
  stack?: boolean;
  showLabel?: boolean;
  barWidth?: string | number;
}

export const BarChart = forwardRef<ReactECharts, BarChartProps>(
  (
    {
      option,
      title,
      height = 400,
      width = '100%',
      style,
      className = '',
      onChartClick,
      direction = 'vertical',
      stack = false,
      showLabel = false,
      barWidth,
    },
    ref
  ) => {
    const chartOption = useMemo(() => {
      const baseOption = getBaseChartOption();

      const mergedOption: EChartsOption = {
        ...baseOption,
        color: CHART_COLORS,
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
          top: title ? '15%' : '10%',
          containLabel: true,
        },
        xAxis: {
          type: direction === 'vertical' ? 'category' : 'value',
          axisLabel: {
            rotate: direction === 'vertical' ? 0 : 0,
          },
        },
        yAxis: {
          type: direction === 'vertical' ? 'value' : 'category',
        },
        series: [],
        ...option,
      };

      // 处理系列配置
      if (Array.isArray(mergedOption.series)) {
        mergedOption.series = (mergedOption.series as any[]).map((series: any) => ({
          ...series,
          type: 'bar',
          stack: stack ? 'total' : undefined,
          barWidth: barWidth,
          label: {
            show: showLabel,
            position: direction === 'vertical' ? 'top' : 'right',
            fontSize: 12,
          },
          emphasis: {
            focus: 'series',
          },
        }));
      }

      return mergedOption;
    }, [option, title, direction, stack, showLabel, barWidth]);

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

BarChart.displayName = 'BarChart';

export default BarChart;