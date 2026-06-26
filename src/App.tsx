import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage, ProjectDetailPage } from './pages';
import PowerBIPage from './pages/PowerBIPage';
import { ImportModal } from './components';
import { useDB } from './hooks/useDB';
import { initSampleData } from './utils/initSampleData';
import type { Project } from './types';

function App() {
  const { isLoading, error, createProject, saveRawData, getAllProjects } = useDB();
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  // 初始化示例数据
  useEffect(() => {
    if (!isLoading) {
      initSampleData()
        .then((result) => {
          console.log('初始化结果:', result.message);
          setIsInitialized(true);
          // 加载项目列表
          loadProjects();
        })
        .catch((err) => {
          console.error('初始化失败:', err);
          setIsInitialized(true);
        });
    }
  }, [isLoading]);

  // 加载项目列表
  const loadProjects = async () => {
    try {
      const allProjects = await getAllProjects();
      setProjects(allProjects);
    } catch (err) {
      console.error('加载项目失败:', err);
    }
  };

  // 导入成功后重新加载项目列表
  const handleImportSuccess = () => {
    loadProjects();
    setIsImportModalOpen(false);
  };

  // 显示加载状态
  if (isLoading || !isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">正在初始化...</p>
        </div>
      </div>
    );
  }

  // 显示错误状态
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 dark:text-red-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-red-600 dark:text-red-400 text-lg mb-2">初始化失败</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* 首页 */}
        <Route
          path="/"
          element={
            <HomePage
              onImportClick={() => setIsImportModalOpen(true)}
              projects={projects}
            />
          }
        />
        {/* 项目详情页 */}
        <Route path="/project/:id" element={<ProjectDetailPage />} />
        {/* Power BI 看板页面 */}
        <Route path="/powerbi" element={<PowerBIPage />} />
        {/* 其他路由重定向到首页 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* 数据导入模态框 */}
      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportSuccess={handleImportSuccess}
        saveRawData={saveRawData}
        createProject={createProject}
      />
    </Router>
  );
}

export default App;