import { useState } from 'react'

import useGetUserProfile from '@/hooks/useGetUser'

import { Button } from '@/components/ui/button'
import ChangePassword from '@/views/user/Account/AccountSettings/ChangePassword'
import ChangeUsername from '@/views/user/Account/AccountSettings/ChangeUsername'
import DeleteAccount from '@/views/user/Account/AccountSettings/DeleteAccount'

const AccountSettings = () => {
    const { user } = useGetUserProfile()

    const [isPasswordVisible, setPasswordVisible] = useState(false)
    const [isUsernameVisible, setUsernameVisible] = useState(false)
    const [isEmailVisible, setEmailVisible] = useState(false)
    const [isDeleteVisible, setDeleteVisible] = useState(false)

    return (
        <div className="flex flex-col gap-7">
            <h4 className="text-lg font-bold">Cài đặt tài khoản</h4>

            <div className="flex flex-col gap-4 rounded-lg border-[1px] border-grey p-4">
                <div className="flex items-center justify-between">
                    <h6 className="text-base font-medium text-black">Mật khẩu</h6>
                    <Button variant="outline" size="sm" onClick={() => setPasswordVisible(!isPasswordVisible)}>
                        {isPasswordVisible ? 'Ẩn' : 'Hiển thị'}
                    </Button>
                </div>
                {isPasswordVisible && <ChangePassword />}
            </div>

            <div className="flex flex-col gap-4 rounded-lg border-[1px] border-grey p-4">
                <div className="flex items-center justify-between">
                    <h6 className="text-base font-medium text-black">Tên người dùng</h6>
                    <Button variant="outline" size="sm" onClick={() => setUsernameVisible(!isUsernameVisible)}>
                        {isUsernameVisible ? 'Ẩn' : 'Hiển thị'}
                    </Button>
                </div>
                {isUsernameVisible && <ChangeUsername />}
            </div>

            <div className="flex flex-col gap-4 rounded-lg border-[1px] border-grey p-4">
                <div className="flex items-center justify-between">
                    <h6 className="text-base font-medium text-black">
                        Địa chỉ email
                        <p className="mt-1 text-sm text-darkGrey">Địa chỉ email hiện tại của bạn là {user?.email}</p>
                    </h6>
                    <Button variant="outline" size="sm" onClick={() => setEmailVisible(!isEmailVisible)}>
                        {isEmailVisible ? 'Ẩn' : 'Hiển thị'}
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border-[1px] border-grey p-4">
                <div className="flex items-center justify-between">
                    <h6 className="text-base font-medium text-black">Xoá tài khoản</h6>
                    <Button variant="outline" size="sm" onClick={() => setDeleteVisible(!isDeleteVisible)}>
                        {isDeleteVisible ? 'Ẩn' : 'Hiển thị'}
                    </Button>
                </div>
                {isDeleteVisible && <DeleteAccount />}
            </div>
        </div>
    )
}

export default AccountSettings
