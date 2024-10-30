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
import { Dispatch, SetStateAction } from 'react'

interface ConfirmDialogProps {
    title: string
    isPending: boolean
    description: string
    confirmDialog: boolean
    setConfirmDialog: Dispatch<SetStateAction<boolean>>
    handleDelete: () => void
}

const ConfirmDialog = ({
    title,
    isPending,
    description,
    confirmDialog,
    setConfirmDialog,
    handleDelete
}: ConfirmDialogProps) => {
    return (
        <AlertDialog open={confirmDialog} onOpenChange={setConfirmDialog} >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Huỷ</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isPending}>
                        Xoá
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmDialog
