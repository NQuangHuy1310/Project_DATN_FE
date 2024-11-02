import { IBankData, IBanner } from '@/types/others'
import { bannerApi, getBanks } from '@/app/services/others/others'

import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useGetBanners = (options?: Omit<UseQueryOptions<IBanner[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<IBanner[]>({
        ...options,
        queryKey: ['banners'],
        queryFn: bannerApi.getBanners
    })
}

export const useGetBanks = (options?: Omit<UseQueryOptions<IBankData>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ['banks'],
        queryFn: getBanks
    })
}
