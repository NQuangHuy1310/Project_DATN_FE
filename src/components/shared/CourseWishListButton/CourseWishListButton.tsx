import { Link, useNavigate } from 'react-router-dom'

import routes from '@/configs/routes'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { FaRegHeart } from 'react-icons/fa'
import { useGetWishList, useUnWishList } from '@/app/hooks/courses/useCourse'
import { getImagesUrl } from '@/lib'
import { BsThreeDots } from 'react-icons/bs'
import { toast } from 'sonner'
import { TbCoinFilled } from 'react-icons/tb'

const CourseWishListButton = () => {
    const navigate = useNavigate()
    const { data: wishList } = useGetWishList(1, 5)
    const { mutateAsync: unWishList } = useUnWishList()
    const handleUnWishList = async (id: number) => {
        await unWishList(id)
        toast.success('Xóa khóa học yêu thích thành công!')
    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <FaRegHeart className="size-5 cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[400px]">
                    <DropdownMenuLabel className="flex items-center justify-between">
                        <p className="text-lg">Khóa học yêu thích</p>
                        <Link to={routes.wishList} className="text-sm font-normal">
                            Xem tất cả
                        </Link>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup className="scrollbar-hide flex max-h-[500px] flex-col gap-3 overflow-y-auto">
                        {wishList && wishList.data && wishList.data.length > 0 ? (
                            wishList.data.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(routes.courseDetail.replace(':slug', item.slug))}
                                    className="flex w-full cursor-pointer gap-2 rounded-md p-2 hover:bg-softGrey"
                                >
                                    <img
                                        className="w-28 rounded-md"
                                        src={getImagesUrl(item.thumbnail)}
                                        alt={item.name}
                                    />
                                    <div className="flex w-full flex-col gap-2">
                                        <p className="line-clamp-2 font-semibold">{item.name}</p>
                                        {item.is_course_bought === true ? (
                                            <div className="flex flex-col gap-2">
                                                <div className="flex h-1 w-full items-center overflow-hidden rounded bg-darkGrey/20">
                                                    <span
                                                        className={`block h-full ${
                                                            item.level === 'Sơ cấp'
                                                                ? 'bg-[#FFBB54]'
                                                                : item.level === 'Trung cấp'
                                                                  ? 'bg-[#25C78B]'
                                                                  : 'bg-red-600'
                                                        }`}
                                                        style={{ width: `${item.progress_percent}%` }}
                                                    ></span>
                                                    <span
                                                        className="block h-full bg-darkGrey/20"
                                                        style={{ width: `${100 - item.progress_percent}%` }}
                                                    ></span>
                                                </div>

                                                <span className="text-end text-[13px] font-medium">
                                                    {item.progress_percent}%
                                                </span>
                                            </div>
                                        ) : (
                                            <>
                                                {item?.price && item?.price != 0 ? (
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center gap-1">
                                                            {item?.price_sale && item?.price_sale != 0 ? (
                                                                <div className="flex items-center gap-1">
                                                                    <TbCoinFilled className="size-5 text-yellow-500" />
                                                                    <del className="text-[12px] font-semibold">
                                                                        {Math.floor(item?.price)}
                                                                    </del>
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center gap-1">
                                                                    <TbCoinFilled className="size-5 text-yellow-500" />
                                                                    <p className="text-[13px] font-semibold text-red-600">
                                                                        {Math.floor(item?.price)}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {item?.price_sale && item?.price_sale != 0 && (
                                                            <div className="flex items-center gap-1">
                                                                <TbCoinFilled className="size-5 text-yellow-500" />
                                                                <p className="text-[13px] font-semibold text-red-600">
                                                                    {Math.floor(item?.price_sale)}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-[13px] text-orange-500">Miễn phí</span>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <div className="mb-auto flex flex-shrink-0">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <BsThreeDots />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" sideOffset={5}>
                                                <DropdownMenuItem onClick={() => handleUnWishList(item.id)}>
                                                    Xóa
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col gap-2 px-2 py-4">
                                <span className="text-primary">Bạn chưa yêu thích khóa học nào</span>
                                <Link to={routes.course}>Khám phá khóa học</Link>
                            </div>
                        )}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default CourseWishListButton
