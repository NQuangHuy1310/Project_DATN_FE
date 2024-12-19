import { Link } from 'react-router-dom'

import { IoIosStar } from 'react-icons/io'
import { FaRegUser } from 'react-icons/fa'
import { IoTimeOutline } from 'react-icons/io5'
import { FaRegCirclePlay } from 'react-icons/fa6'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'

import Loading from '@/components/Common/Loading/Loading'
import { Button } from '@/components/ui/button'
import useFormatTime from '@/app/hooks/common/useFomatTime'
import { CourseLevel } from '@/components/shared/Course/CourseLevel'
import { getImagesUrl } from '@/lib'
import { useGetSlugParams } from '@/app/hooks/common/useCustomParams'
import { useGetCertification } from '@/app/hooks/others'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { backendUrl } from '@/configs/baseUrl'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'

const Certification = () => {
    const code = useGetSlugParams('code')

    const { user } = useGetUserProfile()

    const { data: detailCertification, isLoading } = useGetCertification(code!)

    const image = getImagesUrl(detailCertification?.image_url!)

    if (isLoading) return <Loading />

    const handleDownload = async (type: string) => {
        const token = localStorage.getItem('access_token')
        fetch(`${backendUrl}certificates/${code}/download-certificate?type=${type}`, {
            headers: {
                'Content-Type': `application/${type}`,
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.blob())
            .then((data) => {
                const url = window.URL.createObjectURL(data)
                const a = document.createElement('a')
                a.href = url
                a.download = `${detailCertification?.course.name}.${type}`
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
            })
    }
    return (
        <div className="flex w-full gap-8">
            <img src={image} className="w-full !max-w-[60vw]" alt="" />
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">Người nhận giấy chứng nhận</h3>
                    <div className="flex w-fit items-center gap-2">
                        <Avatar className="size-8 flex-shrink-0">
                            <AvatarImage
                                className="rounded-full"
                                src={getImagesUrl(user?.avatar || '')}
                                alt={user?.name}
                            />
                            <AvatarFallback className="flex size-8 items-center justify-center rounded-full bg-slate-500/50 font-semibold">
                                {user?.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <p className="flex-1 text-base">{user?.name}</p>
                    </div>
                </div>
                <Link
                    to={`/course/${detailCertification?.course?.slug}`}
                    className="card flex h-fit w-full cursor-text flex-col gap-4 shadow-md hover:shadow-[0px_40px_100px_0px_#0000000d] hover:transition-all md:w-[360px]"
                >
                    <div className="relative h-[160px] flex-shrink-0 cursor-pointer">
                        <img
                            src={getImagesUrl(detailCertification?.course?.thumbnail!)}
                            alt={detailCertification?.course?.name}
                            className="h-full w-full rounded-lg object-cover"
                        />
                        <div className="absolute bottom-2.5 left-2.5">
                            <CourseLevel courseLevel={detailCertification?.course?.level!} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <h3 className="text-overflow cursor-pointer text-base font-bold text-black md:text-lg">
                            {detailCertification?.course?.name}
                        </h3>
                        {detailCertification?.course?.price && detailCertification?.course?.price != 0 ? (
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    <RiMoneyDollarCircleFill className="size-4 text-orange-500" />
                                    {detailCertification?.course?.price_sale &&
                                    detailCertification?.course?.price_sale != 0 ? (
                                        <del>{Math.floor(detailCertification?.course?.price)}</del>
                                    ) : (
                                        <p>{Math.floor(detailCertification?.course?.price)}</p>
                                    )}
                                </div>
                                {detailCertification?.course?.price_sale &&
                                    detailCertification?.course?.price_sale != 0 && (
                                        <p className="font-semibold text-red-600">
                                            {Math.floor(detailCertification?.course?.price_sale)}
                                        </p>
                                    )}
                            </div>
                        ) : (
                            <span className="text-orange-500">Miễn phí</span>
                        )}

                        <div className="flex items-center justify-between">
                            {detailCertification?.course?.user && (
                                <div className="flex w-fit items-center gap-2">
                                    <Avatar className="size-8 flex-shrink-0">
                                        <AvatarImage
                                            src={getImagesUrl(detailCertification?.course?.user?.avatar || '')}
                                            alt={detailCertification?.course?.user.name}
                                        />
                                        <AvatarFallback className="flex size-8 items-center justify-center rounded-full bg-slate-500/50 font-semibold">
                                            {detailCertification?.course?.user.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <p className="flex-1">{detailCertification?.course?.user.name}</p>
                                </div>
                            )}
                            <div className="flex items-center gap-1">
                                <IoIosStar className="size-5 text-primary" />
                                <span>5</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <FaRegUser className="size-4 text-darkGrey" />
                                <p className="font-medium text-black">{detailCertification?.course?.total_student}</p>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <FaRegCirclePlay className="size-4 text-darkGrey" />
                                <p className="font-medium text-black">{detailCertification?.course?.total_lessons}</p>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <IoTimeOutline className="size-4 text-darkGrey" />
                                <p className="font-medium text-black">
                                    {useFormatTime(detailCertification?.course?.duration!)}
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button>Tải xuống</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                            <DropdownMenuGroup className="flex items-center gap-2">
                                <Button onClick={() => handleDownload('pdf')}>PDF</Button>
                                <Button onClick={() => handleDownload('jpg')}>JPG</Button>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}

export default Certification
