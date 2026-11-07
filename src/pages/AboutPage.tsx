import { Layout } from '../components/Layout';

const techStack = ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'IndexedDB', 'Cloudflare Pages'];

const futurePlans = [
  '增加更多可视化图表类型',
  '支持数据导出',
  '完善文件夹分类和搜索功能',
];

export function AboutPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-cyan-300 dark:drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            关于这个数据作品集
          </h1>
        </div>

        <div className="space-y-3 md:space-y-4">
          {/* 网站介绍 */}
          <section className="bg-white dark:bg-[#26262C] rounded-lg border border-gray-200 dark:border-[#3A3A44] shadow-sm dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)] p-3 md:p-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E2E8F0] mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 flex-shrink-0 inline-block mr-2 text-[#00B4D8] dark:text-[#6BC5E8]">
              <path d="M11 2.04938V12H20.9506C20.4481 6.44668 15.5533 1.55185 11 2.04938ZM11 14H2.04938C2.55185 19.5533 7.44668 24.4482 11 23.9506V14ZM13 2.04938V12H22.9506C22.4482 6.44668 18.5533 1.55185 13 2.04938ZM13 14V23.9506C18.5533 23.4482 22.4482 18.5533 22.9506 14H13Z"></path>
            </svg>
            这个网站是做什么的？
          </h2>
            <p className="text-lg text-gray-600 dark:text-purple-200/70 leading-relaxed mb-3">
              这是我用 TraeCode 从零开始搭建的个人数据分析作品集网站。它把「数据采集 → 清洗 → 分析 → 可视化」的完整流程做成一个可交互的网页工具，方便我展示自己的数据处理能力。
            </p>
            <p className="text-lg text-gray-600 dark:text-purple-200/70 leading-relaxed">
              目前支持 CSV / Excel 导入、数据清洗、简单分析，后续还会加入更多图表类型。
            </p>
          </section>

          {/* 联系方式 */}
          <section className="bg-white dark:bg-[#26262C] rounded-lg border border-gray-200 dark:border-[#3A3A44] shadow-sm dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)] p-3 md:p-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E2E8F0] mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 flex-shrink-0 inline-block mr-2 text-[#00B4D8] dark:text-[#6BC5E8]">
              <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM9.5 10C10.3284 10 11 10.6716 11 11.5C11 12.3284 10.3284 13 9.5 13C8.67157 13 8 12.3284 8 11.5C8 10.6716 8.67157 10 9.5 10ZM14.5 10C15.3284 10 16 10.6716 16 11.5C16 12.3284 15.3284 13 14.5 13C13.6716 13 13 12.3284 13 11.5C13 10.6716 13.6716 10 14.5 10ZM12 17.5C10.067 17.5 8.38045 16.3231 7.55119 14.6413C7.70515 14.5785 7.87322 14.5435 8.05 14.5435H15.95C16.1268 14.5435 16.2948 14.5785 16.4488 14.6413C15.6195 16.3231 13.933 17.5 12 17.5Z"></path>
              <path d="M19.5 2L20.5 4.5L23 5.5L20.5 6.5L19.5 9L18.5 6.5L16 5.5L18.5 4.5L19.5 2Z"></path>
            </svg>
            联系方式
          </h2>
            <p className="text-lg text-gray-600 dark:text-purple-200/70 leading-relaxed mb-4">
              如果需要联系我，或对此作品集有任何建议，可以通过以下方式找到我：
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/ke-jiayi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyan-700 dark:text-cyan-300 hover:underline transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub：https://github.com/ke-jiayi
                </a>
              </li>
              <li>
                <a
                  href="mailto:ke-jiayi@users.noreply.github.com"
                  className="inline-flex items-center gap-2 text-cyan-700 dark:text-cyan-300 hover:underline transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  邮箱：ke-jiayi@users.noreply.github.com
                </a>
              </li>
            </ul>
            <p className="text-gray-500 dark:text-purple-200/50 text-base mt-4">欢迎交流。</p>
          </section>

          {/* 技术栈 */}
          <section className="bg-white dark:bg-[#26262C] rounded-lg border border-gray-200 dark:border-[#3A3A44] shadow-sm dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)] p-3 md:p-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E2E8F0] mb-4">
              <i className="ri-settings-4-fill w-6 h-6 inline-flex items-center justify-center mr-2 text-[#00B4D8] dark:text-[#6BC5E8]"></i>
              技术栈
            </h2>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-base border bg-cyan-50 border-cyan-200 text-cyan-700 dark:bg-cyan-500/10 dark:border-cyan-400/30 dark:text-cyan-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* 后续计划 */}
          <section className="bg-white dark:bg-[#26262C] rounded-lg border border-gray-200 dark:border-[#3A3A44] shadow-sm dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)] p-3 md:p-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E2E8F0] mb-3">
              <i className="ri-quill-pen-ai-fill w-6 h-6 inline-flex items-center justify-center mr-2 text-[#00B4D8] dark:text-[#6BC5E8]"></i>
              后续计划
            </h2>
            <ul className="space-y-2 text-lg text-gray-600 dark:text-purple-200/70">
              {futurePlans.map((plan) => (
                <li key={plan} className="flex items-start gap-2">
                  <span className="text-cyan-500 dark:text-cyan-300">•</span>
                  <span>{plan}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
}
