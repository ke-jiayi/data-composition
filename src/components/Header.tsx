import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: '首页' },
  { to: '/projects', label: '项目' },
  { to: '/about', label: '关于' },
];

export function Header() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-[#1e3a5f] hover:text-[#2d4a6f] transition-colors">
            <span className="text-xl">✈️</span>
            <span className="text-lg font-semibold">导航</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center">
            {navLinks.map((link, index) => (
              <span key={link.to} className="flex items-center">
                {index > 0 && <span className="text-gray-300 mx-4">|</span>}
                <Link
                  to={link.to}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
