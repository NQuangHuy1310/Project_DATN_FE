import { Dispatch, SetStateAction, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { courseModule, courseModuleSchema } from '@/validations'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useCreateModule, useUpdateModule } from '@/app/hooks/instructors'
import { Button } from '@/components/ui/button'

interface DialogAddModuleProps {
    id: string
    openDialog: boolean
    selectedData: { name: string; description: string; id: string } | undefined
    setOpenDialog: Dispatch<SetStateAction<boolean>>
}

const DialogAddModule = ({ id, openDialog, setOpenDialog, selectedData }: DialogAddModuleProps) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { isSubmitting, errors }
    } = useForm<courseModule>({
        resolver: zodResolver(courseModuleSchema)
    })

    const { mutateAsync: createModule } = useCreateModule()
    const { mutateAsync: updateModule } = useUpdateModule()

    const handleSubmitForm: SubmitHandler<courseModule> = async (data) => {
        if (selectedData) {
            const payload = {
                ...data,
                _method: 'PUT'
            }
            await updateModule([selectedData.id, payload])
        } else {
            await createModule([id, data])
        }
        reset()
        setOpenDialog(false)
    }

    useEffect(() => {
        if (openDialog && selectedData) {
            setValue('title', selectedData.name)
            setValue('description', selectedData.description)
        } else {
            reset()
        }
    }, [openDialog, setValue, reset, selectedData])

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="sm:max-w-[650px]" aria-describedby={undefined}>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <DialogHeader>
                        <DialogTitle>{selectedData ? 'Sửa thông tin chương' : 'Tạo chương mới'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-muted-foreground">Nhập tiêu đề cho phần mới</label>
                            <Input
                                required
                                autoFocus
                                type="text"
                                placeholder="Nội dung tiêu đề"
                                className="h-[45px]"
                                {...register('title')}
                            />
                            {errors.title && <div className="text-sm text-secondaryRed">{errors.title.message}</div>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-muted-foreground">
                                Học viên có thể làm gì sau khi phần này kết thúc
                            </label>
                            <Textarea required rows={3} placeholder="Mục tiêu học tập" {...register('description')} />
                            {errors.description && (
                                <div className="text-sm text-secondaryRed">{errors.description.message}</div>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            onClick={() => setOpenDialog(false)}
                            variant="outline"
                            disabled={isSubmitting}
                        >
                            Huỷ
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {selectedData ? 'Lưu thông tin' : 'Tạo mới'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default DialogAddModule
