import { create } from "zustand";

export const useProjectStore = create((set) => ({
  projects: [],
  myProjects: [],
  loading: false,
  filter: "All",
  setFilter: (filter) => set({ filter }),
  setProjects: (projects) => set({ projects }),
  setMyProjects: (mp) => set({ myProjects: mp }),
  addMyProject: (project) =>
    set((s) => ({ myProjects: [...s.myProjects, project] })),
  setLoading: (loading) => set({ loading }),
}));
