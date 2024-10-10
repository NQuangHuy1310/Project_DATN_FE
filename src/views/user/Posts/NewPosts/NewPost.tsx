import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import PreviewPost from './PreviewPost'
import PublishPost from './PublishPost'
import { Button } from '@/components/ui/button'
import { formats, modules } from '@/constants/quillConstants'

const NewPost = () => {
    const [content, setContent] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [isOpenPreview, setIsOpenPreview] = useState<boolean>(false)
    const [isOpenPublish, setIsOpenPublish] = useState<boolean>(false)

    return (
        <div className="flex flex-col gap-7 rounded-md bg-white p-7">
            <div className="flex flex-col gap-5">
                <input type="text" onChange={(e) => setTitle(e.target.value)} className="w-full p-2 text-xl outline-none" placeholder="Tiêu đề" />
                <div>
                    <ReactQuill
                        theme="snow"
                        formats={formats}
                        modules={modules}
                        value={content}
                        onChange={setContent}
                    />
                </div>
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsOpenPreview(true)} disabled={!title || !content}>
                        Xem trước
                    </Button>
                    <Button onClick={() => setIsOpenPublish(true)} disabled={!title || !content}>Xuất bản</Button>
                </div>
                <div>
                    <PreviewPost content={content} title={title} open={isOpenPreview} setIsOpenPre={setIsOpenPreview} setIsOpenPub={setIsOpenPublish} />
                    <PublishPost title={title} open={isOpenPublish} setIsOpenPub={setIsOpenPublish} />
                </div>
            </div>
        </div>
    )
}
export default NewPost
