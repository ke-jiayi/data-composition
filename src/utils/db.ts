import { openDB, type IDBPDatabase } from 'idb';
import type { Project, DataRow, CleaningLog, ChartConfig } from '../types';

const DB_NAME = 'dataPortfolioDB';
const DB_VERSION = 1;

// 数据库 schema
interface DBSchema {
  projects: {
    key: string;
    value: Project;
  };
  rawData: {
    key: string;
    value: DataRow & { projectId: string; id: string };
    indexes: { 'by-project': string };
  };
  cleanedData: {
    key: string;
    value: DataRow & { projectId: string; id: string };
    indexes: { 'by-project': string };
  };
  cleaningLogs: {
    key: string;
    value: CleaningLog;
    indexes: { 'by-project': string };
  };
  charts: {
    key: string;
    value: ChartConfig;
    indexes: { 'by-project': string };
  };
}

let dbInstance: IDBPDatabase<DBSchema> | null = null;

// 初始化数据库
export async function initDB(): Promise<IDBPDatabase<DBSchema>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<DBSchema>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // 创建 projects store
      if (!db.objectStoreNames.contains('projects')) {
        db.createObjectStore('projects', { keyPath: 'id' });
      }

      // 创建 rawData store
      if (!db.objectStoreNames.contains('rawData')) {
        const rawStore = db.createObjectStore('rawData', { keyPath: 'id' });
        rawStore.createIndex('by-project', 'projectId');
      }

      // 创建 cleanedData store
      if (!db.objectStoreNames.contains('cleanedData')) {
        const cleanedStore = db.createObjectStore('cleanedData', { keyPath: 'id' });
        cleanedStore.createIndex('by-project', 'projectId');
      }

      // 创建 cleaningLogs store
      if (!db.objectStoreNames.contains('cleaningLogs')) {
        const logStore = db.createObjectStore('cleaningLogs', { keyPath: 'id' });
        logStore.createIndex('by-project', 'projectId');
      }

      // 创建 charts store
      if (!db.objectStoreNames.contains('charts')) {
        const chartStore = db.createObjectStore('charts', { keyPath: 'id' });
        chartStore.createIndex('by-project', 'projectId');
      }
    },
  });

  return dbInstance;
}

// 项目 CRUD 操作
export async function createProject(project: Project): Promise<void> {
  const db = await initDB();
  await db.put('projects', project);
}

export async function getProject(id: string): Promise<Project | undefined> {
  const db = await initDB();
  return db.get('projects', id);
}

export async function getAllProjects(): Promise<Project[]> {
  const db = await initDB();
  const projects = await db.getAll('projects');
  return projects.sort((a, b) => b.createdAt - a.createdAt); // 按创建时间倒序
}

export async function updateProject(project: Project): Promise<void> {
  const db = await initDB();
  project.updatedAt = Date.now();
  await db.put('projects', project);
}

export async function deleteProject(id: string): Promise<void> {
  const db = await initDB();

  // 删除项目
  await db.delete('projects', id);

  // 删除关联的原始数据
  const rawTx = db.transaction('rawData', 'readwrite');
  const rawStore = rawTx.objectStore('rawData');
  const rawIndex = rawStore.index('by-project');
  const rawKeys = await rawIndex.getAllKeys(id);
  for (const key of rawKeys) {
    await rawStore.delete(key);
  }
  await rawTx.done;

  // 删除关联的清洗后数据
  const cleanedTx = db.transaction('cleanedData', 'readwrite');
  const cleanedStore = cleanedTx.objectStore('cleanedData');
  const cleanedIndex = cleanedStore.index('by-project');
  const cleanedKeys = await cleanedIndex.getAllKeys(id);
  for (const key of cleanedKeys) {
    await cleanedStore.delete(key);
  }
  await cleanedTx.done;

  // 删除关联的清洗日志
  const logTx = db.transaction('cleaningLogs', 'readwrite');
  const logStore = logTx.objectStore('cleaningLogs');
  const logIndex = logStore.index('by-project');
  const logKeys = await logIndex.getAllKeys(id);
  for (const key of logKeys) {
    await logStore.delete(key);
  }
  await logTx.done;

  // 删除关联的图表配置
  const chartTx = db.transaction('charts', 'readwrite');
  const chartStore = chartTx.objectStore('charts');
  const chartIndex = chartStore.index('by-project');
  const chartKeys = await chartIndex.getAllKeys(id);
  for (const key of chartKeys) {
    await chartStore.delete(key);
  }
  await chartTx.done;
}

