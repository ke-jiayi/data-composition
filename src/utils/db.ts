import { openDB, type IDBPDatabase } from 'idb';
import { v4 as uuidv4 } from 'uuid';

// 数据集元信息
export interface Dataset {
  id: string;
  name: string;
  description?: string;
  fileName: string;
  fileType: 'csv' | 'json' | 'xlsx' | 'xls';
  columns: string[];
  rowCount: number;
  createdAt: number;
  updatedAt: number;
  tags?: string[];
}

// 数据行类型
export interface DataRow {
  [key: string]: string | number | boolean | null;
}

// 清洗日志
export interface CleaningLog {
  id: string;
  datasetId: string;
  operation: string;
  details: string;
  timestamp: number;
  beforeCount?: number;
  afterCount?: number;
}

// 图表配置
export interface ChartConfig {
  id: string;
  datasetId: string;
  title: string;
  chartType: 'bar' | 'line' | 'pie' | 'scatter';
  config: Record<string, unknown>;
  dataSource: 'raw' | 'cleaned';
  xAxisField?: string;
  yAxisField?: string;
  categoryField?: string;
  valueField?: string;
  createdAt: number;
}

// 数据库 schema
interface DBSchema {
  datasets: {
    key: string;
    value: Dataset;
  };
  data: {
    key: string;
    value: DataRow & { datasetId: string; id: string };
    indexes: { 'by-dataset': string };
  };
  cleaningLogs: {
    key: string;
    value: CleaningLog;
    indexes: { 'by-dataset': string };
  };
  charts: {
    key: string;
    value: ChartConfig;
    indexes: { 'by-dataset': string };
  };
}

const DB_NAME = 'dataPortfolioDB';
const DB_VERSION = 2;

let dbInstance: IDBPDatabase<DBSchema> | null = null;

// 初始化数据库
export async function initDB(): Promise<IDBPDatabase<DBSchema>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<DBSchema>(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion) {
      // 如果是旧版本数据库，删除旧对象仓库
      if (oldVersion < 2) {
        const oldStores = ['projects', 'rawData', 'cleanedData'];
        oldStores.forEach(storeName => {
          if (db.objectStoreNames.contains(storeName)) {
            db.deleteObjectStore(storeName);
          }
        });
      }

      // 创建 datasets store
      if (!db.objectStoreNames.contains('datasets')) {
        db.createObjectStore('datasets', { keyPath: 'id' });
      }

      // 创建 data store
      if (!db.objectStoreNames.contains('data')) {
        const dataStore = db.createObjectStore('data', { keyPath: 'id' });
        dataStore.createIndex('by-dataset', 'datasetId');
      }

      // 创建 cleaningLogs store
      if (!db.objectStoreNames.contains('cleaningLogs')) {
        const logStore = db.createObjectStore('cleaningLogs', { keyPath: 'id' });
        logStore.createIndex('by-dataset', 'datasetId');
      }

      // 创建 charts store
      if (!db.objectStoreNames.contains('charts')) {
        const chartStore = db.createObjectStore('charts', { keyPath: 'id' });
        chartStore.createIndex('by-dataset', 'datasetId');
      }
    },
  });

  return dbInstance;
}

// ==================== Dataset CRUD ====================

export async function createDataset(dataset: Omit<Dataset, 'id' | 'createdAt' | 'updatedAt'>): Promise<Dataset> {
  const db = await initDB();
  const now = Date.now();
  const newDataset: Dataset = {
    ...dataset,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
  };
  await db.put('datasets', newDataset);
  return newDataset;
}

export async function getDataset(id: string): Promise<Dataset | undefined> {
  const db = await initDB();
  return db.get('datasets', id);
}

export async function getAllDatasets(): Promise<Dataset[]> {
  const db = await initDB();
  const datasets = await db.getAll('datasets');
  return datasets.sort((a, b) => b.createdAt - a.createdAt);
}

