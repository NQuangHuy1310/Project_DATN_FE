// Response
export interface IUser {
    id: number
    name: string
    email: string
    avatar: string | null
    is_active: boolean
    user_type: 'member' | 'admin'
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
    user: IUser
    profile: IProfile
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

export interface IResendOtpData {
    email: string
}
