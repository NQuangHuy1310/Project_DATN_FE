import { userApis } from '@/app/services/accounts/user'
import { ICourseMyBought } from '@/types/user'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useCourseMyBought = (
    search?: string,
    category?: string,
    level?: string,
    arrange?: string,
    page?: number,
    perPage?: number,
    options?: Omit<UseQueryOptions<ICourseMyBought>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ICourseMyBought>({
        ...options,
        queryKey: ['course-my-bought', search, category, level, arrange, page, perPage],
        queryFn: () => userApis.getMyCourseBought(search, category, level, arrange, page, perPage)
    })
}
