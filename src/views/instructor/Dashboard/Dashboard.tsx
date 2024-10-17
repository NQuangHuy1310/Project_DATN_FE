import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoSearchSharp } from 'react-icons/io5'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useGetCategories } from '@/app/hooks/categories'
import { useCreateCourse, useGetCourses } from '@/app/hooks/instructors/useInstructor'

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
import { createNewCourse, createNewCourseSchema } from '@/validations'
import Loading from '@/components/Common/Loading/Loading'

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
    const createNewCourse = useCreateCourse()
    const { data: categories } = useGetCategories()
    const { data: courseData, isLoading } = useGetCourses()
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>()

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value)
        setValue('id_category', value)
    }

    const handleSubmitForm: SubmitHandler<createNewCourse> = async (formData) => {
        const response = await createNewCourse.mutateAsync(formData)
        const courseId = response.id
        const goalsUrl = routes.createCourse.replace(':id', courseId.toString())
        navigate(goalsUrl)
    }

    // function render
    const renderCategories = () =>
        categories?.map((item) => (
            <SelectItem key={item.id} value={item.id.toString()}>
                {item.name}
            </SelectItem>
        ))

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <div className="card flex flex-col gap-7 bg-white">
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
                    <Button size="lg" onClick={() => setOpenDialog(true)}>
                        Tạo khoá học mới
                    </Button>
                </div>
                {courseData && courseData?.data.length > 0 ? (
                    courseData?.data.map((item) => <CourseCard key={item.id} {...item} />)
                ) : (
                    <div className="flex items-start justify-center">
                        <img src={noContent} alt="" />
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
                                        <SelectGroup>{renderCategories()}</SelectGroup>
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
