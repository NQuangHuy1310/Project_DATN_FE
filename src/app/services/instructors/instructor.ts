import axiosClient from '@/configs/axiosClient'

import { instructorUri } from '@/app/services/Uri/instructors'
import {
    ICourses,
    ICreateCourse,
    ICreateCourseData,
    ILessonDocData,
    ILessonVideoData,
    IModule,
    IModuleData,
    IOverviewCourseData,
    ITargetCourse
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
    }
}
