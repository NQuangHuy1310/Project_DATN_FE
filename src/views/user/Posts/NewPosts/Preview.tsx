import { Button } from "@/components/ui/button"
import {
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
interface IPreview {
    content: string
    title: string
}
const Preview = ({ content, title }: IPreview) => {
    return (
        <div>
            <DialogTrigger asChild>
                <Button variant="outline"  >Xem trước</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[70vw] max-h-[90vh] overflow-y-scroll">
                <DialogTitle className="text-2xl font-medium border-b">{title}</DialogTitle>
                <div className="flex flex-col gap-5 p-6">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </DialogContent>
        </div>
    )
}

export default Preview