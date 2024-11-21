import { getImagesUrl } from '@/lib'
import { useGetSlugParams } from '@/app/hooks/common/useCustomParams'

import { LuDot } from 'react-icons/lu'
import { MdEmail } from 'react-icons/md'
import { BsThreeDots } from 'react-icons/bs'
import { IoFlagSharp } from 'react-icons/io5'
import { FaBookmark, FaFacebookSquare, FaLink, FaRegBookmark } from 'react-icons/fa'

import Loading from '@/components/Common/Loading/Loading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import {
    useCheckLikedPost,
    useCheckSavedPost,
    useGetPost,
    useLikePost,
    useSavePosts,
    useUnLikePost,
    useUnSavePosts
} from '@/app/hooks/posts'
import { useState } from 'react'
import { GoComment } from 'react-icons/go'
import { PiHeartStraight, PiHeartStraightFill } from 'react-icons/pi'
import CommentPost from '@/components/shared/Comment/CommentPost'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import PostOutStanding from '@/components/shared/Post/PostOutStanding'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

const PostDetail = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const slug = useGetSlugParams('slug')

    const { data: postDetailData, isLoading } = useGetPost(slug!)
    const relatedPosts = postDetailData?.related_posts

    const { mutateAsync: savePost } = useSavePosts()
    const { mutateAsync: unSavePost } = useUnSavePosts()
    const { mutateAsync: likePost } = useLikePost()
    const { mutateAsync: unLikePost } = useUnLikePost()

    const { data: checkSavedPost } = useCheckSavedPost(postDetailData?.slug || '')
    const { data: checkLikedPost } = useCheckLikedPost(postDetailData?.slug || '')

    const formatTime = (date: any) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true, locale: vi })
    }
    const calculateReadingTime = (content: string) => {
        const wordsPerMinute = 200
        const words = content.trim().split(/\s+/).length
        return Math.ceil(words / wordsPerMinute)
    }
    //SAVE POST
    const handleUnSavePost = async () => postDetailData && (await unSavePost(postDetailData.slug))
    const handleSavePost = async () => postDetailData && (await savePost(postDetailData.slug))
    //LIKE POST
    const handleLikePost = async () => postDetailData && (await likePost(postDetailData?.slug))
    const handleUnLikePost = async () => postDetailData && (await unLikePost(postDetailData?.slug))

    if (isLoading) return <Loading />

    return (
        <div>
            <div className="flex flex-col gap-7 rounded-md bg-white p-7 md:flex-row">
                <div className="fixed hidden w-2/12 flex-col gap-5 md:flex">
                    <h3 className="border-b-2 py-2 text-xl font-bold">{postDetailData?.username}</h3>
                    <div className="flex items-center gap-5 font-medium text-darkGrey">
                        <div className="flex cursor-pointer items-center gap-1">
                            <div className="cursor-pointer">
                                {checkLikedPost?.action === 'unlike' ? (
                                    <PiHeartStraightFill onClick={handleUnLikePost} className="size-6 text-red-600" />
                                ) : (
                                    <PiHeartStraight onClick={handleLikePost} className="size-6" />
                                )}
                            </div>
                            <span>{postDetailData?.likes}</span>
                        </div>
                        <div className="flex cursor-pointer items-center gap-1">
                            <GoComment onClick={() => setIsOpen(true)} className="size-6" />
                            <span>{postDetailData?.count_comment}</span>
                        </div>
                    </div>
                </div>

                <div className="ms-0 flex w-full flex-col gap-10 md:ms-[25%] md:w-7/12">
                    <div className="">
                        <h1 className="text-3xl font-bold">{postDetailData?.title}</h1>
                        <div className="flex flex-col gap-10">
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <Avatar className="size-8 flex-shrink-0">
                                        <AvatarImage
                                            src={getImagesUrl(postDetailData?.avatar || '')}
                                            alt={postDetailData?.username}
                                        />
                                        <AvatarFallback className="flex size-8 items-center justify-center bg-slate-500/50 font-semibold">
                                            {postDetailData?.username.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <p className="text-[16px] font-semibold md:text-lg">
                                            {postDetailData?.username}
                                        </p>
                                        <div className="flex items-center gap-1 font-medium text-darkGrey">
                                            <p>{formatTime(postDetailData?.published_at)}</p>
                                            <LuDot />
                                            <p>{calculateReadingTime(postDetailData?.content ?? '')} phút đọc</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="cursor-pointer">
                                        {checkSavedPost?.action === 'unsave' ? (
                                            <FaBookmark onClick={handleUnSavePost} className="size-6 text-primary" />
                                        ) : (
                                            <FaRegBookmark onClick={handleSavePost} className="size-6" />
                                        )}
                                    </div>
                                    <div className="mb-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="mt-1">
                                                <BsThreeDots className="size-5" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                sideOffset={5}
                                                className="flex flex-col gap-3"
                                            >
                                                <DropdownMenuItem className="flex gap-2">
                                                    <FaFacebookSquare /> Chia sẻ lên Facebook
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="flex gap-2">
                                                    <MdEmail />
                                                    Chia sẻ tới Email
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="flex gap-2">
                                                    <FaLink />
                                                    Sao chép liên kết
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="flex gap-2">
                                                    <IoFlagSharp />
                                                    Báo cáo bài viết
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div
                                    className="flex flex-col gap-1 text-[16px] leading-loose"
                                    dangerouslySetInnerHTML={{ __html: postDetailData?.content || '' }}
                                />
                                <div className="flex gap-3">
                                    {postDetailData?.tags.map((tag, index) => (
                                        <span key={index} className="rounded-lg bg-grey px-4 py-2">
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mt-5 flex justify-between md:hidden">
                            <div className="flex items-center gap-5 font-medium text-darkGrey">
                                <div className="flex gap-1">
                                    <div className="cursor-pointer">
                                        {checkLikedPost?.action === 'unlike' ? (
                                            <PiHeartStraightFill
                                                onClick={handleUnLikePost}
                                                className="size-7 text-red-600"
                                            />
                                        ) : (
                                            <PiHeartStraight onClick={handleLikePost} className="size-7" />
                                        )}
                                    </div>
                                    <span>{postDetailData?.likes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <GoComment onClick={() => setIsOpen(true)} className="size-4" />
                                    <span>{postDetailData?.count_comment}</span>
                                </div>
                            </div>
                        </div>
                        <CommentPost
                            commentId={postDetailData?.id || 0}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                    </div>
                    {relatedPosts && relatedPosts.length > 0 && (
                        <Carousel className="w-full" opts={{ align: 'start' }}>
                            <div className="flex justify-between">
                                <h5 className="text-lg font-medium text-black md:text-xl">Bài viết cùng tác giả</h5>
                                <div className="flex w-20 gap-2 text-right">
                                    <CarouselPrevious className="!translate-y-0 !shadow-none" />
                                    <CarouselNext className="!translate-y-0 !shadow-none" />
                                </div>
                            </div>

                            <div className="w-full">
                                <CarouselContent className="w-full gap-4">
                                    {relatedPosts && relatedPosts.length > 0 && relatedPosts.map((post, index) => (
                                        <CarouselItem
                                            key={index}
                                            className="w-full min-w-0 basis-full md:basis-[367px]"
                                        >
                                            <PostOutStanding
                                                image={post.thumbnail}
                                                title={post.title}
                                                avatar={post.user.avatar}
                                                name={post.user.name}
                                                slug={post.slug}
                                                views={post.views}
                                                content={post.content}
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </div>
                        </Carousel>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PostDetail
