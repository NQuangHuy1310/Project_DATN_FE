import { noteUri } from '@/app/services/Uri/courses/note'
import axiosClient from '@/configs/axiosClient'
import { ILessonNoteGet, ILessonNotePost, ILessonNoteUpdate } from '@/types/course/note'

export const noteApi = {
    getAllNoteCourse: async (id: number): Promise<ILessonNoteGet[]> => {
        return axiosClient.get(noteUri.ALL_NOTE_COURSE(id))
    },
    addNoteLesson: async (id: number, data: ILessonNotePost): Promise<any> => {
        return axiosClient.post(noteUri.ADD_NOTE_LESSON(id), data)
    },
    updateNoteLesson: async (id: number, data: ILessonNoteUpdate): Promise<any> => {
        return axiosClient.post(noteUri.UPDATE_NOTE_LESSON(id), data)
    },
    deleteNoteLesson: async (id: number): Promise<any> => {
        return axiosClient.delete(noteUri.DELETE_NOTE_LESSON(id))
    }
}
