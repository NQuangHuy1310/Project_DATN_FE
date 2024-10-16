import { memo, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useGetModule } from '@/app/hooks/instructors'
import Loading from '@/components/Common/Loading/Loading'
import CourseContent from '@/components/shared/CourseContent'
import DialogAddModule from '@/components/shared/CourseContent/Dialog/DialogAddModule'

const Curriculum = memo(() => {
    const { id } = useParams()
    const { data: moduleData, isLoading } = useGetModule(id!)
    const [openDialog, setOpenDialog] = useState(false)

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
                        <CourseContent key={item.id} name={item.title} id={item.id} lessons={item.lessons} />
                    ))}

                <div>
                    <Button
                        className="flex items-center gap-1 text-muted-foreground"
                        variant="outline"
                        onClick={() => setOpenDialog(true)}
                    >
                        <FiPlus className="size-4 text-muted-foreground" /> Thêm chương
                    </Button>
                </div>
            </div>

            {/* Dialog add module */}
            <DialogAddModule id={id!} openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </div>
    )
})

export default Curriculum
