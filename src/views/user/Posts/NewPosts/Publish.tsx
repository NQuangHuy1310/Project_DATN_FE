import { KeyboardEvent, useState } from 'react'
import { DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { readFileAsDataUrl } from '@/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LiaTimesSolid } from 'react-icons/lia';

const Publish = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imagePreview, setImagePreview] = useState<string>('')

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const data = await readFileAsDataUrl(file)
                setImagePreview(data)
            } catch (error) {
                console.error("Lỗi tải ảnh lên", error);
            }
        }
    }

    const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === 'Enter' || e.key === ',') && inputValue.trim() !== '') {
            if (!tags.includes(inputValue.trim())) {
                setTags([...tags, inputValue.trim()]);
                setInputValue('');
            }
        }
    };

    const handleRemoveTag = (indexToRemove: number) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div>
            <DialogTrigger asChild>
                <Button>Xuất bản</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[70vw]">
                <div className="bg-white rounded-lg p-4 w-full relative">
                    <div className='flex flex-col gap-5'>
                        <DialogTitle>Xuất bản</DialogTitle>
                        <div className="flex gap-10">

                            {/* Preview Ảnh */}
                            <div className="flex items-center justify-center text-center px-3 border-2 border-dashed w-full rounded-lg bg-softGrey">
                                <label htmlFor="file-upload" className="cursor-pointer w-full h-[250px] flex flex-col items-center justify-center">

                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-[250px] object-cover" />
                                    ) : (<div className='bg-softGrey'>
                                        <span className="text-darkGrey">
                                            Ảnh đại diện hấp dẫn giúp bài viết của bạn cuốn hút hơn với độc giả.
                                        </span>
                                        <br />
                                        <span className="text-red-500">
                                            Kéo thả ảnh vào đây, hoặc bấm để chọn ảnh
                                        </span>
                                    </div>
                                    )}

                                </label>
                                <Input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                            </div>

                            {/* Từ khóa và bài viết */}
                            <div className='flex flex-col gap-5 w-full'>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="tags" className="block font-medium text-darkGrey">
                                        Từ khóa bài viết
                                    </label>
                                    <div className="border-b p-2 flex gap-2 flex-wrap">
                                        {tags.map((tag, index) => (
                                            <div key={index} className="bg-blue-100 text-primary px-2 py-1 rounded-md flex items-center">
                                                {tag}
                                                <span className="ml-2 text-red-500 cursor-pointer" onClick={() => handleRemoveTag(index)}>
                                                    <LiaTimesSolid />
                                                </span>
                                            </div>
                                        ))}
                                        <input id="tags" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleAddTag} placeholder="Nhập thẻ và nhấn Enter" className="outline-none " />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className="block font-medium text-darkGrey">
                                        Mô tả bài viết
                                    </label>
                                    <textarea placeholder='Nhập mô tả' value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border-b outline-none"
                                        rows={2}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" />
                                    <label className="text-sm">
                                        Đề xuất bài viết của bạn đến các độc giả quan tâm tới nội dung này.
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-5 justify-end">
                            <Button variant="outline" >Hủy</Button>
                            <Button >Xuất bản ngay</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </div>
    )
}

export default Publish