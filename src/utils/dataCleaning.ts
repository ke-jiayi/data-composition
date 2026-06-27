import { v4 as uuidv4 } from 'uuid';
import type { DataRow, CleaningLog } from '../types';

/**
 * 去重操作
 */
export function deduplicate(data: DataRow[]): DataRow[] {
  const seen = new Set<string>();
  return data.filter((row) => {
    const key = JSON.stringify(row);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * 填充空值
 * @param data 数据
 * @param column 列名
 * @param strategy 填充策略：mean(均值)、median(中位数)、custom(自定义)
 * @param customValue 自定义值
 */
export function fillNulls(
  data: DataRow[],
  column: string,
  strategy: 'mean' | 'median' | 'custom',
  customValue?: any
): DataRow[] {
  const values = data
    .map((row) => row[column])
    .filter((v) => v !== null && v !== undefined && v !== '') as (number | string)[];

  if (values.length === 0) {
    return customValue !== undefined
      ? data.map((row) => ({ ...row, [column]: customValue }))
      : data;
  }

  let fillValue: number | string;

  if (strategy === 'mean') {
    const numbers = values.filter((v) => typeof v === 'number') as number[];
    if (numbers.length === 0) {
      fillValue = customValue ?? 0;
    } else {
      fillValue = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    }
  } else if (strategy === 'median') {
    const numbers = values.filter((v) => typeof v === 'number') as number[];
    if (numbers.length === 0) {
      fillValue = customValue ?? 0;
    } else {
      const sorted = [...numbers].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      fillValue = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    }
  } else {
    fillValue = customValue ?? 0;
  }

  return data.map((row) => {
    if (row[column] === null || row[column] === undefined || row[column] === '') {
      return { ...row, [column]: fillValue };
    }
    return row;
  });
}

/**
 * 删除列
 */
export function deleteColumn(data: DataRow[], column: string): DataRow[] {
  return data.map((row) => {
    const newRow = { ...row };
    delete newRow[column];
    return newRow;
  });
}

/**
 * 检测数据类型
 */
export function detectDataTypes(
  data: DataRow[],
  columns: string[]
): Record<string, 'string' | 'number' | 'date'> {
  const result: Record<string, 'string' | 'number' | 'date'> = {};

  for (const column of columns) {
    const values = data.map((row) => row[column]).filter((v) => v !== null && v !== undefined);

    if (values.length === 0) {
      result[column] = 'string';
      continue;
    }

    let type: 'string' | 'number' | 'date' = 'string';

    for (const value of values) {
      if (typeof value === 'number') {
        type = 'number';
        break;
      } else if (typeof value === 'string') {
        const strValue = value.trim();
        const datePattern = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?/;
        if (datePattern.test(strValue) && !isNaN(Date.parse(strValue))) {
          type = 'date';
        }
      }
    }

    result[column] = type;
  }

  return result;
}

/**
 * 创建清洗日志
 */
export function createCleaningLog(
  projectId: string,
  operation: string,
  details: string,
  beforeCount?: number,
  afterCount?: number
): CleaningLog {
  return {
    id: uuidv4(),
    projectId,
    operation,
    details,
    timestamp: Date.now(),
    affectedRows: beforeCount !== undefined && afterCount !== undefined ? beforeCount - afterCount : undefined,
  };
}