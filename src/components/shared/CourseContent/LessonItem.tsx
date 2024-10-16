import { FaBars } from 'react-icons/fa6'
import { IoIosDocument } from 'react-icons/io'
import { FaRegCirclePlay } from 'react-icons/fa6'
import { FaPen, FaRegTrashAlt } from 'react-icons/fa'

import { ILesson } from '@/types/instructor'
import { Button } from '@/components/ui/button'

const LessonItem = ({ title, content_type }: ILesson) => {
    return (
        <div className="flex items-center justify-between gap-4 rounded-lg bg-white px-4 py-2.5">
            <div className="flex w-full items-start justify-between gap-4">
                <div className="flex h-[36px] items-center justify-start gap-2">
                    {content_type === 'document' && <IoIosDocument className="size-5 text-primary" />}
                    {content_type === 'video' && <FaRegCirclePlay className="size-5 text-primary" />}
                    <h4 className="text-base font-medium">
                        Tên bài giảng: <strong>{title}</strong>
                    </h4>
                </div>
                <div className="block gap-2">
                    <Button size="icon" variant="ghost">
                        <FaPen className="size-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                        <FaRegTrashAlt className="size-4" />
                    </Button>
                </div>
            </div>
            <div className="block cursor-all-scroll">
                <FaBars className="size-4" />
            </div>
        </div>
    )
}

export default LessonItem
