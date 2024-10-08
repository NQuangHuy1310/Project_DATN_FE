import { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'

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
import { SubmitHandler, useForm } from 'react-hook-form'
import { createNewCourse, createNewCourseSchema } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import routes from '@/configs/routes'

const Dashboard = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { isSubmitting, errors }
    } = useForm<createNewCourse>({ resolver: zodResolver(createNewCourseSchema) })

    const [openDialog, setOpenDialog] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string>('')

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value)
        setValue('id_category', value)
    }

    const handleSubmitForm: SubmitHandler<createNewCourse> = async (data) => {}

    return (
        <>
            <div className="flex flex-col gap-7">
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

                    <div className="">
                        <Button size="lg" onClick={() => setOpenDialog(!openDialog)}>
                            Tạo khoá học mới
                        </Button>
                    </div>
                </div>
                <div className="">
                    <CourseCard />
                </div>
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
                                    <SelectTrigger className="flex justify-start">
                                        <SelectValue placeholder="Danh mục khoá học" />
                                    </SelectTrigger>
                                    <SelectContent side="bottom" align="end">
                                        <SelectGroup>
                                            <SelectItem value="new">Mới nhất</SelectItem>
                                            <SelectItem value="old">Cũ nhất</SelectItem>
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
                            <Link to={routes.createCourse}>
                                <Button type="submit" disabled={isSubmitting}>
                                    Tiếp tục tạo khoá học
                                </Button>
                            </Link>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Dashboard
