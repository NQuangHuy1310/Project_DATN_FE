import { getImagesUrl } from '@/lib'
import { Link } from 'react-router-dom'

interface PostProps {
    image: string
    category: string
    title: string
    userName: string
    avatar: string
    slug: string
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
                    <Link to={`/posts/${slug}`}> <h3 className="truncate text-lg font-semibold">{title}</h3></Link>
                </div>
                <div className="flex items-center justify-between gap-2 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                        <img src={userAvatar} alt={userName} className="h-6 w-6 rounded-full" />
                        <span className="text-xs font-semibold">{userName}</span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Post
