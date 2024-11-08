import { userApis } from '@/app/services/accounts'
import { CheckFlow, Flow } from '@/types/user'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

export const useFlowTeacher = () => {
    const queryClient = useQueryClient()
    return useMutation<any, Error, [Flow]>({
        mutationFn: async ([teacherId]) => {
            return userApis.flowTeacher(teacherId)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['check-follow-teacher'] }),
                queryClient.invalidateQueries({ queryKey: ['teacher-month'] })
            ])
        }
    })
}

export const useUnFlowTeacher = () => {
    const queryClient = useQueryClient()
    return useMutation<any, Error, [Flow]>({
        mutationFn: async ([teacherId]) => {
            return userApis.unFlowTeacher(teacherId)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['check-follow-teacher'] }),
                queryClient.invalidateQueries({ queryKey: ['teacher-month'] })
            ])
        }
    })
}

export const useCheckFlowTeacher = (
    userId: number,
    teacherId: number,
    options?: Omit<UseQueryOptions<CheckFlow>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<CheckFlow>({
        ...options,
        queryKey: ['check-follow-teacher', userId, teacherId],
        enabled: !!teacherId && !!userId,
        queryFn: () => userApis.checkFollow(userId, teacherId)
    })
}
