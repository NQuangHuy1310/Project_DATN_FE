import { userUri } from '@/app/services/Uri/accounts'
import axiosClient from '@/configs/axiosClient'

import { HistoryLeaning, IChangePassword, IResponse, IUpdateProfile, IUserProfile } from '@/types'
import { CheckFlow, Flow, ICourseMyBought } from '@/types/user'

export const userApis = {
    getProfile: async (): Promise<IUserProfile> => {
        return axiosClient.get(userUri.PROFILE)
    },
    updateProfile: async (data: IUpdateProfile): Promise<IUserProfile> => {
        return axiosClient.post(userUri.UPDATE_PROFILE, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    changePassword: async (data: IChangePassword): Promise<IResponse> => {
        return axiosClient.post(userUri.CHANGE_PASSWORD, data)
    },
    getMyCourseBought: async (): Promise<ICourseMyBought[]> => {
        return axiosClient.get(userUri.GET_MY_COURSE_BOUGHT)
    },
    flowTeacher: async (teacher: Flow): Promise<Flow> => {
        return axiosClient.post(userUri.FLOW_TEACHER, teacher)
    },
    unFlowTeacher: async (teacher: Flow): Promise<Flow> => {
        return axiosClient.post(userUri.UN_FOLLOW_TEACHER, teacher)
    },
    checkFollow: async (userId: number, teacherId: number): Promise<CheckFlow> => {
        return axiosClient.get(userUri.CHECK_FOLLOW_TEACHER(userId, teacherId))
    },
    registerTeacher: async (): Promise<any> => {
        return axiosClient.post(userUri.REGISTER_TEACHER)
    },
    courseHistory: async (count: number): Promise<HistoryLeaning> => {
        return axiosClient.get(userUri.COURSE_HISTORY(count))
    }
}
