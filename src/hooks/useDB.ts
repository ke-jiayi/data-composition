import { useState, useEffect, useCallback } from 'react';
import type { Project, DataRow, CleaningLog, ChartConfig } from '../types';
import {
  initDB,
  createProject,
  getProject,
  getAllProjects,
  updateProject,
  deleteProject,
  saveRawData,
  getRawData,
  saveCleanedData,
  getCleanedData,
  getCleaningLogs,
  saveCleaningLogs,
  getCharts,
  saveCharts,
  deleteChart,
  isDBEmpty,
} from '../utils/db';

interface UseDBReturn {
  isLoading: boolean;
  error: Error | null;

  // 项目操作
  createProject: (project: Project) => Promise<void>;
  getProject: (id: string) => Promise<Project | undefined>;
  getAllProjects: () => Promise<Project[]>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  // 数据操作
  saveRawData: (projectId: string, data: DataRow[]) => Promise<void>;
  getRawData: (projectId: string) => Promise<DataRow[]>;
  saveCleanedData: (projectId: string, data: DataRow[]) => Promise<void>;
  getCleanedData: (projectId: string) => Promise<DataRow[]>;

  // 清洗日志操作
  getCleaningLogs: (projectId: string) => Promise<CleaningLog[]>;
  saveCleaningLogs: (projectId: string, logs: CleaningLog[]) => Promise<void>;

  // 图表操作
  getCharts: (projectId: string) => Promise<ChartConfig[]>;
  saveCharts: (projectId: string, charts: ChartConfig[]) => Promise<void>;
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
        setError(err);
        setIsLoading(false);
      });
  }, []);

  // 包装所有数据库操作，添加错误处理
  const wrapOperation = useCallback(
    <T extends (...args: any[]) => Promise<any>>(operation: T): T => {
      return (async (...args: any[]) => {
        try {
          return await operation(...args);
        } catch (err) {
          setError(err instanceof Error ? err : new Error(String(err)));
          throw err;
        }
      }) as T;
    },
    []
  );

  return {
    isLoading,
    error,

    // 项目操作
    createProject: wrapOperation(createProject),
    getProject: wrapOperation(getProject),
    getAllProjects: wrapOperation(getAllProjects),
    updateProject: wrapOperation(updateProject),
    deleteProject: wrapOperation(deleteProject),

    // 数据操作
    saveRawData: wrapOperation(saveRawData),
    getRawData: wrapOperation(getRawData),
    saveCleanedData: wrapOperation(saveCleanedData),
    getCleanedData: wrapOperation(getCleanedData),

    // 清洗日志操作
    getCleaningLogs: wrapOperation(getCleaningLogs),
    saveCleaningLogs: wrapOperation(saveCleaningLogs),

    // 图表操作
    getCharts: wrapOperation(getCharts),
    saveCharts: wrapOperation(saveCharts),
    deleteChart: wrapOperation(deleteChart),

    // 其他
    isDBEmpty: wrapOperation(isDBEmpty),
  };
}