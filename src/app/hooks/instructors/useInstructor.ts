import { toast } from 'sonner'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

import {
    ICreateCourseData,
    ILessonDocData,
    ILessonVideoData,
    IModule,
    IModuleData,
    IModules,
    IOverviewCourseData,
    ITargetCourse
} from '@/types/instructor'
import { instructorApi } from '@/app/services/instructors'

export const useCreateCourse = () => {
    return useMutation({
        mutationFn: (data: ICreateCourseData) => instructorApi.createCourse(data)
    })
}

export const useTargetCourse = () => {
    return useMutation<ITargetCourse, Error, [string, ITargetCourse]>({
        mutationFn: async ([courseId, courseData]) => {
            return instructorApi.targetCourse(courseId, courseData)
        },
        onSuccess() {
            toast.success('Cập nhật thông tin khoá học thành công thành công!')
        }
    })
}

export const useOverviewCourse = () => {
    return useMutation<IOverviewCourseData, Error, [string, IOverviewCourseData]>({
        mutationFn: async ([courseId, courseData]) => {
            return instructorApi.courseOverview(courseId, courseData)
        },
        onSuccess() {
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

export const useGetModule = (id: string, options?: Omit<UseQueryOptions<IModules>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ['modules', id],
        queryFn: () => instructorApi.getModule(id)
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

export const useUpdateLessonDoc = () => {}

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
