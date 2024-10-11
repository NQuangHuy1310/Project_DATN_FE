import axiosClient from '@/configs/axiosClient'

import { ITeacher } from '@/types'
import { instructorClientUri } from '@/app/services/Uri/instructors'

export const instructorClientApi = {
    getAllInstructor: async (): Promise<ITeacher[]> => {
        return axiosClient.get(instructorClientUri.ALL_INSTRUCTOR)
    }
}
