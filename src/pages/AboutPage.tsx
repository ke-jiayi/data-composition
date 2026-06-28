import { Layout } from '../components/Layout';

export function AboutPage() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">关于数据作品集</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">✈️ 关于我们</h2>
              <p className="text-gray-600 leading-relaxed">
                数据作品集是一个数据可视化与分析平台，帮助用户轻松导入、管理和分析数据。
                我们致力于提供简洁、高效的数据处理体验，让数据分析变得简单。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">📊 功能特点</h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#1e3a5f]">•</span>
                  <span>支持 CSV 和 Excel 文件导入</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1e3a5f]">•</span>
                  <span>数据表格展示与搜索</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1e3a5f]">•</span>
                  <span>数据清洗与处理</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1e3a5f]">•</span>
                  <span>本地数据存储（IndexedDB）</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">🔧 技术栈</h2>
              <p className="text-gray-600">
                React 19 · TypeScript · Tailwind CSS · Vite · IndexedDB
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">📝 联系方式</h2>
              <p className="text-gray-600">
                如果您有任何问题或建议，欢迎通过 GitHub 仓库提交 Issue。
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
