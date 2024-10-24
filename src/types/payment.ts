export interface IPayment {
    average_rating: string
    course_duration: null
    course_id: number
    course_name: string
    course_thumbnail: string
    price: number
    price_sale: number
    total_lessons: number
    total_student: number
    user_avatar: string
    user_id: number
    user_name: string
}
export interface IBuyData {
    id_voucher?: number
    total_coin: number
    coin_discount: number
    total_coin_after_discount: number
}
