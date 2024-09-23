import { ApiCode, ApiStatusCode } from '@/constants'

export interface IResponse {
    message: string
    code: ApiCode
    data: []
    status: ApiStatusCode
}
