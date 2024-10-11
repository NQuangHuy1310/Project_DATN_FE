import { useMutation } from '@tanstack/react-query'

import { ICreateCourseData } from '@/types/instructor'
import { instructorApi } from '@/app/services/instructors'

export const useCreateCourse = () => {
    return useMutation({
        mutationFn: (data: ICreateCourseData) => instructorApi.createCourse(data)
    })
}
