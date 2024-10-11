import { ApiStatusCode } from '@/constants'
import { IconType } from 'react-icons/lib'

export interface IResponse {
    message: string
    data: []
    status: ApiStatusCode
}

export interface IAccountAside {
    title: string
    icon: IconType
    path?: string
}

export interface ICourseCategory {
    id: number
    name: string
    slug: string
    image?: string | null
    description?: string | null
    parent_id?: number | null
    is_active: number
}
