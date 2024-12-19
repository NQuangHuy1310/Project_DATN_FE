import { useNavigate } from 'react-router-dom'

import { TbCoinFilled } from 'react-icons/tb'

import routes from '@/configs/routes'
import { Button } from '@/components/ui/button'
import { IRoadmap } from '@/types/teacher'
import { CourseLevel } from '@/components/shared/Course/CourseLevel'
import { getImagesUrl } from '@/lib'
import { Dialog, DialogContent } from '@/components/ui/dialog'

const RoadmapDetail = ({
    data,
    open,
    handleIsOpen
}: {
    data: IRoadmap
    open: boolean
    handleIsOpen: (value: boolean) => void
}) => {
    const navigate = useNavigate()
    return (
        <Dialog open={open} onOpenChange={() => handleIsOpen(false)}>
            <DialogContent className="max-h-[90vh] max-w-5xl overflow-auto">
                <h2 className="text-2xl font-bold">{data.name}</h2>
                {data.description && <p className="text-darkGrey">{data.description}</p>}
                {data.phases.map((phase, index) => (
                    <div key={index} className="">
                        <h4 className="text-xl font-semibold text-primary">{phase.name}</h4>
                        {phase.description && <p className="text-darkGrey">{phase.description}</p>}
                        <div className="flex flex-col gap-6 py-4">
                            {phase.courses.map((course, index) => (
                                <div key={index} className="flex gap-8 rounded-lg border p-4 shadow">
                                    <div className="relative h-[200px] max-w-[300px] flex-shrink-0 cursor-pointer">
                                        <img
                                            src={getImagesUrl(course.thumbnail!)}
                                            alt={course.name}
                                            className="h-full w-full rounded-lg object-cover"
                                        />
                                        <div className="absolute bottom-2.5 left-2.5">
                                            <CourseLevel courseLevel={course.level} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between pb-2">
                                        <div className="flex flex-col gap-2">
                                            <h5 className="text-lg font-semibold">{course.name}</h5>
                                            <p className="line-clamp-3 text-darkGrey">{course.description}</p>
                                            <div>
                                                {course?.price > 0 || course?.price_sale > 0 ? (
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center gap-1">
                                                            {course?.price_sale > 0 ? (
                                                                <div className="flex items-center gap-1">
                                                                    <TbCoinFilled className="size-5 text-yellow-500" />
                                                                    <del className="font-semibold text-red-600">
                                                                        {Math.floor(course?.price)}
                                                                    </del>
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center gap-1">
                                                                    <TbCoinFilled className="size-5 text-yellow-500" />
                                                                    <p className="text-base font-semibold text-red-600">
                                                                        {Math.floor(course?.price)}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {course?.price_sale > 0 && (
                                                            <div className="flex items-center gap-1">
                                                                <TbCoinFilled className="size-5 text-yellow-500" />
                                                                <p className="text-base font-semibold text-red-600">
                                                                    {Math.floor(course?.price_sale)}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-base font-semibold text-orange-500">
                                                        Miễn phí
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        {course.is_bought_course === true ? (
                                            <Button
                                                className="w-fit"
                                                onClick={() =>
                                                    navigate(routes.courseLeaning.replace(':slug', course.slug))
                                                }
                                            >
                                                Vào học
                                            </Button>
                                        ) : (
                                            <Button
                                                className="w-fit"
                                                onClick={() =>
                                                    navigate(routes.courseDetail.replace(':slug', course.slug))
                                                }
                                            >
                                                Xem chi tiết
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </DialogContent>
        </Dialog>
    )
}

export default RoadmapDetail
