import { AxiosResponse } from 'axios'

import axiosClient from '@/configs/axiosClient'
import {
    ILoginData,
    IRegisterData,
    IUserEmail,
    IResponse,
    IUserProfile,
    IVerifyOtpData,
    IResetPassword,
    IRefreshToken
} from '@/types'
import { authUri } from '@/app/services/Uri/accounts'

export const authApis = {
    login: async (authData: ILoginData): Promise<IUserProfile> => {
        return axiosClient.post(authUri.LOGIN, authData)
    },
    register: async (authData: IRegisterData): Promise<IUserProfile> => {
        return axiosClient.post(authUri.REGISTER, authData)
    },
    verifyOtp: async (data: IVerifyOtpData): Promise<IUserProfile> => {
        return axiosClient.post(authUri.VERIFY_OTP, data)
    },
    resendOtp: async (data: IUserEmail): Promise<IResponse | AxiosResponse> => {
        return axiosClient.post(authUri.RESEND_OTP, data)
    },
    forgotPassword: async (data: IUserEmail): Promise<IResponse> => {
        return axiosClient.post(authUri.FORGOT_PASSWORD, data)
    },
    verifyOtpResetPassword: async (data: IVerifyOtpData): Promise<IResponse> => {
        return axiosClient.post(authUri.VERIFY_OTP_RESETPASSWORD, data)
    },
    resetPassword: async (data: IResetPassword): Promise<IResponse> => {
        return axiosClient.post(authUri.RESET_PASSWORD, data)
    },
    refreshToken: async (): Promise<IRefreshToken> => {
        return axiosClient.post(authUri.REFRESH_TOKEN)
    },
    logout: async (): Promise<IResponse> => {
        return axiosClient.post(authUri.LOGOUT)
    }
}
