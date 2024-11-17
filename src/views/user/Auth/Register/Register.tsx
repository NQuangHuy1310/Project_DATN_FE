import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'

import { authApis } from '@/app/services/accounts'
import { useUserStore } from '@/app/store'
import OTPDialog from '@/components/shared/OTPDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import routes from '@/configs/routes'

import { setAccessToken } from '@/lib'
import { RegisterFormFields, registerSchema } from '@/validations'

const Register = () => {
    const {
        register,
        setError,
        getValues,
        handleSubmit,
        formState: { isSubmitting, errors },
        reset
    } = useForm<RegisterFormFields>({ resolver: zodResolver(registerSchema) })
    const navigate = useNavigate()
    const setUser = useUserStore((state) => state.setUser)
    const setProfile = useUserStore((state) => state.setProfile)

    const [showPassword, setShowPassword] = useState(false)
    const [open, setOpen] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

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

    const handleOtpSubmit = async (otp_code: string) => {
        const email = getValues('email')
        const response = await authApis.verifyOtp({ email, otp_code })
        if (response) {
            setUser(response.user)
            setProfile(response.profile)
            setAccessToken(response.access_token)
            navigate(routes.userDashboard)
            reset()
        }
    }

    const handleResendOtp = async () => {
        const email = getValues('email')
        await authApis.resendOtp({ email })
    }

    return (
        <>
            <OTPDialog open={open} setOpen={setOpen} onSubmit={handleOtpSubmit} resendOtp={handleResendOtp} />
            <div className="flex h-screen w-full items-center justify-center">
                <div className="mx-auto w-full max-w-[450px] rounded-xl border p-4 shadow md:p-6 lg:p-10">
                    <div className="flex flex-col items-center justify-center gap-3.5 md:gap-4 lg:gap-5">
                        <div className="flex w-full flex-col items-start gap-1">
                            <h1 className="text-2xl font-semibold text-foreground">Đăng ký tài khoản</h1>
                            <p className="text-back text-sm">Sử dụng email hoặc dịch vụ khác để đăng ký</p>
                        </div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex w-full flex-col items-center justify-center gap-4"
                        >
                            <div className="w-full">
                                <Input
                                    {...register('name')}
                                    type="text"
                                    placeholder="Họ và tên"
                                    name="name"
                                    id="name"
                                    className="w-full"
                                    disabled={isSubmitting}
                                    autoFocus
                                />
                                {errors.name && <div className="text-sm text-red-500">{errors.name?.message}</div>}
                            </div>
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
                                {errors.email && <div className="text-sm text-red-500">{errors.email.message}</div>}
                            </div>
                            <div className="relative w-full">
                                <Input
                                    {...register('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    id="password"
                                    placeholder="Mật khẩu"
                                    className="w-full"
                                    disabled={isSubmitting}
                                    autoComplete="current-password"
                                />
                                {errors.password && (
                                    <div className="text-sm text-red-500">{errors.password.message}</div>
                                )}
                                {showPassword ? (
                                    <IoEyeOffSharp
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1 translate-y-1/2 transform cursor-pointer text-gray-500"
                                    />
                                ) : (
                                    <IoEyeSharp
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1 translate-y-1/2 transform cursor-pointer text-gray-500"
                                    />
                                )}
                            </div>
                            <div className="relative w-full">
                                <Input
                                    {...register('password_confirmation')}
                                    type={showPassword ? 'text' : 'password'}
                                    name="password_confirmation"
                                    id="password_confirmation"
                                    placeholder="Xác nhận mật khẩu"
                                    className="w-full"
                                    disabled={isSubmitting}
                                    autoComplete="current-password"
                                />
                                {errors.password_confirmation && (
                                    <div className="text-sm text-red-500">{errors.password_confirmation.message}</div>
                                )}
                                {showPassword ? (
                                    <IoEyeOffSharp
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1 translate-y-1/2 transform cursor-pointer text-gray-500"
                                    />
                                ) : (
                                    <IoEyeSharp
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1 translate-y-1/2 transform cursor-pointer text-gray-500"
                                    />
                                )}
                            </div>
                            <div className="w-full text-right">
                                <Link to={routes.forgotPassword} className="font-medium">
                                    Quên mật khẩu?
                                </Link>
                            </div>
                            <Button disabled={isSubmitting} variant="default" size="lg" className="w-full text-base">
                                Đăng ký
                            </Button>
                        </form>

                        <hr className="my-2 w-full" />

                        <div className="w-full">
                            <div className="flex w-full flex-col gap-2 md:flex-row md:gap-5">
                                <Button
                                    disabled={isSubmitting}
                                    variant="outline"
                                    size="lg"
                                    className="flex flex-1 gap-2 p-2"
                                >
                                    <FcGoogle className="size-5" />
                                    <span className="text-base font-medium lg:text-sm">Google</span>
                                </Button>
                                <Button
                                    disabled={isSubmitting}
                                    variant="outline"
                                    size="lg"
                                    className="flex flex-1 gap-2 p-2"
                                >
                                    <FaFacebook className="size-5 text-blue-600" />
                                    <span className="text-base font-medium lg:text-sm">Facebook</span>
                                </Button>
                            </div>
                            <div className="mt-5 text-center">
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

export default Register
