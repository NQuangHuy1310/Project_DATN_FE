import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog'

const ConfirmDialog = ({
    isPending,
    confirmDialog,
    handleDeleteModule
}: {
    isPending: boolean
    confirmDialog: boolean
    handleDeleteModule: () => void
}) => {
    return (
        <AlertDialog open={confirmDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Xoá nhận xoá chương</AlertDialogTitle>
                    <AlertDialogDescription>
                        Bạn sắp xóa một chương trình giảng dạy. Bạn có chắc chắn muốn tiếp tục không?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Huỷ</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteModule} disabled={isPending}>
                        Xoá
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmDialog
