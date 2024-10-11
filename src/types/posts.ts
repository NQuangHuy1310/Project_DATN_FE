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
