import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ITeacher } from '@/types'
import { instructorClientApi } from '@/app/services/instructors'

export const useInstructor = (options?: Omit<UseQueryOptions<ITeacher[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ITeacher[]>({
        ...options,
        queryKey: ['instructor'],
        queryFn: instructorClientApi.getAllInstructor
    })
}
