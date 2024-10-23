import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { toast } from 'sonner'
import ReactQuill from 'react-quill'

import { Button } from '@/components/ui/button'
import useFormatTime from '@/app/hooks/common/useFomatTime'
import { useDeleteNote, useGetAllNote, useUpdateNote } from '@/app/hooks/courses/useNote'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'

import { FaPen } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

const AllNoteCourse = ({
    open,
    isOpen,
    id_course,
    checkNote
}: {
    open: boolean
    isOpen: (open: boolean) => void
    id_course: number
    checkNote: boolean
}) => {
    const [updateContent, setUpdateContent] = useState<{ [key: number]: boolean }>({})
    const [content, setContent] = useState<{ [key: number]: string }>({})
    const [searchParams, setSearchParams] = useSearchParams()

    // State cho popup xác nhận xóa
    const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; noteId: number | null }>({
        open: false,
        noteId: null
    })

    const { data: noteCourse, refetch } = useGetAllNote(id_course)
    const { mutateAsync: updateNoteCourse } = useUpdateNote()
    const { mutateAsync: deleteNoteCourse } = useDeleteNote()

    useEffect(() => {
        if (checkNote) {
            refetch()
        }
    }, [checkNote, refetch])

    const handleUpdateContent = (index: number, currentContent?: string) => {
        setUpdateContent((prev) => ({ ...prev, [index]: !prev[index] }))
        setContent((prev) => ({ ...prev, [index]: currentContent! }))
    }

    const handleLessonClick = useCallback(
        (lessonId: number) => {
            setSearchParams({ id: lessonId.toString() })
            isOpen(false)
        },
        [setSearchParams, isOpen]
    )

    const handleUpdateNote = async (idNote: number, index: number) => {
        await updateNoteCourse([
            idNote,
            {
                content: content[index]!,
                _method: 'PUT'
            }
        ])
        refetch()
        handleUpdateContent(index)
        toast.success('Cập nhật ghi chú thành công')
    }

    const openConfirmDeletePopup = (idNote: number) => {
        setConfirmDelete({ open: true, noteId: idNote })
    }

    const handleDeleteNote = async () => {
        if (confirmDelete.noteId !== null) {
            await deleteNoteCourse([confirmDelete.noteId])
            refetch()
            toast.success('Xóa ghi chú thành công')
            setConfirmDelete({ open: false, noteId: null }) // Đóng popup
        }
    }

    const listAllNote = () => {
        return noteCourse?.map((item, index) => (
            <div key={index} className="relative flex flex-col gap-2">
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <span className="block rounded-full bg-primary px-3 py-1 text-xs text-white">
                            {useFormatTime(item.duration)}
                        </span>
                        <h2
                            onClick={() => handleLessonClick(item.id_lesson)}
                            className="cursor-pointer text-base font-medium text-primary"
                        >
                            {item.lesson_title}
                        </h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaPen
                            onClick={() => handleUpdateContent(index, item.content)}
                            className="size-4 cursor-pointer text-darkGrey/50 duration-200 hover:text-darkGrey"
                        />
                        <div className="relative">
                            <MdDelete
                                className="size-5 cursor-pointer text-darkGrey/50 duration-200 hover:text-darkGrey"
                                onClick={() => openConfirmDeletePopup(item.id)} // Mở popup xác nhận
                            />
                            {confirmDelete.open && confirmDelete.noteId === item.id && (
                                <div className="absolute -top-8 right-0 z-50 w-32 rounded border bg-white p-2 shadow-md">
                                    <p className="text-center text-xs">Bạn có chắc chắn muốn xóa?</p>
                                    <div className="mt-2 flex justify-between">
                                        <Button
                                            onClick={() => setConfirmDelete({ open: false, noteId: null })}
                                            variant="destructive"
                                            className="h-8 px-2 py-[2px] text-[10px]"
                                        >
                                            Hủy
                                        </Button>
                                        <Button onClick={handleDeleteNote} className="h-8 px-2 py-[2px] text-[10px]">
                                            Xóa
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {updateContent[index] ? (
                    <div className="flex flex-col gap-2">
                        <div>
                            <ReactQuill
                                value={content[index]}
                                onChange={(val) => setContent((prev) => ({ ...prev, [index]: val }))}
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button onClick={() => handleUpdateContent(index)} variant="destructive">
                                Hủy
                            </Button>
                            <Button onClick={() => handleUpdateNote(item.id, index)}>Cập nhật</Button>
                        </div>
                    </div>
                ) : (
                    <div
                        className="rounded-xl bg-darkGrey/10 px-3 py-4"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                    ></div>
                )}
            </div>
        ))
    }

    return (
        <Sheet open={open} onOpenChange={() => isOpen(false)}>
            <SheetContent className="flex flex-col gap-4">
                <SheetTitle className="text-lg">Ghi chú của tôi</SheetTitle>
                <SheetDescription className="scrollbar-hide flex max-h-screen flex-col gap-5 overflow-y-auto">
                    {noteCourse && noteCourse.length > 0 ? listAllNote() : <div>Không có ghi chú nào</div>}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default AllNoteCourse
