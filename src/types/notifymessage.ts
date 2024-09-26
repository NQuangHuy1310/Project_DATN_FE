export interface INotifyMessage {
    read: boolean,
    title: string,
    status: 'message' | 'notify' | 'newCourse' | 'myCourse',
    time: number,
    message: string,
    avatar?: string
}