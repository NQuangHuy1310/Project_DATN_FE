import axiosClient from '@/configs/axiosClient'

import { instructorUri } from '@/app/services/Uri/instructors'
import {
    ICreateCourse,
    ICreateCourseData,
    IOverviewCourse,
    IOverviewCourseData,
    ITargetCourse
} from '@/types/instructor'

export const instructorApi = {
    createCourse: async (courseData: ICreateCourseData): Promise<ICreateCourse> => {
        return axiosClient.post(instructorUri.CREATE_COURSE, courseData)
    },
    targetCourse: async (courseId: string, courseData: ITargetCourse): Promise<ITargetCourse> => {
        return axiosClient.put(instructorUri.TARGET_COURSE(courseId), courseData, {
            method: 'PUT'
        })
    },
    courseOverview: async (courseId: string, courseData: IOverviewCourseData): Promise<any> => {
        return axiosClient.put(instructorUri.OVERVIEW_COURSE(courseId), courseData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}
