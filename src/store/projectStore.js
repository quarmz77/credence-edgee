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
  setLoading: (loading) => set({ loading }),
  setSubmissionsLoading: (submissionsLoading) => set({ submissionsLoading }),
}));
