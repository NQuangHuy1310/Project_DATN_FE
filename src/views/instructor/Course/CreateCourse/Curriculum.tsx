import { FiPlus } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import { memo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { useGetModule } from '@/app/hooks/instructors'
import Loading from '@/components/Common/Loading/Loading'
import CourseContent from '@/components/shared/CourseContent'
import { ICourseStatus } from '@/types/instructor'
import { canEditCourse } from '@/lib'

export interface selectedModule {
    name: string
    description: string
    id: string
}

const Curriculum = memo(({ status }: { status: ICourseStatus }) => {
    const { id } = useParams()
    const { data: moduleData, isLoading } = useGetModule(id!)
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedItem, setSelectedItem] = useState<selectedModule>()
    const canEdit = canEditCourse(status)

    if (isLoading) return <Loading />

    return (
        <div className="flex flex-col gap-5 rounded-lg p-5">
            <div className="flex items-center justify-between border-b-2 border-gray-300 pb-5">
                <h4 className="text-2xl font-semibold capitalize">Chương trình giảng dạy</h4>
            </div>

            <div className="flex flex-col gap-5">
                <CourseContent
                    moduleData={moduleData!}
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    selectedItem={selectedItem!}
                    setSelectedItem={setSelectedItem}
                    canEdit={canEdit}
                />

                <div>
                    <Button
                        disabled={!canEdit}
                        variant="outline"
                        className="flex items-center gap-1 text-muted-foreground"
                        onClick={() => {
                            setOpenDialog(true)
                            setSelectedItem(undefined)
                        }}
                    >
                        <FiPlus className="size-4 text-muted-foreground" /> Thêm chương
                    </Button>
                </div>
            </div>
        </div>
    )
})

export default Curriculum
