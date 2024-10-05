import { toast } from 'sonner'
import axios, { AxiosResponse } from 'axios'

import { authApis } from '@/app/services'
import { useUserStore } from '@/app/store'
import { backendUrl } from '@/configs/baseUrl'
import { ApiMessages, ApiStatusCode, MessageConfig, MessageErrors } from '@/constants'
import { getAccessTokenFromLocalStorage, removeAccessToken, setAccessToken } from '@/utils'

const { clearUserAndProfile } = useUserStore.getState()

const axiosClient = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosClient.interceptors.request.use((config) => {
    const token = getAccessTokenFromLocalStorage()

    if (token !== '') {
        const auth = `Bearer ${token}`
        config.headers.Authorization = auth
    }

    config.headers.Accept = 'application/json'

    return config
})

axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        const { message, data } = response.data

        if (response.status === ApiStatusCode.Success || ApiStatusCode.Created) {
            if (response.status === ApiStatusCode.Success) {
                toast.success(message, {
                    description: MessageConfig.actionSuccess
                })
            }

            if (response.status === ApiStatusCode.Created) {
                toast.success(ApiMessages.success.created, {
                    description: message
                })
            }

            return data
        }
    },
    async (error) => {
        const status = error.response?.status

        if (status === ApiStatusCode.UnprocessableEntity) {
            toast.error(error.response.data?.message, {
                description: MessageErrors.invalidInput
            })
        }

        if (status === ApiStatusCode.InternalServerError) {
            toast.error(ApiMessages.error.serverError)
        }

        toast.error(error.response.data?.message)

        if (status === 401) {
            try {
                const refreshSuccess = await authApis.refreshToken()
                if (refreshSuccess) {
                    setAccessToken(refreshSuccess.access_token)
                    return axiosClient(error.config)
                }
            } catch {
                toast.error(ApiMessages.error.sessionExpired)
                await authApis.logout()
                clearUserAndProfile()
                removeAccessToken()
            }
        }

        return Promise.reject({
            message: error.response?.data?.message || MessageConfig.retry,
            data: error.response?.data || {},
            status: status || 500
        })
    }
)

export default axiosClient
