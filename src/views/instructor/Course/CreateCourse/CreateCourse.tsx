import { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'

import routes from '@/configs/routes'
import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { useGetManageMenu, useSubmitCourse } from '@/app/hooks/instructors'
import CourseOverview from '@/views/instructor/Course/CreateCourse/CourseOverview'
import Curriculum from '@/views/instructor/Course/CreateCourse/Curriculum'
import StudentGoals from '@/views/instructor/Course/CreateCourse/StudentGoals'

type OptionKey = 'course_target' | 'course_curriculum' | 'course_overview'

const alertMessages = {
    pending: {
        title: 'Thông báo: Không thể chỉnh sửa khóa học',
        description: (
            <>
                Hiện tại, khóa học của bạn đã được gửi đi và đang <strong>chờ xác nhận</strong>.
                <br />
                Vui lòng theo dõi thông báo từ hệ thống để biết thêm thông tin. Nếu cần hỗ trợ, đừng ngần ngại liên hệ
                với chúng tôi.
            </>
        )
    },
    approved: {
        title: 'Thông báo: Không thể chỉnh sửa khóa học',
        description: (
            <>
                Khóa học của bạn đã được <strong>xác nhận</strong> và không thể chỉnh sửa tại thời điểm này.
                <br />
                Nếu bạn cần thực hiện bất kỳ thay đổi nào, vui lòng liên hệ với bộ phận hỗ trợ để được hướng dẫn.
            </>
        )
    }
}

const CreateCourse = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { mutateAsync: submitCourse, isPending } = useSubmitCourse()
    const { data: manageMenu } = useGetManageMenu(id!)
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const options = [
        {
            key: 'course_target' as OptionKey,
            label: 'Mục tiêu học viên',
            component: <StudentGoals status={manageMenu?.course_status} />
        },
        {
            key: 'course_curriculum' as OptionKey,
            label: 'Chương trình giảng dạy',
            component: <Curriculum status={manageMenu?.course_status} />
        },
        {
            key: 'course_overview' as OptionKey,
            label: 'Tổng quan khoá học',
            component: <CourseOverview status={manageMenu?.course_status} />
        }
    ]

    const [selectedKey, setSelectedKey] = useState<OptionKey>(options[0].key)
    const isAllComplete = options.every((option) => manageMenu && manageMenu[option.key])

    const handleSubmit = async () => {
        const courseStatus = manageMenu ? manageMenu?.course_status : 'draft'
        await submitCourse([id!, { status: courseStatus! }])
        if (courseStatus === 'draft') {
            navigate(routes.instructorDashboard)
        }
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

    useEffect(() => {
        if (manageMenu?.course_status === 'pending' || manageMenu?.course_status === 'approved') {
            setOpenDialog(true)
        }
    }, [manageMenu?.course_status])

    return (
        <>
            <div className="flex gap-5">
                <div className="card flex h-fit w-[300px] flex-shrink-0 flex-col gap-4 border-[1px] border-softGrey shadow-md">
                    {options.map((option) => (
                        <div
                            key={option.key}
                            className={`flex cursor-pointer items-center gap-3 rounded-md p-3 transition-all hover:bg-softGrey ${selectedKey === option.key ? 'bg-softGrey' : ''}`}
                            onClick={() => setSelectedKey(option.key)}
                        >
                            <p className="w-2/3 flex-shrink-0 text-sm font-medium">{option.label}</p>
                            {manageMenu && manageMenu[option.key] && (
                                <FaCheckCircle className="size-4 flex-1 text-primary" />
                            )}
                        </div>
                    ))}
                    {manageMenu?.course_status === 'draft' && (
                        <Button disabled={!isAllComplete || isPending} onClick={handleSubmit}>
                            Gửi đi để xem xét
                        </Button>
                    )}

                    {manageMenu?.course_status === 'rejected' && (
                        <Button disabled={!isAllComplete || isPending} onClick={handleSubmit}>
                            Gửi lại thông tin khoá học
                        </Button>
                    )}
                </div>
                <div className="card flex-1 rounded-lg border-[1px] border-softGrey shadow-md">
                    {options.find((option) => option.key === selectedKey)?.component}
                </div>
            </div>

            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {manageMenu?.course_status === 'pending'
                                ? alertMessages.pending.title
                                : alertMessages.approved.title}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {manageMenu?.course_status === 'pending'
                                ? alertMessages.pending.description
                                : alertMessages.approved.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setOpenDialog(false)}>Xác nhận</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default CreateCourse
