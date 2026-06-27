import { Link } from 'react-router-dom';

const navLinks = [
  { to: '/', label: '首页' },
  { to: '/projects', label: '项目' },
  { to: '/about', label: '关于' },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] bg-[#1e3a5f] flex flex-col z-40">
      {/* Profile Section */}
      <div className="p-8 flex flex-col items-center border-b border-white/10">
        {/* Avatar Placeholder */}
        <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-4">
          <span className="text-3xl text-white">📊</span>
        </div>
        <h1 className="text-xl font-semibold text-white">数据作品集</h1>
        <p className="text-sm text-white/60 mt-1">数据分析与可视化</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="block px-8 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-white/10">
        <p className="text-sm text-white/40 text-center">数据采集与可视化作品集</p>
      </div>
    </aside>
  );
}
