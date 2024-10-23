/* eslint-disable no-unused-vars */
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'

interface PreviewImageProps {
    imageSrc: string
    open: boolean
    onOpenChange: (open: boolean) => void
}

const PreviewImage: React.FC<PreviewImageProps> = ({ imageSrc, onOpenChange, open }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange} aria-describedby={undefined}>
            <DialogContent className="h-[600px] w-full max-w-[1000px] overflow-hidden">
                <DialogHeader>
                    <DialogTitle>Xem trước hình ảnh</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="h-[500px] w-full">
                    <img src={imageSrc} alt="preview" className="h-full w-full rounded-md object-cover" />
                </div>
                <DialogFooter></DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default PreviewImage
