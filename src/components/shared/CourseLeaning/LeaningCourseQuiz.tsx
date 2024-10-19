import { ILessonLeaning } from '@/types'
import { Dispatch, SetStateAction } from 'react'

const LeaningCourseQuiz = ({
    dataLesson,
    setCheckButton
}: {
    dataLesson: ILessonLeaning
    setCheckButton: Dispatch<SetStateAction<boolean>>
}) => {
    console.log(dataLesson)
    return <div>Đây là quiz</div>
}

export default LeaningCourseQuiz
