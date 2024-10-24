import { courseApi } from '@/app/services/courses/courses'
import { CourseData, ICourseSale } from '@/types/course/course'
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

export const useCourseSaleHome = (options?: Omit<UseQueryOptions<ICourseSale[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ICourseSale[]>({
        ...options,
        queryKey: ['course-sale'],
        queryFn: () => courseApi.saleCourseHome()
    })
}
