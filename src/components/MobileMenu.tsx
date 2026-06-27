import { Link } from 'react-router-dom';

const navLinks = [
  { to: '/', label: '首页' },
  { to: '/projects', label: '项目' },
  { to: '/about', label: '关于' },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-[280px] bg-[#1e3a5f] flex flex-col z-50 md:hidden">
        {/* Close Button */}
        <div className="p-4 flex justify-end border-b border-white/10">
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Profile Section */}
        <div className="p-6 flex flex-col items-center border-b border-white/10">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-3">
            <span className="text-2xl text-white">📊</span>
          </div>
          <h1 className="text-lg font-semibold text-white">数据作品集</h1>
          <p className="text-sm text-white/60 mt-1">数据分析与可视化</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={onClose}
                  className="block px-6 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
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
    </>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden p-2 text-[#1e3a5f] hover:text-[#2d4a6f] transition-colors"
      aria-label="Open menu"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
}
