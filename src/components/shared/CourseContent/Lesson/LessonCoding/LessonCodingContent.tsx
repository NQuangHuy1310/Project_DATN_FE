import CodeEditor from '@/components/shared/CodeEditor'
import { formats, modules } from '@/constants/quillConstants'
import ReactQuill from 'react-quill'

const LessonCodingContent = () => {
    const handleEditorChange = (value: string) => {
        console.log(value) // Xử lý giá trị ở đây
    }

    return (
        <div className="flex w-full flex-col items-start justify-start gap-4">
            <div className="w-full space-y-1">
                <label className="text-sm text-muted-foreground">Nhập đề bài cho bài tập của bạn</label>
                <ReactQuill formats={formats} modules={modules} placeholder="Nhập đề bài cho bài tập..." />
            </div>

            <div className="flex w-full items-center gap-2 md:flex-wrap">
                <div className="flex-1 space-y-1">
                    <label className="text-sm text-muted-foreground">Nhập mã nguồn mẫu</label>
                    <CodeEditor height="300px" onChange={handleEditorChange} />
                </div>
                <div className="flex-1 space-y-1">
                    <label className="text-sm text-muted-foreground">Nhập giải pháp của bạn</label>
                    <CodeEditor height="300px" />
                </div>
            </div>

            <div className="w-full space-y-1">
                <label className="text-sm text-muted-foreground">Gợi ý cho bài tập của bạn</label>
                <ReactQuill formats={formats} modules={modules} placeholder="Nhập đề bài cho bài tập..." />
            </div>
        </div>
    )
}

export default LessonCodingContent
