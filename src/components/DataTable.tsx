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
  defaultPageSize = 10,
}) => {
  // 状态
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortParams, setSortParams] = useState<SortParams | null>(null);

  // 获取所有列名
  const columns = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  }, [data]);

  // 过滤数据（搜索功能）
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

  // 排序数据
  const sortedData = useMemo(() => {
    if (!sortParams) return filteredData;

    const { field, order } = sortParams;
    return [...filteredData].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      // 处理 null/undefined
      if (aValue === null || aValue === undefined) return order === 'asc' ? 1 : -1;
      if (bValue === null || bValue === undefined) return order === 'asc' ? -1 : 1;

      // 数字比较
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // 字符串比较
      const aStr = String(aValue);
      const bStr = String(bValue);
      return order === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
  }, [filteredData, sortParams]);

  // 分页数据
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // 处理排序
  const handleSort = useCallback((field: string) => {
    setSortParams((prev) => {
      if (!prev || prev.field !== field) {
        return { field, order: 'asc' };
      }
      if (prev.order === 'asc') {
        return { field, order: 'desc' };
      }
      return null; // 取消排序
    });
  }, []);

  // 处理搜索
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // 搜索时重置页码
  }, []);

  // 处理页码变化
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // 处理每页行数变化
  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  // 格式化单元格值
  const formatCellValue = (value: string | number | boolean | null): string => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'boolean') return value ? '是' : '否';
    return String(value);
  };

  // 渲染排序图标
  const renderSortIcon = (field: string) => {
    if (!sortParams || sortParams.field !== field) {
      return (
        <svg className="w-4 h-4 text-[#a3a3a3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortParams.order === 'asc' ? (
      <svg className="w-4 h-4 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  // 统计信息
  const stats = {
    totalRows: data.length,
    totalColumns: columns.length,
    filteredRows: filteredData.length,
  };

  return (
    <div className="w-full bg-[#171717] rounded-lg shadow-md overflow-hidden border border-[#303030]">
      {/* 头部：标题和搜索 */}
      <div className="p-4 border-b border-[#303030]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* 标题和统计信息 */}
          <div>
            {title && <h3 className="text-lg font-semibold text-[#fafafa]">{title}</h3>}
            <p className="text-sm text-[#a3a3a3] mt-1">
              共 <span className="font-medium text-[#fafafa]">{stats.totalRows}</span> 行，
              <span className="font-medium text-[#fafafa]">{stats.totalColumns}</span> 列
              {searchTerm && (
                <span className="ml-2">
                  （筛选后：<span className="font-medium text-[#3b82f6]">{stats.filteredRows}</span> 行）
                </span>
              )}
            </p>
          </div>

          {/* 搜索框 */}
          <div className="relative">
            <input
              type="text"
              placeholder="搜索..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full sm:w-64 px-3 py-2 pl-10 text-sm border border-[#303030] rounded-md bg-[#0a0a0a] text-[#fafafa] placeholder-[#a3a3a3] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#a3a3a3]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#a3a3a3] hover:text-[#fafafa]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 表格 */}
      <div className="overflow-x-auto">
        {paginatedData.length > 0 ? (
          <table className="min-w-full divide-y divide-[#303030]">
            <thead className="bg-[#171717]">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    onClick={() => handleSort(column)}
                    className="px-4 py-3 text-left text-xs font-medium text-[#a3a3a3] uppercase tracking-wider cursor-pointer hover:bg-[#262626] select-none transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>{column}</span>
                      {renderSortIcon(column)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-[#0a0a0a] divide-y divide-[#303030]">
              {paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-[#262626] transition-colors">
                  {columns.map((column) => (
                    <td
                      key={column}
                      className="px-4 py-3 text-sm text-[#fafafa] whitespace-nowrap"
                    >
                      {formatCellValue(row[column])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-[#a3a3a3]">
            <svg className="w-12 h-12 text-[#303030] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm">
              {searchTerm ? '未找到匹配的数据' : '暂无数据'}
            </p>
            {searchTerm && (
              <button
                onClick={() => handleSearch('')}
                className="mt-2 text-sm text-[#3b82f6] hover:text-[#60a5fa]"
              >
                清除搜索
              </button>
            )}
          </div>
        )}
      </div>

      {/* 分页 */}
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