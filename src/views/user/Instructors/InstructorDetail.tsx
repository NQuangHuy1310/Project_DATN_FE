import { IoIosStar } from 'react-icons/io';
import { MdListAlt } from 'react-icons/md';

import { courses } from '@/constants/mockData';
import { Button } from '@/components/ui/button';
import Course from '@/components/shared/Course';
import FilterBar from '@/components/shared/FilterBar/FilterBar';
const InstructorDetail = () => {
    return (
        <div className="flex flex-col gap-5">

            <div className=" flex md:flex-col flex-col-reverse gap-7 ">
                <div className=" bg-white flex md:justify-between flex-col md:flex-row gap-7 md:gap-3 w-full p-7 rounded-lg">
                    <div className="flex gap-5 ">
                        <div className="w-14 h-14">
                            <img src="https://i.pinimg.com/564x/ac/27/1d/ac271de883faa03617b212beeda73db3.jpg" className="w-full h-full rounded-full" alt="" />
                        </div>
                        <div className="flex-col">
                            <h3 className="font-semibold text-xl">Emerson Levin</h3>
                            <span className="text-darkGrey text-sm">UI UX</span>
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

                    <div className="flex items-center justify-center bg-secondaryYellow md:bg-white rounded-lg md:rounded-none md:justify-start">
                        <Button variant="ghost" className="w-full md:text-primary py-3">+ Theo dõi</Button>
                    </div>
                </div>
                <FilterBar placeholder="Tìm kiếm người hướng dẫn" lever />
            </div>
            <div className="flex flex-wrap md:justify-start justify-center gap-5">
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