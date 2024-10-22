export interface IPosts {
    allow_comments: number
    avatar: string
    categories: { id: number; name: string; slug: string }[]
    content: string
    description: string
    id: number
    is_banned: number
    published_at: string
    slug: string
    status: string
    tags: { id: number; name: string; slug: string }[]
    thumbnail: string
    title: string
    user_id: number
    username: string
    views: number
}
export interface IPostTag {
    name: string
}

export interface ICreatePost {
    title: string
    description: string
    content: string
    published_at: Date
    status: 'published' | 'private'
    allow_comments: number
    categories: string[]
    is_active: number
    tags: string[]
    thumbnail: File
}
