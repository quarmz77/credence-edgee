
import { useEffect, useState } from 'react';
import ProjectCardSkeleton from './ProjectCardSkeleton';
import ProjectCard from './ProjectCard';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchProjects() {
      setIsLoading(true);
      try {
        const res = await api.get('/projects');
        if (!cancelled) setProjects(res.data);
      } catch (err) {
        if (!cancelled) setError('Could not load projects.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    fetchProjects();
    return () => { cancelled = true; };
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) return <ErrorState message={error} />;
  if (projects.length === 0) return <EmptyState />;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
    </div>
  );
}