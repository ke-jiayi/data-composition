import { useState, useEffect, useCallback } from 'react';
import type { Dataset, DataRow, CleaningLog, ChartConfig } from '../utils/db';
import {
  initDB,
  createDataset,
  getDataset,
  getAllDatasets,
  updateDataset,
  deleteDataset,
  saveData,
  getData,
  saveCleaningLog,
  getCleaningLogs,
  saveChart,
  getCharts,
  updateChart,
  deleteChart,
  isDBEmpty,
} from '../utils/db';

type DatabaseOperation = (...args: never[]) => Promise<unknown>;

interface UseDBReturn {
  isLoading: boolean;
  error: Error | null;

  // 数据集操作
  createDataset: (dataset: Omit<Dataset, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Dataset>;
  getDataset: (id: string) => Promise<Dataset | undefined>;
  getAllDatasets: () => Promise<Dataset[]>;
  updateDataset: (dataset: Dataset) => Promise<void>;
  deleteDataset: (id: string) => Promise<void>;

  // 数据操作
  saveData: (datasetId: string, data: DataRow[]) => Promise<void>;
  getData: (datasetId: string) => Promise<DataRow[]>;

  // 清洗日志操作
  saveCleaningLog: (log: Omit<CleaningLog, 'id' | 'timestamp'>) => Promise<CleaningLog>;
  getCleaningLogs: (datasetId: string) => Promise<CleaningLog[]>;

  // 图表操作
  saveChart: (chart: Omit<ChartConfig, 'id' | 'createdAt'>) => Promise<ChartConfig>;
  getCharts: (datasetId: string) => Promise<ChartConfig[]>;
  updateChart: (chart: ChartConfig) => Promise<void>;
  deleteChart: (chartId: string) => Promise<void>;

  // 其他
  isDBEmpty: () => Promise<boolean>;
}

export function useDB(): UseDBReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // 初始化数据库
  useEffect(() => {
    initDB()
      .then(() => setIsLoading(false))
      .catch((err) => {
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsLoading(false);
      });
  }, []);

  // 包装所有数据库操作，添加错误处理
  const wrapOperation = useCallback(<T extends DatabaseOperation>(operation: T): T => {
    return (async (...args: Parameters<T>) => {
      try {
        return await operation(...args);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        throw err;
      }
    }) as T;
  }, []);

  return {
    isLoading,
    error,

    // 数据集操作
    createDataset: wrapOperation(createDataset),
    getDataset: wrapOperation(getDataset),
    getAllDatasets: wrapOperation(getAllDatasets),
    updateDataset: wrapOperation(updateDataset),
    deleteDataset: wrapOperation(deleteDataset),

    // 数据操作
    saveData: wrapOperation(saveData),
    getData: wrapOperation(getData),

    // 清洗日志操作
    saveCleaningLog: wrapOperation(saveCleaningLog),
    getCleaningLogs: wrapOperation(getCleaningLogs),

    // 图表操作
    saveChart: wrapOperation(saveChart),
    getCharts: wrapOperation(getCharts),
    updateChart: wrapOperation(updateChart),
    deleteChart: wrapOperation(deleteChart),

    // 其他
    isDBEmpty: wrapOperation(isDBEmpty),
  };
}
