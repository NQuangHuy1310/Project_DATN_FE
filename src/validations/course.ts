import { MessageErrors } from '@/constants'
import { z } from 'zod'

export const createNewCourseSchema = z.object({
    name: z.string().min(1, MessageErrors.requiredField).max(60),
    id_category: z.string({ message: MessageErrors.requiredField })
})

export const courseOverviewSchema = z
    .object({
        name: z.string().min(1, MessageErrors.requiredField).max(60),
        description: z.string({ message: MessageErrors.requiredField }).min(200, MessageErrors.descriptionTooShort),
        level: z.string({ message: MessageErrors.requiredField }),
        id_category: z.string({ message: MessageErrors.requiredField }),
        price: z
            .string()
            .refine(
                (value) => {
                    const priceValue = parseFloat(value)
                    return priceValue >= 0
                },
                {
                    message: MessageErrors.priceMustBeZeroOrPositive
                }
            )
            .default('0'),
        price_sale: z.string().optional(),
        tags: z.array(z.string()).optional(),
        is_active: z.string().optional().default('1')
    })
    .refine(
        (values) => {
            const priceValue = values.price ? parseFloat(values.price) : null

            if (priceValue !== null && priceValue > 0) {
                if (values.price_sale === undefined || values.price_sale === '') {
                    return new z.ZodError([
                        {
                            code: z.ZodIssueCode.custom,
                            message: MessageErrors.priceMustBeZeroOrPositive,
                            path: ['price_sale']
                        }
                    ])
                }
                return parseFloat(values.price_sale) <= priceValue
            }

            return true
        },
        {
            message: MessageErrors.priceSaleInvalid,
            path: ['price_sale']
        }
    )

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

export const lessonCodingSchema = z.object({
    title: z.string().min(1, MessageErrors.requiredField),
    description: z.string().min(1, MessageErrors.requiredField),
    language: z.string({ message: MessageErrors.requiredField })
})

export type createNewCourse = z.infer<typeof createNewCourseSchema>

export type courseOverview = z.infer<typeof courseOverviewSchema>

export type courseModule = z.infer<typeof courseModuleSchema>

export type lessonDoc = z.infer<typeof lessonDocSchema>

export type lessonVideo = z.infer<typeof lessonVideoSchema>

export type lessonQuiz = z.infer<typeof lessonQuizSchema>

export type lessonCoding = z.infer<typeof lessonCodingSchema>
