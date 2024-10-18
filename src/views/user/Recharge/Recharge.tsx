// import { Link } from 'react-router-dom'
import { ChangeEvent, useState } from 'react'

// import {
//     Breadcrumb,
//     BreadcrumbItem,
//     BreadcrumbLink,
//     BreadcrumbList,
//     BreadcrumbPage,
//     BreadcrumbSeparator
// } from '@/components/ui/breadcrumb'
import { getImagesUrl } from '@/lib'
import { Input } from '@/components/ui/input'
import { IoIosWarning } from 'react-icons/io'
import { TbCoinFilled } from 'react-icons/tb'
import ConfirmRecharge from './ConfirmRecharge'
import { recharge } from '@/constants/mockData'
import { Button } from '@/components/ui/button'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Recharge = () => {
    const [totalAmount, setTotalAmount] = useState<number>(0)
    const [inputValue, setInputValue] = useState<string>('')
    const { user } = useGetUserProfile()
    const handleSelect = (cash: number) => {
        setTotalAmount(cash)
        setInputValue('')
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = (e.target.valueAsNumber)
        setTotalAmount(value)
        setInputValue(e.target.value)
    }

    return (
        <div>
            {/* <div className="flex flex-col gap-2 rounded-md p-7">
                <h1 className="text-2xl font-bold">Nạp tiền vào tài khoản</h1>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                <Link to={'/'}>Trang chủ</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Nạp tiền</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div> */}
            <div className="flex flex-col gap-2 rounded-md bg-white p-7">
                <div className="flex justify-between gap-5">
                    <div className="flex w-4/12 flex-col gap-5">
                        <div className="rounded-md bg-[#04A4F459]">
                            <div className="flex items-center gap-3 p-5">
                                <Avatar className="size-10 cursor-pointer">
                                    <AvatarImage className="object-cover" src={getImagesUrl(user?.avatar || '')} alt={user?.name} />
                                    <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                        {user?.name.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-1">
                                    <span className="text-lg font-medium">{user?.name}</span>
                                    <div className="flex items-center gap-1 font-medium">
                                        <span>Số dư:</span>
                                        <TbCoinFilled className="size-4 text-yellow-500" />
                                        <span>500</span>
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
                    <div className="w-8/12 rounded-md border p-10">
                        <div className="flex flex-col gap-5">
                            <p className="text-lg">
                                Tại đây bạn có thể nạp tiền vào tài khoản cá nhân để sử dụng thanh toán cho các lần chi
                                trả mua khóa học.
                            </p>

                            <div className="flex flex-col gap-3">
                                <span className="text-lg font-medium">Chọn mệnh giá</span>
                                <div className="mx-auto flex max-w-[750px] flex-col gap-5">
                                    <div className="flex flex-wrap justify-between gap-5">
                                        {recharge.map((recharge, index) => (
                                            <div key={index} onClick={() => handleSelect(recharge.cash)} className={`flex h-24 w-56 cursor-pointer items-center justify-center rounded-md border-2 ${totalAmount === recharge.cash ? 'border-yellow-400' : ''}`}>
                                                <div className="text-center">
                                                    <span className="flex items-center justify-center gap-1 font-medium text-yellow-400">
                                                        <TbCoinFilled className="size-4 text-yellow-500" />{' '}
                                                        {recharge.cent}
                                                    </span>
                                                    <span className="font-medium">
                                                        {recharge.cash.toLocaleString('vi-VN')} VNĐ
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span>Bạn cũng có thể nhập số tiền muốn nạp</span>
                                        <Input
                                            type="number"
                                            placeholder="Nhập số tiền mà bạn muốn nạp"
                                            className="w-full"
                                            value={inputValue}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <span className="font-medium">
                                            Tổng : <b>{totalAmount.toLocaleString('vi-VN')} VNĐ</b>
                                        </span>
                                        <div>
                                            {totalAmount > 0 ? (
                                                <ConfirmRecharge totalAmount={totalAmount} />
                                            ) : (
                                                <Button disabled>
                                                    Nạp tiền
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recharge
