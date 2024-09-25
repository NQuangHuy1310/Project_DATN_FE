import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5'

import { userApis } from '@/apis'
import routes from '@/configs/routes'
import { useUserStore } from '@/store'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import OTPDialog from '@/components/shared/OTPDialog'

import { RegisterFormFields, registerSchema } from '@/validations'
import { setAccessToken } from '@/utils'

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
            await userApis.register(data)
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
        const response = await userApis.verifyOtp({ email, otp_code })
        setUser(response.user)
        setProfile(response.profile)
        setAccessToken(response.access_token)
        navigate(routes.home)
        reset()
    }

    const handleResendOtp = async () => {
        const email = getValues('email')
        await userApis.resendOtp({ email })
    }

    return (
        <>
            <OTPDialog open={open} setOpen={setOpen} onSubmit={handleOtpSubmit} resendOtp={handleResendOtp} />
            <div className="flex items-center justify-center w-full h-full">
                <div className="max-w-[450px] w-full mx-auto rounded-xl border shadow p-4 md:p-6 lg:p-10">
                    <div className="flex flex-col items-center justify-center lg:gap-5 md:gap-4 gap-3.5">
                        <div className="flex flex-col items-start gap-1 w-full">
                            <h1 className="text-2xl font-semibold text-foreground">Đăng ký tài khoản</h1>
                            <p className="text-sm text-back">Sử dụng email hoặc dịch vụ khác để đăng ký</p>
                        </div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-full flex-col flex items-center justify-center gap-4"
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
                                {errors.name && (
                                    <div className="text-red-500 lg:text-base text-sm">{errors.name?.message}</div>
                                )}
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
                                {errors.email && (
                                    <div className="text-red-500 lg:text-base text-sm">{errors.email.message}</div>
                                )}
                            </div>
                            <div className="w-full relative">
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
                                    <div className="text-red-500 lg:text-base text-sm">{errors.password.message}</div>
                                )}
                                {showPassword ? (
                                    <IoEyeOffSharp
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1 transform translate-y-1/2 cursor-pointer text-gray-500"
                                    />
                                ) : (
                                    <IoEyeSharp
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1 transform translate-y-1/2 cursor-pointer text-gray-500"
                                    />
                                )}
                            </div>
                            <div className="w-full relative">
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
                                    <div className="text-red-500 lg:text-base text-sm">
                                        {errors.password_confirmation.message}
                                    </div>
                                )}
                                {showPassword ? (
                                    <IoEyeOffSharp
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1 transform translate-y-1/2 cursor-pointer text-gray-500"
                                    />
                                ) : (
                                    <IoEyeSharp
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1 transform translate-y-1/2 cursor-pointer text-gray-500"
                                    />
                                )}
                            </div>
                            <div className="text-right w-full">
                                <Link to={routes.forgotPassword} className="font-medium">
                                    Quên mật khẩu?
                                </Link>
                            </div>
                            <Button disabled={isSubmitting} variant="default" size="lg" className="w-full text-base">
                                Đăng ký
                            </Button>
                        </form>

                        <hr className="w-full my-2" />

                        <div className="w-full">
                            <div className="flex gap-2 md:gap-5 flex-col w-full md:flex-row">
                                <Button
                                    disabled={isSubmitting}
                                    variant="outline"
                                    size="lg"
                                    className="flex flex-1 gap-2 p-2"
                                >
                                    <FcGoogle className="size-5" />
                                    <span className="text-base lg:text-sm font-medium">Google</span>
                                </Button>
                                <Button
                                    disabled={isSubmitting}
                                    variant="outline"
                                    size="lg"
                                    className="flex flex-1 gap-2 p-2"
                                >
                                    <FaFacebook className="size-5 text-blue-600" />
                                    <span className="text-base lg:text-sm font-medium">Facebook</span>
                                </Button>
                            </div>
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

export default Register
