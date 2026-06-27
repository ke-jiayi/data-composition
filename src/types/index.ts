import type { EChartsOption } from 'echarts';

// ============ 数据集类型 ============

// 数据集信息
export interface Dataset {
  id: string;
  name: string;
  description: string;
  source: string; // 数据来源
  collectionMethod: string; // 采集方式
  rowCount: number;
  columnCount: number;
  columns: DatasetColumn[];
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

// 数据集字段定义
export interface DatasetColumn {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date';
  description?: string;
  nullable: boolean;
}

// ============ 项目基础类型 ============

// 项目基础信息
export interface Project {
  id: string;
  name: string;
  description: string;
  background: string; // 项目背景
  dataSource: string; // 数据来源
  collectionMethod: string; // 采集方式
  fieldDescription: string; // 数据字段说明
  cleaningSteps: string; // 清洗步骤说明
  insights: string[]; // 核心分析结论
  tags: string[];
  createdAt: number;
  updatedAt: number;
  rowCount: number;
  cleanedRowCount: number;
}

// ============ 数据行类型 ============

// 数据行类型（动态键值对）
export type DataRow = Record<string, string | number | boolean | null>;

// ============ 清洗日志类型 ============

// 清洗操作日志
export interface CleaningLog {
  id: string;
  projectId: string;
  operation: string; // 操作描述
  details: string; // 详细信息
  timestamp: number;
  affectedRows?: number; // 影响的行数
}

// ============ 图表配置类型 ============

// 图表配置
export interface ChartConfig {
  id: string;
  projectId: string;
  title: string;
  chartType: 'bar' | 'line' | 'pie' | 'scatter';
  config: EChartsOption;
  dataSource: 'raw' | 'cleaned'; // 数据来源
  xAxisField?: string;
  yAxisField?: string;
  categoryField?: string;
  valueField?: string;
  createdAt: number;
}

// ============ 导入数据类型 ============

// 导入数据类型
export interface ImportData {
  fileName: string;
  fileType: 'csv' | 'json' | 'xlsx' | 'xls';
  columns: string[];
  rows: DataRow[];
  rowCount: number;
  detectedTypes: Record<string, 'string' | 'number' | 'boolean' | 'date'>;
}

// ============ 项目完整数据 ============

// 项目完整数据（包含原始数据、清洗后数据等）
export interface ProjectData {
  project: Project;
  rawData: DataRow[];
  cleanedData: DataRow[];
  cleaningLogs: CleaningLog[];
  charts: ChartConfig[];
}

// ============ 分页与排序 ============

// 分页参数
export interface PaginationParams {
  page: number;
  pageSize: number;
}

// 排序参数
export interface SortParams {
  field: string;
  order: 'asc' | 'desc';
}

// ============ 表格状态 ============

// 表格状态
export interface TableState {
  data: DataRow[];
  pagination: PaginationParams;
  sort: SortParams | null;
  searchTerm: string;
}

// ============ 数据库 Schema ============

// 数据库 schema
export interface DBSchema {
  projects: Project;
  rawData: DataRow & { projectId: string };
  cleanedData: DataRow & { projectId: string };
  cleaningLogs: CleaningLog;
  charts: ChartConfig;
  datasets: Dataset;
}
