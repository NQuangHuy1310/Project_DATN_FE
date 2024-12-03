import { useState } from 'react'

import { toast } from 'sonner'
import { useCourseCategoryHome } from '@/app/hooks/courses/useCourse'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { HiOutlineTemplate } from 'react-icons/hi'
import { IoCellularOutline, IoFilterSharp, IoSearchOutline } from 'react-icons/io5'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const FilterBar = ({
    placeholder,
    lever,
    isShowFilter = true,
    onFilterChange
}: {
    placeholder: string
    lever?: boolean
    isShowFilter?: boolean
    onFilterChange: (filters: { arrange?: string; category?: string; level?: string; search?: string }) => void
}) => {
    const { data: course_category = [] } = useCourseCategoryHome()
    const [searchInput, setSearchInput] = useState('')

    const handleLevelChange = (level: string) => {
        onFilterChange({ level })
    }

    const handleCategoryChange = (category: string) => {
        onFilterChange({ category })
    }

    const handleArrangeChange = (arrange: string) => {
        onFilterChange({ arrange })
    }

    const handleSearchSubmit = () => {
        if (!searchInput.trim()) {
            toast.error('Vui lòng nhập từ khóa bạn muốn tìm kiếm!')
            return
        }
        onFilterChange({ search: searchInput })
    }

    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative h-[50px] w-full lg:w-1/3">
                <Input
                    className="h-full w-full bg-white pe-10 ps-5 text-sm"
                    autoFocus
                    placeholder={placeholder}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <IoSearchOutline
                    onClick={handleSearchSubmit}
                    className="absolute right-4 top-1/2 size-5 -translate-y-1/2 cursor-pointer"
                />
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
                            <DropdownMenuContent className="rounded-md border bg-white p-4" side="bottom" align="end">
                                <DropdownMenuRadioGroup className="flex items-center gap-2">
                                    <Button variant="outline" className="text-xs" onClick={() => handleLevelChange('')}>
                                        Tất cả
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="text-xs"
                                        onClick={() => handleLevelChange('Sơ Cấp')}
                                    >
                                        Sơ Cấp
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="text-xs"
                                        onClick={() => handleLevelChange('Trung cấp')}
                                    >
                                        Trung cấp
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="text-xs"
                                        onClick={() => handleLevelChange('Chuyên Gia')}
                                    >
                                        Chuyên gia
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
                        <DropdownMenuContent className="rounded-md border bg-white p-4" side="bottom" align="end">
                            <DropdownMenuRadioGroup className="flex items-center gap-2">
                                <Button variant="outline" className="text-xs" onClick={() => handleCategoryChange(0)}>
                                    Tất cả
                                </Button>
                                {course_category.map((category) => (
                                    <Button
                                        key={category.id}
                                        variant="outline"
                                        className="text-xs"
                                        onClick={() => handleCategoryChange(String(category.id))}
                                    >
                                        {category.name}
                                    </Button>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Select onValueChange={(value) => handleArrangeChange(value)}>
                        <SelectTrigger>
                            <IoFilterSharp className="size-4" />
                            <SelectValue placeholder="Sắp xếp" />
                        </SelectTrigger>
                        <SelectContent side="bottom" align="end">
                            <SelectGroup>
                                <SelectItem value="A-Z">A - Z</SelectItem>
                                <SelectItem value="Z-A">Z - A</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            )}
        </div>
    )
}

export default FilterBar
