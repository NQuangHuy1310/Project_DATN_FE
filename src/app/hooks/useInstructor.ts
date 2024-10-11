import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query'

import { intructorApi } from '@/app/services'
import { ITeacher } from '@/types'
import { ICreateCourseData } from '@/types/instructor'
import { instructorApi } from '@/app/services/instructor/instructor'

export const useInstructor = (options?: Omit<UseQueryOptions<ITeacher[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ITeacher[]>({
        ...options,
        queryKey: ['instructor'],
        queryFn: intructorApi.getAllInstructor
    })
}

export const useCreateCourse = () => {
    return useMutation({
        mutationFn: (data: ICreateCourseData) => instructorApi.createCourse(data)
    })
}
