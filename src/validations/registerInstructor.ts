import { z } from 'zod'
const FILE_UPLOAD_MAX_SIZE = 10 * 1024 * 1024

export const registerInstructorSchema = z.object({
    degree: z.string().min(1, 'Bằng cấp không được để trống'),
    institution_name: z.string().min(1, 'Tên trường không được để trống'),
    start_date: z
        .preprocess(
            (input) => {
                if (input == null) {
                    // Check if input is null or undefined
                    return undefined // Return undefined to allow the check for empty value
                }
                if (typeof input === 'string') {
                    return new Date(input)
                }
                return input
            },
            z.date({ invalid_type_error: 'Vui lòng nhập năm hoàn thành hợp lệ' })
        )
        .refine(
            (date) => {
                const year = date.getFullYear()
                const month = date.getMonth()
                const day = date.getDate()
                const currentDate = new Date()
                const currentYear = currentDate.getFullYear()
                const currentMonth = currentDate.getMonth()
                const currentDay = currentDate.getDate()
                if (year < 1900) {
                    return false
                }

                if (year === currentYear) {
                    if (month > currentMonth || (month === currentMonth && day > currentDay)) {
                        return false
                    }
                }
                return year <= currentYear
            },
            {
                message: 'Năm hoàn thành không được vượt quá năm hiện tại hoặc ngày nhập vào phải hợp lệ.'
            }
        )
        .refine((date) => date.getFullYear() >= 1900, {
            message: 'Năm hoàn thành phải sau 1900'
        })
        .refine(
            (date) => {
                if (!date) {
                    return false
                }
                return true
            },
            {
                message: 'Vui lòng nhập ngày hoàn thành.'
            }
        ),
    certificates: z
        .array(
            z.object({
                file: z
                    .instanceof(File)
                    .nullable()
                    .refine((file) => !file || file.size <= FILE_UPLOAD_MAX_SIZE, 'File không được vượt quá 10MB')
            })
        )
        .min(1, 'Vui lòng tải lên ít nhất một chứng chỉ')
})

export type registerInstructor = z.infer<typeof registerInstructorSchema>
