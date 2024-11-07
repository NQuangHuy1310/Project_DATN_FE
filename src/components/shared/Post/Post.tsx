import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import routes from '@/configs/routes'
import { getImagesUrl } from '@/lib'
import { Link } from 'react-router-dom'

interface PostProps {
    image: string
    category?: string
    title: string
    userName: string
    avatar: string
    slug: string
    views?: number
}

const Post = ({ image, title, userName, avatar, slug }: PostProps) => {
    const userAvatar = getImagesUrl(avatar)
    const postImage = getImagesUrl(image)

    return (
        <div className="flex w-full max-w-[360px] cursor-pointer flex-col gap-4 rounded-lg border p-4 shadow-md">
            <div className="h-[170px] w-full overflow-hidden rounded-lg">
                <img src={postImage} alt={title} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <Link to={routes.postsDetail.replace(':slug', slug)}>
                        {' '}
                        <h3 className="truncate text-lg font-semibold">{title}</h3>
                    </Link>
                </div>
                <div className="flex items-center justify-between gap-2 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                        <Avatar className="size-7 cursor-pointer md:size-10">
                            <AvatarImage
                                className="object-cover"
                                src={getImagesUrl(avatar|| '')}
                                alt={userName}
                            />
                            <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                {userName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-semibold">{userName}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
