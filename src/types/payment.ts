import { IUser } from './auth'

export interface IPayment {
    ratings_avg_rate: string
    id: number
    name: string
    thumbnail: string
    price: number
    price_sale: number
    total_lessons: number
    total_student: number
    total_duration_video: number
    user: IUser
}
export interface IBuyData {
    voucher_code?: string
    total_coin: number
    coin_discount: number
    total_coin_after_discount: number
}

export interface IVoucher {
    voucher: Voucher[]
}

interface Voucher {
    code: string
    start_time: string
    end_time: string
}
