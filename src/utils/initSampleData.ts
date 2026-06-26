import { v4 as uuidv4 } from 'uuid';
import type { Project, DataRow, CleaningLog, ChartConfig } from '../types';
import {
  initDB,
  createProject,
  saveRawData,
  saveCleanedData,
  saveCleaningLogs,
  saveCharts,
  isDBEmpty,
} from './db';
import sampleData from '../data/sample-project.json';

interface SampleProjectData {
  project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'rowCount' | 'cleanedRowCount'>;
  rawData: DataRow[];
  cleanedData: DataRow[];
  cleaningLogs: Omit<CleaningLog, 'id' | 'projectId' | 'timestamp'>[];
  charts: Omit<ChartConfig, 'id' | 'projectId' | 'createdAt'>[];
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
    const now = Date.now();
    const projectId = uuidv4();

    // 创建项目
    const project: Project = {
      id: projectId,
      ...data.project,
      rowCount: data.rawData.length,
      cleanedRowCount: data.cleanedData.length,
      createdAt: now,
      updatedAt: now,
    };

    await createProject(project);

    // 保存原始数据
    await saveRawData(projectId, data.rawData);

    // 保存清洗后数据
    await saveCleanedData(projectId, data.cleanedData);

    // 保存清洗日志
    const cleaningLogs: CleaningLog[] = data.cleaningLogs.map((log, index) => ({
      id: uuidv4(),
      projectId,
      ...log,
      timestamp: now - (data.cleaningLogs.length - index) * 1000, // 模拟按时间顺序
    }));
    await saveCleaningLogs(projectId, cleaningLogs);

    // 保存图表配置
    const charts: ChartConfig[] = data.charts.map((chart) => ({
      id: uuidv4(),
      projectId,
      ...chart,
      createdAt: now,
    }));
    await saveCharts(projectId, charts);

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