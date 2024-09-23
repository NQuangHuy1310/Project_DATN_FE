import axios, { AxiosResponse } from 'axios'

import { getAccessTokenFromLocalStorage } from '@/utils'
import { toast } from 'sonner'
import { ApiCode, MessageConfig } from '@/constants'

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api/',
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

        if (code === ApiCode.Success) {
            toast.success(MessageConfig.actionSuccess, {
                description: message
            })
            return data
        }
    },
    (error) => {
        toast.error(MessageConfig.actionFailed, {
            description: error.response.data?.message
        })
        return Promise.reject({
            message: error.response?.data?.message || 'An error occurred',
            code: 1,
            data: error.response?.data || [],
            status: error.response?.status || 500
        })
    }
)

export default axiosClient