export async function updateDataset(dataset: Dataset): Promise<void> {
  const db = await initDB();
  dataset.updatedAt = Date.now();
  await db.put('datasets', dataset);
}

export async function deleteDataset(id: string): Promise<void> {
  const db = await initDB();

  // 删除数据集
  await db.delete('datasets', id);

  // 删除关联的数据
  const dataTx = db.transaction('data', 'readwrite');
  const dataStore = dataTx.objectStore('data');
  const dataIndex = dataStore.index('by-dataset');
  const dataKeys = await dataIndex.getAllKeys(id);
  for (const key of dataKeys) {
    await dataStore.delete(key);
  }
  await dataTx.done;

  // 删除关联的清洗日志
  const logTx = db.transaction('cleaningLogs', 'readwrite');
  const logStore = logTx.objectStore('cleaningLogs');
  const logIndex = logStore.index('by-dataset');
  const logKeys = await logIndex.getAllKeys(id);
  for (const key of logKeys) {
    await logStore.delete(key);
  }
  await logTx.done;

  // 删除关联的图表配置
  const chartTx = db.transaction('charts', 'readwrite');
  const chartStore = chartTx.objectStore('charts');
  const chartIndex = chartStore.index('by-dataset');
  const chartKeys = await chartIndex.getAllKeys(id);
  for (const key of chartKeys) {
    await chartStore.delete(key);
  }
  await chartTx.done;
}

// ==================== Data Operations ====================

export async function saveData(datasetId: string, data: DataRow[]): Promise<void> {
  const db = await initDB();
  const tx = db.transaction('data', 'readwrite');
  const store = tx.objectStore('data');

  // 先删除旧数据
  const oldKeys = await store.index('by-dataset').getAllKeys(datasetId);
  for (const key of oldKeys) {
    await store.delete(key);
  }

  // 添加新数据
  for (let i = 0; i < data.length; i++) {
    await store.put({
      ...data[i],
      datasetId,
      id: `${datasetId}-${i}`,
    });
  }

  await tx.done;
}

export async function getData(datasetId: string): Promise<DataRow[]> {
  const db = await initDB();
  const data = await db.getAllFromIndex('data', 'by-dataset', datasetId);
  return data.map(row => {
    const { datasetId, id, ...dataRow } = row;
    return dataRow as DataRow;
  });
}

// ==================== CleaningLog Operations ====================

export async function saveCleaningLog(log: Omit<CleaningLog, 'id' | 'timestamp'>): Promise<CleaningLog> {
  const db = await initDB();
  const newLog: CleaningLog = {
    ...log,
    id: uuidv4(),
    timestamp: Date.now(),
  };
  await db.put('cleaningLogs', newLog);
  return newLog;
}

export async function getCleaningLogs(datasetId: string): Promise<CleaningLog[]> {
  const db = await initDB();
  const logs = await db.getAllFromIndex('cleaningLogs', 'by-dataset', datasetId);
  return logs.sort((a, b) => a.timestamp - b.timestamp);
}

// ==================== Chart Operations ====================

export async function saveChart(chart: Omit<ChartConfig, 'id' | 'createdAt'>): Promise<ChartConfig> {
  const db = await initDB();
  const newChart: ChartConfig = {
    ...chart,
    id: uuidv4(),
    createdAt: Date.now(),
  };
  await db.put('charts', newChart);
  return newChart;
}

export async function getCharts(datasetId: string): Promise<ChartConfig[]> {
  const db = await initDB();
  return db.getAllFromIndex('charts', 'by-dataset', datasetId);
}

export async function updateChart(chart: ChartConfig): Promise<void> {
  const db = await initDB();
  await db.put('charts', chart);
}

export async function deleteChart(chartId: string): Promise<void> {
  const db = await initDB();
  await db.delete('charts', chartId);
}

// ==================== Utility ====================

export async function isDBEmpty(): Promise<boolean> {
  const db = await initDB();
  const datasets = await db.getAll('datasets');
  return datasets.length === 0;
}
