import { Link, useNavigate } from 'react-router-dom'
import { FaRegUser } from 'react-icons/fa'
import { IoTimeOutline } from 'react-icons/io5'
import { FaRegCirclePlay } from 'react-icons/fa6'

import routes from '@/configs/routes'
import { Button } from '@/components/ui/button'
import { CourseLevel } from '@/components/shared/Course/CourseLevel'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ICourseToday } from '@/types/course/course'
import { formatDuration, getImagesUrl } from '@/lib'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'
import { TbCoinFilled } from 'react-icons/tb'

const CourseToday = ({
    thumbnail,
    name,
    slug,
    user,
    level,
    total_student,
    total_duration_video,
    price,
    price_sale,
    page,
    total_lessons
}: ICourseToday) => {
    const { user: currentUser } = useGetUserProfile()
    const navigate = useNavigate()
    const totalTime = formatDuration((total_duration_video as unknown as number) || 0)
    return (
        <div className="card flex w-full max-w-full cursor-text flex-col gap-4 p-4 hover:shadow-[0px_40px_100px_0px_#0000000d] hover:transition-all lg:max-w-[360px] xl:max-w-[400px] xl:p-7 2xl:max-w-[400px]">
            <div className="relative h-[160px] flex-shrink-0 cursor-pointer">
                <img src={getImagesUrl(thumbnail)} alt={name} className="h-full w-full rounded-lg object-cover" />
                <div className="absolute bottom-2.5 left-2.5">
                    <CourseLevel courseLevel={level!} />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-overflow cursor-pointer text-base font-bold text-black xl2:text-lg">{name}</h3>
                {price && price != 0 ? (
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            {price_sale && price_sale != 0 ? (
                                <div className="flex items-center gap-1">
                                   <TbCoinFilled className="size-5 text-yellow-500" />
                                    <del className="text-[12px] font-semibold">
                                        {Math.floor(price)}
                                    </del>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1">
                                   <TbCoinFilled className="size-5 text-yellow-500" />
                                    <p className="text-base font-semibold text-red-600">
                                        {Math.floor(price)}
                                    </p>
                                </div>
                            )}
                        </div>
                        {price_sale && price_sale != 0 && (
                            <div className="flex items-center gap-1">
                               <TbCoinFilled className="size-5 text-yellow-500" />
                                <p className="text-base font-semibold text-red-600">
                                    {Math.floor(price_sale)}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <span className="text-base font-semibold text-orange-500">Miễn phí</span>
                )}
                <div className="flex items-center gap-2">
                    <Link to="" className="flex w-full items-center gap-2.5">
                        <Avatar className="size-8 flex-shrink-0">
                            <AvatarImage src={getImagesUrl(user?.avatar as string) || ''} alt={user?.name} />
                            <AvatarFallback className="flex size-8 items-center justify-center bg-slate-500/50 font-semibold">
                                {user?.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <p className="w-fit text-sm font-medium xl2:text-base">{user?.name}</p>
                    </Link>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <FaRegUser className="size-4 text-darkGrey" />
                        <p className="font-medium text-black">{total_student}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <FaRegCirclePlay className="size-4 text-darkGrey" />
                        <p className="font-medium text-black">{total_lessons}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <IoTimeOutline className="size-4 text-darkGrey" />
                        <p className="font-medium text-black">{total_duration_video ? totalTime : 0}</p>
                    </div>
                </div>
            </div>

            {user?.id !== currentUser?.id && (
                <div className="w-full">
                    {price == 0 ? (
                        <Button className='w-full' onClick={() => navigate(routes.login)}>Đăng ký ngay</Button>
                    ) : page === routes.courseDetailNoLogin || page === routes.courseDetail ? (
                        <Link
                            className="block w-full rounded-md bg-primary py-2 text-center text-white"
                            to={routes.login}
                        >
                            Mua khoá học
                        </Link>
                    ) : (
                        <Link to={routes.courseDetail.replace(':slug', slug)} className="block w-full rounded-md bg-primary py-2 text-center text-white">Xem chi tiết</Link>
                    )}
                </div>
            )}
        </div>
    )
}

export default CourseToday
