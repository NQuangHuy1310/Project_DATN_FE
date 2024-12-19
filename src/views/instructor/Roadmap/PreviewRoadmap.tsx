import { Dispatch, SetStateAction } from 'react'
import { useGetDetailRoadmap } from '@/app/hooks/instructors'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import PhaseItem from '@/views/instructor/Roadmap/PhaseItem'

interface PreviewRoadmapProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    roadmapID: number | undefined
}

const PreviewRoadmap = ({ open, setOpen, roadmapID }: PreviewRoadmapProps) => {
    const { data: roadmap } = useGetDetailRoadmap(roadmapID ?? 0)

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
                            roadmap.phases.map((item, index) => {
                                return <PhaseItem key={index} phase={item} roadmapId={roadmapID!} />
                            })}
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={() => setOpen(false)}>
                            Đóng
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default PreviewRoadmap
