import { useCourseStore } from '@/store/courseStore'

const useCourses = () => {
  const { courses, myCourses, loading, updateProgress } = useCourseStore()
  return { courses, myCourses, loading, updateProgress }
}

export default useCourses
