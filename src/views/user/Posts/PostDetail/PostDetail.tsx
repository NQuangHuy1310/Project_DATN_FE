import { getImagesUrl } from '@/lib'
import { useGetSlugParams } from '@/app/hooks/common/useCustomParams'

import { LuDot } from 'react-icons/lu'
import { MdEmail } from 'react-icons/md'
import { BsThreeDots } from 'react-icons/bs'
import { IoFlagSharp } from 'react-icons/io5'
import { CiBookmark } from 'react-icons/ci'
import { FaFacebookSquare, FaLink } from 'react-icons/fa'

import Loading from '@/components/Common/Loading/Loading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import Comment from './Comment'
import { useGetPost } from '@/app/hooks/posts'
import { useState } from 'react'
import { GoComment } from 'react-icons/go'
import { PiHeartStraight } from 'react-icons/pi'

const PostDetail = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [totalComment, setTotalComment] = useState<number>(0)

    const slug = useGetSlugParams('slug')
    const { data: postDetailData, isLoading } = useGetPost(slug!)

    const handleTotalComment = (total: number) => {
        setTotalComment(total)
    }
    if (isLoading) return <Loading />

    return (
        <div className="flex flex-col gap-7 rounded-md bg-white p-7 md:flex-row">
            <div className="fixed hidden w-2/12 flex-col gap-5 md:flex">
                <h3 className="border-b-2 py-2 text-xl font-bold">{postDetailData?.username}</h3>
                <div className="flex items-center gap-5 font-medium text-darkGrey">
                    <div className="flex gap-1">
                        <PiHeartStraight className="size-7" /> <span></span>
                    </div>
                    <div className="flex items-center gap-1">
                        <GoComment onClick={() => setIsOpen(true)} className="size-6" />
                        <span>{totalComment}</span>
                    </div>
                </div>
            </div>

            <div className="ms-0 flex w-full flex-col gap-10 md:ms-[25%] md:w-7/12">
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
                                <p className="text-[16px] font-semibold md:text-lg">{postDetailData?.username}</p>
                                <div className="flex items-center gap-1 font-medium text-darkGrey">
                                    <p>22 ngày trước </p>
                                    <LuDot />
                                    <p>6 phút đọc</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <CiBookmark className="size-6" />
                            <div className="mb-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="mt-1">
                                        <BsThreeDots className="size-5" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" sideOffset={5} className="flex flex-col gap-3">
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
            <div className="mt-5 flex justify-between md:hidden">
                <div className="flex items-center gap-5 font-medium text-darkGrey">
                    <div className="flex gap-1">
                        <PiHeartStraight className="size-6" /> <span>6</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <GoComment onClick={() => setIsOpen(true)} className="size-4" />
                        <span>6</span>
                    </div>
                </div>
            </div>
            <Comment
                postId={postDetailData?.id || 0}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onUpdateTotalComments={handleTotalComment}
            />
        </div>
    )
}

export default PostDetail
