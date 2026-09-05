import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage, ProjectDetailPage, ProjectListPage, AboutPage, WelcomePage } from './pages';
import PowerBIPage from './pages/PowerBIPage';
import { ImportModal } from './components';
import { useDB } from './hooks/useDB';
import { ImportModalProvider, useImportModal } from './contexts/ImportModalContext';
import { ThemeProvider } from './contexts/ThemeContext';
import type { Folder } from './utils/db';

function AppContent() {
  const { isLoading, error, createDataset, saveData, getAllFolders, createFolder } = useDB();
  const { isOpen, closeModal } = useImportModal();
  const [folders, setFolders] = useState<Folder[]>([]);

  // 加载文件夹列表
  useEffect(() => {
    getAllFolders()
      .then(setFolders)
      .catch((err) => console.error('加载文件夹失败:', err));
  }, [getAllFolders]);

  // ImportModal 内新建文件夹后刷新列表
  const handleFolderCreated = (folder: Folder) => {
    setFolders((prev) => [...prev, folder]);
  };

  // 显示加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a5f] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">正在初始化...</p>
        </div>
      </div>
    );
  }

  // 显示错误状态
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-red-600 text-lg mb-2">初始化失败</p>
          <p className="text-gray-600 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* 封面欢迎页 */}
        <Route
          path="/"
          element={<WelcomePage />}
        />
        {/* 数据内容首页 */}
        <Route
          path="/home"
          element={<HomePage />}
        />
        {/* 项目列表页 */}
        <Route path="/projects" element={<ProjectListPage />} />
        {/* 项目详情页 */}
        <Route path="/project/:id" element={<ProjectDetailPage />} />
        {/* 关于页 */}
        <Route path="/about" element={<AboutPage />} />
        {/* Power BI 看板页面 */}
        <Route path="/powerbi" element={<PowerBIPage />} />
        {/* 其他路由重定向到首页 */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

      {/* 数据导入模态框 */}
      <ImportModal
        isOpen={isOpen}
        onClose={closeModal}
        onImportSuccess={() => closeModal()}
        saveData={saveData}
        createDataset={createDataset}
        createFolder={createFolder}
        folders={folders}
        onFolderCreated={handleFolderCreated}
      />
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ImportModalProvider>
        <AppContent />
      </ImportModalProvider>
    </ThemeProvider>
  );
}

export default App;