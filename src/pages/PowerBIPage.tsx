import { Layout } from '../components';

const PowerBIPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#fafafa] mb-4">
            Power BI 可视化看板
          </h1>
          <p className="text-[#a3a3a3] text-lg">
            展示使用 Microsoft Power BI 制作的交互式数据分析报表
          </p>
        </div>

        {/* 能力说明 */}
        <div className="bg-[#171717] rounded-lg p-6 mb-8 border border-[#303030]">
          <h2 className="text-xl font-semibold text-[#fafafa] mb-3">
            Power BI 数据分析能力展示
          </h2>
          <ul className="space-y-2 text-[#a3a3a3]">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-[#3b82f6] mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>熟练使用 Power BI Desktop 进行数据建模和可视化设计</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-[#3b82f6] mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>掌握 DAX 语言进行高级数据计算和度量值创建</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-[#3b82f6] mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>使用 Power BI Service 进行报表发布和分享</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-[#3b82f6] mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>创建交互式仪表板和动态报表，支持钻取和筛选</span>
            </li>
          </ul>
        </div>

        {/* Power BI iframe 嵌入区域 */}
        <div className="bg-[#171717] rounded-lg shadow-lg p-6 mb-8 border border-[#303030]">
          <h3 className="text-lg font-semibold text-[#fafafa] mb-4">
            示例报表
          </h3>
          <div className="bg-[#0a0a0a] rounded-lg p-4 min-h-[600px] flex items-center justify-center border border-[#303030]">
            {/* Power BI iframe 占位符 */}
            <div className="text-center">
              <svg className="w-16 h-16 text-[#303030] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-[#a3a3a3] text-lg font-medium mb-2">
                Power BI 报表嵌入区域
              </p>
              <p className="text-[#a3a3a3] text-sm mb-4">
                此区域将嵌入使用 Power BI "Publish to web" 功能生成的公开报表
              </p>
              <div className="bg-[#262626] rounded-md p-4 text-sm text-[#a3a3a3] border border-[#303030]">
                <p className="mb-2">
                  <strong>使用说明：</strong>
                </p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>在 Power BI Desktop 中创建报表</li>
                  <li>发布到 Power BI Service</li>
                  <li>使用 "Publish to web" 功能生成嵌入代码</li>
                  <li>替换此占位符为 iframe 嵌入代码</li>
                </ol>
                <div className="mt-3 pt-3 border-t border-[#303030]">
                  <p className="text-xs">
                    <strong>iframe 示例代码：</strong>
                  </p>
                  <code className="block mt-1 text-xs bg-[#0a0a0a] p-2 rounded overflow-x-auto border border-[#303030]">
                    &lt;iframe title="报表标题" width="100%" height="600" src="https://app.powerbi.com/view?r=eyJr..." frameborder="0" allowFullScreen="true"&gt;&lt;/iframe&gt;
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 如何获取 Power BI 嵌入代码 */}
        <div className="bg-[#171717] rounded-lg shadow-lg p-6 border border-[#303030]">
          <h3 className="text-lg font-semibold text-[#fafafa] mb-4">
            如何获取 Power BI 嵌入代码
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-base font-medium text-[#fafafa] mb-3">
                步骤 1：创建并发布报表
              </h4>
              <ul className="space-y-2 text-[#a3a3a3] text-sm">
                <li>在 Power BI Desktop 中设计报表</li>
                <li>点击 "发布" 将报表上传到 Power BI Service</li>
                <li>登录 Power BI Service 查看报表</li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-medium text-[#fafafa] mb-3">
                步骤 2：生成嵌入代码
              </h4>
              <ul className="space-y-2 text-[#a3a3a3] text-sm">
                <li>在报表页面点击 "文件" → "嵌入"</li>
                <li>选择 "发布到 Web（公开）"</li>
                <li>复制生成的 iframe 嵌入代码</li>
                <li>将代码粘贴到此页面替换占位符</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-4 bg-[#262626] rounded-md border border-[#303030]">
            <p className="text-sm text-[#a3a3a3]">
              <strong>注意事项：</strong> "Publish to web" 会公开您的报表，任何人都可以查看。请确保报表中不包含敏感数据。
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PowerBIPage;