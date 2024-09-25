import { useState } from 'react'
import { Link } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { authApis } from '@/apis'
import routes from '@/configs/routes'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import OTPDialog from '@/components/shared/OTPDialog'

import { RegisterFormFields, registerSchema } from '@/validations'

const ForgotPassword = () => {
    const {
        register,
        setError,
        getValues,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<RegisterFormFields>({ resolver: zodResolver(registerSchema) })

    const [open, setOpen] = useState(false)

    const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
        try {
            await authApis.register(data)
            setOpen(true)
        } catch (error: any) {
            if (error.data && error.data.errors) {
                error.data.errors.forEach((errorItem: any) => {
                    Object.entries(errorItem).forEach(([key, value]) => {
                        const message = value as string
                        setError(key as keyof RegisterFormFields, {
                            type: key,
                            message: message
                        })
                    })
                })
            }
        }
    }

    const handleOtpSubmit = async (otp_code: string) => {}

    const handleResendOtp = async () => {
        const email = getValues('email')
        await authApis.resendOtp({ email })
    }

    return (
        <>
            <OTPDialog open={open} setOpen={setOpen} onSubmit={handleOtpSubmit} resendOtp={handleResendOtp} />
            <div className="flex items-center justify-center w-full h-full">
                <div className="max-w-[450px] w-full mx-auto rounded-xl border shadow p-4 md:p-6 lg:p-10">
                    <div className="flex flex-col items-center justify-center lg:gap-5 md:gap-4 gap-3.5">
                        <div className="flex flex-col items-start gap-1 w-full">
                            <h1 className="text-2xl font-semibold text-foreground">Quên mật khẩu</h1>
                            <p className="text-sm text-back">Nhập email của bạn để nhận mã xác nhận</p>
                        </div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-full flex-col flex items-center justify-center gap-4"
                        >
                            <div className="w-full">
                                <Input
                                    {...register('email')}
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    id="email"
                                    className="w-full"
                                    disabled={isSubmitting}
                                />
                                {errors.email && (
                                    <div className="text-red-500 lg:text-base text-sm">{errors.email.message}</div>
                                )}
                            </div>

                            <Button disabled={isSubmitting} variant="default" size="lg" className="w-full text-base">
                                Gửi mã
                            </Button>
                        </form>

                        <div className="w-full">
                            <div className="text-center mt-5">
                                <p className="text-gray-500">
                                    Bạn đã có tài khoản?{' '}
                                    <Link to={routes.login} className="text-primary">
                                        Đăng nhập
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
