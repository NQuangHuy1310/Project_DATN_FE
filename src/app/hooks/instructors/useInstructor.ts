import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { toast } from 'sonner'

import { instructorApi } from '@/app/services/instructors'
import {
    IChangeLessonTypeData,
    ICodingContentData,
    ICourseApproved,
    ICourses,
    ICourseStatusData,
    ICreateCourseData,
    IImportQuestionData,
    ILesson,
    ILessonCodingData,
    ILessonDocData,
    ILessonQuiz,
    ILessonQuizData,
    ILessonVideoData,
    IManageMenuCourse,
    IModule,
    IModuleData,
    IModules,
    IOverviewCourse,
    IOverviewCourseData,
    IPlasesData,
    IQuestionData,
    IQuiz,
    IRatingReplyData,
    IRoadmap,
    IRoadmapData,
    ITargetCourse,
    IUpdatePositionLessonData,
    IUpdatePositionModuleData,
    RatingsCourse,
    RevenueData,
    StudentsCourse
} from '@/types/instructor'
import { HistoryBuyCourse } from '@/types'

// Mutation
export const useCreateCourse = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: ICreateCourseData) => instructorApi.createCourse(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['instructorCourse'] })
        }
    })
}

export const useSubmitCourse = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [string, ICourseStatusData]>({
        mutationFn: async ([courseId, courseStatus]) => {
            return instructorApi.submitCourse(courseId, courseStatus)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['mange-menu'] })
            await queryClient.invalidateQueries({ queryKey: ['instructorCourse'] })
            toast.success('Yêu cầu của bạn đã được gửi đi thành công!')
        }
    })
}
export const useGetManageMenu = (
    courseId: string,
    options?: Omit<UseQueryOptions<IManageMenuCourse>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        queryKey: ['mange-menu', { courseId }],
        queryFn: () => instructorApi.mangeMenu(courseId)
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

export const useDeleteCourse = () => {
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
            await queryClient.invalidateQueries({ queryKey: ['mange-menu'] })
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
            await queryClient.invalidateQueries({ queryKey: ['mange-menu'] })
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
            await queryClient.invalidateQueries({ queryKey: ['mange-menu'] })
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
            await queryClient.invalidateQueries({ queryKey: ['mange-menu'] })
            toast.success('Xoá chương học thành công!')
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
            await queryClient.invalidateQueries({ queryKey: ['mange-menu'] })
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
            toast.success('Cập nhật bài học thành công!')
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
            await queryClient.invalidateQueries({ queryKey: ['mange-menu'] })
            toast.success('Xoá bài học thành công!')
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
            await queryClient.invalidateQueries({ queryKey: ['mange-menu'] })
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
            toast.success('Cập nhật bài học thành công!')
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
            await queryClient.invalidateQueries({ queryKey: ['mange-menu'] })
            toast.success('Xoá bài học thành công!')
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
            await queryClient.invalidateQueries({ queryKey: ['mange-menu'] })
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
            toast.success('Cập nhật bài học thành công!')
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
            await queryClient.invalidateQueries({ queryKey: ['quiz'] })
            await queryClient.invalidateQueries({ queryKey: ['mange-menu'] })
            toast.success('Xoá bài tập thành công!')
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

export const useImportQuestions = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, IImportQuestionData]>({
        mutationFn: async ([quizId, questionsData]) => {
            return instructorApi.importQuestions(quizId, questionsData)
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
            toast.success('Xoá câu hỏi thành công!')
        }
    })
}

export const useCreateLessonCoding = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, ILessonCodingData]>({
        mutationFn: async ([moduleId, lessonData]) => {
            return instructorApi.createLessonCoding(moduleId, lessonData)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['modules'] })
        }
    })
}

export const useUpdateLessonCoding = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, ILessonCodingData]>({
        mutationFn: async ([moduleId, lessonData]) => {
            return instructorApi.updateLessonCoding(moduleId, lessonData)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['modules'] })
            await queryClient.invalidateQueries({ queryKey: ['lesson'] })
            toast.success('Cập nhật bài học thành công!')
        }
    })
}

export const useDeleteLessonCoding = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (lessonId: number) => {
            return instructorApi.deleteLessonCoding(lessonId)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['modules'] })
            await queryClient.invalidateQueries({ queryKey: ['mange-menu'] })
            toast.success('Xoá bài học thành công!')
        }
    })
}

export const useUpdateCodingContent = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, ICodingContentData]>({
        mutationFn: async ([lessonId, lessonData]) => {
            return instructorApi.updateCodingContent(lessonId, lessonData)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['modules'] })
            await queryClient.invalidateQueries({ queryKey: ['lesson'] })
            toast.success('Thêm nội dung bài tập thành công!')
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
            toast.success('Bạn đã thay đổi vị trí bài học thành công!')
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
            toast.success('Bạn đã thay đổi vị trí chương học thành công!')
        }
    })
}

