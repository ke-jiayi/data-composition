interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
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
