export interface ILessonNotePost {
    content: string
    duration: number
}

export interface ILessonNoteUpdate {
    content: string
    _method: string
}

export interface ILessonNoteGet {
    id: number
    id_user: number
    id_lesson: number
    content: string
    duration: number
    lesson_title: string
}
