import { MessageErrors } from '@/constants'
import { z } from 'zod'

export const sendMessageSchema = z.object({
    message: z.string().min(1, MessageErrors.requiredField)
})

export type sendMessage = z.infer<typeof sendMessageSchema>
