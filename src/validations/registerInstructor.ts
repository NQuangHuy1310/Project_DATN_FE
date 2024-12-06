import { z } from 'zod'
const FILE_UPLOAD_MAX_SIZE = 10 * 1024 * 1024

export const registerInstructorSchema = z.object({
    degree: z.string().min(1, 'Bằng cấp không được để trống'),
    institution_name: z.string().min(1, 'Tên trường không được để trống'),
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
