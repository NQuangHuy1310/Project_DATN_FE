import { z } from 'zod'
import { MessageErrors } from '@/constants'

export const createRequestWithDrawSchema = z.object({
    coin: z
        .number()
        .min(0, { message: 'Vui lòng nhập số coin lớn hơn 0' })
        .max(10000, { message: 'Vui lòng nhập số coin nhỏ hơn 1000' }),
    bank_name: z.string().min(1, { message: MessageErrors.requiredField }),
    account_number: z.string().min(1, { message: MessageErrors.requiredField }),
    account_holder: z.string().min(1, { message: MessageErrors.requiredField })
})

export type createRequestWithDraw = z.infer<typeof createRequestWithDrawSchema>
