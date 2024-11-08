import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ITeacher, ITeacherAll, ITeacherDetail } from '@/types'
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
        queryKey: ['instructor-detail', id],
        queryFn: () => instructorClientApi.getInstructorById(id)
    })
}

export const useInstructorMonth = (options?: Omit<UseQueryOptions<ITeacher[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ITeacher[]>({
        ...options,
        queryKey: ['teacher-month'],
        queryFn: instructorClientApi.getTeacherMonth
    })
}
