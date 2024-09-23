import axios, { AxiosResponse } from 'axios'

import { getAccessTokenFromLocalStorage } from '@/utils'
import { toast } from 'sonner'
import { MessageConfig } from '@/constants'
// import { toast } from '@/hooks/use-toast'

const axiosClient = axios.create({
    baseURL: '',
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

        if (code === 0) {
            return data
        } else {
            toast.error(MessageConfig.actionFailed, {
                description: message
            })
            return Promise.reject({
                message: message || 'An error occurred',
                code: code,
                data: data || [],
                status: response.status
            })
        }
    },
    (error) => {
        return Promise.reject({
            message: error.response?.data?.message || 'An error occurred',
            code: 1,
            data: error.response?.data || [],
            status: error.response?.status || 500
        })
    }
)

export default axiosClient
