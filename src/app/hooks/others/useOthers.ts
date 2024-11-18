import { CertificateData, IBankData, IBanner } from '@/types/others'
import { bannerApi, getBanks } from '@/app/services/others/others'

import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { certificationApis } from '@/app/services/certificates/certificates'

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

export const usePostCertification = () => {
    return useMutation<any, Error, [number]>({
        mutationFn: async ([courseId]) => {
            return certificationApis.postCertification(courseId)
        }
    })
}

export const useGetCertification = (
    code_certificate: string,
    options?: Omit<UseQueryOptions<CertificateData>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        queryKey: ['certificate', code_certificate],
        queryFn: () => certificationApis.getCertification(code_certificate)
    })
}

export const useGetCertificationImage = (
    code_certificate: string,
    type: string,
    options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        queryKey: ['certificate-pdf', code_certificate],
        enabled: !!code_certificate,
        queryFn: () => certificationApis.getCertificationImage(code_certificate, type)
    })
}
