import { ICourse, ICourseToday, IModule, ITeacher } from '@/types'
import { CourseLevel, notificationTypes, TeacherStatus } from '@/constants'
import { INotificationMessage } from '@/types'
import { IAccoutMessage, IMessage } from '@/types/communicate'
import { IRecharge } from '@/types/transaction'

export const courses: ICourse[] = [
    {
        course_id: 1,
        course_thumbnail:
            'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        course_name: 'Lập trình C++ cơ bản, nâng cao',
        total_student: 100,
        totalVideo: 10,
        average_rating: 4,
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
        course_id: 2,
        course_thumbnail:
            'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        course_name: 'Xây Dựng Website với ReactJS',
        total_student: 100,
        average_rating: 3.5,
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
    },
    {
        course_id: 3,
        course_thumbnail:
            'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        course_name: 'Xây Dựng Website với ReactJS',
        total_student: 100,
        average_rating: 4.5,
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
    },
    {
        course_id: 4,
        course_thumbnail:
            'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        course_name: 'Xây Dựng Website với ReactJS',
        total_student: 100,
        average_rating: 5,
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
        user_id: 1,
        user_avatar:
            'https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        user_name: 'Nguyễn Quang Huy',
        total_courses: 5,
        average_rating: 4.5,
        total_ratings: 100,
        status: TeacherStatus.follow
    },
    {
        user_id: 2,
        user_avatar:
            'https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        user_name: 'Nguyễn Quang Huy',
        total_courses: 5,
        average_rating: 4.5,
        total_ratings: 100,
        status: TeacherStatus.followed
    },
    {
        user_id: 3,
        user_avatar:
            'https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        user_name: 'Nguyễn Quang Huy',
        total_courses: 5,
        average_rating: 4.5,
        total_ratings: 100,
        status: TeacherStatus.unFollow
    },
    {
        user_id: 4,
        user_avatar:
            'https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        user_name: 'Nguyễn Quang Huy',
        total_courses: 5,
        average_rating: 4.5,
        total_ratings: 100,
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
        course_id: 1,
        course_thumbnail: 'https://i.pinimg.com/564x/ac/27/1d/ac271de883faa03617b212beeda73db3.jpg',
        course_name: 'Introduction Basic Programming HTML & CSS',
        average_rating: 4.5,
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
        course_id: 2,
        course_thumbnail: 'https://i.pinimg.com/564x/ac/27/1d/ac271de883faa03617b212beeda73db3.jpg',
        course_name: 'Introduction Basic Programming HTML & CSS',
        average_rating: 4.7,
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
        course_id: 3,
        course_thumbnail: 'https://i.pinimg.com/564x/ac/27/1d/ac271de883faa03617b212beeda73db3.jpg',
        course_name: 'Introduction Basic Programming HTML & CSS',
        average_rating: 4.9,
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
        course_id: 4,
        course_thumbnail: 'https://i.pinimg.com/564x/ac/27/1d/ac271de883faa03617b212beeda73db3.jpg',
        course_name: 'Introduction Basic Programming HTML & CSS',
        average_rating: 4.8,
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

export const coursesToday: ICourseToday[] = [
    {
        course_id: 1,
        course_thumbnail: 'https://i.pinimg.com/564x/ac/27/1d/ac271de883faa03617b212beeda73db3.jpg',
        course_name: 'Introduction to UX Design',
        average_rating: 4.5,
        level: CourseLevel.Beginner,
        module: [
            {
                title: 'Introduction',
                lessons: [
                    { title: 'Bài học 1.1', time: 9.25, type: 'video' },
                    { title: 'Bài học 1.2', time: 8.25, type: 'docs' },
                    { title: 'Bài học 1.3', time: 7.25, type: 'docs' },
                    { title: 'Bài học 1.4', time: 6.25, type: 'quiz' }
                ],
                time: 10
            },
            {
                title: 'What is UX Design',
                lessons: [
                    { title: 'Bài học 1.1', time: 9.25, type: 'video' },
                    { title: 'Bài học 1.2', time: 8.25, type: 'docs' },
                    { title: 'Bài học 1.3', time: 7.25, type: 'docs' },
                    { title: 'Bài học 1.4', time: 6.25, type: 'quiz' }
                ],
                time: 10
            },
            {
                title: 'Usability Testing',
                lessons: [
                    { title: 'Bài học 1.1', time: 9.25, type: 'video' },
                    { title: 'Bài học 1.2', time: 8.25, type: 'docs' },
                    { title: 'Bài học 1.3', time: 7.25, type: 'docs' },
                    { title: 'Bài học 1.4', time: 6.25, type: 'quiz' }
                ],
                time: 10
            },
            {
                title: 'Create Usability Test',
                lessons: [
                    { title: 'Bài học 1.1', time: 9.25, type: 'video' },
                    { title: 'Bài học 1.2', time: 8.25, type: 'docs' },
                    { title: 'Bài học 1.3', time: 7.25, type: 'docs' },
                    { title: 'Bài học 1.4', time: 6.25, type: 'quiz' }
                ],
                time: 30
            },
            {
                title: 'How to Implement',
                lessons: [
                    { title: 'Bài học 1.1', time: 9.25, type: 'video' },
                    { title: 'Bài học 1.2', time: 8.25, type: 'docs' },
                    { title: 'Bài học 1.3', time: 7.25, type: 'docs' },
                    { title: 'Bài học 1.4', time: 6.25, type: 'quiz' }
                ],
                time: 30
            }
        ],
        total_student: 100,
        totalVideo: 10,
        totalTime: '5 giờ',
        createdBy: {
            id: 4,
            name: 'Nguyễn Quang Huy',
            email: 'Huy@gmail.com',
            avatar: 'https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            is_active: true,
            user_type: 'member'
        }
    },
    {
        course_id: 1,
        course_thumbnail: 'https://i.pinimg.com/564x/ac/27/1d/ac271de883faa03617b212beeda73db3.jpg',
        course_name: 'Introduction to UX Design',
        average_rating: 4.5,
        level: CourseLevel.Beginner,
        module: [
            {
                title: 'Introduction',
                lessons: [
                    { title: 'Bài học 1.1', time: 9.25, type: 'video' },
                    { title: 'Bài học 1.2', time: 8.25, type: 'docs' },
                    { title: 'Bài học 1.3', time: 7.25, type: 'docs' },
                    { title: 'Bài học 1.4', time: 6.25, type: 'quiz' }
                ],
                time: 10
            },
            {
                title: 'What is UX Design',
                lessons: [
                    { title: 'Bài học 1.1', time: 9.25, type: 'video' },
                    { title: 'Bài học 1.2', time: 8.25, type: 'docs' },
                    { title: 'Bài học 1.3', time: 7.25, type: 'docs' },
                    { title: 'Bài học 1.4', time: 6.25, type: 'quiz' }
                ],
                time: 10
            },
            {
                title: 'Usability Testing',
                lessons: [
                    { title: 'Bài học 1.1', time: 9.25, type: 'video' },
                    { title: 'Bài học 1.2', time: 8.25, type: 'docs' },
                    { title: 'Bài học 1.3', time: 7.25, type: 'docs' },
                    { title: 'Bài học 1.4', time: 6.25, type: 'quiz' }
                ],
                time: 10
            },
            {
                title: 'Create Usability Test',
                lessons: [
                    { title: 'Bài học 1.1', time: 9.25, type: 'video' },
                    { title: 'Bài học 1.2', time: 8.25, type: 'docs' },
                    { title: 'Bài học 1.3', time: 7.25, type: 'docs' },
                    { title: 'Bài học 1.4', time: 6.25, type: 'quiz' }
                ],
                time: 30
            },
            {
                title: 'How to Implement',
                lessons: [
                    { title: 'Bài học 1.1', time: 9.25, type: 'video' },
                    { title: 'Bài học 1.2', time: 8.25, type: 'docs' },
                    { title: 'Bài học 1.3', time: 7.25, type: 'docs' },
                    { title: 'Bài học 1.4', time: 6.25, type: 'quiz' }
                ],
                time: 30
            }
        ],
        total_student: 100,
        totalVideo: 10,
        totalTime: '5 giờ',
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
export const courseLeaning: IModule[] = [
    {
        title: 'Bài học 1',
        lessons: [
            { title: 'Bài học 1.1', time: 9.25, type: 'video' },
            { title: 'Bài học 1.2', time: 8.25, type: 'docs' },
            { title: 'Bài học 1.3', time: 7.25, type: 'docs' },
            { title: 'Bài học 1.4', time: 6.25, type: 'quiz' }
        ],
        time: 31
    },
    {
        title: 'Bài học 2',
        lessons: [
            { title: 'Bài học 2.1', time: 8.25, type: 'video' },
            { title: 'Bài học 2.2', time: 8.25, type: 'docs' },
            { title: 'Bài học 2.3', time: 9.25, type: 'video' },
            { title: 'Bài học 2.4', time: 15.25, type: 'quiz' },
            { title: 'Bài học 2.5', time: 15.25, type: 'quiz' }
        ],
        time: 56.25
    },
    {
        title: 'Bài học 3',
        lessons: [
            { title: 'Bài học 3.1', time: 8.25, type: 'video' },
            { title: 'Bài học 3.2', time: 8.25, type: 'docs' },
            { title: 'Bài học 3.3', time: 9.25, type: 'video' },
            { title: 'Bài học 3.4', time: 15.25, type: 'quiz' }
        ],
        time: 41
    }
]

export const messages: IMessage[] = [
    {
        user: {
            name: 'Emerson Levin',
            is_active: true,
            user_type: 'member',
            avatar: 'https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        text: 'Morning Emerson, I have a question about the course.',
        time: 'Today 11:52',
        fromUser: true
    },
    {
        user: {
            name: 'Jakob Calzoni',
            is_active: true,
            user_type: 'member',
            avatar: 'https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        text: 'Yes sure, Any problem to implement the course?',
        time: 'Today 11:52',
        fromUser: false
    },
    {
        user: {
            name: 'Emerson Levin',
            is_active: true,
            user_type: 'member',
            avatar: 'https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        text: 'Nam libero tempore, cum soluta nobis...',
        time: 'Today 11:55',
        fromUser: true
    }
]

export const accountMessages: IAccoutMessage[] = [
    {
        user: {
            name: 'John Doe',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            is_active: true
        },
        time: 5,
        message: 'Hello, how are you?',
        is_Read: false
    },
    {
        user: {
            name: 'Jane Smith',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            is_active: true
        },
        time: 10,
        message: 'Did you finish the report?',
        is_Read: true
    },
    {
        user: {
            name: 'Alice Johnson',
            avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
            is_active: true
        },
        time: 25,
        message: "Let's meet for lunch tomorrow.",
        is_Read: false
    },
    {
        user: {
            name: 'Bob Brown',
            avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
            is_active: true
        },
        time: 35,
        message: 'Can you send me the file?',
        is_Read: true
    },
    {
        user: {
            name: 'Charlie Black',
            avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
            is_active: true
        },
        time: 50,
        message: "Don't forget the meeting at 3 PM.",
        is_Read: false
    },
    {
        user: {
            name: 'Diana White',
            avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
            is_active: true
        },
        time: 85,
        message: 'Great job on the presentation!',
        is_Read: true
    },
    {
        user: {
            name: 'Edward Green',
            avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
            is_active: true
        },
        time: 90,
        message: 'Could you clarify the last point?',
        is_Read: false
    },
    {
        user: {
            name: 'Edward Green',
            avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
            is_active: true
        },
        time: 90,
        message: 'Could you clarify the last point?',
        is_Read: false
    },
    {
        user: {
            name: 'Edward Green',
            avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
            is_active: true
        },
        time: 90,
        message: 'Could you clarify the last point?',
        is_Read: false
    },
    {
        user: {
            name: 'Edward Green',
            avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
            is_active: true
        },
        time: 90,
        message: 'Could you clarify the last point?',
        is_Read: false
    }
]
export const transaction: IRecharge[] = [
    {
        cent: 50,
        cash: 50000
    },
    {
        cent: 100,
        cash: 100000
    },
    {
        cent: 200,
        cash: 200000
    },
    {
        cent: 300,
        cash: 300000
    },
    {
        cent: 500,
        cash: 500000
    },
    {
        cent: 1000,
        cash: 1000000
    }
]
