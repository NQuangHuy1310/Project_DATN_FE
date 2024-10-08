import { IoSearchSharp } from 'react-icons/io5'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import CourseCard from '@/components/shared/CourseCard'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import routes from '@/configs/routes'
import { Link } from 'react-router-dom'

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
                <Link to={routes.createCourse}>
                    <Button size="lg">Tạo khoá học mới</Button>
                </Link>
            </div>
            <div className="">
                <CourseCard />
            </div>
        </div>
    )
}

export default Dashboard
