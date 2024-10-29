import axiosClient from '@/configs/axiosClient'

import { instructorUri } from '@/app/services/Uri/instructors'
import {
    ICourses,
    ICreateCourse,
    ICreateCourseData,
    ILessonDetail,
    ILessonDocData,
    ILessonQuiz,
    ILessonQuizData,
    ILessonVideoData,
    IModule,
    IModuleData,
    IOverviewCourseData,
    IQuestion,
    IQuestionData,
    ITargetCourse,
    IUpdatePositionData
} from '@/types/instructor'

export const instructorApi = {
    createCourse: async (courseData: ICreateCourseData): Promise<ICreateCourse> => {
        return axiosClient.post(instructorUri.CREATE_COURSE, courseData)
    },
    getCourses: async (): Promise<ICourses> => {
        return axiosClient.get(instructorUri.GET_COURSES)
    },
    submitCourse: async (courseID: string): Promise<any> => {
        return axiosClient.post(instructorUri.SUBMIT_COURSE(courseID), {})
    },

    targetCourse: async (courseId: string, courseData: ITargetCourse): Promise<ITargetCourse> => {
        return axiosClient.post(instructorUri.TARGET_COURSE(courseId), courseData)
    },
    courseOverview: async (courseId: string, courseData: IOverviewCourseData): Promise<any> => {
        return axiosClient.post(instructorUri.OVERVIEW_COURSE(courseId), courseData)
    },

    getTargetCourse: async (courseId: string): Promise<any> => {
        return axiosClient.get(instructorUri.TARGET_COURSE(courseId))
    },
    getOverviewCourse: async (courseId: string): Promise<any> => {
        return axiosClient.get(instructorUri.OVERVIEW_COURSE(courseId))
    },

    // Api module
    createModule: async (courseId: string, moduleData: IModuleData): Promise<IModule> => {
        return axiosClient.post(instructorUri.CREATE_MODULE(courseId), moduleData)
    },
    updateModule: async (moduleId: string, moduleData: IModuleData): Promise<any> => {
        return axiosClient.post(instructorUri.UPDATE_MODULE(moduleId), moduleData)
    },
    deleteModule: async (moduleId: string): Promise<any> => {
        return axiosClient.delete(instructorUri.DELETE_MODULE(moduleId))
    },
    getModule: async (courseId: string): Promise<any> => {
        return axiosClient.get(instructorUri.GET_MODULE(courseId))
    },

    getLessonDetail: async (lessonId: number): Promise<ILessonDetail> => {
        return axiosClient.get(instructorUri.GET_LESSON_DETAIL(lessonId))
    },

    // update position lesson
    updatePositionLesson: async (moduleId: number, lessonData: IUpdatePositionData): Promise<any> => {
        return axiosClient.post(instructorUri.UPDATE_POSITION_LESSON(moduleId), lessonData)
    },

    // Api create lesson type doc
    createLessonDoc: async (moduleId: number, lessonData: ILessonDocData): Promise<any> => {
        return axiosClient.post(instructorUri.CREATE_LESSON_DOC(moduleId), lessonData)
    },
    updateLessonDoc: async (lessonId: number, lessonData: ILessonDocData): Promise<any> => {
        return axiosClient.post(instructorUri.UPDATE_LESSON_DOC(lessonId), lessonData)
    },
    deleteLessonDoc: async (lessonId: number): Promise<any> => {
        return axiosClient.delete(instructorUri.DELETE_LESSON_DOC(lessonId))
    },

    // Api create lesson type video
    createLessonVideo: async (moduleId: number, lessonData: ILessonVideoData): Promise<any> => {
        return axiosClient.post(instructorUri.CREATE_LESSON_VIDEO(moduleId), lessonData)
    },
    updateLessonVideo: async (lessonId: number, lessonData: ILessonVideoData): Promise<any> => {
        return axiosClient.post(instructorUri.UPDATE_LESSON_VIDEO(lessonId), lessonData)
    },
    deleteLessonVideo: async (lessonId: number): Promise<any> => {
        return axiosClient.delete(instructorUri.DELETE_LESSON_DOC(lessonId))
    },

    // Api create lesson type quiz
    createLessonQuiz: async (moduleId: number, lessonData: ILessonQuizData): Promise<ILessonQuiz> => {
        return axiosClient.post(instructorUri.CREATE_LESSON_QUIZ(moduleId), lessonData)
    },
    getLessonQuiz: async (moduleId: number): Promise<any> => {
        return axiosClient.get(instructorUri.GET_LESSON_QUIZ(moduleId))
    },
    updateLessonQuiz: async (lessonId: number, lessonData: ILessonQuizData): Promise<ILessonQuiz> => {
        return axiosClient.post(instructorUri.UPDATE_LESSON_QUIZ(lessonId), lessonData)
    },
    deleteLessonQuiz: async (lessonId: number): Promise<any> => {
        return axiosClient.delete(instructorUri.DELETE_LESSON_QUIZ(lessonId))
    },

    // Api add question for quiz
    createQuestion: async (quizId: number, questionData: IQuestionData): Promise<IQuestion> => {
        return axiosClient.post(instructorUri.CREATE_QUESTION(quizId), questionData)
    },
    updateQuestion: async (questionId: number, questionData: IQuestionData): Promise<IQuestion> => {
        return axiosClient.post(instructorUri.UPDATE_QUESTION(questionId), questionData)
    },
    deleteQuestion: async (questionId: number): Promise<any> => {
        return axiosClient.delete(instructorUri.DELETE_QUESTION(questionId))
    }
}
