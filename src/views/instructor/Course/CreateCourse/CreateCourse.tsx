import { useEffect, useState, useCallback } from 'react'
import { FaCheckCircle } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import CourseOverview from '@/views/instructor/Course/CreateCourse/CourseOverview'
import Curriculum from '@/views/instructor/Course/CreateCourse/Curriculum'
import StudentGoals from '@/views/instructor/Course/CreateCourse/StudentGoals'
import { useNavigate, useParams } from 'react-router-dom'
import { useSubmitCourse } from '@/app/hooks/instructors'
import routes from '@/configs/routes'

type OptionKey = 'studentGoals' | 'curriculum' | 'courseOverview'

const CreateCourse = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { mutateAsync: submitCourse, isPending } = useSubmitCourse()

    const [isDataComplete, setIsDataComplete] = useState<Record<OptionKey, boolean>>({
        studentGoals: false,
        curriculum: false,
        courseOverview: false
    })

    const handleSetDataComplete = useCallback((key: OptionKey) => {
        setIsDataComplete((prev) => ({ ...prev, [key]: true }))
    }, [])

    const options = [
        {
            key: 'studentGoals' as OptionKey,
            label: 'Mục tiêu học viên',
            component: <StudentGoals setIsDataComplete={() => handleSetDataComplete('studentGoals')} />
        },
        {
            key: 'curriculum' as OptionKey,
            label: 'Chương trình giảng dạy',
            component: <Curriculum setIsDataComplete={() => handleSetDataComplete('curriculum')} />
        },
        {
            key: 'courseOverview' as OptionKey,
            label: 'Tổng quan khoá học',
            component: <CourseOverview setIsDataComplete={() => handleSetDataComplete('courseOverview')} />
        }
    ]

    const isAllComplete = Object.values(isDataComplete).every(Boolean)
    const [selectedKey, setSelectedKey] = useState<OptionKey>(options[0].key)

    const handleSubmit = async () => {
        await submitCourse(id!)
        navigate(routes.instructorDashboard)
    }

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault()
        }
        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [])

    return (
        <div className="flex gap-5">
            <div className="card flex h-fit w-[300px] flex-shrink-0 flex-col gap-4 border-[1px] border-softGrey shadow-md">
                {options.map((option) => (
                    <div
                        key={option.key}
                        className={`flex cursor-pointer items-center gap-3 rounded-md p-3 transition-all hover:bg-softGrey ${selectedKey === option.key ? 'bg-softGrey' : ''}`}
                        onClick={() => setSelectedKey(option.key)}
                    >
                        <p className="w-2/3 flex-shrink-0 text-sm font-medium">{option.label}</p>
                        {isDataComplete[option.key] && <FaCheckCircle className="size-4 flex-1 text-primary" />}
                    </div>
                ))}
                <Button disabled={!isAllComplete || isPending} onClick={handleSubmit}>
                    Gửi đi để xem xét
                </Button>
            </div>
            <div className="card flex-1 rounded-lg border-[1px] border-softGrey shadow-md">
                {options.find((option) => option.key === selectedKey)?.component}
            </div>
        </div>
    )
}

export default CreateCourse
