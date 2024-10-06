import { IoSearchSharp } from 'react-icons/io5'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import CourseCard from '@/components/shared/CourseCard'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const Dashboard = () => {
    return (
        <div className="flex flex-col gap-7">
            <h3 className="text-3xl font-semibold">Khoá học</h3>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="flex h-[50px] w-full items-center">
                        <Input
                            placeholder="Tìm kiếm khoá học của bạn"
                            className="h-[48px] w-[350px] rounded-none rounded-s-md"
                        />
                        <Button className="h-full rounded-none rounded-e-md">
                            <IoSearchSharp className="size-5" />
                        </Button>
                    </div>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sắp xếp" />
                        </SelectTrigger>
                        <SelectContent side="bottom" align="end">
                            <SelectGroup>
                                <SelectItem value="new">Mới nhất</SelectItem>
                                <SelectItem value="old">Cũ nhất</SelectItem>
                                <SelectItem value="a-z">A - Z</SelectItem>
                                <SelectItem value="z-a">Z - A</SelectItem>
                                <SelectItem value="a">Đã xuất bản trước tiên</SelectItem>
                                <SelectItem value="b">Đã huỷ xuất bản trước tiên</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Button size="lg">Tạo khoá học mới</Button>
            </div>
            <div className="">
                <CourseCard />
            </div>
            {/* <div className="">
                <h4 className="my-7 text-center text-base">
                    Dựa trên trải nghiệm của bạn, chúng tôi nghĩ rằng những tài nguyên này sẽ hữu ích.
                </h4>
                <div className="flex flex-col flex-wrap gap-10">
                    <div className="border-soft flex items-center justify-between rounded-sm border-[1px] px-16 py-6">
                        <div className="flex w-[42%] flex-shrink-0 items-center justify-center">
                            <img
                                src="https://s.udemycdn.com/instructor/dashboard/engaging-course.jpg"
                                alt=""
                                className="h-[250px] w-[250px] rounded-md"
                                loading="lazy"
                            />
                        </div>
                        <div className="flex flex-1 flex-col gap-6">
                            <h3 className="text-2xl font-medium">Tạo khóa học thu hút</h3>
                            <p className="w-full max-w-[900px] text-base leading-6">
                                Dù đã giảng dạy nhiều năm hay mới dạy lần đầu, bạn vẫn có thể tạo nên một khóa học hấp
                                dẫn. Chúng tôi đã biên soạn các tài nguyên và phương pháp hay nhất để giúp bạn tiến bộ,
                                bất kể vạch xuất phát của bạn ở đâu.
                            </p>
                            <Link to="" className="text-base text-primary underline">
                                Bắt đầu
                            </Link>
                        </div>
                    </div>
                    <div className=""></div>
                    <div className=""></div>
                </div>
            </div> */}
        </div>
    )
}

export default Dashboard
