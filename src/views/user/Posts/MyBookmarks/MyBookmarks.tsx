import { BsDot, BsThreeDots } from 'react-icons/bs'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const MyBookmarks = () => {
    return (
        <div className="flex flex-col gap-5 rounded-md bg-white p-10 px-20">
            <Tabs defaultValue="blog" className="flex min-h-[500px] flex-col gap-3">
                <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                    <TabsTrigger value="blog">Bài viết</TabsTrigger>
                </TabsList>

                <div className="w-full">
                    <TabsContent value="blog" className="flex flex-col gap-3">
                        <div className="flex flex-wrap items-start justify-between rounded border p-5">
                            <div className="flex gap-3">
                                <img
                                    className="w-20"
                                    src="https://meatworld.com.vn/wp-content/uploads/meme-meo-cuoi-1Cgn5Rv.jpg"
                                    alt=""
                                />
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-xl font-semibold">Hello world</h3>
                                    <div className="flex items-center gap-1">
                                        <span className="text-darkGrey">Đã lưu 1 phút trước</span>
                                        <BsDot className="text-darkGrey" />
                                        <span className="text-darkGrey">Tác giả Lê Đình Dũng</span>
                                    </div>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="mt-1">
                                    <BsThreeDots className="size-5" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" sideOffset={5}>
                                    <DropdownMenuItem>Xóa khỏi mục đã lưu</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}

export default MyBookmarks
