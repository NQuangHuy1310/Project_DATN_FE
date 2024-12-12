import { Dispatch, SetStateAction, useState } from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'
import { HiMiniPencilSquare } from 'react-icons/hi2'

import { useDeletePhase, useGetDetailRoadmap } from '@/app/hooks/instructors'

import placeholder from '@/assets/placeholder.jpg'
import { getImagesUrl } from '@/lib'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import ConfirmDialog from '@/components/shared/ConfirmDialog'

interface PreviewRoadmapProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    roadmapID: number | undefined
}

const PreviewRoadmap = ({ open, setOpen, roadmapID }: PreviewRoadmapProps) => {
    const { mutateAsync: deletePhase } = useDeletePhase()
    const { data: roadmap } = useGetDetailRoadmap(roadmapID ?? 0)

    const [openDialogConfirm, setOpenDialogConfirm] = useState<boolean>(false)
    const [phaseId, setPhaseId] = useState<number | undefined>(undefined)

    const handleDeletePhase = async () => {
        if (phaseId) await deletePhase(phaseId)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[80vh] max-w-screen-lg overflow-y-auto" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>
                            Các giai đoạn trong lộ trình <span className="text-secondaryGreen">{roadmap?.name}</span>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-8">
                        {roadmap?.phases &&
                            roadmap.phases.map((item, index) => (
                                <div key={index} className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <h5 className="text-lg font-bold text-primary">{item.name}</h5>
                                            <p className="truncate text-sm text-muted-foreground">{item.description}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Button className="flex items-center gap-2" size="sm">
                                                <HiMiniPencilSquare />
                                                <span>Chỉnh sửa</span>
                                            </Button>
                                            <Button
                                                className="flex items-center gap-2"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => {
                                                    setOpenDialogConfirm(true)
                                                    setPhaseId(item.id)
                                                }}
                                            >
                                                <FaRegTrashCan />
                                                <span>Xoá</span>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {item.courses.map((course) => (
                                            <div
                                                key={course.id}
                                                className="flex items-start gap-6 overflow-hidden rounded-md border border-grey p-4"
                                            >
                                                <div className="h-[140px] w-[240px] flex-shrink-0">
                                                    <img
                                                        src={
                                                            course.thumbnail
                                                                ? getImagesUrl(course.thumbnail)
                                                                : placeholder
                                                        }
                                                        alt={course.name}
                                                        className="h-full w-full rounded-md object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-1 items-start justify-between overflow-hidden">
                                                    <div className="flex flex-col gap-1">
                                                        <h6 className="text-xl font-semibold">{course.name}</h6>
                                                        <p className="text-sm font-medium text-primary">
                                                            {course.price ?? 'Miễn phí'}
                                                        </p>
                                                        <p className="line-clamp-3 text-sm">
                                                            {course.description ?? 'Mô tả khoá học'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={() => setOpen(false)}>
                            Đóng
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <ConfirmDialog
                confirmDialog={openDialogConfirm}
                setConfirmDialog={setOpenDialogConfirm}
                title="Xoá giai đoạn"
                description="Xác nhận xoá giai đoạn trong lộ trình"
                isPending={false}
                handleDelete={handleDeletePhase}
            />
        </>
    )
}

export default PreviewRoadmap
