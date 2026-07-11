import { useEffect, useMemo } from "react";
import { getProjects } from "@/services/projectService";
import { useProjectStore } from "@/store/projectStore";

const normalizeProject = (project) => {
  const techStack = Array.isArray(project.techStack) ? project.techStack : [];
  const tags = Array.isArray(project.tags) ? project.tags : [];
  // Use the dedicated skill field first, then fall back to techStack/tags
  const skill = project.skill || techStack[0] || tags[0] || "General";

  return {
    id: project.id || project._id,
    ownerId: project.ownerId,
    title: project.title || "",
    description: project.description || "",
    skill,
    instructions: project.instructions || "",
    duration: project.duration || "Flexible",
    type: project.type || "Remote",
    status: project.status || "draft",
    approvalStatus: project.approvalStatus || "approved",
    techStack,
    tags,
    repositoryUrl: project.repositoryUrl || "",
    liveUrl: project.liveUrl || "",
    company: project.company || "Credify",
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
};

const useProjects = () => {
  const {
    projects,
    myProjects,
    loading,
    filter,
    setFilter,
    addMyProject,
    setProjects,
    setMyProjects,
    setLoading,
  } = useProjectStore();

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      setLoading(true);

      try {
        // Only load admin-approved projects for public browsing
        const response = await getProjects({ approvalStatus: "approved" });
        const items = response?.data?.data?.items ?? [];
        const mappedProjects = items.map(normalizeProject);

        if (!isMounted) return;

        setProjects(mappedProjects);
      } catch (error) {
        console.error("Failed to load projects", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, [setLoading, setMyProjects, setProjects]);

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((project) => {
      const values = [
        project.skill,
        ...(project.techStack || []),
        ...(project.tags || []),
      ];
      return values.includes(filter);
    });
  }, [filter, projects]);

  const startProject = (project) => {
    const already = myProjects.find((entry) => entry.id === project.id);
    if (already) return { already: true };
    addMyProject({
      ...project,
      status: "In Progress",
      rating: null,
      feedback: null,
      submittedAt: null,
    });
    return { success: true };
  };

  return {
    projects,
    filtered,
    myProjects,
    loading,
    filter,
    setFilter,
    startProject,
  };
};

export default useProjects;
