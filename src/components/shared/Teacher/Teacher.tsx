import { Link } from 'react-router-dom'
import { IoMdStar } from 'react-icons/io'
import { CiViewList } from 'react-icons/ci'

import routes from '@/configs/routes'
import { ITeacher } from '@/types'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getImagesUrl } from '@/lib'

const Teacher = ({ name, avatar, total_courses, total_ratings, id, ratings_avg_rate }: ITeacher) => {
    const { user } = useGetUserProfile()
    const detailInstructorUrl = id ? routes.instructorDetail.replace(':id', id.toString()) : ''

    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (user?.id === id) {
            event.preventDefault()
        }
    }

    const stars = [...Array(5)].map((_, index) => {
        const fullStar = index < Math.floor(ratings_avg_rate!)
        const halfStar = index === Math.floor(ratings_avg_rate!) && ratings_avg_rate! % 1 !== 0
        return { fullStar, halfStar }
    })
    return (
        <div className="flex w-full flex-col gap-6 overflow-hidden rounded-lg bg-white p-5 shadow-md hover:shadow-[0px_40px_100px_0px_#0000000d] hover:transition-all md:w-[360px] md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-y-4">
                <Link
                    to={`${detailInstructorUrl}`}
                    onClick={handleLinkClick}
                    className="flex flex-shrink-0 items-center gap-3 truncate"
                >
                    <Avatar className="size-7 md:size-9">
                        <AvatarImage src={getImagesUrl(avatar)} alt={name} />
                        <AvatarFallback className="flex items-center justify-center bg-slate-500/50 font-semibold">
                            {name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <h4 className="text-sm font-semibold md:text-sm">{name}</h4>
                    </div>
                </Link>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <CiViewList className="size-4 text-darkGrey md:size-5" />
                    <p className="text-xs font-medium md:text-sm">{total_courses} Khoá học</p>
                </div>
                <div className="flex items-center gap-1">
                    <span className="ml-1 font-semibold">
                        {Number(ratings_avg_rate) % 1 === 0
                            ? Math.floor(Number(ratings_avg_rate))
                            : Number(ratings_avg_rate).toFixed(1)}
                    </span>

                    {stars.map((star, starIndex) => (
                        <div key={starIndex} className="relative">
                            <IoMdStar className="size-4 text-gray-300" />
                            {star.fullStar && <IoMdStar className="absolute left-0 top-0 size-4 text-primary" />}
                            {star.halfStar && (
                                <IoMdStar
                                    className="absolute left-0 top-0 size-4 text-primary"
                                    style={{ clipPath: 'inset(0 50% 0 0)' }}
                                />
                            )}
                        </div>
                    ))}

                    <span className="ml-1 text-darkGrey font-medium">({total_ratings})</span>
                </div>
            </div>
        </div>
    )
}

export default Teacher
