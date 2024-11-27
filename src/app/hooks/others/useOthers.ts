import { CertificateData, IBankData, IBanner, ICategoryLeaningPath } from '@/types/others'
import { bannerApi, communicateChatAI, getBanks, learningPathApi } from '@/app/services/others/others'

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { certificationApis } from '@/app/services/certificates/certificates'
import { ICourseLearningPath } from '@/types/course/course'

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

export const useGetCateLearningPath = (
    options?: Omit<UseQueryOptions<ICategoryLeaningPath[]>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        queryKey: ['cate-learning-path'],
        queryFn: learningPathApi.getCateLearningPath
    })
}

export const useGetCourseLearningPath = (
    cate: string,
    options?: Omit<UseQueryOptions<ICourseLearningPath>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        enabled: !!cate,
        queryKey: ['course-learning-path', cate],
        queryFn: () => learningPathApi.getCourseLearningPath(cate)
    })
}
export const useCommunicateChatAI = () => {
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn: async (question: string) => {
            return communicateChatAI.chatAI(question)
        }, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myPosts'] })
        }
    })
}
export const useFilterChatAI = (status: string, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ['filter-chatai', status],
        queryFn: () => communicateChatAI.filterChatAI(status)
    })
}