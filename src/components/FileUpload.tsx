import { useState, useCallback, useRef } from 'react';
import type { DragEvent, ChangeEvent } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedFormats?: string;
  maxSize?: number; // MB
  disabled?: boolean;
  isLoading?: boolean;
}

export const FileUpload = ({
  onFileSelect,
  acceptedFormats = '.csv,.json,.xlsx,.xls',
  maxSize = 10,
  disabled = false,
  isLoading = false,
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback(
    (file: File): string | null => {
      // 检查文件类型
      const fileName = file.name.toLowerCase();
      const isValidFormat = 
        fileName.endsWith('.csv') || 
        fileName.endsWith('.json') || 
        fileName.endsWith('.xlsx') || 
        fileName.endsWith('.xls');
      if (!isValidFormat) {
        return '仅支持 CSV、JSON 和 Excel 格式的文件';
      }

      // 检查文件大小
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSize) {
        return `文件大小不能超过 ${maxSize}MB`;
      }

      return null;
    },
    [maxSize]
  );

  const handleFile = useCallback(
    (file: File) => {
      setError(null);
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      onFileSelect(file);
    },
    [validateFile, onFileSelect]
  );

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isLoading) {
      setIsDragging(true);
    }
  }, [disabled, isLoading]);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled || isLoading) return;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [disabled, isLoading, handleFile]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
      // 重置 input 以便可以再次选择同一文件
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [handleFile]
  );

  const handleClick = useCallback(() => {
    if (!disabled && !isLoading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled, isLoading]);

  return (
    <div className="w-full">
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer
          transition-all duration-200 ease-in-out
          ${isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'}
          ${disabled || isLoading ? 'opacity-60 cursor-not-allowed' : ''}
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled || isLoading}
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          {/* 上传图标 */}
          <div className="w-16 h-16 mx-auto text-gray-400">
            {isLoading ? (
              <svg
                className="animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            )}
          </div>

          {/* 提示文字 */}
          <div>
            <p className="text-base font-medium text-gray-700">
              {isLoading ? '正在处理...' : isDragging ? '释放文件以上传' : '拖拽文件到此处或点击上传'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              支持 CSV、JSON 和 Excel 格式，最大 {maxSize}MB
            </p>
          </div>

          {/* 上传按钮 */}
          <button
            type="button"
            className={`
              px-5 py-2.5 bg-blue-500 text-white rounded-lg font-medium
              hover:bg-blue-600 transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            disabled={disabled || isLoading}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            {isLoading ? '处理中...' : '选择文件'}
          </button>
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-red-500 mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm text-red-600">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};