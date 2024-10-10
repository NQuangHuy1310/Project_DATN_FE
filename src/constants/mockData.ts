import { ICourse, ICourseToday, IModule, ITeacher } from '@/types'
import { CourseLevel, notificationTypes, TeacherStatus } from '@/constants'
import { INotificationMessage } from '@/types'
import { IAccoutMessage, IMessage } from '@/types/communicate'

export const courses: ICourse[] = [
    {
        image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Lập trình C++ cơ bản, nâng cao',
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
        name: 'Xây Dựng Website với ReactJS',
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
    },
    {
        image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Xây Dựng Website với ReactJS',
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
    },
    {
        image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Xây Dựng Website với ReactJS',
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

export const coursesToday: ICourseToday[] = [
    {
        image: 'https://i.pinimg.com/564x/ac/27/1d/ac271de883faa03617b212beeda73db3.jpg',
        name: 'Introduction to UX Design',
        star: 4.5,
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
        studentCount: 100,
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
        image: 'https://i.pinimg.com/564x/ac/27/1d/ac271de883faa03617b212beeda73db3.jpg',
        name: 'Introduction to UX Design',
        star: 4.5,
        studentCount: 100,
        totalVideo: 10,
        totalTime: '5 giờ',
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
            name: 'Fiona Blue',
            avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
            is_active: true
        },
        time: 120,
        message: "Let's catch up next week.",
        is_Read: true
    },
    {
        user: {
            name: 'George Grey',
            avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
            is_active: true
        },
        time: 150,
        message: 'I have sent you the calendar invite.',
        is_Read: false
    },
    {
        user: {
            name: 'Hannah Yellow',
            avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
            is_active: true
        },
        time: 240,
        message: 'Looking forward to our meeting!',
        is_Read: true
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
            name: 'Jane Smith',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            is_active: true
        },
        time: 10,
        message: 'Did you finish the report?',
        is_Read: true
    }
]
export const ItemPost: IPosts[] = [
    {
        title: 'Understanding React Hooks',
        slug: 'understanding-react-hooks',
        description: 'A comprehensive guide to understanding and using React Hooks in modern web development.',
        thumbnail: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg',
        read_time: '5 phút đọc',
        author: {
            name: 'John Doe',
            avatar: 'https://example.com/avatars/john-doe.png'
        },
        tags: ['React', 'JavaScript', 'Frontend']
    },
    {
        title: 'Mastering TypeScript',
        slug: 'mastering-typescript',
        description: 'Learn the essentials and advanced concepts of TypeScript for robust and type-safe applications.',
        thumbnail: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
        read_time: '7 phút đọc',
        author: {
            name: 'Jane Smith',
            avatar: 'https://example.com/avatars/jane-smith.png'
        },
        tags: ['TypeScript', 'JavaScript', 'Programming']
    },
    {
        title: 'The Power of Node.js',
        slug: 'the-power-of-nodejs',
        description:
            'Discover how Node.js powers modern web applications with its non-blocking I/O and event-driven architecture.',
        thumbnail: 'https://img.pikbest.com/origin/09/19/03/61zpIkbEsTGjk.jpg!w700wp',
        read_time: '6 phút đọc',
        author: {
            name: 'Michael Johnson',
            avatar: 'https://example.com/avatars/michael-johnson.png'
        },
        tags: ['Node.js', 'Backend', 'JavaScript']
    },
    {
        title: 'CSS Grid Layout: A New Era of Web Design',
        slug: 'css-grid-layout',
        description:
            'Explore how CSS Grid Layout revolutionizes web design with flexible and complex grid-based layouts.',
        thumbnail:
            'https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g',
        read_time: '4 phút đọc',
        author: {
            name: 'Emily Davis',
            avatar: 'https://www.ruaanhgiare.vn/wp-content/uploads/2023/06/anh-ngau.jpg'
        },
        tags: ['CSS', 'Web Design', 'Frontend']
    },
    {
        title: 'Exploring GraphQL: A Query Language for APIs',
        slug: 'exploring-graphql',
        description:
            'An in-depth look at GraphQL, a powerful query language for APIs that enables precise data fetching.',
        thumbnail:
            'https://images2.thanhnien.vn/528068263637045248/2024/1/25/e093e9cfc9027d6a142358d24d2ee350-65a11ac2af785880-17061562929701875684912.jpg',
        read_time: '8 phút đọc',
        author: {
            name: 'Robert Brown',
            avatar: 'https://example.com/avatars/robert-brown.png'
        },
        tags: ['GraphQL', 'APIs', 'Backend']
    }
]
