import { memo } from 'react'
import { FaPlus } from 'react-icons/fa6'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const StudentGoals = memo(() => {
    return (
        <div className="rounded-lg p-5">
            <h4 className="border-b-2 border-gray-300 pb-3 text-2xl font-semibold capitalize">Mục tiêu học viên</h4>
            <div className="mt-4 flex flex-col gap-7">
                <p className="text-sm leading-6 text-black">
                    Các mô tả sau sẻ hiển thị công khai trên Trang tổng quan khoá học của bạn và sẽ tác động trực tiếp
                    đến thành tích khoá học, đồng thời giúp học viên quyết định xem khoá học đó có phù hợp với họ hay
                    không.
                </p>

                {/* Mục tiêu học viên */}
                <div className="flex flex-col gap-4">
                    <div>
                        <h5 className="text-base font-bold">Học viên sẽ học được gì trong khoá học của bạn?</h5>
                        <p className="text-sm text-gray-600">
                            Bạn phải nhập ít nhất 4 mục tiêu khoá học hoặc kết quả học tập mà học viên có thể mong đợi
                            sau khi hoàn thành khoá học.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Input
                            placeholder="Ví dụ: Xác định vai trò và trách nhiệm của người quản lý dự án"
                            maxLength={160}
                            type="text"
                        />
                        <Input
                            placeholder="Ví dụ: Xác định vai trò và trách nhiệm của người quản lý dự án"
                            maxLength={160}
                            type="text"
                        />
                        <div>
                            <Button variant="outline" className="space-x-2 text-primary hover:text-primary/80">
                                <FaPlus />
                                <span>Thêm mục tiêu vào khoá học của bạn</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Yêu cầu tham gia khóa học */}
                <div className="flex flex-col gap-4">
                    <div>
                        <h5 className="text-base font-bold">
                            Yêu cầu hoặc điều kiện tiên quyết để tham gia khóa học của bạn là gì?
                        </h5>
                        <p className="text-sm text-gray-600">
                            Liệt kê các kỹ năng, kinh nghiệm, công cụ hoặc thiết bị mà học viên bắt buộc phải có trước
                            khi tham gia khóa học.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Input
                            placeholder="Ví dụ: Không cần kinh nghiệm lập trình. Bạn sẽ học mọi thứ bạn cần biết"
                            maxLength={160}
                            type="text"
                        />
                        <div>
                            <Button variant="outline" className="space-x-2 text-primary hover:text-primary/80">
                                <FaPlus />
                                <span>Thêm yêu cầu vào khoá học của bạn</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Đối tượng học viên */}
                <div className="flex flex-col gap-4">
                    <div>
                        <h5 className="text-base font-bold">Khóa học này dành cho đối tượng nào?</h5>
                        <p className="text-sm text-gray-600">
                            Viết mô tả rõ ràng về học viên mục tiêu cho khóa học, tức là những người sẽ thấy nội dung
                            khóa học có giá trị. Điều này sẽ giúp bạn thu hút học viên phù hợp tham gia khóa học.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Input
                            placeholder="Ví dụ: Lập trình viên web muốn cải thiện kĩ năng cơ bản"
                            maxLength={160}
                            type="text"
                        />
                        <div>
                            <Button variant="outline" className="space-x-2 text-primary hover:text-primary/80">
                                <FaPlus />
                                <span>Thêm đối tượng vào khoá học của bạn</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default StudentGoals
