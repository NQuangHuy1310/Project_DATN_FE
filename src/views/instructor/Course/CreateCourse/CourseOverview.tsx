import { memo, useRef } from 'react'

import { CourseLevel } from '@/constants'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import placeholder from '@/assets/placeholder.jpg'
import { Button } from '@/components/ui/button'

const CourseOverview = memo(() => {
    const courseImage = useRef<HTMLInputElement | null>(null)
    const courseVideo = useRef<HTMLInputElement | null>(null)

    const handleButtonClick = (inputRef: React.RefObject<HTMLInputElement>) => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    return (
        <div className="rounded-lg p-5">
            <h4 className="border-b-2 border-gray-300 pb-3 text-2xl font-semibold capitalize">Tổng quan khóa học</h4>
            <div className="mt-4 flex flex-col gap-7">
                <p className="text-sm leading-6 text-black">
                    Trang tổng quan khóa học của bạn rất quan trọng đối với thành công của bạn trên Udemy. Nếu được thực
                    hiện đúng, trang này cũng có thể giúp bạn hiển thị trong các công cụ tìm kiếm như Google. Khi bạn
                    hoàn thành phần này, hãy nghĩ đến việc tạo Trang tổng quan khóa học hấp dẫn thể hiện lý do ai đó
                    muốn ghi danh khóa học của bạn
                </p>

                {/* Tiêu đề khoá học */}
                <div className="flex flex-col gap-2">
                    <h5 className="text-base font-bold">Tiêu đề khóa học</h5>
                    <Input placeholder="Chèn tiêu đề khoá học" maxLength={60} type="text" />
                    <span className="text-xs text-darkGrey">
                        Tiêu đề của bạn không những phải thu hút sự chú ý, chứa nhiều thông tin mà còn được tối ưu hóa
                        để dễ tìm kiếm
                    </span>
                </div>

                {/* Mô tả khoá học */}
                <div className="flex flex-col gap-2">
                    <h5 className="text-base font-bold">Mô tả khoá học</h5>
                    <Textarea placeholder="Chèn mô tả khoá học" maxLength={60} />
                    <span className="text-xs text-darkGrey">Mô tả phải dài ít nhất là 200 từ.</span>
                </div>

                {/* Thông tin cơ bản */}
                <div className="flex flex-col gap-2">
                    <h5 className="text-base font-bold">Thông tin cơ bản</h5>
                    <div className="flex items-center gap-5">
                        <Select>
                            <SelectTrigger className="flex w-[290px] items-center justify-between">
                                <SelectValue placeholder="-- Chọn trình độ --" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value={CourseLevel.Beginner}>{CourseLevel.Beginner}</SelectItem>
                                    <SelectItem value={CourseLevel.Intermediate}>{CourseLevel.Intermediate}</SelectItem>
                                    <SelectItem value={CourseLevel.Master}>{CourseLevel.Master}</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="flex w-[290px] items-center justify-between">
                                <SelectValue placeholder="-- Chọn thể loại --" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="CNTT">CNTT & Phần mềm</SelectItem>
                                    <SelectItem value="design">Thiết kế</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="flex w-[290px] items-center justify-between">
                                <SelectValue placeholder="-- Chọn thể loại con --" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="1">CNTT - 1</SelectItem>
                                    <SelectItem value="2">CNTT - 2</SelectItem>
                                    <SelectItem value="3">CNTT - 3</SelectItem>
                                    <SelectItem value="4">CNTT - 4</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Hình ảnh khoá học */}
                <div className="flex flex-col gap-2">
                    <h5 className="text-base font-bold">Hình ảnh khoá học</h5>
                    <div className="flex items-start gap-8">
                        <div className="w-[450px] flex-shrink-0 overflow-hidden rounded-md border-[1px]">
                            <img src={placeholder} alt="Course image" className="h-full w-full object-cover" />
                        </div>
                        <div className="flex w-[450px] flex-col gap-3">
                            <p className="text-sm leading-6">
                                Tải hình ảnh khóa học lên tại đây. Để được chấp nhận, hình ảnh phải đáp ứng tiêu chuẩn
                                chất lượng hình ảnh khóa học. Hướng dẫn quan trọng: 750x422 pixel; .jpg, .jpeg,. gif,
                                hoặc .png. và không có chữ trên hình ảnh.
                            </p>
                            <div className="flex h-[44px] items-center">
                                <Input
                                    type="file"
                                    className="flex h-full cursor-pointer items-start justify-center"
                                    placeholder="Tải lên hình ảnh"
                                    ref={courseImage}
                                />
                                <Button
                                    variant="outline"
                                    className="h-full"
                                    onClick={() => handleButtonClick(courseImage)}
                                >
                                    Tải file lên
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Video quảng cáo */}
                <div className="flex flex-col gap-2">
                    <h5 className="text-base font-bold">Video quảng cáo</h5>
                    <div className="flex items-start gap-8">
                        <div className="w-[450px] flex-shrink-0 overflow-hidden rounded-md border-[1px]">
                            <img src={placeholder} alt="Course image" className="h-full w-full object-cover" />
                        </div>
                        <div className="flex w-[450px] flex-col gap-3">
                            <p className="text-sm leading-6">
                                Video quảng cáo của bạn là một cách nhanh chóng và hấp dẫn để học viên xem trước những
                                gì họ sẽ học trong khóa học của bạn. Học viên quan tâm đến khóa học của bạn có nhiều khả
                                năng ghi danh hơn nếu video quảng cáo của bạn được thực hiện tốt.
                            </p>
                            <div className="flex h-[44px] items-center">
                                <Input
                                    type="file"
                                    className="flex h-full cursor-pointer items-start justify-center"
                                    placeholder="Tải lên hình ảnh"
                                    ref={courseVideo}
                                />
                                <Button
                                    variant="outline"
                                    className="h-full"
                                    onClick={() => handleButtonClick(courseVideo)}
                                >
                                    Tải file lên
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hồ sơ giảng viên */}
            </div>
        </div>
    )
})

export default CourseOverview