// 原始数据操作
export async function saveRawData(projectId: string, data: DataRow[]): Promise<void> {
  const db = await initDB();
  const tx = db.transaction('rawData', 'readwrite');
  const store = tx.objectStore('rawData');

  // 先删除旧数据
  const oldKeys = await store.index('by-project').getAllKeys(projectId);
  for (const key of oldKeys) {
    await store.delete(key);
  }

  // 添加新数据
  for (let i = 0; i < data.length; i++) {
    await store.put({
      ...data[i],
      projectId,
      id: `${projectId}-raw-${i}`,
    });
  }

  await tx.done;
}

export async function getRawData(projectId: string): Promise<DataRow[]> {
  const db = await initDB();
  const rawData = await db.getAllFromIndex('rawData', 'by-project', projectId);
  return rawData.map(row => {
    const { projectId, id, ...dataRow } = row;
    return dataRow as DataRow;
  });
}

// 清洗后数据操作
export async function saveCleanedData(projectId: string, data: DataRow[]): Promise<void> {
  const db = await initDB();
  const tx = db.transaction('cleanedData', 'readwrite');
  const store = tx.objectStore('cleanedData');

  // 先删除旧数据
  const oldKeys = await store.index('by-project').getAllKeys(projectId);
  for (const key of oldKeys) {
    await store.delete(key);
  }

  // 添加新数据
  for (let i = 0; i < data.length; i++) {
    await store.put({
      ...data[i],
      projectId,
      id: `${projectId}-cleaned-${i}`,
    });
  }

  await tx.done;
}

export async function getCleanedData(projectId: string): Promise<DataRow[]> {
  const db = await initDB();
  const cleanedData = await db.getAllFromIndex('cleanedData', 'by-project', projectId);
  return cleanedData.map(row => {
    const { projectId, id, ...dataRow } = row;
    return dataRow as DataRow;
  });
}

// 清洗日志操作
export async function saveCleaningLog(log: CleaningLog): Promise<void> {
  const db = await initDB();
  await db.put('cleaningLogs', log);
}

export async function getCleaningLogs(projectId: string): Promise<CleaningLog[]> {
  const db = await initDB();
  const logs = await db.getAllFromIndex('cleaningLogs', 'by-project', projectId);
  return logs.sort((a, b) => a.timestamp - b.timestamp); // 按时间顺序
}

export async function saveCleaningLogs(projectId: string, logs: CleaningLog[]): Promise<void> {
  const db = await initDB();
  const tx = db.transaction('cleaningLogs', 'readwrite');
  const store = tx.objectStore('cleaningLogs');

  // 先删除旧日志
  const oldKeys = await store.index('by-project').getAllKeys(projectId);
  for (const key of oldKeys) {
    await store.delete(key);
  }

  // 添加新日志
  for (const log of logs) {
    await store.put(log);
  }

  await tx.done;
}

// 图表配置操作
export async function saveChart(chart: ChartConfig): Promise<void> {
  const db = await initDB();
  await db.put('charts', chart);
}

export async function getCharts(projectId: string): Promise<ChartConfig[]> {
  const db = await initDB();
  return db.getAllFromIndex('charts', 'by-project', projectId);
}

export async function deleteChart(chartId: string): Promise<void> {
  const db = await initDB();
  await db.delete('charts', chartId);
}

export async function saveCharts(projectId: string, charts: ChartConfig[]): Promise<void> {
  const db = await initDB();
  const tx = db.transaction('charts', 'readwrite');
  const store = tx.objectStore('charts');

  // 先删除旧图表
  const oldKeys = await store.index('by-project').getAllKeys(projectId);
  for (const key of oldKeys) {
    await store.delete(key);
  }

  // 添加新图表
  for (const chart of charts) {
    await store.put(chart);
  }

  await tx.done;
}

// 检查数据库是否为空
export async function isDBEmpty(): Promise<boolean> {
  const db = await initDB();
  const projects = await db.getAll('projects');
  return projects.length === 0;
}