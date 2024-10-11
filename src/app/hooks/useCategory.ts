import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { categoryApis } from '@/app/services'
import { ICategory } from '@/types/category'

export const useGetCategories = (options?: Omit<UseQueryOptions<ICategory[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ICategory[]>({
        ...options,
        queryKey: ['categories'],
        queryFn: categoryApis.getCategories
    })
}
