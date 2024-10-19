import { toast } from 'sonner'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

import {
    ICourses,
    ICreateCourseData,
    ILessonDetail,
    ILessonDocData,
    ILessonVideoData,
    IModule,
    IModuleData,
    IModules,
    IOverviewCourse,
    IOverviewCourseData,
    ITargetCourse
} from '@/types/instructor'
import { instructorApi } from '@/app/services/instructors'

// Mutation
export const useCreateCourse = () => {
    return useMutation({
        mutationFn: (data: ICreateCourseData) => instructorApi.createCourse(data)
    })
}

export const useSubmitCourse = () => {
    return useMutation({
        mutationFn: async (courseID: string) => {
            return instructorApi.submitCourse(courseID)
        },
        onSuccess() {
            toast.success('Bạn đã gửi thông tin khoá học đi thành công!')
        }
    })
}

export const useTargetCourse = () => {
    const queryClient = useQueryClient()
    return useMutation<ITargetCourse, Error, [string, ITargetCourse]>({
        mutationFn: async ([courseId, courseData]) => {
            return instructorApi.targetCourse(courseId, courseData)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['targetCourse'] })
            toast.success('Cập nhật thông tin khoá học thành công thành công!')
        }
    })
}

export const useOverviewCourse = () => {
    const queryClient = useQueryClient()
    return useMutation<IOverviewCourseData, Error, [string, IOverviewCourseData]>({
        mutationFn: async ([courseId, courseData]) => {
            return instructorApi.courseOverview(courseId, courseData)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['overviewCourse'] })
            toast.success('Cập nhật thông tin khoá học thành công!')
        }
    })
}

export const useCreateModule = () => {
    const queryClient = useQueryClient()

    return useMutation<IModule, Error, [string, IModuleData]>({
        mutationFn: async ([courseId, courseData]) => {
            return instructorApi.createModule(courseId, courseData)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['modules'] })
        }
    })
}

export const useDeleteModule = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (moduleId: string) => {
            return instructorApi.deleteModule(moduleId)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['modules'] })
        }
    })
}

export const useUpdateModule = () => {
    const queryClient = useQueryClient()

    return useMutation<IModule, Error, [string, IModuleData]>({
        mutationFn: async ([moduleId, moduleData]) => {
            return instructorApi.updateModule(moduleId, moduleData)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['modules'] })
        }
    })
}

export const useCreateLessonDoc = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, ILessonDocData]>({
        mutationFn: async ([lessonId, lessonData]) => {
            return instructorApi.createLessonDoc(lessonId, lessonData)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['modules'] })
        }
    })
}

export const useUpdateLessonDoc = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, ILessonDocData]>({
        mutationFn: async ([lessonId, lessonData]) => {
            return instructorApi.updateLessonDoc(lessonId, lessonData)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['modules'] })
        }
    })
}

export const useDeleteLessonDoc = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (lessonId: number) => {
            return instructorApi.deleteLessonDoc(lessonId)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['modules'] })
        }
    })
}

export const useUpdateLessonVideo = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, ILessonVideoData]>({
        mutationFn: async ([lessonId, lessonData]) => {
            return instructorApi.updateLessonVideo(lessonId, lessonData)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['module'] })
        }
    })
}

export const useDeleteLessonVideo = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (lessonId: number) => {
            return instructorApi.deleteLessonDoc(lessonId)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['modules'] })
        }
    })
}

// Queries
export const useCreateLessonVideo = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, ILessonVideoData]>({
        mutationFn: async ([lessonId, lessonData]) => {
            return instructorApi.createLessonVideo(lessonId, lessonData)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['modules'] })
        }
    })
}

export const useGetCourses = (options?: Omit<UseQueryOptions<ICourses>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ['instructorCourse'],
        queryFn: instructorApi.getCourses
    })
}

export const useGetTargetCourse = (
    id: string,
    options?: Omit<UseQueryOptions<ITargetCourse>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        queryKey: ['targetCourse', id],
        queryFn: () => instructorApi.getTargetCourse(id)
    })
}

export const useGetOverviewCourse = (
    id: string,
    options?: Omit<UseQueryOptions<IOverviewCourse>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        queryKey: ['overviewCourse', id],
        queryFn: () => instructorApi.getOverviewCourse(id)
    })
}

export const useGetModule = (id: string, options?: Omit<UseQueryOptions<IModules>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ['modules', id],
        queryFn: () => instructorApi.getModule(id)
    })
}

export const useGetLessonDetail = (
    id: number,
    options?: Omit<UseQueryOptions<ILessonDetail>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        queryKey: ['lesson', id],
        queryFn: () => instructorApi.getLessonDetail(id)
    })
}
