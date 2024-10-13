import axiosClient from '@/configs/axiosClient'

import { ITeacherAll, ITeacherDetail } from '@/types'
import { instructorClientUri } from '@/app/services/Uri/instructors'

export const instructorClientApi = {
    getAllInstructor: async (page: number, perPage?: number): Promise<ITeacherAll> => {
        return axiosClient.get(instructorClientUri.ALL_INSTRUCTOR(page, perPage))
    },
    getInstructorById: async (instructorId: number): Promise<ITeacherDetail> => {
        return axiosClient.get(instructorClientUri.DETAIL_INSTRUCTOR(instructorId))
    }
}
