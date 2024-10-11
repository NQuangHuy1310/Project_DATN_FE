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
    sub_id_category: z.string({ message: MessageErrors.requiredField })
})

export type createNewCourse = z.infer<typeof createNewCourseSchema>

export type courseOverview = z.infer<typeof courseOverviewSchema>
