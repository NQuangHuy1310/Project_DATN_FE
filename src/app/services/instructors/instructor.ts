import axiosClient from '@/configs/axiosClient'

import { instructorUri } from '@/app/services/Uri/instructors'
import { ICreateCourse, ICreateCourseData } from '@/types/instructor'

export const instructorApi = {
    createCourse: async (courseData: ICreateCourseData): Promise<ICreateCourse> => {
        return axiosClient.post(instructorUri.CREATE_COURSE, courseData)
    }
}
