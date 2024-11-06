import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getImagesUrl } from '@/lib'
import { IoIosWarning } from 'react-icons/io'
import { TbCoinFilled } from 'react-icons/tb'
import { transaction } from '@/constants/mockData'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'
import ConfirmTransaction from '@/views/user/wallet/transaction/ConfirmTransaction'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loading from '@/components/Common/Loading/Loading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useGetHistoryClient, useTransactionById } from '@/app/hooks/transactions/useTransaction'

const Transaction = () => {
    const [totalAmount, setTotalAmount] = useState<number>(0)
    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string>('')
    const { user } = useGetUserProfile()

    const { data: transactionData, isLoading } = useTransactionById(user?.id || 0)
    const { data: history } = useGetHistoryClient(user?.id || 0)

    const balance = Math.floor(transactionData?.balance ?? 0)

    const handleSelect = (cash: number) => {
        setTotalAmount(cash)
        setInputValue('')
        setError('')
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (/^\d*$/.test(value)) {
            const numericValue = Number(value)
            if (numericValue <= 5000000) {
                setTotalAmount(numericValue)
                setInputValue(value)
                if (numericValue > 0 && numericValue < 50000) {
                    setError('Số tiền phải từ 50.000 VNĐ trở lên.')
                } else {
                    setError('')
                }
            } else {
                setError('Giá trị không được vượt quá 5 triệu.')
            }
        } else {
            setError('Vui lòng chỉ nhập số.')
        }
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search)
        const statusFromURL = queryParams.get('status')
        if (statusFromURL === 'success') {
            toast.success('Nạp tiền thành công! Vui lòng kiểm tra số dư')
            queryParams.delete('status')
            window.history.replaceState(null, '', '?' + queryParams.toString())
        }
        if (statusFromURL === 'error') {
            toast.error('Nạp tiền thất bại! Vui lòng thử lại')
            queryParams.delete('status')
            window.history.replaceState(null, '', '?' + queryParams.toString())
        }
    }, [])

    if (isLoading) return <Loading />

    return (
        <div>
            <div className="flex flex-col gap-2 rounded-md bg-white p-7">
                <div className="flex justify-between gap-5">
                    <div className="flex w-3/12 flex-col gap-5">
                        <div className="rounded-md bg-[#04A4F459]">
                            <div className="flex items-center gap-3 p-5">
                                <Avatar className="size-10 cursor-pointer">
                                    <AvatarImage
                                        className="object-cover"
                                        src={getImagesUrl(user?.avatar || '')}
                                        alt={user?.name}
                                    />
                                    <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                        {user?.name.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-1">
                                    <span className="text-lg font-medium">{user?.name}</span>
                                    <div className="flex items-center gap-1 font-medium">
                                        <span>Số dư:</span>
                                        <TbCoinFilled className="size-4 text-yellow-500" />
                                        <span>{balance}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-md bg-[#eda44a1a]">
                            <div className="flex flex-col gap-3 p-5">
                                <h4 className="text-lg font-medium">Tỉ lệ quy đổi từ tiền sang xu</h4>
                                <div className="flex flex-col gap-3">
                                    <span className="flex items-center gap-1">
                                        <TbCoinFilled className="size-4 text-yellow-500" /> 10 = 10.000 VNĐ
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <TbCoinFilled className="size-4 text-yellow-500" /> 50 = 50.000 VNĐ
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <TbCoinFilled className="size-4 text-yellow-500" /> 100 = 100.000 VNĐ
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <TbCoinFilled className="size-4 text-yellow-500" /> 500 = 500.000 VNĐ
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-md border">
                            <div className="flex flex-col gap-3 p-5">
                                <h4 className="text-lg font-medium">Quy tắc nạp tiền</h4>
                                <div className="flex flex-col gap-3">
                                    <p>Số tiền tối thiểu mỗi lần nạp : 50.000 VNĐ</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-md border">
                            <div className="flex flex-col gap-3 p-5">
                                <div className="flex gap-3">
                                    <div>
                                        <IoIosWarning className="size-5 text-yellow-400" />
                                    </div>
                                    <span className="text-red-500">
                                        Lưu ý: Chúng tôi không hoàn tiền đối với khoản tiền đã nạp. Bạn là người quyết
                                        định các hoá đơn sẽ thanh toán sử dụng số dư đã nạp.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-9/12 rounded-md border p-10">
                        <div className="flex flex-col gap-5">
                            <p className="text-lg">
                                Tại đây bạn có thể nạp tiền vào tài khoản cá nhân để sử dụng thanh toán cho các lần chi
                                trả mua khóa học.
                            </p>

                            <div className="flex flex-col gap-3">
                                <span className="text-lg font-medium">Chọn mệnh giá</span>
                                <div className="mx-auto flex flex-col gap-5">
                                    <div className="flex flex-wrap justify-center gap-5">
                                        {transaction.map((transaction, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleSelect(transaction.cash)}
                                                className={`flex h-24 w-56 cursor-pointer items-center justify-center rounded-md border-2 ${totalAmount === transaction.cash ? 'border-yellow-400' : ''}`}
                                            >
                                                <div className="text-center">
                                                    <span className="flex items-center justify-center gap-1 font-medium text-yellow-400">
                                                        <TbCoinFilled className="size-4 text-yellow-500" />{' '}
                                                        {transaction.cent}
                                                    </span>
                                                    <span className="font-medium">
                                                        {transaction.cash.toLocaleString('vi-VN')} VNĐ
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span>Bạn cũng có thể nhập số tiền muốn nạp</span>
                                        <div className="relative">
                                            <Input
                                                type="text"
                                                placeholder="Nhập số tiền mà bạn muốn nạp"
                                                className="w-full pr-12"
                                                value={inputValue}
                                                onChange={handleInputChange}
                                            />
                                            <span className="absolute right-2 top-1/2 -translate-y-1/2 transform font-medium text-darkGrey">
                                                VNĐ
                                            </span>
                                        </div>
                                        {error && <p className="mt-2 text-red-500">{error}</p>}
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <span className="font-medium">
                                            Tổng : <b>{totalAmount.toLocaleString('vi-VN')} VNĐ</b>
                                        </span>
                                        <div>
                                            {totalAmount > 50000 && user ? (
                                                <ConfirmTransaction totalAmount={totalAmount} user={user} />
                                            ) : (
                                                <Button disabled>Nạp tiền</Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5 sm:rounded-lg">
                    <h3 className="text-2xl font-bold">Lịch sử nạp tiền</h3>
                    <table className="w-full text-left text-sm text-darkGrey rtl:text-right">
                        <thead className="bg-gray-50 text-xs uppercase text-darkGrey">
                            <tr>
                                <th scope="col" className="p-4">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Số tiền nạp
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Sỗ xu
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ngày nạp
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Trạng thái
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {history?.map((data, index) => (
                                <tr
                                    key={index}
                                    className="dark:border-dartext-darkGrey border-b bg-white hover:bg-gray-50 dark:bg-gray-800"
                                >
                                    <th
                                        scope="row"
                                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                    >
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">{Math.floor(data.amount).toLocaleString('vi-VN')} VNĐ</td>
                                    <td className="flex gap-1 px-6 py-4">
                                        <TbCoinFilled className="size-5 text-yellow-500" />
                                        {Math.floor(data.coin)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {' '}
                                        {new Date(data.date_of_transaction).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="px-6 py-4">{data.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Transaction
