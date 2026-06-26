import { Link } from 'react-router-dom';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + '万';
    }
    return num.toLocaleString('zh-CN');
  };

  return (
    <Link
      to={`/project/${project.id}`}
      className="block bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {project.name}
          </h3>
          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
            {formatDate(project.createdAt)}
          </span>
        </div>

        {project.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {project.description}
          </p>
        )}

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="text-sm">
            <span className="text-gray-500">数据来源：</span>
            <span className="text-gray-900">{project.dataSource || '未指定'}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">数据量：</span>
            <span className="text-gray-900 font-medium">
              {formatNumber(project.rowCount)} 行
            </span>
          </div>
        </div>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="text-xs text-gray-500 self-center">
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}