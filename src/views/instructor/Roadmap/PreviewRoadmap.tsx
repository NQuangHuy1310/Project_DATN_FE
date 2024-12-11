import { Dispatch, SetStateAction } from 'react'

import { IRoadmap } from '@/types/instructor'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { getImagesUrl } from '@/lib'

interface PreviewRoadmapProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    roadmap: IRoadmap | undefined
}

const PreviewRoadmap = ({ open, setOpen, roadmap }: PreviewRoadmapProps) => {
    return (
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
                            <div key={index} className="flex flex-col gap-2">
                                <div className="space-y-0.5">
                                    <h5 className="text-lg font-bold text-primary">{item.name}</h5>
                                    <p className="truncate text-sm text-muted-foreground">{item.description}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {item.courses.map((course) => (
                                        <div
                                            key={course.id}
                                            className="flex items-start gap-6 rounded-md border border-grey p-4"
                                        >
                                            <div className="h-[140px] w-[240px] flex-shrink-0">
                                                <img
                                                    src={getImagesUrl(course.thumbnail)}
                                                    alt={course.name}
                                                    className="h-full w-full rounded-md object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h6 className="text-base font-semibold">{course.name}</h6>
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
    )
}

export default PreviewRoadmap
