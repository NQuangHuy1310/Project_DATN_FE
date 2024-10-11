import { userUri } from '@/app/services/Uri/accounts'
import axiosClient from '@/configs/axiosClient'

import { IChangePassword, IResponse, IUpdateProfile, IUserProfile } from '@/types'

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
    }
}
