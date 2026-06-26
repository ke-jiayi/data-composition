import { forwardRef, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { BaseChartProps } from './types';
import { getBaseChartOption, CHART_COLORS } from './types';

export interface LineChartProps extends BaseChartProps {
  smooth?: boolean;
  showArea?: boolean;
  showSymbol?: boolean;
}

export const LineChart = forwardRef<ReactECharts, LineChartProps>(
  (
    {
      option,
      title,
      height = 400,
      width = '100%',
      style,
      className = '',
      onChartClick,
      smooth = true,
      showArea = false,
      showSymbol = true,
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
            type: 'line',
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
          type: 'category',
        },
        yAxis: {
          type: 'value',
        },
        series: [],
        ...option,
      };

      // 处理系列配置
      if (Array.isArray(mergedOption.series)) {
        mergedOption.series = (mergedOption.series as any[]).map((series: any) => ({
          ...series,
          type: 'line',
          smooth: smooth,
          symbol: 'circle',
          symbolSize: 6,
          showSymbol: showSymbol,
          lineStyle: {
            width: 2,
            type: 'solid',
          },
          areaStyle: showArea
            ? {
                opacity: 0.3,
              }
            : undefined,
          emphasis: {
            focus: 'series',
          },
        }));
      }

      return mergedOption;
    }, [option, title, smooth, showArea, showSymbol]);

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

LineChart.displayName = 'LineChart';

export default LineChart;