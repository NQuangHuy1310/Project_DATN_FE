import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaRegHeart, FaStar, FaStarHalfAlt } from 'react-icons/fa'

import routes from '@/configs/routes'
import noContent from '@/assets/no-content.jpg'
import { useGetCourses, useGetRatingsCourse } from '@/app/hooks/instructors'
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
import { formatDate, getImagesUrl } from '@/lib'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ratingCourse } from '@/types/instructor'
import { Textarea } from '@/components/ui/textarea'

const PerformanceRatings = () => {
    const navigate = useNavigate()
    const [courseId, setCourseId] = useState<number>()
    const [comment, setComment] = useState<ratingCourse>()
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const { data: courseData } = useGetCourses()
    const { data: ratingsData } = useGetRatingsCourse(courseId!)

    const handleSelectCourse = (value: string) => {
        setCourseId(+value)
    }

    useEffect(() => {
        if (courseData && courseData.data.length > 0) {
            setCourseId(courseData.data[0].id)
        }
    }, [courseData])

    return (
        <>
            <div>
                {courseData && courseData.data.length > 0 ? (
                    <div className="flex flex-col gap-5">
                        <Select onValueChange={handleSelectCourse} value={courseId?.toString()}>
                            <SelectTrigger className="flex w-[300px] items-center justify-between">
                                <SelectValue placeholder="Chọn khoá học" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Chọn khoá học</SelectLabel>
                                    {courseData.data.map((course) => (
                                        <SelectItem key={course.id} value={course.id.toString()}>
                                            {course.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

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
                        <Button size="lg" onClick={() => navigate(routes.createCourse)}>
                            Tạo khoá học mới
                        </Button>
                    </div>
                )}
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="rounded-lg p-6 shadow-lg sm:max-w-screen-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Phản hồi đánh giá</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-6">
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

                        <div className="flex items-center justify-center gap-3">
                            <Textarea placeholder="Nhập phản hồi ..." className="w-full max-w-md" autoFocus />
                            <Button size="lg">Gửi</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default PerformanceRatings