export const useChangeLessonType = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, IChangeLessonTypeData]>({
        mutationFn: async ([lessonId, lessonData]) => {
            return instructorApi.changeLessonType(lessonId, lessonData)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['modules'] })
            await queryClient.invalidateQueries({ queryKey: ['lesson'] })
            toast.success('Bạn đã thay đổi loại bài học thành công!.')
        }
    })
}

export const useRatingReply = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, IRatingReplyData]>({
        mutationFn: async ([commentID, replyData]) => {
            return instructorApi.ratingReply(commentID, replyData)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['instructorGetRatings'] })
        }
    })
}

export const useCreateRoadmap = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, IRoadmapData>({
        mutationFn: async (roadmapData) => {
            return instructorApi.createRoadmap(roadmapData)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['roadmap'] })
        }
    })
}

export const useUpdateRoadmap = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, IRoadmapData]>({
        mutationFn: async ([roadmapID, roadmapData]) => {
            return instructorApi.updateRoadMap(roadmapID, roadmapData)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['roadmap'] })
            toast.success('Cập nhật lộ trình thành công!')
        }
    })
}

export const useDeleteRoadmap = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (roadmapID: number) => {
            return instructorApi.deleteRoadMap(roadmapID)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['roadmap'] })
            toast.success('Xoá lộ trình thành công!')
        }
    })
}

export const useCreatePhase = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, IPlasesData>({
        mutationFn: async (roadmapData) => {
            return instructorApi.createPhase(roadmapData)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['roadmap'] })
            await queryClient.invalidateQueries({ queryKey: ['detailRoadmap'] })
        }
    })
}

export const useUpdatePhase = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, IPlasesData]>({
        mutationFn: async ([phaseID, roadmapData]) => {
            return instructorApi.updatePhase(phaseID, roadmapData)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['detailRoadmap'] })
            toast.success('Cập nhật giai đoạn thành công!')
        }
    })
}

export const useDeletePhase = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (phaseID: number) => {
            return instructorApi.deletePhase(phaseID)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['detailRoadmap'] })
            toast.success('Xoá giai đoạn thành công!')
        }
    })
}

// Queries
export const useGetCourses = (
    limit: number = 4,
    page: number = 1,
    perPage: number = 4,
    search: string = '',
    sort: string = '',
    options?: Omit<UseQueryOptions<ICourses>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        queryKey: ['instructorCourse', page, search, sort],
        queryFn: () => instructorApi.getCourses(limit, search, sort, page, perPage)
    })
}

export const useGetCoursesApproved = (options?: Omit<UseQueryOptions<ICourseApproved[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ['instructorCourseApproved'],
        queryFn: instructorApi.getCoursesApproved
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

export const useGetLessonDetail = (id: number, options?: Omit<UseQueryOptions<ILesson>, 'queryKey' | 'queryFn'>) => {
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
        enabled: !!id,
        queryKey: ['quiz', id],
        queryFn: () => instructorApi.getLessonQuiz(id)
    })
}

export const useStatistic = (options?: Omit<UseQueryOptions<RevenueData>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ['instructorStatistic'],
        queryFn: instructorApi.instructorStatistic
    })
}

export const useGetStudentsCourse = (
    courseID?: number,
    limit?: number,
    page?: number,
    perPage?: number,
    options?: Omit<UseQueryOptions<StudentsCourse>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        queryKey: ['instructorGetStudents', courseID, limit, page, perPage],
        queryFn: () => instructorApi.getStudentsCourse(courseID, limit, page, perPage)
    })
}

export const useGetRatingsCourse = (
    courseID?: number,
    limit?: number,
    page?: number,
    perPage?: number,
    options?: Omit<UseQueryOptions<RatingsCourse>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        queryKey: ['instructorGetRatings', courseID, limit, page, perPage],
        queryFn: () => instructorApi.getRatingsCourse(courseID, limit, page, perPage)
    })
}

export const useHistoryBuyCourse = (
    teacherId: number,
    courseID?: number,
    limit?: number,
    page?: number,
    perPage?: number,
    start_date?: string,
    end_date?: string,
    options?: Omit<UseQueryOptions<HistoryBuyCourse>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<HistoryBuyCourse>({
        ...options,
        queryKey: ['historyBuyCourse', teacherId, courseID, limit, page, perPage, start_date, end_date],
        queryFn: () => instructorApi.historyBuyCourse(teacherId, courseID, limit, page, perPage, start_date, end_date)
    })
}

export const useGetRoadmap = (options?: Omit<UseQueryOptions<IRoadmap[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ['roadmap'],
        queryFn: instructorApi.getRoadmap
    })
}

export const useGetDetailRoadmap = (
    roadmapID: number,
    options?: Omit<UseQueryOptions<IRoadmap>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        enabled: !!roadmapID,
        queryKey: ['detailRoadmap', roadmapID],
        queryFn: () => instructorApi.getDetailRoadmap(roadmapID)
    })
}
