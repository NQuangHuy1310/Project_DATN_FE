import { IoIosStar } from 'react-icons/io'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const CourseDetail = () => {
    return (
        <div className="flex items-start gap-7">
            <div className="flex flex-1 flex-col gap-7 rounded-lg bg-white p-7">
                {/* Video component */}
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
                    </div>
                    {/* Tabs */}
                    <Tabs defaultValue="about" className="flex max-w-[684px] flex-col gap-7">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="about">Thông tin</TabsTrigger>
                            <TabsTrigger value="assignment">Bài tập</TabsTrigger>
                            <TabsTrigger value="review">Đánh giá</TabsTrigger>
                        </TabsList>
                        <TabsContent value="about">Thông tin chung</TabsContent>
                        <TabsContent value="assignment">Bài học</TabsContent>
                        <TabsContent value="review">Đánh giá</TabsContent>
                    </Tabs>
                </div>
            </div>
            <div className="h-[200px] w-full max-w-[350px] flex-shrink-0 rounded-lg bg-white p-7">
                Course Details component
            </div>
        </div>
    )
}

export default CourseDetail
