import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { toast } from 'sonner'

import { instructorApi } from '@/app/services/instructors'
import {
    IChangeLessonType,
    ICourses,
    ICreateCourseData,
    ILessonDetail,
    ILessonDocData,
    ILessonQuiz,
    ILessonQuizData,
    ILessonVideoData,
    IModule,
    IModuleData,
    IModules,
    IOverviewCourse,
    IOverviewCourseData,
    IQuestionData,
    IQuiz,
    ITargetCourse,
    IUpdatePositionLessonData,
    IUpdatePositionModuleData
} from '@/types/instructor'

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

export const useDisableCourse = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (courseID: string) => {
            return instructorApi.disableCourse(courseID)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['instructorCourse'] })
            toast.success('Khóa học đã được ẩn thành công! Bạn có thể khôi phục lại bất cứ lúc nào.')
        }
    })
}

export const useEnableCourse = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (courseID: string) => {
            return instructorApi.enableCourse(courseID)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['instructorCourse'] })
            toast.success('Khóa học đã được kích hoạt hiển thị thành công! Học viên giờ có thể truy cập.')
        }
    })
}

export const usedeleteCourse = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (courseID: string) => {
            return instructorApi.deleteCourse(courseID)
        },
        onSuccess: async () => {
            toast.success('Khóa học đã xóa thành công! Hãy chắc chắn rằng bạn không cần nó nữa.')
            await queryClient.invalidateQueries({ queryKey: ['instructorCourse'] })
        }
    })
}

export const useTargetCourse = () => {
    const queryClient = useQueryClient()

    return useMutation<ITargetCourse, Error, [string, ITargetCourse]>({
        mutationFn: async ([courseId, courseData]) => {
            return instructorApi.targetCourse(courseId, courseData)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['targetCourse'] })
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
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['overviewCourse'] })
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
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['modules'] })
        }
    })
}

export const useDeleteModule = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (moduleId: string) => {
            return instructorApi.deleteModule(moduleId)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['modules'] })
        }
    })
}

export const useUpdateModule = () => {
    const queryClient = useQueryClient()

    return useMutation<IModule, Error, [string, IModuleData]>({
        mutationFn: async ([moduleId, moduleData]) => {
            return instructorApi.updateModule(moduleId, moduleData)
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ['modules'] })
            toast.success('Cập nhật thông tin chương học thành công!')
        }
    })
}

export const useCreateLessonDoc = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, ILessonDocData]>({
        mutationFn: async ([lessonId, lessonData]) => {
            return instructorApi.createLessonDoc(lessonId, lessonData)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['modules'] })
        }
    })
}

export const useUpdateLessonDoc = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, ILessonDocData]>({
        mutationFn: async ([lessonId, lessonData]) => {
            return instructorApi.updateLessonDoc(lessonId, lessonData)
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ['modules'] })
            await queryClient.invalidateQueries({ queryKey: ['lesson'] })
        }
    })
}

export const useDeleteLessonDoc = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (lessonId: number) => {
            return instructorApi.deleteLessonDoc(lessonId)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['modules'] })
        }
    })
}

export const useCreateLessonVideo = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, ILessonVideoData]>({
        mutationFn: async ([lessonId, lessonData]) => {
            return instructorApi.createLessonVideo(lessonId, lessonData)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['modules'] })
        }
    })
}

export const useUpdateLessonVideo = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, ILessonVideoData]>({
        mutationFn: async ([lessonId, lessonData]) => {
            return instructorApi.updateLessonVideo(lessonId, lessonData)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['modules'] })
            await queryClient.invalidateQueries({ queryKey: ['lesson'] })
        }
    })
}

export const useDeleteLessonVideo = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (lessonId: number) => {
            return instructorApi.deleteLessonVideo(lessonId)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['modules'] })
        }
    })
}

export const useCreateLessonQuiz = () => {
    const queryClient = useQueryClient()

    return useMutation<ILessonQuiz, Error, [number, ILessonQuizData]>({
        mutationFn: async ([moduleId, lessonData]) => {
            return instructorApi.createLessonQuiz(moduleId, lessonData)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['modules'] })
        }
    })
}

export const useUpdateLessonQuiz = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, ILessonQuizData]>({
        mutationFn: async ([lessonId, lessonData]) => {
            return instructorApi.updateLessonQuiz(lessonId, lessonData)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['modules'] })
            await queryClient.invalidateQueries({ queryKey: ['quiz'] })
        }
    })
}

export const useDeleteLessonQuiz = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (lessonId: number) => {
            return instructorApi.deleteLessonQuiz(lessonId)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['modules'] })
        }
    })
}

export const useCreateQuestion = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, IQuestionData]>({
        mutationFn: async ([quizId, lessonData]) => {
            return instructorApi.createQuestion(quizId, lessonData)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['quiz'] })
        }
    })
}

export const useUpdateQuestion = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, IQuestionData]>({
        mutationFn: async ([questionID, lessonData]) => {
            return instructorApi.updateQuestion(questionID, lessonData)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['quiz'] })
            toast.success('Cập nhật câu hỏi thành công!')
        }
    })
}

export const useDeleteQuestion = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (questionID: number) => {
            return instructorApi.deleteQuestion(questionID)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['quiz'] })
        }
    })
}

export const useUpdatePositionLesson = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, IUpdatePositionLessonData]>({
        mutationFn: async ([moduleId, lessonData]) => {
            return instructorApi.updatePositionLesson(moduleId, lessonData)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['modules'] })
        }
    })
}

export const useChangeLessonType = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, IChangeLessonType]>({
        mutationFn: async ([lessonId, lessonData]) => {
            return instructorApi.changeLessonType(lessonId, lessonData)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['modules'] })
        }
    })
}

export const useUpdatePositionModule = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [string, IUpdatePositionModuleData]>({
        mutationFn: async ([courseId, lessonData]) => {
            return instructorApi.updatePositionModule(courseId, lessonData)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['modules'] })
        }
    })
}

// Queries
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
        enabled: !!id,
        queryKey: ['lesson', id],
        queryFn: () => instructorApi.getLessonDetail(id)
    })
}

export const useGetLessonQuiz = (id: number, options?: Omit<UseQueryOptions<IQuiz>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ['quiz', id],
        queryFn: () => instructorApi.getLessonQuiz(id)
    })
}
