import { Link } from 'react-router-dom';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
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
      className="block rounded-lg p-5 transition-all duration-200"
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(0, 0, 0, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--surface)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <h3
          className="text-lg font-semibold line-clamp-1"
          style={{ color: 'var(--text-primary)' }}
        >
          {project.name}
        </h3>
        <span
          className="text-xs whitespace-nowrap ml-2"
          style={{ color: 'var(--text-secondary)' }}
        >
          {formatDate(project.createdAt)}
        </span>
      </div>

      {project.description && (
        <p
          className="text-sm line-clamp-2 mb-4"
          style={{ color: 'var(--text-secondary)' }}
        >
          {project.description}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-sm">
          <span style={{ color: 'var(--text-secondary)' }}>数据来源：</span>
          <span style={{ color: 'var(--text-primary)' }}>
            {project.dataSource || '未指定'}
          </span>
        </div>
        <div className="text-sm">
          <span style={{ color: 'var(--text-secondary)' }}>数据量：</span>
          <span
            className="font-medium"
            style={{ color: 'var(--text-primary)' }}
          >
            {formatNumber(project.rowCount)} 行
          </span>
        </div>
      </div>

      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                color: 'var(--accent)',
              }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span
              className="text-xs self-center"
              style={{ color: 'var(--text-secondary)' }}
            >
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
