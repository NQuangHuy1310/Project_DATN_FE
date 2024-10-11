import useGetUserProfile from '@/app/hooks/accounts/useGetUser'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ChangeUsername = () => {
    const { user } = useGetUserProfile()

    return (
        <div className="flex max-w-[350px] flex-col items-start gap-4">
            <div className="w-full">
                <label className="mb-1 block text-sm font-medium">Sửa tên người dùng</label>
                <Input type="text" placeholder="Tên người dùng" value={user?.name} />
            </div>
            <div>
                <Button>Lưu thay đổi</Button>
            </div>
        </div>
    )
}

export default ChangeUsername
