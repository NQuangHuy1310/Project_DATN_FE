import { Progress } from '@/components/ui/progress'
import { CourseLevel } from '@/constants'

const CourseProgress = ({
    progressLesson,
    totalLesson,
    level
}: {
    progressLesson: number
    totalLesson: number
    level: string
}) => {
    return (
        <div className="w-full">
            {level === CourseLevel.Beginner && (
                <Progress value={(progressLesson / totalLesson) * 100} className="bg-secondaryGreen" />
            )}
            {level === CourseLevel.Intermediate && (
                <Progress value={(progressLesson / totalLesson) * 100} className="bg-secondaryYellow" />
            )}
            {level === CourseLevel.Master && (
                <Progress value={(progressLesson / totalLesson) * 100} className="bg-secondaryRed" />
            )}

            <div className="text-xm my-2 flex justify-between font-medium text-black">
                <p>
                    {progressLesson}/{totalLesson} Bài học
                </p>
                <p>{((progressLesson / totalLesson) * 100).toFixed(0)}%</p>
            </div>
        </div>
    )
}

export default CourseProgress
