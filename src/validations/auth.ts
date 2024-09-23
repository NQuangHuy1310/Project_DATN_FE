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

export type LoginFormFields = z.infer<typeof loginSchema>

export type RegisterFormFields = z.infer<typeof registerSchema>
