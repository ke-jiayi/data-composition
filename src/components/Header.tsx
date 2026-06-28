import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: '首页' },
  { to: '/projects', label: '项目' },
  { to: '/about', label: '关于' },
];

interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function Header({ isSidebarOpen, onToggleSidebar }: HeaderProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-auto py-4">
          {/* Logo */}
          <button
            onClick={onToggleSidebar}
            className="flex items-center gap-2 text-[#1e3a5f] hover:text-[#2d4a6f] transition-colors"
            aria-label="Toggle sidebar"
          >
            <span className="text-xl">✈️</span>
            <span className="text-lg font-semibold">导航</span>
          </button>
        </div>
      </div>
    </header>
  );
}
