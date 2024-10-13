import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

import { ICreateCourseData, IOverviewCourseData, ITargetCourse } from '@/types/instructor'
import { instructorApi } from '@/app/services/instructors'

export const useCreateCourse = () => {
    return useMutation({
        mutationFn: (data: ICreateCourseData) => instructorApi.createCourse(data)
    })
}

export const useTargetCourse = () => {
    return useMutation<ITargetCourse, Error, [string, ITargetCourse]>({
        mutationFn: async ([courseId, courseData]) => {
            return instructorApi.targetCourse(courseId, courseData)
        },
        onSuccess() {
            toast.success('Cập nhật thông tin khoá học thành công thành công!')
        }
    })
}

export const useOverviewCourse = () => {
    return useMutation<IOverviewCourseData, Error, [string, IOverviewCourseData]>({
        mutationFn: async ([courseId, courseData]) => {
            return instructorApi.courseOverview(courseId, courseData)
        },
        onSuccess() {
            toast.success('Cập nhật thông tin khoá học thành công!')
        }
    })
}
