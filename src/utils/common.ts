import { imageBaseUrl } from '@/configs/baseUrl'
import { MessageErrors } from '@/constants'

export const getAccessTokenFromLocalStorage = () => {
    const accessToken = localStorage.getItem('access_token') || null
    return accessToken
}

export const setAccessToken = (token: string) => {
    if (!token) return
    localStorage.setItem('access_token', token)
}

export const removeAccessToken = (): void => {
    localStorage.removeItem('access_token')
}

export const getImagesUrl = (imagePath: string): string => {
    return `${imageBaseUrl}${imagePath}`
}

export const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = () => reject(new Error(MessageErrors.uploadFile))
        reader.readAsDataURL(file)
    })
}
