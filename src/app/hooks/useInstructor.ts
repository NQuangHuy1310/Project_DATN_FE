import { intructorApi } from '@/app/services'
import { ITeacher } from '@/types'

import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useInstructor = (options?: Omit<UseQueryOptions<ITeacher[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ITeacher[]>({
        ...options,
        queryKey: ['instructor'],
        queryFn: intructorApi.getAllInstructor,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1
    })
}
