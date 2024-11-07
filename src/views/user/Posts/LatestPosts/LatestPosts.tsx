import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { BsThreeDots } from 'react-icons/bs'
import { CiBookmark } from 'react-icons/ci'
import { FaFacebookSquare, FaLink } from 'react-icons/fa'
import { IoFlagSharp } from 'react-icons/io5'
import { LuDot } from 'react-icons/lu'
import { MdEmail } from 'react-icons/md'

const LatestPost = () => {
    return (
        <div className="px-30 flex flex-col gap-7 rounded-md bg-white p-7 px-32">
            <div className="flex flex-col gap-5">
                <h1 className="text-xl">
                    Các bài viết mới nhất chia sẻ kinh nghiệm học lập trình online và kỹ thuật lập trình web Người đọc
                    có thể tìm thấy những dự án thực tế và mẹo hữu ích từ các học viên Coursea, giúp nâng cao kỹ năng và
                    kiến thức công nghệ.
                </h1>
            </div>
            <div className="flex w-full flex-wrap items-start gap-10">
                <div className="flex w-full max-w-[100%] cursor-pointer flex-col gap-4 rounded-lg border p-6 hover:shadow-md">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                            <img
                                src="https://artena.vn/wp-content/uploads/2024/10/anh-meme-cute-hai-huoc-15.jpg"
                                alt=""
                                className="h-10 w-10 rounded-full"
                            />
                            <span className="text-xs font-semibold">Lê Thị Thùy Linh</span>
                        </div>
                        <div className="flex items-center gap-5">
                            <CiBookmark className="size-6" />
                            <div className="mb-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="mt-1">
                                        <BsThreeDots className="size-5" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        sideOffset={5}
                                        className="flex flex-col gap-3 rounded-md border bg-white p-2 shadow-lg"
                                    >
                                        <DropdownMenuItem className="flex gap-2 rounded-md p-2 hover:bg-gray-100">
                                            <FaFacebookSquare /> Chia sẻ lên Facebook
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="flex gap-2 rounded-md p-2 hover:bg-gray-100">
                                            <MdEmail />
                                            Chia sẻ tới Email
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="flex gap-2 rounded-md p-2 hover:bg-gray-100">
                                            <FaLink />
                                            Sao chép liên kết
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="flex gap-2 rounded-md p-2 hover:bg-gray-100">
                                            <IoFlagSharp />
                                            Báo cáo bài viết
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 text-xs">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-lg font-semibold">
                                    Tổng hợp các sản phẩm của học viên tại Coursea 👏👏
                                </h3>
                                <p className="text-base">
                                    Bài viết này nhằm tổng hợp lại các dự án mà học viên F8 đã hoàn thành và chia sẻ
                                    trên nhóm Học lập trình web Coursea. Các dự án dưới đây được mình ngẫu nhiên lựa
                                    chọn để đăng chứ không mang tính xếp hạng các bạn nhé.
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1 font-medium text-darkGrey">
                                    <p>3 giờ trước </p>
                                    <LuDot />
                                    <p>6 phút đọc</p>
                                </div>
                            </div>
                        </div>
                        <div className="h-[200px] w-[50%] overflow-hidden">
                            <img
                                src="https://files.fullstack.edu.vn/f8-prod/blog_posts/65/6139fe28a9844.png"
                                alt=""
                                className="ml-auto h-full w-[100%] rounded-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LatestPost
