import type { DataRow, CleaningLog, ChartConfig } from './db';
import type { Project } from '../types';
import {
  initDB,
  createDataset,
  saveData,
  saveCleaningLog,
  saveChart,
  isDBEmpty,
} from './db';
import sampleData from '../data/sample-project.json';

interface SampleProjectData {
  project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'rowCount' | 'cleanedRowCount'>;
  rawData: DataRow[];
  cleanedData: DataRow[];
  cleaningLogs: Omit<CleaningLog, 'id' | 'datasetId' | 'timestamp'>[];
  charts: Omit<ChartConfig, 'id' | 'datasetId' | 'createdAt'>[];
}

/**
 * 初始化示例数据
 * 检查 IndexedDB 是否为空，如果为空则加载示例数据
 */
export async function initSampleData(): Promise<{
  initialized: boolean;
  message: string;
}> {
  try {
    // 初始化数据库
    await initDB();

    // 检查数据库是否为空
    const empty = await isDBEmpty();

    if (!empty) {
      return {
        initialized: false,
        message: '数据库已存在数据，跳过初始化',
      };
    }

    const data = sampleData as SampleProjectData;

    // 创建数据集
    const dataset = await createDataset({
      name: data.project.name,
      description: data.project.description,
      fileName: 'sample-data.csv',
      fileType: 'csv',
      columns: data.rawData.length > 0 ? Object.keys(data.rawData[0]) : [],
      rowCount: data.rawData.length,
      tags: data.project.tags,
    });

    const datasetId = dataset.id;

    // 保存原始数据
    await saveData(datasetId, data.rawData);

    // 保存清洗日志
    for (const log of data.cleaningLogs) {
      await saveCleaningLog({
        datasetId,
        operation: log.operation,
        details: log.details,
        beforeCount: log.beforeCount,
        afterCount: log.afterCount,
      });
    }

    // 保存图表配置
    for (const chart of data.charts) {
      await saveChart({
        datasetId,
        title: chart.title,
        chartType: chart.chartType,
        config: chart.config,
        dataSource: chart.dataSource,
        xAxisField: chart.xAxisField,
        yAxisField: chart.yAxisField,
        categoryField: chart.categoryField,
        valueField: chart.valueField,
      });
    }

    return {
      initialized: true,
      message: '示例数据初始化成功',
    };
  } catch (error) {
    console.error('初始化示例数据失败:', error);
    return {
      initialized: false,
      message: `初始化失败: ${error instanceof Error ? error.message : '未知错误'}`,
    };
  }
}

/**
 * 检查是否需要初始化示例数据
 */
export async function checkNeedInitialization(): Promise<boolean> {
  try {
    await initDB();
    return await isDBEmpty();
  } catch (error) {
    console.error('检查数据库状态失败:', error);
    return false;
  }
}
