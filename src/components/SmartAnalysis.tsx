import { useEffect, useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { DataRow } from '../utils/db';

interface SmartAnalysisProps {
  data: DataRow[];
  columns: string[];
}

type ColType = 'numeric' | 'text' | 'date';

interface ColAnalysis {
  type: ColType;
  uniqueCount: number;
}

type ChartType = 'bar' | 'line' | 'pie' | 'radar';

interface ChartCard {
  id: string;
  type: ChartType;
  title: string;
  canSwitch: boolean;
  categories?: string[];
  values?: number[];
  valueLabel?: string;
  radarIndicator?: { name: string; max: number }[];
  radarData?: { value: number[]; name: string }[];
}

const CHART_COLORS = [
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

// 列类型检测
function analyzeColumn(data: DataRow[], col: string): ColAnalysis {
  const values = data
    .map(row => row[col])
    .filter((v): v is string | number | boolean => v !== null && v !== undefined && v !== '');

  const uniqueCount = new Set(values.map(v => String(v))).size;

  if (values.length === 0) {
    return { type: 'text', uniqueCount: 0 };
  }

  // 数值检测：>80% 可解析为数值则为 numeric
  let numericCount = 0;
  for (const v of values) {
    if (typeof v === 'number' && !isNaN(v)) {
      numericCount++;
    } else {
      const parsed = parseFloat(String(v));
      if (!isNaN(parsed) && isFinite(parsed)) {
        numericCount++;
      }
    }
  }
  if (numericCount / values.length > 0.8) {
    return { type: 'numeric', uniqueCount };
  }

  // 日期检测：匹配 YYYY-MM-DD / YYYY/MM/DD 等格式
  const dateRegex = /^\d{4}[-/]\d{1,2}[-/]\d{1,2}/;
  let dateCount = 0;
  for (const v of values) {
    const str = String(v);
    if (dateRegex.test(str)) {
      const d = new Date(str);
      if (!isNaN(d.getTime())) {
        dateCount++;
      }
    }
  }
  if (dateCount / values.length > 0.8) {
    return { type: 'date', uniqueCount };
  }

  return { type: 'text', uniqueCount };
}

// 按某列分组对数值列求和
function aggregateSum(
  data: DataRow[],
  keyCol: string,
  valueCol: string,
): { categories: string[]; values: number[] } {
  const map = new Map<string, number>();
  for (const row of data) {
    const rawKey = row[keyCol];
    if (rawKey === null || rawKey === undefined || rawKey === '') continue;
    const key = String(rawKey);
    const parsed = parseFloat(String(row[valueCol] ?? '0'));
    const val = isNaN(parsed) ? 0 : parsed;
    map.set(key, (map.get(key) ?? 0) + val);
  }
  return {
    categories: Array.from(map.keys()),
    values: Array.from(map.values()),
  };
}

// 根据卡片信息构建 ECharts 配置
function buildOption(card: ChartCard): EChartsOption {
  if (card.type === 'radar') {
    return {
      tooltip: {},
      legend: { bottom: 0, type: 'scroll' },
      radar: {
        indicator: card.radarIndicator ?? [],
        radius: '65%',
      },
      series: [
        {
          type: 'radar',
          data: card.radarData ?? [],
          areaStyle: { opacity: 0.2 },
        },
      ],
    };
  }

  const categories = card.categories ?? [];
  const values = card.values ?? [];
  const label = card.valueLabel ?? '数值';

  if (card.type === 'pie') {
    return {
      tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
      legend: { orient: 'vertical', left: 'left', type: 'scroll' },
      color: CHART_COLORS,
      series: [
        {
          type: 'pie',
          radius: ['30%', '60%'],
          center: ['60%', '50%'],
          name: label,
          data: categories.map((cat, i) => ({ name: cat, value: values[i] ?? 0 })),
          label: { formatter: '{b}: {d}%' },
        },
      ],
    };
  }

  if (card.type === 'line') {
    return {
      tooltip: { trigger: 'axis' },
      legend: { bottom: 0, type: 'scroll' },
      color: CHART_COLORS,
      grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        data: categories,
        axisLabel: { rotate: categories.length > 6 ? 30 : 0 },
      },
      yAxis: { type: 'value' },
      series: [{ type: 'line', name: label, data: values, smooth: true }],
    };
  }

  // bar
  return {
    tooltip: { trigger: 'axis' },
    legend: { bottom: 0, type: 'scroll' },
    color: CHART_COLORS,
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: { rotate: categories.length > 6 ? 30 : 0 },
    },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', name: label, data: values }],
  };
}

