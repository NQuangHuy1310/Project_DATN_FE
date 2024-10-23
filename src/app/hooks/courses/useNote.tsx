import { noteApi } from '@/app/services/courses/note'
import { ILessonNoteGet, ILessonNotePost, ILessonNoteUpdate } from '@/types/course/note'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

export const useGetAllNote = (
    idCourse: number,
    options?: Omit<UseQueryOptions<ILessonNoteGet[]>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ILessonNoteGet[]>({
        ...options,
        queryKey: ['note', idCourse],
        queryFn: () => noteApi.getAllNoteCourse(idCourse)
    })
}

export const useAddNoteLesson = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, ILessonNotePost]>({
        mutationFn: async ([lessonId, noteData]) => {
            return noteApi.addNoteLesson(lessonId, noteData)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['note-lesson-add'] })
        }
    })
}

export const useUpdateNote = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, ILessonNoteUpdate]>({
        mutationFn: async ([noteId, noteData]) => {
            return noteApi.updateNoteLesson(noteId, noteData)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['note-lesson-update'] })
        }
    })
}

export const useDeleteNote = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number]>({
        mutationFn: async ([noteId]) => {
            return noteApi.deleteNoteLesson(noteId)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['note-lesson-delete'] })
        }
    })
}
