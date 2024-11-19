import { userApis } from '@/app/services/accounts/user'
import { ICourseMyBought } from '@/types/user'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useCourseMyBought = (options?: Omit<UseQueryOptions<ICourseMyBought[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ICourseMyBought[]>({
        ...options,
        queryKey: ['course-my-bought'],
        queryFn: userApis.getMyCourseBought
    })
}
