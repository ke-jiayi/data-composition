import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import type { ImportData, DataRow } from '../types';

/**
 * 检测值的类型
 */
function detectValueType(value: unknown): 'string' | 'number' | 'boolean' | 'date' {
  if (value === null || value === undefined || value === '') {
    return 'string';
  }

  // 检查布尔值
  if (typeof value === 'boolean') {
    return 'boolean';
  }

  // 检查数字
  if (typeof value === 'number' && !isNaN(value)) {
    return 'number';
  }

  // 检查字符串形式的布尔值
  const strValue = String(value).toLowerCase();
  if (strValue === 'true' || strValue === 'false') {
    return 'boolean';
  }

  // 检查字符串形式的数字
  if (!isNaN(Number(value)) && value !== '') {
    return 'number';
  }

  // 检查日期格式
  const datePatterns = [
    /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
    /^\d{4}\/\d{2}\/\d{2}$/, // YYYY/MM/DD
    /^\d{2}-\d{2}-\d{4}$/, // MM-DD-YYYY
    /^\d{2}\/\d{2}\/\d{4}$/, // MM/DD/YYYY
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, // ISO 格式
  ];

  for (const pattern of datePatterns) {
    if (pattern.test(String(value))) {
      const date = new Date(String(value));
      if (!isNaN(date.getTime())) {
        return 'date';
      }
    }
  }

  return 'string';
}

/**
 * 检测列的数据类型（基于所有值的推断）
 */
function detectColumnType(values: unknown[]): 'string' | 'number' | 'boolean' | 'date' {
  const nonNullValues = values.filter(v => v !== null && v !== undefined && v !== '');
  
  if (nonNullValues.length === 0) {
    return 'string';
  }

  const types = nonNullValues.map(v => detectValueType(v));
  const typeSet = new Set(types);

  // 如果所有值都是同一类型，使用该类型
  if (typeSet.size === 1) {
    return types[0];
  }

  // 如果有混合类型，优先级：number > boolean > date > string
  if (typeSet.has('number') && !typeSet.has('string')) {
    return 'number';
  }

  // 默认返回 string
  return 'string';
}

/**
 * 转换值到指定类型
 */
function convertValue(value: unknown, type: 'string' | 'number' | 'boolean' | 'date'): string | number | boolean | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  switch (type) {
    case 'number':
      const num = Number(value);
      return isNaN(num) ? null : num;
    case 'boolean':
      const strVal = String(value).toLowerCase();
      if (strVal === 'true' || strVal === '1') return true;
      if (strVal === 'false' || strVal === '0') return false;
      return null;
    case 'date':
      const date = new Date(String(value));
      return isNaN(date.getTime()) ? null : String(value);
    case 'string':
    default:
      return String(value);
  }
}

/**
 * 解析 CSV 文件
 */
export function parseCSV(file: File): Promise<ImportData> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false, // 禁用自动类型转换，我们自己处理
      encoding: 'UTF-8',
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(`CSV 解析错误: ${results.errors.map(e => e.message).join(', ')}`));
          return;
        }

        const data = results.data as Record<string, string>[];
        
        if (data.length === 0) {
          reject(new Error('CSV 文件为空'));
          return;
        }

        // 获取列名
        const columns = Object.keys(data[0]);

        // 检测每列的数据类型
        const detectedTypes: Record<string, 'string' | 'number' | 'boolean' | 'date'> = {};
        for (const column of columns) {
          const values = data.map(row => row[column]);
          detectedTypes[column] = detectColumnType(values);
        }

        // 转换数据类型
        const rows: DataRow[] = data.map(row => {
          const convertedRow: DataRow = {};
          for (const column of columns) {
            convertedRow[column] = convertValue(row[column], detectedTypes[column]);
          }
          return convertedRow;
        });

        resolve({
          fileName: file.name,
          fileType: 'csv',
          columns,
          rows,
          rowCount: rows.length,
          detectedTypes,
        });
      },
      error: (error) => {
        reject(new Error(`CSV 解析失败: ${error.message}`));
      },
    });
  });
}

/**
 * 解析 JSON 文件
 */
