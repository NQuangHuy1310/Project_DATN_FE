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

const MyPosts = () => {
    const navigate = useNavigate()
    const { data, isLoading } = useGetMyPosts()
    const { mutateAsync: deletePost } = useDeletePost()

    if (isLoading) {
        return <Loading />
    }

    const handleDeletePost = async (postSlug: string) => {
        await deletePost(postSlug)
        toast.success('Xóa bài viết thành công!', { description: 'Bài viết đã được xóa khỏi hệ thống.' })
    }

    const handleNavigate = (postSlug: string) => () => {
        const postDetailUrl = routes.editPost.replace(':slug', postSlug)
        navigate(postDetailUrl)
    }

    return (
        <div className="flex flex-col gap-5 rounded-md bg-white p-7">
            <Tabs defaultValue="published" className="flex min-h-[500px] flex-col gap-3">
                <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                    <TabsTrigger value="published">Đã xuất bản</TabsTrigger>
                    <TabsTrigger value="draft">Bản nháp</TabsTrigger>
                </TabsList>

                <div className="w-full md:w-[70%]">
                    <TabsContent value="published" className="flex flex-col gap-3">
                        {data?.map((post, index) => {
                            const updatedAtString = post.published_at
                            const updatedAt = new Date(updatedAtString)
                            const timeAgo = formatDistanceToNow(updatedAt, { addSuffix: true, locale: vi })

                            return (
                                <div
                                    className="flex flex-wrap items-start justify-between rounded-xl border-2 p-5"
                                    key={index}
                                >
                                    <div className="flex flex-col gap-2">
                                        <h3
                                            className="cursor-pointer text-xl font-semibold"
                                            onClick={handleNavigate(post.slug)}
                                        >
                                            {post.title}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-darkGrey">Đã đăng vào {timeAgo} </span>
                                            <BsDot className="text-darkGrey" />
                                            <span className="text-darkGrey">1 phút đọc</span>
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
