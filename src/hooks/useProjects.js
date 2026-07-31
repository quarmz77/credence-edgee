import { useEffect, useMemo, useCallback } from "react";
import { getProjects } from "@/services/projectService";
import { getSubmissions, createSubmission } from "@/services/submissionService";
import { useProjectStore } from "@/store/projectStore";
import useAuth from "@/hooks/useAuth";

const normalizeProject = (project) => {
  const techStack = Array.isArray(project.techStack) ? project.techStack : [];
  const tags = Array.isArray(project.tags) ? project.tags : [];
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

// Map a submission doc (from GET /submissions populated with projectId) into myProject shape
const normalizeSubmission = (submission) => {
  const project = submission.project || {};
  return {
    id: submission.id || submission._id,
    submissionId: submission.id || submission._id,
    projectId: submission.projectId,
    title: submission.title || project.title || "",
    description: project.description || "",
    skill: project.skill || project.techStack?.[0] || "General",
    company: project.company || "Credify",
    duration: project.duration || "Flexible",
    type: project.type || "Remote",
    // Map submission statuses to display statuses
    status: mapSubmissionStatus(submission.status),
    submissionStatus: submission.status,
    rating: submission.rating || null,
    feedback: submission.feedback || submission.reviewerNotes || null,
    content: submission.content || "",
    githubRepoUrl: submission.githubRepoUrl || "",
    zipFileUrl: submission.zipFileUrl || "",
    zipFileName: submission.zipFileName || "",
    attachments: submission.attachments || [],
    submittedAt: submission.createdAt
      ? new Date(submission.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : null,
    createdAt: submission.createdAt,
    updatedAt: submission.updatedAt,
    // Certificate eligibility: approved submission with a rating
    certEligible: submission.status === "approved" && !!submission.rating,
    certPaid: false, // will be updated from certificates API
  };
};

const mapSubmissionStatus = (status) => {
  switch (status) {
    case "pending":
      return "Submitted";
    case "reviewing":
      return "In Review";
    case "approved":
      return "Reviewed";
    case "rejected":
      return "Reviewed";
    case "draft":
      return "In Progress";
    default:
      return "In Progress";
  }
};

const useProjects = () => {
  const { user, isAuthenticated } = useAuth();
  const {
    projects,
    myProjects,
    loading,
    submissionsLoading,
    filter,
    setFilter,
    addMyProject,
    setProjects,
    setMyProjects,
    setLoading,
    setSubmissionsLoading,
  } = useProjectStore();

  // Load all approved public projects
  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      setLoading(true);
      try {
        const response = await getProjects({ approvalStatus: "approved" });
        const items = response?.data?.data?.items ?? [];
        if (isMounted) setProjects(items.map(normalizeProject));
      } catch (error) {
        console.error("Failed to load projects", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProjects();
    return () => { isMounted = false; };
  }, [setLoading, setProjects]);

  // Load current user's submissions as "my projects"
  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;

    let isMounted = true;

    const loadMyProjects = async () => {
      setSubmissionsLoading(true);
      try {
        const data = await getSubmissions();
        // data = { items: [...], pagination: {...} }
        const items = data?.items ?? [];
        if (isMounted) setMyProjects(items.map(normalizeSubmission));
      } catch (error) {
        console.error("Failed to load my projects", error);
      } finally {
        if (isMounted) setSubmissionsLoading(false);
      }
    };

    loadMyProjects();
    return () => { isMounted = false; };
  }, [isAuthenticated, user?.id, setMyProjects, setSubmissionsLoading]);

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

  // Start a project: create a real submission record in the DB with empty content.
  // The student fills in their work later via the "Submit Work" modal.
  const startProject = useCallback(async (project) => {
    const already = myProjects.find(
      (entry) => entry.projectId === project.id || entry.projectId === project._id
    );
    if (already) return { already: true };

    try {
      const submission = await createSubmission({
        projectId: project.id,
        title: project.title,
        content: "",
        attachments: [],
      });

      addMyProject(normalizeSubmission(submission));
      return { success: true };
    } catch (error) {
      // 409 = already started — treat as success
      if (error?.response?.status === 409) return { already: true };
      return { error: error?.response?.data?.message || "Failed to start project." };
    }
  }, [myProjects, addMyProject]);


  return {
    projects,
    filtered,
    myProjects,
    loading,
    submissionsLoading,
    filter,
    setFilter,
    startProject,
  };
};

export default useProjects;
