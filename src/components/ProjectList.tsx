import type { Project } from '../types';
import { ProjectCard } from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const sortedProjects = [...projects].sort((a, b) => b.createdAt - a.createdAt);

  if (sortedProjects.length === 0) {
    return (
      <div
        className="text-center py-16"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <svg
          className="mx-auto h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ color: 'var(--text-secondary)' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3
          className="mt-4 text-lg font-medium"
          style={{ color: 'var(--text-primary)' }}
        >
          暂无项目
        </h3>
        <p
          className="mt-2 text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          点击上方「导入数据」按钮开始创建您的第一个数据作品集
        </p>
      </div>
    );
  }

  return (
    <section id="projects" className="py-16" style={{ borderTop: '1px solid var(--border)' }}>
      <h2
        className="text-2xl font-bold mb-8"
        style={{ color: 'var(--text-primary)' }}
      >
        项目作品
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
