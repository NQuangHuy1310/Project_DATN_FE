import { imageBaseUrl } from '@/configs/baseUrl'
import { MessageErrors } from '@/constants'
import { placeholders } from '@/constants/placeholders'
import { toast } from 'sonner'

const maxImageSizeInMB = 2
const maxImageSizeInBytes = maxImageSizeInMB * 1024 * 1024

const maxVideoSizeInGB = 2
const maxVideoSizeInBytes = maxVideoSizeInGB * 1024 * 1024 * 1024

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

export const getInputCoursePlaceholder = (type: 'goals' | 'conditions' | 'audiences') => {
    const typePlaceholders = placeholders[type]
    const randomIndex = Math.floor(Math.random() * typePlaceholders.length)
    return typePlaceholders[randomIndex]
}

export const validateFileSize = (file: File, fileType: 'image' | 'video'): boolean => {
    let maxSize

    if (fileType === 'image') {
        maxSize = maxImageSizeInBytes
    } else {
        maxSize = maxVideoSizeInBytes
    }

    if (file.size > maxSize) {
        if (fileType === 'image') {
            toast.error(MessageErrors.maxSizeImage)
        } else {
            toast.error(MessageErrors.maxSizeVideo)
        }
        return false
    }

    return true
}

export const getVisiblePages = (totalPages: number, currentPage: number, maxPages: number) => {
    const startPage = Math.max(1, currentPage - Math.floor(maxPages / 2))
    const endPage = Math.min(totalPages, startPage + maxPages - 1)

    const displayPage = Math.max(1, endPage - maxPages + 1)

    return Array.from({ length: endPage - displayPage + 1 }, (_, index) => displayPage + index)
}

export const formatDuration = (totalDurationInSeconds: number): string => {
    const hours = Math.floor(totalDurationInSeconds / 3600)
    const minutes = Math.floor((totalDurationInSeconds % 3600) / 60)

    const formattedParts: string[] = []

    if (hours > 0) {
        formattedParts.push(`${hours} Giờ`)
    }
    if (minutes > 0) {
        formattedParts.push(`${minutes} Phút`)
    }

    return formattedParts.join(', ')
}
