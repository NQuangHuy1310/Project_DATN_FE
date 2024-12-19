import { ChangeEvent, useEffect, useState } from 'react'
import { TbCoinFilled } from 'react-icons/tb'
import { convertToVnd, getImagesUrl, getVisiblePages } from '@/lib'

import { useGetBanks } from '@/app/hooks/others'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { useGetBalance, useGetHistoryWithDraw, useQuestWithdraw } from '@/app/hooks/transactions/useTransaction'
import Loading from '@/components/Common/Loading/Loading'
import NoContent from '@/components/shared/NoContent/NoContent'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'
import { useLocation, useNavigate } from 'react-router-dom'
import { Dialog, DialogContent } from '@/components/ui/dialog'

const Wallet = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const navigate = useNavigate()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const initialPage = parseInt(queryParams.get('page') || '1', 10)

    const [page, setPage] = useState(initialPage)
    const { user } = useGetUserProfile()
    const { data: bankData } = useGetBanks()
    const { data: teacherBalanceData } = useGetBalance(user?.id ?? 0)
    const { data: historyWithDraw, isLoading } = useGetHistoryWithDraw(user?.id ?? 0, page, 10)

    const { mutateAsync: createRequestWithDraw, isPending } = useQuestWithdraw()

    const [selectedBank, setSelectedBank] = useState<string>('')
    const [accountNumber, setAccountNumber] = useState<string>('')
    const [accountHolder, setAccountHolder] = useState<string>('')
    const [coin, setCoin] = useState<number | undefined>(undefined)
    const isDisable =
        coin === 0 ||
        coin === undefined ||
        (coin && coin > 10000) ||
        (coin && coin < 10) ||
        (teacherBalanceData !== undefined && coin >= +teacherBalanceData.balance) ||
        isPending ||
        !selectedBank ||
        !accountHolder ||
        coin % 100 !== 0

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

    const handleImageClick = (imageSrc: string) => {
        setSelectedImage(imageSrc)
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
        setSelectedImage(null)
    }

    const handleSubmitData = async () => {
        const payload = {
            coin: coin!,
            bank_name: selectedBank,
            account_number: accountNumber,
            account_holder: accountHolder
        }
        if (user) {
            await createRequestWithDraw([user.id, payload])
            setSelectedBank('')
            setAccountNumber('')
            setAccountHolder('')
            setCoin(0)
        }
    }

    useEffect(() => {
        if (page !== 1) {
            navigate(`?page=${page}`, { replace: true })
        } else {
            navigate(location.pathname, { replace: true })
        }
    }, [page, navigate, location.pathname])

    const handlePageChange = (newPage: number) => {
        if (newPage !== page && newPage >= 1 && newPage <= (historyWithDraw?.total || 1)) {
            setPage(newPage)
        }
    }

    const totalPages = Math.ceil((historyWithDraw?.total ?? 0) / (historyWithDraw?.per_page ?? 0))
    const visiblePages = getVisiblePages(totalPages, page, 5)
    const balance = parseFloat(teacherBalanceData?.balance?.toString() ?? '0')

    if (isLoading) return <Loading />

    return (
        <div className="flex flex-col gap-5">
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
                                    <TbCoinFilled className="size-4 text-secondaryYellow" /> {balance}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md border-[1px]">
                        <div className="flex flex-col gap-3 p-5">
                            <h4 className="text-lg font-medium">Tỉ lệ quy đổi từ tiền sang xu</h4>
                            <div className="flex flex-col gap-3 font-medium text-black">
                                <span className="flex items-center gap-1">
                                    <TbCoinFilled className="size-4 text-secondaryYellow" /> 10 = 10.000 VNĐ
                                </span>
                                <span className="flex items-center gap-1">
                                    <TbCoinFilled className="size-4 text-secondaryYellow" /> 50 = 50.000 VNĐ
                                </span>
                                <span className="flex items-center gap-1">
                                    <TbCoinFilled className="size-4 text-secondaryYellow" /> 100 = 100.000 VNĐ
                                </span>
                                <span className="flex items-center gap-1">
                                    <TbCoinFilled className="size-4 text-secondaryYellow" /> 500 = 500.000 VNĐ
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md border">
                        <div className="flex flex-col gap-3 p-5">
                            <h4 className="text-lg font-medium">Quy tắc rút tiền</h4>
                            <div className="flex flex-col gap-3">
                                <span className="flex items-center gap-1">
                                    Số xu tối thiểu mỗi lần rút :
                                    <TbCoinFilled className="size-4 text-secondaryYellow" /> 100
                                </span>
                                <span className="flex items-center gap-1">
                                    Số xu tối đa mỗi lần rút :
                                    <TbCoinFilled className="size-4 text-secondaryYellow" /> 10000
                                </span>
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
                            type="text"
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
                                placeholder="Nhập số xu mà bạn muốn rút (bội số của 100)"
                                className="w-full pr-12"
                                value={coin !== undefined ? coin : ''}
                                onChange={handlePointChange}
                            />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 transform font-medium text-darkGrey">
                                <TbCoinFilled className="size-5 text-secondaryYellow" />
                            </span>
                        </div>

                        <div className="flex flex-col gap-2">
                            {coin && coin > 10 && coin < 10000 && coin % 100 === 0 ? (
                                <span className="text-sm text-foreground">Số tiền nhận được {convertToVnd(coin)}</span>
                            ) : null}

                            {coin && (coin > 10000 || coin < 10) ? (
                                <span className="text-sm text-secondaryRed">
                                    {coin > 10000
                                        ? 'Bạn không thể nhập số tiền lớn hơn 10000 Xu'
                                        : 'Bạn không thể nhập số tiền nhỏ hơn 10 Xu'}
                                </span>
                            ) : null}

                            {coin && teacherBalanceData?.balance !== undefined && coin > +teacherBalanceData.balance ? (
                                <span className="text-sm text-secondaryRed">
                                    Bạn không thể nhập số tiền lớn hơn {teacherBalanceData.balance} Xu
                                </span>
                            ) : null}

                            {coin && coin % 100 !== 0 ? (
                                <span className="text-sm text-secondaryRed">Số xu cần là bội số của 100!</span>
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
                <h3 className="text-xl font-semibold">Lịch sử rút tiền</h3>
                {historyWithDraw && (
                    <>
                        {historyWithDraw.data && historyWithDraw.data.length > 0 ? (
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
                                        <th scope="col" className="px-6 py-3">
                                            Minh chứng
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Ghi chú
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Người duyệt
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historyWithDraw.data.map((item, index) => (
                                        <tr key={index} className="border-b bg-white hover:bg-gray-50">
                                            <th
                                                scope="row"
                                                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                                            >
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1">
                                                    <TbCoinFilled className="size-5 text-secondaryYellow" />
                                                    {parseFloat(item.coin.toString())}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {Math.floor(item.amount ?? 0).toLocaleString('vi-VN')} VNĐ
                                            </td>
                                            <td className="px-6 py-4">
                                                <div
                                                    className={`${
                                                        item.status === 'Hoàn thành'
                                                            ? 'bg-secondaryGreen'
                                                            : item.status === 'Thất bại'
                                                              ? 'bg-secondaryRed'
                                                              : 'bg-secondaryYellow'
                                                    } w-fit rounded-lg px-2 py-1 text-center text-xs text-white`}
                                                >
                                                    {item.status}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.photo_evidence ? (
                                                    <img
                                                        className="h-14 w-20 cursor-pointer rounded-sm object-cover"
                                                        src={item.photo_evidence}
                                                        alt=""
                                                        onClick={() => handleImageClick(item.photo_evidence!)}
                                                    />
                                                ) : (
                                                    'Không có minh chứng'
                                                )}
                                            </td>
                                            <td className="px-6 py-4">{item.note ?? 'Không có'}</td>
                                            <td className="px-6 py-4">{item.approver_name ?? 'Chưa có người duyệt'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <NoContent description="Bạn chưa có giao dịch nào" />
                        )}
                    </>
                )}

                <Dialog open={isOpen} onOpenChange={handleClose}>
                    <DialogContent className="max-h-[80vh] max-w-5xl overflow-auto">
                        {selectedImage && (
                            <img className="h-full w-full rounded-sm" src={selectedImage} alt="Chi tiết" />
                        )}
                    </DialogContent>
                </Dialog>

                {totalPages > 1 && (
                    <div className="mt-4 flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => handlePageChange(page - 1)}
                                        className={page === 1 ? 'border' : 'cursor-pointer border bg-darkGrey/90'}
                                    />
                                </PaginationItem>

                                {visiblePages[0] > 1 && (
                                    <PaginationItem>
                                        <span className="px-2">...</span>
                                    </PaginationItem>
                                )}

                                {visiblePages.map((pageNumber: number) => (
                                    <PaginationItem key={pageNumber} className="cursor-pointer">
                                        <PaginationLink
                                            isActive={page === pageNumber}
                                            onClick={() => handlePageChange(pageNumber)}
                                        >
                                            {pageNumber}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                {visiblePages[visiblePages.length - 1] < totalPages && (
                                    <PaginationItem>
                                        <span className="px-2">...</span>
                                    </PaginationItem>
                                )}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => handlePageChange(page + 1)}
                                        className={
                                            page === totalPages ? 'border' : 'cursor-pointer border bg-darkGrey/90'
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Wallet
