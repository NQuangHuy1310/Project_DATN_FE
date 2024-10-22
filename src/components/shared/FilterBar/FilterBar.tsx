import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { IoFilterSharp } from 'react-icons/io5'
import { HiOutlineTemplate } from 'react-icons/hi'
import { IoCellularOutline, IoSearchOutline } from 'react-icons/io5'
import { CourseLevel } from '@/constants'

const FilterBar = ({
    placeholder,
    lever,
    isShowFilter = true
}: {
    placeholder: string
    lever?: boolean
    isShowFilter?: boolean
}) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative h-[50px] w-full lg:w-1/3">
                <Input className="h-full w-full bg-white pe-10 ps-5 text-sm" autoFocus placeholder={placeholder} />
                <IoSearchOutline className="absolute right-4 top-1/2 size-5 -translate-y-1/2 cursor-pointer" />
            </div>
            {isShowFilter && (
                <div className="flex h-full gap-2 overflow-x-auto whitespace-nowrap">
                    {lever && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="flex h-[50px] gap-2">
                                    <IoCellularOutline className="size-4" />
                                    <span className="text-sm">Cấp độ</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="rounded-md border bg-white p-4"
                                side="bottom"
                                align="end"
                                sideOffset={2}
                            >
                                <span className="block pb-2 text-sm font-semibold">Với cấp độ</span>
                                <DropdownMenuRadioGroup className="flex items-center gap-2">
                                    <Button variant="outline" className="text-xs">
                                        Tất cả
                                    </Button>
                                    <Button variant="outline" className="text-xs">
                                        {CourseLevel.Beginner}
                                    </Button>
                                    <Button variant="outline" className="text-xs">
                                        {CourseLevel.Intermediate}
                                    </Button>
                                    <Button variant="outline" className="text-xs">
                                        {CourseLevel.Master}
                                    </Button>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex h-[50px] gap-2">
                                <HiOutlineTemplate className="size-4" />
                                <span className="text-sm">Danh mục</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="rounded-md border bg-white p-4"
                            side="bottom"
                            align="end"
                            sideOffset={2}
                        >
                            <span className="block pb-2 text-sm font-semibold">Với Danh mục</span>
                            <DropdownMenuRadioGroup className="flex items-center gap-2">
                                <Button variant="outline" className="text-xs">
                                    Tất cả
                                </Button>
                                <Button variant="outline" className="text-xs">
                                    Người mới bắt đầu
                                </Button>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Select>
                        <SelectTrigger>
                            <IoFilterSharp className="size-4" />
                            <SelectValue placeholder="Sắp xếp" />
                        </SelectTrigger>
                        <SelectContent side="bottom" align="end">
                            <SelectGroup>
                                <SelectItem value="all">Tất cả</SelectItem>
                                <SelectItem value="a-z">A - Z</SelectItem>
                                <SelectItem value="z-a">Z - A</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            )}
        </div>
    )
}

export default FilterBar
