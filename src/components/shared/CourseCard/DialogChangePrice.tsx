import { useUpdateCoursePriceSale } from '@/app/hooks/instructors'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/lib'
import { ICourseItem } from '@/types/instructor'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'sonner'

interface DialogChangePriceProps {
    courseData: ICourseItem
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const DialogChangePrice = ({ courseData, open, setOpen }: DialogChangePriceProps) => {
    const { mutateAsync } = useUpdateCoursePriceSale()

    const [coursePrice, setCoursePriceSale] = useState<number>(+courseData.price_sale)

    const handleSubmit = async () => {
        if (coursePrice > +courseData.price) {
            toast.error('Giá khuyến mãi không thể lớn hơn giá gốc')
        }

        if (coursePrice < +courseData.price * 0.3) {
            toast.error('Giá khuyến mãi không thể nhỏ hơn 30% giá gốc')
        }

        const payload = {
            price_sale: coursePrice,
            _method: 'PUT'
        }

        await mutateAsync([courseData.id, payload])
        setOpen(false)
        setCoursePriceSale(0)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>
                        Chỉnh sửa giá cho khóa học :{' '}
                        <strong className="font-semibold text-secondaryGreen">{courseData.name}</strong>
                    </DialogTitle>
                </DialogHeader>
                <div className="flex w-full flex-col gap-4">
                    <div className="">
                        <Input placeholder="Giá khóa học" value={formatPrice(courseData.price)} disabled />
                        <span className="text-xs text-darkGrey">
                            Nếu bạn để giá khoá học là 0 thì đây là khoá học miễn phí
                        </span>
                    </div>
                    <div className="">
                        <Input
                            placeholder="Giá khuyến mãi của khóa học"
                            autoFocus
                            type="number"
                            value={formatPrice(coursePrice)}
                            onChange={(e) => setCoursePriceSale(+e.target.value)}
                        />
                        <span className="text-xs text-darkGrey">Giá khuyến mãi của khoá học</span>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={() => setOpen(false)} variant="destructive">
                        Hủy
                    </Button>
                    <Button type="submit" onClick={handleSubmit}>
                        Lưu giá khóa học
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogChangePrice
