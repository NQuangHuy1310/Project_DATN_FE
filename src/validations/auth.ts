import { z } from 'zod'
import { MessageErrors } from '@/constants'

export const loginSchema = z.object({
    email: z.string().email(MessageErrors.invalidEmail),
    password: z.string().min(8, MessageErrors.passwordTooShort)
})

export const registerSchema = z
    .object({
        name: z.string().min(1, MessageErrors.requiredField),
        email: z.string().email(MessageErrors.invalidEmail),
        password: z.string().min(8, MessageErrors.passwordTooShort),
        password_confirmation: z.string()
    })
    .refine(
        (values) => {
            return values.password === values.password_confirmation
        },
        {
            message: MessageErrors.passwordsDoNotMatch,
            path: ['password_confirmation']
        }
    )

export const profileSchema = z.object({
    name: z.string().min(1, MessageErrors.requiredField),
    phone: z.string().min(10, MessageErrors.phoneTooShort).max(14, MessageErrors.phoneTooLong),
    address: z.string().optional(),
    bio: z.string().optional(),
    experience: z.string().optional()
})

export const changePasswordSchema = z
    .object({
        current_password: z.string().min(8, MessageErrors.passwordTooShort),
        new_password: z.string().min(8, MessageErrors.passwordTooShort),
        new_password_confirmation: z.string()
    })
    .refine(
        (values) => {
            return values.new_password === values.new_password_confirmation
        },
        {
            message: MessageErrors.passwordsDoNotMatch,
            path: ['new_password_confirmation']
        }
    )

export const forgotPasswordSchema = z.object({
    email: z.string().email(MessageErrors.invalidEmail)
})

export const resetPasswordSchema = z
    .object({
        new_password: z.string().min(8, MessageErrors.passwordTooShort),
        new_password_confirmation: z.string()
    })
    .refine(
        (values) => {
            return values.new_password === values.new_password_confirmation
        },
        {
            message: MessageErrors.passwordsDoNotMatch,
            path: ['new_password_confirmation']
        }
    )

export type LoginFormFields = z.infer<typeof loginSchema>

export type RegisterFormFields = z.infer<typeof registerSchema>

export type ProfileFormFields = z.infer<typeof profileSchema>

export type ChangePasswordFields = z.infer<typeof changePasswordSchema>

export type ForgotPasswordField = z.infer<typeof forgotPasswordSchema>

export type ResetPasswordFields = z.infer<typeof resetPasswordSchema>
