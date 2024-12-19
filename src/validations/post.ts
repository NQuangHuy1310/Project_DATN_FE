import { MessageErrors } from '@/constants'
import { z } from 'zod'

export const createPostSchema = z.object({
    title: z.string().min(1, MessageErrors.requiredField),
    description: z.string().min(1, MessageErrors.requiredField),
    content: z.string().min(1, MessageErrors.requiredField),
    published_at: z.date().optional(),
    categories: z.string({ required_error: MessageErrors.requiredField })
})

export type createPost = z.infer<typeof createPostSchema>
