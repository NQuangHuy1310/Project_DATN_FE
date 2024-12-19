import { toast } from 'sonner'
import { format } from 'date-fns'
import ReactQuill from 'react-quill'
import { useEffect, useRef, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { LiaTimesSolid } from 'react-icons/lia'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import placeholder from '@/assets/placeholder.jpg'
import { useGetCategories } from '@/app/hooks/categories'

import { MessageErrors } from '@/constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { getImagesUrl, readFileAsDataUrl, validateFileSize } from '@/lib'
import { createPost, createPostSchema } from '@/validations'
import { formats, modules } from '@/constants/quillConstants'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { CalendarIcon } from '@radix-ui/react-icons'
import { useCreatePost, useGetPost, useUpdatePost } from '@/app/hooks/posts'
import { useNavigate, useParams } from 'react-router-dom'
import routes from '@/configs/routes'
import Loading from '@/components/Common/Loading/Loading'

const NewPost = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors, isSubmitting }
    } = useForm<createPost>({
        resolver: zodResolver(createPostSchema)
    })

    const { slug } = useParams()
    const navigate = useNavigate()
    const { data: categories } = useGetCategories()
    const { mutateAsync: createNewPost } = useCreatePost()
    const { mutateAsync: updatedPost } = useUpdatePost()
    const { data: postData, isLoading } = useGetPost(slug!)

    const [date, setDate] = useState<Date>()
    const [tags, setTags] = useState<string[]>([])
    const [isAllowComment, setIsAllowComment] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>()
    const [inputValue, setInputValue] = useState<string>('')
    const [blogImagePath, setBlogImagePath] = useState<string>(placeholder)
    const [blogImageFile, setBlogImageFile] = useState<File | null>(null)
    const imageThumbnail = useRef<HTMLInputElement | null>(null)

    const handleButtonClick = (inputRef: React.RefObject<HTMLInputElement>) => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && validateFileSize(file, 'image')) {
            try {
                setBlogImageFile(file)
                const imageUrl = await readFileAsDataUrl(file)
                setBlogImagePath(imageUrl)
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : MessageErrors.uploadFile
                toast.error(errorMessage)
            }
        }
    }

    const handleChangeContent = (value: string) => {
        setValue('content', value)
    }

    const handleChangeSelect = (value: string) => {
        setSelectedCategory(value)
        setValue('categories', value)
    }

    const handleAddTag = (e: any) => {
        if (e.key === 'Enter') {
            if (e.key === 'Enter') {
                e.preventDefault()

                if (inputValue.trim()) {
                    setTags((prevTags) => [...prevTags, inputValue.trim()])
                    setInputValue('')
                }
            }
        }
    }

    const handleRemoveTag = (index: number) => {
        const newTags = [...tags]
        newTags.splice(index, 1)
        setTags(newTags)
    }

    const handleToggle = () => {
        setIsAllowComment((prev) => !prev)
    }

    const handleSubmitForm: SubmitHandler<createPost> = async (data) => {
        if (postData) {
            const payload = {
                ...data,
                thumbnail: blogImageFile!,
                allow_comments: isAllowComment ? 1 : 0,
                tags: tags,
                is_active: 1,
                categories: data.categories.split(',').map((category) => category.trim()),
                status: selectedStatus as 'published' | 'private',
                _method: 'PUT'
            }
            await updatedPost([slug!, payload])
            navigate(routes.myPosts)
        } else {
            const payload = {
                ...data,
                thumbnail: blogImageFile!,
                published_at: date || new Date(),
                allow_comments: isAllowComment ? 1 : 0,
                tags: tags,
                is_active: 1,
                categories: data.categories.split(',').map((category) => category.trim()),
                status: selectedStatus as 'published' | 'private'
            }
            await createNewPost(payload)
            navigate(routes.myPosts)
        }
    }

    useEffect(() => {
        if (postData) {
            setValue('title', postData.title)
            setValue('description', postData.description)
            setValue('content', postData.content)
            setValue('categories', postData.categories.map((category) => category.id.toString()).join(','))
            setSelectedCategory(postData.categories[0].id.toString())
            setSelectedStatus(postData.status)
            setBlogImagePath(getImagesUrl(postData.thumbnail))
            setIsAllowComment(postData.allow_comments === 1)
            setDate(new Date(postData.published_at))
            setTags(postData.tags.map((tag) => tag.name))
        }
    }, [postData, setValue])

    if (isLoading && slug) {
        return <Loading />
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="flex flex-col gap-7 rounded-md bg-white p-7">
                <Tabs defaultValue="content" className="flex min-h-[500px] flex-col gap-3">
                    <TabsList className="grid w-[400px] grid-cols-2">
                        <TabsTrigger value="content">Nội dung bài viết</TabsTrigger>
                        <TabsTrigger value="status">Thông tin bài viết</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" asChild>
                        <div className="flex flex-col gap-4">
                            {/* Tiêu đề bài viết */}
                            <div className="space-y-1">
                                <label className="text-sm text-muted-foreground">
                                    Bạn cần nhập tiêu đề cho bài viết của mình
                                </label>
                                <Input type="text" placeholder="Tiêu đề" autoFocus {...register('title')} />
                                {errors.title && (
                                    <div className="text-sm text-secondaryRed">{errors.title.message}</div>
                                )}
                            </div>

                            {/* Mô tả ngắn */}
                            <div className="space-y-1">
                                <label className="text-sm text-muted-foreground">
                                    Bạn cần nhập mô tả ngắn cho bài viết của mình
                                </label>
                                <Textarea
                                    placeholder="Mô tả bài viết"
                                    rows={3}
                                    className="resize-none"
                                    {...register('description')}
                                />
                                {errors.description && (
                                    <div className="text-sm text-secondaryRed">{errors.description.message}</div>
                                )}
                            </div>

                            {/* Nội dung */}
                            <div className="space-y-1">
                                <label className="text-sm text-muted-foreground">
                                    Bạn cần nhập nội dung cho bài viết của mình
                                </label>
                                <ReactQuill
                                    theme="snow"
                                    formats={formats}
                                    modules={modules}
                                    value={getValues('content')}
                                    onChange={handleChangeContent}
                                    placeholder="Nội dung bài viết"
                                />
                                {errors.description && (
                                    <div className="text-sm text-secondaryRed">{errors.description.message}</div>
                                )}
                            </div>

                            {/* Danh mục */}
                            <div className="space-y-1">
                                <label className="text-sm text-muted-foreground">Chọn danh mục cho bài viết</label>
                                <Select name="category" value={selectedCategory} onValueChange={handleChangeSelect}>
                                    <SelectTrigger className="flex w-[300px] justify-between">
                                        <SelectValue placeholder="Danh mục bài viết" />
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

                                {errors.categories && (
                                    <div className="text-sm text-secondaryRed">{errors.categories.message}</div>
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="status">
                        <div className="flex flex-col gap-4">
                            {/* Ảnh bìa */}
                            <div className="space-y-1">
                                <h5 className="text-sm text-muted-foreground">Ảnh bìa cho bài viết</h5>
                                <div className="flex items-start gap-8">
                                    <div className="h-[300px] w-[500px] flex-shrink-0 overflow-hidden rounded-md border-[1px]">
                                        <img
                                            src={blogImagePath}
                                            alt="Course image"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex w-[500px] flex-col gap-3">
                                        <p className="text-sm leading-6">
                                            Tải hình ảnh bài viết lên tại đây. Để được chấp nhận, hình ảnh phải đáp ứng
                                            tiêu chuẩn chất lượng hình ảnh. Hướng dẫn quan trọng: 750x422 pixel; .jpg,
                                            .jpeg,. gif, hoặc .png
                                        </p>
                                        <div className="flex h-[44px] items-center">
                                            <Input
                                                type="file"
                                                className="flex h-full cursor-pointer items-start justify-center rounded-e-none"
                                                placeholder="Tải lên hình ảnh"
                                                ref={imageThumbnail}
                                                onChange={handleUploadImage}
                                            />
                                            <Button
                                                variant="outline"
                                                className="h-full rounded-s-none"
                                                onClick={() => handleButtonClick(imageThumbnail)}
                                                type="button"
                                            >
                                                Tải file lên
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                {/* Trạng thái */}
                                <div className="flex w-[500px] flex-shrink-0 flex-col items-start gap-1">
                                    <label className="text-sm text-muted-foreground">Hiển thị</label>
                                    <Select name="status" value={selectedStatus} onValueChange={setSelectedStatus}>
                                        <SelectTrigger className="flex w-[300px] justify-between">
                                            <SelectValue placeholder="Trạng thái hiển thị" />
                                        </SelectTrigger>
                                        <SelectContent side="bottom" align="end">
                                            <SelectGroup>
                                                <SelectItem value="published">Công khai</SelectItem>
                                                <SelectItem value="private">Riêng tư</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Bình luận */}
                                <div className="flex w-[500px] flex-shrink-0 flex-col items-start gap-1">
                                    <label className="text-sm text-muted-foreground">Bình luận</label>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Switch checked={isAllowComment} onCheckedChange={handleToggle} />
                                        {isAllowComment ? 'Cho phép bình luận' : 'Tắt bình luận'}
                                    </div>
                                </div>
                            </div>

                            {/* Ngày xuất bản */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-muted-foreground">Chọn ngày xuất bản bài viết</label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'h-[48px] w-[300px] justify-start text-left font-normal',
                                                !date && 'text-muted-foreground'
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Tags */}
                            <div className="space-y-1">
                                <label className="text-sm text-muted-foreground">Từ khóa bài viết</label>
                                <div className="flex flex-col gap-2">
                                    <Input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleAddTag}
                                        placeholder="Nhập thẻ và nhấn Enter"
                                        className="w-[500px]"
                                    />
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tag, index) => (
                                            <div key={index}>
                                                <Button variant="outline" className="flex gap-1">
                                                    {tag}
                                                    <span onClick={() => handleRemoveTag(index)}>
                                                        <LiaTimesSolid />
                                                    </span>
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="ml-auto">
                    <Button type="submit" disabled={isSubmitting}>
                        {postData ? 'Cập nhật bài viết' : 'Tạo bài viết'}
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default NewPost
