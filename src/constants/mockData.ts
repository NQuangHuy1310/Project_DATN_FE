import { CourseLevel, TeacherStatus } from '@/constants/constants'
import { ICourse, ITeacher } from '@/types'
import { INotifyMessage } from '@/types/notifymessage';

export const courses: ICourse[] = [
    {
        image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'UX Design : How To Implement Usability Testing',
        star: 4.5,
        studentCount: 100,
        totalVideo: 10,
        totalTime: '5 giờ',
        level: CourseLevel.Beginner,
        createdBy: {
            id: 1,
            name: 'Nguyễn Quang Huy',
            email: 'Huy@gmail.com',
            avatar: 'https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            is_active: true,
            user_type: 'member'
        }
    },
    {
        image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Animation is the Key of Successfull UI/UX Design',
        star: 4.5,
        studentCount: 100,
        totalVideo: 10,
        totalTime: '5 giờ',
        level: CourseLevel.Intermediate,
        createdBy: {
            id: 1,
            name: 'Nguyễn Quang Huy',
            email: 'Huy@gmail.com',
            avatar: '',
            is_active: true,
            user_type: 'member'
        }
    }
]

export const mockTeachers: ITeacher[] = [
    {
        image: 'https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Nguyễn Quang Huy',
        job: 'UI UX . Design',
        totalCourse: 5,
        reviewStart: 4.5,
        totalReview: 100,
        status: TeacherStatus.follow
    },
    {
        image: 'https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Nguyễn Quang Huy',
        job: 'Web developer',
        totalCourse: 5,
        reviewStart: 4.5,
        totalReview: 100,
        status: TeacherStatus.followed
    },
    {
        image: 'https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Nguyễn Quang Huy',
        job: 'Backend developer',
        totalCourse: 5,
        reviewStart: 4.5,
        totalReview: 100,
        status: TeacherStatus.unFollow
    }
]
export const notifyMessages: INotifyMessage[] = [
    {
        read: false,
        title: 'Welcome to the platform!',
        status: 'message',
        time: 930, // 9:30 AM
        message: 'Thank you for joining us! Feel free to explore.',
        avatar: 'https://picsum.photos/200'
    },
    {
        read: true,
        title: 'New Course Available',
        status: 'newCourse',
        time: 1415, // 2:15 PM
        message: 'Check out our new course on JavaScript development.',

    },
    {
        read: false,
        title: 'Update on your current course',
        status: 'myCourse',
        time: 1010, // 10:10 AM
        message: 'Your current course has been updated with new materials.',

    },
    {
        read: true,
        title: 'Reminder for upcoming lesson',
        status: 'notify',
        time: 1545, // 3:45 PM
        message: 'Don’t forget your lesson on React.js tomorrow at 10 AM.',
    },
    {
        read: false,
        title: 'New Message from Instructor',
        status: 'message',
        time: 830, // 8:30 AM
        message: 'You have received a new message from your instructor.',
        avatar: 'https://picsum.photos/203'
    },
    {
        read: true,
        title: 'Course Completion Reminder',
        status: 'myCourse',
        time: 1700, // 5:00 PM
        message: 'You are close to completing your course. Keep up the good work!',
    },
    {
        read: false,
        title: 'System Maintenance Notification',
        status: 'notify',
        time: 2330, // 11:30 PM
        message: 'The platform will be undergoing maintenance this weekend.',

    },
    {
        read: true,
        title: 'New Feature Release',
        status: 'notify',
        time: 1215, // 12:15 PM
        message: 'We’ve added new features to enhance your learning experience.',
    },
    {
        read: false,
        title: 'Course Discount Offer',
        status: 'newCourse',
        time: 900, // 9:00 AM
        message: 'Get 50% off on your next course enrollment!',
    },
    {
        read: true,
        title: 'Course Enrollment Confirmation',
        status: 'myCourse',
        time: 1145, // 11:45 AM
        message: 'You’ve successfully enrolled in the Advanced Python course.',
    }
];
