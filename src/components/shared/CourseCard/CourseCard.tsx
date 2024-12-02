import { useState } from 'react'
import { format } from 'date-fns'
import { BsThreeDots } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import { useDeleteCourse, useDisableCourse, useEnableCourse } from '@/app/hooks/instructors'

import placeholderImage from '@/assets/placeholder.jpg'
import routes from '@/configs/routes'
import { getImagesUrl, truncate } from '@/lib'
import { ICourseItem } from '@/types/instructor'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import ConfirmDialog from '@/components/shared/ConfirmDialog'

const courseStatus = (status: string) => {
    return (
        <strong>
            {status === 'draft' && 'Bản nháp'}
            {status === 'approved' && 'Đã phê duyệt'}
            {status === 'pending' && 'Chờ phê duyệt'}
            {status === 'rejected' && 'Từ chối phê duyệt'}
        </strong>
    )
}

const CourseCard = ({ name, id, status, thumbnail, submited_at: submittedAt, category, is_active }: ICourseItem) => {
    const navigate = useNavigate()

    const { mutateAsync: deleteCourse, isPending } = useDeleteCourse()
    const { mutateAsync: disableCourse } = useDisableCourse()
    const { mutateAsync: enableCourse } = useEnableCourse()
    const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false)
    const thumbnailImage = getImagesUrl(thumbnail ?? '')
    const formatDate = submittedAt ? format(new Date(submittedAt), 'dd/MM/yyyy') : 'Chưa đăng ký'

    const redirectToCourse = () => {
        const courseRoute = routes.createCourse.replace(':id', id.toString())
        navigate(courseRoute)
    }

    const handleActiveCourse = async () => {
        if (is_active === 1) {
            await disableCourse(id.toString())
        } else {
            await enableCourse(id.toString())
        }
    }

    const handleDeleteCourse = async () => {
        await deleteCourse(id.toString())
        setIsShowConfirm(false)
    }

    return (
        <>
            <div className="flex h-fit w-full max-w-[380px] flex-col items-start gap-4 rounded-md border-[1px] p-3">
                <div className="h-[180px] w-full flex-shrink-0">
                    <img
                        src={thumbnail ? thumbnailImage : placeholderImage}
                        alt={name}
                        className="h-full w-full rounded-md object-cover"
                        loading="lazy"
                    />
                </div>

                <div className="flex w-full flex-1 items-start justify-between">
                    <div className="flex flex-col items-center">
                        <div className="flex w-[300px] flex-shrink-0 flex-col gap-1">
                            <h4 className="text-xl font-semibold">{truncate(name, 25)}</h4>
                            <div className="flex flex-col items-start gap-1">
                                <p className="text-sm">
                                    Danh mục: <strong>{category.name}</strong>
                                </p>
                                <p className="text-sm">
                                    Ngày đăng ký: <strong>{formatDate}</strong>
                                </p>
                                <p className="text-sm">Trạng thái: {courseStatus(status)}</p>
                            </div>
                        </div>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="p-3">
                            <BsThreeDots className="size-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" sideOffset={5}>
                            <DropdownMenuItem onClick={redirectToCourse}>Chỉnh sửa khoá học</DropdownMenuItem>
                            <DropdownMenuItem>Xem trước khoá học</DropdownMenuItem>
                            {status === 'approved' ? (
                                <DropdownMenuItem onClick={handleActiveCourse}>
                                    {is_active === 0 ? 'Hiển thị' : 'Ẩn'} khoá học
                                </DropdownMenuItem>
                            ) : null}
                            {status === 'draft' && (
                                <DropdownMenuItem onClick={() => setIsShowConfirm(true)}>Xóa khoá học</DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <ConfirmDialog
                title="Xác nhận xoá khoá học"
                isPending={isPending}
                description="Bạn có chắc chắn muốn xoá khóa học này? Hành động này sẽ không thể hoàn tác và tất cả dữ liệu liên quan sẽ bị xóa."
                confirmDialog={isShowConfirm}
                setConfirmDialog={setIsShowConfirm}
                handleDelete={handleDeleteCourse}
            />
        </>
    )
}

export default CourseCard
