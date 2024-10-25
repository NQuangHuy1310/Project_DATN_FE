import { useState } from 'react'
import ReactQuill from 'react-quill'

import { getImagesUrl } from '@/lib'
import { formats, modules } from '@/constants/quillConstants'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'
import { useAddComment, useGetComment } from '@/app/hooks/posts'
import { useGetSlugParams } from '@/app/hooks/common/useCustomParams'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface IComment {
    isOpen: boolean
    postId: number
}

const Comment = ({ isOpen, postId }: IComment) => {
    const [content, setContent] = useState<string>('')
    const [isOpenComment, setIsOpenComment] = useState<boolean>(false)
    const [activeReply, setActiveReply] = useState<number | null>(null)

    const { user } = useGetUserProfile()
    const slug = useGetSlugParams('slug')
    const { data: comments } = useGetComment(slug!)

    const handleReplyClick = (id: number) => {
        if (activeReply === id) {
            setActiveReply(null)
        } else {
            setActiveReply(id)
        }
    }
    const { mutateAsync: addComment } = useAddComment()
    const handleAddComment = async () => {
        const payload = {
            id_user: user?.id,
            content: content,
            parent_id: activeReply,
            commentable_id: postId
        }
        await addComment(payload)
        setContent('')
        setIsOpenComment(false)
        setActiveReply(null)
    }

    return (
        <Sheet open={isOpen} onOpenChange={() => setIsOpenComment(!isOpenComment)}>
            <SheetContent>
                <div className="flex gap-3 p-3">
                    {isOpenComment ? (
                        <div className="flex gap-2">
                            <Avatar className="size-7 cursor-pointer md:size-10">
                                <AvatarImage
                                    className="object-cover"
                                    src={getImagesUrl(user?.avatar || '')}
                                    alt={user?.name}
                                />
                                <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                    {user?.avatar}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex w-full flex-col gap-2">
                                <div className="w-full">
                                    <ReactQuill
                                        theme="snow"
                                        formats={formats}
                                        modules={modules}
                                        value={content}
                                        onChange={setContent}
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button onClick={() => setIsOpenComment(false)} variant="outline">
                                        Hủy
                                    </Button>
                                    <Button onClick={handleAddComment}>Bình luận</Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex w-full gap-2">
                            <Avatar className="size-7 cursor-pointer md:size-10">
                                <AvatarImage
                                    className="object-cover"
                                    src={getImagesUrl(user?.avatar || '')}
                                    alt={user?.name}
                                />
                                <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                    {user?.avatar}
                                </AvatarFallback>
                            </Avatar>
                            <Input
                                onClick={() => setIsOpenComment(true)}
                                placeholder="Nhập bình luận của bạn ở đây"
                            />
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Bình luận</h3>
                    <div className="p-4">
                        <div className="">
                            {/* Render các bình luận cha (parent_id === null) */}
                            {comments?.filter((comment) => comment.parent_id === null).map((comment) => (
                                <div key={comment.id} className="flex flex-col gap-5">
                                    {/* Bình luận cha */}
                                    <div className="flex gap-2">
                                        <Avatar className="size-7 cursor-pointer md:size-10">
                                            <AvatarImage
                                                className="object-cover"
                                                src={getImagesUrl(comment?.avatar)}
                                                alt={comment.name}
                                            />
                                            <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                                {comment.name}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <div className="flex items-center">
                                                <p className="mr-2 font-semibold text-blue-600">
                                                    {comment.name}
                                                </p>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(comment.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: comment.content
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                                        <button className="font-medium text-primary">Thích</button>
                                        <button
                                            className="font-medium text-primary"
                                            onClick={() => handleReplyClick(comment.id)}
                                        >
                                            Phản hồi
                                        </button>
                                    </div>

                                    {/* Form phản hồi */}
                                    {activeReply === comment.id && (
                                        <div className="mt-4 flex gap-2">
                                            <Avatar className="size-7 cursor-pointer md:size-10">
                                                <AvatarImage
                                                    className="object-cover"
                                                    src={getImagesUrl(user?.avatar || '')}
                                                    alt={user?.name}
                                                />
                                                <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                                    {user?.avatar}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex w-full flex-col gap-2">
                                                <div className="w-full">
                                                    <ReactQuill
                                                        theme="snow"
                                                        formats={formats}
                                                        modules={modules}
                                                        value={content}
                                                        onChange={setContent}
                                                    />
                                                </div>
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        onClick={() => setActiveReply(null)}
                                                        variant="outline"
                                                    >
                                                        Hủy
                                                    </Button>
                                                    <Button onClick={handleAddComment}>
                                                        Bình luận
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>
                                                Xem {comment.children?.length} câu trả lời
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                {/* Render tất cả bình luận con */}
                                                {comment.children?.length > 0 && (
                                                    <div className="ms-10 mt-4 border-gray-300 ps-2">
                                                        {comment.children.map((child) => (
                                                            <div
                                                                key={child.id}
                                                                className="flex flex-col gap-5"
                                                            >
                                                                <div className="flex gap-2">
                                                                    <Avatar className="size-7 cursor-pointer md:size-10">
                                                                        <AvatarImage
                                                                            className="object-cover"
                                                                            src={getImagesUrl(
                                                                                child.avatar
                                                                            )}
                                                                            alt={child.name}
                                                                        />
                                                                        <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                                                            {child.name}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <div className="flex flex-col">
                                                                        <div className="flex items-center">
                                                                            <p className="mr-2 font-semibold text-blue-600">
                                                                                {child.name}
                                                                            </p>
                                                                            <span className="text-sm text-gray-500">
                                                                                {new Date(
                                                                                    child.created_at
                                                                                ).toLocaleDateString()}
                                                                            </span>
                                                                        </div>
                                                                        <div
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: child.content
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                                                                    <button className="font-medium text-primary">
                                                                        Thích
                                                                    </button>
                                                                    <button
                                                                        className="font-medium text-primary"
                                                                        onClick={() =>
                                                                            handleReplyClick(child.id)
                                                                        }
                                                                    >
                                                                        Phản hồi
                                                                    </button>
                                                                </div>

                                                                {/* Form phản hồi cho bình luận con */}
                                                                {activeReply === child.id && (
                                                                    <div className="mt-4 flex gap-2">
                                                                        <Avatar className="size-7 cursor-pointer md:size-10">
                                                                            <AvatarImage
                                                                                className="object-cover"
                                                                                src={getImagesUrl(
                                                                                    user?.avatar || ''
                                                                                )}
                                                                                alt={user?.name}
                                                                            />
                                                                            <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                                                                {user?.avatar}
                                                                            </AvatarFallback>
                                                                        </Avatar>
                                                                        <div className="flex w-full flex-col gap-2">
                                                                            <div className="w-full">
                                                                                <ReactQuill
                                                                                    theme="snow"
                                                                                    formats={formats}
                                                                                    modules={modules}
                                                                                    value={content}
                                                                                    onChange={
                                                                                        setContent
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div className="flex justify-end gap-2">
                                                                                <Button
                                                                                    onClick={() =>
                                                                                        setActiveReply(
                                                                                            null
                                                                                        )
                                                                                    }
                                                                                    variant="outline"
                                                                                >
                                                                                    Hủy
                                                                                </Button>
                                                                                <Button
                                                                                    onClick={
                                                                                        handleAddComment
                                                                                    }
                                                                                >
                                                                                    Bình luận
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {/* Render bình luận con của bình luận con nếu có */}
                                                                {child.children?.length > 0 && (
                                                                    <div className="mt-4 border-gray-300">
                                                                        {child.children.map(
                                                                            (grandChild) => (
                                                                                <div
                                                                                    key={grandChild.id}
                                                                                    className="flex flex-col gap-5"
                                                                                >
                                                                                    <div className="flex gap-2">
                                                                                        <Avatar className="size-7 cursor-pointer md:size-10">
                                                                                            <AvatarImage
                                                                                                className="object-cover"
                                                                                                src={getImagesUrl(
                                                                                                    grandChild.avatar
                                                                                                )}
                                                                                                alt={
                                                                                                    grandChild.name
                                                                                                }
                                                                                            />
                                                                                            <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                                                                                {
                                                                                                    grandChild.name
                                                                                                }
                                                                                            </AvatarFallback>
                                                                                        </Avatar>
                                                                                        <div className="flex flex-col">
                                                                                            <div className="flex items-center">
                                                                                                <p className="mr-2 font-semibold text-blue-600">
                                                                                                    {
                                                                                                        grandChild.name
                                                                                                    }
                                                                                                </p>
                                                                                                <span className="text-sm text-gray-500">
                                                                                                    {new Date(
                                                                                                        grandChild.created_at
                                                                                                    ).toLocaleDateString()}
                                                                                                </span>
                                                                                            </div>
                                                                                            <div
                                                                                                dangerouslySetInnerHTML={{
                                                                                                    __html: grandChild.content
                                                                                                }}
                                                                                            ></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                                                                                        <button className="font-medium text-primary">
                                                                                            Thích
                                                                                        </button>
                                                                                        <button
                                                                                            className="font-medium text-primary"
                                                                                            onClick={() =>
                                                                                                handleReplyClick(
                                                                                                    grandChild.id
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            Phản hồi
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>

    )
}

export default Comment
