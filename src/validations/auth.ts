import { z } from 'zod'
import { MessageErrors } from '@/constants'

export const loginSchema = z.object({
    email: z.string().email(MessageErrors.invalidEmail),
    password: z.string().min(8, MessageErrors.passwordTooShort)
})

export const registerSchema = z
    .object({
        username: z.string().min(1, MessageErrors.requiredField),
        email: z.string().email(MessageErrors.invalidEmail),
        password: z.string().min(8, MessageErrors.passwordTooShort),
        confirmPassword: z.string()
    })
    .refine(
        (values) => {
            return values.password === values.confirmPassword
        },
        {
            message: MessageErrors.passwordsDoNotMatch,
            path: ['confirmPassword']
        }
    )

export type LoginFormFields = z.infer<typeof loginSchema>

export type RegisterFormFields = z.infer<typeof registerSchema>
