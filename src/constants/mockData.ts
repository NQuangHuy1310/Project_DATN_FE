import { ICourse, ITeacher } from '@/types'
import { CourseLevel, notificationTypes, TeacherStatus } from '@/constants/constants'
import { INotificationMessage } from '@/types/notificationMessage'

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
export const notificationMessages: INotificationMessage[] = [
    {
        notificationType: notificationTypes.user,
        title: 'Tin nhắn mới từ Alice',
        message: 'Alice đã gửi cho bạn một tin nhắn.',
        senderBy: {
            id: 1,
            name: 'Alice Smith',
            email: 'alice.smith@example.com',
            avatar: 'https://example.com/avatars/alice.png',
            is_active: true,
            user_type: 'member'
        },
        sentAt: '8h trước',
        isRead: false
    },
    {
        notificationType: notificationTypes.instructor,
        title: 'Thông báo lớp học',
        message: 'Lớp học của bạn sẽ bắt đầu lúc 9:00 sáng ngày mai.',
        senderBy: {
            id: 2,
            name: 'Mr. Johnson',
            email: 'mr.johnson@example.com',
            avatar: null,
            is_active: true,
            user_type: 'admin'
        },
        sentAt: '1h Trước',
        isRead: true
    },
    {
        notificationType: notificationTypes.system,
        title: 'Cập nhật hệ thống',
        message: 'Hệ thống sẽ bảo trì từ 2:00 AM đến 4:00 AM.',
        senderBy: {
            id: 3,
            name: 'Charlie Johnson',
            email: 'charlie.johnson@example.com',
            avatar: 'https://example.com/avatars/charlie.png',
            is_active: false,
            user_type: 'member'
        },
        sentAt: '4h Trước',
        isRead: false
    },
    {
        notificationType: notificationTypes.user,
        title: 'Yêu cầu kết bạn',
        message: 'Bob muốn kết bạn với bạn.',
        senderBy: {
            id: 4,
            name: 'Bob Brown',
            email: 'bob.brown@example.com',
            avatar: null,
            is_active: true,
            user_type: 'admin'
        },
        sentAt: '3h Trước',
        isRead: false
    },
    {
        notificationType: notificationTypes.instructor,
        title: 'Nộp bài tập',
        message: 'Đừng quên nộp bài tập trước 5:00 chiều hôm nay.',
        senderBy: {
            id: 5,
            name: 'Diana Prince',
            email: 'diana.prince@example.com',
            avatar: 'https://example.com/avatars/diana.png',
            is_active: true,
            user_type: 'admin'
        },
        sentAt: '2h Trước',
        isRead: false
    }
]

export const myCourses: ICourse[] = [
    {
        image: 'https://i.pinimg.com/564x/ac/27/1d/ac271de883faa03617b212beeda73db3.jpg',
        name: 'Introduction Basic Programming HTML & CSS',
        star: 4.5,
        level: CourseLevel.Intermediate,
        progressLesson: 66,
        totalLesson: 90,
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
        image: 'https://i.pinimg.com/564x/ac/27/1d/ac271de883faa03617b212beeda73db3.jpg',
        name: 'Introduction Basic Programming HTML & CSS',
        star: 4.7,
        level: CourseLevel.Beginner,
        progressLesson: 80,
        totalLesson: 178,
        createdBy: {
            id: 2,
            name: 'Nguyễn Quang Huy',
            email: 'Huy@gmail.com',
            avatar: 'https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            is_active: true,
            user_type: 'member'
        }
    },
    {
        image: 'https://i.pinimg.com/564x/ac/27/1d/ac271de883faa03617b212beeda73db3.jpg',
        name: 'Introduction Basic Programming HTML & CSS',
        star: 4.9,
        level: CourseLevel.Master,
        progressLesson: 146,
        totalLesson: 220,
        createdBy: {
            id: 3,
            name: 'Nguyễn Quang Huy',
            email: 'Huy@gmail.com',
            avatar: 'https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            is_active: true,
            user_type: 'member'
        }
    },
    {
        image: 'https://i.pinimg.com/564x/ac/27/1d/ac271de883faa03617b212beeda73db3.jpg',
        name: 'Introduction Basic Programming HTML & CSS',
        star: 4.8,
        level: CourseLevel.Intermediate,
        progressLesson: 87,
        totalLesson: 160,
        createdBy: {
            id: 4,
            name: 'Nguyễn Quang Huy',
            email: 'Huy@gmail.com',
            avatar: 'https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            is_active: true,
            user_type: 'member'
        }
    }
]
