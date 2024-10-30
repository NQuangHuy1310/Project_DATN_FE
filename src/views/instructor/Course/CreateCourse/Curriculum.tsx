import { FiPlus } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import { memo, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { useGetModule } from '@/app/hooks/instructors'
import Loading from '@/components/Common/Loading/Loading'
import CourseContent from '@/components/shared/CourseContent'

export interface selectedModule {
    name: string
    description: string
    id: string
}

const Curriculum = memo(({ setIsDataComplete }: { setIsDataComplete: () => void }) => {
    const { id } = useParams()
    const { data: moduleData, isLoading } = useGetModule(id!)
    const [openDialog, setOpenDialog] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const [selectedItem, setSelectedItem] = useState<selectedModule>()

    useEffect(() => {
        if (moduleData && moduleData.modules.length >= 5 && !isComplete) {
            setIsDataComplete()
            setIsComplete(true)
        }
    }, [setIsDataComplete, moduleData, isComplete])

    if (isLoading) {
        return <Loading />
    }

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
                />

                <div>
                    <Button
                        className="flex items-center gap-1 text-muted-foreground"
                        variant="outline"
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
