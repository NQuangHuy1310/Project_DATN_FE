import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaRegHeart, FaStar, FaStarHalfAlt } from 'react-icons/fa'

import routes from '@/configs/routes'
import noContent from '@/assets/no-content.jpg'
import { useGetCoursesApproved, useGetRatingsCourse, useRatingReply } from '@/app/hooks/instructors'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { formatDate, getImagesUrl, getVisiblePages } from '@/lib'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ICourseApproved, ratingCourse } from '@/types/instructor'
import { Textarea } from '@/components/ui/textarea'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'
import { ratingReply, ratingReplySchema } from '@/validations'

const PerformanceRatings = () => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        reset
    } = useForm<ratingReply>({
        resolver: zodResolver(ratingReplySchema)
    })
    const navigate = useNavigate()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const initialPage = parseInt(queryParams.get('page') || '1', 10)
    const [page, setPage] = useState(initialPage)

    const [courseId, setCourseId] = useState<number | undefined>(undefined)
    const [comment, setComment] = useState<ratingCourse>()
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const { data: courseData } = useGetCoursesApproved()
    const { data: ratingsData } = useGetRatingsCourse(courseId, 8, page, 4)
    const { mutateAsync } = useRatingReply()

    const handleSelectCourse = (value: string) => {
        if (value === 'all') {
            setCourseId(undefined)
        } else {
            setCourseId(+value)
        }
    }

    const handlePageChange = (newPage: number) => {
        if (newPage !== page && newPage >= 1 && newPage <= totalPages) {
            setPage(newPage)
        }
    }
    const totalPages = Math.ceil((ratingsData?.ratings.total ?? 0) / (ratingsData?.ratings?.per_page ?? 0))
    const visiblePages = getVisiblePages(totalPages, page, 5)

    const handleSubmitForm: SubmitHandler<ratingReply> = async (data) => {
        if (comment) await mutateAsync([comment?.id, data])
        reset()
        setOpenDialog(false)
    }

    return (
        <>
            <div>
                {courseData && courseData.length > 0 ? (
                    <div className="flex flex-col gap-5">
                        <div className="space-y-1">
                            <h6 className="mt-1 text-sm text-muted-foreground">Lựa chọn khoá học</h6>
                            <Select
                                onValueChange={handleSelectCourse}
                                value={courseId === undefined ? 'all' : courseId.toString()}
                            >
                                <SelectTrigger className="flex w-[300px] items-center justify-between">
                                    <SelectValue placeholder="Chọn khoá học" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Chọn khoá học</SelectLabel>
                                        <SelectItem value="all">Tất cả khoá học</SelectItem>
                                        {courseData.map((course: ICourseApproved) => (
                                            <SelectItem key={course.id} value={course.id.toString()}>
                                                {course.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-wrap items-center gap-5">
                            {ratingsData &&
                                ratingsData.ratings.data.length > 0 &&
                                ratingsData.ratings.data.map((rating) => {
                                    const fullStars = Math.floor(rating.rate)
                                    const hasHalfStar = rating.rate % 1 !== 0

                                    return (
                                        <div
                                            key={rating.id}
                                            className="flex h-[200px] w-full max-w-[360px] flex-col gap-4 overflow-hidden rounded-md border p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="size-10 cursor-pointer">
                                                        <AvatarImage
                                                            className="rounded-full object-cover"
                                                            src={getImagesUrl(rating.user.avatar || '')}
                                                            alt={rating.user.name}
                                                        />
                                                        <AvatarFallback className="rounded-full bg-slate-500/50 text-xl font-semibold text-white">
                                                            {rating.user.name.charAt(0)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <h3 className="text-lg font-semibold">{rating.user.name}</h3>
                                                        <p className="text-sm text-darkGrey">
                                                            {formatDate(rating.created_at)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <FaRegHeart className="size-5 cursor-pointer text-primary" />
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-1">
                                                    {Array.from({ length: 5 }, (_v, i) => {
                                                        if (i < fullStars) {
                                                            return <FaStar key={i} className="size-5 text-primary" />
                                                        }
                                                        if (hasHalfStar && i === fullStars) {
                                                            return (
                                                                <FaStarHalfAlt
                                                                    key={i}
                                                                    className="size-5 text-primary"
                                                                />
                                                            )
                                                        }
                                                        return <FaStar key={i} className="size-5 text-gray-300" />
                                                    })}
                                                </div>
                                                <h5 className="mt-2 line-clamp-1 text-base font-medium">
                                                    {rating.content}
                                                </h5>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <Button
                                                    onClick={() => {
                                                        setOpenDialog(!openDialog)
                                                        setComment(rating)
                                                    }}
                                                >
                                                    Phản hồi
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>

                        {ratingsData?.total_ratings === 0 && (
                            <div className="flex flex-col items-center justify-center gap-2">
                                <img src={noContent} alt="" />
                                <p className="text-base font-medium text-muted-foreground">
                                    Khoá học hiện tại chưa có đánh giá nào
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-2">
                        <img src={noContent} alt="" />
                        <p className="text-base font-medium text-muted-foreground">
                            Bạn chưa có khoá học nào, hãy tạo khoá học ngay.
                        </p>
                        <Button size="lg" onClick={() => navigate(routes.instructorDashboard)}>
                            Tạo khoá học mới
                        </Button>
                    </div>
                )}
                {totalPages > 1 && (
                    <div className="mt-4 flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => handlePageChange(page - 1)}
                                        className={page === 1 ? 'border' : 'cursor-pointer border bg-darkGrey/90'}
                                    />
                                </PaginationItem>

                                {visiblePages[0] > 1 && (
                                    <PaginationItem>
                                        <span className="px-2">...</span>
                                    </PaginationItem>
                                )}

                                {visiblePages.map((pageNumber: number) => (
                                    <PaginationItem key={pageNumber} className="cursor-pointer">
                                        <PaginationLink
                                            isActive={page === pageNumber}
                                            onClick={() => handlePageChange(pageNumber)}
                                        >
                                            {pageNumber}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                {visiblePages[visiblePages.length - 1] < totalPages && (
                                    <PaginationItem>
                                        <span className="px-2">...</span>
                                    </PaginationItem>
                                )}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => handlePageChange(page + 1)}
                                        className={
                                            page === totalPages ? 'border' : 'cursor-pointer border bg-darkGrey/90'
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="rounded-lg p-6 shadow-lg sm:max-w-screen-md" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Phản hồi đánh giá</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4 rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
                            <div className="flex items-start gap-4">
                                <Avatar className="size-10 cursor-pointer">
                                    <AvatarImage
                                        className="rounded-full object-cover"
                                        src={getImagesUrl(comment?.user.avatar || '')}
                                        alt={comment?.user.name}
                                    />
                                    <AvatarFallback className="rounded-full bg-slate-500/50 text-xl font-semibold text-white">
                                        {comment?.user.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-semibold">{comment?.user.name}</h3>
                                    <p className="text-sm text-gray-500">{formatDate(comment?.created_at ?? '')}</p>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }, (_v, i) => {
                                        if (comment) {
                                            const fullStars = Math.floor(comment.rate)
                                            const hasHalfStar = comment.rate % 1 !== 0

                                            if (i < fullStars) {
                                                return <FaStar key={i} className="size-5 text-primary" />
                                            }
                                            if (hasHalfStar && i === fullStars) {
                                                return <FaStarHalfAlt key={i} className="size-5 text-primary" />
                                            }
                                            return <FaStar key={i} className="size-5 text-gray-300" />
                                        }
                                        return null
                                    })}
                                </div>
                                <h5 className="mt-2 line-clamp-2 text-base font-medium text-gray-800">
                                    {comment?.content}
                                </h5>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-2">
                            <div className="w-full space-y-1">
                                <Textarea
                                    autoFocus
                                    {...register('reply')}
                                    className="w-full"
                                    placeholder="Nhập phản hồi của bạn ..."
                                    disabled={isSubmitting}
                                />
                                {errors.reply && (
                                    <div className="text-sm text-secondaryRed">{errors.reply.message}</div>
                                )}
                            </div>
                            <Button size="lg" disabled={isSubmitting}>
                                Trả lời
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default PerformanceRatings
