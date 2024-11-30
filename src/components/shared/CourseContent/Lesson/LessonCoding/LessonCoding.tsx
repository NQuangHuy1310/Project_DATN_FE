import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import LessonCodingInfo from '@/components/shared/CourseContent/Lesson/LessonCoding/LessonCodingInfo'
import LessonCodingContent from '@/components/shared/CourseContent/Lesson/LessonCoding/LessonCodingContent'
import { Dispatch, SetStateAction } from 'react'
import { useGetLessonDetail } from '@/app/hooks/instructors'

interface LessonCodingProps {
    open: boolean
    moduleId?: number
    lessonId?: number
    setOpenDialog: Dispatch<SetStateAction<boolean>>
}

const LessonCoding = ({ open, setOpenDialog, moduleId, lessonId }: LessonCodingProps) => {
    const { data: lessonData } = useGetLessonDetail(lessonId ?? 0)

    const lessonInfoData = {
        title: lessonData?.title ?? '',
        language: lessonData?.lessonable.language ?? '',
        description: lessonData?.description ?? ''
    }

    const lessonCodingContent = {
        statement: lessonData?.lessonable.statement ?? '',
        hints: lessonData?.lessonable.hints ?? '',
        sample_code: lessonData?.lessonable.sample_code ?? '',
        output: lessonData?.lessonable.output ?? '',
        language: lessonData?.lessonable.language ?? ''
    }

    return (
        <Dialog open={open} onOpenChange={setOpenDialog}>
            <DialogContent
                className="flex h-full max-h-[90vh] w-full max-w-screen-2xl flex-col gap-2 overflow-hidden"
                aria-describedby={undefined}
            >
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Thêm Bài Tập Coding</DialogTitle>
                </DialogHeader>

                <div className="overflow-y-auto">
                    <Tabs defaultValue="info" className="flex h-full w-full flex-col gap-4">
                        <TabsList className="flex items-center gap-4">
                            <TabsTrigger value="info">Thông tin chung</TabsTrigger>
                            <TabsTrigger value="content">Nội dung</TabsTrigger>
                        </TabsList>
                        <TabsContent value="info">
                            <LessonCodingInfo
                                moduleId={moduleId!}
                                setVisible={setOpenDialog}
                                lessonData={lessonInfoData!}
                                lessonId={lessonId}
                            />
                        </TabsContent>
                        <TabsContent value="content">
                            <LessonCodingContent
                                lessonData={lessonCodingContent}
                                lessonId={lessonId}
                                setVisible={setOpenDialog}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LessonCoding
