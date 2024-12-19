import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { categoryApis } from '@/app/services/categories'
import { ICategory } from '@/types'

export const useGetCategories = (options?: Omit<UseQueryOptions<ICategory[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ICategory[]>({
        ...options,
        queryKey: ['categories'],
        queryFn: categoryApis.getCategories
    })
}
export const useGetCategoriesPost = (options?: Omit<UseQueryOptions<ICategory[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ICategory[]>({
        ...options,
        queryKey: ['categories-post'],
        queryFn: categoryApis.getCategoriesPost
    })
}
