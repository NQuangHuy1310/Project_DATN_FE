import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import routes from '@/configs/routes'
import { getImagesUrl } from '@/lib'
import { Link } from 'react-router-dom'

interface PostProps {
    image: string
    category?: string
    title: string
    name: string
    avatar: string
    slug: string
    views?: number
    content: string
}

const PostOutStanding = ({ image, title, name, avatar, slug, content }: PostProps) => {
    const calculateReadingTime = (content: string) => {
        const wordsPerMinute = 200
        const words = content.trim().split(/\s+/).length
        return Math.ceil((words / wordsPerMinute))
    }
    return (
        <div className="flex w-full max-w-[360px] flex-col gap-4 rounded-lg border p-4 shadow-md">
            <Link to={routes.postsDetail.replace(':slug', slug)} className='flex flex-col gap-2'>
                <div className="h-[170px] w-full overflow-hidden rounded-lg">
                    <img src={getImagesUrl(image)} alt={title} className="h-full w-full object-cover" />
                </div>
                <h3 className="truncate text-lg font-semibold">{title}</h3>
            </Link>
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                        <Avatar className="size-7 cursor-pointer md:size-10">
                            <AvatarImage
                                className="object-cover"
                                src={getImagesUrl(avatar || '')}
                                alt={name}
                            />
                            <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                {name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-semibold">{name}</span>
                    </div>
                    <span>{calculateReadingTime(content)} phút đọc</span>
                </div>
            </div>
        </div >
    )
}

export default PostOutStanding