// 根据分析结果生成图表卡片配置
function generateCharts(data: DataRow[], columns: string[]): ChartCard[] {
  const analyses = new Map<string, ColAnalysis>();
  for (const col of columns) {
    analyses.set(col, analyzeColumn(data, col));
  }

  const numericCols = columns.filter(c => analyses.get(c)?.type === 'numeric');
  const textCols = columns.filter(c => analyses.get(c)?.type === 'text');
  const dateCols = columns.filter(c => analyses.get(c)?.type === 'date');

  const cards: ChartCard[] = [];
  let idCounter = 0;

  // 1. 日期列 + 数值列 → 折线图（按日期聚合求和）
  if (dateCols.length > 0 && numericCols.length > 0) {
    const dateCol = dateCols[0];
    const numCol = numericCols[0];
    const { categories, values } = aggregateSum(data, dateCol, numCol);
    const paired = categories
      .map((c, i) => ({ cat: c, val: values[i] ?? 0, time: new Date(c).getTime() }))
      .sort((a, b) => a.time - b.time);
    cards.push({
      id: `chart-${idCounter++}`,
      type: 'line',
      title: '日期趋势分析',
      canSwitch: true,
      categories: paired.map(p => p.cat),
      values: paired.map(p => p.val),
      valueLabel: numCol,
    });
  }

  // 2. 文本列（uniqueCount ≤ 20）+ 数值列 → 柱状图
  const barTextCol = textCols.find(c => {
    const a = analyses.get(c);
    return a && a.uniqueCount > 0 && a.uniqueCount <= 20;
  });
  if (barTextCol && numericCols.length > 0) {
    const numCol = numericCols[0];
    const { categories, values } = aggregateSum(data, barTextCol, numCol);
    cards.push({
      id: `chart-${idCounter++}`,
      type: 'bar',
      title: '分类数据对比',
      canSwitch: true,
      categories,
      values,
      valueLabel: numCol,
    });
  }

  // 3. 文本列（uniqueCount ≤ 10）+ 数值列 → 饼图
  const pieTextCol = textCols.find(c => {
    const a = analyses.get(c);
    return a && a.uniqueCount > 0 && a.uniqueCount <= 10;
  });
  if (pieTextCol && numericCols.length > 0) {
    const numCol = numericCols[0];
    const { categories, values } = aggregateSum(data, pieTextCol, numCol);
    cards.push({
      id: `chart-${idCounter++}`,
      type: 'pie',
      title: '分类占比分析',
      canSwitch: true,
      categories,
      values,
      valueLabel: numCol,
    });
  }

  // 4. 2+ 数值列 → 雷达图（取前 5 行，各数值列作为维度）
  if (numericCols.length >= 2) {
    const dims = numericCols.slice(0, 8);
    const indicator = dims.map(col => {
      const colValues = data
        .map(row => parseFloat(String(row[col] ?? '0')))
        .filter(v => !isNaN(v));
      const max = colValues.length > 0 ? Math.max(...colValues) : 0;
      return { name: col, max: max * 1.1 || 1 };
    });
    const sampleRows = data.slice(0, 5);
    const radarData = sampleRows.map((row, i) => ({
      name: `记录 ${i + 1}`,
      value: dims.map(col => {
        const v = parseFloat(String(row[col] ?? '0'));
        return isNaN(v) ? 0 : v;
      }),
    }));
    cards.push({
      id: `chart-${idCounter++}`,
      type: 'radar',
      title: '多维度数据对比',
      canSwitch: false,
      radarIndicator: indicator,
      radarData,
    });
  }

  // 默认：第一个文本列 + 第一个数值列 → 柱状图
  if (cards.length === 0 && textCols.length > 0 && numericCols.length > 0) {
    const { categories, values } = aggregateSum(data, textCols[0], numericCols[0]);
    cards.push({
      id: `chart-${idCounter++}`,
      type: 'bar',
      title: '数据分布概览',
      canSwitch: true,
      categories,
      values,
      valueLabel: numericCols[0],
    });
  }

  // 限制 3-5 张
  return cards.slice(0, 5);
}

export function SmartAnalysis({ data, columns }: SmartAnalysisProps) {
  const cards = useMemo(() => generateCharts(data, columns), [data, columns]);
  const [overrides, setOverrides] = useState<Record<string, ChartType>>({});

  // 数据/列变化时重置切换状态
  useEffect(() => {
    setOverrides({});
  }, [cards]);

  // 数据量保护
  if (data.length < 3) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500 text-center">数据量太少，无法生成有意义的图表</p>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500 text-center">未找到适合生成图表的数据列</p>
      </div>
    );
  }

  const handleSwitch = (cardId: string, newType: ChartType) => {
    setOverrides(prev => ({ ...prev, [cardId]: newType }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map(card => {
        const currentType = overrides[card.id] ?? card.type;
        const displayCard: ChartCard = { ...card, type: currentType };
        const option = buildOption(displayCard);
        return (
          <div
            key={card.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-900">{card.title}</h3>
              {card.canSwitch && (
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => handleSwitch(card.id, 'bar')}
                    className={`px-2 py-1 text-sm rounded transition-colors ${
                      currentType === 'bar'
                        ? 'bg-[#1e3a5f] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title="柱状图"
                  >
                    📊
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitch(card.id, 'line')}
                    className={`px-2 py-1 text-sm rounded transition-colors ${
                      currentType === 'line'
                        ? 'bg-[#1e3a5f] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title="折线图"
                  >
                    📈
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitch(card.id, 'pie')}
                    className={`px-2 py-1 text-sm rounded transition-colors ${
                      currentType === 'pie'
                        ? 'bg-[#1e3a5f] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title="饼图"
                  >
                    🥧
                  </button>
                </div>
              )}
            </div>
            <ReactECharts
              option={option}
              style={{ height: 280, width: '100%' }}
              notMerge={true}
              lazyUpdate={true}
            />
          </div>
        );
      })}
    </div>
  );
}
