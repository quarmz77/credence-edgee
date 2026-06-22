import { create } from 'zustand'
import { MOCK_COURSES } from '@/utils/constants'

export const useCourseStore = create((set) => ({
  courses: MOCK_COURSES,
  myCourses: [
    { ...MOCK_COURSES[0], progress: 75,  status: 'In Progress' },
    { ...MOCK_COURSES[1], progress: 30,  status: 'In Progress' },
    { ...MOCK_COURSES[2], progress: 100, status: 'Completed'   },
  ],
  loading: false,
  updateProgress: (courseId, progress) =>
    set((s) => ({
      myCourses: s.myCourses.map((c) =>
        c.id === courseId
          ? { ...c, progress, status: progress === 100 ? 'Completed' : 'In Progress' }
          : c
      ),
    })),
}))
