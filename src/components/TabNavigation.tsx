import { useSearchParams } from 'react-router-dom';
import type { ReactNode } from 'react';

export type TabType = 'raw' | 'cleaned' | 'charts';

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
    key: 'raw',
    label: '原始数据',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
        />
      </svg>
    ),
  },
  {
    key: 'cleaned',
    label: '清洗后数据',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    key: 'charts',
    label: '可视化看板',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
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
    <div className="border-b border-[#303030] bg-[#171717]">
      <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabClick(tab.key)}
            className={`
              flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
              ${
                activeTab === tab.key
                  ? 'border-[#3b82f6] text-[#3b82f6]'
                  : 'border-transparent text-[#a3a3a3] hover:text-[#fafafa] hover:border-[#303030]'
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
export function useTabState(defaultTab: TabType = 'raw'): [TabType, (tab: TabType) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabFromUrl = searchParams.get('tab') as TabType | null;
  const activeTab: TabType =
    tabFromUrl && ['raw', 'cleaned', 'dashboard'].includes(tabFromUrl)
      ? tabFromUrl
      : defaultTab;

  const setActiveTab = (tab: TabType) => {
    setSearchParams({ tab });
  };

  return [activeTab, setActiveTab];
}