export interface ICreateComment {
    id_user: number
    content: string
    parent_id?: number | null
    commentable_id: number
}
export interface IComment {
    id: number
    id_user: number
    content: string
    parent_id?: number
    commentable_id: number
    is_approved?: number
    name: string
    avatar: string
    email: string
    created_at: string
    children: IComment[]
}
