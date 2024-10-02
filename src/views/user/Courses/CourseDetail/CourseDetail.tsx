import { IoIosStar } from 'react-icons/io'
import { FaRegUser } from 'react-icons/fa'
import { IoTimeOutline } from 'react-icons/io5'
import { FaRegCirclePlay } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'
import { CourseLevel as CourseLevelType } from '@/constants'
import { CourseLevel } from '@/components/shared/Course/CourseLevel'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { coursesToday } from '@/constants/mockData'
import About from '@/views/user/Courses/CourseDetail/About'
import Assignment from '@/views/user/Courses/CourseDetail/Assignment'
import Reviews from '@/views/user/Courses/CourseDetail/Reviews'
import Tools from '@/views/user/Courses/CourseDetail/Tools'
import CourseToday from '@/components/shared/Course/CourseToday'

const CourseDetail = () => {
    return (
        <div className="flex items-start gap-7">
            <div className="flex-1 rounded-lg bg-white p-7">
                <div className="h-[500px]"></div>
                <div className="flex flex-col gap-7">
                    <div className="flex flex-col gap-5">
                        <h4 className="text-4xl font-bold">Animation is the Key of Successfull UI/UX Design</h4>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <div className="flex items-center gap-2.5">
                                    <Avatar className="size-8">
                                        <AvatarImage
                                            src="https://github.com/shadcn.png"
                                            alt="@shadcn"
                                            className="h-full w-full object-cover"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <h6 className="text-ba se">Emerson Siphron</h6>
                                </div>
                                <p className="border-l border-r border-grey px-3 text-darkGrey">
                                    UI UX Design . Apps Design
                                </p>
                                <Button className="bg-transparent text-primary hover:text-primary/80" variant="outline">
                                    + Follow Mentor
                                </Button>
                            </div>
                            <div className="flex items-center gap-1">
                                <IoIosStar className="size-5 text-primary" />
                                <span> 4,5 (500 Reviews)</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <div className="flex items-center gap-1.5">
                                    <FaRegUser className="size-4 text-darkGrey" />
                                    <p className="text-base font-medium text-black">500 học sinh</p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <FaRegCirclePlay className="size-4 text-darkGrey" />
                                    <p className="text-base font-medium text-black">100 bài giảng</p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <IoTimeOutline className="size-4 text-darkGrey" />
                                    <p className="text-base font-medium text-black">2h30</p>
                                </div>
                            </div>
                            <CourseLevel courseLevel={CourseLevelType.Beginner} />
                        </div>
                    </div>
                    {/* Tabs */}
                    <Tabs defaultValue="about" className="flex flex-col gap-6">
                        <TabsList className="flex items-start justify-start gap-2">
                            <TabsTrigger value="about">Thông tin</TabsTrigger>
                            <TabsTrigger value="assignment">Bài tập</TabsTrigger>
                            <TabsTrigger value="tool">Công cụ</TabsTrigger>
                            <TabsTrigger value="review">Đánh giá</TabsTrigger>
                        </TabsList>
                        <div className="p-1">
                            <TabsContent value="about">
                                <About />
                            </TabsContent>
                            <TabsContent value="assignment">
                                <Assignment />
                            </TabsContent>
                            <TabsContent value="tool">
                                <Tools />
                            </TabsContent>
                            <TabsContent value="review">
                                <Reviews />
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>
            <div className="w-[350px] flex-shrink-0">
                <CourseToday {...coursesToday[0]} />
            </div>
        </div>
    )
}

export default CourseDetail
