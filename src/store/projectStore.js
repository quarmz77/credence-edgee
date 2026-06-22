import { create } from 'zustand'
import { MOCK_PROJECTS, MOCK_MY_PROJECTS } from '@/utils/constants'

export const useProjectStore = create((set) => ({
  projects:   MOCK_PROJECTS,
  myProjects: MOCK_MY_PROJECTS,
  loading: false,
  filter: 'All',
  setFilter:     (filter)    => set({ filter }),
  setProjects:   (projects)  => set({ projects }),
  setMyProjects: (mp)        => set({ myProjects: mp }),
  addMyProject:  (project)   => set((s) => ({ myProjects: [...s.myProjects, project] })),
  setLoading:    (loading)   => set({ loading }),
}))
