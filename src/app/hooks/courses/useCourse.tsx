import { courseApi } from '@/app/services/courses/courses'
import { CourseData } from '@/types'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useCourseLeaningBySlug = (
    slug: string,
    options?: Omit<UseQueryOptions<CourseData>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<CourseData>({
        ...options,
        queryKey: ['course', slug],
        enabled: !!slug,
        queryFn: () => courseApi.detailCourseLeaning(slug)
    })
}
