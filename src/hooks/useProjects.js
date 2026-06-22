import { useProjectStore } from '@/store/projectStore'

const useProjects = () => {
  const { projects, myProjects, loading, filter, setFilter, addMyProject } = useProjectStore()
  const filtered = filter === 'All' ? projects : projects.filter(p => p.skill === filter)

  const startProject = (project) => {
    const already = myProjects.find(p => p.id === project.id)
    if (already) return { already: true }
    addMyProject({ ...project, status: 'In Progress', rating: null, feedback: null, submittedAt: null })
    return { success: true }
  }

  return { projects, filtered, myProjects, loading, filter, setFilter, startProject }
}

export default useProjects
