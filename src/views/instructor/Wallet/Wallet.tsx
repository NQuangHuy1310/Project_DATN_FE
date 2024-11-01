import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { getImagesUrl } from '@/lib'
import { TbCoinFilled } from 'react-icons/tb'
import { Input } from '@/components/ui/input.tsx'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser.ts'
import { Button } from '@/components/ui/button.tsx'
import { useGetBanks } from '@/app/hooks/others'

const Wallet = () => {
    const { data: bankData } = useGetBanks()
    const { user } = useGetUserProfile()

    return (
        <div className="flex flex-col gap-2 rounded-md bg-white p-7">
            <div className="flex justify-between gap-5">
                <div className="flex w-3/12 flex-col gap-5">
                    <div className="rounded-md bg-secondary text-foreground">
                        <div className="flex items-center gap-3 p-5">
                            <Avatar className="size-10 cursor-pointer">
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
                                    <TbCoinFilled className="size-4 text-secondaryYellow" /> 100
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
                    <div className="flex flex-col gap-5">
                        <p className="text-lg">Tại đây bạn có thể rút tiền vào tài khoản ngân hàng</p>

                        <div></div>

                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-2">
                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder="Nhập số tiền mà bạn muốn rút (bội số của 100)"
                                        className="w-full pr-12"
                                    />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 transform font-medium text-darkGrey">
                                        VNĐ
                                    </span>
                                </div>
                                <div className="">
                                    <Button>Rút tiền</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wallet
