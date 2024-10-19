import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'

const AddQA = ({ open, isOpen }: { open: boolean; isOpen: (open: boolean) => void }) => {
    return (
        <Sheet open={open} onOpenChange={() => isOpen(false)}>
            <SheetContent>
                <SheetTitle>Thêm ghi chú mới</SheetTitle>
                <SheetDescription className="max-h-screen overflow-y-auto">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id placeat earum reiciendis harum ratione
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default AddQA
