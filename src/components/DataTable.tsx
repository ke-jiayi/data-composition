import { useState, useMemo, useCallback } from 'react';
import type { DataRow, SortParams } from '../types';
import Pagination from './Pagination';

export interface DataTableProps {
  data: DataRow[];
  title?: string;
  defaultPageSize?: number;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  title,
  defaultPageSize = 20,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortParams, setSortParams] = useState<SortParams | null>(null);

  const columns = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  }, [data]);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;

    const term = searchTerm.toLowerCase().trim();
    return data.filter((row) =>
      Object.values(row).some((value) => {
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(term);
      })
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortParams) return filteredData;

    const { field, order } = sortParams;
    return [...filteredData].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (aValue === null || aValue === undefined) return order === 'asc' ? 1 : -1;
      if (bValue === null || bValue === undefined) return order === 'asc' ? -1 : 1;

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const aStr = String(aValue);
      const bStr = String(bValue);
      return order === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
  }, [filteredData, sortParams]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = useCallback((field: string) => {
    setSortParams((prev) => {
      if (!prev || prev.field !== field) {
        return { field, order: 'asc' };
      }
      if (prev.order === 'asc') {
        return { field, order: 'desc' };
      }
      return null;
    });
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  const formatCellValue = (value: string | number | boolean | null): string => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'boolean') return value ? '是' : '否';
    return String(value);
  };

  const renderSortIcon = (field: string) => {
    if (!sortParams || sortParams.field !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortParams.order === 'asc' ? (
      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  const stats = {
    totalRows: data.length,
    filteredRows: filteredData.length,
  };

  const startRow = (currentPage - 1) * pageSize + 1;
  const endRow = Math.min(currentPage * pageSize, stats.filteredRows);

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            <p className="text-sm text-gray-500 mt-1">
              共 <span className="font-medium text-gray-900">{stats.totalRows}</span> 行，
              当前显示 <span className="font-medium text-blue-500">{startRow}-{endRow}</span> 行
              {searchTerm && (
                <span className="ml-2">
                  （筛选后：<span className="font-medium text-blue-500">{stats.filteredRows}</span> 行）
                </span>
              )}
            </p>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="搜索..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full sm:w-64 px-3 py-2 pl-10 text-sm border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {paginatedData.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    onClick={() => handleSort(column)}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>{column}</span>
                      {renderSortIcon(column)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`transition-colors ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}
                >
                  {columns.map((column) => (
                    <td
                      key={column}
                      className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap"
                    >
                      {formatCellValue(row[column])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm">
              {searchTerm ? '未找到匹配的数据' : '暂无数据'}
            </p>
            {searchTerm && (
              <button
                onClick={() => handleSearch('')}
                className="mt-2 text-sm text-blue-500 hover:text-blue-600"
              >
                清除搜索
              </button>
            )}
          </div>
        )}
      </div>

      {sortedData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={sortedData.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
};

export default DataTable;