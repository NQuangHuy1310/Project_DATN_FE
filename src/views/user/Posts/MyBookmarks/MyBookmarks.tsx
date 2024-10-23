import { BsDot, BsThreeDots } from 'react-icons/bs'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const MyBookmarks = () => {
    return (
        <div className="flex flex-col gap-5 rounded-md bg-white p-7">
            <Tabs defaultValue="blog" className="flex min-h-[500px] flex-col gap-3">
                <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                    <TabsTrigger value="blog">Bài viết</TabsTrigger>
                </TabsList>

                <div className="w-full md:w-[70%]">
                    <TabsContent value="blog" className="flex flex-col gap-3">
                        <div className="flex flex-wrap items-start justify-between rounded-xl border-2 p-5">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-semibold">Hello world</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-darkGrey">Đã lưu 1 phút trước</span>
                                    <BsDot className="text-darkGrey" />
                                    <span className="text-darkGrey">Tác giả Lê Đình Dũng</span>
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
