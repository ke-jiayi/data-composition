import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { useDB } from '../hooks/useDB';
import { parseFile } from '../utils/fileParser';
import type { Dataset } from '../utils/db';

// 格式化时间戳为 YYYY-MM-DD
function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// 格式化数字为本地格式
function formatNumber(num: number): string {
  return num.toLocaleString('zh-CN');
}

// Hero 动画变体
const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function HomePage() {
  const today = new Date();
  const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const { isLoading: dbLoading, createDataset, saveData, getAllDatasets } = useDB();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const datasetsRef = useRef<HTMLDivElement>(null);

  // 平滑滚动到数据集列表
  const scrollToDatasets = () => {
    datasetsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 根据搜索关键词过滤数据集
  const filteredDatasets = searchQuery
    ? datasets.filter(
        (d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.fileName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : datasets;

  // 加载数据集列表
  useEffect(() => {
    if (!dbLoading) {
      loadDatasets();
    }
  }, [dbLoading]);

  const loadDatasets = async () => {
    try {
      const allDatasets = await getAllDatasets();
      setDatasets(allDatasets);
    } catch (error) {
      console.error('加载数据集失败:', error);
    }
  };

  // 点击导入按钮，触发文件选择
  const handleImport = () => {
    fileInputRef.current?.click();
  };

  // 处理文件选择
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith('.csv') && !fileName.endsWith('.xlsx') && !fileName.endsWith('.xls')) {
      setImportError('仅支持 CSV 和 XLSX 文件');
      return;
    }

    setIsImporting(true);
    setImportError(null);
    setImportSuccess(false);

    try {
      const importData = await parseFile(file);
      const name = file.name.replace(/\.(csv|json|xlsx|xls)$/i, '');
      const dataset = await createDataset({
        name,
        fileName: importData.fileName,
        fileType: importData.fileType,
        columns: importData.columns,
        rowCount: importData.rowCount,
        tags: [importData.fileType.toUpperCase()],
      });
      await saveData(dataset.id, importData.rows);
      await loadDatasets();
      setImportSuccess(true);
      setTimeout(() => {
        setImportSuccess(false);
      }, 3000);
    } catch (error) {
      setImportError(error instanceof Error ? error.message : '导入失败');
    } finally {
      setIsImporting(false);
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  return (
    <Layout>
      {/* ============ 封面 Hero 区域 ============ */}
      <section className="-m-6 md:-m-10 -mt-20 relative min-h-[calc(100vh-80px)] overflow-hidden">
        {/* 深色渐变背景 + 微妙网格纹理 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0a0f1e] to-slate-950" />
        {/* 霓虹光晕装饰 */}
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        {/* 居中内容 */}
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 md:px-16 text-center"
        >
          {/* 顶部小标签 */}
          <motion.div variants={heroItemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-cyan-400/20 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="text-xs font-medium tracking-widest text-cyan-300 uppercase">
                {dateString} · Online
              </span>
            </span>
          </motion.div>

          {/* 主标题 - 中英文 */}
          <motion.h1
            variants={heroItemVariants}
            className="relative"
          >
            <span className="block font-black tracking-tight text-5xl md:text-7xl lg:text-8xl text-white leading-none">
              Data
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400 bg-clip-text text-transparent ml-2 md:ml-4">
                Portfolio
              </span>
            </span>
            <span className="mt-4 block text-2xl md:text-4xl font-bold tracking-wide text-gray-300/90">
              数 据 作 品 集
            </span>
            {/* 装饰下划线 */}
            <span className="mt-6 mx-auto block w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full" />
          </motion.h1>

          {/* 副标题 */}
          <motion.p
            variants={heroItemVariants}
            className="mt-8 max-w-2xl text-base md:text-lg text-gray-400 tracking-wider"
          >
            <span className="text-cyan-300/80">数据分析</span>
            <span className="mx-3 text-gray-600">·</span>
            <span className="text-purple-300/80">数据可视化</span>
            <span className="mx-3 text-gray-600">·</span>
            <span className="text-sky-300/80">个人作品集</span>
          </motion.p>

          {/* 探索按钮 */}
          <motion.div variants={heroItemVariants} className="mt-12">
            <button
              onClick={scrollToDatasets}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.03] transition-all duration-300 ease-out"
            >
              <span>探 索 作 品</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              {/* 按钮光晕 */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300" />
            </button>
          </motion.div>

          {/* 底部信息 */}
          <motion.div variants={heroItemVariants} className="absolute bottom-8 left-0 right-0">
            <p className="text-xs md:text-sm text-gray-500 tracking-wider">
              数据来源：国家统计局
              <span className="mx-3 text-gray-700">|</span>
              技术栈：
              <span className="text-cyan-400/80">React</span>
              <span className="mx-1 text-gray-600">·</span>
              <span className="text-purple-400/80">Python</span>
              <span className="mx-1 text-gray-600">·</span>
              <span className="text-sky-400/80">Tailwind</span>
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ============ 数据集列表区域 ============ */}
      <section ref={datasetsRef} id="datasets" className="scroll-mt-24">
        <div className="max-w-5xl mx-auto pt-16 pb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full inline-block" />
                我 的 数 据 集
              </h2>
              <p className="mt-1 text-sm text-gray-500">已导入 {datasets.length} 个数据集</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleImport}
                disabled={isImporting || dbLoading}
                className="px-4 py-2 bg-gradient-to-r from-[#1e3a5f] to-[#2a4a73] text-white text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/10 hover:scale-[1.02] transition-all"
              >
                {isImporting ? '导入中...' : '导 入 数 据'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* 导入成功提示 */}
          {importSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-medium">✓ 数据导入成功！</p>
            </div>
          )}

          {/* 导入失败提示 */}
          {importError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex justify-between items-center">
              <p className="text-red-700 font-medium">✗ {importError}</p>
              <button
                onClick={() => setImportError(null)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          )}

          {/* 数据大屏入口卡片 */}
          <Link
            to="/dashboard"
            className="group relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 mb-8 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-1 transition-all duration-300"
          >
            {/* 装饰光晕 */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-colors" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/20 transition-colors" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* 图标 */}
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/20 text-3xl">
                  📊
                </div>
                {/* 文案 */}
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                    数据大屏
                  </h3>
                  <p className="text-sm text-gray-400 mt-0.5">VizAgent 生成的交互式可视化大屏</p>
                </div>
              </div>
              {/* 右侧箭头 */}
              <svg
                className="w-6 h-6 text-cyan-400 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>

          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="relative overflow-hidden bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-cyan-600" />
              <p className="text-xs text-gray-500 mb-2 tracking-wider">总 数 据 集</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {formatNumber(datasets.length)}
                <span className="ml-2 text-sm font-medium text-gray-500">个</span>
              </p>
            </div>
            <div className="relative overflow-hidden bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-400 to-purple-600" />
              <p className="text-xs text-gray-500 mb-2 tracking-wider">总 数 据 行</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {formatNumber(datasets.reduce((sum, d) => sum + d.rowCount, 0))}
                <span className="ml-2 text-sm font-medium text-gray-500">行</span>
              </p>
            </div>
            <div className="relative overflow-hidden bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-sky-400 to-sky-600" />
              <p className="text-xs text-gray-500 mb-2 tracking-wider">最 近 更 新</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {datasets.length > 0 ? formatDate(datasets[0].updatedAt) : '暂无'}
              </p>
            </div>
          </div>

          {/* 搜索输入框 */}
          <div className="mb-6">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="搜索数据集名称或文件名..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/40 transition-all text-sm"
              />
            </div>
          </div>

          {/* 数据集列表 */}
          {datasets.length > 0 ? (
            filteredDatasets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredDatasets.map((dataset, idx) => (
                  <Link
                    key={dataset.id}
                    to={`/project/${dataset.id}`}
                    className="group relative overflow-hidden bg-white rounded-xl border border-gray-200 p-5 hover:shadow-xl hover:shadow-cyan-500/5 hover:border-cyan-300/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    {/* 卡片顶部色条 */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        backgroundImage:
                          idx % 3 === 0
                            ? 'linear-gradient(to right, #22d3ee, #06b6d4)'
                            : idx % 3 === 1
                            ? 'linear-gradient(to right, #a78bfa, #8b5cf6)'
                            : 'linear-gradient(to right, #38bdf8, #0ea5e9)',
                      }}
                    />
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 line-clamp-1">
                        {dataset.name}
                      </h3>
                      <span
                        className="shrink-0 ml-2 text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor:
                            dataset.fileType === 'csv'
                              ? 'rgba(34, 211, 238, 0.1)'
                              : 'rgba(167, 139, 250, 0.1)',
                          color:
                            dataset.fileType === 'csv' ? '#0891b2' : '#7c3aed',
                        }}
                      >
                        {dataset.fileType.toUpperCase()}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600 flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                        {formatNumber(dataset.rowCount)} 行数据
                      </p>
                      <p className="text-xs text-gray-400 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        导入于 {formatDate(dataset.createdAt)}
                      </p>
                    </div>
                    {/* 卡片底部箭头指示 */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 group-hover:text-cyan-500 transition-colors">
                      <span>查看详情</span>
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200 border-dashed">
                <div className="text-gray-300 text-5xl mb-3">🔍</div>
                <p className="text-gray-500">未找到匹配的数据集</p>
              </div>
            )
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200 border-dashed">
              <div className="text-gray-300 text-6xl mb-4">📁</div>
              <p className="text-gray-600 text-lg mb-2 font-medium">暂无数据集</p>
              <p className="text-gray-400 text-sm mb-6">开始导入你第一个数据作品吧</p>
              <button
                onClick={handleImport}
                disabled={isImporting || dbLoading}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                {isImporting ? '导入中...' : '导 入 第 一 个 数 据 集'}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-8 py-8 text-center text-sm text-gray-400 border-t border-gray-200"
        >
          <p>© 2026 Data Portfolio · 用数据记录成长 · Crafted with React & Python</p>
        </motion.div>
      </section>
    </Layout>
  );
}
