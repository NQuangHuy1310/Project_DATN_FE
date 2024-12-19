import { toast } from 'sonner'
import axios, { AxiosResponse } from 'axios'

import { useUserStore } from '@/app/store'
import { backendUrl } from '@/configs/baseUrl'
import { ApiMessages, ApiStatusCode, MessageErrors } from '@/constants'
import { getAccessTokenFromLocalStorage, removeAccessToken, setAccessToken } from '@/lib'
import { authApis } from '@/app/services/accounts'
import routes from '@/configs/routes'

const { clearUserAndProfile } = useUserStore.getState()

// Tạo instance axios
const axiosClient = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Đồng bộ hóa refresh token
let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token)
        } else {
            prom.reject(error)
        }
    })
    failedQueue = []
}

// Interceptor request: Thêm token vào header
axiosClient.interceptors.request.use((config) => {
    const token = getAccessTokenFromLocalStorage()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    config.headers.Accept = 'application/json'
    config.headers['Content-Type'] = 'multipart/form-data'

    return config
})

// Interceptor response: Xử lý response và lỗi
axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        const { message, data } = response.data

        if (response.status === ApiStatusCode.Success || ApiStatusCode.Created) {
            if (response.status === ApiStatusCode.Created) {
                toast.success(message, {
                    description: ApiMessages.success.created
                })
            }

            return data
        }
    },
    async (error) => {
        const status = error.response?.status
        const originalRequest = error.config

        // Xử lý các lỗi phổ biến
        if (status === ApiStatusCode.UnprocessableEntity) {
            toast.error(error.response.data?.message, {
                description: MessageErrors.invalidInput
            })
        } else if (status === ApiStatusCode.Forbidden) {
            toast.error(ApiMessages.error.forbidden)
            window.location.href = routes.forbidden
        } else if (status === ApiStatusCode.InternalServerError) {
            toast.error(ApiMessages.error.serverError)
        } else {
            toast.error(error.response.data?.message || 'Xảy ra lỗi không xác định !')
        }

        // Xử lý lỗi 401 (Unauthorized)
        if (status === 401) {
            if (!isRefreshing) {
                isRefreshing = true
                try {
                    const refreshSuccess = await authApis.refreshToken()
                    setAccessToken(refreshSuccess.access_token)
                    processQueue(null, refreshSuccess.access_token)
                    isRefreshing = false

                    // Gọi lại request ban đầu
                    originalRequest.headers.Authorization = `Bearer ${refreshSuccess.access_token}`
                    return axiosClient(originalRequest)
                } catch (refreshError) {
                    processQueue(refreshError, null)
                    isRefreshing = false
                    toast.error(ApiMessages.error.sessionExpired)
                    clearUserAndProfile()
                    removeAccessToken()
                    window.location.href = routes.home
                    return Promise.reject(refreshError)
                }
            }

            // Đưa request vào hàng chờ nếu đang refresh token
            return new Promise((resolve, reject) => {
                failedQueue.push({
                    resolve: (token: string) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`
                        resolve(axiosClient(originalRequest))
                    },
                    reject: (err: any) => reject(err)
                })
            })
        }

        // Trả lỗi ra ngoài nếu không phải 401
        return Promise.reject(error)
    }
)

export default axiosClient
