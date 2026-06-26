import { forwardRef, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { BaseChartProps } from './types';
import { getBaseChartOption, CHART_COLORS } from './types';

export interface PieChartProps extends BaseChartProps {
  radius?: string | string[];
  center?: string[];
  showLabel?: boolean;
  roseType?: boolean;
}

export const PieChart = forwardRef<ReactECharts, PieChartProps>(
  (
    {
      option,
      title,
      height = 400,
      width = '100%',
      style,
      className = '',
      onChartClick,
      radius = '60%',
      center = ['50%', '50%'],
      showLabel = true,
      roseType = false,
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
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          confine: true,
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 'middle',
          pageIconSize: 12,
          pageTextStyle: {
            fontSize: 12,
          },
        },
        series: [],
        ...option,
      };

      // 处理系列配置
      if (Array.isArray(mergedOption.series)) {
        mergedOption.series = (mergedOption.series as any[]).map((series: any) => ({
          ...series,
          type: 'pie',
          radius: radius,
          center: center,
          roseType: roseType ? 'radius' : undefined,
          selectedMode: 'single',
          label: {
            show: showLabel,
            formatter: '{b}: {d}%',
            fontSize: 12,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold',
            },
          },
        }));
      }

      return mergedOption;
    }, [option, title, radius, center, showLabel, roseType]);

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

PieChart.displayName = 'PieChart';

export default PieChart;