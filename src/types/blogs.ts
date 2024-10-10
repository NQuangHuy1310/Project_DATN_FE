import { IUser } from './auth'

export interface IPosts {
    title: string
    slug: string
    description: string
    thumbnail: string
    read_time: string
    author: IUser
    tags?: string[]
}
