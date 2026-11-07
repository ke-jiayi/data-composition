import { useSearchParams } from 'react-router-dom';
import type { ReactNode } from 'react';

export type TabType = 'table' | 'clean' | 'conclusion' | 'chart' | 'smart';

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
  {
    key: 'chart',
    label: '可视化分析',
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
  {
    key: 'conclusion',
    label: '分析结论',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    key: 'smart' as TabType,
    label: 'WorkBuddy 分析',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0 inline-block mr-1">
        <path d="M13 2V4H15C15.5523 4 16 4.44772 16 5V6.5H17.5C19.433 6.5 21 8.067 21 10V11H22V14H21V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V14H2V11H3V10C3 8.067 4.567 6.5 6.5 6.5H8V5C8 4.44772 8.44772 4 9 4H11V2H13ZM16 11H8V15H16V11ZM7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18H11C11.5523 18 12 17.5523 12 17C12 16.4477 11.5523 16 11 16H7ZM13 16C12.4477 16 12 16.4477 12 17C12 17.5523 12.4477 18 13 18H17C17.5523 18 18 17.5523 18 17C18 16.4477 17.5523 16 17 16H13Z"></path>
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
    <div className="border-b border-[#3A3A44] bg-[#1E1E24]">
      <nav className="-mb-px flex space-x-8 px-4 md:px-6 overflow-x-auto scrollbar-hide" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabClick(tab.key)}
            className={`
              flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-base whitespace-nowrap shrink-0 transition-colors
              ${
                activeTab === tab.key
                  ? 'border-[#6BC5E8] text-[#6BC5E8]'
                  : 'border-transparent text-[#9CA3AF] hover:text-[#D1D5DB] hover:border-[#3A3A44]'
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
    tabFromUrl && ['table', 'clean', 'conclusion', 'chart', 'smart'].includes(tabFromUrl)
      ? tabFromUrl
      : defaultTab;

  const setActiveTab = (tab: TabType) => {
    setSearchParams({ tab });
  };

  return [activeTab, setActiveTab];
}