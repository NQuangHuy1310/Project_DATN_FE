import { IoIosStar } from 'react-icons/io'
import { MdListAlt } from 'react-icons/md'

import { courses } from '@/constants/mockData'

import { Button } from '@/components/ui/button'
import Course from '@/components/shared/Course'
import FilterBar from '@/components/shared/FilterBar/FilterBar'
const InstructorDetail = () => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col-reverse gap-7 card md:flex-col">
                <div className="flex w-full flex-col gap-7 md:flex-row md:justify-between md:gap-3">
                    <div className="flex gap-5">
                        <div className="h-14 w-14">
                            <img
                                src="https://i.pinimg.com/564x/ac/27/1d/ac271de883faa03617b212beeda73db3.jpg"
                                className="h-full w-full rounded-full"
                                alt=""
                            />
                        </div>
                        <div className="flex-col">
                            <h3 className="text-xl font-semibold">Emerson Levin</h3>
                            <span className="text-sm text-darkGrey">UI UX</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <MdListAlt className="size-5" />
                        <span>100 khóa học</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <IoIosStar className="size-5 text-primary" />
                        <span>4,5 (1200 đánh giá)</span>
                    </div>

                    <div className="flex items-center justify-center rounded-lg bg-secondaryYellow md:justify-start md:rounded-none md:bg-white">
                        <Button variant="ghost" className="w-full py-3 md:text-primary">
                            + Theo dõi
                        </Button>
                    </div>
                </div>
                <FilterBar placeholder="Tìm kiếm người hướng dẫn" lever />
            </div>
            <div className="flex flex-wrap justify-center gap-5 md:justify-start">
                {courses &&
                    courses.length > 0 &&
                    courses.map((item, index) => (
                        <Course
                            key={index}
                            name={item.name}
                            image={item.image}
                            createdBy={item.createdBy}
                            level={item.level}
                            star={item.star}
                            totalTime={item.totalTime}
                            studentCount={item.studentCount}
                            totalVideo={item.totalVideo}
                        />
                    ))}
            </div>
        </div>
    )
}

export default InstructorDetail
