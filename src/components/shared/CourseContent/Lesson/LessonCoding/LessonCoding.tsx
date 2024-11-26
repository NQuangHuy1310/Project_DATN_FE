import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import LessonCodingInfo from '@/components/shared/CourseContent/Lesson/LessonCoding/LessonCodingInfo'

const LessonCoding = () => {
    return (
        <Dialog open={true}>
            <DialogContent
                className="flex h-[80%] max-w-screen-xl flex-col items-center justify-center gap-3"
                aria-describedby={undefined}
            >
                <DialogHeader className="h-fit">
                    <DialogTitle className="text-xl font-semibold">Thêm Bài Tập Coding</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="info" className="flex h-full w-full flex-col items-center gap-4">
                    <TabsList className="flex items-center gap-4">
                        <TabsTrigger value="info">Thông tin chung</TabsTrigger>
                        <TabsTrigger value="content">Nội dung</TabsTrigger>
                        <TabsTrigger value="guidelines">Hướng dẫn</TabsTrigger>
                    </TabsList>
                    <TabsContent value="info">
                        <LessonCodingInfo />
                    </TabsContent>
                    <TabsContent value="content"></TabsContent>
                    <TabsContent value="guidelines"></TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

export default LessonCoding
