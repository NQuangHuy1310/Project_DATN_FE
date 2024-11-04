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

const PreviewImage = ({ imageSrc, onOpenChange, open }: PreviewImageProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange} aria-describedby={undefined}>
            <DialogContent className="h-[600px] w-full max-w-[1000px] overflow-hidden">
                <DialogHeader>
                    <DialogTitle>Xem trước hình ảnh</DialogTitle>
                    <DialogDescription>{!imageSrc ? 'Đang tải...' : ''}</DialogDescription>
                </DialogHeader>
                <div className="flex h-[500px] w-full items-center justify-center">
                    {imageSrc ? (
                        <img src={imageSrc} alt="preview" className="h-full w-full rounded-md object-cover" />
                    ) : (
                        <span className="text-gray-500">Đang tải...</span>
                    )}
                </div>
                <DialogFooter></DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default PreviewImage
