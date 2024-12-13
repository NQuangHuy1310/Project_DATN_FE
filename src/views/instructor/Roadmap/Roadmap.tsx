import { toast } from 'sonner'
import { useState } from 'react'
import { HiDotsVertical } from 'react-icons/hi'

import { IRoadmap } from '@/types/instructor'
import { useDeleteRoadmap, useGetRoadmap } from '@/app/hooks/instructors'

import { getImagesUrl } from '@/lib'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import placeholderImage from '@/assets/placeholder.jpg'
import NoContent from '@/components/shared/NoContent/NoContent'
import AddRoadmap from '@/views/instructor/Roadmap/AddRoadmap'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import AddPhase from '@/views/instructor/Roadmap/AddPhase'
import Loading from '@/components/Common/Loading/Loading'
import PreviewRoadmap from '@/views/instructor/Roadmap/PreviewRoadmap'

const Roadmap = () => {
    const { data: roadmapData, isLoading } = useGetRoadmap()
    const { mutateAsync: deleteRoadmap, isPending } = useDeleteRoadmap()

    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [phaseDialog, setPhaseDialog] = useState<boolean>(false)
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
    const [openPreview, setOpenPreview] = useState<boolean>(false)
    const [roadmapId, setRoadmapId] = useState<number>(0)

    const handleDelete = async () => {
        if (!roadmapId) return
        await deleteRoadmap(roadmapId)
        setRoadmapId(0)
    }

    const handlePreview = (item: IRoadmap) => {
        if (item.phases.length === 0) {
            toast.warning('Lộ trình này hiện tại chưa có giai đoạn nào.', {
                description: 'Hãy thêm giai đoạn để bắt đầu!'
            })
            setRoadmapId(item.id)
            setPhaseDialog(true)
        } else {
            setOpenPreview(!openPreview)
            setRoadmapId(item.id)
        }
    }

    if (isLoading) return <Loading />

    return (
        <>
            <div className="flex flex-col gap-6">
                <div className="flex w-full items-center justify-between">
                    <div className="w-full max-w-[900px] space-y-3">
                        <h4 className="text-2xl font-extrabold">Lộ Trình Học Tập</h4>
                        <p className="text-sm">
                            Bạn sẽ thiết kế lộ trình học tập chi tiết, giúp học viên dễ dàng theo dõi và đạt được mục
                            tiêu học tập. Hãy chuẩn bị cho một lộ trình thú vị và bổ ích, nơi bạn sẽ phát triển kỹ năng
                            và kiến thức cần thiết để thành công!
                        </p>
                    </div>
                    <Button size="lg" onClick={() => setOpenDialog(true)}>
                        Thêm mới lộ trình
                    </Button>
                </div>

                <div className="space-y-1">
                    {roadmapData && roadmapData?.length > 0 && (
                        <h5 className="text-xl font-medium">Danh sách lộ trình của tôi</h5>
                    )}
                    <div className="flex flex-wrap items-center gap-5">
                        {roadmapData &&
                            roadmapData.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex h-[200px] w-[500px] items-start justify-between rounded-md border-2 border-softGrey p-4"
                                >
                                    <div className="flex h-full w-full max-w-[300px] flex-shrink-0 flex-col gap-1 overflow-hidden">
                                        <div className="flex h-fit flex-shrink-0 flex-col">
                                            <h6 className="text-lg font-semibold">{item.name}</h6>
                                            <p className="text-sm">{item.sort_description}</p>
                                        </div>
                                        <div className="mt-auto flex flex-1 items-end">
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    onClick={() => {
                                                        setPhaseDialog(!phaseDialog)
                                                    }}
                                                >
                                                    Thêm giai đoạn
                                                </Button>
                                                <Button
                                                    className="bg-secondaryGreen hover:bg-secondaryGreen/90"
                                                    size="sm"
                                                    onClick={() => {
                                                        handlePreview(item)
                                                    }}
                                                >
                                                    Xem chi tiết
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex h-full flex-col items-end justify-between">
                                        <div className="h-[100px] w-[100px] overflow-hidden rounded-full border-[4px] border-primary">
                                            <img
                                                src={item.thumbnail ? getImagesUrl(item.thumbnail) : placeholderImage}
                                                alt={item.name}
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button size="icon" variant="outline">
                                                    <HiDotsVertical className="size-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent side="bottom" align="end">
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setOpenDialog(!openDialog)
                                                        setRoadmapId(item.id)
                                                    }}
                                                >
                                                    Chỉnh sửa lộ trình
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setConfirmDialog(!confirmDialog)
                                                        setRoadmapId(item.id)
                                                    }}
                                                >
                                                    Xoá lộ trình
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            ))}
                        {roadmapData && roadmapData.length <= 0 && (
                            <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                                <NoContent description="Bạn chưa có lộ trình nào, tạo lộ trình mới" />
                                <Button onClick={() => setOpenDialog(true)}>Tạo lộ trình học tập</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <AddRoadmap
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                roadmapID={roadmapId}
                setRoadmapId={setRoadmapId}
            />
            <AddPhase open={phaseDialog} setOpen={setPhaseDialog} roadmapID={roadmapId} setRoadmapId={setRoadmapId} />
            <PreviewRoadmap open={openPreview} setOpen={setOpenPreview} roadmapID={roadmapId} />
            <ConfirmDialog
                title="Xoá lộ trình"
                isPending={isPending}
                description="Bạn có chắc chắn muốn xoá lộ trình này không?"
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                handleDelete={handleDelete}
            />
        </>
    )
}

export default Roadmap
