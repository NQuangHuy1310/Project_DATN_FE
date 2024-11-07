import { useGetFeaturedPosts } from '@/app/hooks/posts'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import routes from '@/configs/routes'
import { getImagesUrl } from '@/lib'
import { Link } from 'react-router-dom'

const PostFeatured = () => {
    const { data } = useGetFeaturedPosts()
    console.log(data)
    return (
        <div className="container-main pb-10">
            <h3 className="pb-7 text-xl font-medium md:text-2xl">Bài viết nổi bật</h3>

            <div className='flex flex-wrap gap-5'>
                {data?.map((post, index) => (
                    <Link to={routes.postsDetail.replace(':slug',post.slug)}
                        key={index}
                        className="flex w-full max-w-[360px] cursor-pointer flex-col gap-4 rounded-lg border p-4 shadow-md"
                    >
                        <div className="h-[170px] w-full overflow-hidden rounded-lg">
                            <img
                                src={getImagesUrl(post.thumbnail)}
                                alt={post.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1">
                                {' '}
                                <h3 className="truncate text-lg font-semibold">{post.title}</h3>
                            </div>
                            <div className="flex items-center justify-between gap-2 text-xs text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Avatar className="size-8 flex-shrink-0">
                                        <AvatarImage src={getImagesUrl(post.avatar)} alt={post.name} />
                                        <AvatarFallback className="flex size-8 items-center justify-center bg-slate-500/50 font-semibold">
                                            {post.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <p className="flex-1">{post.name}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default PostFeatured
