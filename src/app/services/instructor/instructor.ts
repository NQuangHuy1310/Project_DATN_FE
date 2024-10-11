import axiosClient from '@/configs/axiosClient'

import { ICreateCourse, ICreateCourseData } from '@/types/instructor'
import { instructorUri } from '@/app/services/Uri/instructor/instructor'

export const instructorApi = {
    createCourse: async (courseData: ICreateCourseData): Promise<ICreateCourse> => {
        return axiosClient.post(instructorUri.CREATE_COURSE, courseData)
    }
}
