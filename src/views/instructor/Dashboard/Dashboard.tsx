import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IoSearchSharp } from 'react-icons/io5'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useGetCategories } from '@/app/hooks/categories'
import { createNewCourse, createNewCourseSchema } from '@/validations'
import { useCreateCourse, useGetCourses } from '@/app/hooks/instructors/useInstructor'

import iconLoading from '@/assets/loading.svg'
import noContent from '@/assets/no-content.jpg'
import routes from '@/configs/routes'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import CourseCard from '@/components/shared/CourseCard'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'
import { getVisiblePages } from '@/lib'
import { useDebounce } from '@/app/hooks/custom/useDebounce'

const Dashboard = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { isSubmitting, errors }
    } = useForm<createNewCourse>({
        resolver: zodResolver(createNewCourseSchema)
    })
    const navigate = useNavigate()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const initialPage = parseInt(queryParams.get('page') || '1', 5)

    const [page, setPage] = useState(initialPage)
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
    const [sort, setSort] = useState<string>('latest')
    const [searchValue, setSearchValue] = useState<string>('')

    const debouncedSearchValue = useDebounce(searchValue, 500)

    const { mutateAsync: createNewCourse } = useCreateCourse()
    const { data: categories } = useGetCategories()
    const { data: courseData, isLoading } = useGetCourses(8, page, 4, debouncedSearchValue, sort)

    const totalPages = Math.ceil((courseData?.total ?? 0) / (courseData?.per_page ?? 0))
    const visiblePages = getVisiblePages(totalPages, page, 4)

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value)
        setValue('id_category', value)
    }

    const handleChangeSort = (value: string) => {
        setSort(value)
    }

    const handleSubmitForm: SubmitHandler<createNewCourse> = async (formData) => {
        const response = await createNewCourse(formData)
        const courseId = response.id
        const goalsUrl = routes.createCourse.replace(':id', courseId.toString())
        navigate(goalsUrl)
    }

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) {
            return
        }
        setPage(newPage)
    }

    useEffect(() => {
        if (page !== 1) {
            navigate(`?page=${page}`, { replace: true })
        } else {
            navigate(location.pathname, { replace: true })
        }
    }, [page, navigate, location.pathname])

    return (
        <>
            <div className="card flex h-full min-h-screen flex-col gap-8 bg-white">
                <h3 className="text-2xl font-semibold capitalize">Danh sách khoá học</h3>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="flex h-[50px] items-center">
                            <Input
                                placeholder="Tìm kiếm khoá học của bạn"
                                className="h-[48px] w-[400px] rounded-none rounded-s-md"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                autoFocus
                            />
                            <Button className="h-full rounded-none rounded-e-md">
                                <IoSearchSharp className="size-5" />
                            </Button>
                        </div>
                        <div className="w-[250px]">
                            <Select value={sort} onValueChange={handleChangeSort}>
                                <SelectTrigger className="flex w-full items-center justify-between">
                                    <SelectValue placeholder="Sắp xếp" />
                                </SelectTrigger>
                                <SelectContent side="bottom" align="end">
                                    <SelectGroup>
                                        <SelectItem value="latest">Mới nhất</SelectItem>
                                        <SelectItem value="oldest">Cũ nhất</SelectItem>
                                        <SelectItem value="a-z">A - Z</SelectItem>
                                        <SelectItem value="z-a">Z - A</SelectItem>
                                        <SelectItem value="approved_first">Đã xuất bản trước tiên</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button size="lg" onClick={() => setOpenDialog(true)}>
                        Tạo khoá học mới
                    </Button>
                </div>

                {searchValue && (
                    <p className="text-base">
                        Kết quả tìm kiếm của <strong>{searchValue}</strong>
                    </p>
                )}

                <div className="flex h-full w-full flex-wrap gap-6">
                    {courseData &&
                        courseData?.data.length > 0 &&
                        courseData?.data.map((item) => <CourseCard key={item.id} {...item} />)}{' '}
                </div>

                {courseData?.data.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-2">
                        <img src={noContent} alt="" />
                        <p className="text-base font-medium text-muted-foreground">
                            {searchValue
                                ? 'Khoá học bạn tìm kiếm không tồn tại, tạo khoá học ngay'
                                : 'Bạn chưa có khoá học nào, tạo khoá học ngay'}
                        </p>
                        <Button size="lg" onClick={() => setOpenDialog(true)}>
                            Tạo khoá học ngay
                        </Button>
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="mt-auto flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => handlePageChange(page - 1)}
                                        className={`${page === 1 ? 'cursor-not-allowed bg-grey' : 'cursor-pointer'}`}
                                    />
                                </PaginationItem>

                                {visiblePages[0] > 1 && (
                                    <PaginationItem>
                                        <span className="px-2">...</span>
                                    </PaginationItem>
                                )}

                                {visiblePages.map((pageNumber: number) => (
                                    <PaginationItem key={pageNumber} className="cursor-pointer">
                                        <PaginationLink
                                            isActive={page === pageNumber}
                                            onClick={() => handlePageChange(pageNumber)}
                                        >
                                            {pageNumber}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                {visiblePages[visiblePages.length - 1] < totalPages && (
                                    <PaginationItem>
                                        <span className="px-2">...</span>
                                    </PaginationItem>
                                )}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => handlePageChange(page + 1)}
                                        className={`${page === totalPages ? 'cursor-not-allowed bg-grey' : 'cursor-pointer'}`}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}

                {isLoading && (
                    <div className="mt-32 flex flex-col items-center justify-center gap-5">
                        <img src={iconLoading} alt="loading" width={80} height={80} />
                        <p>Đang tải dữ liệu</p>
                    </div>
                )}
            </div>

            {/* Dialog add course */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-[550px]">
                    <form onSubmit={handleSubmit(handleSubmitForm)}>
                        <DialogHeader>
                            <DialogTitle className="text-center text-xl">
                                Tạo tiêu đề và chọn danh mục cho khoá học
                            </DialogTitle>
                            <DialogDescription className="text-sm">
                                Đừng lo nếu bạn không nghĩ ra được một tiêu đề hay ngay bây giờ. Bạn có thể thay đổi
                                sau.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-muted-foreground">Tiêu đề cho khoá học</label>
                                <Input
                                    {...register('name')}
                                    autoFocus
                                    placeholder="Ví dụ: Khoá học javascript cơ bản"
                                    maxLength={60}
                                    type="text"
                                />
                                {errors.name && <div className="text-sm text-secondaryRed">{errors.name.message}</div>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-muted-foreground">Danh mục cho khoá học</label>
                                <Select
                                    value={selectedCategory}
                                    onValueChange={handleCategoryChange}
                                    name="id_category"
                                >
                                    <SelectTrigger className="flex justify-between">
                                        <SelectValue placeholder="Danh mục khoá học" />
                                    </SelectTrigger>
                                    <SelectContent side="bottom" align="end">
                                        <SelectGroup>
                                            {categories?.map((item) => (
                                                <SelectItem key={item.id} value={item.id.toString()}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.id_category && (
                                    <div className="text-sm text-secondaryRed">{errors.id_category.message}</div>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpenDialog(false)}
                                disabled={isSubmitting}
                            >
                                Huỷ
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                Tiếp tục tạo khoá học
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Dashboard
