import { toast } from 'sonner'
import { redirect } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'

import { useUserStore } from '@/app/store'
import { backendUrl } from '@/configs/baseUrl'
import { ApiMessages, ApiStatusCode, MessageConfig, MessageErrors } from '@/constants'
import { getAccessTokenFromLocalStorage, removeAccessToken, setAccessToken } from '@/lib'
import { authApis } from '@/app/services/accounts'
import routes from '@/configs/routes'

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
    config.headers['Content-Type'] = 'multipart/form-data'

    return config
})

axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        const { message, data } = response.data

        if (response.status === ApiStatusCode.Success || ApiStatusCode.Created) {
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

        if (status === ApiStatusCode.Forbidden) {
            toast.error(ApiMessages.error.forbidden)
            redirect(routes.forbidden)
        }

        if (status === ApiStatusCode.InternalServerError) {
            toast.error(ApiMessages.error.serverError)
            redirect(routes.serverError)
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
                redirect(routes.home)
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
