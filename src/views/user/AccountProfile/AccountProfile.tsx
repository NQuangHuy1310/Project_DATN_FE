import { useRef } from 'react'
import { toast } from 'sonner'
import { FiPlus } from 'react-icons/fi'

import useGetUserProfile from '@/hooks/useGetUser'

import { getImagesUrl } from '@/utils'
import { MessageErrors } from '@/constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const maxSizeInMB = 2
const maxSizeInBytes = maxSizeInMB * 1024 * 1024

const AccountProfile = () => {
    const { user, profile } = useGetUserProfile()
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > maxSizeInBytes) {
                toast.error(MessageErrors.maxSizeImage)
                return
            }
        }
    }

    return (
        <div className="flex max-w-[500px] flex-col justify-start gap-7">
            <h4 className="text-lg font-bold">Chỉnh sửa thông tin cá nhân</h4>
            <div className="flex items-center gap-7">
                <Avatar className="relative h-[150px] w-[150px] cursor-pointer hover:opacity-80 hover:transition-all">
                    <AvatarImage src={getImagesUrl(user?.avatar || '')} alt={user?.name} />
                    <AvatarFallback className="size-8">{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                    <h6 className="text-base font-semibold">Ảnh đại điện</h6>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center justify-center gap-2 text-sm"
                        onClick={handleButtonClick}
                    >
                        <FiPlus />
                        Tải ảnh mới lên
                    </Button>
                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Họ và Tên</label>
                <Input type="text" placeholder="Họ và tên" value={user?.name} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Địa chỉ</label>
                <Input type="text" placeholder="Địa chỉ" value={profile?.address} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Số điện thoại</label>
                <Input type="number" placeholder="Số điện thoại" value={profile?.phone} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Kinh nghiệm làm việc</label>
                <Textarea placeholder="Kinh nghiệm làm việc" value={profile?.experience} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Bio</label>
                <Textarea placeholder="Bio" value={profile?.bio} />
            </div>

            <div className="">
                <Button size="lg">Lưu thông tin</Button>
            </div>
        </div>
    )
}

export default AccountProfile
