import { Layout } from '../components';

export function DashboardPage() {
  return (
    <Layout>
      <div className="flex flex-col">
        {/* 页面标题 */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">📊 数据大屏</h1>
        </div>

        {/* 数据大屏 iframe */}
        <iframe
          src="/dashboard.html"
          title="数据大屏"
          style={{ width: '100%', height: 'calc(100vh - 80px)', border: 'none' }}
        />
      </div>
    </Layout>
  );
}
