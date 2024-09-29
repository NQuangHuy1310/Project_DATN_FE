import { toast } from 'sonner'
import axios, { AxiosResponse } from 'axios'

import { authApis } from '@/apis'
import { useUserStore } from '@/store'
import { backendUrl } from '@/configs/baseUrl'
import { ApiStatusCode, MessageConfig } from '@/constants'
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
        const { code, message, data } = response.data

        if (code === ApiStatusCode.Success || ApiStatusCode.Created) {
            toast.success(MessageConfig.actionSuccess, {
                description: message
            })
            return data
        }
    },
    async (error) => {
        const status = error.response?.status

        toast.error(MessageConfig.actionFailed, {
            description: error.response.data?.message
        })

        if (status === 401) {
            try {
                const refreshSuccess = await authApis.refreshToken()
                if (refreshSuccess) {
                    setAccessToken(refreshSuccess.access_token)
                    return axiosClient(error.config)
                }
            } catch {
                toast.error(MessageConfig.sessionExpired)
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
