import { BsDot, BsThreeDots } from 'react-icons/bs'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const MyPosts = () => {
    return (
        <div className='flex flex-col gap-5 p-7 bg-white rounded-md'>
            <Tabs defaultValue="draft" className="flex min-h-[500px] flex-col gap-3">
                <TabsList className="grid grid-cols-2 w-full md:w-[400px]">
                    <TabsTrigger value="draft">Bản nháp</TabsTrigger>
                    <TabsTrigger value="published">Đã xuất bản</TabsTrigger>
                </TabsList>

                <div className='w-full md:w-[70%]'>
                    <TabsContent value="draft" className='flex flex-col gap-3'>
                        <div className='flex justify-between border-2 rounded-xl p-5 items-start flex-wrap'>
                            <div className='flex flex-col gap-2'>
                                <h3 className='font-semibold text-xl'>Hello world</h3>
                                <div className='flex gap-2 items-center'>
                                    <span className='text-darkGrey'>chỉnh sửa 1 phút trước </span>
                                    <BsDot className='text-darkGrey' />
                                    <span className='text-darkGrey'>1 phút đọc</span>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger className='mt-1'><BsThreeDots className='size-5' /></DropdownMenuTrigger>
                                <DropdownMenuContent align="end" sideOffset={5}>
                                    <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                                    <DropdownMenuItem>Xóa</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className='flex justify-between border-2 rounded-xl p-5 items-start flex-wrap'>
                            <div className='flex flex-col gap-2'>
                                <h3 className='font-semibold text-xl'>Hello world</h3>
                                <div className='flex gap-2 items-center'>
                                    <span className='text-darkGrey'>chỉnh sửa 1 phút trước </span>
                                    <BsDot className='text-darkGrey' />
                                    <span className='text-darkGrey'>1 phút đọc</span>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger className='mt-1'><BsThreeDots className='size-5' /></DropdownMenuTrigger>
                                <DropdownMenuContent align="end" sideOffset={5}>
                                    <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                                    <DropdownMenuItem>Xóa</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </TabsContent>

                    <TabsContent value="published" className='flex flex-col gap-3'>
                        <div className='flex justify-between border-2 rounded-xl p-5 items-start flex-wrap'>
                            <div className='flex flex-col gap-2'>
                                <h3 className='font-semibold text-xl'>Hello world</h3>
                                <div className='flex gap-2 items-center'>
                                    <span className='text-darkGrey'>chỉnh sửa 1 phút trước </span>
                                    <BsDot className='text-darkGrey' />
                                    <span className='text-darkGrey'>1 phút đọc</span>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger className='mt-1'><BsThreeDots className='size-5' /></DropdownMenuTrigger>
                                <DropdownMenuContent align="end" sideOffset={5}>
                                    <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                                    <DropdownMenuItem>Xóa</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}

export default MyPosts

