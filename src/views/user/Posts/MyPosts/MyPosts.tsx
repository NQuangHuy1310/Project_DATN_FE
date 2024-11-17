import { formatDistanceToNow } from 'date-fns'
import { BsDot, BsThreeDots } from 'react-icons/bs'
import { vi } from 'date-fns/locale'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useDeletePost, useGetMyPosts } from '@/app/hooks/posts'
import Loading from '@/components/Common/Loading/Loading'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import routes from '@/configs/routes'
import { getImagesUrl } from '@/lib'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const MyPosts = () => {
    const navigate = useNavigate()
    const { data, isLoading } = useGetMyPosts()
    const { mutateAsync: deletePost } = useDeletePost()

    const handleDeletePost = async (postSlug: string) => {
        await deletePost(postSlug)
        toast.success('Xóa bài viết thành công!', { description: 'Bài viết đã được xóa khỏi hệ thống.' })
    }

    const handleNavigate = (postSlug: string) => () => {
        const postDetailUrl = routes.editPost.replace(':slug', postSlug)
        navigate(postDetailUrl)
    }

    if (isLoading) {
        return <Loading />
    }

    console.log(data)

    return (
        <div className="flex flex-col gap-5 rounded-md bg-white p-10 px-20">
            <Tabs defaultValue="published" className="flex min-h-[500px] flex-col gap-3">
                <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                    <TabsTrigger value="published">Đã xuất bản</TabsTrigger>
                    <TabsTrigger value="draft">Bản nháp</TabsTrigger>
                </TabsList>

                <div className="w-full">
                    <TabsContent value="published" className="flex flex-col gap-3">
                        {data?.map((post, index) => {
                            const updatedAtString = post.published_at
                            const updatedAt = new Date(updatedAtString)
                            const timeAgo = formatDistanceToNow(updatedAt, { addSuffix: true, locale: vi })

                            return (
                                <div
                                    className="flex flex-wrap items-start justify-between rounded border p-3 hover:shadow-md"
                                    key={index}
                                >
                                    <div className="flex gap-3">
                                        <img
                                            className="h-40 w-64 rounded border object-cover"
                                            src={getImagesUrl(post.thumbnail)}
                                            alt={post.title}
                                        />
                                        <div className="flex flex-col gap-2">
                                            <h3 className="cursor-pointer text-lg" onClick={handleNavigate(post.slug)}>
                                                {post.title}
                                            </h3>
                                            <div className="flex items-center gap-1">
                                                <span className="text-darkGrey">Đã xuất bản</span>
                                                <BsDot className="text-darkGrey" />
                                                <span className="text-darkGrey">{timeAgo}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="size-6 cursor-pointer">
                                                    <AvatarImage
                                                        className="object-cover"
                                                        src={getImagesUrl(post?.avatar || '')}
                                                        alt={post?.username}
                                                    />
                                                    <AvatarFallback className="bg-slate-500/50 text-base font-semibold text-white">
                                                        {post?.username.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-xs font-semibold">{post.username}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="mt-1">
                                            <BsThreeDots className="size-5" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" sideOffset={5}>
                                            <DropdownMenuItem onClick={() => handleNavigate(post.slug)}>
                                                Chỉnh sửa
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDeletePost(post.slug)}>
                                                Xóa
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            )
                        })}
                    </TabsContent>
                    <TabsContent value="draft" className="flex flex-col gap-3"></TabsContent>
                </div>
            </Tabs>
        </div>
    )
}

export default MyPosts
