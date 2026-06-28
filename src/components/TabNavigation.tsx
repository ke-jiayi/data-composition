import { useSearchParams } from 'react-router-dom';
import type { ReactNode } from 'react';

export type TabType = 'table' | 'clean';

interface TabItem {
  key: TabType;
  label: string;
  icon: ReactNode;
}

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: TabItem[] = [
  {
    key: 'table',
    label: '数据表格',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    key: 'clean',
    label: '数据清洗',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    ),
  },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const [, setSearchParams] = useSearchParams();

  const handleTabClick = (tab: TabType) => {
    onTabChange(tab);
    // 同步到 URL 参数
    setSearchParams({ tab });
  };

  return (
    <div className="border-b border-gray-200 bg-white">
      <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabClick(tab.key)}
            className={`
              flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
              ${
                activeTab === tab.key
                  ? 'border-[#1e3a5f] text-[#1e3a5f]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
            aria-current={activeTab === tab.key ? 'page' : undefined}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

// Hook for managing tab state with URL sync
export function useTabState(defaultTab: TabType = 'table'): [TabType, (tab: TabType) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabFromUrl = searchParams.get('tab') as TabType | null;
  const activeTab: TabType =
    tabFromUrl && ['table', 'clean'].includes(tabFromUrl)
      ? tabFromUrl
      : defaultTab;

  const setActiveTab = (tab: TabType) => {
    setSearchParams({ tab });
  };

  return [activeTab, setActiveTab];
}