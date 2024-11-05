import { IoMdStar } from 'react-icons/io'

import { Button } from '@/components/ui/button'
import { useGetRatingForCourse } from '@/app/hooks/ratings/useRating'
import Loading from '@/components/Common/Loading/Loading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getImagesUrl } from '@/lib'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { BiDislike, BiLike } from 'react-icons/bi'

interface IRating {
    idDetailCourse?: number
}

const Reviews = ({ idDetailCourse }: IRating) => {
    const { user } = useGetUserProfile()
    const { data: ratingData, isLoading } = useGetRatingForCourse(idDetailCourse ?? 0)
    if (isLoading) return <Loading />

    return (
        <div className="flex flex-col gap-7">
            {ratingData && ratingData.length > 0 ? (
                <div className="flex flex-col gap-7">
                    {ratingData?.slice(0, 3).map((rating, index) => (
                        <div key={index} className="flex w-full flex-col gap-7 py-3">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-2.5">
                                    <div className="flex items-center gap-2.5">
                                        <Avatar className="size-10">
                                            <AvatarImage
                                                src={getImagesUrl(user?.avatar || '')}
                                                alt={user?.name}
                                                className="h-full w-full object-cover"
                                            />
                                            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col gap-1">
                                            <h6 className="md:text-base">{user?.name}</h6>
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, starIndex) => (
                                                    <IoMdStar
                                                        key={starIndex}
                                                        className={`size-5 ${starIndex < rating.rate ? 'text-primary' : 'text-gray-300'}`}
                                                    />
                                                ))}
                                                <p className="ms-2">
                                                    {new Date(rating.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="mt-1">
                                        <BsThreeDotsVertical className="size-5" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" sideOffset={5}>
                                        <DropdownMenuItem>Báo cáo</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <p>{rating.content}</p>
                            <div className="flex items-center gap-2">
                                <span>Bạn thấy hữu ích? </span>
                                <div className="flex gap-2">
                                    <BiLike className="size-5" />
                                    <BiDislike className="size-5" />
                                </div>
                            </div>
                        </div>
                    ))}
                    <Dialog>
                        <DialogTrigger asChild>
                            <div>
                                <Button variant="outline" size="lg">
                                    Hiện thêm đánh giá
                                </Button>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="scrollbar-hide max-h-[90vh] max-w-[60vw] overflow-y-scroll">
                            <DialogHeader>
                                <DialogTitle>
                                    <div className="flex items-center gap-2">
                                        <IoMdStar className="size-7 text-primary" />
                                        <span className="text-2xl font-semibold">{ratingData?.length} đánh giá</span>
                                    </div>
                                </DialogTitle>
                            </DialogHeader>
                            <div className="scrollbar-hide flex flex-col gap-4">
                                {ratingData?.map((rating, index) => (
                                    <div key={index} className="flex w-full flex-col gap-7 border-b py-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col gap-2.5">
                                                <div className="flex items-center gap-2.5">
                                                    <Avatar className="size-10">
                                                        <AvatarImage
                                                            src={getImagesUrl(user?.avatar || '')}
                                                            alt={user?.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col gap-1">
                                                        <h6 className="md:text-base">{user?.name}</h6>
                                                        <div className="flex gap-1">
                                                            {[...Array(5)].map((_, starIndex) => (
                                                                <IoMdStar
                                                                    key={starIndex}
                                                                    className={`size-5 ${starIndex < rating.rate ? 'text-primary' : 'text-gray-300'}`}
                                                                />
                                                            ))}
                                                            <p className="ms-2">
                                                                {new Date(rating.created_at).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="mt-1">
                                                    <BsThreeDotsVertical className="size-5" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" sideOffset={5}>
                                                    <DropdownMenuItem>Báo cáo</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <p>{rating.content}</p>
                                        <div className="flex items-center gap-2">
                                            <span>Bạn thấy hữu ích? </span>
                                            <div className="flex gap-2">
                                                <BiLike className="size-5" />
                                                <BiDislike className="size-5" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            ) : (
                <div className="text-center text-lg">Chưa có đánh giá nào!</div>
            )}
        </div>
    )
}

export default Reviews
