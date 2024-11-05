import { useState } from 'react'
import { format } from 'date-fns'
import { BsThreeDots } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import routes from '@/configs/routes'
import { getImagesUrl } from '@/lib'
import { ICourseItem } from '@/types/instructor'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { useDeleteCourse, useDisableCourse, useEnableCourse } from '@/app/hooks/instructors'

const CourseCard = ({ name, id, status, thumbnail, submited_at: submittedAt, category, is_active }: ICourseItem) => {
    const navigate = useNavigate()
    const { mutateAsync: deleteCourse, isPending } = useDeleteCourse()
    const { mutateAsync: disableCourse } = useDisableCourse()
    const { mutateAsync: enableCourse } = useEnableCourse()
    const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false)
    const thumbnailImage = getImagesUrl(thumbnail ?? '')
    const formatDate = submittedAt ? format(new Date(submittedAt), 'dd/MM/yyyy') : 'Chưa đăng ký'

    const redirectToCourse = (type: string) => {
        const courseRoute = routes.createCourse.replace(':id', id.toString()).concat(`?type=${type}`)
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
            <div className="flex max-w-[1200px] items-center gap-4 overflow-hidden rounded-md border-[1px]">
                <div className="h-[140px] w-[140px] flex-shrink-0">
                    <img
                        src={thumbnail ? thumbnailImage : 'https://s.udemycdn.com/course/200_H/placeholder.jpg'}
                        alt={name}
                        className="h-full w-full rounded-md object-cover"
                    />
                </div>
                <div className="flex h-[120px] w-full flex-1 items-start justify-between gap-20">
                    <div className="mt-2 flex flex-col items-center">
                        <div className="flex w-[300px] flex-shrink-0 flex-col gap-1">
                            <h4 className="text-xl font-semibold">{name}</h4>
                            <div className="flex flex-col items-start gap-1">
                                <p className="text-sm">
                                    Danh mục: <strong>{category.name}</strong>
                                </p>
                                <p className="text-sm">
                                    Ngày đăng ký: <strong>{formatDate}</strong>
                                </p>
                                <p className="text-sm">
                                    Trạng thái:{' '}
                                    <strong>
                                        {status === 'draft' && 'Bản nháp'}
                                        {status === 'approved' && 'Đã phê duyệt'}
                                        {status === 'pending' && 'Chờ phê duyệt'}
                                        {status === 'rejected' && 'Từ chối phê duyệt'}
                                    </strong>
                                </p>
                            </div>
                        </div>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="mt-1 p-3">
                            <BsThreeDots className="size-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" sideOffset={5}>
                            <DropdownMenuItem onClick={() => redirectToCourse(status)}>
                                Chỉnh sửa khoá học
                            </DropdownMenuItem>
                            <DropdownMenuItem>Xem trước khoá học</DropdownMenuItem>
                            {status === 'approved' ? (
                                <DropdownMenuItem onClick={handleActiveCourse}>
                                    {is_active === 0 ? 'Hiển thị' : 'Ẩn'} khoá học
                                </DropdownMenuItem>
                            ) : null}
                            <DropdownMenuItem onClick={() => setIsShowConfirm(true)}>Xóa khoá học</DropdownMenuItem>
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
