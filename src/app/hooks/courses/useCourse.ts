import { courseApi } from '@/app/services/courses/courses'
import { IComment, ICreateComment } from '@/types/common'
import { CourseData, ICourse, ICourseCategory, ICourseDetail, IQuizDetail } from '@/types/course/course'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

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
    options?: Omit<UseQueryOptions<ICourseDetail>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ICourseDetail>({
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

//COMMENT
export const useGetCommentCourse = (
    id: number,
    options?: Omit<UseQueryOptions<IComment[]>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        queryKey: ['comments-course', id],
        queryFn: () => courseApi.getComment(id)
    })
}

export const useAddCommentCourse = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: ICreateComment) => {
            return courseApi.addCommentCourse(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments-course'] })
        }
    })
}
//CHECK BUY COURSE
export const useCheckBuyCourse = (
    userId: number,
    courseId: number,
    options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<any>({
        ...options,
        enabled: !!userId && !!courseId,
        queryKey: ['check-buy-course', userId, courseId],
        queryFn: () => courseApi.checkBuyCourse(userId, courseId)
    })
}
