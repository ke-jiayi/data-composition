import { Link } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'About Me' },
  { to: '/projects', label: 'Projects' },
  { to: '/powerbi', label: 'Power BI' },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] bg-[#171717] flex flex-col z-40">
      {/* Profile Section */}
      <div className="p-8 flex flex-col items-center border-b border-[#262626]">
        {/* Avatar Placeholder */}
        <div className="w-24 h-24 rounded-full bg-[#262626] flex items-center justify-center mb-4">
          <span className="text-3xl text-[#a3a3a3]">👤</span>
        </div>
        <h1 className="text-xl font-semibold text-[#fafafa]">Data Portfolio</h1>
        <p className="text-sm text-[#a3a3a3] mt-1">Data Analyst</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="block px-8 py-3 text-[#a3a3a3] hover:text-[#fafafa] hover:bg-[#262626] transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* GitHub Link */}
      <div className="p-6 border-t border-[#262626]">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-[#a3a3a3] hover:text-[#fafafa] transition-colors duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm">GitHub</span>
        </a>
      </div>
    </aside>
  );
}
