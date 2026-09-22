import { create } from "zustand";

export const useProjectStore = create((set) => ({
  projects: [],
  myProjects: [],
  submissions: [],
  loading: false,
  submissionsLoading: false,
  filter: "All",
  setFilter: (filter) => set({ filter }),
  setProjects: (projects) => set({ projects }),
  setMyProjects: (mp) => set({ myProjects: mp }),
  setSubmissions: (submissions) => set({ submissions }),
  addMyProject: (project) =>
    set((s) => ({ myProjects: [...s.myProjects, project] })),
  removeMyProject: (submissionId) =>
    set((s) => ({
      myProjects: s.myProjects.filter((p) => p.id !== submissionId && p.submissionId !== submissionId),
    })),
  setLoading: (loading) => set({ loading }),
  setSubmissionsLoading: (submissionsLoading) => set({ submissionsLoading }),
}));
