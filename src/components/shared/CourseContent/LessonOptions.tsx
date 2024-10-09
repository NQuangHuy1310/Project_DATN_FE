/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button'
import { lessonOptions } from '@/constants'
import { FiPlus } from 'react-icons/fi'

type lessonTypes = 'video' | 'document' | 'quizzes' | 'coding'

interface LessonOptionsProps {
    setLessonType: (type: lessonTypes | undefined) => void
}

const LessonOptions: React.FC<LessonOptionsProps> = ({ setLessonType }) => {
    return (
        <div className="flex items-center justify-start gap-5 rounded-md border-[1px] border-dashed border-black bg-white px-7 py-3">
            {lessonOptions.map((item, index) => (
                <div key={index}>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => setLessonType(item.type as lessonTypes)}
                    >
                        <FiPlus />
                        {item.name}
                    </Button>
                </div>
            ))}
        </div>
    )
}

export default LessonOptions
