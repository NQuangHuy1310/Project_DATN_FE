import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { TbCoinFilled } from 'react-icons/tb'

interface IConfirmRecharge {
    totalAmount: number
}
const ConfirmRecharge = ({ totalAmount }: IConfirmRecharge) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Nạp tiền</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[40vw] max-h-[90vh] ">
                <DialogHeader>
                    <DialogTitle>Xác nhận thông tin</DialogTitle>
                    <DialogDescription>Thông tin của bạn được bảo mật an toàn</DialogDescription>
                </DialogHeader>
                <div className="flex justify-between border-b-2 p-3">
                    <span className="font-bold">Tài khoản</span>
                    <span>Lê Đình Dũng</span>
                </div>
                <div className="flex flex-col gap-2 border-b-2 p-3">
                    <span className="font-bold">Tổng cộng</span>
                    <div className="flex justify-between">
                        <span>{totalAmount.toLocaleString('vi-VN')} VNĐ</span>
                        <span className="flex items-center gap-1">
                            <TbCoinFilled className="size-4 text-yellow-500" /> {totalAmount / 1000}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="font-bold">Phương thức thanh toán</span>
                    <div className="flex justify-between items-center rounded-md border-2 px-3 py-2">
                        <div className="flex items-center gap-5">
                            <input type="radio" name="recharge" />
                            <span className="font-semibold">VNPAY</span>
                        </div>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s"
                            alt=""
                            className="h-11 w-11"
                        />
                    </div>
                    <div className="flex justify-between items-center rounded-md border-2 px-3 py-2">
                        <div className="flex items-center gap-5">
                            <input type="radio" name="recharge" />
                            <span className="font-semibold">ZaloPay</span>
                        </div>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe6SEQ293X0nfFojf6nsCWKA8dNGOrqn21jg&s"
                            alt=""
                            className="h-11 w-11"
                        />
                    </div>
                    <div className="flex justify-between items-center rounded-md border-2 px-3 py-2">
                        <div className="flex items-center gap-5">
                            <input type="radio" name="recharge" />
                            <span className="font-semibold">MoMo</span>
                        </div>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnV4cUM7jBauINof35Yn_unOz976Iz5okV8A&s"
                            alt=""
                            className="h-11 w-11"
                        />
                    </div>
                    <p>
                        Lưu ý: Chúng tôi không hoàn tiền đối với khoản tiền đã nạp. Bạn là người quyết định các hoá đơn
                        sẽ thanh toán sử dụng số dư đã nạp.
                    </p>
                </div>
                <DialogFooter>
                    <Button type="submit">Thanh toán ngay</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmRecharge
