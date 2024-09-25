import { ApiStatusCode } from '@/constants'

export interface IResponse {
    message: string
    data: []
    status: ApiStatusCode
}
