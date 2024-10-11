import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FiPlus } from 'react-icons/fi'
import { toast } from 'sonner'

import { useProfile } from '@/app/hooks/accounts'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'
import { userApis } from '@/app/services/accounts'
import { useUserStore } from '@/app/store'
import Loading from '@/components/Common/Loading/Loading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MessageErrors } from '@/constants'
import { getImagesUrl, readFileAsDataUrl } from '@/lib'
import { ProfileFormFields, profileSchema } from '@/validations'

const maxSizeInMB = 2
const maxSizeInBytes = maxSizeInMB * 1024 * 1024

const AccountProfile = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { isSubmitting, errors }
    } = useForm<ProfileFormFields>({ resolver: zodResolver(profileSchema) })

    const { data: userProfile, isLoading } = useProfile()
    const { user, profile } = useGetUserProfile()
    const setUser = useUserStore((state) => state.setUser)
    const setProfile = useUserStore((state) => state.setProfile)

    const [file, setFile] = useState<File | undefined>(undefined)
    const [userAvatar, setUserAvatar] = useState<string>(getImagesUrl(user?.avatar || ''))
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > maxSizeInBytes) {
                toast.error(MessageErrors.maxSizeImage)
                return
            }

            try {
                setFile(file)
                const imageUrl = await readFileAsDataUrl(file)
                setUserAvatar(imageUrl)
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : MessageErrors.uploadFile
                toast.error(errorMessage)
            }
        }
    }

    const onSubmit: SubmitHandler<ProfileFormFields> = async (data) => {
        const payload = {
            ...data,
            avatar: file
        }
        const response = await userApis.updateProfile(payload)
        setUser(response.user)
        setProfile(response.profile)
    }

    useEffect(() => {
        if (userProfile) {
            setUser(userProfile.user)
            setProfile(userProfile.profile)

            setValue('name', userProfile.user.name ?? user?.name)
            setValue('address', userProfile.profile?.address ?? profile?.address)
            setValue('phone', userProfile.profile?.phone ?? profile?.phone)
            setValue('experience', userProfile.profile?.experience ?? profile?.experience)
            setValue('bio', userProfile.profile?.bio ?? profile?.bio)
        }
    }, [userProfile, setUser, setProfile, setValue, user, profile])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="flex max-w-[500px] flex-col justify-start gap-7">
            <h4 className="text-lg font-bold">Chỉnh sửa thông tin cá nhân</h4>
            <div className="flex items-center gap-7">
                <Avatar className="relative h-[140px] w-[140px] cursor-pointer hover:opacity-80 hover:transition-all">
                    <AvatarImage src={userAvatar} alt={user?.name} className="object-cover" />
                    <AvatarFallback className="h-full w-full bg-slate-500/50 text-3xl font-semibold">
                        {user?.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
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
                    <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => handleFileChange(e)} />
                </div>
            </div>
            <form className="flex flex-col justify-start gap-7" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Họ và Tên</label>
                    <Input {...register('name')} type="text" placeholder="Họ và tên" disabled={isSubmitting} />
                    {errors.name && <div className="text-sm text-red-500">{errors.name.message}</div>}
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Địa chỉ</label>
                    <Input {...register('address')} type="text" placeholder="Địa chỉ" disabled={isSubmitting} />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Số điện thoại</label>
                    <Input {...register('phone')} type="number" placeholder="Số điện thoại" disabled={isSubmitting} />
                    {errors.phone && <div className="text-sm text-red-500">{errors.phone.message}</div>}
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Kinh nghiệm làm việc</label>
                    <Textarea {...register('experience')} placeholder="Kinh nghiệm làm việc" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Bio</label>
                    <Textarea {...register('bio')} placeholder="Bio" />
                </div>

                <div className="">
                    <Button size="lg">Lưu thông tin</Button>
                </div>
            </form>
        </div>
    )
}

export default AccountProfile
