import { useState } from 'react'
import { TbCoinFilled } from 'react-icons/tb'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'

import { IUser } from '@/types'
import { Button } from '@/components/ui/button'
import { usePostPayment } from '@/app/hooks/transactions/transaction'

interface IConfirmTransaction {
    totalAmount: number
    user: IUser
}

const ConfirmTransaction = ({ totalAmount, user }: IConfirmTransaction) => {
    const [selectedPayment, setSelectedPayment] = useState(null)

    const { mutateAsync: paymentPost } = usePostPayment()

    const handlePaymentChange = (method: any) => {
        setSelectedPayment(method)
    }

    const handlePayment = async () => {
        if (selectedPayment === 'VNPAY') {
            const response = await paymentPost([
                user.id,
                {
                    amount: totalAmount
                }
            ])
            const vnpayUrl = response.data.data
            if (vnpayUrl) {
                window.location.href = vnpayUrl
            }

        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Nạp tiền</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-[40vw]">
                <DialogHeader>
                    <DialogTitle>Xác nhận thông tin</DialogTitle>
                    <DialogDescription>Thông tin của bạn được bảo mật an toàn</DialogDescription>
                </DialogHeader>
                <div className="flex justify-between border-b-2 p-3">
                    <span className="font-bold">Tài khoản</span>
                    <span>{user?.name}</span>
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

                    <label
                        className="flex cursor-pointer items-center justify-between rounded-md border-2 px-3 py-2"
                        htmlFor="vnpay"
                    >
                        <div className="flex items-center gap-5">
                            <input
                                type="radio"
                                id="vnpay"
                                name="transaction"
                                onChange={() => handlePaymentChange('VNPAY')}
                                checked={selectedPayment === 'VNPAY'}
                            />
                            <span className="font-semibold">VNPAY</span>
                        </div>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s"
                            alt="VNPAY"
                            className="h-11 w-11"
                        />
                    </label>
                    <label
                        className="flex cursor-pointer items-center justify-between rounded-md border-2 px-3 py-2"
                        htmlFor="zalopay"
                    >
                        <div className="flex items-center gap-5">
                            <input
                                type="radio"
                                id="zalopay"
                                name="transaction"
                                onChange={() => handlePaymentChange('ZaloPay')}
                                checked={selectedPayment === 'ZaloPay'}
                            />
                            <span className="font-semibold">ZaloPay</span>
                        </div>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe6SEQ293X0nfFojf6nsCWKA8dNGOrqn21jg&s"
                            alt="ZaloPay"
                            className="h-11 w-11"
                        />
                    </label>
                    <label
                        className="flex cursor-pointer items-center justify-between rounded-md border-2 px-3 py-2"
                        htmlFor="momo"
                    >
                        <div className="flex items-center gap-5">
                            <input
                                type="radio"
                                id="momo"
                                name="transaction"
                                onChange={() => handlePaymentChange('MoMo')}
                                checked={selectedPayment === 'MoMo'}
                            />
                            <span className="font-semibold">MoMo</span>
                        </div>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnV4cUM7jBauINof35Yn_unOz976Iz5okV8A&s"
                            alt="MoMo"
                            className="h-11 w-11"
                        />
                    </label>
                    <p>
                        Lưu ý: Chúng tôi không hoàn tiền đối với khoản tiền đã nạp. Bạn là người quyết định các hóa đơn
                        sẽ thanh toán sử dụng số dư đã nạp.
                    </p>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={handlePayment}
                        className={`mt-4 rounded px-4 py-2 text-white ${selectedPayment === 'VNPAY' ? 'bg-blue-500' : 'cursor-not-allowed bg-darkGrey'}`}
                        disabled={selectedPayment !== 'VNPAY'}
                    >
                        Thanh toán ngay
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmTransaction
