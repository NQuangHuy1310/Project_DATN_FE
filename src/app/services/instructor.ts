import { instructorUri } from '@/app/services/Uri'
import axiosClient from '@/configs/axiosClient'
import { ITeacher } from '@/types'

export const intructorApi = {
    getAllInstructor: async (): Promise<ITeacher[]> => {
        return axiosClient.get(instructorUri.ALL_INTRUCTOR)
    }
}
