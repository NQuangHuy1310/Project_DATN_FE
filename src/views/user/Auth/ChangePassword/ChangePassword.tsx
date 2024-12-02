import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { ResetPasswordFields, resetPasswordSchema } from '@/validations'
import { useLocation } from 'react-router-dom'
import { useResetPassword } from '@/app/hooks/accounts'

const ChangePassword = () => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<ResetPasswordFields>({
        resolver: zodResolver(resetPasswordSchema)
    })

    const { mutateAsync } = useResetPassword()

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get('token')

    const onSubmit: SubmitHandler<ResetPasswordFields> = async (data) => {
        if (token) {
            const payload = {
                ...data,
                token
            }
            await mutateAsync(payload)
        }
    }

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="mx-auto w-full max-w-[450px] rounded-xl border p-4 shadow md:p-6 lg:p-10">
                <div className="flex flex-col items-center justify-center gap-3.5 md:gap-4 lg:gap-5">
                    <div className="flex w-full flex-col items-start gap-1">
                        <h1 className="text-2xl font-semibold text-foreground">Đổi mật khẩu</h1>
                        <p className="text-back text-sm">Vui lòng nhập mật khẩu mới của bạn bên dưới</p>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex w-full flex-col items-center justify-center gap-4"
                    >
                        <div className="w-full space-y-1">
                            <Input
                                {...register('new_password')}
                                type="password"
                                placeholder="Tạo mật khẩu mới - Hãy mạnh mẽ nhé!"
                                className="w-full"
                                disabled={isSubmitting}
                                autoComplete="new-password"
                            />
                            {errors.new_password && (
                                <div className="text-sm text-secondaryRed">{errors.new_password.message}</div>
                            )}
                        </div>
                        <div className="w-full space-y-1">
                            <Input
                                {...register('new_password_confirmation')}
                                type="password"
                                placeholder="Xác nhận mật khẩu mới - Đảm bảo khớp nhé!"
                                className="w-full"
                                autoComplete="new-password"
                                disabled={isSubmitting}
                            />
                            {errors.new_password_confirmation && (
                                <div className="text-sm text-secondaryRed">
                                    {errors.new_password_confirmation.message}
                                </div>
                            )}
                        </div>

                        <Button type="submit" variant="default" size="lg" className="w-full" disabled={isSubmitting}>
                            Đổi mật khẩu
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
