import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import LessonCodingInfo from '@/components/shared/CourseContent/Lesson/LessonCoding/LessonCodingInfo'
import LessonCodingContent from '@/components/shared/CourseContent/Lesson/LessonCoding/LessonCodingContent'
import { Dispatch, SetStateAction } from 'react'

interface LessonCodingProps {
    open: boolean
    setOpenDialog: Dispatch<SetStateAction<boolean>>
}

const LessonCoding = ({ open, setOpenDialog }: LessonCodingProps) => {
    return (
        <Dialog open={open} onOpenChange={setOpenDialog}>
            <DialogContent
                className="flex h-full max-h-[90vh] w-full max-w-screen-2xl flex-col gap-2 overflow-hidden"
                aria-describedby={undefined}
            >
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Thêm Bài Tập Coding</DialogTitle>
                </DialogHeader>

                <div className="flex-shrink-0 overflow-y-auto">
                    <Tabs defaultValue="info" className="flex h-full w-full flex-col gap-4">
                        <TabsList className="flex items-center gap-4">
                            <TabsTrigger value="info">Thông tin chung</TabsTrigger>
                            <TabsTrigger value="content">Nội dung</TabsTrigger>
                        </TabsList>
                        <TabsContent value="info">
                            <LessonCodingInfo />
                        </TabsContent>
                        <TabsContent value="content">
                            <LessonCodingContent />
                        </TabsContent>
                    </Tabs>
                </div>

                <DialogFooter className="mt-auto">
                    <Button variant="destructive" onClick={() => setOpenDialog(false)}>
                        Huỷ
                    </Button>
                    <Button>Thêm mới bài tập</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default LessonCoding
