import { memo, useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useGetModule } from '@/app/hooks/instructors'
import Loading from '@/components/Common/Loading/Loading'
import CourseContent from '@/components/shared/CourseContent'
import DialogAddModule from '@/components/shared/CourseContent/Dialog/DialogAddModule'

const Curriculum = memo(({ setIsDataComplete }: { setIsDataComplete: () => void }) => {
    const { id } = useParams()
    const { data: moduleData, isLoading } = useGetModule(id!)
    const [openDialog, setOpenDialog] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const [selectedItem, setSelectedItem] = useState<{ name: string; description: string; id: string }>()

    const handleChangeModule = (value: { name: string; description: string; id: string }) => {
        setOpenDialog(true)
        setSelectedItem(value)
    }

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
        <div className="rounded-lg p-5">
            <div className="flex items-center justify-between border-b-2 border-gray-300 pb-5">
                <h4 className="text-2xl font-semibold capitalize">Chương trình giảng dạy</h4>
            </div>

            <div className="mt-4 flex flex-col gap-7">
                {moduleData &&
                    moduleData.modules &&
                    moduleData.modules.map((item) => (
                        <CourseContent
                            id={item.id}
                            key={item.id}
                            name={item.title}
                            lessons={item.lessons}
                            quiz={item.quiz}
                            description={item.description}
                            handleSelectedItem={handleChangeModule}
                        />
                    ))}

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

            {/* Dialog add module */}
            <DialogAddModule
                id={id!}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                selectedData={selectedItem}
            />
        </div>
    )
})

export default Curriculum
