import { AxiosResponse } from 'axios'

import { authUri } from '@/apis/Uri'
import axiosClient from '@/configs/axiosClient'
import { ILoginData, IRegisterData, IResendOtpData, IResponse, IUserProfile, IVerifyOtpData } from '@/types'

export const userApis = {
    login: async (authData: ILoginData): Promise<IUserProfile> => {
        return axiosClient.post(authUri.LOGIN, authData)
    },
    register: async (authData: IRegisterData): Promise<IUserProfile> => {
        return axiosClient.post(authUri.REGISTER, authData)
    },
    verifyOtp: async (data: IVerifyOtpData): Promise<IUserProfile> => {
        return axiosClient.post(authUri.VERIFY_OTP, data)
    },
    resendOtp: async (data: IResendOtpData): Promise<IResponse | AxiosResponse> => {
        return axiosClient.post(authUri.RESEND_OTP, data)
    }
}
