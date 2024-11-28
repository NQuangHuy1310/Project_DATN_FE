import { IBuyData } from '@/types'
import { IComment, ICreateComment } from '@/types/common'
import { courseApi } from '@/app/services/courses/courses'
import {
    CourseData,
    IAllCourse,
    ICourse,
    ICourseCategory,
    ICourseDetail,
    ICourseWishList,
    IQuizDetail
} from '@/types/course/course'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

export const useGetAllCourses = (
    search: string,
    category: string,
    level: string,
    arrange: string,
    page: number,
    perPage?: number,
    options?: Omit<UseQueryOptions<IAllCourse>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<IAllCourse>({
        ...options,
        queryKey: ['course-leaning', search, category, level, arrange, page, perPage],
        queryFn: () => courseApi.allCourses(search, category, level, arrange, page, perPage)
    })
}

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

export const useCourseToday = (options?: Omit<UseQueryOptions<ICourse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ICourse[]>({
        ...options,
        queryKey: ['course-today'],
        queryFn: () => courseApi.todayCourse()
    })
}

export const useCourseRelated = (slug: string, options?: Omit<UseQueryOptions<ICourse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ICourse[]>({
        ...options,
        queryKey: ['course-related', slug],
        queryFn: () => courseApi.relatedCourse(slug)
    })
}

export const useCourseFree = (options?: Omit<UseQueryOptions<ICourse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ICourse[]>({
        ...options,
        queryKey: ['course-free'],
        queryFn: courseApi.courseFree
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

export const useRegisterCourse = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, number, IBuyData]>({
        mutationFn: async ([userId, courseId, data]) => {
            return courseApi.registerCourse(userId, courseId, data)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['register-course'] }),
                queryClient.invalidateQueries({ queryKey: ['wishlist-course'] })
            ])
        }
    })
}

export const useGetWishList = (
    search?: string,
    category?: string,
    level?: string,
    arrange?: string,
    page?: number,
    perPage?: number,
    options?: Omit<UseQueryOptions<ICourseWishList>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        queryKey: ['wishlist-course', search, category, level, arrange, page, perPage],
        queryFn: () => courseApi.getWishList(search, category, level, arrange, page, perPage)
    })
}

export const useAddWishList = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (courseId: number) => {
            return courseApi.addWishList(courseId)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['course-detail'] }),
                queryClient.refetchQueries({ queryKey: ['wishlist-course'] }),
                queryClient.invalidateQueries({ queryKey: ['check-wishlist-course'] })
            ])
        }
    })
}

export const useUnWishList = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (courseId: number) => {
            return courseApi.unWishList(courseId)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['course-detail'] }),
                queryClient.refetchQueries({ queryKey: ['wishlist-course'] }),
                queryClient.invalidateQueries({ queryKey: ['check-wishlist-course'] })
            ])
        }
    })
}
