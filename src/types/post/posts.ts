export interface IPosts {
    id: number
    title: string
    slug: string
    description: string
    thumbnail: string
    tags: IPostTag[]
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
