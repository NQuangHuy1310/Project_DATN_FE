
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Preview from './Preview';
import Publish from './Publish';
import { Dialog } from "@/components/ui/dialog"
const NewPost = () => {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };
    const formats = [
        'header', 'font', 'align',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'script', 'list', 'bullet',
        'indent', 'blockquote', 'code-block',
        'link', 'image', 'video'
    ];
    return (
        <div className="bg-white flex flex-col gap-7 p-7 rounded-md ">
            <div className='flex flex-col gap-5'>
                <input type="text" onChange={(e) => setTitle(e.target.value)} className="w-full p-2 outline-none text-xl" placeholder="Tiêu đề" />
                <div className=''>
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        formats={formats}
                        className=''
                    />
                </div>
                <div className='flex gap-5 justify-end'>
                    <Dialog>
                        <Preview content={content} title={title} />
                    </Dialog>
                    <Dialog>
                        <Publish />
                    </Dialog>
                </div>
            </div >
        </div >
    )
}
export default NewPost