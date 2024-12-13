import { FaRegTrashCan } from 'react-icons/fa6'
import { HiMiniPencilSquare } from 'react-icons/hi2'

import placeholder from '@/assets/placeholder.jpg'
import { Button } from '@/components/ui/button'
import { IPlases } from '@/types/instructor'
import { getImagesUrl } from '@/lib'
import { useState } from 'react'
import { useDeletePhase } from '@/app/hooks/instructors'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import AddPhase from '@/views/instructor/Roadmap/AddPhase'

interface PhaseItemProps {
    phase: IPlases
    roadmapId: number
}

const PhaseItem = ({ phase, roadmapId }: PhaseItemProps) => {
    const { mutateAsync: deletePhase } = useDeletePhase()

    const [openDialogConfirm, setOpenDialogConfirm] = useState<boolean>(false)
    const [phaseId, setPhaseId] = useState<number | undefined>(undefined)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const handleDeletePhase = async () => {
        if (phaseId) await deletePhase(phaseId)
    }

    return (
        <>
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <h5 className="text-xl font-bold text-primary">{phase.name}</h5>
                        <p className="truncate text-sm text-muted-foreground">{phase.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button className="flex items-center gap-2" size="sm" onClick={() => setIsEdit(!isEdit)}>
                            <HiMiniPencilSquare />
                            <span>Chỉnh sửa</span>
                        </Button>
                        <Button
                            className="flex items-center gap-2"
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                                setOpenDialogConfirm(true)
                                setPhaseId(phase.id)
                            }}
                        >
                            <FaRegTrashCan />
                            <span>Xoá</span>
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    {phase.courses.map((course) => (
                        <div
                            key={course.id}
                            className="flex items-center gap-6 overflow-hidden rounded-md border border-grey p-4"
                        >
                            <div className="h-[140px] w-[240px] flex-shrink-0">
                                <img
                                    src={course.thumbnail ? getImagesUrl(course.thumbnail) : placeholder}
                                    alt={course.name}
                                    className="h-full w-full rounded-md object-cover"
                                />
                            </div>
                            <div className="flex flex-1 items-start justify-between overflow-hidden">
                                <div className="flex flex-col gap-1">
                                    <h6 className="text-xl font-semibold">{course.name}</h6>
                                    <p className="text-sm font-semibold text-primary">{course.price ?? 'Miễn phí'}</p>
                                    <div
                                        className="line-clamp-2 text-sm"
                                        dangerouslySetInnerHTML={{ __html: course.description }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ConfirmDialog
                confirmDialog={openDialogConfirm}
                setConfirmDialog={setOpenDialogConfirm}
                title="Xoá giai đoạn"
                description="Xác nhận xoá giai đoạn trong lộ trình"
                isPending={false}
                handleDelete={handleDeletePhase}
            />

            <AddPhase open={isEdit} setOpen={setIsEdit} roadmapID={roadmapId} phaseData={phase} />
        </>
    )
}

export default PhaseItem
