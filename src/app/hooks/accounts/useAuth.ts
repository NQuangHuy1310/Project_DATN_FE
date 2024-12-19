import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

import { authApis, userApis } from '@/app/services/accounts'
import routes from '@/configs/routes'
import {
    ILoginData,
    IProfileUser,
    IRegisterData,
    IResetPassword,
    IUserEmail,
    IUserProfile,
    IVerifyOtpData
} from '@/types'
import { useUserStore } from '@/app/store'
import { removeAccessToken, removeAdminPost, setAccessToken } from '@/lib'

export const useProfile = (options?: Omit<UseQueryOptions<IUserProfile>, 'queryKey' | 'queryFn'>) => {
    return useQuery<IUserProfile>({
        ...options,
        queryKey: ['profile'],
        queryFn: userApis.getProfile
    })
}

export const useGetProfile = (email: string, options?: Omit<UseQueryOptions<IProfileUser>, 'queryKey' | 'queryFn'>) => {
    return useQuery<IProfileUser>({
        ...options,
        queryKey: ['profile-user', email],
        queryFn: () => userApis.getDetailProfile(email)
    })
}

export const useLogin = () => {
    const navigate = useNavigate()
    const setUser = useUserStore((state) => state.setUser)
    const setProfile = useUserStore((state) => state.setProfile)

    return useMutation({
        mutationFn: (data: ILoginData) => authApis.login(data),
        onSuccess: async (data) => {
            setUser(data.user)
            setProfile(data.profile)
            setAccessToken(data.access_token)
            navigate(routes.userDashboard)
            toast.success('Đăng nhập thành công!')
        }
    })
}

export const useRegister = () => {
    return useMutation({
        mutationFn: (data: IRegisterData) => authApis.register(data)
    })
}

export const useVerifyOtp = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (data: IVerifyOtpData) => authApis.verifyOtp(data),
        onSuccess: () => {
            navigate(routes.userDashboard)
            toast.success('Chúc mừng! Bạn đã xác thực tài khoản thành công. Hãy bắt đầu hành trình mới của bạn!')
        }
    })
}

export const useResendOtp = () => {
    return useMutation({
        mutationFn: (data: IUserEmail) => authApis.resendOtp(data)
    })
}

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: (data: IUserEmail) => authApis.forgotPassword(data),
        onSuccess: () => {
            toast.success('Mã OTP đặt lại mật khẩu đã được gửi về email của bạn.')
        }
    })
}

export const useVerifyOtpResetPassword = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (data: IVerifyOtpData) => authApis.verifyOtpResetPassword(data),
        onSuccess: (data: any) => {
            toast.success('Mã OTP hợp lệ, vui lòng đặt lại mật khẩu của bạn.')
            navigate(`${routes.resetPassword}?token=${data.token}`)
        },
        onError: () => {
            toast.success('Mã OTP không hợp lệ, vui lòng kiểm tra lại.')
        }
    })
}

export const useResetPassword = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (data: IResetPassword) => authApis.resetPassword(data),
        onSuccess: () => {
            toast.success('Mật khẩu của bạn đã được đặt lại thành công! Bạn có thể đăng nhập ngay bây giờ.')
            navigate(routes.login)
        },
        onError: () => {
            toast.error('Đặt lại mật khẩu không thành công. Vui lòng kiểm tra thông tin và thử lại.')
        }
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const clearUserAndProfile = useUserStore((state) => state.clearUserAndProfile)

    return useMutation({
        mutationFn: authApis.logout,
        onSuccess: () => {
            removeAccessToken()
            clearUserAndProfile()
            removeAdminPost()
            navigate(routes.home)
            queryClient.clear()
        }
    })
}
