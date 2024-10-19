import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'

const AddAllNote = ({ open, isOpen }: { open: boolean; isOpen: (open: boolean) => void }) => {
    return (
        <Sheet open={open} onOpenChange={() => isOpen(false)}>
            <SheetContent>
                <SheetTitle>Thêm ghi chú mới</SheetTitle>
                <SheetDescription className="max-h-screen overflow-y-auto">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur debitis atque possimus suscipit
                    nostrum adipisci, excepturi architecto, quos molestiae, minus aliquid delectus qui culpa
                    exercitationem nam officia praesentium dolorem inventore. Dignissimos, dolore illo magni iste quidem
                    quam sunt exercitationem ipsa debitis recusandae repellat, necessitatibus voluptatem doloremque
                    explicabo tempore perferendis
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default AddAllNote
