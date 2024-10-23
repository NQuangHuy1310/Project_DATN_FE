const NOTE_URL = 'notes/'

export const noteUri = {
    ALL_NOTE_COURSE: (idCourse: number) => `${NOTE_URL}${idCourse}`,
    ADD_NOTE_LESSON: (idLesson: number) => `${NOTE_URL}add-note/${idLesson}`,
    UPDATE_NOTE_LESSON: (idNote: number) => `${NOTE_URL}update-note/${idNote}`,
    DELETE_NOTE_LESSON: (idNote: number) => `${NOTE_URL}delete-note/${idNote}`
}
