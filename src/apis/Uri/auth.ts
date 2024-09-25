const AUTH_URL = 'auth/'

export const authUri = {
    LOGIN: `${AUTH_URL}login`,
    REGISTER: `${AUTH_URL}signup`,
    VERIFY_OTP: `${AUTH_URL}verify-otp`,
    RESEND_OTP: `${AUTH_URL}resend-otp`,
    FORGOT_PASSWORD: `${AUTH_URL}forgot-password`,
    VERIFY_OTP_RESETPASSWORD: `${AUTH_URL}verify-otp-resetpassword`,
    RESET_PASSWORD: `${AUTH_URL}reset-password`,
    LOGOUT: `${AUTH_URL}logout`,
    REFRESH_TOKEN: `${AUTH_URL}refresh-token`
}
