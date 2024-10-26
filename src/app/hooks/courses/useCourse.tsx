import { courseApi } from '@/app/services/courses/courses'
import { CourseData, ICourse, ICourseCategory, ICourseDetail, IQuizDetail } from '@/types/course/course'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useCourseLeaningBySlug = (
    slug: string,
    options?: Omit<UseQueryOptions<CourseData>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<CourseData>({
        ...options,
        queryKey: ['course-leaning', slug],
        enabled: !!slug,
        queryFn: () => courseApi.detailCourseLeaning(slug)
    })
}

export const useCourseDetailBySlug = (
    slug: string,
    options?: Omit<UseQueryOptions<ICourseDetail[]>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ICourseDetail[]>({
        ...options,
        queryKey: ['course-detail', slug],
        enabled: !!slug,
        queryFn: () => courseApi.detailCourse(slug)
    })
}

export const useCourseDetailNoLoginBySlug = (
    slug: string,
    options?: Omit<UseQueryOptions<ICourseDetail>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ICourseDetail>({
        ...options,
        queryKey: ['course-detail-no-login', slug],
        enabled: !!slug,
        queryFn: () => courseApi.detailCourseNoLogin(slug)
    })
}

export const useCourseCategoryHome = (options?: Omit<UseQueryOptions<ICourseCategory[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ICourseCategory[]>({
        ...options,
        queryKey: ['course-category-home'],
        queryFn: () => courseApi.courseCategoryHome()
    })
}

export const useCourseSaleHome = (options?: Omit<UseQueryOptions<ICourse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ICourse[]>({
        ...options,
        queryKey: ['course-sale'],
        queryFn: () => courseApi.saleCourseHome()
    })
}

export const useDetailQuizBySlug = (
    slug: string,
    options?: Omit<UseQueryOptions<IQuizDetail[]>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<any>({
        ...options,
        queryKey: ['detail-quiz', slug],
        enabled: !!slug,
        queryFn: () => courseApi.getDetailQuiz(slug)
    })
}

export const useCoursePopulate = (options?: Omit<UseQueryOptions<ICourse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ICourse[]>({
        ...options,
        queryKey: ['course-sale'],
        queryFn: () => courseApi.populateCourse()
    })
}
