import { Layout } from '../components/Layout';
import { HeroSection } from '../components/HeroSection';
import { AboutMe } from '../components/AboutMe';
import { ProjectList } from '../components/ProjectList';
import type { Project } from '../types';

interface HomePageProps {
  projects?: Project[];
  onImportClick?: () => void;
}

export function HomePage({ projects = [], onImportClick }: HomePageProps) {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection onImportClick={onImportClick} />
        <AboutMe />
        <ProjectList projects={projects} />
      </div>
    </Layout>
  );
}
