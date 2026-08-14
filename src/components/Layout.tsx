import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Header } from './Header';

const navLinks = [
  { to: '/home', label: '首页' },
  { to: '/projects', label: '项目' },
  { to: '/about', label: '关于' },
];

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      {/* Header */}
      <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed left-0 top-18 bottom-0 w-[240px] bg-[#0a0e1a]/95 backdrop-blur-md shadow-[4px_0_30px_rgba(168,85,247,0.15)] border-r border-purple-500/20 z-30 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="py-6">
          <ul className="space-y-2 px-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={handleNavClick}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(link.to)
                      ? 'text-cyan-300 bg-purple-500/10 border-l-2 border-cyan-400'
                      : 'text-gray-400 hover:text-purple-300 hover:bg-purple-500/5'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`pt-24 min-h-screen transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-[240px]' : ''}`}>
        <div className="p-6 md:p-10">{children}</div>
      </main>
    </div>
  );
}
