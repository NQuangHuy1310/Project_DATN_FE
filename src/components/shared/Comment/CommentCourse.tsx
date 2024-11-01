import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ReactQuill from 'react-quill'

import { getImagesUrl } from '@/lib'
import { formats, modules } from '@/constants/quillConstants'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'

import { useGetIdParams } from '@/app/hooks/common/useCustomParams'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useAddCommentCourse, useGetCommentCourse } from '@/app/hooks/courses/useCourse'

interface IComment {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    commentId: number
    onUpdateTotalComments?: ((total: number) => void | undefined)
}

const CommentCourse = ({ isOpen, setIsOpen, commentId, onUpdateTotalComments }: IComment) => {
    const [contentMap, setContentMap] = useState<{ [key: number]: string }>({})
    const [isOpenComment, setIsOpenComment] = useState<boolean>(false)
    const [activeReply, setActiveReply] = useState<number | null>(null)
    const [parentCommentId, setParentCommentId] = useState<number | null>(null)

    const { user } = useGetUserProfile()
    const id = useGetIdParams('id')
    const { data: comments } = useGetCommentCourse(id!)
    const totalComment = comments?.length
    const handleReplyClick = (commentId: number, parentId?: number) => {
        setActiveReply(commentId)
        const rootParentId = parentId || commentId
        setParentCommentId(rootParentId)
    }


    const { mutateAsync: addComment } = useAddCommentCourse()
    const handleAddComment = async (commentIds: number) => {
        if (user?.id) {
            const payload = {
                id_user: user?.id,
                content: contentMap[commentIds] || '',
                parent_id: parentCommentId,
                commentable_id: commentId
            }
            await addComment(payload)
            setContentMap((prevContent) => ({
                ...prevContent,
                [commentId]: ''
            }))
            setActiveReply(null)
            setParentCommentId(null)
            setIsOpenComment(false)
        }
    }

    const handleContentChange = (commentId: number, value: string) => {
        setContentMap((prevContent) => ({
            ...prevContent,
            [commentId]: value
        }))
    }

    useEffect(() => {
        if (comments) {
            onUpdateTotalComments?.(comments.length!)
        }
    }, [comments, onUpdateTotalComments])

    return (
        <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
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
                                    {user?.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex w-full flex-col gap-2">
                                <div className="w-full">
                                    <ReactQuill
                                        theme="snow"
                                        formats={formats}
                                        modules={modules}
                                        value={contentMap[commentId] || ''}
                                        onChange={(value) => handleContentChange(commentId, value)}
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button onClick={() => setIsOpenComment(false)} variant="outline">
                                        Hủy
                                    </Button>
                                    <Button onClick={() => handleAddComment(commentId)}>Bình luận</Button>
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
                                    {user?.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <Input onClick={() => setIsOpenComment(true)} placeholder="Nhập bình luận của bạn ở đây" />
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="text-lg font-semibold">{totalComment} Bình luận</h3>
                    <div className="scrollbar-hide max-h-[600px] overflow-y-scroll p-4">
                        <div className="flex flex-col gap-5">
                            {comments
                                ?.filter((comment) => comment.parent_id === null)
                                .map((comment) => (
                                    <div key={comment.id} className="flex flex-col gap-3">
                                        <div className="flex gap-2">
                                            <Avatar className="size-7 cursor-pointer md:size-10">
                                                <AvatarImage
                                                    className="object-cover"
                                                    src={getImagesUrl(comment?.avatar)}
                                                    alt={comment.name}
                                                />
                                                <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                                    {comment.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <p className="mr-2 font-semibold text-blue-600">{comment.name}</p>
                                                <span className="text-sm text-darkGrey">
                                                    {new Date(comment.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: comment.content
                                            }}
                                        ></div>
                                        <div className="flex items-center gap-4 text-sm text-darkGrey">
                                            <button className="font-medium text-primary">Thích</button>
                                            <button
                                                className="font-medium text-primary"
                                                onClick={() => handleReplyClick(comment.id)}
                                            >
                                                Phản hồi
                                            </button>
                                        </div>
                                        {activeReply === comment.id && (
                                            <div className="mt-4 flex gap-2">
                                                <Avatar className="size-7 cursor-pointer md:size-10">
                                                    <AvatarImage
                                                        className="object-cover"
                                                        src={getImagesUrl(user?.avatar || '')}
                                                        alt={user?.name}
                                                    />
                                                    <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                                        {user?.name.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex w-full flex-col gap-2">
                                                    <div className="w-full">
                                                        <ReactQuill
                                                            theme="snow"
                                                            formats={formats}
                                                            modules={modules}
                                                            value={contentMap[comment.id] || ''}
                                                            onChange={(value) => handleContentChange(comment.id, value)}
                                                        />
                                                    </div>
                                                    <div className="flex justify-end gap-2">
                                                        <Button onClick={() => setActiveReply(null)} variant="outline">
                                                            Hủy
                                                        </Button>
                                                        <Button onClick={() => handleAddComment(comment.id)}>
                                                            Bình luận
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value="item-1">
                                                {comment.children.length > 0 ? (
                                                    <AccordionTrigger>
                                                        Xem {comment.children?.length} câu trả lời
                                                    </AccordionTrigger>
                                                ) : (
                                                    ''
                                                )}
                                                <AccordionContent>
                                                    {comments
                                                        ?.filter((child) => child.parent_id === comment.id)
                                                        .map((child) => (
                                                            <div
                                                                key={child.id}
                                                                className="my-2 ms-10 flex flex-col gap-3 pl-4"
                                                            >
                                                                <div className="flex gap-2">
                                                                    <Avatar className="size-7 cursor-pointer md:size-10">
                                                                        <AvatarImage
                                                                            className="object-cover"
                                                                            src={getImagesUrl(child.avatar)}
                                                                            alt={child.name}
                                                                        />
                                                                        <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                                                            {child.name.charAt(0)}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <div className="flex flex-col">
                                                                        <p className="mr-2 font-semibold text-blue-600">
                                                                            {child.name}
                                                                        </p>
                                                                        <span className="text-sm text-darkGrey">
                                                                            {new Date(
                                                                                child.created_at
                                                                            ).toLocaleDateString()}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: child.content
                                                                    }}
                                                                ></div>
                                                                <div className="flex items-center gap-4 text-sm text-darkGrey">
                                                                    <button className="font-medium text-primary">
                                                                        Thích
                                                                    </button>
                                                                    <button
                                                                        className="font-medium text-primary"
                                                                        onClick={() => handleReplyClick(child.id, comment.id)}
                                                                    >
                                                                        Phản hồi
                                                                    </button>
                                                                </div>
                                                                {activeReply === child.id && (
                                                                    <div className="mt-4 flex gap-2">
                                                                        <Avatar className="size-7 cursor-pointer md:size-10">
                                                                            <AvatarImage
                                                                                className="object-cover"
                                                                                src={getImagesUrl(user?.avatar || '')}
                                                                                alt={user?.name}
                                                                            />
                                                                            <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                                                                {user?.name.charAt(0)}
                                                                            </AvatarFallback>
                                                                        </Avatar>
                                                                        <div className="flex w-full flex-col gap-2">
                                                                            <div className="w-full">
                                                                                <ReactQuill
                                                                                    theme="snow"
                                                                                    formats={formats}
                                                                                    modules={modules}
                                                                                    value={contentMap[child.id] || ''}
                                                                                    onChange={(value) =>
                                                                                        handleContentChange(child.id, value)
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div className="flex justify-end gap-2">
                                                                                <Button
                                                                                    onClick={() => setActiveReply(null)}
                                                                                    variant="outline"
                                                                                >
                                                                                    Hủy
                                                                                </Button>
                                                                                <Button onClick={() => handleAddComment(child.id)}>
                                                                                    Bình luận
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
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

export default CommentCourse
