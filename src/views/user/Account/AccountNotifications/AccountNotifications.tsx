import { useState } from 'react'

import { Input } from '@/components/ui/input'
import useGetUserProfile from '@/app/hooks/useGetUser'

const AccountNotifications = () => {
    const { user } = useGetUserProfile()

    const [notificationMethod, setNotificationMethod] = useState<string>('email')

    return (
        <div className="flex flex-col gap-7">
            <h4 className="text-lg font-bold">Quản lý thông báo</h4>
            <div className="flex flex-col gap-2">
                <h6 className="text-base font-medium text-black">Thông báo qua email</h6>
                <p className="max-w-[600px] text-sm text-darkGrey">
                    Khi bạn bận rộn hoặc không trực tuyến, Coursea có thể gửi cho bạn thông báo qua email về bất kỳ tin
                    nhắn trực tiếp mới nào hoặc khi có người nhắc đến tên bạn.
                </p>
            </div>

            <div className="h-[1px] w-full bg-grey" />

            <div className="flex w-full flex-col gap-4">
                <h6 className="text-base font-medium text-black">Gửi cho tôi thông báo qua email</h6>
                <div className="flex items-center justify-start gap-2.5">
                    <Input
                        type="radio"
                        className="size-4 cursor-pointer"
                        checked={notificationMethod === 'email'}
                        onChange={() => setNotificationMethod('email')}
                    />
                    <label className="text-sm text-darkGrey">Gửi cho tôi email thông báo</label>
                </div>
                <div className="flex items-center justify-start gap-2.5">
                    <Input
                        type="radio"
                        className="size-4 cursor-pointer"
                        checked={notificationMethod === 'web'}
                        onChange={() => setNotificationMethod('web')}
                    />
                    <label className="text-sm text-darkGrey">Gửi cho tôi thông báo trên trang web</label>
                </div>
                <div className="flex items-center justify-start gap-2.5">
                    <Input
                        type="radio"
                        className="size-4 cursor-pointer"
                        checked={notificationMethod === 'none'}
                        onChange={() => setNotificationMethod('none')}
                    />
                    <label className="text-sm text-darkGrey">Không nhận thông báo</label>
                </div>
            </div>

            <div className="h-[1px] w-full bg-grey" />

            <div className="flex flex-col items-start gap-2.5">
                <h6 className="text-base font-medium text-black">Nhận thông báo về Tin tức & Cập nhật</h6>
                <p className="max-w-[600px] text-sm text-darkGrey">
                    Thỉnh thoảng, chúng tôi muốn gửi cho bạn những email có tin tức thú vị về Chất và không gian làm
                    việc của bạn. Bạn có thể chọn nội dung cập nhật nào bạn muốn nhận:
                </p>

                <div className="flex items-center gap-2.5">
                    <Input type="checkbox" id="tipsAndTricks" className="size-4 cursor-pointer" />
                    <label className="text-sm text-darkGrey" htmlFor="tipsAndTricks">
                        Mẹo và thủ thuật
                    </label>
                </div>

                <div className="flex items-center gap-2.5">
                    <Input type="checkbox" id="offersAndPromotions" className="size-4 cursor-pointer" />
                    <label className="text-sm text-darkGrey" htmlFor="offersAndPromotions">
                        Ưu đãi và khuyến mãi
                    </label>
                </div>

                <div className="flex items-center gap-2.5">
                    <Input type="checkbox" id="researchOpportunities" className="size-4 cursor-pointer" />
                    <label className="text-sm text-darkGrey" htmlFor="researchOpportunities">
                        Cơ hội nghiên cứu
                    </label>
                </div>

                <div className="flex items-center gap-2.5">
                    <Input type="checkbox" id="newsletter" className="size-4 cursor-pointer" />
                    <label className="text-sm text-darkGrey" htmlFor="newsletter">
                        Bản tin
                    </label>
                </div>
            </div>

            <div className="h-[1px] w-full bg-grey" />

            <div className="flex max-w-[600px] flex-col gap-2 text-sm text-darkGrey">
                <p>
                    Nếu bạn chọn không tham gia những thông báo trên, hãy lưu ý rằng chúng tôi vẫn sẽ gửi cho bạn những
                    email quan trọng về quản trị, chẳng hạn như email đặt lại mật khẩu.
                </p>
                <p>
                    Chúng tôi sẽ sử dụng địa chỉ email này:{' '}
                    <a href="" className="text-primary">
                        {user?.email}
                    </a>
                </p>
            </div>
        </div>
    )
}

export default AccountNotifications
