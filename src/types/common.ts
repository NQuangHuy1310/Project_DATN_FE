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
