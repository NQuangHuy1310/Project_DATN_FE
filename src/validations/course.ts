import { MessageErrors } from '@/constants'
import { z } from 'zod'

export const createNewCourseSchema = z.object({
    name: z.string().min(1, MessageErrors.requiredField).max(60),
    id_category: z.string({ message: MessageErrors.requiredField })
})

export const courseOverviewSchema = z.object({
    name: z.string().min(1, MessageErrors.requiredField).max(60),
    description: z.string({ message: MessageErrors.requiredField }).min(200, MessageErrors.descriptionTooShort),
    level: z.string({ message: MessageErrors.requiredField }),
    id_category: z.string({ message: MessageErrors.requiredField }),
    price: z.string().min(0),
    price_sale: z.string().min(0),
    tags: z.array(z.string()).optional(),
    is_active: z.string().optional().default('1')
})

export const courseModuleSchema = z.object({
    title: z.string().min(1, MessageErrors.requiredField),
    description: z.string().min(1, MessageErrors.requiredField)
})

export const lessonDocSchema = z.object({
    title: z.string().min(1, MessageErrors.requiredField),
    content: z.string({ message: MessageErrors.requiredField })
})

export const lessonVideoSchema = z.object({
    title: z.string().min(1, MessageErrors.requiredField),
    description: z.string({ message: MessageErrors.requiredField })
})

export const lessonQuizSchema = z.object({
    title: z.string().min(1, MessageErrors.requiredField),
    description: z.string({ required_error: MessageErrors.requiredField })
})

export type createNewCourse = z.infer<typeof createNewCourseSchema>

export type courseOverview = z.infer<typeof courseOverviewSchema>

export type courseModule = z.infer<typeof courseModuleSchema>

export type lessonDoc = z.infer<typeof lessonDocSchema>

export type lessonVideo = z.infer<typeof lessonVideoSchema>

export type lessonQuiz = z.infer<typeof lessonQuizSchema>