export function parseJSON(file: File): Promise<ImportData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const jsonData = JSON.parse(content);

        // 处理不同格式的 JSON
        let dataArray: Record<string, unknown>[];

        if (Array.isArray(jsonData)) {
          // 数组格式
          dataArray = jsonData;
        } else if (typeof jsonData === 'object' && jsonData !== null) {
          // 对象格式，尝试找数据数组
          const possibleArrays = Object.values(jsonData).filter(Array.isArray);
          if (possibleArrays.length > 0) {
            // 使用第一个找到的数组
            dataArray = possibleArrays[0] as Record<string, unknown>[];
          } else {
            // 单个对象，包装成数组
            dataArray = [jsonData];
          }
        } else {
          reject(new Error('JSON 格式不支持：需要对象数组或包含数组的对象'));
          return;
        }

        if (dataArray.length === 0) {
          reject(new Error('JSON 数据为空'));
          return;
        }

        // 获取列名（取所有对象的键的并集）
        const columnSet = new Set<string>();
        for (const item of dataArray) {
          Object.keys(item).forEach(key => columnSet.add(key));
        }
        const columns = Array.from(columnSet);

        // 检测每列的数据类型
        const detectedTypes: Record<string, 'string' | 'number' | 'boolean' | 'date'> = {};
        for (const column of columns) {
          const values = dataArray.map(item => item[column]);
          detectedTypes[column] = detectColumnType(values);
        }

        // 转换数据类型
        const rows: DataRow[] = dataArray.map(item => {
          const convertedRow: DataRow = {};
          for (const column of columns) {
            convertedRow[column] = convertValue(item[column], detectedTypes[column]);
          }
          return convertedRow;
        });

        resolve({
          fileName: file.name,
          fileType: 'json',
          columns,
          rows,
          rowCount: rows.length,
          detectedTypes,
        });
      } catch (error) {
        reject(new Error(`JSON 解析失败: ${error instanceof Error ? error.message : '未知错误'}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('文件读取失败'));
    };

    reader.readAsText(file, 'UTF-8');
  });
}

/**
 * 解析 Excel 文件
 */
export function parseExcel(file: File): Promise<ImportData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result as ArrayBuffer;
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });

        const firstSheetName = workbook.SheetNames[0];
        if (!firstSheetName) {
          reject(new Error('Excel 文件为空'));
          return;
        }

        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json<any[]>(worksheet, {
          header: 1,
          defval: '',
        });

        if (jsonData.length === 0) {
          reject(new Error('Excel 文件为空'));
          return;
        }

        const headers = jsonData[0].map(h => String(h || ''));
        const dataRows = jsonData.slice(1);

        if (dataRows.length === 0) {
          reject(new Error('Excel 文件为空'));
          return;
        }

        const columns = headers.filter(h => h !== '');

        const dataArray: Record<string, unknown>[] = dataRows.map(row => {
          const obj: Record<string, unknown> = {};
          headers.forEach((header, index) => {
            if (header !== '') {
              const value = row[index];
              if (value instanceof Date) {
                obj[header] = value.toISOString().split('T')[0];
              } else {
                obj[header] = value;
              }
            }
          });
          return obj;
        });

        const detectedTypes: Record<string, 'string' | 'number' | 'boolean' | 'date'> = {};
        for (const column of columns) {
          const values = dataArray.map(item => item[column]);
          detectedTypes[column] = detectColumnType(values);
        }

        const rows: DataRow[] = dataArray.map(item => {
          const convertedRow: DataRow = {};
          for (const column of columns) {
            convertedRow[column] = convertValue(item[column], detectedTypes[column]);
          }
          return convertedRow;
        });

        const fileName = file.name.toLowerCase();
        const fileType: 'xlsx' | 'xls' = fileName.endsWith('.xlsx') ? 'xlsx' : 'xls';

        resolve({
          fileName: file.name,
          fileType,
          columns,
          rows,
          rowCount: rows.length,
          detectedTypes,
        });
      } catch (error) {
        reject(new Error(`Excel 解析失败: ${error instanceof Error ? error.message : '未知错误'}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('文件读取失败'));
    };

    reader.readAsArrayBuffer(file);
  });
}

/**
 * 根据文件类型自动选择解析器
 */
export function parseFile(file: File): Promise<ImportData> {
  const fileName = file.name.toLowerCase();
  const isCSV = fileName.endsWith('.csv');
  const isJSON = fileName.endsWith('.json');
  const isXLSX = fileName.endsWith('.xlsx');
  const isXLS = fileName.endsWith('.xls');

  if (!isCSV && !isJSON && !isXLSX && !isXLS) {
    return Promise.reject(new Error('不支持的文件格式，仅支持 CSV、JSON、XLSX 和 XLS 文件'));
  }

  if (isCSV) {
    return parseCSV(file);
  }

  if (isJSON) {
    return parseJSON(file);
  }

  return parseExcel(file);
}

/**
 * 获取文件类型
 */
export function getFileType(file: File): 'csv' | 'json' | 'xlsx' | 'xls' | null {
  const fileName = file.name.toLowerCase();
  if (fileName.endsWith('.csv')) return 'csv';
  if (fileName.endsWith('.json')) return 'json';
  if (fileName.endsWith('.xlsx')) return 'xlsx';
  if (fileName.endsWith('.xls')) return 'xls';
  return null;
}