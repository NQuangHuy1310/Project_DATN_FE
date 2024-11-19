export interface IRating {
    name: string
    user_email: string
    avatar: string
    content: string
    created_at: number
    rate: number
}
export interface IRatingCreate {
    id_user: number
    id_course: number
    content: string
    rate: number
}
