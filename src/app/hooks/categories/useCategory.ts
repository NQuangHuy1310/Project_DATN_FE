import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ICategory } from '@/types/category'
import { categoryApis } from '@/app/services/categories'

export const useGetCategories = (options?: Omit<UseQueryOptions<ICategory[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ICategory[]>({
        ...options,
        queryKey: ['categories'],
        queryFn: categoryApis.getCategories
    })
}
