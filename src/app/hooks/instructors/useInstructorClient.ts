import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ITeacherAll, ITeacherDetail } from '@/types'
import { instructorClientApi } from '@/app/services/instructors'

export const useInstructor = (
    page: number,
    perPage?: number,
    options?: Omit<UseQueryOptions<ITeacherAll>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ITeacherAll>({
        ...options,
        queryKey: ['instructor', page, perPage],
        queryFn: () => instructorClientApi.getAllInstructor(page, perPage)
    })
}

export const useInstructorById = (
    id: number,
    options?: Omit<UseQueryOptions<ITeacherDetail>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ITeacherDetail>({
        ...options,
        queryKey: ['instructor', { id }],
        queryFn: () => instructorClientApi.getInstructorById(id)
    })
}
