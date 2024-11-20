import { LuDot } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { CiBookmark } from 'react-icons/ci'
import { BsThreeDots } from 'react-icons/bs'
import { IoFlagSharp } from 'react-icons/io5'
import { IoFilterSharp } from 'react-icons/io5'
import { FaFacebookSquare, FaLink } from 'react-icons/fa'

import routes from '@/configs/routes'
import Banners from '@/components/shared/Banner/Banners'
import { getImagesUrl } from '@/lib'
import { useGetFeaturedPosts } from '@/app/hooks/posts'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

const PostFeatured = () => {
    const { data: postFeatured } = useGetFeaturedPosts()
    const formatTime = (date: any) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true, locale: vi })
    }
    // Hàm tính thời gian đọc dựa trên số từ
    const calculateReadingTime = (content: string) => {
        const wordsPerMinute = 200
        const words = content.trim().split(/\s+/).length
        return Math.ceil(words / wordsPerMinute)
    }
    return (
        <div>
            <Banners />
            <div className="mx-auto flex max-w-[1200px] items-center gap-4 px-5 py-9 lg:px-0">
                <h2 className="text-xl font-medium">Danh sách bài viết</h2>
                <Select>
                    <SelectTrigger>
                        <IoFilterSharp className="size-4" />
                        <SelectValue placeholder="Sắp xếp" />
                    </SelectTrigger>
                    <SelectContent side="bottom" align="end">
                        <SelectGroup>
                            <SelectItem value="all">Tất cả</SelectItem>
                            <SelectItem value="a-z">Bài viết nổi bật</SelectItem>
                            <SelectItem value="z-a">Bài viết mới nhất</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="container-main pb-10">
                <div className="flex flex-wrap justify-between gap-7">
                    {postFeatured?.map((post, index) => (
                        <div key={index} className="flex w-full flex-col gap-7 rounded-md bg-white">
                            <div className="flex w-full flex-wrap items-start gap-10">
                                <div className="flex w-full max-w-[100%] cursor-pointer flex-col gap-4 rounded-lg border p-6 hover:shadow-md">
                                    <div className="flex justify-between">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="size-7 cursor-pointer md:size-10">
                                                <AvatarImage
                                                    className="object-cover"
                                                    src={getImagesUrl(post.avatar || '')}
                                                    alt={post.name}
                                                />
                                                <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                                    {post.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-xs font-semibold">{post.name}</span>
                                        </div>
                                        <div className="flex items-center gap-5">
                                            <CiBookmark className="size-6" />
                                            <div className="mb-2">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className="mt-1">
                                                        <BsThreeDots className="size-5" />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        align="end"
                                                        sideOffset={5}
                                                        className="flex flex-col gap-3 rounded-md border bg-white p-2 shadow-lg"
                                                    >
                                                        <DropdownMenuItem className="flex gap-2 rounded-md p-2 hover:bg-gray-100">
                                                            <FaFacebookSquare /> Chia sẻ lên Facebook
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem className="flex gap-2 rounded-md p-2 hover:bg-gray-100">
                                                            <FaLink />
                                                            Sao chép liên kết
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="flex gap-2 rounded-md p-2 hover:bg-gray-100">
                                                            <IoFlagSharp />
                                                            Báo cáo bài viết
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 text-xs">
                                        <div className="flex w-full flex-col gap-5">
                                            <div className="flex max-w-[80%] flex-col gap-1">
                                                <Link to={routes.postsDetail.replace(':slug', post.slug)}>
                                                    {' '}
                                                    <h3 className="truncate text-lg font-semibold">{post.title}</h3>
                                                </Link>
                                                <p className="text-base">{post.description}</p>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-1 font-medium text-darkGrey">
                                                    <button className="rounded-xl bg-gray-200 p-3 py-1 text-xs text-black">
                                                        {post?.categories[0].name}
                                                    </button>
                                                    <p>{formatTime(post.created_at)} </p>
                                                    <LuDot />
                                                    <p>{calculateReadingTime(post.content)} phút đọc</p>
                                                </div>
                                            </div>
                                        </div>

                                        <img
                                            src={getImagesUrl(post.thumbnail)}
                                            alt={post.name}
                                            className="!w-[300px] rounded-2xl"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PostFeatured
