import { Button } from '@/components/ui/button'
import CourseOverview from '@/views/instructor/Course/CreateCourse/CourseOverview'
import Curriculum from '@/views/instructor/Course/CreateCourse/Curriculum'
import StudentGoals from '@/views/instructor/Course/CreateCourse/StudentGoals'
import { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'

const CreateCourse = () => {
    const [selectedKey, setSelectedKey] = useState<string | null>(null)

    const options = [
        { key: 'studentGoals', label: 'Mục tiêu học viên', component: <StudentGoals /> },
        { key: 'curriculum', label: 'Chương trình giảng dạy', component: <Curriculum /> },
        { key: 'courseOverview', label: 'Tổng quan khoá học', component: <CourseOverview /> }
    ]

    useEffect(() => {
        const handleBeforeUnLoad = (event: BeforeUnloadEvent) => {
            event.preventDefault()
        }
        window.addEventListener('beforeunload', handleBeforeUnLoad)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnLoad)
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
                        <FaCheckCircle className="size-4 flex-1 text-primary" />
                    </div>
                ))}
                <Button>Gửi đi để xem xét</Button>
            </div>
            <div className="card flex-1 rounded-lg border-[1px] border-softGrey shadow-md">
                {selectedKey ? (
                    options.find((option) => option.key === selectedKey)?.component
                ) : (
                    <p className="flex h-full items-center justify-center text-center text-base font-semibold">
                        Vui lòng chọn một mục.
                    </p>
                )}
            </div>
        </div>
    )
}

export default CreateCourse
