import { useState } from 'react'
import { Link } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import routes from '@/configs/routes'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChangePasswordFields, changePasswordSchema } from '@/validations'
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5'
import { useChangePassword } from '@/app/hooks/accounts'

const ChangePassword = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors }
    } = useForm<ChangePasswordFields>({ resolver: zodResolver(changePasswordSchema) })

    const { mutateAsync } = useChangePassword()

    const [showCurrentPassword, setCurrentShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)

    const toggleCurrentPasswordVisibility = () => {
        setCurrentShowPassword(!showCurrentPassword)
    }

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword)
    }

    const onSubmit: SubmitHandler<ChangePasswordFields> = async (data) => {
        await mutateAsync(data)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-[350px] flex-col items-start gap-4">
            <div className="relative w-full">
                <label className="mb-1 block text-sm font-medium">Mật khẩu hiện tại</label>
                <Input
                    {...register('current_password')}
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="Mật khẩu hiện tại"
                    autoFocus
                    disabled={isSubmitting}
                />
                {errors.current_password && (
                    <div className="text-sm text-red-500">{errors.current_password.message}</div>
                )}
                {showCurrentPassword ? (
                    <IoEyeOffSharp
                        onClick={toggleCurrentPasswordVisibility}
                        className="absolute right-3 top-7 translate-y-1/2 transform cursor-pointer text-gray-500"
                    />
                ) : (
                    <IoEyeSharp
                        onClick={toggleCurrentPasswordVisibility}
                        className="absolute right-3 top-7 translate-y-1/2 transform cursor-pointer text-gray-500"
                    />
                )}
            </div>
            <div className="relative w-full">
                <label className="mb-1 block text-sm font-medium">Mật khẩu mới</label>
                <Input
                    {...register('new_password')}
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Mật khẩu mới"
                    disabled={isSubmitting}
                />
                {errors.new_password && <div className="text-sm text-red-500">{errors.new_password.message}</div>}
                {showNewPassword ? (
                    <IoEyeOffSharp
                        onClick={toggleNewPasswordVisibility}
                        className="absolute right-3 top-7 translate-y-1/2 transform cursor-pointer text-gray-500"
                    />
                ) : (
                    <IoEyeSharp
                        onClick={toggleNewPasswordVisibility}
                        className="absolute right-3 top-7 translate-y-1/2 transform cursor-pointer text-gray-500"
                    />
                )}
            </div>
            <div className="relative w-full">
                <label className="mb-1 block text-sm font-medium">Xác nhận mật khẩu mới</label>
                <Input
                    {...register('new_password_confirmation')}
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Xác nhận mật khẩu mới"
                    disabled={isSubmitting}
                />
                {errors.new_password_confirmation && (
                    <div className="text-sm text-red-500">{errors.new_password_confirmation.message}</div>
                )}
                {showNewPassword ? (
                    <IoEyeOffSharp
                        onClick={toggleNewPasswordVisibility}
                        className="absolute right-3 top-7 translate-y-1/2 transform cursor-pointer text-gray-500"
                    />
                ) : (
                    <IoEyeSharp
                        onClick={toggleNewPasswordVisibility}
                        className="absolute right-3 top-7 translate-y-1/2 transform cursor-pointer text-gray-500"
                    />
                )}
            </div>
            <div className="flex items-center gap-5">
                <Button disabled={isSubmitting}>Lưu thay đổi</Button>
                <Link to={routes.forgotPassword}>
                    <Button variant="ghost">Quên mật khẩu ?</Button>
                </Link>
            </div>
        </form>
    )
}

export default ChangePassword
