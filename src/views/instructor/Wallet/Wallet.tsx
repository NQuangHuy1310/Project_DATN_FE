import { ChangeEvent, useState } from 'react'
import { TbCoinFilled } from 'react-icons/tb'
import { convertToVnd, getImagesUrl } from '@/lib'

import NoContentImage from '@/assets/no-content.jpg'
import { useGetBanks } from '@/app/hooks/others'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser.ts'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel
} from '@/components/ui/select'
import { useGetBalance, useGetHistoryWithDraw, useQuestWithdraw } from '@/app/hooks/transactions/useTransaction.ts'
import Loading from '@/components/Common/Loading/Loading.tsx'

const Wallet = () => {
    const { user } = useGetUserProfile()
    const { data: bankData } = useGetBanks()
    const { data: teacherBalanceData } = useGetBalance(user?.id ?? 0)
    const { data: historyWithDraw, isLoading } = useGetHistoryWithDraw(user?.id ?? 0)
    const { mutateAsync: createRequestWithDraw, isPending } = useQuestWithdraw()

    const [selectedBank, setSelectedBank] = useState<string>('')
    const [accountNumber, setAccountNumber] = useState<string>('')
    const [accountHolder, setAccountHolder] = useState<string>('')
    const [coin, setCoin] = useState<number | undefined>(undefined)
    const isDisable =
        coin === 0 ||
        coin === undefined ||
        (coin && coin > 10000) ||
        (teacherBalanceData !== undefined && coin >= +teacherBalanceData.balance) ||
        isPending ||
        !selectedBank ||
        !accountHolder

    const handleChangeSelectedBank = (value: string) => {
        setSelectedBank(value)
    }

    const handlePointChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const numericValue = parseFloat(value)

        if (!isNaN(numericValue) && numericValue >= 0) {
            setCoin(numericValue)
        } else {
            setCoin(undefined)
        }
    }

    const handleSubmitData = async () => {
        const payload = {
            coin: coin!,
            bank_name: selectedBank,
            account_number: accountNumber,
            account_holder: accountHolder
        }
        if (payload && user) {
            await createRequestWithDraw([user.id, payload])
        }
    }

    console.log(isDisable, coin, teacherBalanceData, selectedBank, accountHolder)

    if (isLoading) return <Loading />

    return (
        <div className="flex flex-col gap-5 rounded-md bg-white p-7">
            <div className="flex justify-between gap-5">
                <div className="flex w-3/12 flex-col gap-5">
                    <div className="rounded-md bg-secondary text-foreground">
                        <div className="flex items-center gap-3 p-5">
                            <Avatar className="cursor-coiner size-10">
                                <AvatarImage
                                    className="object-cover"
                                    src={getImagesUrl(user?.avatar || '')}
                                    alt={user?.name}
                                />
                                <AvatarFallback className="bg-slate-500/50 text-xl font-semibold">
                                    {user?.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1">
                                <span className="text-lg font-medium">{user?.name}</span>
                                <div className="flex items-center gap-1 font-medium">
                                    <span>Số dư: </span>
                                    <TbCoinFilled className="size-4 text-secondaryYellow" />{' '}
                                    {teacherBalanceData?.balance}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md border-[1px]">
                        <div className="flex flex-col gap-3 p-5">
                            <h4 className="text-lg font-medium">Tỉ lệ quy đổi từ tiền sang xu</h4>
                            <div className="flex flex-col gap-3 font-medium text-black">
                                <span className="flex items-center gap-1">
                                    <TbCoinFilled className="size-4" /> 10 = 10.000 VNĐ
                                </span>
                                <span className="flex items-center gap-1">
                                    <TbCoinFilled className="size-4" /> 50 = 50.000 VNĐ
                                </span>
                                <span className="flex items-center gap-1">
                                    <TbCoinFilled className="size-4" /> 100 = 100.000 VNĐ
                                </span>
                                <span className="flex items-center gap-1">
                                    <TbCoinFilled className="size-4" /> 500 = 500.000 VNĐ
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md border">
                        <div className="flex flex-col gap-3 p-5">
                            <h4 className="text-lg font-medium">Quy tắc rút tiền</h4>
                            <div className="flex flex-col gap-3">
                                <p>Số tiền tối thiểu mỗi lần rút : 100.000 VNĐ</p>
                                <p>Số tiền tối đa mỗi lần rút : 10.000.000 VNĐ</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-9/12 rounded-md border p-10">
                    <div className="flex w-1/2 flex-col gap-3">
                        <p className="text-lg">Tại đây bạn có thể rút tiền vào tài khoản ngân hàng</p>

                        <Select value={selectedBank} onValueChange={handleChangeSelectedBank}>
                            <SelectTrigger className="flex h-[40px] w-full items-center justify-between">
                                <SelectValue placeholder="-- Chọn ngân hàng --" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel> -- Chọn ngân hàng -- </SelectLabel>
                                    {bankData &&
                                        bankData?.data.map((item, index) => {
                                            return (
                                                <SelectItem value={item.shortName} key={index} className="p-2">
                                                    {item.shortName}
                                                </SelectItem>
                                            )
                                        })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Input
                            placeholder="Nhập số tài khoản"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            type="number"
                        />
                        <Input
                            placeholder="Nhập tên tài khoản"
                            value={accountHolder}
                            onChange={(e) => setAccountHolder(e.target.value)}
                            type="text"
                        />

                        <div className="relative">
                            <Input
                                min={0}
                                maxLength={5}
                                type="number"
                                placeholder="Nhập số tiền mà bạn muốn rút (bội số của 100)"
                                className="w-full pr-12"
                                value={coin !== undefined ? coin : ''}
                                onChange={handlePointChange}
                            />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 transform font-medium text-darkGrey">
                                Xu
                            </span>
                        </div>

                        <div className="flex flex-col gap-2">
                            {coin && coin !== 0 ? (
                                <span className="text-sm text-foreground">Số tiền nhận được {convertToVnd(coin)}</span>
                            ) : null}

                            {coin && coin > 10000 ? (
                                <span className="text-sm text-secondaryRed">
                                    Bạn không thể nhập số tiền lớn hơn 10000 Xu
                                </span>
                            ) : null}

                            {coin && teacherBalanceData?.balance !== undefined && coin > +teacherBalanceData.balance ? (
                                <span className="text-sm text-secondaryRed">
                                    Bạn không thể nhập số tiền lớn hơn {teacherBalanceData.balance} Xu
                                </span>
                            ) : null}
                        </div>

                        <div className="">
                            <Button disabled={isDisable} onClick={handleSubmitData}>
                                Rút tiền
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5 border border-softGrey p-4 sm:rounded-lg">
                <h3 className="text-2xl font-bold">Lịch sử rút tiền</h3>
                <table className="w-full text-left text-sm text-black rtl:text-right">
                    <thead className="bg-gray-50 text-xs uppercase text-darkGrey">
                        <tr>
                            <th scope="col" className="p-4">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Số xu rút
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Số tiền nhận được
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Trạng thái
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyWithDraw && historyWithDraw.length > 0 ? (
                            historyWithDraw.map((item, index) => (
                                <tr key={index} className="border-b bg-white hover:bg-gray-50">
                                    <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">{parseFloat(item.coin.toString())} Xu</td>
                                    <td className="px-6 py-4">{Math.floor(item.amount).toLocaleString('vi-VN')} VNĐ</td>
                                    <td className="px-6 py-4">{item.status}</td>
                                </tr>
                            ))
                        ) : (
                            <div className="flex w-full flex-col items-center justify-center text-center">
                                <img alt="" src={NoContentImage} />
                                <span className="text-base font-semibold">Bạn chưa có giao dịch nào</span>
                            </div>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Wallet