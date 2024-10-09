import { Button } from '@/components/ui/button'
import { FaPen, FaRegTrashAlt } from 'react-icons/fa'
import { FaCircleCheck, FaBars } from 'react-icons/fa6'

const LessonItem = () => {
    return (
        <div className="group flex items-center justify-between rounded-lg bg-white px-4 py-2.5">
            <div className="flex items-start justify-center gap-4">
                <div className="flex h-[36px] items-center justify-center gap-2">
                    <FaCircleCheck />
                    <h4 className="text-base font-medium">Tên bài giảng: "Tên here"</h4>
                </div>
                <div className="hidden gap-2 group-hover:flex">
                    <Button size="icon" variant="ghost">
                        <FaPen className="size-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                        <FaRegTrashAlt className="size-4" />
                    </Button>
                </div>
            </div>
            <div className="flex cursor-all-scroll group-hover:block">
                <FaBars className="size-4" />
            </div>
        </div>
    )
}

export default LessonItem
