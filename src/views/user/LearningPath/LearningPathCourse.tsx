import { useGetSlugParams } from '@/app/hooks/common/useCustomParams'
import { useGetCourseLearningPath } from '@/app/hooks/others'
import Loading from '@/components/Common/Loading/Loading'
import { CourseLevel } from '@/components/shared/Course/CourseLevel'
import { Button } from '@/components/ui/button'
import routes from '@/configs/routes'
import { getImagesUrl } from '@/lib'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

const LearningPathCourse = () => {
    const navigate = useNavigate()
    const slug = useGetSlugParams('slug')
    const { data: { category, courses } = {}, isLoading } = useGetCourseLearningPath(slug!)
    if (isLoading) return <Loading />
    return (
        <div className="card">
            <div className="p-5">
                <div className="flex max-w-4xl flex-col gap-4">
                    <h2 className="text-2xl font-bold">{category?.name}</h2>
                    <p className="text-base text-darkGrey">{category?.description}</p>
                    <span className="border-l-2 border-primary px-2 text-darkGrey">
                        Các khóa học có thể chưa đầy đủ, Coursea vẫn đang nỗ lực hoàn thiện trong thời gian sớm nhất.
                    </span>
                </div>
                <div className="mt-10 flex flex-col gap-3">
                    <h2 className="text-xl font-semibold">1. Cơ bản</h2>
                    <div className="flex flex-col gap-4">
                        {courses && courses.listCourseIntermediate && courses?.listCourseIntermediate?.length > 0 ? (
                            courses?.listCourseIntermediate.map((item) => (
                                <div className="flex gap-8 rounded-xl border p-5">
                                    <div className="relative h-[200px] w-[400px] flex-shrink-0 cursor-pointer">
                                        <img
                                            src={getImagesUrl(item.thumbnail!)}
                                            alt={item.name}
                                            className="h-full w-full rounded-md object-cover"
                                        />
                                        <div className="absolute bottom-2.5 left-2.5">
                                            <CourseLevel courseLevel={item.level!} />
                                        </div>
                                    </div>
                                    <div className="flex h-fit flex-col gap-3">
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        {item.price && item.price != 0 ? (
                                            <div className="flex items-center gap-3">
                                                <div className="flex gap-1">
                                                    {item.price_sale && item.price_sale != 0 ? (
                                                        <div className="flex gap-1">
                                                            <RiMoneyDollarCircleFill className="size-5 text-orange-500" />
                                                            <del className="font-semibold">
                                                                {Math.floor(item.price)}
                                                            </del>
                                                        </div>
                                                    ) : (
                                                        <div className="flexr gap-1">
                                                            <RiMoneyDollarCircleFill className="size-5 text-orange-500" />
                                                            <p className="text-base">{Math.floor(item.price)}</p>
                                                        </div>
                                                    )}
                                                </div>
                                                {item.price_sale && item.price_sale != 0 && (
                                                    <div className="flex gap-1">
                                                        <RiMoneyDollarCircleFill className="size-5 text-orange-500" />
                                                        <p className="text-base font-semibold text-red-600">
                                                            {Math.floor(item.price_sale)}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-base text-orange-500">Miễn phí</span>
                                        )}
                                        <div
                                            className="line-clamp-2 max-w-[80%] text-darkGrey"
                                            dangerouslySetInnerHTML={{ __html: item?.description || '' }}
                                        />
                                        <Button className="w-fit rounded-xl">
                                            {item.is_course_bought ? 'TIẾP TỤC HỌC' : 'XEM KHÓA HỌC'}
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <span className="py-3 text-base">Khóa học chưa được cập nhật</span>
                        )}
                    </div>
                </div>
                <div className="mt-10 flex flex-col gap-3">
                    <h2 className="text-xl font-semibold">2. Trung cấp</h2>
                    <div className="flex flex-col gap-4">
                        {courses && courses.listCourseBeginner && courses?.listCourseBeginner?.length > 0 ? (
                            courses?.listCourseBeginner.map((item) => (
                                <div className="flex gap-8 rounded-xl border p-5">
                                    <div className="relative h-[200px] w-[400px] flex-shrink-0 cursor-pointer">
                                        <img
                                            src={getImagesUrl(item.thumbnail!)}
                                            alt={item.name}
                                            className="h-full w-full rounded-md object-cover"
                                        />
                                        <div className="absolute bottom-2.5 left-2.5">
                                            <CourseLevel courseLevel={item.level!} />
                                        </div>
                                    </div>
                                    <div className="flex h-fit flex-col gap-3">
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        {item.price && item.price != 0 ? (
                                            <div className="flex items-center gap-3">
                                                <div className="flex gap-1">
                                                    {item.price_sale && item.price_sale != 0 ? (
                                                        <div className="flex gap-1">
                                                            <RiMoneyDollarCircleFill className="size-5 text-orange-500" />
                                                            <del className="font-semibold">
                                                                {Math.floor(item.price)}
                                                            </del>
                                                        </div>
                                                    ) : (
                                                        <div className="flexr gap-1">
                                                            <RiMoneyDollarCircleFill className="size-5 text-orange-500" />
                                                            <p className="text-base">{Math.floor(item.price)}</p>
                                                        </div>
                                                    )}
                                                </div>
                                                {item.price_sale && item.price_sale != 0 && (
                                                    <div className="flex gap-1">
                                                        <RiMoneyDollarCircleFill className="size-5 text-orange-500" />
                                                        <p className="text-base font-semibold text-red-600">
                                                            {Math.floor(item.price_sale)}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-base text-orange-500">Miễn phí</span>
                                        )}
                                        <div
                                            className="line-clamp-2 max-w-[80%] text-darkGrey"
                                            dangerouslySetInnerHTML={{ __html: item?.description || '' }}
                                        />
                                        <Button
                                            className="w-fit rounded-xl"
                                            onClick={() => {
                                                if (item.is_course_bought) {
                                                    navigate(routes.courseLeaning.replace(':slug', item.slug))
                                                } else {
                                                    navigate(routes.courseDetail.replace(':slug', item.slug))
                                                }
                                            }}
                                        >
                                            {item.is_course_bought ? 'TIẾP TỤC HỌC' : 'XEM KHÓA HỌC'}
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <span className="py-3 text-base">Khóa học chưa được cập nhật</span>
                        )}
                    </div>
                </div>
                <div className="mt-10 flex flex-col gap-3">
                    <h2 className="text-xl font-semibold">3. Cao cấp</h2>
                    <div className="flex flex-col gap-4">
                        {courses && courses.listCourseMaster && courses?.listCourseMaster?.length > 0 ? (
                            courses?.listCourseMaster.map((item) => (
                                <div className="flex gap-8 rounded-xl border p-5">
                                    <div className="relative h-[200px] w-[400px] flex-shrink-0 cursor-pointer">
                                        <img
                                            src={getImagesUrl(item.thumbnail!)}
                                            alt={item.name}
                                            className="h-full w-full rounded-md object-cover"
                                        />
                                        <div className="absolute bottom-2.5 left-2.5">
                                            <CourseLevel courseLevel={item.level!} />
                                        </div>
                                    </div>
                                    <div className="flex h-fit flex-col gap-3">
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        {item.price && item.price != 0 ? (
                                            <div className="flex items-center gap-3">
                                                <div className="flex gap-1">
                                                    {item.price_sale && item.price_sale != 0 ? (
                                                        <div className="flex gap-1">
                                                            <RiMoneyDollarCircleFill className="size-5 text-orange-500" />
                                                            <del className="font-semibold">
                                                                {Math.floor(item.price)}
                                                            </del>
                                                        </div>
                                                    ) : (
                                                        <div className="flexr gap-1">
                                                            <RiMoneyDollarCircleFill className="size-5 text-orange-500" />
                                                            <p className="text-base">{Math.floor(item.price)}</p>
                                                        </div>
                                                    )}
                                                </div>
                                                {item.price_sale && item.price_sale != 0 && (
                                                    <div className="flex gap-1">
                                                        <RiMoneyDollarCircleFill className="size-5 text-orange-500" />
                                                        <p className="text-base font-semibold text-red-600">
                                                            {Math.floor(item.price_sale)}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-base text-orange-500">Miễn phí</span>
                                        )}
                                        <div
                                            className="line-clamp-2 max-w-[80%] text-darkGrey"
                                            dangerouslySetInnerHTML={{ __html: item?.description || '' }}
                                        />
                                        <Button className="w-fit rounded-xl">
                                            {item.is_course_bought ? 'TIẾP TỤC HỌC' : 'XEM KHÓA HỌC'}
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <span className="py-3 text-base">Khóa học chưa được cập nhật</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LearningPathCourse
