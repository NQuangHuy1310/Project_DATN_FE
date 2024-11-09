// Response
export interface IUser {
    id: number
    name: string
    email: string
    avatar: string | null
    is_active: boolean
    user_type: 'member' | 'admin' | 'teacher'
}

export interface IProfile {
    id: number
    phone: string
    address: string
    following: number
    experience: string
    bio: string
}

export interface IUserProfile {
    access_token: string
    user: IUser
    profile: IProfile
}

export interface IRefreshToken {
    access_token: string
}

// Request
export interface ILoginData {
    email: string
    password: string
}

export interface IRegisterData {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export interface IVerifyOtpData {
    email: string
    otp_code: string
}

export interface IUserEmail {
    email: string
}

export interface IResetPassword {
    email: string
    otp_code: string
    new_password: string
    new_password_confirmation: string
}

export interface IUpdateProfile {
    name: string
    phone: string
    address?: string
    bio?: string
    experience?: string
    avatar?: File | undefined
    _method?: string
}

export interface IChangePassword {
    current_password: string
    new_password: string
    new_password_confirmation: string
}
