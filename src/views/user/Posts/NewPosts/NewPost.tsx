
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Preview from './Preview';
import Publish from './Publish';
import { Dialog } from "@/components/ui/dialog"
import { formats, modules } from '@/constants/quillConstants';

const NewPost = () => {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')

    return (
        <div className="bg-white flex flex-col gap-7 p-7 rounded-md ">
            <div className='flex flex-col gap-5'>
                <input type="text" onChange={(e) => setTitle(e.target.value)} className="w-full p-2 outline-none text-xl" placeholder="Tiêu đề" />
                <div>
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        formats={formats}
                    />
                </div>

                <div className='flex gap-5 justify-end'>
                    {/* Xem trước */}
                    <Dialog>
                        <Preview content={content} title={title} />
                    </Dialog>
                    {/* Xuất bản */}
                    <Dialog>
                        <Publish />
                    </Dialog>
                </div>
            </div >
        </div >
    )
}
export default NewPost