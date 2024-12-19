import { userUri } from '@/app/services/Uri/accounts'
import axiosClient from '@/configs/axiosClient'

import { CheckFlow, Flow, ICourseMyBought, IRegisterInstructor } from '@/types/user'
import {
    HistoryLeaning,
    IChangePassword,
    IProfileUser,
    IResponse,
    IUpdateProfile,
    IUserProfile,
    IVoucherDiscount
} from '@/types'

export const userApis = {
    getDetailProfile: async (email: string): Promise<IProfileUser> => {
        return axiosClient.get(userUri.GET_PROFILE(email))
    },
    getProfile: async (): Promise<IUserProfile> => {
        return axiosClient.get(userUri.PROFILE)
    },
    updateProfile: async (data: IUpdateProfile): Promise<IUserProfile> => {
        return axiosClient.post(userUri.UPDATE_PROFILE, data)
    },
    changePassword: async (data: IChangePassword): Promise<IResponse> => {
        return axiosClient.post(userUri.CHANGE_PASSWORD, data)
    },
    getUserById: async (userId: number): Promise<any> => {
        return axiosClient.get(userUri.GET_USER_BY_ID(userId))
    },
    getMyCourseBought: async (
        category?: string,
        level?: string,
        arrange?: string,
        page?: number,
        perPage?: number
    ): Promise<ICourseMyBought> => {
        return axiosClient.get(userUri.GET_MY_COURSE_BOUGHT(category, level, arrange, page, perPage))
    },

    getMyCourseBySearch: async (search?: string): Promise<any> => {
        return axiosClient.get(userUri.GET_MY_COURSE_BY_SEARCH(search))
    },
    followTeacher: async (teacher: Flow): Promise<Flow> => {
        return axiosClient.post(userUri.FLOW_TEACHER, teacher)
    },
    unFollowTeacher: async (teacher: Flow): Promise<Flow> => {
        return axiosClient.post(userUri.UN_FOLLOW_TEACHER, teacher)
    },
    checkFollow: async (userId: number, teacherId: number): Promise<CheckFlow> => {
        return axiosClient.get(userUri.CHECK_FOLLOW_TEACHER(userId, teacherId))
    },
    registerTeacher: async (data: IRegisterInstructor): Promise<any> => {
        return axiosClient.post(userUri.REGISTER_TEACHER, data)
    },
    courseHistory: async (count: number): Promise<HistoryLeaning> => {
        return axiosClient.get(userUri.COURSE_HISTORY(count))
    },
    getVoucherUser: async (slug: string): Promise<IVoucherDiscount> => {
        return axiosClient.get(userUri.VOUCHER_USER(slug))
    },
    getAdminPost: async (): Promise<any> => {
        return axiosClient.get(userUri.ADMIN_POST)
    }
}
