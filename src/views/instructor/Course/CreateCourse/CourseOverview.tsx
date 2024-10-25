import { toast } from 'sonner'
import ReactQuill from 'react-quill'
import { useParams } from 'react-router-dom'
import { memo, useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import placeholder from '@/assets/placeholder.jpg'
import { CourseLevel, MessageErrors } from '@/constants'
import { getImagesUrl, readFileAsDataUrl, validateFileSize } from '@/lib'
import { courseOverview, courseOverviewSchema } from '@/validations'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useGetCategories } from '@/app/hooks/categories'
import { useGetOverviewCourse, useOverviewCourse } from '@/app/hooks/instructors/useInstructor'
import { IOverviewCourseData } from '@/types/instructor'
import Loading from '@/components/Common/Loading/Loading'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'

const CourseOverview = memo(({ setIsDataComplete }: { setIsDataComplete: () => void }) => {
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors }
    } = useForm<courseOverview>({ resolver: zodResolver(courseOverviewSchema) })

    const { id } = useParams()
    const { data: categories } = useGetCategories()
    const { data, isPending: loadingOverviewCourse } = useGetOverviewCourse(id!)
    const { mutateAsync: createOverviewCourse, isPending } = useOverviewCourse()

    const [courseImageFile, setCourseImageFile] = useState<File>()
    const [courseImagePath, setCourseImagePath] = useState<string | undefined>(placeholder)
    const [courseVideoFile, setCourseVideoFile] = useState<File>()
    const [courseVideoPath, setCourseVideoPath] = useState<string | undefined>(undefined)
    const [dialogOpen, setDialogOpen] = useState(false)
    const courseImage = useRef<HTMLInputElement | null>(null)
    const courseVideo = useRef<HTMLInputElement | null>(null)
    const quillRef = useRef<ReactQuill>(null)

    const handleButtonClick = (inputRef: React.RefObject<HTMLInputElement>) => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleChangeSelect = (value: string, type: 'level' | 'id_category' | 'is_active') => {
        setValue(type, value, {
            shouldValidate: true
        })
    }

    const handleChangeContent = (value: string) => {
        setValue('description', value)
    }

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && validateFileSize(file, 'image')) {
            try {
                setCourseImageFile(file)
                const imageUrl = await readFileAsDataUrl(file)
                setCourseImagePath(imageUrl)
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : MessageErrors.uploadFile
                toast.error(errorMessage)
            }
        }
    }

    const handleUploadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && validateFileSize(file, 'video')) {
            try {
                setCourseVideoFile(file)
                const videoUrl = await readFileAsDataUrl(file)
                setCourseVideoPath(videoUrl)
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : MessageErrors.uploadFile
                toast.error(errorMessage)
            }
        }
    }

    const handleSubmitForm: SubmitHandler<courseOverview> = async (data) => {
        const payload: IOverviewCourseData = {
            ...data,
            _method: 'PUT'
        }

        if (courseImageFile) {
            payload.thumbnail = courseImageFile
        } else if (courseVideoFile) {
            payload.trailer = courseVideoFile
        }

        await createOverviewCourse([id!, payload])
        setIsDataComplete()
    }

    useEffect(() => {
        if (data) {
            const imagePath = data?.thumbnail ? getImagesUrl(data?.thumbnail ?? '') : placeholder
            const videoPath = data?.trailer ? getImagesUrl(data?.trailer ?? '') : undefined

            setValue('name', data.name)
            setValue('description', data.description ?? '')
            setValue('level', data.level ?? '')
            setValue('id_category', data.category.id.toString())
            setValue('price', data.price ? Math.round(data.price).toString() : '')
            setValue('price_sale', data.price_sale ? Math.round(data.price_sale).toString() : '')

            setCourseImagePath(imagePath)
            setCourseVideoPath(videoPath)
        }
    }, [data, setValue])

    if (loadingOverviewCourse) {
        return <Loading />
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleSubmitForm)} className="rounded-lg p-5">
                <div className="flex items-center justify-between border-b-2 border-gray-300 pb-5">
                    <h4 className="text-2xl font-semibold capitalize">Tổng quan khóa học</h4>
                    <div className="flex gap-3">
                        <Button size="default" variant="destructive" disabled={isPending}>
                            Nhập lại
                        </Button>
                        <Button type="submit" size="default" disabled={isPending}>
                            Lưu thông tin
                        </Button>
                    </div>
                </div>
                <div className="mt-4 flex flex-col gap-7">
                    <p className="text-sm leading-6 text-black">
                        Trang tổng quan khóa học của bạn rất quan trọng đối với thành công của bạn trên Udemy. Nếu được
                        thực hiện đúng, trang này cũng có thể giúp bạn hiển thị trong các công cụ tìm kiếm như Google.
                        Khi bạn hoàn thành phần này, hãy nghĩ đến việc tạo Trang tổng quan khóa học hấp dẫn thể hiện lý
                        do ai đó muốn ghi danh khóa học của bạn
                    </p>

                    {/* Tiêu đề khoá học */}
                    <div className="flex flex-col gap-2">
                        <h5 className="text-base font-bold">Tiêu đề khóa học</h5>
                        <Input
                            autoFocus
                            type="text"
                            maxLength={60}
                            placeholder="Chèn tiêu đề khoá học"
                            className="max-w-[80%]"
                            {...register('name')}
                        />{' '}
                        {errors.name ? (
                            <div className="text-sm text-red-500">{errors.name.message}</div>
                        ) : (
                            <span className="text-xs text-darkGrey">
                                Tiêu đề của bạn không những phải thu hút sự chú ý, chứa nhiều thông tin mà còn được tối
                                ưu hóa để dễ tìm kiếm
                            </span>
                        )}
                    </div>

                    {/* Mô tả khoá học */}
                    <div className="flex flex-col gap-2 border-none">
                        <h5 className="text-base font-bold">Mô tả khoá học</h5>
                        <ReactQuill
                            ref={quillRef}
                            value={getValues('description')}
                            onChange={handleChangeContent}
                            placeholder="Chèn mô tả khoá học"
                            style={{ height: '100%', width: '80%' }}
                        />
                        {errors.description ? (
                            <div className="text-sm text-red-500">{errors.description.message}</div>
                        ) : (
                            <span className="text-xs text-darkGrey">Mô tả phải dài ít nhất là 200 từ.</span>
                        )}
                    </div>

                    {/* Thông tin cơ bản */}
                    <div className="flex flex-col gap-2">
                        <h5 className="text-base font-bold">Thông tin cơ bản</h5>
                        <div className="flex items-center gap-5">
                            <div className="flex flex-col gap-1">
                                <Select
                                    value={getValues('level')}
                                    onValueChange={(value) => handleChangeSelect(value, 'level')}
                                    name="level"
                                >
                                    <SelectTrigger className="flex w-[290px] items-center justify-between">
                                        <SelectValue placeholder="-- Chọn trình độ --" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value={CourseLevel.Beginner}>{CourseLevel.Beginner}</SelectItem>
                                            <SelectItem value={CourseLevel.Intermediate}>
                                                {CourseLevel.Intermediate}
                                            </SelectItem>
                                            <SelectItem value={CourseLevel.Master}>{CourseLevel.Master}</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.level ? (
                                    <div className="text-sm text-red-500">{errors.level.message}</div>
                                ) : (
                                    <span className="text-xs text-darkGrey">Cấp độ của khoá học</span>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <Select
                                    onValueChange={(value) => handleChangeSelect(value, 'id_category')}
                                    value={getValues('id_category')}
                                    name="id_category"
                                >
                                    <SelectTrigger className="flex w-[290px] items-center justify-between">
                                        <SelectValue placeholder="-- Chọn thể loại --" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectContent side="bottom" align="end">
                                            <SelectGroup>
                                                {categories?.map((item) => (
                                                    <SelectItem key={item.id} value={item.id.toString()}>
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </SelectContent>
                                </Select>
                                {errors.id_category ? (
                                    <div className="text-sm text-red-500">{errors.id_category.message}</div>
                                ) : (
                                    <span className="text-xs text-darkGrey">Danh mục khoá học</span>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <Select
                                    onValueChange={(value) => handleChangeSelect(value, 'is_active')}
                                    value={getValues('is_active')}
                                    name="is_active"
                                    defaultValue="1"
                                >
                                    <SelectTrigger className="flex w-[290px] items-center justify-between">
                                        <SelectValue placeholder="-- Trạng thái --" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectContent side="bottom" align="end">
                                            <SelectGroup>
                                                <SelectItem value={'1'}>Công khai</SelectItem>
                                                <SelectItem value={'0'}>Riêng tư</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </SelectContent>
                                </Select>
                                <span className="text-xs text-darkGrey">Trạng thái của khoá học</span>
                            </div>
                        </div>
                    </div>

                    {/* Giá khoá học */}
                    <div className="flex flex-col gap-2">
                        <h5 className="text-base font-bold">Giá khoá học</h5>
                        <div className="flex items-start gap-5">
                            <div className="flex h-[60px] w-[350px] flex-col gap-1">
                                <Input
                                    placeholder="Giá khoá học"
                                    className="h-full"
                                    {...register('price')}
                                    type="number"
                                />
                                {errors.price ? (
                                    <div className="text-sm text-red-500">{errors.price.message}</div>
                                ) : (
                                    <span className="text-xs text-darkGrey">
                                        Nếu bạn để giá khoá học là 0 thì đây là khoá học miễn phí
                                    </span>
                                )}
                            </div>
                            <div className="flex h-[60px] w-[350px] flex-col gap-1">
                                <Input placeholder="Giá khuyến mãi" className="h-full" {...register('price_sale')} />

                                <span className="text-xs text-darkGrey">Giá khuyến mãi của khoá học</span>
                            </div>
                            <Button type="button" variant="secondary" size="sm" onClick={() => setDialogOpen(true)}>
                                Bảng quy đổi giá
                            </Button>
                        </div>
                    </div>

                    {/* Hình ảnh khoá học */}
                    <div className="flex flex-col gap-2">
                        <h5 className="text-base font-bold">Hình ảnh khoá học</h5>
                        <div className="flex items-start gap-8">
                            <div className="h-[300px] w-[450px] flex-shrink-0 overflow-hidden rounded-md border-[1px]">
                                <img src={courseImagePath} alt="Course image" className="h-full w-full object-cover" />
                            </div>
                            <div className="flex w-[450px] flex-col gap-3">
                                <p className="text-sm leading-6">
                                    Tải hình ảnh khóa học lên tại đây. Để được chấp nhận, hình ảnh phải đáp ứng tiêu
                                    chuẩn chất lượng hình ảnh khóa học. Hướng dẫn quan trọng: 750x422 pixel; .jpg,
                                    .jpeg,. gif, hoặc .png. và không có chữ trên hình ảnh.
                                </p>
                                <div className="flex h-[44px] items-center">
                                    <Input
                                        type="file"
                                        className="flex h-full cursor-pointer items-start justify-center rounded-e-none"
                                        placeholder="Tải lên hình ảnh"
                                        ref={courseImage}
                                        onChange={(e) => handleUploadImage(e)}
                                    />
                                    <Button
                                        variant="outline"
                                        className="h-full rounded-s-none"
                                        onClick={() => handleButtonClick(courseImage)}
                                        type="button"
                                    >
                                        Tải file lên
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video quảng cáo */}
                    <div className="flex flex-col gap-2">
                        <h5 className="text-base font-bold">Video quảng cáo</h5>
                        <div className="flex items-start gap-8">
                            <div className="h-[300px] w-[450px] flex-shrink-0 overflow-hidden rounded-md border-[1px]">
                                {courseVideoPath ? (
                                    <video src={courseVideoPath} controls className="h-full w-full object-cover" />
                                ) : (
                                    <img src={placeholder} alt="Course image" className="h-full w-full object-cover" />
                                )}
                            </div>
                            <div className="flex w-[450px] flex-col gap-3">
                                <p className="text-sm leading-6">
                                    Video quảng cáo của bạn là một cách nhanh chóng và hấp dẫn để học viên xem trước
                                    những gì họ sẽ học trong khóa học của bạn. Học viên quan tâm đến khóa học của bạn có
                                    nhiều khả năng ghi danh hơn nếu video quảng cáo của bạn được thực hiện tốt.
                                </p>
                                <div className="flex h-[44px] items-center">
                                    <Input
                                        type="file"
                                        accept="video/*"
                                        ref={courseVideo}
                                        placeholder="Tải lên hình ảnh"
                                        onChange={(e) => handleUploadVideo(e)}
                                        className="flex h-full cursor-pointer items-start justify-center rounded-e-none"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-full rounded-s-none"
                                        onClick={() => handleButtonClick(courseVideo)}
                                    >
                                        Tải video lên
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hồ sơ giảng viên */}
                </div>
            </form>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Bảng quy đổi giá</DialogTitle>
                        <DialogDescription>
                            Vui lòng nhập mức giá cho khóa học của bạn. Tỷ lệ quy đổi là 1 coin tương ứng với 1.000 VNĐ.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <table className="w-full space-y-4">
                            <thead>
                                <tr>
                                    <th className="text-left">Mệnh Giá Tiền (VNĐ)</th>
                                    <th className="text-right">Số Coin</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-left">100.000 VNĐ</td>
                                    <td className="text-right">100 Coin</td>
                                </tr>
                                <tr>
                                    <td className="text-left">200.000 VNĐ</td>
                                    <td className="text-right">200 Coin</td>
                                </tr>
                                <tr>
                                    <td className="text-left">500.000 VNĐ</td>
                                    <td className="text-right">500 Coin</td>
                                </tr>
                                <tr>
                                    <td className="text-left">1.000.000 VNĐ</td>
                                    <td className="text-right">1.000 Coin</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={() => setDialogOpen(false)}>
                            Đóng
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
})

export default CourseOverview
